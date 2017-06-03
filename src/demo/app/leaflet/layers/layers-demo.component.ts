import { Component } from '@angular/core';

import * as L from 'leaflet';

import { LeafletLayersDemoModel } from './layers-demo.model';

@Component({
	selector: 'leafletLayersDemo',
	templateUrl: './layers-demo.component.html'
})
export class LeafletLayersDemoComponent {

	// Open Street Map and Open Cycle Map definitions
	LAYER_OCM = {
		id: 'opencyclemap',
		name: 'Open Cycle Map',
		enabled: true,
		layer: L.tileLayer('http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png', {
			maxZoom: 18,
			attribution: 'Open Cycle Map'
		})
	};
	LAYER_OSM = {
		id: 'openstreetmap',
		name: 'Open Street Map',
		enabled: false,
		layer: L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			maxZoom: 18,
			attribution: 'Open Street Map'
		})
	};

	circle = {
		id: 'circle',
		name: 'Circle',
		enabled: true,
		layer: L.circle([ 46.95, -122 ], { radius: 5000 })
	};
	polygon = {
		id: 'polygon',
		name: 'Polygon',
		enabled: true,
		layer: L.polygon([[ 46.8, -121.85 ], [ 46.92, -121.92 ], [ 46.87, -121.8 ]])
	};
	square = {
		id: 'square',
		name: 'Square',
		enabled: true,
		layer: L.polygon([[ 46.8, -121.55 ], [ 46.9, -121.55 ], [ 46.9, -121.7 ], [ 46.8, -121.7 ]])
	};
	marker = {
		id: 'marker',
		name: 'Marker',
		enabled: true,
		layer: L.marker([ 46.879966, -121.726909 ], {
			icon: L.icon({
				iconSize: [ 25, 41 ],
				iconAnchor: [ 13, 41 ],
				iconUrl: '2273e3d8ad9264b7daa5bdbf8e6b47f8.png',
				shadowUrl: '44a526eed258222515aa21eaffd14a96.png'
			})
		})
	};
	geoJSON = {
		id: 'geoJSON',
		name: 'Geo JSON Polygon',
		enabled: true,
		layer: L.geoJSON(
			({
				type: 'Polygon',
				coordinates: [[
					[ -121.6, 46.87 ],
					[ -121.5, 46.87 ],
					[ -121.5, 46.93],
					[ -121.6, 46.87 ]
				]]
			}) as any,
			{ style: () => { return { color: '#ff7800' }; } })
	};

	// Form model object
	model = new LeafletLayersDemoModel(
		[ this.LAYER_OSM, this.LAYER_OCM ],
		this.LAYER_OCM.id,
		[ this.circle, this.polygon, this.square, this.marker, this.geoJSON ]
	);


	// Values to bind to Leaflet Directive
	layers: L.Layer[];
	layersControl = {
		baseLayers: {
			'Open Street Map': this.LAYER_OSM.layer,
			'Open Cycle Map': this.LAYER_OCM.layer
		},
		overlays: {
			Circle: this.circle.layer,
			Square: this.square.layer,
			Polygon: this.polygon.layer,
			Marker: this.marker.layer,
			GeoJSON: this.geoJSON.layer
		}
	};
	options = {
		zoom: 10,
		center: L.latLng([ 46.879966, -121.726909 ])
	};

	constructor() {
		this.onApply();
	}

	onApply() {

		// Get the active base layer
		let baseLayer = this.model.baseLayers.find((l) => { return l.id === this.model.baseLayer; });

		// Get all the active overlay layers
		let newLayers = this.model.overlayLayers
			.filter((l) => { return l.enabled; })
			.map((l) => { return l.layer; });
		newLayers.unshift(baseLayer.layer);

		this.layers = newLayers;

		return false;
	}
}
