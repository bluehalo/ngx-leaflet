import * as L from 'leaflet';

import { LeafletLayerDiff } from './leaflet-layer-diff.model';

export class LeafletLayersUtil {

	static diffLayers(newLayers: L.Layer[], prevLayers: L.Layer[]): LeafletLayerDiff {

		let toRemove: L.Layer[];
		let toAdd: L.Layer[];

		if (null == newLayers) { newLayers = []; }
		if (null == prevLayers) { prevLayers = []; }

		// Figure out which layers need to be removed (prev - new)
		toRemove = prevLayers
			.filter((pl) => {
				return !(newLayers.find((nl) => { return (pl === nl); }));
			});

		// Figure out which layers need to be added (new - prev)
		toAdd = newLayers
			.filter((pl) => {
				return !(prevLayers.find((nl) => { return (pl === nl); }));
			});

		return new LeafletLayerDiff(toRemove, toAdd);

	}

}
