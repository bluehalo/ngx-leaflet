import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { LeafletDemoComponent } from './leaflet-demo.component';
import { LeafletCoreDemoComponent } from './core/core-demo.component';
import { LeafletLayersDemoComponent } from './layers/layers-demo.component';
import { LeafletModule } from '../../../leaflet/leaflet.module';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,

		LeafletModule
	],
	declarations: [
		LeafletDemoComponent,
		LeafletCoreDemoComponent,
		LeafletLayersDemoComponent
	],
	exports: [
		LeafletDemoComponent
	],
	bootstrap: [ LeafletDemoComponent ],
	providers: [ ]
})
export class LeafletDemoModule { }
