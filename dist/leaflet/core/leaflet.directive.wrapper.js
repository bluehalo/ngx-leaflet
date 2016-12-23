"use strict";
var LeafletDirectiveWrapper = (function () {
    function LeafletDirectiveWrapper(leafletDirective) {
        this.leafletDirective = leafletDirective;
    }
    LeafletDirectiveWrapper.prototype.init = function () {
        this.map = this.leafletDirective.getMap();
    };
    LeafletDirectiveWrapper.prototype.getMap = function () {
        return this.map;
    };
    return LeafletDirectiveWrapper;
}());
exports.LeafletDirectiveWrapper = LeafletDirectiveWrapper;

//# sourceMappingURL=leaflet.directive.wrapper.js.map
