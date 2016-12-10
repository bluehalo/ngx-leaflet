import { Directive, Input, OnChanges, OnInit, SimpleChange } from '@angular/core';

import * as L from 'leaflet';

import { LeafletDirective } from '../core/leaflet.directive';


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

		let map = this.leafletDirective.getMap();

		let baseLayers = controlConfig.baseLayers || {};
		let overlays = controlConfig.overlays || {};

		if (null != map) {
			this.layersControl = L.control.layers(baseLayers, overlays, controlOptions)
				.addTo(map);
		}
	}

	private setLayersControlConfig(newConfig: any, prevConfig: any) {

		let map = this.leafletDirective.getMap();

		if (null != map) {

			let toRemove: {};
			let baseLayers: {};
			let overlays: {};

			// Figure out which layers need to be removed (prev - new)
			toRemove = this.mergeMaps(
				this.mapSubtract(prevConfig.baseLayers, newConfig.baseLayers),
				this.mapSubtract(prevConfig.overlays, newConfig.overlays));

			// Figure out which layers need to be added (new - prev)
			baseLayers = this.mapSubtract(newConfig.baseLayers, prevConfig.baseLayers);
			overlays = this.mapSubtract(newConfig.overlays, prevConfig.overlays);

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

	private mergeMaps(aMap: {}, bMap: {}) {
		let toReturn = {};

		if (null != aMap) {
			for (let k in aMap) {
				if (aMap.hasOwnProperty(k)) {
					toReturn[k] = aMap[k];
				}
			}
		}

		if (null != bMap) {
			for (let k in bMap) {
				if (bMap.hasOwnProperty(k)) {
					toReturn[k] = bMap[k];
				}
			}
		}

		return toReturn;
	}

	private mapSubtract(aMap: {}, bMap: {}) {
		let toReturn = {};

		if (null != aMap) {

			// Copy all of aMap into toReturn
			for (let k in aMap) {
				if (aMap.hasOwnProperty(k)) {
					toReturn[k] = aMap[k];
				}
			}

			// If there's a bMap, delete all bMap keys from aMap
			if (null != bMap) {
				for (let k in bMap) {
					if (bMap.hasOwnProperty(k)) {
						delete toReturn[k];
					}
				}
			}
		}

		return toReturn;
	}

}
