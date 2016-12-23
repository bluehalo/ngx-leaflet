import * as L from 'leaflet';

export class LeafletLayerDiff {

	constructor(
		public remove: L.Layer[],
		public add: L.Layer[]) { }

}
