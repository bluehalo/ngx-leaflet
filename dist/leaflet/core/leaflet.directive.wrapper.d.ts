import * as L from 'leaflet';
import { LeafletDirective } from './leaflet.directive';
import * as L from 'leaflet';
export declare class LeafletDirectiveWrapper {
    protected leafletDirective: LeafletDirective;
    constructor(leafletDirective: LeafletDirective);
    init(): void;
    getMap(): L.Map;
}
