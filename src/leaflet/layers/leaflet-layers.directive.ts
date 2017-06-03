import { Directive, DoCheck, Input, IterableDiffer, IterableDiffers, OnInit } from '@angular/core';

import * as L from 'leaflet';

import { LeafletDirective } from '../core/leaflet.directive';
import { LeafletDirectiveWrapper } from '../core/leaflet.directive.wrapper';


@Directive({
	selector: '[leafletLayers]'
})
export class LeafletLayersDirective
	implements DoCheck, OnInit {

	// Array of configured layers
	layersValue: L.Layer[];

	// Differ to do change detection on the array
	layersDiffer: IterableDiffer<L.Layer>;

	// Set/get the layers
	@Input('leafletLayers')
	set layers(v: L.Layer[]) {
		this.layersValue = v;

		// Now that we have a differ, do an immediate layer update
		this.updateLayers();
	}
	get layers(): L.Layer[] {
		return this.layersValue;
	}

	// Wrapper for the leaflet directive (manages the parent directive)
	private leafletDirective: LeafletDirectiveWrapper;

	constructor(leafletDirective: LeafletDirective, private differs: IterableDiffers) {
		this.leafletDirective = new LeafletDirectiveWrapper(leafletDirective);
		this.layersDiffer = this.differs.find([]).create<L.Layer>();
	}

	ngDoCheck() {
		this.updateLayers();
	}

	ngOnInit() {

		// Init the map
		this.leafletDirective.init();

		// Update layers once the map is ready
		this.updateLayers();

	}

	/**
	 * Update the state of the layers.
	 * We use an iterable differ to synchronize the map layers with the state of the bound layers array.
	 * This is important because it allows us to react to changes to the contents of the array as well
	 * as changes to the actual array instance.
	 */
	private updateLayers() {

		let map = this.leafletDirective.getMap();

		if (null != map && null != this.layersDiffer) {

			const changes = this.layersDiffer.diff(this.layersValue);
			if (null != changes) {
				changes.forEachRemovedItem((c) => {
					map.removeLayer(c.item);
				});
				changes.forEachAddedItem((c) => {
					map.addLayer(c.item);
				});
			}

		}

	}

}
