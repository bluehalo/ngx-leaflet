import { LeafletDirective } from './leaflet.directive';

import { Map } from 'leaflet';

export class LeafletDirectiveWrapper {

	// Reference to the main leaflet directive
	protected leafletDirective: LeafletDirective;

	constructor(leafletDirective: LeafletDirective) {
		this.leafletDirective = leafletDirective;
	}

	init() {
		// Nothing for now
	}

	getMap(): Map {
		return this.leafletDirective.getMap();
	}

}
