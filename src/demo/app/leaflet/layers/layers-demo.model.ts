import * as L from 'leaflet';

export class LeafletLayersDemoModel {

	constructor(
		public zoomLevels: number[],
		public zoom: number,
		public latitude: number,
		public longitude: number,
		public baseLayers: {
			id: string,
			name: string,
			layer: L.Layer,

		}[],
		public baseLayer: string,
		public overlayLayers?: {
			formName: string,
			name: string,
			enabled: boolean,
			layer: L.Layer
		}[]
	) {
		if (null == overlayLayers) {
			this.overlayLayers = [];
		}
	}

}
