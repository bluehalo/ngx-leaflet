/// <reference types="leaflet" />
import * as L from 'leaflet';
import { LeafletLayerDiff } from './leaflet-layer-diff.model';
export declare class LeafletLayersUtil {
    static diffLayers(newLayers: L.Layer[], prevLayers: L.Layer[]): LeafletLayerDiff;
}
