import { LeafletLayerDiff } from './leaflet-layer-diff.model';
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
export { LeafletLayersUtil };
//# sourceMappingURL=leaflet-layers.util.js.map