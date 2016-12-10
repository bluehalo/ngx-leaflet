"use strict";
var core_1 = require('@angular/core');
var L = require('leaflet');
var leaflet_directive_1 = require('../core/leaflet.directive');
var LeafletLayersControlDirective = (function () {
    function LeafletLayersControlDirective(leafletDirective) {
        this.leafletDirective = leafletDirective;
    }
    LeafletLayersControlDirective.prototype.ngOnInit = function () {
        // Set up all the initial settings
        this.initializeLayersControl(this.layersControlConfig, this.layersControlOptions);
    };
    LeafletLayersControlDirective.prototype.ngOnChanges = function (changes) {
        // Set the layers
        if (changes['layersControlCfg']) {
            this.setLayersControlConfig(changes['layersControlCfg'].currentValue, changes['layersControlCfg'].previousValue);
        }
    };
    LeafletLayersControlDirective.prototype.initializeLayersControl = function (controlConfig, controlOptions) {
        var map = this.leafletDirective.getMap();
        var baseLayers = controlConfig.baseLayers || {};
        var overlays = controlConfig.overlays || {};
        if (null != map) {
            this.layersControl = L.control.layers(baseLayers, overlays, controlOptions)
                .addTo(map);
        }
    };
    LeafletLayersControlDirective.prototype.setLayersControlConfig = function (newConfig, prevConfig) {
        var map = this.leafletDirective.getMap();
        if (null != map) {
            var toRemove = void 0;
            var baseLayers = void 0;
            var overlays = void 0;
            // Figure out which layers need to be removed (prev - new)
            toRemove = this.mergeMaps(this.mapSubtract(prevConfig.baseLayers, newConfig.baseLayers), this.mapSubtract(prevConfig.overlays, newConfig.overlays));
            // Figure out which layers need to be added (new - prev)
            baseLayers = this.mapSubtract(newConfig.baseLayers, prevConfig.baseLayers);
            overlays = this.mapSubtract(newConfig.overlays, prevConfig.overlays);
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
        }
    };
    LeafletLayersControlDirective.prototype.mergeMaps = function (aMap, bMap) {
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
    LeafletLayersControlDirective.prototype.mapSubtract = function (aMap, bMap) {
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
    __decorate([
        core_1.Input('leafletLayersControl'), 
        __metadata('design:type', Object)
    ], LeafletLayersControlDirective.prototype, "layersControlConfig", void 0);
    __decorate([
        core_1.Input('leafletLayersControlOptions'), 
        __metadata('design:type', Object)
    ], LeafletLayersControlDirective.prototype, "layersControlOptions", void 0);
    LeafletLayersControlDirective = __decorate([
        core_1.Directive({
            selector: '[leafletLayersControl]'
        }), 
        __metadata('design:paramtypes', [leaflet_directive_1.LeafletDirective])
    ], LeafletLayersControlDirective);
    return LeafletLayersControlDirective;
}());
exports.LeafletLayersControlDirective = LeafletLayersControlDirective;

//# sourceMappingURL=leaflet-control-layers.directive.js.map
