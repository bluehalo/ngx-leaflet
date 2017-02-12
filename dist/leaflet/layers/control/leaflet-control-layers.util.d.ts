/// <reference types="leaflet" />
import * as L from 'leaflet';
import { LeafletLayersObjectDiff } from '../control/leaflet-layers-object-diff.model';
export declare class LeafletControlLayersUtil {
    diffLayers(newLayers: L.Control.LayersObject, prevLayers: L.Control.LayersObject): LeafletLayersObjectDiff;
}
