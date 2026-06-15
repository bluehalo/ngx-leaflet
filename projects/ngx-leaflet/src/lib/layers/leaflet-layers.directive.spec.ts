import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { circleMarker, Layer, MapOptions } from 'leaflet';

import { LeafletDirective } from '../core/leaflet.directive';
import { LeafletLayersDirective } from './leaflet-layers.directive';


@Component({
	imports: [LeafletDirective, LeafletLayersDirective],
	changeDetection: ChangeDetectionStrategy.Eager,
	template: `
		<div style="width: 400px; height: 400px;"
			leaflet
			[leafletOptions]="options"
			[leafletLayers]="layers">
		</div>
	`
})
class TestHostComponent {
	options: MapOptions = {};
	layers: Layer[] = [];
}


describe('LeafletLayersDirective', () => {

	let fixture: ComponentFixture<TestHostComponent>;
	let host: TestHostComponent;
	let directive: LeafletLayersDirective;
	let leafletDirective: LeafletDirective;

	function init() {
		fixture.detectChanges();
		const el = fixture.debugElement.query(By.directive(LeafletLayersDirective));
		directive = el.injector.get(LeafletLayersDirective);
		leafletDirective = el.injector.get(LeafletDirective);
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

		it('should initialize with an empty layer array without error', () => {
			host.layers = [];
			init();
			expect(directive).toBeDefined();
		});

		it('should initialize with a null layer array without error', () => {
			host.layers = null;
			init();
			expect(directive).toBeDefined();
		});

		it('should add all layers present at init to the map', () => {
			const layer1 = circleMarker([0, 0]);
			const layer2 = circleMarker([1, 1]);
			host.layers = [layer1, layer2];
			init();

			const map = leafletDirective.getMap();
			expect(map.hasLayer(layer1)).toBeTrue();
			expect(map.hasLayer(layer2)).toBeTrue();
		});

	});


	// -------------------------------------------------------------------------
	// Layer changes
	// -------------------------------------------------------------------------

	describe('layer array changes', () => {

		it('should add a layer when a new array with an extra layer is set', () => {
			const layer1 = circleMarker([0, 0]);
			host.layers = [layer1];
			init();

			const layer2 = circleMarker([1, 1]);
			// Set directly on the directive to avoid NG0100 from template re-bind during detectChanges
			directive.layers = [layer1, layer2];

			const map = leafletDirective.getMap();
			expect(map.hasLayer(layer2)).toBeTrue();
		});

		it('should remove a layer when a new array with one fewer layer is set', () => {
			const layer1 = circleMarker([0, 0]);
			const layer2 = circleMarker([1, 1]);
			host.layers = [layer1, layer2];
			init();

			directive.layers = [layer1];

			const map = leafletDirective.getMap();
			expect(map.hasLayer(layer2)).toBeFalse();
			expect(map.hasLayer(layer1)).toBeTrue();
		});

		it('should remove old layers and add new ones when entire array is replaced', () => {
			const layer1 = circleMarker([0, 0]);
			const layer2 = circleMarker([1, 1]);
			host.layers = [layer1];
			init();

			directive.layers = [layer2];

			const map = leafletDirective.getMap();
			expect(map.hasLayer(layer1)).toBeFalse();
			expect(map.hasLayer(layer2)).toBeTrue();
		});

		it('should make no map changes when array reference changes but content is identical', () => {
			const layer1 = circleMarker([0, 0]);
			host.layers = [layer1];
			init();

			const map = leafletDirective.getMap();
			const addSpy = spyOn(map, 'addLayer').and.callThrough();
			const removeSpy = spyOn(map, 'removeLayer').and.callThrough();

			// New array reference, same layer instance — differ should detect no changes
			directive.layers = [layer1];

			expect(addSpy).not.toHaveBeenCalled();
			expect(removeSpy).not.toHaveBeenCalled();
		});

	});


	// -------------------------------------------------------------------------
	// Destruction
	// -------------------------------------------------------------------------

	describe('destruction', () => {

		it('should remove all layers from the map when destroyed', () => {
			const layer1 = circleMarker([0, 0]);
			const layer2 = circleMarker([1, 1]);
			host.layers = [layer1, layer2];
			init();

			const map = leafletDirective.getMap();
			fixture.destroy();

			expect(map.hasLayer(layer1)).toBeFalse();
			expect(map.hasLayer(layer2)).toBeFalse();
		});

	});

});
