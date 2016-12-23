"use strict";
var core_1 = require('@angular/core');
var L = require('leaflet');
var leaflet_util_1 = require('../../core/leaflet.util');
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
        // Init the map
        this.leafletDirective.init();
        // Initially configure the controlLayers
        this.controlLayers
            .init({ baseLayers: this.baseLayers }, this.layersControlOptions)
            .addTo(this.leafletDirective.getMap());
        // Sync the baselayer (will default to the first layer in the map)
        this.syncBaseLayer();
    };
    LeafletBaseLayersDirective.prototype.ngOnChanges = function (changes) {
        // Set the new baseLayers
        if (changes['baseLayers']) {
            this.setBaseLayers(changes['baseLayers'].currentValue, changes['baseLayers'].previousValue);
        }
    };
    LeafletBaseLayersDirective.prototype.setBaseLayers = function (newBaseLayers, prevBaseLayers) {
        // Update the layers control
        this.controlLayers.setLayersControlConfig(new leaflet_control_layers_config_model_1.LeafletControlLayersConfig(newBaseLayers), new leaflet_control_layers_config_model_1.LeafletControlLayersConfig(prevBaseLayers));
        // Sync the new baseLayer
        this.syncBaseLayer();
    };
    /**
     * Check the current base layer and change it to the new one if necessary
     */
    LeafletBaseLayersDirective.prototype.syncBaseLayer = function () {
        var map = this.leafletDirective.getMap();
        var layers = leaflet_util_1.LeafletUtil.mapToArray(this.baseLayers);
        var foundLayer;
        // Search all the layers in the map to see if we can find them in the baselayer array
        map.eachLayer(function (l) {
            foundLayer = layers.find(function (bl) { return l === bl; });
        });
        // Did we find the layer?
        if (null != foundLayer) {
            // Yes - set the baselayer to the one we found
            this.baseLayer = foundLayer;
        }
        else {
            // No - set the baselayer to the first in the array and add it to the map
            if (layers.length > 0) {
                this.baseLayer = layers[0];
                this.baseLayer.addTo(map);
            }
        }
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
