import {
	Directive, ElementRef, EventEmitter, HostListener, Input, NgZone, OnChanges, OnInit, Output,
	SimpleChange
} from '@angular/core';

import { latLng, LatLng, LatLngBounds, LeafletEvent, LeafletMouseEvent, map, Map, MapOptions } from 'leaflet';

import { LeafletUtil } from './leaflet.util';

@Directive({
	selector: '[leaflet]'
})
export class LeafletDirective
	implements OnChanges, OnInit {

	readonly DEFAULT_ZOOM = 1;
	readonly DEFAULT_CENTER = latLng(38.907192, -77.036871);
	readonly DEFAULT_FPZ_OPTIONS = {};

	resizeTimer: any;

	// Reference to the primary map object
	map: Map;

	@Input('leafletFitBoundsOptions') fitBoundsOptions = this.DEFAULT_FPZ_OPTIONS;
	@Input('leafletPanOptions') panOptions = this.DEFAULT_FPZ_OPTIONS;
	@Input('leafletZoomOptions') zoomOptions = this.DEFAULT_FPZ_OPTIONS;
	@Input('leafletZoomPanOptions') zoomPanOptions = this.DEFAULT_FPZ_OPTIONS;


	// Default configuration
	@Input('leafletOptions') options: MapOptions = {};

	// Configure callback function for the map
	@Output('leafletMapReady') mapReady = new EventEmitter<Map>();

	// Zoom level for the map
	@Input('leafletZoom') zoom: number;
	@Output('leafletZoomChange') zoomChange = new EventEmitter<number>();

	// Center of the map
	@Input('leafletCenter') center: LatLng;
	@Output('leafletCenterChange') centerChange = new EventEmitter<LatLng>();

	// Set fit bounds for map
	@Input('leafletFitBounds') fitBounds: LatLngBounds;

	// Set the max bounds for the map
	@Input('leafletMaxBounds') maxBounds: LatLngBounds;

	// Set the min zoom for the map
	@Input('leafletMinZoom') minZoom: number;

	// Set the max zoom for the map
	@Input('leafletMaxZoom') maxZoom: number;


	// Mouse Map Events
	@Output('leafletClick') onClick = new EventEmitter<LeafletMouseEvent>();
	@Output('leafletDoubleClick') onDoubleClick = new EventEmitter<LeafletMouseEvent>();
	@Output('leafletMouseDown') onMouseDown = new EventEmitter<LeafletMouseEvent>();
	@Output('leafletMouseUp') onMouseUp = new EventEmitter<LeafletMouseEvent>();
	@Output('leafletMouseMove') onMouseMove = new EventEmitter<LeafletMouseEvent>();
	@Output('leafletMouseOver') onMouseOver = new EventEmitter<LeafletMouseEvent>();
	@Output('leafletMouseOut') onMouseOut = new EventEmitter<LeafletMouseEvent>();

	// Map Move Events
	@Output('leafletMapMove') onMapMove = new EventEmitter<LeafletEvent>();
	@Output('leafletMapMoveStart') onMapMoveStart = new EventEmitter<LeafletEvent>();
	@Output('leafletMapMoveEnd') onMapMoveEnd = new EventEmitter<LeafletEvent>();

	// Map Zoom Events
	@Output('leafletMapZoom') onMapZoom = new EventEmitter<LeafletEvent>();
	@Output('leafletMapZoomStart') onMapZoomStart = new EventEmitter<LeafletEvent>();
	@Output('leafletMapZoomEnd') onMapZoomEnd = new EventEmitter<LeafletEvent>();


	constructor(private element: ElementRef, private zone: NgZone) {
		// Nothing here
	}

	ngOnInit() {

		// Create the map outside of angular so the various map events don't trigger change detection
		this.zone.runOutsideAngular(() => {

			// Create the map with some reasonable defaults
			this.map = map(this.element.nativeElement, this.options);
			this.addMapEventListeners();

		});

		// Only setView if there is a center/zoom
		if (null != this.center && null != this.zoom) {
			this.setView(this.center, this.zoom);
		}

		// Set up all the initial settings
		if (null != this.fitBounds) {
			this.setFitBounds(this.fitBounds);
		}

		if (null != this.maxBounds) {
			this.setMaxBounds(this.maxBounds);
		}

		if (null != this.minZoom) {
			this.setMinZoom(this.minZoom);
		}

		if (null != this.maxZoom) {
			this.setMaxZoom(this.maxZoom);
		}

		this.doResize();

		// Fire map ready event
		this.mapReady.emit(this.map);

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

		// Other options
		if (changes['fitBounds']) {
			this.setFitBounds(changes['fitBounds'].currentValue);
		}

		if (changes['maxBounds']) {
			this.setMaxBounds(changes['maxBounds'].currentValue);
		}

		if (changes['minZoom']) {
			this.setMinZoom(changes['minZoom'].currentValue);
		}

		if (changes['maxZoom']) {
			this.setMaxZoom(changes['maxZoom'].currentValue);
		}

	}

	public getMap() {
		return this.map;
	}


	@HostListener('window:resize', [])
	onResize() {
		this.delayResize();
	}

	private addMapEventListeners() {

		// Add all the pass-through mouse event handlers
		this.map.on('click', (e: LeafletMouseEvent) => LeafletUtil.handleEvent(this.zone, this.onClick, e));
		this.map.on('dblclick', (e: LeafletMouseEvent) => LeafletUtil.handleEvent(this.zone, this.onDoubleClick, e));
		this.map.on('mousedown', (e: LeafletMouseEvent) => LeafletUtil.handleEvent(this.zone, this.onMouseDown, e));
		this.map.on('mouseup', (e: LeafletMouseEvent) => LeafletUtil.handleEvent(this.zone, this.onMouseUp, e));
		this.map.on('mouseover', (e: LeafletMouseEvent) => LeafletUtil.handleEvent(this.zone, this.onMouseOver, e));
		this.map.on('mouseout', (e: LeafletMouseEvent) => LeafletUtil.handleEvent(this.zone, this.onMouseOut, e));
		this.map.on('mousemove', (e: LeafletMouseEvent) => LeafletUtil.handleEvent(this.zone, this.onMouseMove, e));

		this.map.on('zoomstart', (e: LeafletEvent) => LeafletUtil.handleEvent(this.zone, this.onMapZoomStart, e));
		this.map.on('zoom', (e: LeafletEvent) => LeafletUtil.handleEvent(this.zone, this.onMapZoom, e));
		this.map.on('zoomend', (e: LeafletEvent) => LeafletUtil.handleEvent(this.zone, this.onMapZoomEnd, e));
		this.map.on('movestart', (e: LeafletEvent) => LeafletUtil.handleEvent(this.zone, this.onMapMoveStart, e));
		this.map.on('move', (e: LeafletEvent) => LeafletUtil.handleEvent(this.zone, this.onMapMove, e));
		this.map.on('moveend', (e: LeafletEvent) => LeafletUtil.handleEvent(this.zone, this.onMapMoveEnd, e));


		// Update any things for which we provide output bindings
		this.map.on('zoomend moveend', () => {
			const zoom = this.map.getZoom();
			if (zoom !== this.zoom) {
				this.zoom = zoom;
				LeafletUtil.handleEvent(this.zone, this.zoomChange, zoom);
			}

			const center = this.map.getCenter();
			if (null != center || null != this.center) {

				if (((null == center || null == this.center) && center !== this.center)
					|| (center.lat !== this.center.lat || center.lng !== this.center.lng)) {

					this.center = center;
					LeafletUtil.handleEvent(this.zone, this.centerChange, center);

				}
			}
		});
	}


	/**
	 * Resize the map to fit it's parent container
	 */
	private doResize() {

		// Run this outside of angular so the map events stay outside of angular
		this.zone.runOutsideAngular(() => {

			// Invalidate the map size to trigger it to update itself
			this.map.invalidateSize({});

		});

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
	private setView(center: LatLng, zoom: number) {

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
	private setCenter(center: LatLng) {

		if (this.map && null != center) {
			this.map.panTo(center, this.panOptions);
		}

	}

	/**
	 * Fit the map to the bounds
	 * @param latLngBounds the boundary to set
	 */
	private setFitBounds(latLngBounds: LatLngBounds) {

		if (this.map && null != latLngBounds) {
			this.map.fitBounds(latLngBounds, this.fitBoundsOptions);
		}

	}

	/**
	 * Set the map's max bounds
	 * @param latLngBounds the boundary to set
	 */
	private setMaxBounds(latLngBounds: LatLngBounds) {

		if (this.map && null != latLngBounds) {
			this.map.setMaxBounds(latLngBounds);
		}

	}

	/**
	 * Set the map's min zoom
	 * @param number the new min zoom
	 */
	private setMinZoom(zoom: number) {

		if (this.map && null != zoom) {
			this.map.setMinZoom(zoom);
		}

	}

	/**
	 * Set the map's min zoom
	 * @param number the new min zoom
	 */
	private setMaxZoom(zoom: number) {

		if (this.map && null != zoom) {
			this.map.setMaxZoom(zoom);
		}

	}

}
