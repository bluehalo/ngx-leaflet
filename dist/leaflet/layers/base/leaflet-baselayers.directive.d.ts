/// <reference types="leaflet" />
import { DoCheck, KeyValueDiffer, KeyValueDiffers, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { LeafletDirective } from '../../core/leaflet.directive';
export declare class LeafletBaseLayersDirective implements DoCheck, OnInit {
    private differs;
    baseLayersValue: {
        [name: string]: L.Layer;
    };
    baseLayersDiffer: KeyValueDiffer<string, L.Layer>;
    baseLayers: {
        [name: string]: L.Layer;
    };
    layersControlOptions: L.Control.LayersOptions;
    baseLayer: L.Layer;
    private leafletDirective;
    private controlLayers;
    constructor(leafletDirective: LeafletDirective, differs: KeyValueDiffers);
    ngOnInit(): void;
    ngDoCheck(): void;
    protected updateBaseLayers(): void;
    /**
     * Check the current base layer and change it to the new one if necessary
     */
    protected syncBaseLayer(): void;
}
