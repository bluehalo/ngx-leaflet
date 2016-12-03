import { Directive, ElementRef, Input, OnChanges, OnInit, SimpleChange } from '@angular/core';

import * as L from 'leaflet';

@Directive({
	selector: '[leaflet]'
})
export class LeafletDirective
	implements OnChanges, OnInit {

	readonly DEFAULT_ZOOM = 1;
	readonly DEFAULT_CENTER = L.latLng([ 38.907192, -77.036871 ]);

	element: ElementRef;

	// Reference to the primary map object
	map: L.Map;

	// Default config
	@Input() config = {};

	// Array of configured layers
	@Input() layers: L.Layer [];

	// Zoom level for the map
	@Input() zoom: number;

	// Configure callback function for the map
	@Input('configure') configureFn: (chart: any) => void;


	constructor(el: ElementRef) {
		this.element = el;
	}

	ngOnInit() {

		// Create the map with some reasonable defaults
		this.map = L.map(this.element.nativeElement, this.config)
			.setView(this.DEFAULT_CENTER, this.DEFAULT_ZOOM);

		// Call for configuration
		if(null != this.configureFn) {
			this.configureFn(this.map);
		}

		// Set up all the initial settings
		this.setLayers(this.layers);
		this.setZoom(this.zoom);

		this.resize();

	}

	ngOnChanges(changes: { [key: string]: SimpleChange }) {

		// Configure function, can only set this once
		if (changes['configureFn'] && changes['configureFn'].isFirstChange()) {
			this.configureFn = changes['configureFn'].currentValue;
		}

		// Initial config, can only set this once
		if (changes['config'] && changes['config'].isFirstChange()) {
			this.config = changes['config'].currentValue;
		}

		// Set the layers
		if (changes['layers']) {
			this.setLayers(changes['layers'].currentValue);
		}

		// Set the zoom level
		if (changes['zoom']) {
			this.setZoom(changes['zoom'].currentValue);
		}

	}

	public getMap() {
		return this.map;
	}

	private resize() {
		this.map.invalidateSize({});
	}

	/**
	 * Set the map zoom level
	 * @param zoom the new zoom level for the map
	 */
	private setZoom(zoom: number) {

		if(this.map) {
			zoom = (null != zoom) ? zoom : this.DEFAULT_ZOOM;
			this.map.setZoom(zoom, {});
		}

	}

	/**
	 * Replace the current layers in the map with the provided array
	 * @param layers The new complete array of layers for the map
	 */
	private setLayers(layers: L.Layer[]) {

		if (null != this.map) {
			// Remove all existing layers
			this.map.eachLayer((layer: L.Layer) => {
				this.map.removeLayer(layer);
			});

			// Add the new layers
			if(null != layers) {
				layers.forEach((layer: L.Layer) => {
					this.map.addLayer(layer);
				});
			}
		}

	}

}
