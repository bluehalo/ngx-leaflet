import { NgModule } from '@angular/core';

import { LeafletDirective } from './core/leaflet.directive';
import { LeafletLayersDirective } from './layers/leaflet-layers.directive';

@NgModule({
	imports: [],
	exports: [
		LeafletDirective,
		LeafletLayersDirective
	],
	declarations: [
		LeafletDirective,
		LeafletLayersDirective
	],
	providers: [
	]
})
export class LeafletModule { }
