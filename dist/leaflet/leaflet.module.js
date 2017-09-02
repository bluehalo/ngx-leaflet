import { NgModule } from '@angular/core';
import { LeafletDirective } from './core/leaflet.directive';
import { LeafletLayersDirective } from './layers/leaflet-layers.directive';
import { LeafletLayersControlDirective } from './layers/control/leaflet-control-layers.directive';
import { LeafletBaseLayersDirective } from './layers/base/leaflet-baselayers.directive';
var LeafletModule = /** @class */ (function () {
    function LeafletModule() {
    }
    LeafletModule.forRoot = function () {
        return { ngModule: LeafletModule, providers: [] };
    };
    LeafletModule.decorators = [
        { type: NgModule, args: [{
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
                    ]
                },] },
    ];
    /** @nocollapse */
    LeafletModule.ctorParameters = function () { return []; };
    return LeafletModule;
}());
export { LeafletModule };
//# sourceMappingURL=leaflet.module.js.map