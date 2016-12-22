import { Directive, Input, OnChanges, OnInit, SimpleChange } from '@angular/core';

import * as L from 'leaflet';

import { LeafletDirective } from '../core/leaflet.directive';
import { LeafletLayersControlBase } from './leaflet-control-layers.base';


@Directive({
	selector: '[leafletBaseLayers]'
})
export class LeafletBaseLayersDirective
	extends LeafletLayersControlBase
	implements OnChanges, OnInit {

	// Base Layers
	@Input('leafletBaseLayers') baseLayers: any;

	@Input('leafletLayersControlOptions') layersControlOptions: any;


	constructor(leafletDirective: LeafletDirective) {
		super(leafletDirective);
	}

	ngOnInit() {

		// This will initialize the map
		super.ngOnInit();

		// Set up all the initial settings
		this.initializeBaseLayers(this.baseLayers, this.layersControlOptions);

	}

	ngOnChanges(changes: { [key: string]: SimpleChange }) {

		// Set the new baseLayers
		if (changes['baseLayers']) {
			this.setBaseLayers(
				changes['baseLayers'].currentValue,
				changes['baseLayers'].previousValue);
		}

	}

	protected initializeBaseLayers(baseLayers: any, controlOptions: any) {
		super.initializeLayersControl({ baseLayers: baseLayers }, controlOptions);
	}

	protected setBaseLayers(newBaseLayers: L.Layer[], prevBaseLayers: L.Layer[]) {
		super.setLayersControlConfig({ baseLayers: newBaseLayers }, { baseLayers: prevBaseLayers });
	}

}
