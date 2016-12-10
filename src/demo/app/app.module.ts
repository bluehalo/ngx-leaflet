import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LeafletDrawDemoModule } from './leaflet-draw/leaflet-draw-demo.module';


@NgModule({
	imports: [
		BrowserModule,
		LeafletDrawDemoModule
	],
	declarations: [
		AppComponent
	],
	bootstrap: [ AppComponent ],
	providers: [ ]
})
export class AppModule { }
