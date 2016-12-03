"use strict";
var core_1 = require('@angular/core');
var leaflet_directive_1 = require('./core/leaflet.directive');
var LeafletModule = (function () {
    function LeafletModule() {
    }
    LeafletModule = __decorate([
        core_1.NgModule({
            imports: [],
            exports: [
                leaflet_directive_1.LeafletDirective
            ],
            declarations: [
                leaflet_directive_1.LeafletDirective
            ],
            providers: []
        }), 
        __metadata('design:paramtypes', [])
    ], LeafletModule);
    return LeafletModule;
}());
exports.LeafletModule = LeafletModule;

//# sourceMappingURL=leaflet.module.js.map
