import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { LeafletDemoComponent } from './leaflet-demo.component';
import { LeafletModule } from '../../../leaflet/leaflet.module';

@NgModule({
	imports: [
		BrowserModule,
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
