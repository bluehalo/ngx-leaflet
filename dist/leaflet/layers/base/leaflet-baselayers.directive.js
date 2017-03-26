import { Directive, Input } from '@angular/core';
import { LeafletUtil } from '../../core/leaflet.util';
import { LeafletDirective } from '../../core/leaflet.directive';
import { LeafletDirectiveWrapper } from '../../core/leaflet.directive.wrapper';
import { LeafletControlLayersWrapper } from '../control/leaflet-control-layers.wrapper';
import { LeafletControlLayersConfig } from '../control/leaflet-control-layers-config.model';
var LeafletBaseLayersDirective = (function () {
    function LeafletBaseLayersDirective(leafletDirective) {
        this.leafletDirective = new LeafletDirectiveWrapper(leafletDirective);
        this.controlLayers = new LeafletControlLayersWrapper();
    }
    LeafletBaseLayersDirective.prototype.ngOnInit = function () {
        // Init the map
        this.leafletDirective.init();
        // Initially configure the controlLayers
        this.controlLayers
            .init({ baseLayers: this.baseLayers }, this.layersControlOptions)
            .addTo(this.leafletDirective.getMap());
        // Sync the baselayer (will default to the first layer in the map)
        this.syncBaseLayer();
    };
    LeafletBaseLayersDirective.prototype.ngOnChanges = function (changes) {
        // Set the new baseLayers
        if (changes['baseLayers']) {
            this.setBaseLayers(changes['baseLayers'].currentValue, changes['baseLayers'].previousValue);
        }
    };
    LeafletBaseLayersDirective.prototype.setBaseLayers = function (newBaseLayers, prevBaseLayers) {
        // Update the layers control
        this.controlLayers.setLayersControlConfig(new LeafletControlLayersConfig(newBaseLayers), new LeafletControlLayersConfig(prevBaseLayers));
        // Sync the new baseLayer
        this.syncBaseLayer();
    };
    /**
     * Check the current base layer and change it to the new one if necessary
     */
    LeafletBaseLayersDirective.prototype.syncBaseLayer = function () {
        var map = this.leafletDirective.getMap();
        var layers = LeafletUtil.mapToArray(this.baseLayers);
        var foundLayer;
        // Search all the layers in the map to see if we can find them in the baselayer array
        map.eachLayer(function (l) {
            foundLayer = layers.find(function (bl) { return l === bl; });
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
                this.baseLayer.addTo(map);
            }
        }
    };
    return LeafletBaseLayersDirective;
}());
export { LeafletBaseLayersDirective };
LeafletBaseLayersDirective.decorators = [
    { type: Directive, args: [{
                selector: '[leafletBaseLayers]'
            },] },
];
/** @nocollapse */
LeafletBaseLayersDirective.ctorParameters = function () { return [
    { type: LeafletDirective, },
]; };
LeafletBaseLayersDirective.propDecorators = {
    'baseLayers': [{ type: Input, args: ['leafletBaseLayers',] },],
    'layersControlOptions': [{ type: Input, args: ['leafletLayersControlOptions',] },],
};
//# sourceMappingURL=leaflet-baselayers.directive.js.map