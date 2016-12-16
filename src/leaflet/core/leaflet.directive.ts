import { Directive, ElementRef, HostListener, Input, OnChanges, OnInit, SimpleChange } from '@angular/core';

import * as L from 'leaflet';

@Directive({
	selector: '[leaflet]'
})
export class LeafletDirective
	implements OnChanges, OnInit {

	readonly DEFAULT_ZOOM = 1;
	readonly DEFAULT_CENTER = L.latLng([ 38.907192, -77.036871 ]);
	readonly DEFAULT_FPZ_OPTIONS = {};

	element: ElementRef;
	resizeTimer: any;

	// Reference to the primary map object
	map: L.Map;

	@Input('leafletFitBoundsOptions') fitBoundsOptions = this.DEFAULT_FPZ_OPTIONS;
	@Input('leafletPanOptions') panOptions = this.DEFAULT_FPZ_OPTIONS;
	@Input('leafletZoomOptions') zoomOptions = this.DEFAULT_FPZ_OPTIONS;
	@Input('leafletZoomPanOptions') zoomPanOptions = this.DEFAULT_FPZ_OPTIONS;


	// Default configuration
	@Input('leafletOptions') options = {};

	// Configure callback function for the map
	@Input('leafletConfigure') configureFn: (chart: any) => void;

	// Zoom level for the map
	@Input('leafletZoom') zoom: number;

	// Center the map
	@Input('leafletCenter') center: L.LatLng;

	// Set fit bounds for map
	@Input('leafletFitBounds') fitBounds: L.LatLngBounds;


	constructor(el: ElementRef) {
		this.element = el;
	}

	ngOnInit() {

		// Create the map with some reasonable defaults
		this.map = L.map(this.element.nativeElement, this.options);
		this.setView(this.center, this.zoom);

		// Call for configuration
		if (null != this.configureFn) {
			this.configureFn(this.map);
		}

		// Set up all the initial settings
		this.setFitBounds(this.fitBounds);

		this.doResize();

	}

	ngOnChanges(changes: { [key: string]: SimpleChange }) {

		/*
		 * The following code is to address an issue with our (basic) implementation of
		 * zooming and panning. From our testing, it seems that a pan operation followed
		 * by a zoom operation in the same thread will interfere with eachother. The zoom
		 * operation interrupts/cancels the pan, resulting in a final center point that is
		 * inaccurate. The solution seems to be to either separate them with a timeout or
		  * to collapse them into a setView call.
		 */

		// Zooming and Panning
		if (changes['zoom'] && changes['center'] && null != this.zoom && null != this.center) {
			this.setView(changes['center'].currentValue, changes['zoom'].currentValue);
		}
		// Set the zoom level
		else if (changes['zoom']) {
			this.setZoom(changes['zoom'].currentValue);
		}
		// Set the map center
		else if (changes['center']) {
			this.setCenter(changes['center'].currentValue);
		}

		// Fit bounds
		if (changes['fitBounds']) {
			this.setFitBounds(changes['fitBounds'].currentValue);
		}

		// Fit Options
		if (changes['fitBoundsOptions']) {
			this.fitBoundsOptions = changes['fitBoundsOptions'].currentValue;
		}

		// Pan Options
		if (changes['panOptions']) {
			this.panOptions = changes['panOptions'].currentValue;
		}

		// Zoom Options
		if (changes['zoomOptions']) {
			this.zoomOptions = changes['zoomOptions'].currentValue;
		}

		// Zoom/Pan Options
		if (changes['zoomPanOptions']) {
			this.zoomPanOptions = changes['zoomPanOptions'].currentValue;
		}
	}

	public getMap() {
		return this.map;
	}


	@HostListener('window:resize', ['$event'])
	onResize(event: any) {
		this.delayResize();
	}

	/**
	 * Resize the map to fit it's parent container
	 */
	private doResize() {

		// Invalidate the map size to trigger it to update itself
		this.map.invalidateSize({});

	}

	/**
	 * Manage a delayed resize of the component
	 */
	private delayResize() {
		if (null != this.resizeTimer) {
			clearTimeout(this.resizeTimer);
		}
		this.resizeTimer = setTimeout(this.doResize.bind(this), 200);
	}


	/**
	 * Set the view (center/zoom) all at once
	 * @param center The new center
	 * @param zoom The new zoom level
	 */
	private setView(center: L.LatLng, zoom: number) {

		if (this.map && null != center && null != zoom) {
			this.map.setView(center, zoom, this.zoomPanOptions);
		}

	}

	/**
	 * Set the map zoom level
	 * @param zoom the new zoom level for the map
	 */
	private setZoom(zoom: number) {

		if (this.map && null != zoom) {
			this.map.setZoom(zoom, this.zoomOptions);
		}

	}

	/**
	 * Set the center of the map
	 * @param center the center point
	 */
	private setCenter(center: L.LatLng) {

		if (this.map && null != center) {
			this.map.panTo(center, this.panOptions);
		}

	}

	/**
	 * Fit the map to the bounds
	 * @param center the center point
	 */
	private setFitBounds(latLngBounds: L.LatLngBounds) {

		if (this.map && null != latLngBounds) {
			this.map.fitBounds(latLngBounds, this.fitBoundsOptions);
		}

	}
}
