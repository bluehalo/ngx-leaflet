import { Directive, DoCheck, Input, KeyValueDiffer, KeyValueDiffers, OnInit } from '@angular/core';

import { LeafletDirective } from '../../core/leaflet.directive';
import { LeafletDirectiveWrapper } from '../../core/leaflet.directive.wrapper';
import { LeafletControlLayersWrapper } from './leaflet-control-layers.wrapper';
import { LeafletControlLayersConfig } from './leaflet-control-layers-config.model';

/**
 * Layers Control
 *
 * This directive is used to configure the layers control. The input accepts an object with two
 * key-value maps of layer name -> layer. Mutable changes are detected. On changes, a differ is
 * used to determine what changed so that layers are appropriately added or removed.
 *
 * To specify which layer to show as the 'active' baselayer, you will want to add it to the map
 * using the layers directive. Otherwise, the last one it sees will be used.
 */
@Directive({
	selector: '[leafletLayersControl]'
})
export class LeafletLayersControlDirective
	implements DoCheck, OnInit {

	// Control Layers Configuration
	layersControlConfigValue: LeafletControlLayersConfig;

	baseLayersDiffer: KeyValueDiffer<string, L.Layer>;
	overlaysDiffer: KeyValueDiffer<string, L.Layer>;

	@Input('leafletLayersControl')
	set layersControlConfig(v: LeafletControlLayersConfig) {

		// Validation/init stuff
		if (null == v) { v = new LeafletControlLayersConfig(); }
		if (null == v.baseLayers) { v.baseLayers = {}; }
		if (null == v.overlays) { v.overlays = {}; }

		// Store the value
		this.layersControlConfigValue = v;

		// Update the map
		this.updateLayers();

	}
	get layersControlConfig(): LeafletControlLayersConfig {
		return this.layersControlConfigValue;
	}

	@Input('leafletLayersControlOptions') layersControlOptions: any;

	private controlLayers: LeafletControlLayersWrapper;
	private leafletDirective: LeafletDirectiveWrapper;

	constructor(leafletDirective: LeafletDirective, private differs: KeyValueDiffers) {
		this.leafletDirective = new LeafletDirectiveWrapper(leafletDirective);
		this.controlLayers = new LeafletControlLayersWrapper();

		// Generate differs
		this.baseLayersDiffer = this.differs.find({}).create<string, L.Layer>();
		this.overlaysDiffer = this.differs.find({}).create<string, L.Layer>();

	}

	ngOnInit() {

		// Init the map
		this.leafletDirective.init();

		// Set up all the initial settings
		this.controlLayers
			.init({}, this.layersControlOptions)
			.addTo(this.leafletDirective.getMap());

		this.updateLayers();

	}

	ngDoCheck() {
		this.updateLayers();
	}

	protected updateLayers() {

		let map = this.leafletDirective.getMap();
		let layersControl = this.controlLayers.getLayersControl();

		if (null != map && null != layersControl) {
			// Run the baselayers differ
			if (null != this.baseLayersDiffer && null != this.layersControlConfigValue.baseLayers) {
				const changes = this.baseLayersDiffer.diff(this.layersControlConfigValue.baseLayers);
				this.controlLayers.applyBaseLayerChanges(changes);
			}

			// Run the overlays differ
			if (null != this.overlaysDiffer && null != this.layersControlConfigValue.overlays) {
				const changes = this.overlaysDiffer.diff(this.layersControlConfigValue.overlays);
				this.controlLayers.applyOverlayChanges(changes);
			}
		}

	}

}
