import { NgModule } from '@angular/core';

import { LeafletDirective } from './core/leaflet.directive';
import { LeafletLayersDirective } from './layers/leaflet-layers.directive';
import { LeafletLayersControlDirective } from './layers/leaflet-control-layers.directive';
import { LeafletBaseLayersDirective } from './layers/leaflet-baselayers.directive';

@NgModule({
	imports: [],
	exports: [
		LeafletDirective,
		LeafletLayersDirective,
		LeafletLayersControlDirective,
		LeafletBaseLayersDirective
	],
	declarations: [
		LeafletDirective,
		LeafletLayersDirective,
		LeafletLayersControlDirective,
		LeafletBaseLayersDirective
	],
	providers: [
	]
})
export class LeafletModule { }
