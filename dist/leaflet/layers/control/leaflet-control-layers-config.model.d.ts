/// <reference types="leaflet" />
import * as L from 'leaflet';
export declare class LeafletControlLayersConfig {
    baseLayers: {
        [name: string]: L.Layer;
    };
    overlays: {
        [name: string]: L.Layer;
    };
}
