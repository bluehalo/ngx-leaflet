import { Component } from '@angular/core';
import { LeafletDemoModule } from './leaflet-demo/leaflet-demo.module';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    standalone: true,
    imports: [LeafletDemoModule]
})
export class AppComponent {
	// Empty component
}
