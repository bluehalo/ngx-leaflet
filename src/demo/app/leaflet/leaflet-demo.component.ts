import { Component } from '@angular/core';

import * as L from 'leaflet';

import { LeafletDemoModel } from './leaflet-demo.model';

@Component({
	selector: 'leaflet-demo',
	templateUrl: './leaflet-demo.component.html'
})
export class LeafletDemoComponent {

	// Open Street Map and Open Cycle Map definitions
	LAYER_OSM = {
		id: 'opencyclemap',
		name: 'Open Cycle Map',
		enabled: true,
		layer: L.tileLayer('http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png', {
			maxZoom: 18,
			attribution: 'Open Cycle Map'
		})
	};
	LAYER_OCM = {
		id: 'openstreetmap',
		name: 'Open Street Map',
		enabled: false,
		layer: L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			maxZoom: 18,
			attribution: 'Open Street Map'
		})
	};

	showDemo = false;

	// Form model object
	model = new LeafletDemoModel(
		[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
		12,
		46.879966, -121.726909,
		[ this.LAYER_OSM, this.LAYER_OCM ],
		this.LAYER_OSM.id
	);


	// Leaflet values
	leaflet: {
		layers: L.Layer[],
		zoom: number,
		center: L.LatLng
	} = {
		layers: [],
		zoom: 0,
		center: L.latLng([ 0, 0 ])
	};

	constructor() {
		this.onApply();

		setTimeout(() => {
			this.showDemo = true;
		}, 1000);
	}

	onApply() {

		// Get the active base layer
		let baseLayer = this.model.baseLayers.find((l) => { return l.id === this.model.baseLayer; });

		// Get all the active control layers
		let newLayers = this.model.controlLayers
			.filter((l) => { return l.enabled; })
			.map((l) => { return l.layer; });
		newLayers.unshift(baseLayer.layer);

		this.leaflet.layers = newLayers;
		this.leaflet.zoom = this.model.zoom;
		this.leaflet.center = L.latLng([ this.model.latitude, this.model.longitude]);

		return false;
	}
}
