import { Component, SimpleChange, ChangeDetectionStrategy } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { latLng, latLngBounds, LatLng, LatLngBounds, LeafletEvent, LeafletMouseEvent, Map, MapOptions } from 'leaflet';

import { LeafletDirective } from './leaflet.directive';


@Component({
	imports: [LeafletDirective],
	changeDetection: ChangeDetectionStrategy.Eager,
	template: `
		<div style="width: 400px; height: 400px;"
			leaflet
			[leafletOptions]="options"
			[leafletZoom]="zoom"
			[leafletCenter]="center"
			(leafletMapReady)="onMapReady($event)"
			(leafletZoomChange)="onZoomChange($event)"
			(leafletCenterChange)="onCenterChange($event)">
		</div>
	`
})
class TestHostComponent {
	options: MapOptions = {};
	zoom: number = undefined;
	center: LatLng = undefined;

	mapInstance: Map;
	zoomChanges: number[] = [];
	centerChanges: LatLng[] = [];

	onMapReady(m: Map) { this.mapInstance = m; }
	onZoomChange(z: number) { this.zoomChanges.push(z); }
	onCenterChange(c: LatLng) { this.centerChanges.push(c); }
}


describe('LeafletDirective', () => {

	let fixture: ComponentFixture<TestHostComponent>;
	let host: TestHostComponent;
	let directive: LeafletDirective;

	/**
	 * Run fixture.detectChanges() and resolve the directive instance.
	 * Always call this AFTER setting any initial inputs on host.
	 */
	function init() {
		fixture.detectChanges();
		const el = fixture.debugElement.query(By.directive(LeafletDirective));
		directive = el.injector.get(LeafletDirective);
	}

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [TestHostComponent]
		});

		fixture = TestBed.createComponent(TestHostComponent);
		host = fixture.componentInstance;
		// Do NOT call detectChanges here — each test sets up initial state first.
	});

	afterEach(() => {
		fixture.destroy();
	});


	// -------------------------------------------------------------------------
	// Map lifecycle
	// -------------------------------------------------------------------------

	describe('initialization', () => {

		it('should create a Leaflet map on init', () => {
			init();
			expect(directive.map).toBeDefined();
			expect(directive.map).toBeInstanceOf(Map);
		});

		it('should expose the map via getMap()', () => {
			init();
			expect(directive.getMap()).toBe(directive.map);
		});

	});


	describe('destruction', () => {

		it('should remove the map on destroy', () => {
			init();
			const removeSpy = spyOn(directive.map, 'remove').and.callThrough();
			fixture.destroy();
			expect(removeSpy).toHaveBeenCalled();
		});

		it('should remove all map event listeners on destroy', () => {
			init();
			const offSpy = spyOn(directive.map, 'off').and.callThrough();
			fixture.destroy();
			expect(offSpy).toHaveBeenCalled();
		});

	});


	// -------------------------------------------------------------------------
	// Outputs
	// -------------------------------------------------------------------------

	describe('leafletMapReady output', () => {

		it('should emit the map instance on init', () => {
			init();
			expect(host.mapInstance).toBeDefined();
			expect(host.mapInstance).toBe(directive.map);
		});

	});


	// -------------------------------------------------------------------------
	// Input bindings — zoom and center
	// -------------------------------------------------------------------------

	describe('leafletZoom and leafletCenter inputs', () => {

		it('should call setView when both zoom and center are provided on init', fakeAsync(() => {
			host.zoom = 5;
			host.center = latLng(10, 20);
			init();
			tick(200); // flush delayResize timer

			expect(directive.map.getZoom()).toBe(5);
			const c = directive.map.getCenter();
			expect(c.lat).toBeCloseTo(10, 1);
			expect(c.lng).toBeCloseTo(20, 1);
		}));

		it('should not call setView when only zoom is set (center is null)', () => {
			host.zoom = 3;
			init();
			// Map has no center/zoom — setView was not called, no error thrown
			expect(directive.map).toBeDefined();
		});

		it('should update zoom via ngOnChanges after init', fakeAsync(() => {
			host.zoom = 4;
			host.center = latLng(0, 0);
			init();
			tick(200);

			// Change zoom via directive input directly (avoids NG0100 from template re-bind)
			directive.zoom = 9;
			directive.ngOnChanges({ zoom: new SimpleChange(4, 9, false) });

			expect(directive.map.getZoom()).toBe(9);
		}));

		it('should update center via ngOnChanges after init', fakeAsync(() => {
			host.zoom = 4;
			host.center = latLng(0, 0);
			init();
			tick(200);

			const newCenter = latLng(51.505, -0.09);
			directive.center = newCenter;
			directive.ngOnChanges({ center: new SimpleChange(latLng(0, 0), newCenter, false) });

			const c = directive.map.getCenter();
			expect(c.lat).toBeCloseTo(51.505, 1);
			expect(c.lng).toBeCloseTo(-0.09, 1);
		}));

	});


	// -------------------------------------------------------------------------
	// Output bindings — zoomChange and centerChange
	// -------------------------------------------------------------------------

	describe('leafletZoomChange output', () => {

		it('should emit when the map zoom changes', fakeAsync(() => {
			host.zoom = 4;
			host.center = latLng(0, 0);
			init();
			tick(200);

			const initialCount = host.zoomChanges.length;

			// Trigger a zoom change directly on the Leaflet map (animate: false fires zoomend synchronously)
			directive.map.setZoom(7, { animate: false });

			expect(host.zoomChanges.length).toBeGreaterThan(initialCount);
			expect(host.zoomChanges[host.zoomChanges.length - 1]).toBe(7);
		}));

	});


	describe('leafletCenterChange output', () => {

		it('should emit when the map center changes', fakeAsync(() => {
			host.zoom = 4;
			host.center = latLng(0, 0);
			init();
			tick(200);

			const initialCount = host.centerChanges.length;

			directive.map.panTo(latLng(48.8566, 2.3522), { animate: false });

			expect(host.centerChanges.length).toBeGreaterThan(initialCount);
			const emitted = host.centerChanges[host.centerChanges.length - 1];
			expect(emitted.lat).toBeCloseTo(48.8566, 1);
			expect(emitted.lng).toBeCloseTo(2.3522, 1);
		}));

	});


	// -------------------------------------------------------------------------
	// Input bindings — fitBounds, maxBounds, minZoom, maxZoom
	// -------------------------------------------------------------------------

	describe('leafletFitBounds input', () => {

		it('should call fitBounds on the map when set on init', () => {
			init();
			const bounds: LatLngBounds = latLngBounds(latLng(0, 0), latLng(10, 10));
			const spy = spyOn(directive.map, 'fitBounds').and.callThrough();

			directive.fitBounds = bounds;
			directive.ngOnChanges({ fitBounds: new SimpleChange(null, bounds, false) });

			expect(spy).toHaveBeenCalledWith(bounds, directive.fitBoundsOptions);
		});

		it('should not call fitBounds when value is null', () => {
			init();
			const spy = spyOn(directive.map, 'fitBounds').and.callThrough();

			directive.fitBounds = null;
			directive.ngOnChanges({ fitBounds: new SimpleChange(undefined, null, false) });

			expect(spy).not.toHaveBeenCalled();
		});

	});


	describe('leafletMaxBounds input', () => {

		it('should call setMaxBounds on the map when changed', () => {
			init();
			const bounds: LatLngBounds = latLngBounds(latLng(-90, -180), latLng(90, 180));
			const spy = spyOn(directive.map, 'setMaxBounds').and.callThrough();

			directive.maxBounds = bounds;
			directive.ngOnChanges({ maxBounds: new SimpleChange(null, bounds, false) });

			expect(spy).toHaveBeenCalledWith(bounds);
		});

		it('should not call setMaxBounds when value is null', () => {
			init();
			const spy = spyOn(directive.map, 'setMaxBounds').and.callThrough();

			directive.maxBounds = null;
			directive.ngOnChanges({ maxBounds: new SimpleChange(undefined, null, false) });

			expect(spy).not.toHaveBeenCalled();
		});

	});


	describe('leafletMinZoom and leafletMaxZoom inputs', () => {

		it('should call setMinZoom on the map when changed', () => {
			init();
			const spy = spyOn(directive.map, 'setMinZoom').and.callThrough();

			directive.minZoom = 2;
			directive.ngOnChanges({ minZoom: new SimpleChange(null, 2, false) });

			expect(spy).toHaveBeenCalledWith(2);
		});

		it('should call setMaxZoom on the map when changed', () => {
			init();
			const spy = spyOn(directive.map, 'setMaxZoom').and.callThrough();

			directive.maxZoom = 18;
			directive.ngOnChanges({ maxZoom: new SimpleChange(null, 18, false) });

			expect(spy).toHaveBeenCalledWith(18);
		});

		it('should not call setMinZoom when value is null', () => {
			init();
			const spy = spyOn(directive.map, 'setMinZoom').and.callThrough();

			directive.minZoom = null;
			directive.ngOnChanges({ minZoom: new SimpleChange(2, null, false) });

			expect(spy).not.toHaveBeenCalled();
		});

	});


	// -------------------------------------------------------------------------
	// Output bindings — mouse events
	// -------------------------------------------------------------------------

	describe('mouse event outputs', () => {

		it('should emit leafletClick when the map fires a click event', () => {
			init();
			const received: LeafletMouseEvent[] = [];
			directive.onClick.subscribe((e: LeafletMouseEvent) => received.push(e));

			directive.map.fire('click', { latlng: latLng(0, 0) });

			expect(received.length).toBe(1);
		});

		it('should emit leafletDoubleClick when the map fires a dblclick event', () => {
			// Disable doubleClickZoom so Leaflet's internal DoubleClickZoom handler exits early
			// and doesn't attempt a zoom operation (which requires a view to be set)
			host.options = { doubleClickZoom: false };
			init();
			const received: LeafletMouseEvent[] = [];
			directive.onDoubleClick.subscribe((e: LeafletMouseEvent) => received.push(e));

			directive.map.fire('dblclick', { latlng: latLng(0, 0), originalEvent: { shiftKey: false } });

			expect(received.length).toBe(1);
		});

		it('should emit leafletMouseDown when the map fires a mousedown event', () => {
			init();
			const received: LeafletMouseEvent[] = [];
			directive.onMouseDown.subscribe((e: LeafletMouseEvent) => received.push(e));

			directive.map.fire('mousedown', { latlng: latLng(0, 0) });

			expect(received.length).toBe(1);
		});

		it('should emit leafletMouseUp when the map fires a mouseup event', () => {
			init();
			const received: LeafletMouseEvent[] = [];
			directive.onMouseUp.subscribe((e: LeafletMouseEvent) => received.push(e));

			directive.map.fire('mouseup', { latlng: latLng(0, 0) });

			expect(received.length).toBe(1);
		});

		it('should emit leafletMouseMove when the map fires a mousemove event', () => {
			init();
			const received: LeafletMouseEvent[] = [];
			directive.onMouseMove.subscribe((e: LeafletMouseEvent) => received.push(e));

			directive.map.fire('mousemove', { latlng: latLng(0, 0) });

			expect(received.length).toBe(1);
		});

		it('should emit leafletMouseOver when the map fires a mouseover event', () => {
			init();
			const received: LeafletMouseEvent[] = [];
			directive.onMouseOver.subscribe((e: LeafletMouseEvent) => received.push(e));

			directive.map.fire('mouseover', { latlng: latLng(0, 0) });

			expect(received.length).toBe(1);
		});

		it('should emit leafletMouseOut when the map fires a mouseout event', () => {
			init();
			const received: LeafletMouseEvent[] = [];
			directive.onMouseOut.subscribe((e: LeafletMouseEvent) => received.push(e));

			directive.map.fire('mouseout', { latlng: latLng(0, 0) });

			expect(received.length).toBe(1);
		});

	});


	// -------------------------------------------------------------------------
	// Output bindings — map move events
	// -------------------------------------------------------------------------

	describe('map move event outputs', () => {

		it('should emit leafletMapMoveStart when the map fires movestart', () => {
			init();
			const received: LeafletEvent[] = [];
			directive.onMapMoveStart.subscribe((e: LeafletEvent) => received.push(e));

			directive.map.fire('movestart');

			expect(received.length).toBe(1);
		});

		it('should emit leafletMapMove when the map fires move', () => {
			init();
			const received: LeafletEvent[] = [];
			directive.onMapMove.subscribe((e: LeafletEvent) => received.push(e));

			directive.map.fire('move');

			expect(received.length).toBe(1);
		});

		it('should emit leafletMapMoveEnd when the map fires moveend', fakeAsync(() => {
			// outputUpdateHandler calls map.getCenter() on moveend — requires a view to be set
			host.zoom = 4;
			host.center = latLng(0, 0);
			init();
			tick(200);

			const received: LeafletEvent[] = [];
			directive.onMapMoveEnd.subscribe((e: LeafletEvent) => received.push(e));

			directive.map.fire('moveend');

			expect(received.length).toBe(1);
		}));

	});


	// -------------------------------------------------------------------------
	// Output bindings — map zoom events
	// -------------------------------------------------------------------------

	describe('map zoom event outputs', () => {

		it('should emit leafletMapZoomStart when the map fires zoomstart', () => {
			init();
			const received: LeafletEvent[] = [];
			directive.onMapZoomStart.subscribe((e: LeafletEvent) => received.push(e));

			directive.map.fire('zoomstart');

			expect(received.length).toBe(1);
		});

		it('should emit leafletMapZoom when the map fires zoom', () => {
			init();
			const received: LeafletEvent[] = [];
			directive.onMapZoom.subscribe((e: LeafletEvent) => received.push(e));

			directive.map.fire('zoom');

			expect(received.length).toBe(1);
		});

		it('should emit leafletMapZoomEnd when the map fires zoomend', fakeAsync(() => {
			// outputUpdateHandler calls map.getCenter() on zoomend — requires a view to be set
			host.zoom = 4;
			host.center = latLng(0, 0);
			init();
			tick(200);

			const received: LeafletEvent[] = [];
			directive.onMapZoomEnd.subscribe((e: LeafletEvent) => received.push(e));

			directive.map.fire('zoomend');

			expect(received.length).toBe(1);
		}));

	});


	// -------------------------------------------------------------------------
	// Window resize
	// -------------------------------------------------------------------------

	describe('window resize handling', () => {

		it('should call map.invalidateSize after a resize event', fakeAsync(() => {
			init();
			const spy = spyOn(directive.map, 'invalidateSize').and.callThrough();

			window.dispatchEvent(new Event('resize'));
			tick(200);

			expect(spy).toHaveBeenCalled();
		}));

	});

});
