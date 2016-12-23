/// <reference types="leaflet" />
import * as L from 'leaflet';
export declare class LeafletLayerDiff {
    remove: L.Layer[];
    add: L.Layer[];
    constructor(remove: L.Layer[], add: L.Layer[]);
}
