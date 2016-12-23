import * as L from 'leaflet';

export class LeafletControlLayersConfig {
	constructor(
		public baseLayers?: L.control.LayersObject,
		public overlays?: L.control.LayersObject
	) { }
}
