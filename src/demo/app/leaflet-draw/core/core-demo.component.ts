import { Component } from '@angular/core';

import * as L from 'leaflet';

import { LeafletDrawCoreDemoModel } from './core-demo.model';

@Component({
	selector: 'leaflet-draw-core-demo',
	templateUrl: './core-demo.component.html'
})
export class LeafletDrawCoreDemoComponent {

	options = {
		layers: [
			L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: 'Open Street Map' })
		],
		zoom: 5,
		center: L.latLng({ lat: 46.879966, lng: -121.726909 })
	};

	constructor() { }

}
