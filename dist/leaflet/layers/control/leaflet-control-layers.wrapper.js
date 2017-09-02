import * as L from 'leaflet';
import { LeafletControlLayersChanges } from './leaflet-control-layers-changes.model';
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
export { LeafletControlLayersWrapper };
//# sourceMappingURL=leaflet-control-layers.wrapper.js.map