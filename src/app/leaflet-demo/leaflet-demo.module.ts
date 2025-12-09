import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { LeafletModule } from '../../../projects/ngx-leaflet/src/lib/leaflet.module';

import { LeafletCoreDemoComponent } from './core/core-demo.component';
import { LeafletMultiMapDemoComponent } from './core/multi-map-demo.component';
import { LeafletEventsDemoComponent } from './events/events-demo.component';
import { LeafletBaseLayersDemoComponent } from './layers/baselayers-demo.component';
import { LeafletLayersDemoComponent } from './layers/layers-demo.component';
import { LeafletMarkersDemoComponent } from './layers/markers-demo.component';
import { LeafletNgForLayersDemoComponent } from './layers/ngfor-layers-demo.component';
import { LeafletDemoComponent } from './leaflet-demo.component';
import { LeafletWrapperComponent } from './performance/leaflet-wrapper.component';
import { LeafletPerformanceDemoComponent } from './performance/performance-demo.component';

@NgModule({
  imports: [CommonModule, FormsModule, LeafletModule],
  declarations: [
    LeafletDemoComponent,
    LeafletCoreDemoComponent,
    LeafletEventsDemoComponent,
    LeafletLayersDemoComponent,
    LeafletNgForLayersDemoComponent,
    LeafletBaseLayersDemoComponent,
    LeafletMarkersDemoComponent,
    LeafletPerformanceDemoComponent,
    LeafletMultiMapDemoComponent,
    LeafletWrapperComponent,
  ],
  exports: [LeafletDemoComponent],
  bootstrap: [LeafletDemoComponent],
  providers: [],
})
export class LeafletDemoModule {}
