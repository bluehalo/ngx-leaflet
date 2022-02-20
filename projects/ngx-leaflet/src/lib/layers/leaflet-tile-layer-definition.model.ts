import { tileLayer, TileLayer } from 'leaflet';

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
	 * @returns {TileLayer} The TileLayer that has been created
	 */
	static createTileLayer(layerDef: LeafletTileLayerDefinition): TileLayer {
		let layer: TileLayer;

		switch (layerDef.type) {
			case 'xyz':
				layer = tileLayer(layerDef.url,  layerDef.options);
				break;
			case 'wms':
			default:
				layer = tileLayer.wms(layerDef.url,  layerDef.options);
				break;
		}

		return layer;
	}

	/**
	 * Creates a TileLayer for each key in the incoming map. This is a convenience function
	 * for generating an associative array of layers from an associative array of objects
	 *
	 * @param layerDefs A map of key to tile layer definition
	 * @returns {{[p: string]: TileLayer}} A new map of key to TileLayer
	 */
	static createTileLayers(layerDefs: { [ key: string ]: LeafletTileLayerDefinition }): { [ key: string ]: TileLayer } {
		const layers: { [ key: string ]: TileLayer } = {};

		for (const k in layerDefs) {
			if (layerDefs.hasOwnProperty(k)) {
				layers[k] = (LeafletTileLayerDefinition.createTileLayer(layerDefs[k]));
			}
		}

		return layers;
	}

	/**
	 * Create a Tile Layer from the current state of this object
	 *
	 * @returns {TileLayer} A new TileLayer
	 */
	createTileLayer(): TileLayer {
		return LeafletTileLayerDefinition.createTileLayer(this);
	}
}
