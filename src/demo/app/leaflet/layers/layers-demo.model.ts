import * as L from 'leaflet';

export class LeafletLayersDemoModel {

	constructor(
		public baseLayers: {
			id: string,
			name: string,
			layer: L.Layer,

		}[],
		public baseLayer: string,
		public overlayLayers: {
			formName: string,
			name: string,
			enabled: boolean,
			layer: L.Layer
		}[] = []
	) { }

}
