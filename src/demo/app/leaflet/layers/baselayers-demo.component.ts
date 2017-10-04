import { Component } from '@angular/core';

import { latLng, tileLayer } from 'leaflet';

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
		layer: tileLayer('http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png', {
			maxZoom: 18,
			attribution: 'Open Cycle Map'
		})
	};
	LAYER_OSM = {
		id: 'openstreetmap',
		name: 'Open Street Map',
		enabled: false,
		layer: tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
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
		center: latLng(46.879966, -121.726909)
	};

}
