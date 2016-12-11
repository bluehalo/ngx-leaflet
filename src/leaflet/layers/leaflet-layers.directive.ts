import { Directive, Input, OnChanges, OnInit, SimpleChange } from '@angular/core';

import * as L from 'leaflet';

import { LeafletDirective } from '../core/leaflet.directive';
import { LeafletUtil } from '../util/leaflet-util';

@Directive({
	selector: '[leafletLayers]'
})
export class LeafletLayersDirective
	implements OnChanges, OnInit {

	map: L.Map;
	leafletDirective: LeafletDirective;

	// Array of configured layers
	@Input('leafletLayers') layers: L.Layer [];

	constructor(leafletDirective: LeafletDirective) {
		this.leafletDirective = leafletDirective;
	}

	ngOnInit() {

		// Get the map from the parent directive
		this.map = this.leafletDirective.getMap();

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

		let map = this.map;

		if (null != map) {

			let toRemove: L.Layer[];
			let layers: L.Layer[];

			if (null == newLayers) { newLayers = []; }
			if (null == prevLayers) { prevLayers = []; }

			// Figure out which layers need to be removed (prev - new)
			toRemove = prevLayers
				.filter((pl) => {
					return !(newLayers.find((nl) => { return (pl === nl); }));
				});

			// Figure out which layers need to be added (new - prev)
			layers = newLayers
				.filter((pl) => {
					return !(prevLayers.find((nl) => { return (pl === nl); }));
				});

			// Remove the layers
			toRemove.forEach((l) => { map.removeLayer(l); });

			// Add the new layers
			layers.forEach((l) => { map.addLayer(l); });

		}

	}

}
