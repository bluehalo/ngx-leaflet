import {
	Directive, EventEmitter, Input, NgZone, OnChanges, OnDestroy, OnInit, Output,
	SimpleChange
} from '@angular/core';

import { Layer, LeafletEvent } from 'leaflet';

import { LeafletDirective } from '../core/leaflet.directive';
import { LeafletDirectiveWrapper } from '../core/leaflet.directive.wrapper';
import { LeafletUtil } from '../core/leaflet.util';


/**
 * Layer directive
 *
 * This directive is used to directly control a single map layer. The purpose of this directive is to
 * be used as part of a child structural directive of the map element.
 *
 */
@Directive({
	selector: '[leafletLayer]'
})
export class LeafletLayerDirective
	implements OnChanges, OnDestroy, OnInit {

	@Input('leafletLayer') layer: Layer;

	// Layer Events
	@Output('leafletLayerAdd') onAdd = new EventEmitter<LeafletEvent>();
	@Output('leafletLayerRemove') onRemove = new EventEmitter<LeafletEvent>();

	// Layer Event handlers
	private onAddLayerHandler: any;
	private onRemoveLayerHandler: any;

	// Wrapper for the leaflet directive (manages the parent directive)
	private leafletDirective: LeafletDirectiveWrapper;

	constructor(leafletDirective: LeafletDirective, private zone: NgZone) {
		this.leafletDirective = new LeafletDirectiveWrapper(leafletDirective);
	}

	ngOnInit() {

		// Init the map
		this.leafletDirective.init();

	}

	ngOnDestroy() {

		if (null != this.layer) {

			// Unregister the event handlers
			this.removeLayerEventListeners(this.layer);

			// Remove the layer from the map
			this.layer.remove();
		}

	}

	ngOnChanges(changes: { [key: string]: SimpleChange }) {

		if (changes['layer']) {

			// Update the layer
			const p: Layer = changes['layer'].previousValue;
			const n = changes['layer'].currentValue;

			this.zone.runOutsideAngular(() => {
				if (null != p) {
					this.removeLayerEventListeners(p);
					p.remove();
				}
				if (null != n) {
					this.addLayerEventListeners(n);
					this.leafletDirective.getMap().addLayer(n);
				}
			});

		}

	}

	private addLayerEventListeners(l: Layer) {

		this.onAddLayerHandler = (e: LeafletEvent) => LeafletUtil.handleEvent(this.zone, this.onAdd, e);
		l.on('add', this.onAddLayerHandler);

		this.onRemoveLayerHandler = (e: LeafletEvent) => LeafletUtil.handleEvent(this.zone, this.onRemove, e);
		l.on('remove', this.onRemoveLayerHandler);

	}

	private removeLayerEventListeners(l: Layer) {

		l.off('add', this.onAddLayerHandler);
		l.off('remove', this.onRemoveLayerHandler);

	}

}
