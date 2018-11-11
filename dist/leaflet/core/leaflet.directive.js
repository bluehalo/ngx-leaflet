var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Directive, ElementRef, EventEmitter, HostListener, Input, NgZone, Output } from '@angular/core';
import { latLng, LatLng, LatLngBounds, map } from 'leaflet';
import { LeafletUtil } from './leaflet.util';
var LeafletDirective = /** @class */ (function () {
    function LeafletDirective(element, zone) {
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
        this.zoomChange = new EventEmitter();
        this.centerChange = new EventEmitter();
        // Mouse Map Events
        this.onClick = new EventEmitter();
        this.onDoubleClick = new EventEmitter();
        this.onMouseDown = new EventEmitter();
        this.onMouseUp = new EventEmitter();
        this.onMouseMove = new EventEmitter();
        this.onMouseOver = new EventEmitter();
        // Map Move Events
        this.onMapMove = new EventEmitter();
        this.onMapMoveStart = new EventEmitter();
        this.onMapMoveEnd = new EventEmitter();
        // Map Zoom Events
        this.onMapZoom = new EventEmitter();
        this.onMapZoomStart = new EventEmitter();
        this.onMapZoomEnd = new EventEmitter();
        // Nothing here
    }
    LeafletDirective.prototype.ngOnInit = function () {
        var _this = this;
        // Create the map outside of angular so the various map events don't trigger change detection
        this.zone.runOutsideAngular(function () {
            // Create the map with some reasonable defaults
            _this.map = map(_this.element.nativeElement, _this.options);
            _this.addMapEventListeners();
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
    };
    LeafletDirective.prototype.getMap = function () {
        return this.map;
    };
    LeafletDirective.prototype.onResize = function () {
        this.delayResize();
    };
    LeafletDirective.prototype.addMapEventListeners = function () {
        var _this = this;
        // Add all the pass-through mouse event handlers
        this.map.on('click', function (e) { return LeafletUtil.handleEvent(_this.zone, _this.onClick, e); });
        this.map.on('dblclick', function (e) { return LeafletUtil.handleEvent(_this.zone, _this.onDoubleClick, e); });
        this.map.on('mousedown', function (e) { return LeafletUtil.handleEvent(_this.zone, _this.onMouseDown, e); });
        this.map.on('mouseup', function (e) { return LeafletUtil.handleEvent(_this.zone, _this.onMouseUp, e); });
        this.map.on('mouseover', function (e) { return LeafletUtil.handleEvent(_this.zone, _this.onMouseOver, e); });
        this.map.on('mousemove', function (e) { return LeafletUtil.handleEvent(_this.zone, _this.onMouseMove, e); });
        this.map.on('zoomstart', function (e) { return LeafletUtil.handleEvent(_this.zone, _this.onMapZoomStart, e); });
        this.map.on('zoom', function (e) { return LeafletUtil.handleEvent(_this.zone, _this.onMapZoom, e); });
        this.map.on('zoomend', function (e) { return LeafletUtil.handleEvent(_this.zone, _this.onMapZoomEnd, e); });
        this.map.on('movestart', function (e) { return LeafletUtil.handleEvent(_this.zone, _this.onMapMoveStart, e); });
        this.map.on('move', function (e) { return LeafletUtil.handleEvent(_this.zone, _this.onMapMove, e); });
        this.map.on('moveend', function (e) { return LeafletUtil.handleEvent(_this.zone, _this.onMapMoveEnd, e); });
        // Update any things for which we provide output bindings
        this.map.on('zoomend moveend', function () {
            var zoom = _this.map.getZoom();
            if (zoom !== _this.zoom) {
                _this.zoom = zoom;
                LeafletUtil.handleEvent(_this.zone, _this.zoomChange, zoom);
            }
            var center = _this.map.getCenter();
            if (null != center || null != _this.center) {
                if (((null == center || null == _this.center) && center !== _this.center)
                    || (center.lat !== _this.center.lat || center.lng !== _this.center.lng)) {
                    _this.center = center;
                    LeafletUtil.handleEvent(_this.zone, _this.centerChange, center);
                }
            }
        });
    };
    /**
     * Resize the map to fit it's parent container
     */
    LeafletDirective.prototype.doResize = function () {
        var _this = this;
        // Run this outside of angular so the map events stay outside of angular
        this.zone.runOutsideAngular(function () {
            // Invalidate the map size to trigger it to update itself
            _this.map.invalidateSize({});
        });
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
     * @param latLngBounds the boundary to set
     */
    LeafletDirective.prototype.setFitBounds = function (latLngBounds) {
        if (this.map && null != latLngBounds) {
            this.map.fitBounds(latLngBounds, this.fitBoundsOptions);
        }
    };
    /**
     * Set the map's max bounds
     * @param latLngBounds the boundary to set
     */
    LeafletDirective.prototype.setMaxBounds = function (latLngBounds) {
        if (this.map && null != latLngBounds) {
            this.map.setMaxBounds(latLngBounds);
        }
    };
    /**
     * Set the map's min zoom
     * @param number the new min zoom
     */
    LeafletDirective.prototype.setMinZoom = function (zoom) {
        if (this.map && null != zoom) {
            this.map.setMinZoom(zoom);
        }
    };
    /**
     * Set the map's min zoom
     * @param number the new min zoom
     */
    LeafletDirective.prototype.setMaxZoom = function (zoom) {
        if (this.map && null != zoom) {
            this.map.setMaxZoom(zoom);
        }
    };
    __decorate([
        Input('leafletFitBoundsOptions'),
        __metadata("design:type", Object)
    ], LeafletDirective.prototype, "fitBoundsOptions", void 0);
    __decorate([
        Input('leafletPanOptions'),
        __metadata("design:type", Object)
    ], LeafletDirective.prototype, "panOptions", void 0);
    __decorate([
        Input('leafletZoomOptions'),
        __metadata("design:type", Object)
    ], LeafletDirective.prototype, "zoomOptions", void 0);
    __decorate([
        Input('leafletZoomPanOptions'),
        __metadata("design:type", Object)
    ], LeafletDirective.prototype, "zoomPanOptions", void 0);
    __decorate([
        Input('leafletOptions'),
        __metadata("design:type", Object)
    ], LeafletDirective.prototype, "options", void 0);
    __decorate([
        Output('leafletMapReady'),
        __metadata("design:type", Object)
    ], LeafletDirective.prototype, "mapReady", void 0);
    __decorate([
        Input('leafletZoom'),
        __metadata("design:type", Number)
    ], LeafletDirective.prototype, "zoom", void 0);
    __decorate([
        Output('leafletZoomChange'),
        __metadata("design:type", Object)
    ], LeafletDirective.prototype, "zoomChange", void 0);
    __decorate([
        Input('leafletCenter'),
        __metadata("design:type", LatLng)
    ], LeafletDirective.prototype, "center", void 0);
    __decorate([
        Output('leafletCenterChange'),
        __metadata("design:type", Object)
    ], LeafletDirective.prototype, "centerChange", void 0);
    __decorate([
        Input('leafletFitBounds'),
        __metadata("design:type", LatLngBounds)
    ], LeafletDirective.prototype, "fitBounds", void 0);
    __decorate([
        Input('leafletMaxBounds'),
        __metadata("design:type", LatLngBounds)
    ], LeafletDirective.prototype, "maxBounds", void 0);
    __decorate([
        Input('leafletMinZoom'),
        __metadata("design:type", Number)
    ], LeafletDirective.prototype, "minZoom", void 0);
    __decorate([
        Input('leafletMaxZoom'),
        __metadata("design:type", Number)
    ], LeafletDirective.prototype, "maxZoom", void 0);
    __decorate([
        Output('leafletClick'),
        __metadata("design:type", Object)
    ], LeafletDirective.prototype, "onClick", void 0);
    __decorate([
        Output('leafletDoubleClick'),
        __metadata("design:type", Object)
    ], LeafletDirective.prototype, "onDoubleClick", void 0);
    __decorate([
        Output('leafletMouseDown'),
        __metadata("design:type", Object)
    ], LeafletDirective.prototype, "onMouseDown", void 0);
    __decorate([
        Output('leafletMouseUp'),
        __metadata("design:type", Object)
    ], LeafletDirective.prototype, "onMouseUp", void 0);
    __decorate([
        Output('leafletMouseMove'),
        __metadata("design:type", Object)
    ], LeafletDirective.prototype, "onMouseMove", void 0);
    __decorate([
        Output('leafletMouseOver'),
        __metadata("design:type", Object)
    ], LeafletDirective.prototype, "onMouseOver", void 0);
    __decorate([
        Output('leafletMapMove'),
        __metadata("design:type", Object)
    ], LeafletDirective.prototype, "onMapMove", void 0);
    __decorate([
        Output('leafletMapMoveStart'),
        __metadata("design:type", Object)
    ], LeafletDirective.prototype, "onMapMoveStart", void 0);
    __decorate([
        Output('leafletMapMoveEnd'),
        __metadata("design:type", Object)
    ], LeafletDirective.prototype, "onMapMoveEnd", void 0);
    __decorate([
        Output('leafletMapZoom'),
        __metadata("design:type", Object)
    ], LeafletDirective.prototype, "onMapZoom", void 0);
    __decorate([
        Output('leafletMapZoomStart'),
        __metadata("design:type", Object)
    ], LeafletDirective.prototype, "onMapZoomStart", void 0);
    __decorate([
        Output('leafletMapZoomEnd'),
        __metadata("design:type", Object)
    ], LeafletDirective.prototype, "onMapZoomEnd", void 0);
    __decorate([
        HostListener('window:resize', []),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], LeafletDirective.prototype, "onResize", null);
    LeafletDirective = __decorate([
        Directive({
            selector: '[leaflet]'
        }),
        __metadata("design:paramtypes", [ElementRef, NgZone])
    ], LeafletDirective);
    return LeafletDirective;
}());
export { LeafletDirective };
//# sourceMappingURL=leaflet.directive.js.map