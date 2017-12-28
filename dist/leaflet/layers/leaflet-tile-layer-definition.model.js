import { tileLayer, TileLayer } from 'leaflet';
var LeafletTileLayerDefinition = /** @class */ (function () {
    function LeafletTileLayerDefinition(type, url, options) {
        this.type = type;
        this.url = url;
        this.options = options;
    }
    /**
     * Creates a TileLayer from the provided definition. This is a convenience function
     * to help with generating layers from objects.
     *
     * @param layerDef The layer to create
     * @returns {TileLayer} The TileLayer that has been created
     */
    /**
         * Creates a TileLayer from the provided definition. This is a convenience function
         * to help with generating layers from objects.
         *
         * @param layerDef The layer to create
         * @returns {TileLayer} The TileLayer that has been created
         */
    LeafletTileLayerDefinition.createTileLayer = /**
         * Creates a TileLayer from the provided definition. This is a convenience function
         * to help with generating layers from objects.
         *
         * @param layerDef The layer to create
         * @returns {TileLayer} The TileLayer that has been created
         */
    function (layerDef) {
        var layer;
        switch (layerDef.type) {
            case 'xyz':
                layer = tileLayer(layerDef.url, layerDef.options);
                break;
            case 'wms':
            default:
                layer = tileLayer.wms(layerDef.url, layerDef.options);
                break;
        }
        return layer;
    };
    /**
     * Creates a TileLayer for each key in the incoming map. This is a convenience function
     * for generating an associative array of layers from an associative array of objects
     *
     * @param layerDefs A map of key to tile layer definition
     * @returns {{[p: string]: TileLayer}} A new map of key to TileLayer
     */
    /**
         * Creates a TileLayer for each key in the incoming map. This is a convenience function
         * for generating an associative array of layers from an associative array of objects
         *
         * @param layerDefs A map of key to tile layer definition
         * @returns {{[p: string]: TileLayer}} A new map of key to TileLayer
         */
    LeafletTileLayerDefinition.createTileLayers = /**
         * Creates a TileLayer for each key in the incoming map. This is a convenience function
         * for generating an associative array of layers from an associative array of objects
         *
         * @param layerDefs A map of key to tile layer definition
         * @returns {{[p: string]: TileLayer}} A new map of key to TileLayer
         */
    function (layerDefs) {
        var layers = {};
        for (var k in layerDefs) {
            if (layerDefs.hasOwnProperty(k)) {
                layers[k] = (LeafletTileLayerDefinition.createTileLayer(layerDefs[k]));
            }
        }
        return layers;
    };
    /**
     * Create a Tile Layer from the current state of this object
     *
     * @returns {TileLayer} A new TileLayer
     */
    /**
         * Create a Tile Layer from the current state of this object
         *
         * @returns {TileLayer} A new TileLayer
         */
    LeafletTileLayerDefinition.prototype.createTileLayer = /**
         * Create a Tile Layer from the current state of this object
         *
         * @returns {TileLayer} A new TileLayer
         */
    function () {
        return LeafletTileLayerDefinition.createTileLayer(this);
    };
    return LeafletTileLayerDefinition;
}());
export { LeafletTileLayerDefinition };
//# sourceMappingURL=leaflet-tile-layer-definition.model.js.map