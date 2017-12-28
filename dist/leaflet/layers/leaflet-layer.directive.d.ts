import { NgZone, OnChanges, OnDestroy, OnInit, SimpleChange } from '@angular/core';
import { Layer } from 'leaflet';
import { LeafletDirective } from '../core/leaflet.directive';
/**
 * Layer directive
 *
 * This directive is used to directly control a single map layer. The purpose of this directive is to
 * be used as part of a child structural directive of the map element.
 *
 */
export declare class LeafletLayerDirective implements OnChanges, OnDestroy, OnInit {
    private zone;
    layer: Layer;
    private leafletDirective;
    constructor(leafletDirective: LeafletDirective, zone: NgZone);
    ngOnInit(): void;
    ngOnDestroy(): void;
    ngOnChanges(changes: {
        [key: string]: SimpleChange;
    }): void;
}
