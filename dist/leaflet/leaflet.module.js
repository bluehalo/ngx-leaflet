"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var leaflet_directive_1 = require("./core/leaflet.directive");
var leaflet_layers_directive_1 = require("./layers/leaflet-layers.directive");
var leaflet_control_layers_directive_1 = require("./layers/control/leaflet-control-layers.directive");
var leaflet_baselayers_directive_1 = require("./layers/base/leaflet-baselayers.directive");
var LeafletModule = (function () {
    function LeafletModule() {
    }
    return LeafletModule;
}());
LeafletModule = __decorate([
    core_1.NgModule({
        imports: [],
        exports: [
            leaflet_directive_1.LeafletDirective,
            leaflet_layers_directive_1.LeafletLayersDirective,
            leaflet_control_layers_directive_1.LeafletLayersControlDirective,
            leaflet_baselayers_directive_1.LeafletBaseLayersDirective
        ],
        declarations: [
            leaflet_directive_1.LeafletDirective,
            leaflet_layers_directive_1.LeafletLayersDirective,
            leaflet_control_layers_directive_1.LeafletLayersControlDirective,
            leaflet_baselayers_directive_1.LeafletBaseLayersDirective
        ],
        providers: []
    })
], LeafletModule);
exports.LeafletModule = LeafletModule;

//# sourceMappingURL=leaflet.module.js.map
