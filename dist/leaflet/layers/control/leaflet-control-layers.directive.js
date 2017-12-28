import { Directive, DoCheck, Input, KeyValueDiffer, KeyValueDiffers, NgZone, OnDestroy, OnInit } from '@angular/core';
import { Layer } from 'leaflet';
import { LeafletDirective } from '../../core/leaflet.directive';
import { LeafletDirectiveWrapper } from '../../core/leaflet.directive.wrapper';
import { LeafletControlLayersWrapper } from './leaflet-control-layers.wrapper';
import { LeafletControlLayersConfig } from './leaflet-control-layers-config.model';
/**
 * Layers Control
 *
 * This directive is used to configure the layers control. The input accepts an object with two
 * key-value maps of layer name -> layer. Mutable changes are detected. On changes, a differ is
 * used to determine what changed so that layers are appropriately added or removed.
 *
 * To specify which layer to show as the 'active' baselayer, you will want to add it to the map
 * using the layers directive. Otherwise, the last one it sees will be used.
 */
var LeafletLayersControlDirective = /** @class */ (function () {
    function LeafletLayersControlDirective(leafletDirective, differs, zone) {
        this.differs = differs;
        this.zone = zone;
        this.leafletDirective = new LeafletDirectiveWrapper(leafletDirective);
        this.controlLayers = new LeafletControlLayersWrapper(zone);
        // Generate differs
        this.baseLayersDiffer = this.differs.find({}).create();
        this.overlaysDiffer = this.differs.find({}).create();
    }
    Object.defineProperty(LeafletLayersControlDirective.prototype, "layersControlConfig", {
        get: function () {
            return this.layersControlConfigValue;
        },
        set: function (v) {
            // Validation/init stuff
            if (null == v) {
                v = new LeafletControlLayersConfig();
            }
            if (null == v.baseLayers) {
                v.baseLayers = {};
            }
            if (null == v.overlays) {
                v.overlays = {};
            }
            // Store the value
            this.layersControlConfigValue = v;
            // Update the map
            this.updateLayers();
        },
        enumerable: true,
        configurable: true
    });
    LeafletLayersControlDirective.prototype.ngOnInit = function () {
        var _this = this;
        // Init the map
        this.leafletDirective.init();
        // Set up all the initial settings
        this.zone.runOutsideAngular(function () {
            _this.controlLayers
                .init({}, _this.layersControlOptions)
                .addTo(_this.leafletDirective.getMap());
        });
        this.updateLayers();
    };
    LeafletLayersControlDirective.prototype.ngOnDestroy = function () {
        var _this = this;
        this.layersControlConfig = { baseLayers: {}, overlays: {} };
        this.zone.runOutsideAngular(function () {
            _this.controlLayers.getLayersControl().remove();
        });
    };
    LeafletLayersControlDirective.prototype.ngDoCheck = function () {
        this.updateLayers();
    };
    LeafletLayersControlDirective.prototype.updateLayers = function () {
        var map = this.leafletDirective.getMap();
        var layersControl = this.controlLayers.getLayersControl();
        if (null != map && null != layersControl) {
            // Run the baselayers differ
            if (null != this.baseLayersDiffer && null != this.layersControlConfigValue.baseLayers) {
                var changes = this.baseLayersDiffer.diff(this.layersControlConfigValue.baseLayers);
                this.controlLayers.applyBaseLayerChanges(changes);
            }
            // Run the overlays differ
            if (null != this.overlaysDiffer && null != this.layersControlConfigValue.overlays) {
                var changes = this.overlaysDiffer.diff(this.layersControlConfigValue.overlays);
                this.controlLayers.applyOverlayChanges(changes);
            }
        }
    };
    LeafletLayersControlDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[leafletLayersControl]'
                },] },
    ];
    /** @nocollapse */
    LeafletLayersControlDirective.ctorParameters = function () { return [
        { type: LeafletDirective, },
        { type: KeyValueDiffers, },
        { type: NgZone, },
    ]; };
    LeafletLayersControlDirective.propDecorators = {
        "layersControlConfig": [{ type: Input, args: ['leafletLayersControl',] },],
        "layersControlOptions": [{ type: Input, args: ['leafletLayersControlOptions',] },],
    };
    return LeafletLayersControlDirective;
}());
export { LeafletLayersControlDirective };
//# sourceMappingURL=leaflet-control-layers.directive.js.map