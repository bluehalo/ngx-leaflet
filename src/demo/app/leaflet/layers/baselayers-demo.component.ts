import { Component } from '@angular/core';

import * as L from 'leaflet';

@Component({
	selector: 'leafletBaselayersDemo',
	templateUrl: './baselayers-demo.component.html'
})
export class LeafletBaseLayersDemoComponent {

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

	// Values to bind to Leaflet Directive
	layersControlOptions = { position: 'bottomright' };
	baseLayers = {
		'Open Street Map': this.LAYER_OSM.layer,
		'Open Cycle Map': this.LAYER_OCM.layer
	};
	options = {
		zoom: 10,
		center: L.latLng([ 46.879966, -121.726909 ])
	};

}
