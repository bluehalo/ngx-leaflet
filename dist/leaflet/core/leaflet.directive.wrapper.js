"use strict";
var LeafletDirectiveWrapper = (function () {
    function LeafletDirectiveWrapper(leafletDirective) {
        this.leafletDirective = leafletDirective;
    }
    LeafletDirectiveWrapper.prototype.init = function () { };
    LeafletDirectiveWrapper.prototype.getMap = function () {
        return this.leafletDirective.getMap();
    };
    return LeafletDirectiveWrapper;
}());
exports.LeafletDirectiveWrapper = LeafletDirectiveWrapper;

//# sourceMappingURL=leaflet.directive.wrapper.js.map
