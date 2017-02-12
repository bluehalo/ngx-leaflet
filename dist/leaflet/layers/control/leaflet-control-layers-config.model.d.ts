/// <reference types="leaflet" />
import * as L from 'leaflet';
export declare class LeafletControlLayersConfig {
    baseLayers: L.Control.LayersObject;
    overlays: L.Control.LayersObject;
    constructor(baseLayers?: L.Control.LayersObject, overlays?: L.Control.LayersObject);
}
