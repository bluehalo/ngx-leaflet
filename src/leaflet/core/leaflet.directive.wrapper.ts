import { LeafletDirective } from './leaflet.directive';

export class LeafletDirectiveWrapper {

	// Reference to the main leaflet directive
	protected leafletDirective: LeafletDirective;

	constructor(leafletDirective: LeafletDirective) {
		this.leafletDirective = leafletDirective;
	}

	init() {
		// Nothing for now
	}

	getMap() {
		return this.leafletDirective.getMap();
	}

}
