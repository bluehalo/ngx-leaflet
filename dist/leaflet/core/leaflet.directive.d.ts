/// <reference types="leaflet" />
import { ElementRef, EventEmitter, OnChanges, OnInit, SimpleChange } from '@angular/core';
import * as L from 'leaflet';
export declare class LeafletDirective implements OnChanges, OnInit {
    readonly DEFAULT_ZOOM: number;
    readonly DEFAULT_CENTER: L.LatLng;
    readonly DEFAULT_FPZ_OPTIONS: {};
    element: ElementRef;
    resizeTimer: any;
    map: L.Map;
    fitBoundsOptions: {};
    panOptions: {};
    zoomOptions: {};
    zoomPanOptions: {};
    options: L.MapOptions;
    mapReady: EventEmitter<L.Map>;
    zoom: number;
    center: L.LatLng;
    fitBounds: L.LatLngBounds;
    constructor(el: ElementRef);
    ngOnInit(): void;
    ngOnChanges(changes: {
        [key: string]: SimpleChange;
    }): void;
    getMap(): L.Map;
    onResize(): void;
    /**
     * Resize the map to fit it's parent container
     */
    private doResize();
    /**
     * Manage a delayed resize of the component
     */
    private delayResize();
    /**
     * Set the view (center/zoom) all at once
     * @param center The new center
     * @param zoom The new zoom level
     */
    private setView(center, zoom);
    /**
     * Set the map zoom level
     * @param zoom the new zoom level for the map
     */
    private setZoom(zoom);
    /**
     * Set the center of the map
     * @param center the center point
     */
    private setCenter(center);
    /**
     * Fit the map to the bounds
     * @param center the center point
     */
    private setFitBounds(latLngBounds);
}
