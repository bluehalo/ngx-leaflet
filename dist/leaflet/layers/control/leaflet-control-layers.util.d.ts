/// <reference types="leaflet" />
import * as L from 'leaflet';
import { LeafletLayersObjectDiff } from '../control/leaflet-layers-object-diff.model';
export declare class LeafletControlLayersUtil {
    diffLayers(newLayers: L.control.LayersObject, prevLayers: L.control.LayersObject): LeafletLayersObjectDiff;
}
