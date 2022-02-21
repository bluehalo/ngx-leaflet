import { ChangeDetectionStrategy, Component } from '@angular/core';

import { icon, Layer, marker } from 'leaflet';

@Component({
	selector: 'leafletPerformanceDemo',
	templateUrl: './performance-demo.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class LeafletPerformanceDemoComponent {

	markers: Layer[] = [];

	mutableAdd() {
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

	mutableRemove() {
		this.markers.pop();
	}

	newArray() {
		this.markers = this.markers.slice();
	}

}
