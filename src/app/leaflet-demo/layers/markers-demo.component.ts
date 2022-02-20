import { Component } from '@angular/core';

import { icon, latLng, Layer, marker, tileLayer } from 'leaflet';

@Component({
	selector: 'leafletMarkersDemo',
	templateUrl: './markers-demo.component.html'
})
export class LeafletMarkersDemoComponent {

	// Open Street Map definitions
	LAYER_OSM = tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: 'Open Street Map' });

	// Values to bind to Leaflet Directive
	options = {
		layers: [ this.LAYER_OSM ],
		zoom: 10,
		center: latLng(46.879966, -121.726909)
	};

	markers: Layer[] = [];

	addMarker() {
		const newMarker = marker(
			[ 46.879966 + 0.1 * (Math.random() - 0.5), -121.726909 + 0.1 * (Math.random() - 0.5) ],
			{
				icon: icon({
					iconSize: [ 25, 41 ],
					iconAnchor: [ 13, 41 ],
					iconUrl: 'assets/leaflet/marker-icon.png',
					iconRetinaUrl: 'assets/leaflet/marker-icon-2x.png',
					shadowUrl: 'assets/leaflet/marker-shadow.png'
				})
			}
		);

		this.markers.push(newMarker);
	}

	removeMarker() {
		this.markers.pop();
	}
}
