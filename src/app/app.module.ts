import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LeafletDemoModule } from './leaflet-demo/leaflet-demo.module';


@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		LeafletDemoModule
	],
	providers: [],
	bootstrap: [ AppComponent ]
})
export class AppModule { }
