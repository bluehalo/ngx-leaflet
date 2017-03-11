# @asymmetrik/angular2-leaflet

[![Build Status][travis-image]][travis-url]

[travis-url]: https://travis-ci.org/Asymmetrik/angular2-leaflet/
[travis-image]: https://travis-ci.org/Asymmetrik/angular2-leaflet.svg


> Leaflet packages for Angular 2
> Provides flexible and extensible components for integrating Leaflet v0.7.x and v1.0.x into Angular 2 projects.

## Table of Contents
- [Install](#install)
- [Usage](#usage)
- [Contribute](#contribute)
- [License](#license)
- [Credits](#credits)


## Install 
Install the package and its peer dependencies via npm:
```
npm install leaflet
npm install @asymmetrik/angular2-leaflet
```

If you intend to use this library in a typescript project (utilizing the typings), you will need to also install the leaflet typings via npm:
```
npm install @types/leaflet
```


If you want to run the demo, clone the repository, perform an ```npm install```, ```gulp dev``` and then go to http://localhost:9000/src/demo/index.html


## Usage

### Basic Map Setup
To create a map, use the ```leaflet``` attribute directive.
You must specify an initial zoom/center and set of layers either via ```leafletOptions``` or by binding to ```leafletZoom```, ```leafletCenter```, and ```leafletLayers```.

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


### Zoom level, center, and FitBounds
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
center: L.LatLng
```

On changes, the component re-centers the map on the center point.
There is no output binding or events emitted for map pan changes made using map controls.


#### Note: center/zoom operations may cancel each other
Zoom/Center operations cancel each other. If both changes are picked up at the same time, they will be applied as a map.setView() operation so both are processed.


#### leafletFitBounds
Input bind a fitBound operation to the map.

```js
fitBounds: L.LatLngBounds
```

On changes, the component calls map.fitBounds using the bound parameter.

### Simple Layer Management: Setting Baselayers

```html
<div leaflet style="height: 300px;"
     [leafletOptions]="options"
     [leafletBaseLayers]="baseLayers"
     [leafletLayersControlOptions]="layersControlOptions">
</div>
```

#### leafletBaseLayers
Input bind an ```L.control.LayersObject``` to be synced to the map.

```js
baseLayers: {
	'layer1': L.Layer,
	'layer2': L.Layer
}
```

On changes, the component syncs the baseLayers on the map with the layers in this object.
Syncing is performed by tracking the current baselayer and on changes, searching the map to see if any of the current baselayers is added to the map.
If it finds a baselayer that is still added to the map, it will assume that is still the baselayer and leave it.
If none of the baselayers can be found on the map, it will add the first layer it finds in the ```L.control.LayersObject``` and use that as the new baselayer.
Layers are compared using instance equality.

If you use this directive, you can still manually use the ```leafletLayers``` directive, but you will not be able to use the ```leafletLayersControl``` directive.
This directive will interfere with the ```leafletLayersControl``` directive.
However, because it uses ```L.control.Layers``` under the hood, you can still provide options for the layers control.   


### leafletLayersControlOptions
Input binding for Control.Layers options (see [Leaflet's](http://leafletjs.com) docs). These options are passed into the layers control constructor on creation.


### Layers and Layers Control
The ```leafletLayers``` and ```leafletLayersControl``` directives give you direct access to manipulate layers and the layers control.

```html
<div leaflet style="height: 300px;"
     [leafletOptions]="options"
     [leafletLayers]="layers"
     [leafletLayersControl]="layersControl"
     [leafletLayersControlOptions]="layersControlOptions">
</div>
```

#### leafletLayers
Input bind an array of layers to be synced to the map.

```js
layers: L.Layer[]
```

On changes, the component syncs the layers on the map with the layers in this array.
Syncing is performed by selectively adding or removing layers. Layers are compared using instance equality.
As a result of how the map is synced, the order of layers is not guaranteed to be consistent as changes are made.


#### leafletLayersControl
Input bind a Control.Layers specification. The object contains properties for each of the two constructor arguments for the Control.Layers constructor.

```js
layersControl: {
	baseLayers: {
		'layerName': L.Layer
	},
	overlays: {
		'overlayName': L.Layer
	}
}
```

### leafletLayersControlOptions
Input binding for Control.Layers options (see [Leaflet's](http://leafletjs.com) docs). These options are passed into the constructor on creation.


### A Note About Markers
If you use this component in an Angular 2 project and your project uses a bundler like Webpack, you might run into issues using Markers on maps. 
The issue is related to how Leaflet manipulates the image URLs used to render markers when you are using the default marker images.
The url manipulation is done at runtime and it alters the URLs in a way that breaks their format (this happens regardless of if you're using a file-loader or a url-loader).
The demo contained in this project demonstrates how to get around this problem (at least in a Webpack environment).
But, here is a rough overview of the steps taken to get them working.

1. Import the marker images in your vendor file to get Webpack to process the images in the asset pipeline

		import 'leaflet/dist/images/marker-shadow.png';
		import 'leaflet/dist/images/marker-icon.png';

1. Either host the images statically or use the file-loader Webpack plugin to generate the images.
1. Determine the correct URL for the marker and marker-shadow images. If you're using a file hasher, you should be able to check Webpack's output for the generated images. If you are serving them directly without chunk hashing just figure out how to resolve the images on your server.
1. Configure Leaflet to use the correct URLs as customer marker images

		let layer= L.marker([ 46.879966, -121.726909 ], {
			icon: L.icon({
				iconUrl: '2273e3d8ad9264b7daa5bdbf8e6b47f8.png',
				shadowUrl: '44a526eed258222515aa21eaffd14a96.png'
			})
		});


## Contribute
PRs accepted. If you are part of Asymmetrik, please make contributions on feature branches off of the ```develop``` branch. If you are outside of Asymmetrik, please fork our repo to make contributions.


## License
See LICENSE in repository for details.


## Credits
**[Leaflet](http://leafletjs.com/)** Is an awesome mapping package.


