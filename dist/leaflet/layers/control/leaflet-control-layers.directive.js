"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var leaflet_directive_1 = require("../../core/leaflet.directive");
var leaflet_directive_wrapper_1 = require("../../core/leaflet.directive.wrapper");
var leaflet_control_layers_wrapper_1 = require("./leaflet-control-layers.wrapper");
var LeafletLayersControlDirective = (function () {
    function LeafletLayersControlDirective(leafletDirective) {
        this.leafletDirective = new leaflet_directive_wrapper_1.LeafletDirectiveWrapper(leafletDirective);
        this.controlLayers = new leaflet_control_layers_wrapper_1.LeafletControlLayersWrapper();
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
    core_1.Input('leafletLayersControl'),
    __metadata("design:type", Object)
], LeafletLayersControlDirective.prototype, "layersControlConfig", void 0);
__decorate([
    core_1.Input('leafletLayersControlOptions'),
    __metadata("design:type", Object)
], LeafletLayersControlDirective.prototype, "layersControlOptions", void 0);
LeafletLayersControlDirective = __decorate([
    core_1.Directive({
        selector: '[leafletLayersControl]'
    }),
    __metadata("design:paramtypes", [leaflet_directive_1.LeafletDirective])
], LeafletLayersControlDirective);
exports.LeafletLayersControlDirective = LeafletLayersControlDirective;

//# sourceMappingURL=leaflet-control-layers.directive.js.map
