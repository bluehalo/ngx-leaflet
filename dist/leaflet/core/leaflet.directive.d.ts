import { ElementRef, EventEmitter, NgZone, OnChanges, OnInit, SimpleChange } from '@angular/core';
import { LatLng, LatLngBounds, LeafletEvent, LeafletMouseEvent, Map, MapOptions } from 'leaflet';
export declare class LeafletDirective implements OnChanges, OnInit {
    private element;
    private zone;
    readonly DEFAULT_ZOOM = 1;
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
    zoomChange: EventEmitter<number>;
    center: LatLng;
    centerChange: EventEmitter<LatLng>;
    fitBounds: LatLngBounds;
    maxBounds: LatLngBounds;
    minZoom: number;
    maxZoom: number;
    onClick: EventEmitter<LeafletMouseEvent>;
    onDoubleClick: EventEmitter<LeafletMouseEvent>;
    onMouseDown: EventEmitter<LeafletMouseEvent>;
    onMouseUp: EventEmitter<LeafletMouseEvent>;
    onMouseMove: EventEmitter<LeafletMouseEvent>;
    onMouseOver: EventEmitter<LeafletMouseEvent>;
    onMapMove: EventEmitter<LeafletEvent>;
    onMapMoveStart: EventEmitter<LeafletEvent>;
    onMapMoveEnd: EventEmitter<LeafletEvent>;
    onMapZoom: EventEmitter<LeafletEvent>;
    onMapZoomStart: EventEmitter<LeafletEvent>;
    onMapZoomEnd: EventEmitter<LeafletEvent>;
    constructor(element: ElementRef, zone: NgZone);
    ngOnInit(): void;
    ngOnChanges(changes: {
        [key: string]: SimpleChange;
    }): void;
    getMap(): Map;
    onResize(): void;
    private addMapEventListeners;
    /**
     * Resize the map to fit it's parent container
     */
    private doResize;
    /**
     * Manage a delayed resize of the component
     */
    private delayResize;
    /**
     * Set the view (center/zoom) all at once
     * @param center The new center
     * @param zoom The new zoom level
     */
    private setView;
    /**
     * Set the map zoom level
     * @param zoom the new zoom level for the map
     */
    private setZoom;
    /**
     * Set the center of the map
     * @param center the center point
     */
    private setCenter;
    /**
     * Fit the map to the bounds
     * @param latLngBounds the boundary to set
     */
    private setFitBounds;
    /**
     * Set the map's max bounds
     * @param latLngBounds the boundary to set
     */
    private setMaxBounds;
    /**
     * Set the map's min zoom
     * @param number the new min zoom
     */
    private setMinZoom;
    /**
     * Set the map's min zoom
     * @param number the new min zoom
     */
    private setMaxZoom;
}
