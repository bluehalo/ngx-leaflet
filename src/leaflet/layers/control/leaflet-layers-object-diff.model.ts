import * as L from 'leaflet';

export class LeafletLayersObjectDiff {

	constructor(
		public remove: L.Control.LayersObject,
		public add: L.Control.LayersObject
	) { }

}
