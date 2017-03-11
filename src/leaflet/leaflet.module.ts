import { ModuleWithProviders, NgModule } from '@angular/core';

import { LeafletDirective } from './core/leaflet.directive';
import { LeafletLayersDirective } from './layers/leaflet-layers.directive';
import { LeafletLayersControlDirective } from './layers/control/leaflet-control-layers.directive';
import { LeafletBaseLayersDirective } from './layers/base/leaflet-baselayers.directive';

@NgModule({
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
	]
})
export class LeafletModule {

	static forRoot(): ModuleWithProviders {
		return { ngModule: LeafletModule, providers: [] };
	}

}
