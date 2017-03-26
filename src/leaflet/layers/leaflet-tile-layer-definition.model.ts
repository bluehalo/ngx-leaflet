export class LeafletTileLayerDefinition {

	constructor(
		public type: string,
		public url: string,
		public options: any) { }


	/**
	 * Creates a TileLayer from the provided definition. This is a convenience function
	 * to help with generating layers from objects.
	 *
	 * @param layerDef The layer to create
	 * @returns {L.TileLayer} The TileLayer that has been created
	 */
	static createTileLayer(layerDef: LeafletTileLayerDefinition): L.TileLayer {
		let layer: L.TileLayer;

		switch (layerDef.type) {
			case 'xyz':
				layer = L.tileLayer(layerDef.url,  layerDef.options);
				break;
			case 'wms':
			default:
				layer = L.tileLayer.wms(layerDef.url,  layerDef.options);
				break;
		}

		return layer;
	}

	/**
	 * Creates a TileLayer for each key in the incoming map. This is a convenience function
	 * for generating an associative array of layers from an associative array of objects
	 *
	 * @param layerDefs A map of key to tile layer definition
	 * @returns {{[p: string]: L.TileLayer}} A new map of key to TileLayer
	 */
	static createTileLayers(layerDefs: { [ key: string ]: LeafletTileLayerDefinition }): { [ key: string ]: L.TileLayer } {
		let layers: { [ key: string ]: L.TileLayer } = {};

		for (let k in layerDefs) {
			if (layerDefs.hasOwnProperty(k)) {
				layers[k] = (LeafletTileLayerDefinition.createTileLayer(layerDefs[k]));
			}
		}

		return layers;
	}

	/**
	 * Create a Tile Layer from the current state of this object
	 *
	 * @returns {L.TileLayer} A new TileLayer
	 */
	createTileLayer(): L.TileLayer {
		return LeafletTileLayerDefinition.createTileLayer(this);
	}
}
