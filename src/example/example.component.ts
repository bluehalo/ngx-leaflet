import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'example-component',
	template: '{{message}}'
})
export class ExampleComponent implements OnInit {
	message = 'Hello';

	ngOnInit() {
		setTimeout(() => {
			this.message += ' World';
		}, 1000);
	}

}
