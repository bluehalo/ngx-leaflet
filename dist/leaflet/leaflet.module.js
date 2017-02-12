import { NgModule } from '@angular/core';
import { LeafletDirective } from './core/leaflet.directive';
import { LeafletLayersDirective } from './layers/leaflet-layers.directive';
import { LeafletLayersControlDirective } from './layers/control/leaflet-control-layers.directive';
import { LeafletBaseLayersDirective } from './layers/base/leaflet-baselayers.directive';
var LeafletModule = (function () {
    function LeafletModule() {
    }
    return LeafletModule;
}());
LeafletModule = __decorate([
    NgModule({
        imports: [],
        exports: [
            LeafletDirective,
            LeafletLayersDirective,
            LeafletLayersControlDirective,
            LeafletBaseLayersDirective
        ],
        declarations: [
            LeafletDirective,
            LeafletLayersDirective,
            LeafletLayersControlDirective,
            LeafletBaseLayersDirective
        ],
        providers: []
    })
], LeafletModule);
export { LeafletModule };

//# sourceMappingURL=leaflet.module.js.map
