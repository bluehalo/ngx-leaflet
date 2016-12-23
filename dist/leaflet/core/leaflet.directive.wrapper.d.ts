/// <reference types="leaflet" />
import * as L from 'leaflet';
import { LeafletDirective } from './leaflet.directive';
export declare class LeafletDirectiveWrapper {
    protected leafletDirective: LeafletDirective;
    protected map: L.Map;
    constructor(leafletDirective: LeafletDirective);
    init(): void;
    getMap(): L.Map;
}
