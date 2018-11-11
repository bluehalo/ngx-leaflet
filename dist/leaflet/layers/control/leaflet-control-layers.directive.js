var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Directive, EventEmitter, Input, KeyValueDiffers, NgZone, Output } from '@angular/core';
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
        this.layersControlReady = new EventEmitter();
        this.leafletDirective = new LeafletDirectiveWrapper(leafletDirective);
        this.controlLayers = new LeafletControlLayersWrapper(this.zone, this.layersControlReady);
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
        // Set up control outside of angular to avoid change detection when using the control
        this.zone.runOutsideAngular(function () {
            // Set up all the initial settings
            _this.controlLayers
                .init({}, _this.layersControlOptions)
                .addTo(_this.leafletDirective.getMap());
        });
        this.updateLayers();
    };
    LeafletLayersControlDirective.prototype.ngOnDestroy = function () {
        this.layersControlConfig = { baseLayers: {}, overlays: {} };
        this.controlLayers.getLayersControl().remove();
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
    __decorate([
        Input('leafletLayersControl'),
        __metadata("design:type", LeafletControlLayersConfig),
        __metadata("design:paramtypes", [LeafletControlLayersConfig])
    ], LeafletLayersControlDirective.prototype, "layersControlConfig", null);
    __decorate([
        Input('leafletLayersControlOptions'),
        __metadata("design:type", Object)
    ], LeafletLayersControlDirective.prototype, "layersControlOptions", void 0);
    __decorate([
        Output('leafletLayersControlReady'),
        __metadata("design:type", Object)
    ], LeafletLayersControlDirective.prototype, "layersControlReady", void 0);
    LeafletLayersControlDirective = __decorate([
        Directive({
            selector: '[leafletLayersControl]'
        }),
        __metadata("design:paramtypes", [LeafletDirective, KeyValueDiffers, NgZone])
    ], LeafletLayersControlDirective);
    return LeafletLayersControlDirective;
}());
export { LeafletLayersControlDirective };
//# sourceMappingURL=leaflet-control-layers.directive.js.map