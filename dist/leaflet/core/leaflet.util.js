var LeafletUtil = (function () {
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
    return LeafletUtil;
}());
export { LeafletUtil };
//# sourceMappingURL=leaflet.util.js.map