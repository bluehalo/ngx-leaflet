# @bluehalo/ngx-leaflet — Cookbook

> Common patterns and troubleshooting tips. For installation and quick-start usage, see the [README](../README.md).

## Marker Setup

Leaflet marker URLs don't play well with the Angular CLI build pipeline without some special handling.
The demo contained in this project demonstrates how to get around this problem. Here is a rough overview of the steps taken to get them working.

1. Include the leaflet marker assets so they are copied intact to the build output.

```json
{
	...
	"assets": [
		{
			"glob": "**/*",
			"input": "public"
		},
		{
			"glob": "**/*",
			"input": "./node_modules/leaflet/dist/images",
			"output": "assets/"
		}
	],
	...
}
```

2. Configure Leaflet to use the asset URLs as custom marker images.

```typescript
let layer = marker([ 46.879966, -121.726909 ], {
	icon: icon({
		...Icon.Default.prototype.options,
		iconUrl: 'assets/marker-icon.png',
		iconRetinaUrl: 'assets/marker-icon-2x.png',
		shadowUrl: 'assets/marker-shadow.png'
   })
});
```


## SSR / Server-Side Rendering

### The problem

If you use Angular's SSR (`@angular/ssr`) and your app imports Leaflet or ngx-leaflet anywhere in the module graph, you will see this error during server-side rendering:

```
ReferenceError: window is not defined
```

### Root cause

The error originates in **Leaflet itself**, not in ngx-leaflet. Specifically, `leaflet/src/core/Browser.js` executes browser detection code at the **top level of the module** — not inside functions, not lazily, but immediately when the module is first imported:

```javascript
var style = document.documentElement.style;
var ie = 'ActiveXObject' in window;
// many more lines referencing window at module scope...
```

The moment `import 'leaflet'` is evaluated on the server, Node.js hits these lines and throws `window is not defined`. This happens at module initialization time — before any Angular component, directive, or service code runs.

### Why ngx-leaflet can't fix this

Angular's SSR tools (`isPlatformBrowser`, `PLATFORM_ID`) are **runtime guards** — they work inside components and services after Angular's infrastructure is running. They cannot prevent a static `import 'leaflet'` from executing Leaflet's module initialization code on the server.

ngx-leaflet's own code has only one reference to `window` — a `@HostListener('window:resize')` in `LeafletDirective` — which only registers a listener when the directive is instantiated and would never run on the server anyway. That's not the source of the problem.

### Working workarounds

**Option 1 (recommended): Mark the route as client-only**

In `app.routes.server.ts`, set the route containing your map to render client-side only:

```typescript
import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  { path: 'your-map-route', renderMode: RenderMode.Client },
  { path: '**', renderMode: RenderMode.Prerender }
];
```

This is explicit, supported by Angular, and works with all SSR configurations including incremental hydration.

**Option 2: `@defer` block**

Wrapping the component in a `@defer` block works in most cases:

```html
@defer (on browser) {
  <your-map-component />
}
```

> **Caveat:** This breaks if **incremental hydration** is enabled, since Angular will attempt to render deferred blocks on the server in that mode.

**Option 3: Lazy-loaded route**

Lazy-loading the map component via the router and configuring its path to render client-side in `app.routes.server.ts` achieves the same result as Option 1.

### The path to a real fix

Proper SSR support requires Leaflet itself to guard its browser detection code with `typeof window !== 'undefined'` checks. This is tracked upstream and expected to be addressed in **Leaflet 2.0** (tracked in [#380](https://github.com/bluehalo/ngx-leaflet/issues/380)).


## Angular Components in Marker Popups

Leaflet manages popup DOM elements outside of Angular's component tree, so you can't use Angular template syntax directly. The recommended approach is to use Angular's `createComponent()` API to render a component into a plain `HTMLElement`, then pass that element to Leaflet's `bindPopup()`.

**1. Create your popup component** as you normally would:

```typescript
// popup.component.ts
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-popup',
  template: `<div><h3>{{ title }}</h3><p>{{ description }}</p></div>`
})
export class PopupComponent {
  @Input() title = '';
  @Input() description = '';
}
```

**2. Create a service** to handle component creation and lifecycle:

```typescript
// popup.service.ts
import {
  ApplicationRef, ComponentRef, createComponent,
  EnvironmentInjector, Injectable, Injector
} from '@angular/core';
import { PopupComponent } from './popup.component';

@Injectable({ providedIn: 'root' })
export class PopupService {
  private refs: ComponentRef<unknown>[] = [];
  private elements: HTMLElement[] = [];

  constructor(
    private injector: Injector,
    private environmentInjector: EnvironmentInjector,
    private applicationRef: ApplicationRef
  ) {}

  createPopup(title: string, description: string): HTMLElement {
    const element = document.createElement('div');
    const ref = createComponent(PopupComponent, {
      elementInjector: this.injector,
      environmentInjector: this.environmentInjector,
      hostElement: element
    });
    this.applicationRef.attachView(ref.hostView);
    ref.instance.title = title;
    ref.instance.description = description;
    this.refs.push(ref);
    this.elements.push(element);
    return element;
  }

  // Call this when markers are removed to avoid memory leaks
  cleanup(): void {
    this.refs.splice(0).forEach(ref => ref.destroy());
    this.elements.splice(0).forEach(el => el.remove());
  }
}
```

**3. Use it in your map component:**

```typescript
onMapReady(map: Map): void {
  marker([51.5, -0.09])
    .bindPopup(this.popupService.createPopup('Hello', 'Angular component in a Leaflet popup'))
    .addTo(map);
}

ngOnDestroy(): void {
  this.popupService.cleanup();
}
```

> **Memory leak warning:** Each call to `createComponent()` creates a live Angular view. If you remove and redraw markers frequently, call `cleanup()` before redrawing to destroy the old component refs and remove the detached DOM elements.
