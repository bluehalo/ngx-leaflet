import { Directive, DoCheck, Input, IterableDiffer, IterableDiffers, NgZone, OnDestroy, OnInit } from '@angular/core';

import { Layer} from 'leaflet';

import { LeafletDirective } from '../core/leaflet.directive';
import { LeafletDirectiveWrapper } from '../core/leaflet.directive.wrapper';


/**
 * Layers directive
 *
 * This directive is used to directly control map layers. As changes are made to the input array of
 * layers, the map is synched to the array. As layers are added or removed from the input array, they
 * are also added or removed from the map. The input array is treated as immutable. To detect changes,
 * you must change the array instance.
 *
 * Important Note: The input layers array is assumed to be immutable. This means you need to use an
 * immutable array implementation or create a new copy of your array when you make changes, otherwise
 * this directive won't detect the change. This is by design. It's for performance reasons. Change
 * detection of mutable arrays requires diffing the state of the array on every DoCheck cycle, which
 * is extremely expensive from a time complexity perspective.
 *
 */
@Directive({
	selector: '[leafletLayers]'
})
export class LeafletLayersDirective
	implements DoCheck, OnDestroy, OnInit {

	// Array of configured layers
	layersValue: Layer[];

	// Differ to do change detection on the array
	layersDiffer: IterableDiffer<Layer>;

	// Set/get the layers
	@Input('leafletLayers')
	set layers(v: Layer[]) {
		this.layersValue = v;

		// Now that we have a differ, do an immediate layer update
		this.updateLayers();
	}
	get layers(): Layer[] {
		return this.layersValue;
	}

	// Wrapper for the leaflet directive (manages the parent directive)
	private leafletDirective: LeafletDirectiveWrapper;

	constructor(leafletDirective: LeafletDirective, private differs: IterableDiffers, private zone: NgZone) {
		this.leafletDirective = new LeafletDirectiveWrapper(leafletDirective);
		this.layersDiffer = this.differs.find([]).create<Layer>();
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

	ngOnDestroy() {
		this.layers = [];
	}

	/**
	 * Update the state of the layers.
	 * We use an iterable differ to synchronize the map layers with the state of the bound layers array.
	 * This is important because it allows us to react to changes to the contents of the array as well
	 * as changes to the actual array instance.
	 */
	private updateLayers() {

		const map = this.leafletDirective.getMap();

		if (null != map && null != this.layersDiffer) {

			const changes = this.layersDiffer.diff(this.layersValue);
			if (null != changes) {

				// Run outside angular to ensure layer events don't trigger change detection
				this.zone.runOutsideAngular(() => {

					changes.forEachRemovedItem((c) => {
						map.removeLayer(c.item);
					});
					changes.forEachAddedItem((c) => {
						map.addLayer(c.item);
					});

				});

			}

		}

	}

}
