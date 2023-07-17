import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';



import { LeafletDemoComponent } from './leaflet-demo.component';
import { LeafletCoreDemoComponent } from './core/core-demo.component';
import { LeafletMultiMapDemoComponent } from'./core/multi-map-demo.component';
import { LeafletEventsDemoComponent } from './events/events-demo.component';
import { LeafletLayersDemoComponent } from './layers/layers-demo.component';
import { LeafletNgForLayersDemoComponent } from './layers/ngfor-layers-demo.component';
import { LeafletBaseLayersDemoComponent } from './layers/baselayers-demo.component';
import { LeafletMarkersDemoComponent } from './layers/markers-demo.component';
import { LeafletPerformanceDemoComponent } from './performance/performance-demo.component';
import { LeafletWrapperComponent } from './performance/leaflet-wrapper.component';


@NgModule({
    imports: [
    CommonModule,
    FormsModule,
    LeafletCoreDemoComponent,
    LeafletEventsDemoComponent,
    LeafletLayersDemoComponent,
    LeafletNgForLayersDemoComponent,
    LeafletBaseLayersDemoComponent,
    LeafletMarkersDemoComponent,
    LeafletPerformanceDemoComponent,
    LeafletMultiMapDemoComponent,
    LeafletWrapperComponent
],
    declarations: [LeafletDemoComponent],
    exports: [
        LeafletDemoComponent
    ],
    bootstrap: [LeafletDemoComponent],
    providers: []
})
export class LeafletDemoModule { }
