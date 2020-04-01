import { Layer } from '@vchangal/leaflet';

export class LeafletControlLayersConfig {
	baseLayers: { [name: string]: Layer } = {};
	overlays: { [name: string]: Layer } = {};
}
