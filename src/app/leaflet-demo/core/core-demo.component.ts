import { ChangeDetectorRef, Component, inject } from '@angular/core';

import { latLng, LatLng, tileLayer } from 'leaflet';
import { LeafletDirective } from '../../../../projects/ngx-leaflet/src/public-api';
import { JsonPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
    selector: 'leafletCoreDemo',
    templateUrl: './core-demo.component.html',
    imports: [FormsModule, JsonPipe, LeafletDirective],
})
export class LeafletCoreDemoComponent {
    optionsSpec: any = {
        layers: [
            {
                url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                attribution: 'Open Street Map',
            },
        ],
        zoom: 5,
        center: [46.879966, -121.726909],
    };

    // Leaflet bindings
    zoom = this.optionsSpec.zoom;
    center = latLng(this.optionsSpec.center);
    options = {
        layers: [
            tileLayer(this.optionsSpec.layers[0].url, {
                attribution: this.optionsSpec.layers[0].attribution,
            }),
        ],
        zoom: this.optionsSpec.zoom,
        center: latLng(this.optionsSpec.center),
    };

    // Form bindings
    formZoom = this.zoom;
    zoomLevels = [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
    ];
    lat = this.center.lat;
    lng = this.center.lng;
    private readonly cdr: ChangeDetectorRef = inject(ChangeDetectorRef);

    // Output binding for center
    onCenterChange(center: LatLng) {
        setTimeout(() => {
            this.lat = center.lat;
            this.lng = center.lng;
            this.cdr.markForCheck();
        });
    }

    onZoomChange(zoom: number) {
        setTimeout(() => {
            this.formZoom = zoom;
            this.cdr.markForCheck();
        });
    }

    doApply() {
        this.center = latLng(this.lat, this.lng);
        this.zoom = this.formZoom;
    }
}
