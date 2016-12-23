/// <reference types="leaflet" />
import { OnChanges, OnInit, SimpleChange } from '@angular/core';
import * as L from 'leaflet';
import { LeafletDirective } from '../../core/leaflet.directive';
export declare class LeafletBaseLayersDirective implements OnChanges, OnInit {
    baseLayers: any;
    layersControlOptions: any;
    private leafletDirective;
    private controlLayers;
    constructor(leafletDirective: LeafletDirective);
    ngOnInit(): void;
    ngOnChanges(changes: {
        [key: string]: SimpleChange;
    }): void;
    protected initializeBaseLayers(baseLayers: any, controlOptions: any): void;
    protected setBaseLayers(newBaseLayers: L.control.LayersObject, prevBaseLayers: L.control.LayersObject): void;
}
