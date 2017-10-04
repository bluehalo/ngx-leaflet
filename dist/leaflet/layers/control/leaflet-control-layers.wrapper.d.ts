import { KeyValueChanges } from '@angular/core';
import { Control, Layer } from 'leaflet';
import { LeafletControlLayersChanges } from './leaflet-control-layers-changes.model';
export declare class LeafletControlLayersWrapper {
    protected layersControl: Control.Layers;
    getLayersControl(): Control.Layers;
    init(controlConfig: any, controlOptions: any): Control.Layers;
    applyBaseLayerChanges(changes: KeyValueChanges<string, Layer>): LeafletControlLayersChanges;
    applyOverlayChanges(changes: KeyValueChanges<string, Layer>): LeafletControlLayersChanges;
    private applyChanges(changes, addFn);
}
