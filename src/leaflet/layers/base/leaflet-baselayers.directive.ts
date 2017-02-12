import { Directive, Input, OnChanges, OnInit, SimpleChange } from '@angular/core';

import * as L from 'leaflet';

import { LeafletUtil } from '../../core/leaflet.util';
import { LeafletDirective } from '../../core/leaflet.directive';
import { LeafletDirectiveWrapper } from '../../core/leaflet.directive.wrapper';
import { LeafletControlLayersWrapper } from '../control/leaflet-control-layers.wrapper';
import { LeafletControlLayersConfig } from '../control/leaflet-control-layers-config.model';


@Directive({
	selector: '[leafletBaseLayers]'
})
export class LeafletBaseLayersDirective
	implements OnChanges, OnInit {

	// Base Layers
	@Input('leafletBaseLayers') baseLayers: L.Control.LayersObject;

	// Control Options
	@Input('leafletLayersControlOptions') layersControlOptions: L.Control.LayersOptions;

	// Active Base Layer
	baseLayer: L.Layer;

	private leafletDirective: LeafletDirectiveWrapper;
	private controlLayers: LeafletControlLayersWrapper;

	constructor(leafletDirective: LeafletDirective) {
		this.leafletDirective = new LeafletDirectiveWrapper(leafletDirective);
		this.controlLayers = new LeafletControlLayersWrapper();
	}

	ngOnInit() {

		// Init the map
		this.leafletDirective.init();

		// Initially configure the controlLayers
		this.controlLayers
			.init({ baseLayers: this.baseLayers }, this.layersControlOptions)
			.addTo(this.leafletDirective.getMap());

		// Sync the baselayer (will default to the first layer in the map)
		this.syncBaseLayer();
	}

	ngOnChanges(changes: { [key: string]: SimpleChange }) {

		// Set the new baseLayers
		if (changes['baseLayers']) {
			this.setBaseLayers(
				changes['baseLayers'].currentValue,
				changes['baseLayers'].previousValue);
		}

	}

	protected setBaseLayers(newBaseLayers: L.Control.LayersObject, prevBaseLayers: L.Control.LayersObject) {

		// Update the layers control
		this.controlLayers.setLayersControlConfig(
			new LeafletControlLayersConfig(newBaseLayers),
			new LeafletControlLayersConfig(prevBaseLayers));

		// Sync the new baseLayer
		this.syncBaseLayer();
	}

	/**
	 * Check the current base layer and change it to the new one if necessary
	 */
	protected syncBaseLayer() {

		let map = this.leafletDirective.getMap();
		let layers = LeafletUtil.mapToArray(this.baseLayers);
		let foundLayer: L.Layer;

		// Search all the layers in the map to see if we can find them in the baselayer array
		map.eachLayer((l: L.Layer) => {
			foundLayer = layers.find((bl) => { return l === bl; });
		});

		// Did we find the layer?
		if (null != foundLayer) {
			// Yes - set the baselayer to the one we found
			this.baseLayer = foundLayer;
		}
		else {
			// No - set the baselayer to the first in the array and add it to the map
			if (layers.length > 0) {
				this.baseLayer = layers[0];
				this.baseLayer.addTo(map);
			}
		}

	}
}
