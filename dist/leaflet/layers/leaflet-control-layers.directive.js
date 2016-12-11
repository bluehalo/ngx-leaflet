"use strict";
var core_1 = require('@angular/core');
var L = require('leaflet');
var leaflet_directive_1 = require('../core/leaflet.directive');
var leaflet_util_1 = require('../util/leaflet-util');
var LeafletLayersControlDirective = (function () {
    function LeafletLayersControlDirective(leafletDirective) {
        this.leafletDirective = leafletDirective;
    }
    LeafletLayersControlDirective.prototype.ngOnInit = function () {
        // Get the map
        this.map = this.leafletDirective.getMap();
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
        var map = this.map;
        var baseLayers = controlConfig.baseLayers || {};
        var overlays = controlConfig.overlays || {};
        if (null != map) {
            this.layersControl = L.control.layers(baseLayers, overlays, controlOptions)
                .addTo(map);
        }
    };
    LeafletLayersControlDirective.prototype.setLayersControlConfig = function (newConfig, prevConfig) {
        var map = this.map;
        if (null != map) {
            var toRemove = void 0;
            var baseLayers = void 0;
            var overlays = void 0;
            // Figure out which layers need to be removed (prev - new)
            toRemove = leaflet_util_1.LeafletUtil.mergeMaps(leaflet_util_1.LeafletUtil.mapSubtract(prevConfig.baseLayers, newConfig.baseLayers), leaflet_util_1.LeafletUtil.mapSubtract(prevConfig.overlays, newConfig.overlays));
            // Figure out which layers need to be added (new - prev)
            baseLayers = leaflet_util_1.LeafletUtil.mapSubtract(newConfig.baseLayers, prevConfig.baseLayers);
            overlays = leaflet_util_1.LeafletUtil.mapSubtract(newConfig.overlays, prevConfig.overlays);
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
