import { OnInit } from '@angular/core';

import * as L from 'leaflet';

import { LeafletDirective } from './leaflet.directive';

export abstract class LeafletDirectiveExtensionBase
implements OnInit {

	// Reference to the main leaflet directive
	protected leafletDirective: LeafletDirective;

	// Refernece to the main map object on which this directive operates
	protected map: L.Map;


	constructor(leafletDirective: LeafletDirective) {
		this.leafletDirective = leafletDirective;
	}

	protected ngOnInit() {

		// Get the map
		this.map = this.leafletDirective.getMap();

	}

}
