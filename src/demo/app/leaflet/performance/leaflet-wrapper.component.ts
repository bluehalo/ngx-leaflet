import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import * as L from 'leaflet';

@Component({
	selector: 'leafletWrapper',
	templateUrl: './leaflet-wrapper.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class LeafletWrapperComponent {

	@Input('leafletMarkers')
	markers: L.Layer[] = [];

	// Open Street Map definitions
	LAYER_OSM = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: 'Open Street Map' });

	// Values to bind to Leaflet Directive
	options = {
		layers: [ this.LAYER_OSM ],
		zoom: 10,
		center: L.latLng([ 46.879966, -121.726909 ])
	};
}
