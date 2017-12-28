import { Directive, ElementRef, EventEmitter, HostListener, Input, NgZone, OnChanges, OnInit, Output, SimpleChange } from '@angular/core';
import { latLng, LatLng, LatLngBounds, map, Map, MapOptions } from 'leaflet';
var LeafletDirective = /** @class */ (function () {
    function LeafletDirective(element, zone) {
        // Nothing here
        this.element = element;
        this.zone = zone;
        this.DEFAULT_ZOOM = 1;
        this.DEFAULT_CENTER = latLng(38.907192, -77.036871);
        this.DEFAULT_FPZ_OPTIONS = {};
        this.fitBoundsOptions = this.DEFAULT_FPZ_OPTIONS;
        this.panOptions = this.DEFAULT_FPZ_OPTIONS;
        this.zoomOptions = this.DEFAULT_FPZ_OPTIONS;
        this.zoomPanOptions = this.DEFAULT_FPZ_OPTIONS;
        // Default configuration
        this.options = {};
        // Configure callback function for the map
        this.mapReady = new EventEmitter();
    }
    LeafletDirective.prototype.ngOnInit = function () {
        var _this = this;
        // Create the map with some reasonable defaults
        this.zone.runOutsideAngular(function () {
            _this.map = map(_this.element.nativeElement, _this.options);
        });
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
    /**
         * Resize the map to fit it's parent container
         */
    LeafletDirective.prototype.doResize = /**
         * Resize the map to fit it's parent container
         */
    function () {
        var _this = this;
        // Invalidate the map size to trigger it to update itself
        this.zone.runOutsideAngular(function () {
            _this.map.invalidateSize({});
        });
    };
    /**
     * Manage a delayed resize of the component
     */
    /**
         * Manage a delayed resize of the component
         */
    LeafletDirective.prototype.delayResize = /**
         * Manage a delayed resize of the component
         */
    function () {
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
    /**
         * Set the view (center/zoom) all at once
         * @param center The new center
         * @param zoom The new zoom level
         */
    LeafletDirective.prototype.setView = /**
         * Set the view (center/zoom) all at once
         * @param center The new center
         * @param zoom The new zoom level
         */
    function (center, zoom) {
        var _this = this;
        if (this.map && null != center && null != zoom) {
            this.zone.runOutsideAngular(function () {
                _this.map.setView(center, zoom, _this.zoomPanOptions);
            });
        }
    };
    /**
     * Set the map zoom level
     * @param zoom the new zoom level for the map
     */
    /**
         * Set the map zoom level
         * @param zoom the new zoom level for the map
         */
    LeafletDirective.prototype.setZoom = /**
         * Set the map zoom level
         * @param zoom the new zoom level for the map
         */
    function (zoom) {
        var _this = this;
        if (this.map && null != zoom) {
            this.zone.runOutsideAngular(function () {
                _this.map.setZoom(zoom, _this.zoomOptions);
            });
        }
    };
    /**
     * Set the center of the map
     * @param center the center point
     */
    /**
         * Set the center of the map
         * @param center the center point
         */
    LeafletDirective.prototype.setCenter = /**
         * Set the center of the map
         * @param center the center point
         */
    function (center) {
        var _this = this;
        if (this.map && null != center) {
            this.zone.runOutsideAngular(function () {
                _this.map.panTo(center, _this.panOptions);
            });
        }
    };
    /**
     * Fit the map to the bounds
     * @param center the center point
     */
    /**
         * Fit the map to the bounds
         * @param center the center point
         */
    LeafletDirective.prototype.setFitBounds = /**
         * Fit the map to the bounds
         * @param center the center point
         */
    function (latLngBounds) {
        var _this = this;
        if (this.map && null != latLngBounds) {
            this.zone.runOutsideAngular(function () {
                _this.map.fitBounds(latLngBounds, _this.fitBoundsOptions);
            });
        }
    };
    LeafletDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[leaflet]'
                },] },
    ];
    /** @nocollapse */
    LeafletDirective.ctorParameters = function () { return [
        { type: ElementRef, },
        { type: NgZone, },
    ]; };
    LeafletDirective.propDecorators = {
        "fitBoundsOptions": [{ type: Input, args: ['leafletFitBoundsOptions',] },],
        "panOptions": [{ type: Input, args: ['leafletPanOptions',] },],
        "zoomOptions": [{ type: Input, args: ['leafletZoomOptions',] },],
        "zoomPanOptions": [{ type: Input, args: ['leafletZoomPanOptions',] },],
        "options": [{ type: Input, args: ['leafletOptions',] },],
        "mapReady": [{ type: Output, args: ['leafletMapReady',] },],
        "zoom": [{ type: Input, args: ['leafletZoom',] },],
        "center": [{ type: Input, args: ['leafletCenter',] },],
        "fitBounds": [{ type: Input, args: ['leafletFitBounds',] },],
        "onResize": [{ type: HostListener, args: ['window:resize', [],] },],
    };
    return LeafletDirective;
}());
export { LeafletDirective };
//# sourceMappingURL=leaflet.directive.js.map