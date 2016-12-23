import * as L from 'leaflet';

import { LeafletUtil } from '../../core/leaflet.util';
import { LeafletControlLayersConfig } from './leaflet-control-layers-config.model';
import { LeafletLayersObjectDiff } from './leaflet-layers-object-diff.model';

export class LeafletControlLayersWrapper {

	// The layers control object
	protected layersControl: L.Control.Layers;

	public getLayersControl() {
		return this.layersControl;
	}

	public init(controlConfig: any, controlOptions: any): L.Control.Layers {

		let baseLayers = controlConfig.baseLayers || {};
		let overlays = controlConfig.overlays || {};

		this.layersControl = L.control.layers(baseLayers, overlays, controlOptions);

		return this.layersControl;
	}

	public setLayersControlConfig( newConfig: LeafletControlLayersConfig, prevConfig: LeafletControlLayersConfig): LeafletLayersObjectDiff {

		if (null == this.layersControl) {
			return new LeafletLayersObjectDiff({}, {});
		}

		let toRemove: L.control.LayersObject;
		let baseLayers: L.control.LayersObject;
		let overlays: L.control.LayersObject;

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

		return new LeafletLayersObjectDiff(toRemove, LeafletUtil.mergeMaps(baseLayers, overlays));
	}

}
