/// <reference types="leaflet" />
import { OnChanges, OnInit, SimpleChange } from '@angular/core';
import * as L from 'leaflet';
import { LeafletDirective } from '@asymmetrik/angular2-leaflet';
export declare class LeafletDrawDirective implements OnChanges, OnInit {
    leafletDirective: LeafletDirective;
    map: L.Map;
    constructor(leafletDirective: LeafletDirective);
    ngOnInit(): void;
    ngOnChanges(changes: {
        [key: string]: SimpleChange;
    }): void;
}
