import { Directive, Input } from '@angular/core';
import { LeafletDirective } from '../core/leaflet.directive';
import { LeafletDirectiveWrapper } from '../core/leaflet.directive.wrapper';
import { LeafletLayersUtil } from './leaflet-layers.util';
var LeafletLayersDirective = (function () {
    function LeafletLayersDirective(leafletDirective) {
        this.leafletDirective = new LeafletDirectiveWrapper(leafletDirective);
    }
    LeafletLayersDirective.prototype.ngOnInit = function () {
        // Init the map
        this.leafletDirective.init();
        // The way we've set this up, map isn't set until after the first round of changes has gone through
        this.setLayers(this.layers, []);
    };
    LeafletLayersDirective.prototype.ngOnChanges = function (changes) {
        // Set the layers
        if (changes['layers']) {
            var c = changes['layers'].currentValue;
            var p = (changes['layers'].isFirstChange()) ? [] : changes['layers'].previousValue;
            this.setLayers(c, p);
        }
    };
    /**
     * Replace the current layers in the map with the provided array
     * @param layers The new complete array of layers for the map
     */
    LeafletLayersDirective.prototype.setLayers = function (newLayers, prevLayers) {
        var map = this.leafletDirective.getMap();
        if (null != map) {
            var diff = LeafletLayersUtil.diffLayers(newLayers, prevLayers);
            // Remove the layers
            diff.remove.forEach(function (l) { map.removeLayer(l); });
            // Add the new layers
            diff.add.forEach(function (l) { map.addLayer(l); });
        }
    };
    return LeafletLayersDirective;
}());
__decorate([
    Input('leafletLayers'),
    __metadata("design:type", Array)
], LeafletLayersDirective.prototype, "layers", void 0);
LeafletLayersDirective = __decorate([
    Directive({
        selector: '[leafletLayers]'
    }),
    __metadata("design:paramtypes", [LeafletDirective])
], LeafletLayersDirective);
export { LeafletLayersDirective };

//# sourceMappingURL=leaflet-layers.directive.js.map
