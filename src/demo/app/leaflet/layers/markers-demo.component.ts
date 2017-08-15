import { Component } from '@angular/core';

import * as L from 'leaflet';

@Component({
	selector: 'leafletMarkersDemo',
	templateUrl: './markers-demo.component.html'
})
export class LeafletMarkersDemoComponent {

	// Open Street Map definitions
	LAYER_OSM = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: 'Open Street Map' });

	// Values to bind to Leaflet Directive
	options = {
		layers: [ this.LAYER_OSM ],
		zoom: 10,
		center: L.latLng([ 46.879966, -121.726909 ])
	};

	markers: L.Layer[] = [];

	addMarker() {
		let marker = L.marker(
			[ 46.879966 + 0.1 * (Math.random() - 0.5), -121.726909 + 0.1 * (Math.random() - 0.5) ],
			{
				icon: L.icon({
					iconSize: [ 25, 41 ],
					iconAnchor: [ 13, 41 ],
					iconUrl: '2273e3d8ad9264b7daa5bdbf8e6b47f8.png',
					shadowUrl: '44a526eed258222515aa21eaffd14a96.png'
				})
			}
		);

		this.markers.push(marker);
	}
}
