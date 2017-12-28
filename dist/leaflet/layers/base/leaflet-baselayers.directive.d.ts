import { DoCheck, KeyValueDiffer, KeyValueDiffers, NgZone, OnDestroy, OnInit } from '@angular/core';
import { Control, Layer } from 'leaflet';
import { LeafletDirective } from '../../core/leaflet.directive';
/**
 * Baselayers directive
 *
 * This directive is provided as a convenient way to add baselayers to the map. The input accepts
 * a key-value map of layer name -> layer. Mutable changed are detected. On changes, a differ is
 * used to determine what changed so that layers are appropriately added or removed. This directive
 * will also add the layers control so users can switch between available base layers.
 *
 * To specify which layer to show as the 'active' baselayer, you will want to add it to the map
 * using the layers directive. Otherwise, the plugin will use the last one it sees.
 */
export declare class LeafletBaseLayersDirective implements DoCheck, OnDestroy, OnInit {
    private differs;
    private zone;
    baseLayersValue: {
        [name: string]: Layer;
    };
    baseLayersDiffer: KeyValueDiffer<string, Layer>;
    baseLayers: {
        [name: string]: Layer;
    };
    layersControlOptions: Control.LayersOptions;
    baseLayer: Layer;
    private leafletDirective;
    private controlLayers;
    constructor(leafletDirective: LeafletDirective, differs: KeyValueDiffers, zone: NgZone);
    ngOnDestroy(): void;
    ngOnInit(): void;
    ngDoCheck(): void;
    protected updateBaseLayers(): void;
    /**
     * Check the current base layer and change it to the new one if necessary
     */
    protected syncBaseLayer(): void;
}
