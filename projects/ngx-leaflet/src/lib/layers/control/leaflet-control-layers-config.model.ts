import { Layer } from 'leaflet';

export class LeafletControlLayersConfig {
	baseLayers: { [name: string]: Layer } = {};
	overlays: { [name: string]: Layer } = {};
}
