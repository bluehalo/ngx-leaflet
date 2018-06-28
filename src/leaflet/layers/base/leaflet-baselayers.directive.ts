import {
	Directive, DoCheck, EventEmitter, Input, KeyValueDiffer, KeyValueDiffers, NgZone, OnDestroy,
	OnInit, Output
} from '@angular/core';

import { Control, Layer } from 'leaflet';

import { LeafletUtil } from '../../core/leaflet.util';
import { LeafletDirective } from '../../core/leaflet.directive';
import { LeafletDirectiveWrapper } from '../../core/leaflet.directive.wrapper';
import { LeafletControlLayersWrapper } from '../control/leaflet-control-layers.wrapper';


/**
 * Baselayers directive
 *
 * This directive is provided as a convenient way to add baselayers to the map. The input accepts
 * a key-value map of layer name -> layer. Mutable changed are detected. On changes, a differ is
 * used to determine what changed so that layers are appropriately added or removed. This directive
 * will also add the layers control so users can switch between available base layers.
 *
 * To specify which layer to show as the 'active' baselayer, you will want to add it to the map
 * using the layers directive. Otherwise, the plugin will use the last one it sees.
 */
@Directive({
	selector: '[leafletBaseLayers]'
})
export class LeafletBaseLayersDirective
	implements DoCheck, OnDestroy, OnInit {

	// Base Layers
	baseLayersValue: { [name: string]: Layer };

	// Base Layers Map Differ
	baseLayersDiffer: KeyValueDiffer<string, Layer>;

	// Set/get baseLayers
	@Input('leafletBaseLayers')
	set baseLayers(v: { [name: string]: Layer }) {
		this.baseLayersValue = v;

		this.updateBaseLayers();
	}
	get baseLayers(): { [name: string]: Layer } {
		return this.baseLayersValue;
	}

	// Control Options
	@Input('leafletLayersControlOptions') layersControlOptions: Control.LayersOptions;

	// Output for once the layers control is ready
	@Output('leafletLayersControlReady') layersControlReady = new EventEmitter<Control.Layers>();

	// Active Base Layer
	private baseLayer: Layer;

	private leafletDirective: LeafletDirectiveWrapper;
	private controlLayers: LeafletControlLayersWrapper;

	constructor(leafletDirective: LeafletDirective, private differs: KeyValueDiffers, private zone: NgZone) {
		this.leafletDirective = new LeafletDirectiveWrapper(leafletDirective);
		this.controlLayers = new LeafletControlLayersWrapper(this.zone, this.layersControlReady);
		this.baseLayersDiffer = this.differs.find({}).create<string, Layer>();
	}

	ngOnDestroy() {
		this.baseLayers = {};
		this.controlLayers.getLayersControl().remove();
	}

	ngOnInit() {

		// Init the map
		this.leafletDirective.init();

		// Create the control outside angular to prevent events from triggering chnage detection
		this.zone.runOutsideAngular(() => {

			// Initially configure the controlLayers
			this.controlLayers
				.init({}, this.layersControlOptions)
				.addTo(this.leafletDirective.getMap());

		});

		this.updateBaseLayers();

	}

	ngDoCheck() {
		this.updateBaseLayers();
	}

	protected updateBaseLayers() {

		const map = this.leafletDirective.getMap();
		const layersControl = this.controlLayers.getLayersControl();

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

		const map = this.leafletDirective.getMap();
		const layers = LeafletUtil.mapToArray(this.baseLayers);
		let foundLayer: Layer;

		// Search all the layers in the map to see if we can find them in the baselayer array
		map.eachLayer((l: Layer) => {
			foundLayer = layers.find((bl) => (l === bl));
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

				// Add layers outside of angular to prevent events from triggering change detection
				this.zone.runOutsideAngular(() => {
					this.baseLayer.addTo(map);
				});
			}
		}

	}
}
