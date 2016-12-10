import { NgModule } from '@angular/core';

import { LeafletDirective } from './core/leaflet.directive';
import { LeafletLayersDirective } from './layers/leaflet-layers.directive';
import { LeafletLayersControlDirective } from './layers/leaflet-control-layers.directive';

@NgModule({
	imports: [],
	exports: [
		LeafletDirective,
		LeafletLayersDirective,
		LeafletLayersControlDirective
	],
	declarations: [
		LeafletDirective,
		LeafletLayersDirective,
		LeafletLayersControlDirective
	],
	providers: [
	]
})
export class LeafletModule { }
