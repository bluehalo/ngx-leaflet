import { Directive, Input, OnChanges, OnInit, SimpleChange } from '@angular/core';

import * as L from 'leaflet';

import { LeafletDirective } from '@asymmetrik/angular2-leaflet';


@Directive({
	selector: '[leaflet-draw]'
})
export class LeafletDrawDirective
	implements OnChanges, OnInit {

	leafletDirective: LeafletDirective;

	// Reference to the primary map object
	map: L.Map;

	constructor(leafletDirective: LeafletDirective) {
		this.leafletDirective = leafletDirective;
	}

	ngOnInit() {

	}

	ngOnChanges(changes: { [key: string]: SimpleChange }) {

	}

}
