import * as L from 'leaflet';

export class LeafletControlLayersConfig {
	baseLayers: { [name: string]: L.Layer } = {};
	overlays: { [name: string]: L.Layer } = {};
}
