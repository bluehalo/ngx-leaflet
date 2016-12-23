"use strict";
var leaflet_util_1 = require('../../core/leaflet.util');
var leaflet_layers_object_diff_model_1 = require('../control/leaflet-layers-object-diff.model');
var LeafletControlLayersUtil = (function () {
    function LeafletControlLayersUtil() {
    }
    LeafletControlLayersUtil.prototype.diffLayers = function (newLayers, prevLayers) {
        var toRemove;
        var toAdd;
        // Figure out which layers need to be removed (prev - new)
        toRemove = leaflet_util_1.LeafletUtil.mapSubtract(prevLayers, newLayers);
        // Figure out which layers need to be added (new - prev)
        toAdd = leaflet_util_1.LeafletUtil.mapSubtract(newLayers, prevLayers);
        return new leaflet_layers_object_diff_model_1.LeafletLayersObjectDiff(toRemove, toAdd);
    };
    return LeafletControlLayersUtil;
}());
exports.LeafletControlLayersUtil = LeafletControlLayersUtil;

//# sourceMappingURL=leaflet-control-layers.util.js.map
