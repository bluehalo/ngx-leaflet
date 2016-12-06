import { Directive, Input, OnChanges, OnInit, SimpleChange } from '@angular/core';

import * as L from 'leaflet';

import { LeafletDirective } from '../core/leaflet.directive';


@Directive({
	selector: '[leafletLayersControl]'
})
export class LeafletLayersControlDirective
	implements OnChanges, OnInit {

	leafletDirective: LeafletDirective;

	// Reference to the primary map object
	map: L.Map;

	// The layers control object
	layersControl: L.Control.Layers;

	// Control Layers Configuration
	@Input('leafletLayersControl') layersControlConfig: any;

	@Input('leafletLayersControlOptions') layersControlOptions: any;


	constructor(leafletDirective: LeafletDirective) {
		this.leafletDirective = leafletDirective;
	}

	ngOnInit() {

		// Set up all the initial settings
		this.initializeLayersControl(this.layersControlConfig, this.layersControlOptions);

	}

	ngOnChanges(changes: { [key: string]: SimpleChange }) {

		// Set the layers
		if (changes['layersControlCfg']) {
			this.setLayersControlConfig(changes['layersControlCfg'].currentValue);
		}

	}

	private initializeLayersControl(controlConfig: any, controlOptions: any) {

		let map = this.leafletDirective.getMap();

		if(null != map) {
			this.layersControl = L.control.layers(controlConfig, controlOptions)
				.addTo(map);
		}
	}

	private setLayersControlConfig(controlConfig: any) {

		let map = this.leafletDirective.getMap();

		if (null != map) {

			// Sync the sets of layers

		}

	}

}
