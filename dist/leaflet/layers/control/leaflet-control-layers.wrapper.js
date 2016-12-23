"use strict";
var L = require('leaflet');
var leaflet_util_1 = require('../../core/leaflet.util');
var leaflet_layers_object_diff_model_1 = require('./leaflet-layers-object-diff.model');
var LeafletControlLayersWrapper = (function () {
    function LeafletControlLayersWrapper() {
    }
    LeafletControlLayersWrapper.prototype.getLayersControl = function () {
        return this.layersControl;
    };
    LeafletControlLayersWrapper.prototype.init = function (controlConfig, controlOptions) {
        var baseLayers = controlConfig.baseLayers || {};
        var overlays = controlConfig.overlays || {};
        this.layersControl = L.control.layers(baseLayers, overlays, controlOptions);
        return this.layersControl;
    };
    LeafletControlLayersWrapper.prototype.setLayersControlConfig = function (newConfig, prevConfig) {
        if (null == this.layersControl) {
            return new leaflet_layers_object_diff_model_1.LeafletLayersObjectDiff({}, {});
        }
        var toRemove;
        var baseLayers;
        var overlays;
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
        return new leaflet_layers_object_diff_model_1.LeafletLayersObjectDiff(toRemove, leaflet_util_1.LeafletUtil.mergeMaps(baseLayers, overlays));
    };
    return LeafletControlLayersWrapper;
}());
exports.LeafletControlLayersWrapper = LeafletControlLayersWrapper;

//# sourceMappingURL=leaflet-control-layers.wrapper.js.map
