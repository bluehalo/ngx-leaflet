var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { LeafletDirective } from './core/leaflet.directive';
import { LeafletLayerDirective } from './layers/leaflet-layer.directive';
import { LeafletLayersDirective } from './layers/leaflet-layers.directive';
import { LeafletLayersControlDirective } from './layers/control/leaflet-control-layers.directive';
import { LeafletBaseLayersDirective } from './layers/base/leaflet-baselayers.directive';
var LeafletModule = /** @class */ (function () {
    function LeafletModule() {
    }
    LeafletModule_1 = LeafletModule;
    LeafletModule.forRoot = function () {
        return { ngModule: LeafletModule_1, providers: [] };
    };
    var LeafletModule_1;
    LeafletModule = LeafletModule_1 = __decorate([
        NgModule({
            exports: [
                LeafletDirective,
                LeafletLayerDirective,
                LeafletLayersDirective,
                LeafletLayersControlDirective,
                LeafletBaseLayersDirective
            ],
            declarations: [
                LeafletDirective,
                LeafletLayerDirective,
                LeafletLayersDirective,
                LeafletLayersControlDirective,
                LeafletBaseLayersDirective
            ]
        })
    ], LeafletModule);
    return LeafletModule;
}());
export { LeafletModule };
//# sourceMappingURL=leaflet.module.js.map