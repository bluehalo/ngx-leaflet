import { Directive, Input, IterableDiffers } from '@angular/core';
import { LeafletDirective } from '../core/leaflet.directive';
import { LeafletDirectiveWrapper } from '../core/leaflet.directive.wrapper';
/**
 * Layers directive
 *
 * This directive is used to directly control map layers. As changed are made to the input array of
 * layers, the map is synched to the array. As layers are added or removed from the input array, they
 * are also added or removed from the map. The input array is treated as immutable. To detect changes,
 * you must change the array instance.
 *
 * Important Note: The input layers array is assumed to be immutable. This means you need to use an
 * immutable array implementation or create a new copy of your array when you make changes, otherwise
 * this directive won't detect the change. This is by design. It's for performance reasons. Change
 * detection of mutable arrays requires diffing the state of the array on every DoCheck cycle, which
 * is extremely expensive from a time complexity perspective.
 *
 */
var LeafletLayersDirective = (function () {
    function LeafletLayersDirective(leafletDirective, differs) {
        this.differs = differs;
        this.leafletDirective = new LeafletDirectiveWrapper(leafletDirective);
        this.layersDiffer = this.differs.find([]).create();
    }
    Object.defineProperty(LeafletLayersDirective.prototype, "layers", {
        get: function () {
            return this.layersValue;
        },
        // Set/get the layers
        set: function (v) {
            this.layersValue = v;
            // Now that we have a differ, do an immediate layer update
            this.updateLayers();
        },
        enumerable: true,
        configurable: true
    });
    LeafletLayersDirective.prototype.ngDoCheck = function () {
        this.updateLayers();
    };
    LeafletLayersDirective.prototype.ngOnInit = function () {
        // Init the map
        this.leafletDirective.init();
        // Update layers once the map is ready
        this.updateLayers();
    };
    /**
     * Update the state of the layers.
     * We use an iterable differ to synchronize the map layers with the state of the bound layers array.
     * This is important because it allows us to react to changes to the contents of the array as well
     * as changes to the actual array instance.
     */
    LeafletLayersDirective.prototype.updateLayers = function () {
        var map = this.leafletDirective.getMap();
        if (null != map && null != this.layersDiffer) {
            var changes = this.layersDiffer.diff(this.layersValue);
            if (null != changes) {
                changes.forEachRemovedItem(function (c) {
                    map.removeLayer(c.item);
                });
                changes.forEachAddedItem(function (c) {
                    map.addLayer(c.item);
                });
            }
        }
    };
    return LeafletLayersDirective;
}());
export { LeafletLayersDirective };
LeafletLayersDirective.decorators = [
    { type: Directive, args: [{
                selector: '[leafletLayers]'
            },] },
];
/** @nocollapse */
LeafletLayersDirective.ctorParameters = function () { return [
    { type: LeafletDirective, },
    { type: IterableDiffers, },
]; };
LeafletLayersDirective.propDecorators = {
    'layers': [{ type: Input, args: ['leafletLayers',] },],
};
//# sourceMappingURL=leaflet-layers.directive.js.map