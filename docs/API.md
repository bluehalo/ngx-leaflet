# @bluehalo/ngx-leaflet — API Reference

> Full API reference. For installation and quick-start usage, see the [README](../README.md).

## Advanced Map Configuration
There are several input bindings available for configuring the map.

```angular181html
<div leaflet style="height: 300px;"
     [leafletOptions]="options"
     [leafletPanOptions]="panOptions"
     [leafletZoomOptions]="zoomOptions"
     [leafletZoomPanOptions]="zoomPanOptions"
     [leafletFitBoundsOptions]="fitBoundsOptions">
</div>
```

### [leafletOptions]
Input binding for the initial leaflet map options (see [Leaflet's](https://leafletjs.com/reference.html#map-option) docs). These options can only be set initially because they are used to create the map. Later changes are ignored.

### [leafletPanOptions]
Input binding for pan options (see [Leaflet's](https://leafletjs.com/reference.html#pan-options) docs). These options are stored and used whenever pan operations are invoked.

### [leafletZoomOptions]
Input binding for zoom options (see [Leaflet's](https://leafletjs.com/reference.html#zoom-options) docs). These options are stored and used whenever zoom operations are invoked.

### [leafletZoomPanOptions]
Input binding for zoom/pan options (see [Leaflet's](https://leafletjs.com/reference.html#zoom/pan-options) docs). These options are stored and used whenever zoom/pan operations are invoked.

### [leafletFitBoundsOptions]
Input binding for FitBounds options (see [Leaflet's](https://leafletjs.com/reference.html#fitbounds-options) docs). These options are stored and used whenever FitBounds operations are invoked.


## Dynamically Changing Zoom, Center, and fitBounds
```angular181html
<div leaflet style="height: 300px;"
     [leafletOptions]="options"
     [(leafletZoom)]="zoom"
     [(leafletCenter)]="center"
     [leafletFitBounds]="fitBounds">
</div>
```

### [(leafletZoom)]: number
Input and Output binding for the map zoom level.

### [leafletMaxZoom]: number
Input binding for the maximum zoom level for the map.

### [leafletMinZoom]: number
Input binding for the minimum zoom level for the map.

### [(leafletCenter)]: LatLng
Input and Output binding for the map center position.

### Note: center/zoom operations may interfere with each other
Zoom/Center operations that are applied in rapid succession may interfere with or cancel each other.
If both changes are picked up at the same time, the component applies the changes as a map.setView() operation to ensure both are processed.
Additionally, if a zoom level or center is applied that is not allowed (e.g., beyond max zoom level or outside of max bounds), Leaflet will determine the new value.

### [leafletFitBounds]: LatLngBounds
Input bind a ```LatLngBounds``` value that will be applied to the map using ```Map.setFitBounds()```.
This operation has no output binding because the input fitBounds usually results in a slightly different map bounds.

### [leafletMaxBounds]: LatLngBounds
Input bind a ```LatLngBounds``` value that will be applied to the map using ```Map.setMaxBounds()```.


## Simple Layer Management: Setting Baselayers
There is a convenience input binding for setting the baselayers on the map called ```[leafletBaseLayers]```.
You can also provide ```[leafletLayersControlOptions]``` if you want to show the control on the map that allows you to switch between baselayers.
If you plan to show more than just baselayers, you should use the more advanced layers controls described in *Advanced Layer Management* below.

For an example of the basic map setup, you should check out the *Simple Base Layers* demo.

```angular181html
<div leaflet style="height: 300px;"
     [leafletOptions]="options"
     [leafletBaseLayers]="baseLayers"
     [leafletLayersControlOptions]="layersControlOptions">
</div>
```

### [leafletBaseLayers]: Control.LayersObject
Input bind an ```Control.LayersObject``` to be synced to the map.

```typescript
baseLayers: {
	'layer1': Layer,
	'layer2': Layer
}
```

On changes, the component syncs the baseLayers on the map with the layers in this object.
Syncing is performed by tracking the current baselayer and on changes, searching the map to see if any of the current baselayers is added to the map.
If it finds a baselayer that is still added to the map, it will assume that is still the baselayer and leave it.
If none of the baselayers can be found on the map, it will add the first layer it finds in the ```Control.LayersObject``` and use that as the new baselayer.
Layers are compared using instance equality.

If you use this directive, you can still manually use the ```[leafletLayers]``` directive, but you will not be able to use the ```[leafletLayersControl]``` directive.
This directive internally uses the layers control, so if you add both, they'll interfere with each other.
Because it uses ```control.layers``` under the hood, you can still provide options for the layers control.


### [leafletLayersControlOptions]
Input binding for Control.Layers options (see [Leaflet's](https://leafletjs.com/reference.html) docs).
These options are passed into the layers control constructor on creation.


## Advanced Layer Management: Layers and Layers Control
The ```[leafletLayers]``` and ```[leafletLayersControl]``` input bindings give you direct access to manipulate layers and the layers control.
When the array bound to ```[leafletLayers]``` is changed, the directive will synchronize the layers on the map to the layers in the array.
This includes tile layers and any added shapes.

The ```[leafletLayersControl]``` input binding allows you to provide a set of base layers and overlay layers that can be managed within leaflet using the layers control.
When the user manipulates the control via Leaflet, Leaflet will automatically manage the layers, but the input bound layer array isn't going to get updated to reflect those changes.

So, use ```[leafletLayers]``` to add a collection of layers to the map.
And, use ```[leafletLayersControl]``` to allow users to optionally turn layers/overlays on and off.

For an example of using the layers controls, you should check out the *Layers and Layer Controls* demo.

```angular181html
<div leaflet style="height: 300px;"
     [leafletOptions]="options"
     [leafletLayers]="layers"
     [leafletLayersControl]="layersControl"
     [leafletLayersControlOptions]="layersControlOptions">
</div>
```

### [leafletLayers]: Layer[]
Input bind an array of all layers to be synced (and made visible) in the map.

On changes, the component syncs the layers on the map with the layers in this array.
Syncing is performed by selectively adding or removing layers.
Layers are compared using instance equality.
As a result of how the map is synced, the order of layers is not guaranteed to be consistent as changes are made.


### [leafletLayersControl]: Control.Layers
Input bind a Control.Layers specification. The object contains properties for each of the two constructor arguments for the Control.Layers constructor.

```typescript
layersControl: {
	baseLayers: {
		'layerName': Layer
	},
	overlays: {
		'overlayName': Layer
	}
}
```

### [leafletLayersControlOptions]
Input binding for Control.Layers options (see [Leaflet's](https://leafletjs.com/reference.html) docs).
These options are passed into the constructor on creation.


## Advanced Layer Management: Individual Layers and @for / @if
The ```[leafletLayer]``` input bindings gives you the ability to add a single layer to the map.
While this may seem limiting, you can nest elements inside the map element, each with a ```[leafletLayer]``` input.
The result of this is that each layer will be added to the map.
If you add a structural directive - ```@for``` or ```@if``` - you can get some added flexibility when controlling layers.

```angular181html
<div leaflet style="height: 300px;"
     [leafletOptions]="options">

    @for (layer of layers; track layer.id) {
        <div [leafletLayer]="layer"></div>
    }

</div>
```

In this example, each layer in the ```layers``` array will create a new child ```div``` element.
Each element will have a ```[leafletLayer]``` input binding, which will result in the layer being added to the map.
For more details, you should check out the *Layers and ngFor* demo.

There are several layer events that are available when you are using this approach to controlling layers.


## Dynamically Change Map Layers

> **Layer inputs (arrays and maps) are mutable**
> Previous versions of this plugin treated layers arrays and layer control objects as immutable data structures.
> We've changed that behavior.
> Now, mutable changes to the ```leafletLayers```, ```leafletBaseLayers```, and ```leafletLayersControl``` inputs are detected.

The plugin is now using internal ngx iterable and key/value differs to detect and track changes to mutable data structures.
This approach requires a deep compare of the contents of the data structure (which can be slow when the contents are really big).
For immutable data structures, all that is needed is a top-level instance equality check (which is way faster).
This change is backwards compatible and was motivated by feedback and confusion.
While there is a performance impact for some use cases, this approach is more intuitive.

There are at least two good approaches to improving performance when there are a lot of layers bound to the map.
First, you can use the OnPush change detection strategy. There's an example of this in the demo.
Second, you can wrap a large number of layers into a Leaflet layer group, which will reduce the number of layers the plugin actually has to track during diffs.


## Layer Events
When you are using the ```[leafletLayer]``` directive to add a layer, you can also access output bindings for layer events.
Two events that are currently exposed include: ```(leafletLayerAdd)``` and ```(leafletLayerRemove)```.
Each of these emits a ```LeafletEvent``` object.


## Map Events
Leaflet exposes a lot of map events including map zoom, map move, and mouse interactions.
The plugin exposes several of the most common events.
For each of these events, the event is emitted in the Angular Zone, so you shouldn't have to do anything extra to get change detection to work.
For a working example, check out the events section of the demo.

### Mouse Interactions: LeafletMouseEvent
The following events are provided:
* ```(leafletClick)```
* ```(leafletDoubleClick)```
* ```(leafletMouseDown)```
* ```(leafletMouseUp)```
* ```(leafletMouseMove)```
* ```(leafletMouseOver)```
* ```(leafletMouseOut)```

### Map Zoom and Move: LeafletEvent
The following events are provided:
* ```(leafletMapMove)```
* ```(leafletMapMoveStart)```
* ```(leafletMapMoveEnd)```
* ```(leafletMapZoom)```
* ```(leafletMapZoomStart)```
* ```(leafletMapZoomEnd)```


## Getting a Reference to the Map
Occasionally, you may need to directly access the Leaflet map instance.
For example, to call ```invalidateSize()``` when the map div changes size or is shown/hidden.
There are a couple of different ways to achieve this depending on what you're trying to do.

The easiest and most flexible way is to use the output binding ```leafletMapReady```.
This output is invoked after the map is created, the argument of the event being the ```Map``` instance.

The second is to get a reference to the leaflet directive itself - and there are a couple of ways to do this.
With a reference to the directive, you can invoke the ```getMap()``` function to get a reference to the ```Map``` instance.


### (leafletMapReady): Map
This output is emitted when once when the map is initially created inside of the Leaflet directive.
The event will only fire when the map exists and is ready for manipulation.

```angular181html
<div leaflet
     [leafletOptions]="options"
     (leafletMapReady)="onMapReady($event)">
</div>
```

```typescript
onMapReady(map: Map) {
	// Do stuff with map
}
```

This method of getting the map makes the most sense if you are using the Leaflet directive inside your own component
and just need to add some limited functionality or register some event handlers.


### Inject LeafletDirective into your Component
This is the more advanced technique and it won't always work depending on your setup.
In particular, this will likely not work unless you are writing your own third-party library that extends the functionality of `ngx-leaflet`.
If this approach does not work for you, try using the `leafletMapReady` event described above.

In Angular.io, directives are injectable the same way that Services are.
This means that you can create your own component or directive and inject the ```LeafletDirective``` into it.
This will only work if your custom component/directive exists on the same DOM element and is ordered after the injected LeafletDirective, or if it is on a child DOM element.


```angular181html
<!-- On the same DOM element -->
<div leaflet myCustomDirective></div>

<!-- On a child DOM element -->
<div leaflet>
    <div myCustomDirective></div>
</div>
```

```typescript

@Directive({
    selector: '[myCustomDirective]'
})
export class MyCustomDirective {
    readonly #leafletDirective = inject(LeafletDirective);

    someFunction() {
        if (null !== this.#leafletDirective.getMap()) {
            // Do stuff with the map
        }
    }
}
```

The benefit of this approach is it's a bit cleaner if you're interested in adding some reusable capability to the existing leaflet map directive.
As mentioned above, it might not work depending on how you are packaging your component.
This is how the ```@bluehalo/ngx-leaflet-draw``` and ```@bluehalo/ngx-leaflet-d3``` packages work, so you can use them as references.


## A Note About Change Detection
Change detection is at the core of how Angular works.
Angular.io uses Zone.js to scope how and when (events, actions, etc.) to trigger change detection.
It's important to scope it carefully because change detection can be fairly expensive, so you don't want it to happen constantly.

Libraries like ngx-leaflet have to decide what to do inside and outside of the Angular zone, balancing convenience and performance.
Leaflet registers handlers for a lot of mouse events.
To mitigate the performance impact of constantly running change detection on all mouse events (including mousemove), ngx-leaflet runs most of the Leaflet code outside of the Angular zone.
The impact of this is that Angular won't automatically detect changes that you make inside of a Leaflet event callback.

The solution is to either make sure that Angular relevant changes are made inside of Angular's zone or to manually tell Angular to detect changes.

### Running Inside of Angular's Zone
Leaflet event handlers run outside of Angular's zone, where changes to input bound fields will not be detected automatically.
To ensure your changes are detected and applied, you need to make those changed inside of Angular's zone.
Fortunately, this is extremely easy.

```typescript
fitBounds: any = null;
circle = circle([ 46.95, -122 ], { radius: 5000 });

// Inject the Change Detector into your component
constructor(private zone: NgZone) {}

ngOnInit() {

	// The 'add' event callback handler happens outside of the Angular zone
	this.circle.on('add', () => {

		// But, we can run stuff inside of Angular's zone by calling NgZone.run()
		// everything inside the arrow function body happens inside of Angular's zone, where changes will be detected
		this.zone.run(() => {
			this.fitBounds = this.circle.getBounds();
		});

	});
}
```

### Manually Triggering Change Detection
Another option is to manually tell the change detector to detect changes.
The drawback to this option is that it is less precise.
This will trigger change detection for this component and all of its children.

```typescript
fitBounds: any = null;
circle = circle([ 46.95, -122 ], { radius: 5000 });

// Inject the Change Detector into your component
constructor(private changeDetector: ChangeDetectorRef) {}

ngOnInit() {

	// The 'add' event callback happens outside of the Angular zone
	this.circle.on('add', () => {

		// Because we're outside of Angular's zone, this change won't be detected
		this.fitBounds = this.circle.getBounds();

		// But, it will if we tell Angular to detect changes
		this.changeDetector.detectChanges();

	});
}
```
