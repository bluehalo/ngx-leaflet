import * as L from 'leaflet';

export class LeafletDemoModel {

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
		public controlLayers?: {
			formName: string,
			name: string,
			enabled: boolean,
			layer: L.Layer
		}[]
	) {
		if (null == controlLayers) {
			this.controlLayers = [];
		}
	}

}
