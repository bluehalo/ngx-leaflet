import { Directive, Input, NgZone, OnChanges, OnDestroy, OnInit, SimpleChange } from '@angular/core';
import { Layer } from 'leaflet';
import { LeafletDirective } from '../core/leaflet.directive';
import { LeafletDirectiveWrapper } from '../core/leaflet.directive.wrapper';
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
        this.leafletDirective = new LeafletDirectiveWrapper(leafletDirective);
    }
    LeafletLayerDirective.prototype.ngOnInit = function () {
        // Init the map
        this.leafletDirective.init();
    };
    LeafletLayerDirective.prototype.ngOnDestroy = function () {
        var _this = this;
        this.zone.runOutsideAngular(function () {
            _this.layer.remove();
        });
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
                    _this.leafletDirective.getMap().addLayer(n_1);
                }
            });
        }
    };
    LeafletLayerDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[leafletLayer]'
                },] },
    ];
    /** @nocollapse */
    LeafletLayerDirective.ctorParameters = function () { return [
        { type: LeafletDirective, },
        { type: NgZone, },
    ]; };
    LeafletLayerDirective.propDecorators = {
        "layer": [{ type: Input, args: ['leafletLayer',] },],
    };
    return LeafletLayerDirective;
}());
export { LeafletLayerDirective };
//# sourceMappingURL=leaflet-layer.directive.js.map