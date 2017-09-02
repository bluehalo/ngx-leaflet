import { Directive, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';
import * as L from 'leaflet';
var LeafletDirective = (function () {
    function LeafletDirective(el) {
        this.DEFAULT_ZOOM = 1;
        this.DEFAULT_CENTER = L.latLng([38.907192, -77.036871]);
        this.DEFAULT_FPZ_OPTIONS = {};
        this.fitBoundsOptions = this.DEFAULT_FPZ_OPTIONS;
        this.panOptions = this.DEFAULT_FPZ_OPTIONS;
        this.zoomOptions = this.DEFAULT_FPZ_OPTIONS;
        this.zoomPanOptions = this.DEFAULT_FPZ_OPTIONS;
        // Default configuration
        this.options = {};
        // Configure callback function for the map
        this.mapReady = new EventEmitter();
        this.element = el;
    }
    LeafletDirective.prototype.ngOnInit = function () {
        // Create the map with some reasonable defaults
        this.map = L.map(this.element.nativeElement, this.options);
        // Only setView if there is a center/zoom
        if (null != this.center && null != this.zoom) {
            this.setView(this.center, this.zoom);
        }
        // Set up all the initial settings
        if (null != this.fitBounds) {
            this.setFitBounds(this.fitBounds);
        }
        this.doResize();
        // Fire map ready event
        this.mapReady.emit(this.map);
    };
    LeafletDirective.prototype.ngOnChanges = function (changes) {
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
        else if (changes['zoom']) {
            this.setZoom(changes['zoom'].currentValue);
        }
        else if (changes['center']) {
            this.setCenter(changes['center'].currentValue);
        }
        // Fit bounds
        if (changes['fitBounds']) {
            this.setFitBounds(changes['fitBounds'].currentValue);
        }
    };
    LeafletDirective.prototype.getMap = function () {
        return this.map;
    };
    LeafletDirective.prototype.onResize = function () {
        this.delayResize();
    };
    /**
     * Resize the map to fit it's parent container
     */
    LeafletDirective.prototype.doResize = function () {
        // Invalidate the map size to trigger it to update itself
        this.map.invalidateSize({});
    };
    /**
     * Manage a delayed resize of the component
     */
    LeafletDirective.prototype.delayResize = function () {
        if (null != this.resizeTimer) {
            clearTimeout(this.resizeTimer);
        }
        this.resizeTimer = setTimeout(this.doResize.bind(this), 200);
    };
    /**
     * Set the view (center/zoom) all at once
     * @param center The new center
     * @param zoom The new zoom level
     */
    LeafletDirective.prototype.setView = function (center, zoom) {
        if (this.map && null != center && null != zoom) {
            this.map.setView(center, zoom, this.zoomPanOptions);
        }
    };
    /**
     * Set the map zoom level
     * @param zoom the new zoom level for the map
     */
    LeafletDirective.prototype.setZoom = function (zoom) {
        if (this.map && null != zoom) {
            this.map.setZoom(zoom, this.zoomOptions);
        }
    };
    /**
     * Set the center of the map
     * @param center the center point
     */
    LeafletDirective.prototype.setCenter = function (center) {
        if (this.map && null != center) {
            this.map.panTo(center, this.panOptions);
        }
    };
    /**
     * Fit the map to the bounds
     * @param center the center point
     */
    LeafletDirective.prototype.setFitBounds = function (latLngBounds) {
        if (this.map && null != latLngBounds) {
            this.map.fitBounds(latLngBounds, this.fitBoundsOptions);
        }
    };
    return LeafletDirective;
}());
export { LeafletDirective };
LeafletDirective.decorators = [
    { type: Directive, args: [{
                selector: '[leaflet]'
            },] },
];
/** @nocollapse */
LeafletDirective.ctorParameters = function () { return [
    { type: ElementRef, },
]; };
LeafletDirective.propDecorators = {
    'fitBoundsOptions': [{ type: Input, args: ['leafletFitBoundsOptions',] },],
    'panOptions': [{ type: Input, args: ['leafletPanOptions',] },],
    'zoomOptions': [{ type: Input, args: ['leafletZoomOptions',] },],
    'zoomPanOptions': [{ type: Input, args: ['leafletZoomPanOptions',] },],
    'options': [{ type: Input, args: ['leafletOptions',] },],
    'mapReady': [{ type: Output, args: ['leafletMapReady',] },],
    'zoom': [{ type: Input, args: ['leafletZoom',] },],
    'center': [{ type: Input, args: ['leafletCenter',] },],
    'fitBounds': [{ type: Input, args: ['leafletFitBounds',] },],
    'onResize': [{ type: HostListener, args: ['window:resize', [],] },],
};
//# sourceMappingURL=leaflet.directive.js.map