import { Directive, Input, OnChanges, OnInit, SimpleChange } from '@angular/core';

import * as L from 'leaflet';

import { LeafletDirective } from '../core/leaflet.directive';

import { LeafletDirectiveWrapper } from '../core/leaflet.directive.wrapper';
import { LeafletLayersUtil } from './leaflet-layers.util';


@Directive({
	selector: '[leafletLayers]'
})
export class LeafletLayersDirective
	implements OnChanges, OnInit {

	// Array of configured layers
	@Input('leafletLayers') layers: L.Layer [];

	private leafletDirective: LeafletDirectiveWrapper;

	constructor(leafletDirective: LeafletDirective) {
		this.leafletDirective = new LeafletDirectiveWrapper(leafletDirective);
	}

	ngOnInit() {

		// Init the map
		this.leafletDirective.init();

		// The way we've set this up, map isn't set until after the first round of changes has gone through
		this.setLayers(this.layers, []);

	}

	ngOnChanges(changes: { [key: string]: SimpleChange }) {

		// Set the layers
		if (changes['layers']) {
			let c = changes['layers'].currentValue;
			let p = (changes['layers'].isFirstChange()) ? [] : changes['layers'].previousValue;

			this.setLayers(c, p);
		}

	}

	/**
	 * Replace the current layers in the map with the provided array
	 * @param layers The new complete array of layers for the map
	 */
	private setLayers(newLayers: L.Layer[], prevLayers: L.Layer[]) {

		let map = this.leafletDirective.getMap();

		if (null != map) {

			let diff = LeafletLayersUtil.diffLayers(newLayers, prevLayers);

			// Remove the layers
			diff.remove.forEach((l) => { map.removeLayer(l); });

			// Add the new layers
			diff.add.forEach((l) => { map.addLayer(l); });

		}

	}

}
