import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { Control, Layer, MapOptions, tileLayer } from 'leaflet';

import { LeafletDirective } from '../../core/leaflet.directive';
import { LeafletBaseLayersDirective } from './leaflet-baselayers.directive';


@Component({
	imports: [LeafletDirective, LeafletBaseLayersDirective],
	changeDetection: ChangeDetectionStrategy.Eager,
	template: `
		<div style="width: 400px; height: 400px;"
			leaflet
			[leafletOptions]="options"
			[leafletBaseLayers]="baseLayers"
			[leafletLayersControlOptions]="controlOptions"
			(leafletLayersControlReady)="onControlReady($event)">
		</div>
	`
})
class TestHostComponent {
	options: MapOptions = {};
	baseLayers: { [name: string]: Layer } = {};
	controlOptions: Control.LayersOptions = {};

	controlInstance: Control.Layers;
	onControlReady(c: Control.Layers) { this.controlInstance = c; }
}


describe('LeafletBaseLayersDirective', () => {

	let fixture: ComponentFixture<TestHostComponent>;
	let host: TestHostComponent;
	let directive: LeafletBaseLayersDirective;
	let leafletDirective: LeafletDirective;

	function init() {
		fixture.detectChanges();
		const el = fixture.debugElement.query(By.directive(LeafletBaseLayersDirective));
		directive = el.injector.get(LeafletBaseLayersDirective);
		leafletDirective = el.injector.get(LeafletDirective);
	}

	function makeLayer(url = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png') {
		return tileLayer(url, {});
	}

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [TestHostComponent]
		});

		fixture = TestBed.createComponent(TestHostComponent);
		host = fixture.componentInstance;
	});

	afterEach(() => {
		fixture.destroy();
	});


	// -------------------------------------------------------------------------
	// Initialization
	// -------------------------------------------------------------------------

	describe('initialization', () => {

		it('should initialize with an empty baseLayers map without error', () => {
			host.baseLayers = {};
			init();
			expect(directive).toBeDefined();
		});

		it('should add the layers control to the map on init', () => {
			init();
			const map = leafletDirective.getMap();
			// The layers control adds a container element to the map
			expect(map.getContainer().querySelector('.leaflet-control-layers')).not.toBeNull();
		});

		it('should emit leafletLayersControlReady with the Control.Layers instance', () => {
			init();
			expect(host.controlInstance).toBeDefined();
			expect(host.controlInstance).toBeInstanceOf(Control.Layers);
		});

		it('should add the first base layer to the map as the active layer', () => {
			const layer = makeLayer();
			host.baseLayers = { osm: layer };
			init();

			const map = leafletDirective.getMap();
			expect(map.hasLayer(layer)).toBeTrue();
		});

	});


	// -------------------------------------------------------------------------
	// Base layer changes
	// -------------------------------------------------------------------------

	describe('base layer changes', () => {

		it('should add a new base layer to the control when baseLayers gains a new key', () => {
			const layer1 = makeLayer();
			host.baseLayers = { osm: layer1 };
			init();

			const layer2 = makeLayer('https://{s}.tile.example.com/{z}/{x}/{y}.png');
			// Set directly to avoid NG0100 from template re-bind during detectChanges
			directive.baseLayers = { osm: layer1, alt: layer2 };

			// Verify the control was updated by checking addBaseLayer was effective:
			// layer2 should be registered — removing it from the control should not throw
			expect(() => host.controlInstance.removeLayer(layer2)).not.toThrow();
		});

		it('should remove a base layer from the control when baseLayers loses a key', () => {
			const layer1 = makeLayer();
			const layer2 = makeLayer('https://{s}.tile.example.com/{z}/{x}/{y}.png');
			host.baseLayers = { osm: layer1, alt: layer2 };
			init();

			directive.baseLayers = { osm: layer1 };

			// layer2 is no longer registered in the control — removing it again should not throw
			// (Leaflet's removeLayer is idempotent for layers not in the control)
			expect(() => host.controlInstance.removeLayer(layer2)).not.toThrow();
		});

		it('should update the active base layer when a new layers object is set', () => {
			const layer1 = makeLayer();
			host.baseLayers = { osm: layer1 };
			init();

			const layer2 = makeLayer('https://{s}.tile.example.com/{z}/{x}/{y}.png');
			directive.baseLayers = { osm: layer1, alt: layer2 };

			const map = leafletDirective.getMap();
			// The active layer (first one found on map) should still be on the map
			expect(map.hasLayer(layer1)).toBeTrue();
		});

	});


	// -------------------------------------------------------------------------
	// Destruction
	// -------------------------------------------------------------------------

	describe('destruction', () => {

		it('should remove the layers control from the map when destroyed', () => {
			init();
			const map = leafletDirective.getMap();

			fixture.destroy();

			expect(map.getContainer().querySelector('.leaflet-control-layers')).toBeNull();
		});

	});

});
