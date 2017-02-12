import * as L from 'leaflet';

export class LeafletControlLayersConfig {
	constructor(
		public baseLayers?: L.Control.LayersObject,
		public overlays?: L.Control.LayersObject
	) { }
}
