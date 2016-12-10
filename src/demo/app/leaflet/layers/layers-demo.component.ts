import { Component } from '@angular/core';

import * as L from 'leaflet';

import { LeafletLayersDemoModel } from './layers-demo.model';

@Component({
	selector: 'leaflet-layers-demo',
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


	// Form model object
	model = new LeafletLayersDemoModel(
		[ this.LAYER_OSM, this.LAYER_OCM ],
		this.LAYER_OCM.id
	);


	// Values to bind to Leaflet Directive
	layers: L.Layer[];
	layersControl: any;
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
		this.layersControl = {
			baseLayers: {
				'Open Street Map': this.LAYER_OSM.layer,
				'Open Cycle Map': this.LAYER_OCM.layer
			}
		};

		return false;
	}
}
