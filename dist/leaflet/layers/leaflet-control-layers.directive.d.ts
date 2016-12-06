/// <reference types="leaflet" />
import { OnChanges, OnInit, SimpleChange } from '@angular/core';
import * as L from 'leaflet';
import { LeafletDirective } from '../core/leaflet.directive';
export declare class LeafletLayersControlDirective implements OnChanges, OnInit {
    leafletDirective: LeafletDirective;
    map: L.Map;
    layersControl: L.Control.Layers;
    layersControlConfig: any;
    layersControlOptions: any;
    constructor(leafletDirective: LeafletDirective);
    ngOnInit(): void;
    ngOnChanges(changes: {
        [key: string]: SimpleChange;
    }): void;
    private initializeLayersControl(controlConfig, controlOptions);
    private setLayersControlConfig(controlConfig);
}
