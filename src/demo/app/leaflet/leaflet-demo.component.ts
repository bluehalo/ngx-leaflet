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
		})
	];
	zoom = 12;
	center = L.latLng([ 46.879966, -121.726909 ]);

	constructor() {
		setTimeout(() => {
			this.showDemo = true;
		}, 1000);
	}

}
