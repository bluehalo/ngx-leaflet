import { Directive, Input, OnChanges, OnInit, SimpleChange } from '@angular/core';

import * as L from 'leaflet';

import { LeafletDirective } from '../core/leaflet.directive';

@Directive({
	selector: '[leafletLayers]'
})
export class LeafletLayersDirective
	implements OnChanges, OnInit {

	leafletDirective: LeafletDirective;

	// Reference to the primary map object
	map: L.Map;

	// Array of configured layers
	@Input('leafletLayers') layers: L.Layer [];

	constructor(leafletDirective: LeafletDirective) {
		this.leafletDirective = leafletDirective;
	}

	ngOnInit() {

		// Set up all the initial settings
		this.setLayers(this.layers);

	}

	ngOnChanges(changes: { [key: string]: SimpleChange }) {

		// Set the layers
		if (changes['layers']) {
			this.setLayers(changes['layers'].currentValue);
		}

	}

	/**
	 * Replace the current layers in the map with the provided array
	 * @param layers The new complete array of layers for the map
	 */
	private setLayers(layers: L.Layer[]) {

		let map = this.leafletDirective.getMap();

		if (null != map) {

			// Remove all existing layers
			map.eachLayer((layer: L.Layer) => {
				map.removeLayer(layer);
			});

			// Add the new layers
			if(null != layers) {
				layers.forEach((layer: L.Layer) => {
					map.addLayer(layer);
				});
			}

		}

	}

}
