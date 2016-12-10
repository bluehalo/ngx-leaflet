import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LeafletDemoModule } from './leaflet/leaflet-demo.module';


@NgModule({
	imports: [
		BrowserModule,
		LeafletDemoModule
	],
	declarations: [
		AppComponent
	],
	bootstrap: [ AppComponent ],
	providers: [ ]
})
export class AppModule { }
