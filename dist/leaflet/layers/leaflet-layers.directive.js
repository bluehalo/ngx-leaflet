"use strict";
var core_1 = require('@angular/core');
var leaflet_directive_1 = require('../core/leaflet.directive');
var LeafletLayersDirective = (function () {
    function LeafletLayersDirective(leafletDirective) {
        this.leafletDirective = leafletDirective;
    }
    LeafletLayersDirective.prototype.ngOnInit = function () {
        // Get the map from the parent directive
        this.map = this.leafletDirective.getMap();
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
        var map = this.map;
        if (null != map) {
            var toRemove = void 0;
            var layers = void 0;
            if (null == newLayers) {
                newLayers = [];
            }
            if (null == prevLayers) {
                prevLayers = [];
            }
            // Figure out which layers need to be removed (prev - new)
            toRemove = prevLayers
                .filter(function (pl) {
                return !(newLayers.find(function (nl) { return (pl === nl); }));
            });
            // Figure out which layers need to be added (new - prev)
            layers = newLayers
                .filter(function (pl) {
                return !(prevLayers.find(function (nl) { return (pl === nl); }));
            });
            // Remove the layers
            toRemove.forEach(function (l) { map.removeLayer(l); });
            // Add the new layers
            layers.forEach(function (l) { map.addLayer(l); });
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
