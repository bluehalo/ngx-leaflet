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
					iconUrl: '2b3e1faf89f94a4835397e7a43b4f77d.png',
					iconRetinaUrl: '680f69f3c2e6b90c1812a813edf67fd7.png',
					shadowUrl: 'a0c6cc1401c107b501efee6477816891.png'
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
