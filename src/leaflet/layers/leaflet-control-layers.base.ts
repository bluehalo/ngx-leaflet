import * as L from 'leaflet';

import { LeafletDirective } from '../core/leaflet.directive';
import { LeafletDirectiveExtensionBase } from '../core/leaflet.directive.extension.base';
import { LeafletUtil } from '../util/leaflet-util';


export abstract class LeafletLayersControlBase
extends LeafletDirectiveExtensionBase {

	// The layers control object
	protected layersControl: L.Control.Layers;


	constructor(leafletDirective: LeafletDirective) {
		super(leafletDirective);
	}

	protected initializeLayersControl(controlConfig: any, controlOptions: any) {

		let baseLayers = controlConfig.baseLayers || {};
		let overlays = controlConfig.overlays || {};

		if (null != this.map) {
			this.layersControl = L.control.layers(baseLayers, overlays, controlOptions)
				.addTo(this.map);
		}
	}

	protected setLayersControlConfig(newConfig: any, prevConfig: any) {

		if (null != this.map) {

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
