import { Component } from '@angular/core';

@Component({
	selector: 'leaflet-demo',
	templateUrl: './leaflet-demo.component.html'
})
export class LeafletDemoComponent {
	showDemo = false;

	ngOnInit() {

		// Primarily for debugging
		setTimeout(() => {
			this.showDemo = true;
		}, 1000);

	}
}
