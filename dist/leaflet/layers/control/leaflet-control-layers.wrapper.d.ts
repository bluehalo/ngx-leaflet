/// <reference types="leaflet" />
import { KeyValueChanges } from '@angular/core';
import * as L from 'leaflet';
import { LeafletControlLayersChanges } from './leaflet-control-layers-changes.model';
export declare class LeafletControlLayersWrapper {
    protected layersControl: L.Control.Layers;
    getLayersControl(): L.Control.Layers;
    init(controlConfig: any, controlOptions: any): L.Control.Layers;
    applyBaseLayerChanges(changes: KeyValueChanges<string, L.Layer>): LeafletControlLayersChanges;
    applyOverlayChanges(changes: KeyValueChanges<string, L.Layer>): LeafletControlLayersChanges;
    private applyChanges(changes, addFn);
}
