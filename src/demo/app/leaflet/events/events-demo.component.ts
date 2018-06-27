import { Component } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { debounceTime, scan } from 'rxjs/operators';

import { latLng, LatLng, tileLayer } from 'leaflet';


@Component({
	selector: 'leafletEventsDemo',
	templateUrl: './events-demo.component.html'
})
export class LeafletEventsDemoComponent {

	zoom: number = 5;

	center: LatLng = latLng([ 46.879966, -121.726909 ]);
	eventLog: string = '';

	options = {
		zoom: this.zoom,
		center: this.center
	};

	baselayer = tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: 'Open Street Map' });

	eventSubject = new Subject<string>();

	constructor() {
		this.eventSubject.pipe(
				scan((acc: string, v: string) => `${v}\n${acc}`, ''),
				debounceTime(50)
			)
			.subscribe((v) => { this.eventLog = v; } );
	}

	handleEvent(eventType: string) {
		this.eventSubject.next(eventType);
	}

}
