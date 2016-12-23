import { OnChanges, OnInit, SimpleChange } from '@angular/core';
import { LeafletDirective } from '../../core/leaflet.directive';
export declare class LeafletLayersControlDirective implements OnChanges, OnInit {
    layersControlConfig: any;
    layersControlOptions: any;
    private controlLayers;
    private leafletDirective;
    constructor(leafletDirective: LeafletDirective);
    ngOnInit(): void;
    ngOnChanges(changes: {
        [key: string]: SimpleChange;
    }): void;
}
