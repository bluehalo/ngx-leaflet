import {KeyValueChanges, NgZone} from '@angular/core';

import { control, Control, Layer } from 'leaflet';

import { LeafletControlLayersChanges } from './leaflet-control-layers-changes.model';

export class LeafletControlLayersWrapper {


	// The layers control object
	protected layersControl: Control.Layers;

	constructor(private zone: NgZone) {
		// Nothing here
	}

	getLayersControl() {
		return this.layersControl;
	}

	init(controlConfig: any, controlOptions: any): Control.Layers {

		const baseLayers = controlConfig.baseLayers || {};
		const overlays = controlConfig.overlays || {};

		this.layersControl = control.layers(baseLayers, overlays, controlOptions);

		return this.layersControl;
	}

	applyBaseLayerChanges(changes: KeyValueChanges<string, Layer>): LeafletControlLayersChanges {
		let results: LeafletControlLayersChanges = new LeafletControlLayersChanges();

		if (null != this.layersControl) {
			results =  this.applyChanges(changes, this.layersControl.addBaseLayer);
		}

		return results;
	}

	applyOverlayChanges(changes: KeyValueChanges<string, Layer>): LeafletControlLayersChanges {
		let results: LeafletControlLayersChanges = new LeafletControlLayersChanges();

		if (null != this.layersControl) {
			results =  this.applyChanges(changes, this.layersControl.addOverlay);
		}

		return results;
	}

	private applyChanges(changes: KeyValueChanges<string, Layer>, addFn: (layer: Layer, name: string) => void): LeafletControlLayersChanges {
		const results: LeafletControlLayersChanges = new LeafletControlLayersChanges();

		if (null != changes) {

			this.zone.runOutsideAngular(() => {
				changes.forEachChangedItem((c) => {
					this.layersControl.removeLayer(c.previousValue);
					addFn.call(this.layersControl, c.currentValue, c.key);
					results.layersChanged++;
				});
				changes.forEachRemovedItem((c) => {
					this.layersControl.removeLayer(c.previousValue);
					results.layersRemoved++;
				});
				changes.forEachAddedItem((c) => {
					addFn.call(this.layersControl, c.currentValue, c.key);
					results.layersAdded++;
				});
			});

		}

		return results;
	}

}
