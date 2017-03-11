import { ModuleWithProviders, NgModule } from '@angular/core';

import { ExampleComponent } from './example.component';

@NgModule({
	exports: [ ExampleComponent ],
	declarations: [ ExampleComponent ]
})
export class ExampleModule {

	static forRoot(): ModuleWithProviders {
		return { ngModule: ExampleModule, providers: [] };
	}

}
