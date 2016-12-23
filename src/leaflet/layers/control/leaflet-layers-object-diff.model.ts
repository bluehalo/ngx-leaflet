import * as L from 'leaflet';

export class LeafletLayersObjectDiff {

	constructor(
		public remove: L.control.LayersObject,
		public add: L.control.LayersObject
	) { }

}
