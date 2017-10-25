import { Layer } from 'leaflet';
export declare class LeafletControlLayersConfig {
    baseLayers: {
        [name: string]: Layer;
    };
    overlays: {
        [name: string]: Layer;
    };
}
