"use strict";
var core_1 = require('@angular/core');
var L = require('leaflet');
var LeafletDirective = (function () {
    function LeafletDirective(el) {
        this.DEFAULT_ZOOM = 1;
        this.DEFAULT_CENTER = L.latLng([38.907192, -77.036871]);
        this.DEFAULT_FPZ_OPTIONS = {};
        this.fitOptions = this.DEFAULT_FPZ_OPTIONS;
        this.panOptions = this.DEFAULT_FPZ_OPTIONS;
        this.zoomOptions = this.DEFAULT_FPZ_OPTIONS;
        // Default configuration
        this.config = {};
        this.element = el;
    }
    LeafletDirective.prototype.ngOnInit = function () {
        // Create the map with some reasonable defaults
        this.map = L.map(this.element.nativeElement, this.config)
            .setView(this.center, this.zoom);
        // Call for configuration
        if (null != this.configureFn) {
            this.configureFn(this.map);
        }
        // Set up all the initial settings
        this.setFitBounds(this.fitBounds);
        this.resize();
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
    LeafletDirective.prototype.resize = function () {
        this.map.invalidateSize({});
    };
    LeafletDirective.prototype.setView = function (center, zoom) {
        if (this.map && null != center && null != zoom) {
            this.map.setView(center, zoom);
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
     * Set the center of the map
     * @param center the center point
     */
    LeafletDirective.prototype.setFitBounds = function (latLngBounds) {
        if (this.map && null != latLngBounds) {
            this.map.fitBounds(latLngBounds, this.fitOptions);
        }
    };
    __decorate([
        core_1.Input('leafletConfig'), 
        __metadata('design:type', Object)
    ], LeafletDirective.prototype, "config", void 0);
    __decorate([
        core_1.Input('leafletConfigure'), 
        __metadata('design:type', Function)
    ], LeafletDirective.prototype, "configureFn", void 0);
    __decorate([
        core_1.Input('leafletZoom'), 
        __metadata('design:type', Number)
    ], LeafletDirective.prototype, "zoom", void 0);
    __decorate([
        core_1.Input('leafletCenter'), 
        __metadata('design:type', Object)
    ], LeafletDirective.prototype, "center", void 0);
    __decorate([
        core_1.Input('leafletFitBounds'), 
        __metadata('design:type', Object)
    ], LeafletDirective.prototype, "fitBounds", void 0);
    LeafletDirective = __decorate([
        core_1.Directive({
            selector: '[leaflet]'
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], LeafletDirective);
    return LeafletDirective;
}());
exports.LeafletDirective = LeafletDirective;

//# sourceMappingURL=leaflet.directive.js.map
