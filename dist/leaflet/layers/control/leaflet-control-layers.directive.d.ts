import { DoCheck, KeyValueDiffer, KeyValueDiffers, NgZone, OnDestroy, OnInit } from '@angular/core';
import { Layer } from 'leaflet';
import { LeafletDirective } from '../../core/leaflet.directive';
import { LeafletControlLayersConfig } from './leaflet-control-layers-config.model';
/**
 * Layers Control
 *
 * This directive is used to configure the layers control. The input accepts an object with two
 * key-value maps of layer name -> layer. Mutable changes are detected. On changes, a differ is
 * used to determine what changed so that layers are appropriately added or removed.
 *
 * To specify which layer to show as the 'active' baselayer, you will want to add it to the map
 * using the layers directive. Otherwise, the last one it sees will be used.
 */
export declare class LeafletLayersControlDirective implements DoCheck, OnDestroy, OnInit {
    private differs;
    private zone;
    layersControlConfigValue: LeafletControlLayersConfig;
    baseLayersDiffer: KeyValueDiffer<string, Layer>;
    overlaysDiffer: KeyValueDiffer<string, Layer>;
    layersControlConfig: LeafletControlLayersConfig;
    layersControlOptions: any;
    private controlLayers;
    private leafletDirective;
    constructor(leafletDirective: LeafletDirective, differs: KeyValueDiffers, zone: NgZone);
    ngOnInit(): void;
    ngOnDestroy(): void;
    ngDoCheck(): void;
    protected updateLayers(): void;
}
