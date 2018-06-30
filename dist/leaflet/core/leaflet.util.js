var LeafletUtil = /** @class */ (function () {
    function LeafletUtil() {
    }
    LeafletUtil.mapToArray = function (map) {
        var toReturn = [];
        for (var k in map) {
            if (map.hasOwnProperty(k)) {
                toReturn.push(map[k]);
            }
        }
        return toReturn;
    };
    LeafletUtil.handleEvent = function (zone, eventEmitter, event) {
        // Don't want to emit if there are no observers
        if (0 < eventEmitter.observers.length) {
            zone.run(function () {
                eventEmitter.emit(event);
            });
        }
    };
    return LeafletUtil;
}());
export { LeafletUtil };
//# sourceMappingURL=leaflet.util.js.map