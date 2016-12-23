"use strict";
var core_1 = require('@angular/core');
var leaflet_directive_1 = require('../../core/leaflet.directive');
var leaflet_directive_wrapper_1 = require('../../core/leaflet.directive.wrapper');
var leaflet_control_layers_wrapper_1 = require('../control/leaflet-control-layers.wrapper');
var leaflet_control_layers_config_model_1 = require('../control/leaflet-control-layers-config.model');
var LeafletBaseLayersDirective = (function () {
    function LeafletBaseLayersDirective(leafletDirective) {
        this.leafletDirective = new leaflet_directive_wrapper_1.LeafletDirectiveWrapper(leafletDirective);
        this.controlLayers = new leaflet_control_layers_wrapper_1.LeafletControlLayersWrapper();
    }
    LeafletBaseLayersDirective.prototype.ngOnInit = function () {
        this.leafletDirective.init();
        // Set up all the initial settings
        this.initializeBaseLayers(this.baseLayers, this.layersControlOptions);
    };
    LeafletBaseLayersDirective.prototype.ngOnChanges = function (changes) {
        // Set the new baseLayers
        if (changes['baseLayers']) {
            this.setBaseLayers(changes['baseLayers'].currentValue, changes['baseLayers'].previousValue);
        }
    };
    LeafletBaseLayersDirective.prototype.initializeBaseLayers = function (baseLayers, controlOptions) {
        this.controlLayers.init({ baseLayers: baseLayers }, controlOptions);
    };
    LeafletBaseLayersDirective.prototype.setBaseLayers = function (newBaseLayers, prevBaseLayers) {
        this.controlLayers.setLayersControlConfig(new leaflet_control_layers_config_model_1.LeafletControlLayersConfig(newBaseLayers), new leaflet_control_layers_config_model_1.LeafletControlLayersConfig(prevBaseLayers));
    };
    __decorate([
        core_1.Input('leafletBaseLayers'), 
        __metadata('design:type', Object)
    ], LeafletBaseLayersDirective.prototype, "baseLayers", void 0);
    __decorate([
        core_1.Input('leafletLayersControlOptions'), 
        __metadata('design:type', Object)
    ], LeafletBaseLayersDirective.prototype, "layersControlOptions", void 0);
    LeafletBaseLayersDirective = __decorate([
        core_1.Directive({
            selector: '[leafletBaseLayers]'
        }), 
        __metadata('design:paramtypes', [leaflet_directive_1.LeafletDirective])
    ], LeafletBaseLayersDirective);
    return LeafletBaseLayersDirective;
}());
exports.LeafletBaseLayersDirective = LeafletBaseLayersDirective;

//# sourceMappingURL=leaflet-baselayers.directive.js.map
