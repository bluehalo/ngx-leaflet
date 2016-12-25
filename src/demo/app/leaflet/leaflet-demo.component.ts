import { Component } from '@angular/core';

@Component({
	selector: 'leafletDemo',
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
