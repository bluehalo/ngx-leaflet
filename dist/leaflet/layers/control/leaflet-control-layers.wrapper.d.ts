import { KeyValueChanges, NgZone } from '@angular/core';
import { Control, Layer } from 'leaflet';
import { LeafletControlLayersChanges } from './leaflet-control-layers-changes.model';
export declare class LeafletControlLayersWrapper {
    protected zone: NgZone;
    protected layersControl: Control.Layers;
    constructor(zone: NgZone);
    getLayersControl(): Control.Layers;
    init(controlConfig: any, controlOptions: any): Control.Layers;
    applyBaseLayerChanges(changes: KeyValueChanges<string, Layer>): LeafletControlLayersChanges;
    applyOverlayChanges(changes: KeyValueChanges<string, Layer>): LeafletControlLayersChanges;
    private applyChanges(changes, addFn);
}
