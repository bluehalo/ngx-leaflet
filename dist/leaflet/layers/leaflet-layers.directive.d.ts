import { DoCheck, IterableDiffer, IterableDiffers, NgZone, OnDestroy, OnInit } from '@angular/core';
import { Layer } from 'leaflet';
import { LeafletDirective } from '../core/leaflet.directive';
/**
 * Layers directive
 *
 * This directive is used to directly control map layers. As changes are made to the input array of
 * layers, the map is synched to the array. As layers are added or removed from the input array, they
 * are also added or removed from the map. The input array is treated as immutable. To detect changes,
 * you must change the array instance.
 *
 * Important Note: The input layers array is assumed to be immutable. This means you need to use an
 * immutable array implementation or create a new copy of your array when you make changes, otherwise
 * this directive won't detect the change. This is by design. It's for performance reasons. Change
 * detection of mutable arrays requires diffing the state of the array on every DoCheck cycle, which
 * is extremely expensive from a time complexity perspective.
 *
 */
export declare class LeafletLayersDirective implements DoCheck, OnDestroy, OnInit {
    private differs;
    private zone;
    layersValue: Layer[];
    layersDiffer: IterableDiffer<Layer>;
    layers: Layer[];
    private leafletDirective;
    constructor(leafletDirective: LeafletDirective, differs: IterableDiffers, zone: NgZone);
    ngDoCheck(): void;
    ngOnInit(): void;
    ngOnDestroy(): void;
    /**
     * Update the state of the layers.
     * We use an iterable differ to synchronize the map layers with the state of the bound layers array.
     * This is important because it allows us to react to changes to the contents of the array as well
     * as changes to the actual array instance.
     */
    private updateLayers;
}
