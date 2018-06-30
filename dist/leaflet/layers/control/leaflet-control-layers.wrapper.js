import { control } from 'leaflet';
import { LeafletControlLayersChanges } from './leaflet-control-layers-changes.model';
var LeafletControlLayersWrapper = /** @class */ (function () {
    function LeafletControlLayersWrapper(zone, layersControlReady) {
        this.zone = zone;
        this.layersControlReady = layersControlReady;
    }
    LeafletControlLayersWrapper.prototype.getLayersControl = function () {
        return this.layersControl;
    };
    LeafletControlLayersWrapper.prototype.init = function (controlConfig, controlOptions) {
        var _this = this;
        var baseLayers = controlConfig.baseLayers || {};
        var overlays = controlConfig.overlays || {};
        // Create the control outside of angular to ensure events don't trigger change detection
        this.zone.runOutsideAngular(function () {
            _this.layersControl = control.layers(baseLayers, overlays, controlOptions);
        });
        this.layersControlReady.emit(this.layersControl);
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
            // All layer management is outside angular to avoid layer events from triggering change detection
            this.zone.runOutsideAngular(function () {
                changes.forEachChangedItem(function (c) {
                    _this.layersControl.removeLayer(c.previousValue);
                    addFn.call(_this.layersControl, c.currentValue, c.key);
                    results.layersChanged++;
                });
                changes.forEachRemovedItem(function (c) {
                    _this.layersControl.removeLayer(c.previousValue);
                    results.layersRemoved++;
                });
                changes.forEachAddedItem(function (c) {
                    addFn.call(_this.layersControl, c.currentValue, c.key);
                    results.layersAdded++;
                });
            });
        }
        return results;
    };
    return LeafletControlLayersWrapper;
}());
export { LeafletControlLayersWrapper };
//# sourceMappingURL=leaflet-control-layers.wrapper.js.map