/// <reference types="leaflet" />
import { OnChanges, OnInit, SimpleChange } from '@angular/core';
import * as L from 'leaflet';
import { LeafletDirective } from '../core/leaflet.directive';
export declare class LeafletLayersDirective implements OnChanges, OnInit {
    layers: L.Layer[];
    private leafletDirective;
    constructor(leafletDirective: LeafletDirective);
    ngOnInit(): void;
    ngOnChanges(changes: {
        [key: string]: SimpleChange;
    }): void;
    /**
     * Replace the current layers in the map with the provided array
     * @param layers The new complete array of layers for the map
     */
    private setLayers(newLayers, prevLayers);
}
