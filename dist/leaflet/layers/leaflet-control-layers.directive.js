"use strict";
var core_1 = require('@angular/core');
var L = require('leaflet');
var leaflet_directive_1 = require('../core/leaflet.directive');
var LeafletLayersControlDirective = (function () {
    function LeafletLayersControlDirective(leafletDirective) {
        this.leafletDirective = leafletDirective;
    }
    LeafletLayersControlDirective.prototype.ngOnInit = function () {
        // Set up all the initial settings
        this.initializeLayersControl(this.layersControlConfig, this.layersControlOptions);
    };
    LeafletLayersControlDirective.prototype.ngOnChanges = function (changes) {
        // Set the layers
        if (changes['layersControlCfg']) {
            this.setLayersControlConfig(changes['layersControlCfg'].currentValue);
        }
    };
    LeafletLayersControlDirective.prototype.initializeLayersControl = function (controlConfig, controlOptions) {
        var map = this.leafletDirective.getMap();
        if (null != map) {
            this.layersControl = L.control.layers(controlConfig, controlOptions)
                .addTo(map);
        }
    };
    LeafletLayersControlDirective.prototype.setLayersControlConfig = function (controlConfig) {
        var map = this.leafletDirective.getMap();
        if (null != map) {
        }
    };
    __decorate([
        core_1.Input('leafletLayersControl'), 
        __metadata('design:type', Object)
    ], LeafletLayersControlDirective.prototype, "layersControlConfig", void 0);
    __decorate([
        core_1.Input('leafletLayersControlOptions'), 
        __metadata('design:type', Object)
    ], LeafletLayersControlDirective.prototype, "layersControlOptions", void 0);
    LeafletLayersControlDirective = __decorate([
        core_1.Directive({
            selector: '[leafletLayersControl]'
        }), 
        __metadata('design:paramtypes', [leaflet_directive_1.LeafletDirective])
    ], LeafletLayersControlDirective);
    return LeafletLayersControlDirective;
}());
exports.LeafletLayersControlDirective = LeafletLayersControlDirective;

//# sourceMappingURL=leaflet-control-layers.directive.js.map
