import { Component } from '@angular/core';

import * as L from 'leaflet';

@Component({
	selector: 'leaflet-core-demo',
	templateUrl: './core-demo.component.html'
})
export class LeafletCoreDemoComponent {

	/*
	 * This is a specification of the leaflet options
	 */
	optionsSpec: {
		layers: any[],
		zoom: number,
		center: number[]
	} = {
		layers: [
			{
				url: 'http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png',
				maxZoom: 18,
				attribution: 'Open Cycle Map'
			},
			{
				url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
				maxZoom: 18,
				attribution: 'Open Street Map'
			},
		],
		zoom: 5,
		center: [ 46.879966, -121.726909 ]
	};

	/*
	 * This is the leaflet map options object that we're going to use for input binding
	 */
	options = {
		layers: this.optionsSpec.layers.map((l) => {
			return L.tileLayer(l.url, { maxZoom: l.maxZoom, attribution: l.attribution });
		}),
		zoom: this.optionsSpec.zoom,
		center: L.latLng({ lat: this.optionsSpec.center[0], lng: this.optionsSpec.center[1] })
	};

	fitOptions = {
		padding: 100,
		maxZoom: 5
	};

	panOptions = {
		animate: true,
		duration: 2
	};

	zoomOptions = {
		animate: true,
		duration: 2
	};

	constructor() { }

}
