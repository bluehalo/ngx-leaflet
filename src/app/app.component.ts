import { Component, ChangeDetectionStrategy } from '@angular/core';
import { LeafletDemoComponent } from './leaflet-demo/leaflet-demo.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [LeafletDemoComponent],
})
export class AppComponent {
    // Empty component
}
