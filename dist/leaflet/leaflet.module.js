"use strict";
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
