# @asymmetrik/ngx-leaflet

[![Build Status][travis-image]][travis-url]

[travis-url]: https://travis-ci.org/Asymmetrik/ngx-leaflet/
[travis-image]: https://travis-ci.org/Asymmetrik/ngx-leaflet.svg

> Leaflet packages for Angular.io (v2+).
> Provides flexible and extensible components for integrating Leaflet v0.7.x and v1.x into Angular.io projects.
> Supports Angular v4, Ahead-of-Time compilation (AOT), and use in Angular-CLI based projects.

## Table of Contents
- [Install](#install)
- [Usage](#usage)
- [API](#api)
- [Extensions](#extensions)
- [Getting Help](#help)
- [Changelog](#changelog)
- [Contribute](#contribute)
- [License](#license)
- [Credits](#credits)


## Install
Install the package and its peer dependencies via npm (or yarn):
```
npm install leaflet
npm install @asymmetrik/ngx-leaflet
```

If you intend to use this library in a typescript project (utilizing the typings), you'll need to install the leaflet typings:
```
npm install --save-dev @types/leaflet
```

If you want to run the demo, clone the repository, perform an ```npm install```, ```gulp dev``` and then go to http://localhost:9000/src/demo/index.html


## Usage
To use this library, there are a handful of setup steps to go through that vary based on your app environment (e.g., Webpack, ngCli, SystemJS, etc.).
Generally, the steps are:

* Install Leaflet, this library, and potentially the Leaflet typings (see above).
* Import the Leaflet stylesheet
* Import the Leaflet module into your Angular project
* Create and configure a map (see docs below and/or demo)


### Import the Leaflet Stylesheet
For leaflet to work, you need to have the leaflet stylesheets loaded into your application.
If you've installed via npm, you will need to load ```./node_modules/leaflet/dist/leaflet.css```. 
How you include the stylesheet will depend on your specific setup. Here are a few examples:

#### Direct Import from HTML
If you are just building a webpage and not using a bundler for your css, you'll want to directly import the css file in your HTML page.

```html
<head>
	...
	<link rel="stylesheet" type="text/css" href="./node_modules/leaflet/dist/leaflet.css">
	...
</head>
```

#### Configuring Webpack Style Loaders
If you are using Webpack, you will need to import the css file and have a style-loader configured.
You can use the demo included in this application as a reference.

Generally, in ```vendor.ts```:
```ts
import 'leaflet/dist/leaflet.css';
```

And then in your webpack config file:
```js
{
    ...
    "module" : {
		loaders: [
		    ...
		    { test: /\.css$/, loaders: [ 'style-loader', 'css-loader' ] },
		    ...
		]    
    },
    ...
}
```


#### Adding Styles in Angular CLI
If you are using Angular CLI, you will need to add the Leaflet CSS file to the styles array contained in ```.angular-cli.json```

```js
{
    ...
    "apps": [
        {
            ...
            "styles": [
                "styles.css",
                "../node_modules/leaflet/dist/leaflet.css"
            ],
            ...
        }
    ]
    ...
}
```

### Import Code Dependencies and Module
This project is exported using UMD and it includes typings.
So, you shouldn't have to do anything special to use it if you're building your project in Typescript.

#### Typescript Angular.io Module Import
Before you can use the module in your Angular.io app, you'll need to import it in your application (and potentially the module that's using it).

For example, in your ```app.module.ts```, add:
 
```js
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

...
imports: [
    ...
    LeafletModule.forRoot()
]
...

```

Potentially, you'll also need to import it into the module of the component that is going to actually use the ngx-leaflet directives.
See Angular.io docs of modules for more details (https://angular.io/guide/ngmodule). In this case, in ```my-module.module.ts```, add:
 
```js
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

...
imports: [
    ...
    LeafletModule
]
...

```


#### Not Using Typescript?
You brave soul.
The code is exported using UMD (bundles are in the ./dist dir) so you should be able to import is using whatever module system/builder you're using, even if you aren't using Typescript.


### Create and Configure a Map
Once the dependencies are installed and you have imported the ```LeafletModule```, you're ready to add a map to your page.
To get a basic map to work, you have to:

* Apply the ```leaflet``` attribute directive (see the example below) to an existing DOM element.
* Style the map DOM element with a height. Otherwise, it'll render with a 0 pixel height.
* Provide an initial zoom/center and set of layers either via ```leafletOptions``` or by binding to ```leafletZoom```, ```leafletCenter```, and ```leafletLayers```.

Template:
```html
<div style="height: 300px;"
     leaflet 
     [leafletOptions]="options">
</div>
```

Example leafletOptions object:
```js
options = {
	layers: [
		tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
	],
	zoom: 5,
	center: latLng(46.879966, -121.726909)
};
```

Changes to leafletOptions are ignored after they are initially set.
This is because these options are passed into the map constructor, so they couldn't be updated easily regardless.
So, make sure the object exists before the map is created.
You'll want to create the object in ngOnInit or hide the map DOM element with ngIf until you can create the options object.


### Add a Layers Control
The ```leafletLayersControl``` input bindings give you the ability to add the layers control to the map.
The layers control lets the user toggle layers and overlays on and off.

Template:
```html
<div style="height: 300px;"
     leaflet 
     [leafletOptions]="options"
     [leafletLayersControl]="layersControl">
</div>
```

Example layersControl object:
```js
layersControl = {
	baseLayers: {
		'Open Street Map': tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' }),
		'Open Cycle Map': tileLayer('http://{s}.tile.opencyclemap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
	},
	overlays: {
		'Big Circle': circle([ 46.95, -122 ], { radius: 5000 }),
		'Big Square': polygon([[ 46.8, -121.55 ], [ 46.9, -121.55 ], [ 46.9, -121.7 ], [ 46.8, -121.7 ]])
	}
}
```

You can add any kind of Leaflet layer you want to the ```overlays``` map.
This includes markers, shapes, geojson, custom layers from other libraries, etc.


### Add Custom Layers (base layers, markers, shapes, etc.)
You can add layers (baselayers, markers, or custom layers) to the map without showing them in the layer control using the ```leafletLayers``` directive.

Template:
```html
<div style="height: 300px;"
     leaflet
     [leafletOptions]="options"
     [leafletLayers]="layers">
</div>
```

Layers array:
```js
layers = [
    circle([ 46.95, -122 ], { radius: 5000 }),
    polygon([[ 46.8, -121.85 ], [ 46.92, -121.92 ], [ 46.87, -121.8 ]]),
    marker([ 46.879966, -121.726909 ])
];
```


### Dynamically Change Map Layers

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


## API
This section includes more detailed documentation of the functionality of the directives included in this library.

### Advanced Map Configuration
There are several input bindings available for configuring the map.

```html
<div leaflet style="height: 300px;"
     [leafletOptions]="options"
     [leafletPanOptions]="panOptions"
     [leafletZoomOptions]="zoomOptions"
     [leafletZoomPanOptions]="zoomPanOptions"
     [leafletFitBoundsOptions]="fitBoundsOptions">
</div>
```

#### leafletOptions
Input binding for the initial leaflet map options (see [Leaflet's](http://leafletjs.com) docs). These options can only be set initially because they are used to create the map. Later changes are ignored.

#### leafletPanOptions
Input binding for pan options (see [Leaflet's](http://leafletjs.com) docs). These options are stored and used whenever pan operations are invoked.

#### leafletZoomOptions
Input binding for zoom options (see [Leaflet's](http://leafletjs.com) docs). These options are stored and used whenever zoom operations are invoked.

#### leafletZoomPanOptions
Input binding for zoom/pan options (see [Leaflet's](http://leafletjs.com) docs). These options are stored and used whenever zoom/pan operations are invoked.

#### leafletFitBoundsOptions
Input binding for FitBounds options (see [Leaflet's](http://leafletjs.com) docs). These options are stored and used whenever FitBounds operations are invoked.


### Dynamically changing zoom level, center, and fitBounds
```html
<div leaflet style="height: 300px;"
     [leafletOptions]="options"
     [leafletZoom]="zoom"
     [leafletCenter]="center"
     [leafletFitBounds]="fitBounds">
</div>
```

#### leafletZoom
Input bind a zoom level to the map.

```js
zoom: number
```

On changes, the component applies the new zoom level to the map.
There is no output binding or events emitted for map zoom level changes made using the map controls.


#### leafletCenter
Input bind a center position to the map.

```js
center: LatLng
```

On changes, the component re-centers the map on the center point.
There is no output binding or events emitted for map pan changes made using map controls.


#### Note: center/zoom operations may cancel each other
Zoom/Center operations cancel each other.
If both changes are picked up at the same time, they will be applied as a map.setView() operation so both are processed.


#### leafletFitBounds
Input bind a fitBounds operation to the map.

```js
fitBounds: LatLngBounds
```

On changes, the component calls map.fitBounds using the bound parameter.


### Simple Layer Management: Setting Baselayers
There is a convenience input binding for setting the baselayers on the map called ```leafletBaseLayers```.
You can also provide ```leafletLayersControlOptions``` if you want to show the control on the map that allows you to switch between baselayers.
If you plan to show more than just baselayers, you should use the more advanced layers controls described in *Advanced Layer Management* below.

For an example of the basic map setup, you should check out the *Simple Base Layers* demo.

```html
<div leaflet style="height: 300px;"
     [leafletOptions]="options"
     [leafletBaseLayers]="baseLayers"
     [leafletLayersControlOptions]="layersControlOptions">
</div>
```

#### leafletBaseLayers
Input bind an ```Control.LayersObject``` to be synced to the map.

```js
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

If you use this directive, you can still manually use the ```leafletLayers``` directive, but you will not be able to use the ```leafletLayersControl``` directive.
This directive internally uses the layers control, so if you add both, they'll interfere with each other.
Because it uses ```control.layers``` under the hood, you can still provide options for the layers control.   


#### leafletLayersControlOptions
Input binding for Control.Layers options (see [Leaflet's](http://leafletjs.com) docs).
These options are passed into the layers control constructor on creation.


### Advanced Layer Management: Layers, and Layers Control
The ```leafletLayers``` and ```leafletLayersControl``` input bindings give you direct access to manipulate layers and the layers control.
When the array bound to ```leafletLayers``` is changed, the directive will synchronize the layers on the map to the layers in the array.
This includes tile layers and any added shapes.

The ```leafletLayersControl``` input binding allows you to provide a set of base layers and overlay layers that can be managed within leaflet using the layers control.
When the user manipulates the control via Leaflet, Leaflet will automatically manage the layers, but the input bound layer array isn't going to get updated to reflect those changes.

So, basically, you use ```leafletLayers``` to assert what should be added to/removed from the map.
Use ```leafletLayersContro``` to tell Leaflet what layers the user can optionally turn on and off.

For an example of using the layers controls, you should check out the *Layers and Layer Controls* demo.

```html
<div leaflet style="height: 300px;"
     [leafletOptions]="options"
     [leafletLayers]="layers"
     [leafletLayersControl]="layersControl"
     [leafletLayersControlOptions]="layersControlOptions">
</div>
```

#### leafletLayers
Input bind an array of all layers to be synced (and made visible) in the map.

```js
layers: Layer[]
```

On changes, the component syncs the layers on the map with the layers in this array.
Syncing is performed by selectively adding or removing layers. Layers are compared using instance equality.
As a result of how the map is synced, the order of layers is not guaranteed to be consistent as changes are made.


#### leafletLayersControl
Input bind a Control.Layers specification. The object contains properties for each of the two constructor arguments for the Control.Layers constructor.

```js
layersControl: {
	baseLayers: {
		'layerName': Layer
	},
	overlays: {
		'overlayName': Layer
	}
}
```

#### leafletLayersControlOptions
Input binding for Control.Layers options (see [Leaflet's](http://leafletjs.com) docs).
These options are passed into the constructor on creation.


### Advanced Layer Management: Layers and *ngFor / *ngIf
The ```leafletLayer``` input bindings gives you the ability to add a single layer to the map.
While this may seem limiting, you can nest elements inside the map element, each with a ```leafletLayer``` input. 
The result of this is that each layer will be added to the map.
If you add a structural directive - ```*ngFor``` or ```*ngIf``` - you can get some added flexibiltiy when controlling layers.  

```html
<div leaflet style="height: 300px;"
     [leafletOptions]="options">
     <div *ngFor="let l of layers" [leafletLayer]="l"></div>
</div>
```

In this example, each layer in the ```layers``` array will create a new child ```div``` element.
Each element will have a ```leafletLayer``` input binding, which will result in the layer being added to the map.

For more details, you should check out the *Layers and ngFor* demo.


### Getting a Reference to the Map
Occasionally, you may need to directly access the Leaflet map instance.
For example, to call ```invalidateSize()``` when the map div changes size or is shown/hidden.
There are a couple of different ways to achieve this depending on what you're trying to do.

The easiest and most flexible way is to use the output binding ```leafletMapReady```.
This output is invoked after the map is created, the argument of the event being the ```Map``` instance.

The second is to get a reference to the leaflet directive itself - and there are a couple of ways to do this.
With a reference to the directive, you can invoke the ```getMap()``` function to get a reference to the ```Map``` instance.


#### leafletMapReady
This output is emitted when once when the map is initially created inside of the Leaflet directive.
The event will only fire when the map exists and is ready for manipulation.

```html
<div leaflet
     [leafletOptions]="options"
     (leafletMapReady)="onMapReady($event)">
</div>
```

```js
onMapReady(map: Map) {
   // Do stuff with map
}
```

This method of getting the map makes the most sense if you are using the Leaflet directive inside your own component
and just need to add some limited functionality or register some event handlers.


#### Inject LeafletDirective into your Component
In Angular.io, directives are injectable the same way that Services are.
This means that you can create your own component or directive and inject the ```LeafletDirective``` into it.
This will only work if your custom component/directive exists on the same DOM element and is ordered after the injected LeafletDirective, or if it is on a child DOM element.

```html
<!-- On the same DOM element -->
<div leaflet myCustomDirective>
</div>

<!-- On a child DOM element -->
<div leaflet>
   <div myCustomDirective></div>
</div>
```

```js
@Directive({
   selector: '[myCustomDirective]'
})
export class MyCustomDirective {
   leafletDirective: LeafletDirective;
	
   constructor(leafletDirective: LeafletDirective) {
      this.leafletDirective = leafletDirective;
   }

   someFunction() {
      if (null != this.leafletDirective.getMap()) {
         // Do stuff with the map
      }
   }
}
```

The benefit of this approach is it's a bit cleaner if you're interested in adding some reusable capability to the existing leaflet map directive.
This is how the ```@asymmetrik/ngx-leaflet-draw``` and ```@asymmetrik/ngx-leaflet-d3``` packages work, so you can use them as references.


### A Note About Markers
If you use this component in an Angular.io project and your project uses a bundler like Webpack, you might run into issues using Markers on maps.
The issue is related to how Leaflet manipulates the image URLs used to render markers when you are using the default marker images.
The url manipulation is done at runtime and it alters the URLs in a way that breaks their format (this happens regardless of if you're using a file-loader or a url-loader).
The demo contained in this project demonstrates how to get around this problem (at least in a Webpack environment).
But, here is a rough overview of the steps taken to get them working.

#### Webpack Marker Workaround

1. Import the marker images in your vendor file to get Webpack to process the images in the asset pipeline

   ```js
   import 'leaflet/dist/images/marker-shadow.png';
   import 'leaflet/dist/images/marker-icon.png';
   ```

1. Either host the images statically or use the file-loader Webpack plugin to generate the images.
1. Determine the correct URL for the marker and marker-shadow images. If you're using a file hasher, you should be able to check Webpack's output for the generated images. If you are serving them directly without chunk hashing just figure out how to resolve the images on your server.
1. Configure Leaflet to use the correct URLs as customer marker images

   ```js
   let layer = marker([ 46.879966, -121.726909 ], {
      icon: icon({
         iconSize: [ 25, 41 ],
         iconAnchor: [ 13, 41 ],
         iconUrl: '2273e3d8ad9264b7daa5bdbf8e6b47f8.png',
         shadowUrl: '44a526eed258222515aa21eaffd14a96.png'
      })
   });
   ```

#### Angular CLI Marker Workaround

If you build your project using the [Angular CLI](https://github.com/angular/angular-cli), you can make the default leaflet marker assets available by doing the following:

1. Edit `.angular-cli` (formerly `angular-cli.json`)
1. Configure the CLI to include leaflet assets as below. Detailed instructions can be found in the [asset-configuration](https://github.com/angular/angular-cli/blob/master/docs/documentation/stories/asset-configuration.md) documentation. 
    ```json
    {
      "project": {
        ...
      },
      "apps": [
        {
          ...
          "assets": [
            "assets",
            "favicon.ico",
            {
              "glob": "**/*",
              "input": "../node_modules/leaflet/dist/images",
              "output": "./assets/"
            }
          ]
        }
      ]
    }
    ```

1. Configure Leaflet to use the correct URLs as customer marker images

   ```js
   let layer = marker([ 46.879966, -121.726909 ], {
      icon: icon({
         iconSize: [ 25, 41 ],
         iconAnchor: [ 13, 41 ],
         iconUrl: 'assets/marker-icon.png',
         shadowUrl: 'assets/marker-shadow.png'
      })
   });
   ```

## Extensions
There are several libraries that extend the core functionality of ngx-leaflet:
   * [Leaflet Draw](https://github.com/Asymmetrik/ngx-leaflet-draw)
   * [Leaflet Markercluster](https://github.com/Asymmetrik/ngx-leaflet-markercluster)
   * [Leaflet D3 (Hexbins)](https://github.com/Asymmetrik/ngx-leaflet-d3)


## <a name="help">Getting Help</a>
Here's a list of articles, tutorials, guides, and help resources:
   * [ngx-leaflet on Stack Overflow](https://stackoverflow.com/questions/tagged/ngx-leaflet)
   * [High-level intro to @asymmetrik/ngx-leaflet](https://www.asymmetrik.com/introducing-ngx-leaflet)
   * [Using @asymmetrik/ngx-leaflet in Angular CLI projects](https://www.asymmetrik.com/ngx-leaflet-tutorial-angular-cli)
   * [Integrating 3rd Party Leaflet Libraries with @asymmetrik/ngx-leaflet and @angular/cli](https://github.com/Asymmetrik/ngx-leaflet-tutorial-3rd-party-libs)
   

## Changelog

### 2.6.0 
Wrapping several map operations in ```NgZone.runOutsideAngular``` in order to prevent excessive dirty checking.
If you encounter an unexpected issue due to this change, please file an issue.

### 2.5.0
Added the ```[leafletLayer]``` directive for adding/removing individual layers.

### 2.3.0
Renamed the package to ```ngx-leaflet```


## Contribute
PRs accepted. If you are part of Asymmetrik, please make contributions on feature branches off of the ```develop``` branch. If you are outside of Asymmetrik, please fork our repo to make contributions.


## License
See LICENSE in repository for details.


## Credits
**[Leaflet](http://leafletjs.com/)** Is an awesome mapping package.
