"use strict";
var core_1 = require('@angular/core');
var LeafletDirective = (function () {
    // private map: L.Map;
    function LeafletDirective(el, renderer) {
        // this.map = L.map(renderer.selectRootElement(el));
    }
    LeafletDirective = __decorate([
        core_1.Directive({
            selector: 'leaflet'
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, core_1.Renderer])
    ], LeafletDirective);
    return LeafletDirective;
}());
exports.LeafletDirective = LeafletDirective;

//# sourceMappingURL=leaflet.directive.js.map
