import { LeafletUtil } from '../../core/leaflet.util';
import { LeafletLayersObjectDiff } from '../control/leaflet-layers-object-diff.model';
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
export { LeafletControlLayersUtil };
//# sourceMappingURL=leaflet-control-layers.util.js.map