/// <reference types="leaflet" />
import { DoCheck, KeyValueDiffer, KeyValueDiffers, OnInit } from '@angular/core';
import { LeafletDirective } from '../../core/leaflet.directive';
import { LeafletControlLayersConfig } from './leaflet-control-layers-config.model';
/**
 * Layers Control
 *
 * This directive is used to configure the layers control. The input accepts an object with two
 * key-value maps of layer name -> layer. The input object is treated as immutable, so changes are
 * only detected when the instance changes. On changes, a differ is used to determine what
 * changed so that layers are appropriately added or removed.
 *
 * To specify which layer to show as the 'active' baselayer, you will want to add it to the map
 * using the layers directive.
 */
export declare class LeafletLayersControlDirective implements DoCheck, OnInit {
    private differs;
    layersControlConfigValue: LeafletControlLayersConfig;
    baseLayersDiffer: KeyValueDiffer<string, L.Layer>;
    overlaysDiffer: KeyValueDiffer<string, L.Layer>;
    layersControlConfig: LeafletControlLayersConfig;
    layersControlOptions: any;
    private controlLayers;
    private leafletDirective;
    constructor(leafletDirective: LeafletDirective, differs: KeyValueDiffers);
    ngOnInit(): void;
    ngDoCheck(): void;
    protected updateLayers(): void;
}
