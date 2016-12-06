/// <reference types="leaflet" />
import { ElementRef, OnChanges, OnInit, SimpleChange } from '@angular/core';
import * as L from 'leaflet';
export declare class LeafletDirective implements OnChanges, OnInit {
    readonly DEFAULT_ZOOM: number;
    readonly DEFAULT_CENTER: L.LatLng;
    readonly DEFAULT_FPZ_OPTIONS: {};
    element: ElementRef;
    map: L.Map;
    fitOptions: {};
    panOptions: {};
    zoomOptions: {};
    options: {};
    configureFn: (chart: any) => void;
    zoom: number;
    center: L.LatLng;
    fitBounds: L.LatLngBounds;
    constructor(el: ElementRef);
    ngOnInit(): void;
    ngOnChanges(changes: {
        [key: string]: SimpleChange;
    }): void;
    getMap(): L.Map;
    resize(): void;
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
     * Set the center of the map
     * @param center the center point
     */
    private setFitBounds(latLngBounds);
}
