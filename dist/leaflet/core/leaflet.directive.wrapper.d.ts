import { LeafletDirective } from './leaflet.directive';
import { Map } from 'leaflet';
export declare class LeafletDirectiveWrapper {
    protected leafletDirective: LeafletDirective;
    constructor(leafletDirective: LeafletDirective);
    init(): void;
    getMap(): Map;
}
