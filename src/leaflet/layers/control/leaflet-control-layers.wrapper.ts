import { EventEmitter, KeyValueChanges, NgZone } from '@angular/core';

import { control, Control, Layer } from 'leaflet';

import { LeafletControlLayersChanges } from './leaflet-control-layers-changes.model';

export class LeafletControlLayersWrapper {

	// The layers control object
	protected layersControl: Control.Layers;

	// Event Emitter for when the control is ready
	protected layersControlReady: EventEmitter<Control.Layers>;

	constructor(private zone: NgZone, layersControlReady: EventEmitter<Control.Layers>) {
		this.layersControlReady = layersControlReady;
	}

	getLayersControl() {
		return this.layersControl;
	}

	init(controlConfig: any, controlOptions: any): Control.Layers {

		const baseLayers = controlConfig.baseLayers || {};
		const overlays = controlConfig.overlays || {};

		// Create the control outside of angular to ensure events don't trigger change detection
		this.zone.runOutsideAngular(() => {
			this.layersControl = control.layers(baseLayers, overlays, controlOptions);
		});


		this.layersControlReady.emit(this.layersControl);

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

			// All layer management is outside angular to avoid layer events from triggering change detection
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
