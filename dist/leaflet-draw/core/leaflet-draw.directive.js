"use strict";
var core_1 = require('@angular/core');
var angular2_leaflet_1 = require('@asymmetrik/angular2-leaflet');
var LeafletDrawDirective = (function () {
    function LeafletDrawDirective(leafletDirective) {
        this.leafletDirective = leafletDirective;
    }
    LeafletDrawDirective.prototype.ngOnInit = function () {
    };
    LeafletDrawDirective.prototype.ngOnChanges = function (changes) {
    };
    LeafletDrawDirective = __decorate([
        core_1.Directive({
            selector: '[leaflet-draw]'
        }), 
        __metadata('design:paramtypes', [angular2_leaflet_1.LeafletDirective])
    ], LeafletDrawDirective);
    return LeafletDrawDirective;
}());
exports.LeafletDrawDirective = LeafletDrawDirective;

//# sourceMappingURL=leaflet-draw.directive.js.map
