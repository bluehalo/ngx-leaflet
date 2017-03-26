import { Directive, Input } from '@angular/core';
import { LeafletDirective } from '../../core/leaflet.directive';
import { LeafletDirectiveWrapper } from '../../core/leaflet.directive.wrapper';
import { LeafletControlLayersWrapper } from './leaflet-control-layers.wrapper';
var LeafletLayersControlDirective = (function () {
    function LeafletLayersControlDirective(leafletDirective) {
        this.leafletDirective = new LeafletDirectiveWrapper(leafletDirective);
        this.controlLayers = new LeafletControlLayersWrapper();
    }
    LeafletLayersControlDirective.prototype.ngOnInit = function () {
        // Init the map
        this.leafletDirective.init();
        // Set up all the initial settings
        this.controlLayers
            .init(this.layersControlConfig, this.layersControlOptions)
            .addTo(this.leafletDirective.getMap());
    };
    LeafletLayersControlDirective.prototype.ngOnChanges = function (changes) {
        // Set the layers
        if (changes['layersControlCfg']) {
            this.controlLayers.setLayersControlConfig(changes['layersControlCfg'].currentValue, changes['layersControlCfg'].previousValue);
        }
    };
    return LeafletLayersControlDirective;
}());
export { LeafletLayersControlDirective };
LeafletLayersControlDirective.decorators = [
    { type: Directive, args: [{
                selector: '[leafletLayersControl]'
            },] },
];
/** @nocollapse */
LeafletLayersControlDirective.ctorParameters = function () { return [
    { type: LeafletDirective, },
]; };
LeafletLayersControlDirective.propDecorators = {
    'layersControlConfig': [{ type: Input, args: ['leafletLayersControl',] },],
    'layersControlOptions': [{ type: Input, args: ['leafletLayersControlOptions',] },],
};
//# sourceMappingURL=leaflet-control-layers.directive.js.map