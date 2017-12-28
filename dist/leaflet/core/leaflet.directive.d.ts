import { ElementRef, EventEmitter, NgZone, OnChanges, OnInit, SimpleChange } from '@angular/core';
import { LatLng, LatLngBounds, Map, MapOptions } from 'leaflet';
export declare class LeafletDirective implements OnChanges, OnInit {
    private element;
    private zone;
    readonly DEFAULT_ZOOM: number;
    readonly DEFAULT_CENTER: LatLng;
    readonly DEFAULT_FPZ_OPTIONS: {};
    resizeTimer: any;
    map: Map;
    fitBoundsOptions: {};
    panOptions: {};
    zoomOptions: {};
    zoomPanOptions: {};
    options: MapOptions;
    mapReady: EventEmitter<Map>;
    zoom: number;
    center: LatLng;
    fitBounds: LatLngBounds;
    constructor(element: ElementRef, zone: NgZone);
    ngOnInit(): void;
    ngOnChanges(changes: {
        [key: string]: SimpleChange;
    }): void;
    getMap(): Map;
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
