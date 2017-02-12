/// <reference types="leaflet" />
import * as L from 'leaflet';
export declare class LeafletLayersObjectDiff {
    remove: L.Control.LayersObject;
    add: L.Control.LayersObject;
    constructor(remove: L.Control.LayersObject, add: L.Control.LayersObject);
}
