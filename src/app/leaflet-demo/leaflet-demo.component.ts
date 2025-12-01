import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { LeafletCoreDemoComponent } from './core/core-demo.component';
import { LeafletBaseLayersDemoComponent } from './layers/baselayers-demo.component';
import { LeafletLayersDemoComponent } from './layers/layers-demo.component';
import { LeafletNgForLayersDemoComponent } from './layers/ngfor-layers-demo.component';
import { LeafletMarkersDemoComponent } from './layers/markers-demo.component';
import { LeafletPerformanceDemoComponent } from './performance/performance-demo.component';
import { LeafletEventsDemoComponent } from './events/events-demo.component';
import { LeafletMultiMapDemoComponent } from './core/multi-map-demo.component';

@Component({
    selector: 'leafletDemo',
    templateUrl: './leaflet-demo.component.html',
    imports: [
        LeafletCoreDemoComponent,
        LeafletBaseLayersDemoComponent,
        LeafletLayersDemoComponent,
        LeafletNgForLayersDemoComponent,
        LeafletMarkersDemoComponent,
        LeafletPerformanceDemoComponent,
        LeafletEventsDemoComponent,
        LeafletMultiMapDemoComponent,
    ],
})
export class LeafletDemoComponent {
    showDemo = false;
    private readonly cdr: ChangeDetectorRef = inject(ChangeDetectorRef);

    ngOnInit() {
        // Primarily for debugging
        setTimeout(() => {
            this.showDemo = true;
            this.cdr.markForCheck();
        }, 1000);
    }
}
