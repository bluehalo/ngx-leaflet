var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Directive, EventEmitter, Input, NgZone, Output } from '@angular/core';
import { Layer } from 'leaflet';
import { LeafletDirective } from '../core/leaflet.directive';
import { LeafletDirectiveWrapper } from '../core/leaflet.directive.wrapper';
import { LeafletUtil } from '../core/leaflet.util';
/**
 * Layer directive
 *
 * This directive is used to directly control a single map layer. The purpose of this directive is to
 * be used as part of a child structural directive of the map element.
 *
 */
var LeafletLayerDirective = /** @class */ (function () {
    function LeafletLayerDirective(leafletDirective, zone) {
        this.zone = zone;
        // Layer Events
        this.onAdd = new EventEmitter();
        this.onRemove = new EventEmitter();
        this.leafletDirective = new LeafletDirectiveWrapper(leafletDirective);
    }
    LeafletLayerDirective.prototype.ngOnInit = function () {
        // Init the map
        this.leafletDirective.init();
    };
    LeafletLayerDirective.prototype.ngOnDestroy = function () {
        this.layer.remove();
    };
    LeafletLayerDirective.prototype.ngOnChanges = function (changes) {
        var _this = this;
        if (changes['layer']) {
            // Update the layer
            var p_1 = changes['layer'].previousValue;
            var n_1 = changes['layer'].currentValue;
            this.zone.runOutsideAngular(function () {
                if (null != p_1) {
                    p_1.remove();
                }
                if (null != n_1) {
                    _this.addLayerEventListeners(n_1);
                    _this.leafletDirective.getMap().addLayer(n_1);
                }
            });
        }
    };
    LeafletLayerDirective.prototype.addLayerEventListeners = function (l) {
        var _this = this;
        l.on('add', function (e) { return LeafletUtil.handleEvent(_this.zone, _this.onAdd, e); });
        l.on('remove', function (e) { return LeafletUtil.handleEvent(_this.zone, _this.onRemove, e); });
    };
    __decorate([
        Input('leafletLayer'),
        __metadata("design:type", Layer)
    ], LeafletLayerDirective.prototype, "layer", void 0);
    __decorate([
        Output('leafletLayerAdd'),
        __metadata("design:type", Object)
    ], LeafletLayerDirective.prototype, "onAdd", void 0);
    __decorate([
        Output('leafletLayerRemove'),
        __metadata("design:type", Object)
    ], LeafletLayerDirective.prototype, "onRemove", void 0);
    LeafletLayerDirective = __decorate([
        Directive({
            selector: '[leafletLayer]'
        }),
        __metadata("design:paramtypes", [LeafletDirective, NgZone])
    ], LeafletLayerDirective);
    return LeafletLayerDirective;
}());
export { LeafletLayerDirective };
//# sourceMappingURL=leaflet-layer.directive.js.map