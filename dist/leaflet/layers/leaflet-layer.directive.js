import { Directive, Input } from '@angular/core';
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
    function LeafletLayerDirective(leafletDirective) {
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
        if (changes['layer']) {
            // Update the layer
            var p = changes['layer'].previousValue;
            var n = changes['layer'].currentValue;
            if (null != p) {
                p.remove();
            }
            if (null != n) {
                this.leafletDirective.getMap().addLayer(n);
            }
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
    ]; };
    LeafletLayerDirective.propDecorators = {
        'layer': [{ type: Input, args: ['leafletLayer',] },],
    };
    return LeafletLayerDirective;
}());
export { LeafletLayerDirective };
//# sourceMappingURL=leaflet-layer.directive.js.map