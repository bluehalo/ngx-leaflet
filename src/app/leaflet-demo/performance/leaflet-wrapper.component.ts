import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { latLng, Layer, tileLayer } from 'leaflet';

import { LeafletDirective, LeafletLayersDirective } from '../../../../projects/ngx-leaflet/src/public-api';

@Component({
    selector: 'leafletWrapper',
    templateUrl: './leaflet-wrapper.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [LeafletDirective, LeafletLayersDirective]
})
export class LeafletWrapperComponent {

    @Input('leafletMarkers')
    markers: Layer[] = [];

    // Open Street Map definitions
    LAYER_OSM = tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: 'Open Street Map' });

    // Values to bind to Leaflet Directive
    options = {
        layers: [ this.LAYER_OSM ],
        zoom: 10,
        center: latLng(46.879966, -121.726909)
    };
}
