import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeafletDemoComponent } from './leaflet-demo.component';
import { LeafletModule } from '../../../leaflet/leaflet.module';

@NgModule({
	imports: [
		CommonModule,
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
