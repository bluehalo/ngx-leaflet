import { Directive, Input, OnChanges, OnInit, SimpleChange } from '@angular/core';

import * as L from 'leaflet';

import { LeafletDirective } from '../core/leaflet.directive';
import { LeafletUtil } from '../util/leaflet-util';


@Directive({
	selector: '[leafletLayersControl]'
})
export class LeafletLayersControlDirective
	implements OnChanges, OnInit {

	leafletDirective: LeafletDirective;

	// Reference to the primary map object
	map: L.Map;

	// The layers control object
	layersControl: L.Control.Layers;

	// Control Layers Configuration
	@Input('leafletLayersControl') layersControlConfig: any;

	@Input('leafletLayersControlOptions') layersControlOptions: any;


	constructor(leafletDirective: LeafletDirective) {
		this.leafletDirective = leafletDirective;
	}

	ngOnInit() {

		// Get the map
		this.map = this.leafletDirective.getMap();

		// Set up all the initial settings
		this.initializeLayersControl(this.layersControlConfig, this.layersControlOptions);

	}

	ngOnChanges(changes: { [key: string]: SimpleChange }) {

		// Set the layers
		if (changes['layersControlCfg']) {
			this.setLayersControlConfig(
				changes['layersControlCfg'].currentValue,
				changes['layersControlCfg'].previousValue);
		}

	}

	private initializeLayersControl(controlConfig: any, controlOptions: any) {

		let map = this.map;

		let baseLayers = controlConfig.baseLayers || {};
		let overlays = controlConfig.overlays || {};

		if (null != map) {
			this.layersControl = L.control.layers(baseLayers, overlays, controlOptions)
				.addTo(map);
		}
	}

	private setLayersControlConfig(newConfig: any, prevConfig: any) {

		let map = this.map;

		if (null != map) {

			let toRemove: {};
			let baseLayers: {};
			let overlays: {};

			// Figure out which layers need to be removed (prev - new)
			toRemove = LeafletUtil.mergeMaps(
				LeafletUtil.mapSubtract(prevConfig.baseLayers, newConfig.baseLayers),
				LeafletUtil.mapSubtract(prevConfig.overlays, newConfig.overlays));

			// Figure out which layers need to be added (new - prev)
			baseLayers = LeafletUtil.mapSubtract(newConfig.baseLayers, prevConfig.baseLayers);
			overlays = LeafletUtil.mapSubtract(newConfig.overlays, prevConfig.overlays);

			// Do the actual removal and addition
			for (let k in toRemove) {
				if (toRemove.hasOwnProperty(k)) {
					let l: L.Layer = toRemove[k];
					this.layersControl.removeLayer(l);
				}
			}

			for (let k in baseLayers) {
				if (baseLayers.hasOwnProperty(k)) {
					let l: L.Layer = baseLayers[k];
					this.layersControl.addBaseLayer(l, k);
				}
			}

			for (let k in overlays) {
				if (overlays.hasOwnProperty(k)) {
					let l: L.Layer = overlays[k];
					this.layersControl.addOverlay(l, k);
				}
			}
		}

	}

}
