"use strict";
var core_1 = require('@angular/core');
var leaflet_directive_1 = require('../core/leaflet.directive');
var leaflet_directive_wrapper_1 = require('../core/leaflet.directive.wrapper');
var leaflet_layers_util_1 = require('./leaflet-layers.util');
var LeafletLayersDirective = (function () {
    function LeafletLayersDirective(leafletDirective) {
        this.leafletDirective = new leaflet_directive_wrapper_1.LeafletDirectiveWrapper(leafletDirective);
    }
    LeafletLayersDirective.prototype.ngOnInit = function () {
        // Init the map
        this.leafletDirective.init();
        // The way we've set this up, map isn't set until after the first round of changes has gone through
        this.setLayers(this.layers, []);
    };
    LeafletLayersDirective.prototype.ngOnChanges = function (changes) {
        // Set the layers
        if (changes['layers']) {
            var c = changes['layers'].currentValue;
            var p = (changes['layers'].isFirstChange()) ? [] : changes['layers'].previousValue;
            this.setLayers(c, p);
        }
    };
    /**
     * Replace the current layers in the map with the provided array
     * @param layers The new complete array of layers for the map
     */
    LeafletLayersDirective.prototype.setLayers = function (newLayers, prevLayers) {
        var map = this.leafletDirective.getMap();
        if (null != map) {
            var diff = leaflet_layers_util_1.LeafletLayersUtil.diffLayers(newLayers, prevLayers);
            // Remove the layers
            diff.remove.forEach(function (l) { map.removeLayer(l); });
            // Add the new layers
            diff.add.forEach(function (l) { map.addLayer(l); });
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
