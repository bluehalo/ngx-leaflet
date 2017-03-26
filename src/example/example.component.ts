import { Component } from '@angular/core';

@Component({
	selector: 'example-component',
	template: '{{message}}'
})
export class ExampleComponent {
	message = 'Hello';

	ngOnInit() {
		setTimeout(() => {
			this.message += ' World';
		}, 1000);
	}

}
