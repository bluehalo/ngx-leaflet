/*! @asymmetrik/ngx-leaflet - 3.0.1 - Copyright Asymmetrik, Ltd. 2007-2017 - All Rights Reserved. + */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('leaflet')) :
	typeof define === 'function' && define.amd ? define(['exports', '@angular/core', 'leaflet'], factory) :
	(factory((global.ngxLeaflet = {}),global.ng.core,global.L));
}(this, (function (exports,core,leaflet) { 'use strict';

var LeafletDirective = /** @class */ (function () {
    function LeafletDirective(element, zone) {
        // Nothing here
        this.element = element;
        this.zone = zone;
        this.DEFAULT_ZOOM = 1;
        this.DEFAULT_CENTER = leaflet.latLng(38.907192, -77.036871);
        this.DEFAULT_FPZ_OPTIONS = {};
        this.fitBoundsOptions = this.DEFAULT_FPZ_OPTIONS;
        this.panOptions = this.DEFAULT_FPZ_OPTIONS;
        this.zoomOptions = this.DEFAULT_FPZ_OPTIONS;
        this.zoomPanOptions = this.DEFAULT_FPZ_OPTIONS;
        // Default configuration
        this.options = {};
        // Configure callback function for the map
        this.mapReady = new core.EventEmitter();
    }
    LeafletDirective.prototype.ngOnInit = function () {
        var _this = this;
        // Create the map with some reasonable defaults
        this.zone.runOutsideAngular(function () {
            _this.map = leaflet.map(_this.element.nativeElement, _this.options);
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
        { type: core.Directive, args: [{
                    selector: '[leaflet]'
                },] },
    ];
    /** @nocollapse */
    LeafletDirective.ctorParameters = function () { return [
        { type: core.ElementRef, },
        { type: core.NgZone, },
    ]; };
    LeafletDirective.propDecorators = {
        "fitBoundsOptions": [{ type: core.Input, args: ['leafletFitBoundsOptions',] },],
        "panOptions": [{ type: core.Input, args: ['leafletPanOptions',] },],
        "zoomOptions": [{ type: core.Input, args: ['leafletZoomOptions',] },],
        "zoomPanOptions": [{ type: core.Input, args: ['leafletZoomPanOptions',] },],
        "options": [{ type: core.Input, args: ['leafletOptions',] },],
        "mapReady": [{ type: core.Output, args: ['leafletMapReady',] },],
        "zoom": [{ type: core.Input, args: ['leafletZoom',] },],
        "center": [{ type: core.Input, args: ['leafletCenter',] },],
        "fitBounds": [{ type: core.Input, args: ['leafletFitBounds',] },],
        "onResize": [{ type: core.HostListener, args: ['window:resize', [],] },],
    };
    return LeafletDirective;
}());

var LeafletDirectiveWrapper = /** @class */ (function () {
    function LeafletDirectiveWrapper(leafletDirective) {
        this.leafletDirective = leafletDirective;
    }
    LeafletDirectiveWrapper.prototype.init = function () {
        // Nothing for now
    };
    LeafletDirectiveWrapper.prototype.getMap = function () {
        return this.leafletDirective.getMap();
    };
    return LeafletDirectiveWrapper;
}());

/**
 * Layer directive
 *
 * This directive is used to directly control a single map layer. The purpose of this directive is to
 * be used as part of a child structural directive of the map element.
 *
 */
var LeafletLayerDirective = /** @class */ (function () {
    function LeafletLayerDirective(leafletDirective, zone) {
        this.zone = zone;
        this.leafletDirective = new LeafletDirectiveWrapper(leafletDirective);
    }
    LeafletLayerDirective.prototype.ngOnInit = function () {
        // Init the map
        this.leafletDirective.init();
    };
    LeafletLayerDirective.prototype.ngOnDestroy = function () {
        var _this = this;
        this.zone.runOutsideAngular(function () {
            _this.layer.remove();
        });
    };
    LeafletLayerDirective.prototype.ngOnChanges = function (changes) {
        var _this = this;
        if (changes['layer']) {
            // Update the layer
            var p_1 = changes['layer'].previousValue;
            var n_1 = changes['layer'].currentValue;
            this.zone.runOutsideAngular(function () {
                if (null != p_1) {
                    p_1.remove();
                }
                if (null != n_1) {
                    _this.leafletDirective.getMap().addLayer(n_1);
                }
            });
        }
    };
    LeafletLayerDirective.decorators = [
        { type: core.Directive, args: [{
                    selector: '[leafletLayer]'
                },] },
    ];
    /** @nocollapse */
    LeafletLayerDirective.ctorParameters = function () { return [
        { type: LeafletDirective, },
        { type: core.NgZone, },
    ]; };
    LeafletLayerDirective.propDecorators = {
        "layer": [{ type: core.Input, args: ['leafletLayer',] },],
    };
    return LeafletLayerDirective;
}());

/**
 * Layers directive
 *
 * This directive is used to directly control map layers. As changes are made to the input array of
 * layers, the map is synched to the array. As layers are added or removed from the input array, they
 * are also added or removed from the map. The input array is treated as immutable. To detect changes,
 * you must change the array instance.
 *
 * Important Note: The input layers array is assumed to be immutable. This means you need to use an
 * immutable array implementation or create a new copy of your array when you make changes, otherwise
 * this directive won't detect the change. This is by design. It's for performance reasons. Change
 * detection of mutable arrays requires diffing the state of the array on every DoCheck cycle, which
 * is extremely expensive from a time complexity perspective.
 *
 */
var LeafletLayersDirective = /** @class */ (function () {
    function LeafletLayersDirective(leafletDirective, differs, zone) {
        this.differs = differs;
        this.zone = zone;
        this.leafletDirective = new LeafletDirectiveWrapper(leafletDirective);
        this.layersDiffer = this.differs.find([]).create();
    }
    Object.defineProperty(LeafletLayersDirective.prototype, "layers", {
        get: function () {
            return this.layersValue;
        },
        set: 
        // Set/get the layers
        function (v) {
            this.layersValue = v;
            // Now that we have a differ, do an immediate layer update
            this.updateLayers();
        },
        enumerable: true,
        configurable: true
    });
    LeafletLayersDirective.prototype.ngDoCheck = function () {
        this.updateLayers();
    };
    LeafletLayersDirective.prototype.ngOnInit = function () {
        // Init the map
        this.leafletDirective.init();
        // Update layers once the map is ready
        this.updateLayers();
    };
    LeafletLayersDirective.prototype.ngOnDestroy = function () {
        this.layers = [];
    };
    /**
     * Update the state of the layers.
     * We use an iterable differ to synchronize the map layers with the state of the bound layers array.
     * This is important because it allows us to react to changes to the contents of the array as well
     * as changes to the actual array instance.
     */
    /**
         * Update the state of the layers.
         * We use an iterable differ to synchronize the map layers with the state of the bound layers array.
         * This is important because it allows us to react to changes to the contents of the array as well
         * as changes to the actual array instance.
         */
    LeafletLayersDirective.prototype.updateLayers = /**
         * Update the state of the layers.
         * We use an iterable differ to synchronize the map layers with the state of the bound layers array.
         * This is important because it allows us to react to changes to the contents of the array as well
         * as changes to the actual array instance.
         */
    function () {
        var map$$1 = this.leafletDirective.getMap();
        if (null != map$$1 && null != this.layersDiffer) {
            var changes_1 = this.layersDiffer.diff(this.layersValue);
            if (null != changes_1) {
                this.zone.runOutsideAngular(function () {
                    changes_1.forEachRemovedItem(function (c) {
                        map$$1.removeLayer(c.item);
                    });
                    changes_1.forEachAddedItem(function (c) {
                        map$$1.addLayer(c.item);
                    });
                });
            }
        }
    };
    LeafletLayersDirective.decorators = [
        { type: core.Directive, args: [{
                    selector: '[leafletLayers]'
                },] },
    ];
    /** @nocollapse */
    LeafletLayersDirective.ctorParameters = function () { return [
        { type: LeafletDirective, },
        { type: core.IterableDiffers, },
        { type: core.NgZone, },
    ]; };
    LeafletLayersDirective.propDecorators = {
        "layers": [{ type: core.Input, args: ['leafletLayers',] },],
    };
    return LeafletLayersDirective;
}());

var LeafletControlLayersChanges = /** @class */ (function () {
    function LeafletControlLayersChanges() {
        this.layersRemoved = 0;
        this.layersChanged = 0;
        this.layersAdded = 0;
    }
    LeafletControlLayersChanges.prototype.changed = function () {
        return !(this.layersRemoved === 0 && this.layersChanged === 0 && this.layersAdded === 0);
    };
    return LeafletControlLayersChanges;
}());

var LeafletControlLayersWrapper = /** @class */ (function () {
    function LeafletControlLayersWrapper(zone) {
        this.zone = zone;
    }
    LeafletControlLayersWrapper.prototype.getLayersControl = function () {
        return this.layersControl;
    };
    LeafletControlLayersWrapper.prototype.init = function (controlConfig, controlOptions) {
        var _this = this;
        var baseLayers = controlConfig.baseLayers || {};
        var overlays = controlConfig.overlays || {};
        this.zone.runOutsideAngular(function () {
            _this.layersControl = leaflet.control.layers(baseLayers, overlays, controlOptions);
        });
        return this.layersControl;
    };
    LeafletControlLayersWrapper.prototype.applyBaseLayerChanges = function (changes) {
        var results = new LeafletControlLayersChanges();
        if (null != this.layersControl) {
            results = this.applyChanges(changes, this.layersControl.addBaseLayer);
        }
        return results;
    };
    LeafletControlLayersWrapper.prototype.applyOverlayChanges = function (changes) {
        var results = new LeafletControlLayersChanges();
        if (null != this.layersControl) {
            results = this.applyChanges(changes, this.layersControl.addOverlay);
        }
        return results;
    };
    LeafletControlLayersWrapper.prototype.applyChanges = function (changes, addFn) {
        var _this = this;
        var results = new LeafletControlLayersChanges();
        if (null != changes) {
            changes.forEachChangedItem(function (c) {
                _this.layersControl.removeLayer(c.previousValue);
                addFn.call(_this.layersControl, c.currentValue, c.key);
                results.layersChanged++;
            });
            changes.forEachRemovedItem(function (c) {
                _this.layersControl.removeLayer(c.previousValue);
                results.layersRemoved++;
            });
            changes.forEachAddedItem(function (c) {
                addFn.call(_this.layersControl, c.currentValue, c.key);
                results.layersAdded++;
            });
        }
        return results;
    };
    return LeafletControlLayersWrapper;
}());

var LeafletControlLayersConfig = /** @class */ (function () {
    function LeafletControlLayersConfig() {
        this.baseLayers = {};
        this.overlays = {};
    }
    return LeafletControlLayersConfig;
}());

/**
 * Layers Control
 *
 * This directive is used to configure the layers control. The input accepts an object with two
 * key-value maps of layer name -> layer. Mutable changes are detected. On changes, a differ is
 * used to determine what changed so that layers are appropriately added or removed.
 *
 * To specify which layer to show as the 'active' baselayer, you will want to add it to the map
 * using the layers directive. Otherwise, the last one it sees will be used.
 */
var LeafletLayersControlDirective = /** @class */ (function () {
    function LeafletLayersControlDirective(leafletDirective, differs, zone) {
        this.differs = differs;
        this.zone = zone;
        this.leafletDirective = new LeafletDirectiveWrapper(leafletDirective);
        this.controlLayers = new LeafletControlLayersWrapper(zone);
        // Generate differs
        this.baseLayersDiffer = this.differs.find({}).create();
        this.overlaysDiffer = this.differs.find({}).create();
    }
    Object.defineProperty(LeafletLayersControlDirective.prototype, "layersControlConfig", {
        get: function () {
            return this.layersControlConfigValue;
        },
        set: function (v) {
            // Validation/init stuff
            if (null == v) {
                v = new LeafletControlLayersConfig();
            }
            if (null == v.baseLayers) {
                v.baseLayers = {};
            }
            if (null == v.overlays) {
                v.overlays = {};
            }
            // Store the value
            this.layersControlConfigValue = v;
            // Update the map
            this.updateLayers();
        },
        enumerable: true,
        configurable: true
    });
    LeafletLayersControlDirective.prototype.ngOnInit = function () {
        var _this = this;
        // Init the map
        this.leafletDirective.init();
        // Set up all the initial settings
        this.zone.runOutsideAngular(function () {
            _this.controlLayers
                .init({}, _this.layersControlOptions)
                .addTo(_this.leafletDirective.getMap());
        });
        this.updateLayers();
    };
    LeafletLayersControlDirective.prototype.ngOnDestroy = function () {
        var _this = this;
        this.layersControlConfig = { baseLayers: {}, overlays: {} };
        this.zone.runOutsideAngular(function () {
            _this.controlLayers.getLayersControl().remove();
        });
    };
    LeafletLayersControlDirective.prototype.ngDoCheck = function () {
        this.updateLayers();
    };
    LeafletLayersControlDirective.prototype.updateLayers = function () {
        var map$$1 = this.leafletDirective.getMap();
        var layersControl = this.controlLayers.getLayersControl();
        if (null != map$$1 && null != layersControl) {
            // Run the baselayers differ
            if (null != this.baseLayersDiffer && null != this.layersControlConfigValue.baseLayers) {
                var changes = this.baseLayersDiffer.diff(this.layersControlConfigValue.baseLayers);
                this.controlLayers.applyBaseLayerChanges(changes);
            }
            // Run the overlays differ
            if (null != this.overlaysDiffer && null != this.layersControlConfigValue.overlays) {
                var changes = this.overlaysDiffer.diff(this.layersControlConfigValue.overlays);
                this.controlLayers.applyOverlayChanges(changes);
            }
        }
    };
    LeafletLayersControlDirective.decorators = [
        { type: core.Directive, args: [{
                    selector: '[leafletLayersControl]'
                },] },
    ];
    /** @nocollapse */
    LeafletLayersControlDirective.ctorParameters = function () { return [
        { type: LeafletDirective, },
        { type: core.KeyValueDiffers, },
        { type: core.NgZone, },
    ]; };
    LeafletLayersControlDirective.propDecorators = {
        "layersControlConfig": [{ type: core.Input, args: ['leafletLayersControl',] },],
        "layersControlOptions": [{ type: core.Input, args: ['leafletLayersControlOptions',] },],
    };
    return LeafletLayersControlDirective;
}());

var LeafletUtil = /** @class */ (function () {
    function LeafletUtil() {
    }
    LeafletUtil.mapToArray = function (map$$1) {
        var toReturn = [];
        for (var k in map$$1) {
            if (map$$1.hasOwnProperty(k)) {
                toReturn.push(map$$1[k]);
            }
        }
        return toReturn;
    };
    return LeafletUtil;
}());

/**
 * Baselayers directive
 *
 * This directive is provided as a convenient way to add baselayers to the map. The input accepts
 * a key-value map of layer name -> layer. Mutable changed are detected. On changes, a differ is
 * used to determine what changed so that layers are appropriately added or removed. This directive
 * will also add the layers control so users can switch between available base layers.
 *
 * To specify which layer to show as the 'active' baselayer, you will want to add it to the map
 * using the layers directive. Otherwise, the plugin will use the last one it sees.
 */
var LeafletBaseLayersDirective = /** @class */ (function () {
    function LeafletBaseLayersDirective(leafletDirective, differs, zone) {
        this.differs = differs;
        this.zone = zone;
        this.leafletDirective = new LeafletDirectiveWrapper(leafletDirective);
        this.controlLayers = new LeafletControlLayersWrapper(zone);
        this.baseLayersDiffer = this.differs.find({}).create();
    }
    Object.defineProperty(LeafletBaseLayersDirective.prototype, "baseLayers", {
        get: function () {
            return this.baseLayersValue;
        },
        set: 
        // Set/get baseLayers
        function (v) {
            this.baseLayersValue = v;
            this.updateBaseLayers();
        },
        enumerable: true,
        configurable: true
    });
    LeafletBaseLayersDirective.prototype.ngOnDestroy = function () {
        var _this = this;
        this.baseLayers = {};
        this.zone.runOutsideAngular(function () {
            _this.controlLayers.getLayersControl().remove();
        });
    };
    LeafletBaseLayersDirective.prototype.ngOnInit = function () {
        var _this = this;
        // Init the map
        this.leafletDirective.init();
        // Initially configure the controlLayers
        this.zone.runOutsideAngular(function () {
            _this.controlLayers
                .init({}, _this.layersControlOptions)
                .addTo(_this.leafletDirective.getMap());
        });
        this.updateBaseLayers();
    };
    LeafletBaseLayersDirective.prototype.ngDoCheck = function () {
        this.updateBaseLayers();
    };
    LeafletBaseLayersDirective.prototype.updateBaseLayers = function () {
        var map$$1 = this.leafletDirective.getMap();
        var layersControl = this.controlLayers.getLayersControl();
        if (null != map$$1 && null != layersControl && null != this.baseLayersDiffer) {
            var changes = this.baseLayersDiffer.diff(this.baseLayersValue);
            var results = this.controlLayers.applyBaseLayerChanges(changes);
            if (results.changed()) {
                this.syncBaseLayer();
            }
        }
    };
    /**
     * Check the current base layer and change it to the new one if necessary
     */
    /**
         * Check the current base layer and change it to the new one if necessary
         */
    LeafletBaseLayersDirective.prototype.syncBaseLayer = /**
         * Check the current base layer and change it to the new one if necessary
         */
    function () {
        var _this = this;
        var map$$1 = this.leafletDirective.getMap();
        var layers = LeafletUtil.mapToArray(this.baseLayers);
        var foundLayer;
        // Search all the layers in the map to see if we can find them in the baselayer array
        map$$1.eachLayer(function (l) {
            foundLayer = layers.find(function (bl) { return (l === bl); });
        });
        // Did we find the layer?
        if (null != foundLayer) {
            // Yes - set the baselayer to the one we found
            this.baseLayer = foundLayer;
        }
        else {
            // No - set the baselayer to the first in the array and add it to the map
            if (layers.length > 0) {
                this.baseLayer = layers[0];
                this.zone.runOutsideAngular(function () {
                    _this.baseLayer.addTo(map$$1);
                });
            }
        }
    };
    LeafletBaseLayersDirective.decorators = [
        { type: core.Directive, args: [{
                    selector: '[leafletBaseLayers]'
                },] },
    ];
    /** @nocollapse */
    LeafletBaseLayersDirective.ctorParameters = function () { return [
        { type: LeafletDirective, },
        { type: core.KeyValueDiffers, },
        { type: core.NgZone, },
    ]; };
    LeafletBaseLayersDirective.propDecorators = {
        "baseLayers": [{ type: core.Input, args: ['leafletBaseLayers',] },],
        "layersControlOptions": [{ type: core.Input, args: ['leafletLayersControlOptions',] },],
    };
    return LeafletBaseLayersDirective;
}());

var LeafletModule = /** @class */ (function () {
    function LeafletModule() {
    }
    LeafletModule.forRoot = function () {
        return { ngModule: LeafletModule, providers: [] };
    };
    LeafletModule.decorators = [
        { type: core.NgModule, args: [{
                    exports: [
                        LeafletDirective,
                        LeafletLayerDirective,
                        LeafletLayersDirective,
                        LeafletLayersControlDirective,
                        LeafletBaseLayersDirective
                    ],
                    declarations: [
                        LeafletDirective,
                        LeafletLayerDirective,
                        LeafletLayersDirective,
                        LeafletLayersControlDirective,
                        LeafletBaseLayersDirective
                    ]
                },] },
    ];
    /** @nocollapse */
    LeafletModule.ctorParameters = function () { return []; };
    return LeafletModule;
}());

var LeafletTileLayerDefinition = /** @class */ (function () {
    function LeafletTileLayerDefinition(type, url, options) {
        this.type = type;
        this.url = url;
        this.options = options;
    }
    /**
     * Creates a TileLayer from the provided definition. This is a convenience function
     * to help with generating layers from objects.
     *
     * @param layerDef The layer to create
     * @returns {TileLayer} The TileLayer that has been created
     */
    /**
         * Creates a TileLayer from the provided definition. This is a convenience function
         * to help with generating layers from objects.
         *
         * @param layerDef The layer to create
         * @returns {TileLayer} The TileLayer that has been created
         */
    LeafletTileLayerDefinition.createTileLayer = /**
         * Creates a TileLayer from the provided definition. This is a convenience function
         * to help with generating layers from objects.
         *
         * @param layerDef The layer to create
         * @returns {TileLayer} The TileLayer that has been created
         */
    function (layerDef) {
        var layer;
        switch (layerDef.type) {
            case 'xyz':
                layer = leaflet.tileLayer(layerDef.url, layerDef.options);
                break;
            case 'wms':
            default:
                layer = leaflet.tileLayer.wms(layerDef.url, layerDef.options);
                break;
        }
        return layer;
    };
    /**
     * Creates a TileLayer for each key in the incoming map. This is a convenience function
     * for generating an associative array of layers from an associative array of objects
     *
     * @param layerDefs A map of key to tile layer definition
     * @returns {{[p: string]: TileLayer}} A new map of key to TileLayer
     */
    /**
         * Creates a TileLayer for each key in the incoming map. This is a convenience function
         * for generating an associative array of layers from an associative array of objects
         *
         * @param layerDefs A map of key to tile layer definition
         * @returns {{[p: string]: TileLayer}} A new map of key to TileLayer
         */
    LeafletTileLayerDefinition.createTileLayers = /**
         * Creates a TileLayer for each key in the incoming map. This is a convenience function
         * for generating an associative array of layers from an associative array of objects
         *
         * @param layerDefs A map of key to tile layer definition
         * @returns {{[p: string]: TileLayer}} A new map of key to TileLayer
         */
    function (layerDefs) {
        var layers = {};
        for (var k in layerDefs) {
            if (layerDefs.hasOwnProperty(k)) {
                layers[k] = (LeafletTileLayerDefinition.createTileLayer(layerDefs[k]));
            }
        }
        return layers;
    };
    /**
     * Create a Tile Layer from the current state of this object
     *
     * @returns {TileLayer} A new TileLayer
     */
    /**
         * Create a Tile Layer from the current state of this object
         *
         * @returns {TileLayer} A new TileLayer
         */
    LeafletTileLayerDefinition.prototype.createTileLayer = /**
         * Create a Tile Layer from the current state of this object
         *
         * @returns {TileLayer} A new TileLayer
         */
    function () {
        return LeafletTileLayerDefinition.createTileLayer(this);
    };
    return LeafletTileLayerDefinition;
}());

exports.LeafletModule = LeafletModule;
exports.LeafletDirective = LeafletDirective;
exports.LeafletDirectiveWrapper = LeafletDirectiveWrapper;
exports.LeafletTileLayerDefinition = LeafletTileLayerDefinition;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ngx-leaflet.js.map
