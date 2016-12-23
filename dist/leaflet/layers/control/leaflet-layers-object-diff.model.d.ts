/// <reference types="leaflet" />
import * as L from 'leaflet';
export declare class LeafletLayersObjectDiff {
    remove: L.control.LayersObject;
    add: L.control.LayersObject;
    constructor(remove: L.control.LayersObject, add: L.control.LayersObject);
}
