import { NgModule } from '@angular/core';

import { LeafletDirective } from './core/leaflet.directive';
import { LeafletBaseLayersDirective } from './layers/base/leaflet-baselayers.directive';
import { LeafletLayersControlDirective } from './layers/control/leaflet-control-layers.directive';
import { LeafletLayerDirective } from './layers/leaflet-layer.directive';
import { LeafletLayersDirective } from './layers/leaflet-layers.directive';

@NgModule({
  imports: [
    LeafletDirective,
    LeafletLayerDirective,
    LeafletLayersDirective,
    LeafletLayersControlDirective,
    LeafletBaseLayersDirective,
  ],
  exports: [
    LeafletDirective,
    LeafletLayerDirective,
    LeafletLayersDirective,
    LeafletLayersControlDirective,
    LeafletBaseLayersDirective,
  ],
})
export class LeafletModule {}
