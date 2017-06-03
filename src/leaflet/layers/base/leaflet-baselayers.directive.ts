import { Directive, DoCheck, Input, KeyValueDiffer, KeyValueDiffers, OnInit } from '@angular/core';

import * as L from 'leaflet';

import { LeafletUtil } from '../../core/leaflet.util';
import { LeafletDirective } from '../../core/leaflet.directive';
import { LeafletDirectiveWrapper } from '../../core/leaflet.directive.wrapper';
import { LeafletControlLayersWrapper } from '../control/leaflet-control-layers.wrapper';


@Directive({
	selector: '[leafletBaseLayers]'
})
export class LeafletBaseLayersDirective
	implements DoCheck, OnInit {

	// Base Layers
	baseLayersValue: { [name: string]: L.Layer };

	// Base Layers Map Differ
	baseLayersDiffer: KeyValueDiffer<string, L.Layer>;

	// Set/get baseLayers
	@Input('leafletBaseLayers')
	set baseLayers(v: { [name: string]: L.Layer }) {
		this.baseLayersValue = v;

		this.updateBaseLayers();
	}
	get baseLayers(): { [name: string]: L.Layer } {
		return this.baseLayersValue;
	}

	// Control Options
	@Input('leafletLayersControlOptions') layersControlOptions: L.Control.LayersOptions;

	// Active Base Layer
	baseLayer: L.Layer;

	private leafletDirective: LeafletDirectiveWrapper;
	private controlLayers: LeafletControlLayersWrapper;

	constructor(leafletDirective: LeafletDirective, private differs: KeyValueDiffers) {
		this.leafletDirective = new LeafletDirectiveWrapper(leafletDirective);
		this.controlLayers = new LeafletControlLayersWrapper();
		this.baseLayersDiffer = this.differs.find({}).create<string, L.Layer>();
	}

	ngOnInit() {

		// Init the map
		this.leafletDirective.init();

		// Initially configure the controlLayers
		this.controlLayers
			.init({}, this.layersControlOptions)
			.addTo(this.leafletDirective.getMap());

		this.updateBaseLayers();

	}

	ngDoCheck() {
		this.updateBaseLayers();
	}

	protected updateBaseLayers() {

		let map = this.leafletDirective.getMap();
		let layersControl = this.controlLayers.getLayersControl();

		if (null != map && null != layersControl && null != this.baseLayersDiffer) {
			const changes = this.baseLayersDiffer.diff(this.baseLayersValue);
			const results = this.controlLayers.applyBaseLayerChanges(changes);

			if (results.changed()) {
				this.syncBaseLayer();
			}
		}

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
