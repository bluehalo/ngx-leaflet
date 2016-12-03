"use strict";
var core_1 = require('@angular/core');
var leaflet_directive_1 = require('../core/leaflet.directive');
var LeafletLayersDirective = (function () {
    function LeafletLayersDirective(leafletDirective) {
        this.leafletDirective = leafletDirective;
    }
    LeafletLayersDirective.prototype.ngOnInit = function () {
        // Set up all the initial settings
        this.setLayers(this.layers);
    };
    LeafletLayersDirective.prototype.ngOnChanges = function (changes) {
        // Set the layers
        if (changes['layers']) {
            this.setLayers(changes['layers'].currentValue);
        }
    };
    /**
     * Replace the current layers in the map with the provided array
     * @param layers The new complete array of layers for the map
     */
    LeafletLayersDirective.prototype.setLayers = function (layers) {
        var map = this.leafletDirective.getMap();
        if (null != map) {
            // Remove all existing layers
            map.eachLayer(function (layer) {
                map.removeLayer(layer);
            });
            // Add the new layers
            if (null != layers) {
                layers.forEach(function (layer) {
                    map.addLayer(layer);
                });
            }
        }
    };
    __decorate([
        core_1.Input('leafletLayers'), 
        __metadata('design:type', Array)
    ], LeafletLayersDirective.prototype, "layers", void 0);
    LeafletLayersDirective = __decorate([
        core_1.Directive({
            selector: '[leafletLayers]'
        }), 
        __metadata('design:paramtypes', [leaflet_directive_1.LeafletDirective])
    ], LeafletLayersDirective);
    return LeafletLayersDirective;
}());
exports.LeafletLayersDirective = LeafletLayersDirective;

//# sourceMappingURL=leaflet-layers.directive.js.map
