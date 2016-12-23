/// <reference types="leaflet" />
import * as L from 'leaflet';
export declare class LeafletControlLayersConfig {
    baseLayers: L.control.LayersObject;
    overlays: L.control.LayersObject;
    constructor(baseLayers?: L.control.LayersObject, overlays?: L.control.LayersObject);
}
