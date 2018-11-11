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
import { Control } from 'leaflet';
import { LeafletUtil } from '../../core/leaflet.util';
import { LeafletDirective } from '../../core/leaflet.directive';
import { LeafletDirectiveWrapper } from '../../core/leaflet.directive.wrapper';
import { LeafletControlLayersWrapper } from '../control/leaflet-control-layers.wrapper';
/**
 * Baselayers directive
 *
 * This directive is provided as a convenient way to add baselayers to the map. The input accepts
 * a key-value map of layer name -> layer. Mutable changed are detected. On changes, a differ is
 * used to determine what changed so that layers are appropriately added or removed. This directive
 * will also add the layers control so users can switch between available base layers.
 *
 * To specify which layer to show as the 'active' baselayer, you will want to add it to the map
 * using the layers directive. Otherwise, the plugin will use the last one it sees.
 */
var LeafletBaseLayersDirective = /** @class */ (function () {
    function LeafletBaseLayersDirective(leafletDirective, differs, zone) {
        this.differs = differs;
        this.zone = zone;
        // Output for once the layers control is ready
        this.layersControlReady = new EventEmitter();
        this.leafletDirective = new LeafletDirectiveWrapper(leafletDirective);
        this.controlLayers = new LeafletControlLayersWrapper(this.zone, this.layersControlReady);
        this.baseLayersDiffer = this.differs.find({}).create();
    }
    Object.defineProperty(LeafletBaseLayersDirective.prototype, "baseLayers", {
        get: function () {
            return this.baseLayersValue;
        },
        // Set/get baseLayers
        set: function (v) {
            this.baseLayersValue = v;
            this.updateBaseLayers();
        },
        enumerable: true,
        configurable: true
    });
    LeafletBaseLayersDirective.prototype.ngOnDestroy = function () {
        this.baseLayers = {};
        this.controlLayers.getLayersControl().remove();
    };
    LeafletBaseLayersDirective.prototype.ngOnInit = function () {
        var _this = this;
        // Init the map
        this.leafletDirective.init();
        // Create the control outside angular to prevent events from triggering chnage detection
        this.zone.runOutsideAngular(function () {
            // Initially configure the controlLayers
            _this.controlLayers
                .init({}, _this.layersControlOptions)
                .addTo(_this.leafletDirective.getMap());
        });
        this.updateBaseLayers();
    };
    LeafletBaseLayersDirective.prototype.ngDoCheck = function () {
        this.updateBaseLayers();
    };
    LeafletBaseLayersDirective.prototype.updateBaseLayers = function () {
        var map = this.leafletDirective.getMap();
        var layersControl = this.controlLayers.getLayersControl();
        if (null != map && null != layersControl && null != this.baseLayersDiffer) {
            var changes = this.baseLayersDiffer.diff(this.baseLayersValue);
            var results = this.controlLayers.applyBaseLayerChanges(changes);
            if (results.changed()) {
                this.syncBaseLayer();
            }
        }
    };
    /**
     * Check the current base layer and change it to the new one if necessary
     */
    LeafletBaseLayersDirective.prototype.syncBaseLayer = function () {
        var _this = this;
        var map = this.leafletDirective.getMap();
        var layers = LeafletUtil.mapToArray(this.baseLayers);
        var foundLayer;
        // Search all the layers in the map to see if we can find them in the baselayer array
        map.eachLayer(function (l) {
            foundLayer = layers.find(function (bl) { return (l === bl); });
        });
        // Did we find the layer?
        if (null != foundLayer) {
            // Yes - set the baselayer to the one we found
            this.baseLayer = foundLayer;
        }
        else {
            // No - set the baselayer to the first in the array and add it to the map
            if (layers.length > 0) {
                this.baseLayer = layers[0];
                // Add layers outside of angular to prevent events from triggering change detection
                this.zone.runOutsideAngular(function () {
                    _this.baseLayer.addTo(map);
                });
            }
        }
    };
    __decorate([
        Input('leafletBaseLayers'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], LeafletBaseLayersDirective.prototype, "baseLayers", null);
    __decorate([
        Input('leafletLayersControlOptions'),
        __metadata("design:type", Object)
    ], LeafletBaseLayersDirective.prototype, "layersControlOptions", void 0);
    __decorate([
        Output('leafletLayersControlReady'),
        __metadata("design:type", Object)
    ], LeafletBaseLayersDirective.prototype, "layersControlReady", void 0);
    LeafletBaseLayersDirective = __decorate([
        Directive({
            selector: '[leafletBaseLayers]'
        }),
        __metadata("design:paramtypes", [LeafletDirective, KeyValueDiffers, NgZone])
    ], LeafletBaseLayersDirective);
    return LeafletBaseLayersDirective;
}());
export { LeafletBaseLayersDirective };
//# sourceMappingURL=leaflet-baselayers.directive.js.map