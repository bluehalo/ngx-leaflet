import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ExampleModule } from '../../example/example.module';

@NgModule({
	imports: [
		BrowserModule,
		ExampleModule
	],
	declarations: [
		AppComponent
	],
	bootstrap: [ AppComponent ],
	providers: [ ]
})
export class AppModule { }
