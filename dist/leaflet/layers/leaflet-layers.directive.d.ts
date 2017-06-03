/// <reference types="leaflet" />
import { DoCheck, IterableDiffer, IterableDiffers, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { LeafletDirective } from '../core/leaflet.directive';
export declare class LeafletLayersDirective implements DoCheck, OnInit {
    private differs;
    layersValue: L.Layer[];
    layersDiffer: IterableDiffer<L.Layer>;
    layers: L.Layer[];
    private leafletDirective;
    constructor(leafletDirective: LeafletDirective, differs: IterableDiffers);
    ngDoCheck(): void;
    ngOnInit(): void;
    /**
     * Update the state of the layers.
     * We use an iterable differ to synchronize the map layers with the state of the bound layers array.
     * This is important because it allows us to react to changes to the contents of the array as well
     * as changes to the actual array instance.
     */
    private updateLayers();
}
