import { TileLayer } from 'leaflet';
export declare class LeafletTileLayerDefinition {
    type: string;
    url: string;
    options: any;
    constructor(type: string, url: string, options: any);
    /**
     * Creates a TileLayer from the provided definition. This is a convenience function
     * to help with generating layers from objects.
     *
     * @param layerDef The layer to create
     * @returns {TileLayer} The TileLayer that has been created
     */
    static createTileLayer(layerDef: LeafletTileLayerDefinition): TileLayer;
    /**
     * Creates a TileLayer for each key in the incoming map. This is a convenience function
     * for generating an associative array of layers from an associative array of objects
     *
     * @param layerDefs A map of key to tile layer definition
     * @returns {{[p: string]: TileLayer}} A new map of key to TileLayer
     */
    static createTileLayers(layerDefs: {
        [key: string]: LeafletTileLayerDefinition;
    }): {
        [key: string]: TileLayer;
    };
    /**
     * Create a Tile Layer from the current state of this object
     *
     * @returns {TileLayer} A new TileLayer
     */
    createTileLayer(): TileLayer;
}
