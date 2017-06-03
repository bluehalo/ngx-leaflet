/// <reference types="leaflet" />
import { DoCheck, KeyValueDiffer, KeyValueDiffers, OnInit } from '@angular/core';
import { LeafletDirective } from '../../core/leaflet.directive';
import { LeafletControlLayersConfig } from './leaflet-control-layers-config.model';
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
