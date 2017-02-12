/// <reference types="leaflet" />
import { OnChanges, OnInit, SimpleChange } from '@angular/core';
import * as L from 'leaflet';
import { LeafletDirective } from '../../core/leaflet.directive';
export declare class LeafletBaseLayersDirective implements OnChanges, OnInit {
    baseLayers: L.Control.LayersObject;
    layersControlOptions: L.Control.LayersOptions;
    baseLayer: L.Layer;
    private leafletDirective;
    private controlLayers;
    constructor(leafletDirective: LeafletDirective);
    ngOnInit(): void;
    ngOnChanges(changes: {
        [key: string]: SimpleChange;
    }): void;
    protected setBaseLayers(newBaseLayers: L.Control.LayersObject, prevBaseLayers: L.Control.LayersObject): void;
    /**
     * Check the current base layer and change it to the new one if necessary
     */
    protected syncBaseLayer(): void;
}
