import { Component } from '@angular/core';
import { LeafletCoreDemoComponent } from './core/core-demo.component';
import { LeafletMultiMapDemoComponent } from './core/multi-map-demo.component';
import { LeafletEventsDemoComponent } from './events/events-demo.component';
import { LeafletBaseLayersDemoComponent } from './layers/baselayers-demo.component';
import { LeafletLayersDemoComponent } from './layers/layers-demo.component';
import { LeafletMarkersDemoComponent } from './layers/markers-demo.component';
import { LeafletNgForLayersDemoComponent } from './layers/ngfor-layers-demo.component';
import { LeafletPerformanceDemoComponent } from './performance/performance-demo.component';

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

  ngOnInit() {
    // Primarily for debugging
    this.showDemo = true;
  }
}
