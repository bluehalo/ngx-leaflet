import * as L from 'leaflet';

import { LeafletUtil } from '../../core/leaflet.util';
import { LeafletLayersObjectDiff } from '../control/leaflet-layers-object-diff.model';

export class LeafletControlLayersUtil {

	diffLayers(newLayers: L.Control.LayersObject, prevLayers: L.Control.LayersObject): LeafletLayersObjectDiff {
		let toRemove: {};
		let toAdd: {};

		// Figure out which layers need to be removed (prev - new)
		toRemove = LeafletUtil.mapSubtract(prevLayers, newLayers);

		// Figure out which layers need to be added (new - prev)
		toAdd = LeafletUtil.mapSubtract(newLayers, prevLayers);


		return new LeafletLayersObjectDiff(toRemove, toAdd);

	}

}
