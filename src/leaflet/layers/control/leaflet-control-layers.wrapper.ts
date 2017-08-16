import { KeyValueChanges } from '@angular/core';

import * as L from 'leaflet';

import { LeafletControlLayersChanges } from './leaflet-control-layers-changes.model';

export class LeafletControlLayersWrapper {

	// The layers control object
	protected layersControl: L.Control.Layers;

	getLayersControl() {
		return this.layersControl;
	}

	init(controlConfig: any, controlOptions: any): L.Control.Layers {

		let baseLayers = controlConfig.baseLayers || {};
		let overlays = controlConfig.overlays || {};

		this.layersControl = L.control.layers(baseLayers, overlays, controlOptions);

		return this.layersControl;
	}

	applyBaseLayerChanges(changes: KeyValueChanges<string, L.Layer>): LeafletControlLayersChanges {
		let results: LeafletControlLayersChanges = new LeafletControlLayersChanges();

		if (null != this.layersControl) {
			results =  this.applyChanges(changes, this.layersControl.addBaseLayer);
		}

		return results;
	}

	applyOverlayChanges(changes: KeyValueChanges<string, L.Layer>): LeafletControlLayersChanges {
		let results: LeafletControlLayersChanges = new LeafletControlLayersChanges();

		if (null != this.layersControl) {
			results =  this.applyChanges(changes, this.layersControl.addOverlay);
		}

		return results;
	}

	private applyChanges(changes: KeyValueChanges<string, L.Layer>, addFn: (layer: L.Layer, name: string) => void): LeafletControlLayersChanges {
		let results: LeafletControlLayersChanges = new LeafletControlLayersChanges();

		if (null != changes) {

			changes.forEachChangedItem((c) => {
				this.layersControl.removeLayer(c.previousValue);
				addFn.call(this.layersControl, c.currentValue, c.key);
				results.layersChanged++;
			});
			changes.forEachRemovedItem((c) => {
				this.layersControl.removeLayer(c.currentValue);
				results.layersRemoved++;
			});
			changes.forEachAddedItem((c) => {
				addFn.call(this.layersControl, c.currentValue, c.key);
				results.layersAdded++;
			});

		}

		return results;
	}

}
