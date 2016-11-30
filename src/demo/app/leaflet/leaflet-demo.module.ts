import { NgModule } from '@angular/core';

import { LeafletDemoComponent } from './leaflet-demo.component';
import { LeafletModule } from '../../../leaflet/leaflet.module';

@NgModule({
	imports: [
		LeafletModule
	],
	declarations: [
		LeafletDemoComponent
	],
	exports: [
		LeafletDemoComponent
	],
	bootstrap: [ LeafletDemoComponent ],
	providers: [ ]
})
export class LeafletDemoModule { }
