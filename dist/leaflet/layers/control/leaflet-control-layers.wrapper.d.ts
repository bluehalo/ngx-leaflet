/// <reference types="leaflet" />
import * as L from 'leaflet';
import { LeafletControlLayersConfig } from './leaflet-control-layers-config.model';
import { LeafletLayersObjectDiff } from './leaflet-layers-object-diff.model';
export declare class LeafletControlLayersWrapper {
    protected layersControl: L.Control.Layers;
    getLayersControl(): L.Control.Layers;
    init(controlConfig: any, controlOptions: any): L.Control.Layers;
    setLayersControlConfig(newConfig: LeafletControlLayersConfig, prevConfig: LeafletControlLayersConfig): LeafletLayersObjectDiff;
}
