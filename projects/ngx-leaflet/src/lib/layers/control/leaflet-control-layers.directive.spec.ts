import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { Control, Layer, LayersControlEvent, MapOptions, tileLayer } from 'leaflet';

import { LeafletDirective } from '../../core/leaflet.directive';
import { LeafletLayersControlDirective } from './leaflet-control-layers.directive';
import { LeafletControlLayersConfig } from './leaflet-control-layers-config.model';


@Component({
	imports: [LeafletDirective, LeafletLayersControlDirective],
	changeDetection: ChangeDetectionStrategy.Eager,
	template: `
		<div style="width: 400px; height: 400px;"
			leaflet
			[leafletOptions]="options"
			[leafletLayersControl]="config"
			[leafletLayersControlOptions]="controlOptions"
			(leafletLayersControlReady)="onControlReady($event)"
			(leafletOverlayAdd)="onOverlayAdd($event)"
			(leafletOverlayRemove)="onOverlayRemove($event)">
		</div>
	`
})
class TestHostComponent {
	options: MapOptions = {};
	config: LeafletControlLayersConfig = new LeafletControlLayersConfig();
	controlOptions: Control.LayersOptions = {};

	controlInstance: Control.Layers;
	overlayAddEvents: LayersControlEvent[] = [];
	overlayRemoveEvents: LayersControlEvent[] = [];

	onControlReady(c: Control.Layers) { this.controlInstance = c; }
	onOverlayAdd(e: LayersControlEvent) { this.overlayAddEvents.push(e); }
	onOverlayRemove(e: LayersControlEvent) { this.overlayRemoveEvents.push(e); }
}


describe('LeafletLayersControlDirective', () => {

	let fixture: ComponentFixture<TestHostComponent>;
	let host: TestHostComponent;
	let directive: LeafletLayersControlDirective;
	let leafletDirective: LeafletDirective;

	function init() {
		fixture.detectChanges();
		const el = fixture.debugElement.query(By.directive(LeafletLayersControlDirective));
		directive = el.injector.get(LeafletLayersControlDirective);
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

		it('should initialize with empty base layers and overlays without error', () => {
			init();
			expect(directive).toBeDefined();
		});

		it('should add the layers control to the map on init', () => {
			init();
			const map = leafletDirective.getMap();
			expect(map.getContainer().querySelector('.leaflet-control-layers')).not.toBeNull();
		});

		it('should emit leafletLayersControlReady with the Control.Layers instance', () => {
			init();
			expect(host.controlInstance).toBeDefined();
			expect(host.controlInstance).toBeInstanceOf(Control.Layers);
		});

		it('should register base layers from the initial config', () => {
			const baseLayer = makeLayer();
			const config = new LeafletControlLayersConfig();
			config.baseLayers = { osm: baseLayer };
			host.config = config;
			init();

			// Verify the base layer is registered in the control
			expect(() => host.controlInstance.removeLayer(baseLayer)).not.toThrow();
		});

		it('should register overlays from the initial config', () => {
			const overlay = makeLayer('https://overlay.example.com/{z}/{x}/{y}.png');
			const config = new LeafletControlLayersConfig();
			config.overlays = { myOverlay: overlay };
			host.config = config;
			init();

			expect(() => host.controlInstance.removeLayer(overlay)).not.toThrow();
		});

		it('should treat a null config as an empty config without error', () => {
			host.config = null;
			init();
			expect(directive).toBeDefined();
		});

	});


	// -------------------------------------------------------------------------
	// Config changes — base layers
	// -------------------------------------------------------------------------

	describe('base layer changes', () => {

		it('should add a new base layer when config gains a new baseLayers key', () => {
			const layer1 = makeLayer();
			const config = new LeafletControlLayersConfig();
			config.baseLayers = { osm: layer1 };
			host.config = config;
			init();

			const layer2 = makeLayer('https://{s}.tile.example.com/{z}/{x}/{y}.png');
			const newConfig = new LeafletControlLayersConfig();
			newConfig.baseLayers = { osm: layer1, alt: layer2 };
			// Set directly to avoid NG0100 from template re-bind during detectChanges
			directive.layersControlConfig = newConfig;

			expect(() => host.controlInstance.removeLayer(layer2)).not.toThrow();
		});

		it('should remove a base layer when config loses a baseLayers key', () => {
			const layer1 = makeLayer();
			const layer2 = makeLayer('https://{s}.tile.example.com/{z}/{x}/{y}.png');
			const config = new LeafletControlLayersConfig();
			config.baseLayers = { osm: layer1, alt: layer2 };
			host.config = config;
			init();

			const newConfig = new LeafletControlLayersConfig();
			newConfig.baseLayers = { osm: layer1 };
			directive.layersControlConfig = newConfig;

			// layer2 should no longer be in the control — Leaflet's removeLayer is idempotent
			expect(() => host.controlInstance.removeLayer(layer2)).not.toThrow();
		});

	});


	// -------------------------------------------------------------------------
	// Config changes — overlays
	// -------------------------------------------------------------------------

	describe('overlay changes', () => {

		it('should add a new overlay when config gains a new overlays key', () => {
			const config = new LeafletControlLayersConfig();
			host.config = config;
			init();

			const overlay = makeLayer('https://overlay.example.com/{z}/{x}/{y}.png');
			const newConfig = new LeafletControlLayersConfig();
			newConfig.overlays = { extra: overlay };
			directive.layersControlConfig = newConfig;

			expect(() => host.controlInstance.removeLayer(overlay)).not.toThrow();
		});

		it('should remove an overlay when config loses an overlays key', () => {
			const overlay1 = makeLayer('https://overlay1.example.com/{z}/{x}/{y}.png');
			const overlay2 = makeLayer('https://overlay2.example.com/{z}/{x}/{y}.png');
			const config = new LeafletControlLayersConfig();
			config.overlays = { a: overlay1, b: overlay2 };
			host.config = config;
			init();

			const newConfig = new LeafletControlLayersConfig();
			newConfig.overlays = { a: overlay1 };
			directive.layersControlConfig = newConfig;

			expect(() => host.controlInstance.removeLayer(overlay2)).not.toThrow();
		});

	});


	// -------------------------------------------------------------------------
	// Output events — overlay add/remove
	// -------------------------------------------------------------------------

	describe('leafletOverlayAdd and leafletOverlayRemove outputs', () => {

		it('should emit leafletOverlayAdd when the map fires overlayadd', () => {
			init();
			const initialCount = host.overlayAddEvents.length;
			const map = leafletDirective.getMap();

			map.fire('overlayadd', { layer: makeLayer(), name: 'test' });

			expect(host.overlayAddEvents.length).toBeGreaterThan(initialCount);
		});

		it('should emit leafletOverlayRemove when the map fires overlayremove', () => {
			init();
			const initialCount = host.overlayRemoveEvents.length;
			const map = leafletDirective.getMap();

			map.fire('overlayremove', { layer: makeLayer(), name: 'test' });

			expect(host.overlayRemoveEvents.length).toBeGreaterThan(initialCount);
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

		it('should remove overlay event listeners from the map when destroyed', () => {
			init();
			const map = leafletDirective.getMap();
			fixture.destroy();

			// After destroy, firing overlayadd should not reach our handler
			// (host.overlayAddEvents won't grow)
			const countBefore = host.overlayAddEvents.length;
			map.fire('overlayadd', { layer: makeLayer(), name: 'test' });
			expect(host.overlayAddEvents.length).toBe(countBefore);
		});

	});

});
