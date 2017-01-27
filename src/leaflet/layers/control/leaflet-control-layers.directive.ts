import { Directive, Input, OnChanges, OnInit, SimpleChange } from '@angular/core';

import { LeafletDirective } from '../../core/leaflet.directive';
import { LeafletDirectiveWrapper } from '../../core/leaflet.directive.wrapper';
import { LeafletControlLayersWrapper } from './leaflet-control-layers.wrapper';


@Directive({
	selector: '[leafletLayersControl]'
})
export class LeafletLayersControlDirective
	implements OnChanges, OnInit {

	// Control Layers Configuration
	@Input('leafletLayersControl') layersControlConfig: any;

	@Input('leafletLayersControlOptions') layersControlOptions: any;

	private controlLayers: LeafletControlLayersWrapper;
	private leafletDirective: LeafletDirectiveWrapper;

	constructor(leafletDirective: LeafletDirective) {
		this.leafletDirective = new LeafletDirectiveWrapper(leafletDirective);
		this.controlLayers = new LeafletControlLayersWrapper();
	}

	ngOnInit() {

		// Init the map
		this.leafletDirective.init();

		// Set up all the initial settings
		this.controlLayers
			.init(this.layersControlConfig, this.layersControlOptions)
			.addTo(this.leafletDirective.getMap());

	}

	ngOnChanges(changes: { [key: string]: SimpleChange }) {

		// Set the layers
		if (changes['layersControlCfg']) {
			this.controlLayers.setLayersControlConfig(
				changes['layersControlCfg'].currentValue,
				changes['layersControlCfg'].previousValue);
		}

	}

}
