# @bluehalo/ngx-leaflet

<p align="left">
  <img src="assets/logo.svg" alt="ngx-leaflet" width="200">
</p>

[![Build Status][ci-image]][ci-url]
[![Code Coverage][coverage-image]][coverage-url]

[ci-url]: https://github.com/bluehalo/ngx-leaflet/actions/workflows/ci.yml
[ci-image]: https://github.com/bluehalo/ngx-leaflet/actions/workflows/ci.yml/badge.svg
[coverage-url]: https://codecov.io/gh/bluehalo/ngx-leaflet
[coverage-image]: https://codecov.io/gh/bluehalo/ngx-leaflet/graph/badge.svg

> Leaflet packages for Angular.io.
> Provides flexible and extensible components for integrating Leaflet v0.7.x and v1.x into Angular.io projects.

## Table of Contents
- [Install](#install)
- [Usage](#usage)
- [API](docs/API.md)
- [Extensions](#extensions)
- [Recipes & Cookbook](docs/cookbook.md)
- [Getting Help](#help)
- [Contribute](#contribute)
- [License](#license)
- [Credits](#credits)



## Install
Install the package and its peer dependencies via npm (or yarn):
```
npm install leaflet
npm install @bluehalo/ngx-leaflet
```

If you intend to use this library in a typescript project (utilizing the typings), you'll need to install the leaflet typings:
```
npm install --save-dev @types/leaflet
```

If you want to run the demo, clone the repository, perform an ```npm install```, ```npm run demo``` and then go to http://localhost:4200

Not using the latest version of Angular.io? Have a look in [CHANGES.md](/CHANGES.md) to find the right version for your project.

## Usage
> NOTE: We've simplified the getting started instructions to be more targeted at the most recent versions of Angular.io and the use of Angular CLI.

Generally, the steps are:

* Install Leaflet, this library, and potentially the Leaflet typings (see above).
* Import the Leaflet stylesheet
* Import the `LeafletDirective` etc. into your Module or standalone Component
* Create and configure a map (see docs below and/or demo)

Alternatively, you can use the `LeafletModule` to import the module into your application.

### Import the Leaflet Stylesheet
For leaflet to work, you need to have the leaflet stylesheets loaded into your application.
If you've installed via npm, you will need to load ```./node_modules/leaflet/dist/leaflet.css```. 
How you include the stylesheet will depend on your specific setup. Here are a few examples:

#### Direct Import from HTML
If you are just building a webpage and not using a bundler for your css, you'll want to directly import the css file in your HTML page.

```angular181html
<head>
	...
	<link rel="stylesheet" type="text/css" href="./node_modules/leaflet/dist/leaflet.css">
	...
</head>
```

#### Adding Styles in Angular CLI
If you are using Angular CLI, you will need to add the Leaflet CSS file to the styles array contained in ```angular.json```

```json
{
	...
	"styles": [
		"styles.css",
		"./node_modules/leaflet/dist/leaflet.css"
	],
	...
}
```

#### A Note About Markers
Leaflet marker URLs don't play well with the Angular CLI build pipeline without some special handling.
See [Marker Setup](docs/cookbook.md#marker-setup) in the cookbook for the full configuration steps.


### Import LeafletDirective

Before you can use the Leaflet components in your Angular.io app, you'll need to import it in your application.
Depending on if you're using standalone mode or not, you will import it into your modules and/or components.

```typescript
import { LeafletDirective } from '@bluehalo/ngx-leaflet';

@Component({
    imports: [
        LeafletDirective // Import the LeafletDirective here
        // import other directives as needed
    ],
})
```

Alternatively:
```typescript
import { LeafletModule } from '@bluehalo/ngx-leaflet';

@NgModule({
    imports: [
        LeafletModule // Import the LeafletModule here
    ],
})
```

### Create and Configure a Map
To get a basic map to work, you have to:

* Apply the ```leaflet``` attribute directive (see the example below) to an existing DOM element.
* Style the map DOM element with a height. Otherwise, it'll render with a 0 pixel height.
* Provide an initial zoom/center and set of layers either via ```leafletOptions``` or by binding to ```leafletZoom```, ```leafletCenter```, and ```leafletLayers```.

Template:
```angular181html
<div style="height: 300px;"
     leaflet 
     [leafletOptions]="options">
</div>
```

Example leafletOptions object:
```typescript
options = {
	layers: [
		tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
	],
	zoom: 5,
	center: latLng(46.879966, -121.726909)
};
```

Changes to leafletOptions are ignored after they are initially set.
This is because these options are passed into the map constructor, so they can't be changed anyways.
So, make sure the object exists before the map is created.
You'll want to create the object in ```ngOnInit``` or hide the map DOM element with ```@if``` until you can create the options object.


### Add a Layers Control
The ```[leafletLayersControl]``` input bindings give you the ability to add the layers control to the map.
The layers control lets the user toggle layers and overlays on and off.

Template:
```angular181html
<div style="height: 300px;"
     leaflet 
     [leafletOptions]="options"
     [leafletLayersControl]="layersControl">
</div>
```

Component with example layersControl object:
```typescript
import { LeafletDirective, LeafletLayersControlDirective } from '@bluehalo/ngx-leaflet';

@Component({
    imports: [
        LeafletDirective,
        LeafletLayersControlDirective,
    ],
})
export class MyComponent {
    protected readonly layersControl = {
        baseLayers: {
            'Open Street Map': tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' }),
            'Open Cycle Map': tileLayer('https://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
        },
        overlays: {
            'Big Circle': circle([ 46.95, -122 ], { radius: 5000 }),
            'Big Square': polygon([[ 46.8, -121.55 ], [ 46.9, -121.55 ], [ 46.9, -121.7 ], [ 46.8, -121.7 ]])
        }
    }
}
```

You can add any kind of Leaflet layer you want to the ```overlays``` map.
This includes markers, shapes, geojson, custom layers from other libraries, etc.


### Add Custom Layers (base layers, markers, shapes, etc.)
There are several different ways to add layers to the map.
You can add layers (baselayers, markers, or custom layers) to the map without showing them in the layer control using the ```[leafletLayers]``` directive.

Template:
```angular181html
<div style="height: 300px;"
     leaflet
     [leafletOptions]="options"
     [leafletLayers]="layers">
</div>
```

Layers array:
```typescript
layers = [
	circle([ 46.95, -122 ], { radius: 5000 }),
	polygon([[ 46.8, -121.85 ], [ 46.92, -121.92 ], [ 46.87, -121.8 ]]),
	marker([ 46.879966, -121.726909 ])
];
```

You can also add an individual layer to the map using the ```[leafletLayer]``` directive.
Using this approach allows you to use ```@for``` and ```@if``` to control whether individual layers are added to or removed from the map.

Template:
```angular181html
<div style="height: 300px;"
     leaflet
     [leafletOptions]="options">
    
    @if (showLayer) {
        <div [leafletLayer]="layer"></div>
    }
</div>
```

Layer:
```typescript
layer = circle([ 46.95, -122 ], { radius: 5000 });
```


### Dynamically Change Map Layers
The `[leafletLayers]`, `[leafletBaseLayers]`, and `[leafletLayersControl]` inputs detect mutable changes using Angular's iterable/key-value differs. For details on performance trade-offs and how syncing works, see the [API reference](docs/API.md#dynamically-change-map-layers).


### Working with Leaflet Events
Often, you'll want to make changes based on a map click or other Leaflet interaction.
The ngx-leaflet plugin supports several [map events](docs/API.md#map-events) and [layer events](docs/API.md#layer-events) as documented in the API reference.

You may occasionally need to handle events that aren't exposed through the plugin, however.
When that happens, you will need to be aware of how Zones and change detection work to ensure your event handling works as expected.
Take a look at [A Note About Change Detection](docs/API.md#a-note-about-change-detection) for more details.
This is by design and a common thing to deal with when using third party libraries and Angular.


## API
Full API documentation is in [docs/API.md](docs/API.md). It covers:
- Advanced map configuration inputs (`[leafletPanOptions]`, `[leafletZoomOptions]`, etc.)
- Dynamically changing zoom, center, and fitBounds
- Layer management: `[leafletBaseLayers]`, `[leafletLayers]`, `[leafletLayersControl]`, `[leafletLayer]`
- Layer events and map events (full list)
- Getting a reference to the map
- A note about Angular zones and change detection


## Extensions
There are several libraries that extend the core functionality of ngx-leaflet:
* [Leaflet Draw](https://github.com/bluehalo/ngx-leaflet-draw)
* [Leaflet Markercluster](https://github.com/bluehalo/ngx-leaflet-markercluster)
* [Leaflet D3 (Hexbins)](https://github.com/bluehalo/ngx-leaflet-d3)


## Recipes

Common patterns and troubleshooting tips are in [docs/cookbook.md](docs/cookbook.md), including:
- [Marker Setup](docs/cookbook.md#marker-setup) — configuring Leaflet markers with the Angular CLI build pipeline
- [SSR / Server-Side Rendering](docs/cookbook.md#ssr--server-side-rendering) — working around Leaflet's browser-only module initialization
- [Angular Components in Marker Popups](docs/cookbook.md#angular-components-in-marker-popups) — using `createComponent()` to render Angular components into Leaflet popups


## <a name="help">Getting Help</a>
Here's a list of articles, tutorials, guides, and help resources:
* [ngx-leaflet on Stack Overflow](https://stackoverflow.com/questions/tagged/ngx-leaflet)
* [API Reference](docs/API.md) and [Cookbook](docs/cookbook.md) — up-to-date, version-controlled docs in this repo
* [High-level intro to @bluehalo/ngx-leaflet](https://github.com/bluehalo/ngx-leaflet/wiki) *(wiki — may be out of date)*
* [Using @bluehalo/ngx-leaflet in Angular CLI projects](https://github.com/bluehalo/ngx-leaflet/wiki/Getting-Started-Tutorial) *(wiki — may be out of date)*
* [Integrating 3rd Party Leaflet Libraries with @bluehalo/ngx-leaflet and @angular/cli](https://github.com/bluehalo/ngx-leaflet/wiki/Integrating-Plugins) *(wiki — may be out of date)*


## Contribute
PRs accepted. If you are part of BlueHalo, please make contributions on feature branches off of the ```develop``` branch. If you are outside of BlueHalo, please fork our repo to make contributions.


## License
See LICENSE in repository for details.


## Credits
**[Leaflet](http://leafletjs.com/)** Is an awesome mapping package.

**Logo** designed by [@jjmhalew](https://github.com/jjmhalew) ([#371](https://github.com/bluehalo/ngx-leaflet/issues/371)).
