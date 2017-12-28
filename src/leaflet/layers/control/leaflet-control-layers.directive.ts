import { Directive, DoCheck, Input, KeyValueDiffer, KeyValueDiffers, NgZone, OnDestroy, OnInit } from '@angular/core';

import { Layer } from 'leaflet';

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
	implements DoCheck, OnDestroy, OnInit {

	// Control Layers Configuration
	layersControlConfigValue: LeafletControlLayersConfig;

	baseLayersDiffer: KeyValueDiffer<string, Layer>;
	overlaysDiffer: KeyValueDiffer<string, Layer>;

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

	constructor(leafletDirective: LeafletDirective, private differs: KeyValueDiffers, private zone: NgZone) {
		this.leafletDirective = new LeafletDirectiveWrapper(leafletDirective);
		this.controlLayers = new LeafletControlLayersWrapper(zone);

		// Generate differs
		this.baseLayersDiffer = this.differs.find({}).create<string, Layer>();
		this.overlaysDiffer = this.differs.find({}).create<string, Layer>();

	}

	ngOnInit() {

		// Init the map
		this.leafletDirective.init();

		// Set up all the initial settings
		this.zone.runOutsideAngular(() => {
			this.controlLayers
				.init({}, this.layersControlOptions)
				.addTo(this.leafletDirective.getMap());
		});

		this.updateLayers();

	}

	ngOnDestroy() {

		this.layersControlConfig = { baseLayers: {}, overlays: {} };

		this.zone.runOutsideAngular(() => {
			this.controlLayers.getLayersControl().remove();
		});

	}

	ngDoCheck() {
		this.updateLayers();
	}

	protected updateLayers() {

		const map = this.leafletDirective.getMap();
		const layersControl = this.controlLayers.getLayersControl();

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
