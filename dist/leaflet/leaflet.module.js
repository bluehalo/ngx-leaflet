var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { LeafletDirective } from './core/leaflet.directive';
import { LeafletLayersDirective } from './layers/leaflet-layers.directive';
import { LeafletLayersControlDirective } from './layers/control/leaflet-control-layers.directive';
import { LeafletBaseLayersDirective } from './layers/base/leaflet-baselayers.directive';
var LeafletModule = LeafletModule_1 = (function () {
    function LeafletModule() {
    }
    LeafletModule.forRoot = function () {
        return { ngModule: LeafletModule_1, providers: [] };
    };
    return LeafletModule;
}());
LeafletModule = LeafletModule_1 = __decorate([
    NgModule({
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
    })
], LeafletModule);
export { LeafletModule };
var LeafletModule_1;
//# sourceMappingURL=leaflet.module.js.map