/*! @asymmetrik/angular2-leaflet-1.2.1 - Copyright Asymmetrik, Ltd. 2007-2017 - All Rights Reserved.*/
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('leaflet')) :
	typeof define === 'function' && define.amd ? define(['exports', '@angular/core', 'leaflet'], factory) :
	(factory((global.angular2Leaflet = global.angular2Leaflet || {}),global.ng.core,global.L));
}(this, (function (exports,_angular_core,L$1) { 'use strict';

var __decorate$1 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
exports.LeafletDirective = (function () {
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
__decorate$1([
    _angular_core.Input('leafletFitBoundsOptions'),
    __metadata("design:type", Object)
], exports.LeafletDirective.prototype, "fitBoundsOptions", void 0);
__decorate$1([
    _angular_core.Input('leafletPanOptions'),
    __metadata("design:type", Object)
], exports.LeafletDirective.prototype, "panOptions", void 0);
__decorate$1([
    _angular_core.Input('leafletZoomOptions'),
    __metadata("design:type", Object)
], exports.LeafletDirective.prototype, "zoomOptions", void 0);
__decorate$1([
    _angular_core.Input('leafletZoomPanOptions'),
    __metadata("design:type", Object)
], exports.LeafletDirective.prototype, "zoomPanOptions", void 0);
__decorate$1([
    _angular_core.Input('leafletOptions'),
    __metadata("design:type", Object)
], exports.LeafletDirective.prototype, "options", void 0);
__decorate$1([
    _angular_core.Output('leafletMapReady'),
    __metadata("design:type", Object)
], exports.LeafletDirective.prototype, "mapReady", void 0);
__decorate$1([
    _angular_core.Input('leafletZoom'),
    __metadata("design:type", Number)
], exports.LeafletDirective.prototype, "zoom", void 0);
__decorate$1([
    _angular_core.Input('leafletCenter'),
    __metadata("design:type", L$1.LatLng)
], exports.LeafletDirective.prototype, "center", void 0);
__decorate$1([
    _angular_core.Input('leafletFitBounds'),
    __metadata("design:type", L$1.LatLngBounds)
], exports.LeafletDirective.prototype, "fitBounds", void 0);
__decorate$1([
    _angular_core.HostListener('window:resize', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], exports.LeafletDirective.prototype, "onResize", null);
exports.LeafletDirective = __decorate$1([
    _angular_core.Directive({
        selector: '[leaflet]'
    }),
    __metadata("design:paramtypes", [_angular_core.ElementRef])
], exports.LeafletDirective);

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

var LeafletLayerDiff = (function () {
    function LeafletLayerDiff(remove, add) {
        this.remove = remove;
        this.add = add;
    }
    return LeafletLayerDiff;
}());

var LeafletLayersUtil = (function () {
    function LeafletLayersUtil() {
    }
    LeafletLayersUtil.diffLayers = function (newLayers, prevLayers) {
        var toRemove;
        var toAdd;
        if (null == newLayers) {
            newLayers = [];
        }
        if (null == prevLayers) {
            prevLayers = [];
        }
        // Figure out which layers need to be removed (prev - new)
        toRemove = prevLayers
            .filter(function (pl) {
            return !(newLayers.find(function (nl) { return (pl === nl); }));
        });
        // Figure out which layers need to be added (new - prev)
        toAdd = newLayers
            .filter(function (pl) {
            return !(prevLayers.find(function (nl) { return (pl === nl); }));
        });
        return new LeafletLayerDiff(toRemove, toAdd);
    };
    return LeafletLayersUtil;
}());

var __decorate$2 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$1 = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var LeafletLayersDirective = (function () {
    function LeafletLayersDirective(leafletDirective) {
        this.leafletDirective = new LeafletDirectiveWrapper(leafletDirective);
    }
    LeafletLayersDirective.prototype.ngOnInit = function () {
        // Init the map
        this.leafletDirective.init();
        // The way we've set this up, map isn't set until after the first round of changes has gone through
        this.setLayers(this.layers, []);
    };
    LeafletLayersDirective.prototype.ngOnChanges = function (changes) {
        // Set the layers
        if (changes['layers']) {
            var c = changes['layers'].currentValue;
            var p = (changes['layers'].isFirstChange()) ? [] : changes['layers'].previousValue;
            this.setLayers(c, p);
        }
    };
    /**
     * Replace the current layers in the map with the provided array
     * @param layers The new complete array of layers for the map
     */
    LeafletLayersDirective.prototype.setLayers = function (newLayers, prevLayers) {
        var map$$1 = this.leafletDirective.getMap();
        if (null != map$$1) {
            var diff = LeafletLayersUtil.diffLayers(newLayers, prevLayers);
            // Remove the layers
            diff.remove.forEach(function (l) { map$$1.removeLayer(l); });
            // Add the new layers
            diff.add.forEach(function (l) { map$$1.addLayer(l); });
        }
    };
    return LeafletLayersDirective;
}());
__decorate$2([
    _angular_core.Input('leafletLayers'),
    __metadata$1("design:type", Array)
], LeafletLayersDirective.prototype, "layers", void 0);
LeafletLayersDirective = __decorate$2([
    _angular_core.Directive({
        selector: '[leafletLayers]'
    }),
    __metadata$1("design:paramtypes", [exports.LeafletDirective])
], LeafletLayersDirective);

var LeafletUtil = (function () {
    function LeafletUtil() {
    }
    /**
     * Combine two associative arrays in a shallow manner. Where there are duplicate properties,
     * the value in the second object will overwrite the value of the first object
     *
     * @param aMap The first object
     * @param bMap The second object
     * @returns {{}} The aggregate of both objects
     */
    LeafletUtil.mergeMaps = function (aMap, bMap) {
        var toReturn = {};
        if (null != aMap) {
            for (var k in aMap) {
                if (aMap.hasOwnProperty(k)) {
                    toReturn[k] = aMap[k];
                }
            }
        }
        if (null != bMap) {
            for (var k in bMap) {
                if (bMap.hasOwnProperty(k)) {
                    toReturn[k] = bMap[k];
                }
            }
        }
        return toReturn;
    };
    /**
     * Subtracts the properties of an associative array in a shallow manner.
     * Where there are duplicate properties, the properties will be removed
     * from the first object.
     *
     * @param aMap The object from which to subtract properties
     * @param bMap The object containing properties to subtract
     * @returns {{}}
     */
    LeafletUtil.mapSubtract = function (aMap, bMap) {
        var toReturn = {};
        if (null != aMap) {
            // Copy all of aMap into toReturn
            for (var k in aMap) {
                if (aMap.hasOwnProperty(k)) {
                    toReturn[k] = aMap[k];
                }
            }
            // If there's a bMap, delete all bMap keys from aMap
            if (null != bMap) {
                for (var k in bMap) {
                    if (bMap.hasOwnProperty(k)) {
                        delete toReturn[k];
                    }
                }
            }
        }
        return toReturn;
    };
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

var LeafletLayersObjectDiff = (function () {
    function LeafletLayersObjectDiff(remove, add) {
        this.remove = remove;
        this.add = add;
    }
    return LeafletLayersObjectDiff;
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
    LeafletControlLayersWrapper.prototype.setLayersControlConfig = function (newConfig, prevConfig) {
        if (null == this.layersControl) {
            return new LeafletLayersObjectDiff({}, {});
        }
        var toRemove;
        var baseLayers;
        var overlays;
        // Figure out which layers need to be removed (prev - new)
        toRemove = LeafletUtil.mergeMaps(LeafletUtil.mapSubtract(prevConfig.baseLayers, newConfig.baseLayers), LeafletUtil.mapSubtract(prevConfig.overlays, newConfig.overlays));
        // Figure out which layers need to be added (new - prev)
        baseLayers = LeafletUtil.mapSubtract(newConfig.baseLayers, prevConfig.baseLayers);
        overlays = LeafletUtil.mapSubtract(newConfig.overlays, prevConfig.overlays);
        // Do the actual removal and addition
        for (var k in toRemove) {
            if (toRemove.hasOwnProperty(k)) {
                var l = toRemove[k];
                this.layersControl.removeLayer(l);
            }
        }
        for (var k in baseLayers) {
            if (baseLayers.hasOwnProperty(k)) {
                var l = baseLayers[k];
                this.layersControl.addBaseLayer(l, k);
            }
        }
        for (var k in overlays) {
            if (overlays.hasOwnProperty(k)) {
                var l = overlays[k];
                this.layersControl.addOverlay(l, k);
            }
        }
        return new LeafletLayersObjectDiff(toRemove, LeafletUtil.mergeMaps(baseLayers, overlays));
    };
    return LeafletControlLayersWrapper;
}());

var __decorate$3 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$2 = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var LeafletLayersControlDirective = (function () {
    function LeafletLayersControlDirective(leafletDirective) {
        this.leafletDirective = new LeafletDirectiveWrapper(leafletDirective);
        this.controlLayers = new LeafletControlLayersWrapper();
    }
    LeafletLayersControlDirective.prototype.ngOnInit = function () {
        // Init the map
        this.leafletDirective.init();
        // Set up all the initial settings
        this.controlLayers
            .init(this.layersControlConfig, this.layersControlOptions)
            .addTo(this.leafletDirective.getMap());
    };
    LeafletLayersControlDirective.prototype.ngOnChanges = function (changes) {
        // Set the layers
        if (changes['layersControlCfg']) {
            this.controlLayers.setLayersControlConfig(changes['layersControlCfg'].currentValue, changes['layersControlCfg'].previousValue);
        }
    };
    return LeafletLayersControlDirective;
}());
__decorate$3([
    _angular_core.Input('leafletLayersControl'),
    __metadata$2("design:type", Object)
], LeafletLayersControlDirective.prototype, "layersControlConfig", void 0);
__decorate$3([
    _angular_core.Input('leafletLayersControlOptions'),
    __metadata$2("design:type", Object)
], LeafletLayersControlDirective.prototype, "layersControlOptions", void 0);
LeafletLayersControlDirective = __decorate$3([
    _angular_core.Directive({
        selector: '[leafletLayersControl]'
    }),
    __metadata$2("design:paramtypes", [exports.LeafletDirective])
], LeafletLayersControlDirective);

var LeafletControlLayersConfig = (function () {
    function LeafletControlLayersConfig(baseLayers, overlays) {
        this.baseLayers = baseLayers;
        this.overlays = overlays;
    }
    return LeafletControlLayersConfig;
}());

var __decorate$4 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$3 = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var LeafletBaseLayersDirective = (function () {
    function LeafletBaseLayersDirective(leafletDirective) {
        this.leafletDirective = new LeafletDirectiveWrapper(leafletDirective);
        this.controlLayers = new LeafletControlLayersWrapper();
    }
    LeafletBaseLayersDirective.prototype.ngOnInit = function () {
        // Init the map
        this.leafletDirective.init();
        // Initially configure the controlLayers
        this.controlLayers
            .init({ baseLayers: this.baseLayers }, this.layersControlOptions)
            .addTo(this.leafletDirective.getMap());
        // Sync the baselayer (will default to the first layer in the map)
        this.syncBaseLayer();
    };
    LeafletBaseLayersDirective.prototype.ngOnChanges = function (changes) {
        // Set the new baseLayers
        if (changes['baseLayers']) {
            this.setBaseLayers(changes['baseLayers'].currentValue, changes['baseLayers'].previousValue);
        }
    };
    LeafletBaseLayersDirective.prototype.setBaseLayers = function (newBaseLayers, prevBaseLayers) {
        // Update the layers control
        this.controlLayers.setLayersControlConfig(new LeafletControlLayersConfig(newBaseLayers), new LeafletControlLayersConfig(prevBaseLayers));
        // Sync the new baseLayer
        this.syncBaseLayer();
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
__decorate$4([
    _angular_core.Input('leafletBaseLayers'),
    __metadata$3("design:type", Object)
], LeafletBaseLayersDirective.prototype, "baseLayers", void 0);
__decorate$4([
    _angular_core.Input('leafletLayersControlOptions'),
    __metadata$3("design:type", Object)
], LeafletBaseLayersDirective.prototype, "layersControlOptions", void 0);
LeafletBaseLayersDirective = __decorate$4([
    _angular_core.Directive({
        selector: '[leafletBaseLayers]'
    }),
    __metadata$3("design:paramtypes", [exports.LeafletDirective])
], LeafletBaseLayersDirective);

var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.LeafletModule = (function () {
    function LeafletModule() {
    }
    return LeafletModule;
}());
exports.LeafletModule = __decorate([
    _angular_core.NgModule({
        imports: [],
        exports: [
            exports.LeafletDirective,
            LeafletLayersDirective,
            LeafletLayersControlDirective,
            LeafletBaseLayersDirective
        ],
        declarations: [
            exports.LeafletDirective,
            LeafletLayersDirective,
            LeafletLayersControlDirective,
            LeafletBaseLayersDirective
        ],
        providers: []
    })
], exports.LeafletModule);

var LeafletControlLayersUtil = (function () {
    function LeafletControlLayersUtil() {
    }
    LeafletControlLayersUtil.prototype.diffLayers = function (newLayers, prevLayers) {
        var toRemove;
        var toAdd;
        // Figure out which layers need to be removed (prev - new)
        toRemove = LeafletUtil.mapSubtract(prevLayers, newLayers);
        // Figure out which layers need to be added (new - prev)
        toAdd = LeafletUtil.mapSubtract(newLayers, prevLayers);
        return new LeafletLayersObjectDiff(toRemove, toAdd);
    };
    return LeafletControlLayersUtil;
}());

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

exports.LeafletDirectiveWrapper = LeafletDirectiveWrapper;
exports.LeafletControlLayersUtil = LeafletControlLayersUtil;
exports.LeafletLayersUtil = LeafletLayersUtil;
exports.LeafletTileLayerDefinition = LeafletTileLayerDefinition;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=angular2-leaflet.js.map
