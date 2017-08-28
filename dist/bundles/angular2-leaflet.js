/*! @asymmetrik/angular2-leaflet - 2.2.1 - Copyright Asymmetrik, Ltd. 2007-2017 - All Rights Reserved. + */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('leaflet')) :
	typeof define === 'function' && define.amd ? define(['exports', '@angular/core', 'leaflet'], factory) :
	(factory((global.angular2Leaflet = global.angular2Leaflet || {}),global.ng.core,global.L));
}(this, (function (exports,_angular_core,L$1) { 'use strict';

var LeafletDirective = (function () {
    function LeafletDirective(el) {
        this.DEFAULT_ZOOM = 1;
        this.DEFAULT_CENTER = L$1.latLng([38.907192, -77.036871]);
        this.DEFAULT_FPZ_OPTIONS = {};
        this.fitBoundsOptions = this.DEFAULT_FPZ_OPTIONS;
        this.panOptions = this.DEFAULT_FPZ_OPTIONS;
        this.zoomOptions = this.DEFAULT_FPZ_OPTIONS;
        this.zoomPanOptions = this.DEFAULT_FPZ_OPTIONS;
        // Default configuration
        this.options = {};
        // Configure callback function for the map
        this.mapReady = new _angular_core.EventEmitter();
        this.element = el;
    }
    LeafletDirective.prototype.ngOnInit = function () {
        // Create the map with some reasonable defaults
        this.map = L$1.map(this.element.nativeElement, this.options);
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
LeafletDirective.decorators = [
    { type: _angular_core.Directive, args: [{
                selector: '[leaflet]'
            },] },
];
/** @nocollapse */
LeafletDirective.ctorParameters = function () { return [
    { type: _angular_core.ElementRef, },
]; };
LeafletDirective.propDecorators = {
    'fitBoundsOptions': [{ type: _angular_core.Input, args: ['leafletFitBoundsOptions',] },],
    'panOptions': [{ type: _angular_core.Input, args: ['leafletPanOptions',] },],
    'zoomOptions': [{ type: _angular_core.Input, args: ['leafletZoomOptions',] },],
    'zoomPanOptions': [{ type: _angular_core.Input, args: ['leafletZoomPanOptions',] },],
    'options': [{ type: _angular_core.Input, args: ['leafletOptions',] },],
    'mapReady': [{ type: _angular_core.Output, args: ['leafletMapReady',] },],
    'zoom': [{ type: _angular_core.Input, args: ['leafletZoom',] },],
    'center': [{ type: _angular_core.Input, args: ['leafletCenter',] },],
    'fitBounds': [{ type: _angular_core.Input, args: ['leafletFitBounds',] },],
    'onResize': [{ type: _angular_core.HostListener, args: ['window:resize', [],] },],
};

var LeafletDirectiveWrapper = (function () {
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
 * Layers directive
 *
 * This directive is used to directly control map layers. As changed are made to the input array of
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
var LeafletLayersDirective = (function () {
    function LeafletLayersDirective(leafletDirective, differs) {
        this.differs = differs;
        this.leafletDirective = new LeafletDirectiveWrapper(leafletDirective);
        this.layersDiffer = this.differs.find([]).create();
    }
    Object.defineProperty(LeafletLayersDirective.prototype, "layers", {
        get: function () {
            return this.layersValue;
        },
        // Set/get the layers
        set: function (v) {
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
    /**
     * Update the state of the layers.
     * We use an iterable differ to synchronize the map layers with the state of the bound layers array.
     * This is important because it allows us to react to changes to the contents of the array as well
     * as changes to the actual array instance.
     */
    LeafletLayersDirective.prototype.updateLayers = function () {
        var map$$1 = this.leafletDirective.getMap();
        if (null != map$$1 && null != this.layersDiffer) {
            var changes = this.layersDiffer.diff(this.layersValue);
            if (null != changes) {
                changes.forEachRemovedItem(function (c) {
                    map$$1.removeLayer(c.item);
                });
                changes.forEachAddedItem(function (c) {
                    map$$1.addLayer(c.item);
                });
            }
        }
    };
    return LeafletLayersDirective;
}());
LeafletLayersDirective.decorators = [
    { type: _angular_core.Directive, args: [{
                selector: '[leafletLayers]'
            },] },
];
/** @nocollapse */
LeafletLayersDirective.ctorParameters = function () { return [
    { type: LeafletDirective, },
    { type: _angular_core.IterableDiffers, },
]; };
LeafletLayersDirective.propDecorators = {
    'layers': [{ type: _angular_core.Input, args: ['leafletLayers',] },],
};

var LeafletControlLayersChanges = (function () {
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

var LeafletControlLayersWrapper = (function () {
    function LeafletControlLayersWrapper() {
    }
    LeafletControlLayersWrapper.prototype.getLayersControl = function () {
        return this.layersControl;
    };
    LeafletControlLayersWrapper.prototype.init = function (controlConfig, controlOptions) {
        var baseLayers = controlConfig.baseLayers || {};
        var overlays = controlConfig.overlays || {};
        this.layersControl = L$1.control.layers(baseLayers, overlays, controlOptions);
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
                _this.layersControl.removeLayer(c.currentValue);
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

var LeafletControlLayersConfig = (function () {
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
var LeafletLayersControlDirective = (function () {
    function LeafletLayersControlDirective(leafletDirective, differs) {
        this.differs = differs;
        this.leafletDirective = new LeafletDirectiveWrapper(leafletDirective);
        this.controlLayers = new LeafletControlLayersWrapper();
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
        // Init the map
        this.leafletDirective.init();
        // Set up all the initial settings
        this.controlLayers
            .init({}, this.layersControlOptions)
            .addTo(this.leafletDirective.getMap());
        this.updateLayers();
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
    return LeafletLayersControlDirective;
}());
LeafletLayersControlDirective.decorators = [
    { type: _angular_core.Directive, args: [{
                selector: '[leafletLayersControl]'
            },] },
];
/** @nocollapse */
LeafletLayersControlDirective.ctorParameters = function () { return [
    { type: LeafletDirective, },
    { type: _angular_core.KeyValueDiffers, },
]; };
LeafletLayersControlDirective.propDecorators = {
    'layersControlConfig': [{ type: _angular_core.Input, args: ['leafletLayersControl',] },],
    'layersControlOptions': [{ type: _angular_core.Input, args: ['leafletLayersControlOptions',] },],
};

var LeafletUtil = (function () {
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
var LeafletBaseLayersDirective = (function () {
    function LeafletBaseLayersDirective(leafletDirective, differs) {
        this.differs = differs;
        this.leafletDirective = new LeafletDirectiveWrapper(leafletDirective);
        this.controlLayers = new LeafletControlLayersWrapper();
        this.baseLayersDiffer = this.differs.find({}).create();
    }
    Object.defineProperty(LeafletBaseLayersDirective.prototype, "baseLayers", {
        get: function () {
            return this.baseLayersValue;
        },
        // Set/get baseLayers
        set: function (v) {
            this.baseLayersValue = v;
            this.updateBaseLayers();
        },
        enumerable: true,
        configurable: true
    });
    LeafletBaseLayersDirective.prototype.ngOnInit = function () {
        // Init the map
        this.leafletDirective.init();
        // Initially configure the controlLayers
        this.controlLayers
            .init({}, this.layersControlOptions)
            .addTo(this.leafletDirective.getMap());
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
    LeafletBaseLayersDirective.prototype.syncBaseLayer = function () {
        var map$$1 = this.leafletDirective.getMap();
        var layers = LeafletUtil.mapToArray(this.baseLayers);
        var foundLayer;
        // Search all the layers in the map to see if we can find them in the baselayer array
        map$$1.eachLayer(function (l) {
            foundLayer = layers.find(function (bl) { return l === bl; });
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
                this.baseLayer.addTo(map$$1);
            }
        }
    };
    return LeafletBaseLayersDirective;
}());
LeafletBaseLayersDirective.decorators = [
    { type: _angular_core.Directive, args: [{
                selector: '[leafletBaseLayers]'
            },] },
];
/** @nocollapse */
LeafletBaseLayersDirective.ctorParameters = function () { return [
    { type: LeafletDirective, },
    { type: _angular_core.KeyValueDiffers, },
]; };
LeafletBaseLayersDirective.propDecorators = {
    'baseLayers': [{ type: _angular_core.Input, args: ['leafletBaseLayers',] },],
    'layersControlOptions': [{ type: _angular_core.Input, args: ['leafletLayersControlOptions',] },],
};

var LeafletModule = (function () {
    function LeafletModule() {
    }
    LeafletModule.forRoot = function () {
        return { ngModule: LeafletModule, providers: [] };
    };
    return LeafletModule;
}());
LeafletModule.decorators = [
    { type: _angular_core.NgModule, args: [{
                exports: [
                    LeafletDirective,
                    LeafletLayersDirective,
                    LeafletLayersControlDirective,
                    LeafletBaseLayersDirective
                ],
                declarations: [
                    LeafletDirective,
                    LeafletLayersDirective,
                    LeafletLayersControlDirective,
                    LeafletBaseLayersDirective
                ]
            },] },
];
/** @nocollapse */
LeafletModule.ctorParameters = function () { return []; };

var LeafletTileLayerDefinition = (function () {
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
     * @returns {L.TileLayer} The TileLayer that has been created
     */
    LeafletTileLayerDefinition.createTileLayer = function (layerDef) {
        var layer;
        switch (layerDef.type) {
            case 'xyz':
                layer = L.tileLayer(layerDef.url, layerDef.options);
                break;
            case 'wms':
            default:
                layer = L.tileLayer.wms(layerDef.url, layerDef.options);
                break;
        }
        return layer;
    };
    /**
     * Creates a TileLayer for each key in the incoming map. This is a convenience function
     * for generating an associative array of layers from an associative array of objects
     *
     * @param layerDefs A map of key to tile layer definition
     * @returns {{[p: string]: L.TileLayer}} A new map of key to TileLayer
     */
    LeafletTileLayerDefinition.createTileLayers = function (layerDefs) {
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
     * @returns {L.TileLayer} A new TileLayer
     */
    LeafletTileLayerDefinition.prototype.createTileLayer = function () {
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
//# sourceMappingURL=angular2-leaflet.js.map
