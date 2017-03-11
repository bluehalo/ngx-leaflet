import * as L from 'leaflet';
import { LeafletUtil } from '../../core/leaflet.util';
import { LeafletLayersObjectDiff } from './leaflet-layers-object-diff.model';
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
export { LeafletControlLayersWrapper };
//# sourceMappingURL=leaflet-control-layers.wrapper.js.map