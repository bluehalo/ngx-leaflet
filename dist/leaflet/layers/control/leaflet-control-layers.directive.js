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
__decorate([
    Input('leafletLayersControl'),
    __metadata("design:type", Object)
], LeafletLayersControlDirective.prototype, "layersControlConfig", void 0);
__decorate([
    Input('leafletLayersControlOptions'),
    __metadata("design:type", Object)
], LeafletLayersControlDirective.prototype, "layersControlOptions", void 0);
LeafletLayersControlDirective = __decorate([
    Directive({
        selector: '[leafletLayersControl]'
    }),
    __metadata("design:paramtypes", [LeafletDirective])
], LeafletLayersControlDirective);
export { LeafletLayersControlDirective };

//# sourceMappingURL=leaflet-control-layers.directive.js.map
