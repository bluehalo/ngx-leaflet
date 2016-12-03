import { Component } from '@angular/core';

import * as L from 'leaflet';

@Component({
	selector: 'leaflet-demo',
	templateUrl: './leaflet-demo.component.html'
})
export class LeafletDemoComponent {

	showDemo = false;
	layers = [
		L.tileLayer('http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png', {
			maxZoom: 18,
			attribution: 'Open Cycle Map'
		}),
		L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			maxZoom: 18,
			attribution: 'Open Street Map'
		})

	];
	zoom = 4;

	constructor() {
		setTimeout(() => {
			this.showDemo = true;
		}, 500);
	}

}
