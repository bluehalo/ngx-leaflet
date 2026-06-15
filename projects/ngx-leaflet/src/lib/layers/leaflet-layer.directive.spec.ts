import { Component, SimpleChange, ChangeDetectionStrategy } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { circleMarker, CircleMarker, LeafletEvent } from 'leaflet';

import { LeafletDirective } from '../core/leaflet.directive';
import { LeafletLayerDirective } from './leaflet-layer.directive';


@Component({
	imports: [LeafletDirective, LeafletLayerDirective],
	changeDetection: ChangeDetectionStrategy.Eager,
	template: `
		<div style="width: 400px; height: 400px;"
			leaflet
			[leafletOptions]="{}"
			[leafletLayer]="layer"
			(leafletLayerAdd)="onAdd($event)"
			(leafletLayerRemove)="onRemove($event)">
		</div>
	`
})
class TestHostComponent {
	layer: CircleMarker = undefined;

	addEvents: LeafletEvent[] = [];
	removeEvents: LeafletEvent[] = [];

	onAdd(e: LeafletEvent) { this.addEvents.push(e); }
	onRemove(e: LeafletEvent) { this.removeEvents.push(e); }
}


describe('LeafletLayerDirective', () => {

	let fixture: ComponentFixture<TestHostComponent>;
	let host: TestHostComponent;
	let directive: LeafletLayerDirective;
	let leafletDirective: LeafletDirective;

	function init() {
		fixture.detectChanges();
		const el = fixture.debugElement.query(By.directive(LeafletLayerDirective));
		directive = el.injector.get(LeafletLayerDirective);
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
	// Layer add
	// -------------------------------------------------------------------------

	describe('layer input', () => {

		it('should add the layer to the map on init', () => {
			host.layer = circleMarker([0, 0]);
			init();
			expect(leafletDirective.map.hasLayer(host.layer)).toBeTrue();
		});

		it('should not throw when layer input is null on init', () => {
			expect(() => init()).not.toThrow();
		});

	});


	// -------------------------------------------------------------------------
	// Layer remove / destroy
	// -------------------------------------------------------------------------

	describe('destruction', () => {

		it('should remove the layer from the map on destroy', () => {
			host.layer = circleMarker([0, 0]);
			init();

			const removeSpy = spyOn(host.layer, 'remove').and.callThrough();
			fixture.destroy();

			expect(removeSpy).toHaveBeenCalled();
		});

		it('should not throw on destroy when layer is null', () => {
			init();
			expect(() => fixture.destroy()).not.toThrow();
		});

	});


	// -------------------------------------------------------------------------
	// Layer swap via ngOnChanges
	// -------------------------------------------------------------------------

	describe('ngOnChanges', () => {

		it('should add the new layer and remove the old layer when input changes', () => {
			const layerA = circleMarker([10, 10]);
			const layerB = circleMarker([20, 20]);

			host.layer = layerA;
			init();
			expect(leafletDirective.map.hasLayer(layerA)).toBeTrue();

			// Swap to layerB via ngOnChanges directly
			directive.layer = layerB;
			directive.ngOnChanges({
				layer: new SimpleChange(layerA, layerB, false)
			});

			expect(leafletDirective.map.hasLayer(layerA)).toBeFalse();
			expect(leafletDirective.map.hasLayer(layerB)).toBeTrue();
		});

		it('should handle swapping from a null layer to a real layer', () => {
			init(); // layer is null
			const layer = circleMarker([5, 5]);

			directive.layer = layer;
			directive.ngOnChanges({
				layer: new SimpleChange(null, layer, false)
			});

			expect(leafletDirective.map.hasLayer(layer)).toBeTrue();
		});

		it('should handle swapping from a real layer to null', () => {
			host.layer = circleMarker([0, 0]);
			init();

			directive.ngOnChanges({
				layer: new SimpleChange(host.layer, null, false)
			});

			expect(leafletDirective.map.hasLayer(host.layer)).toBeFalse();
		});

	});


	// -------------------------------------------------------------------------
	// Layer event outputs
	// -------------------------------------------------------------------------

	describe('leafletLayerAdd output', () => {

		it('should emit when the Leaflet add event fires on the layer', () => {
			init();

			const layer = circleMarker([0, 0]);
			directive.layer = layer;
			directive.ngOnChanges({ layer: new SimpleChange(null, layer, false) });

			// Subscribe after the listener is wired up by ngOnChanges
			const received: LeafletEvent[] = [];
			directive.onAdd.subscribe((e) => received.push(e));

			// Fire the Leaflet event directly — tests that the directive wired the listener correctly
			layer.fire('add', {});

			expect(received.length).toBeGreaterThan(0);
		});

	});

	describe('leafletLayerRemove output', () => {

		it('should emit when the Leaflet remove event fires on the layer', () => {
			init();

			const layer = circleMarker([0, 0]);
			directive.layer = layer;
			directive.ngOnChanges({ layer: new SimpleChange(null, layer, false) });

			const received: LeafletEvent[] = [];
			directive.onRemove.subscribe((e) => received.push(e));

			layer.fire('remove', {});

			expect(received.length).toBeGreaterThan(0);
		});

	});

});
