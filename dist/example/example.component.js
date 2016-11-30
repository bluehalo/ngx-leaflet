"use strict";
var core_1 = require('@angular/core');
var ExampleComponent = (function () {
    function ExampleComponent() {
        this.message = 'Hello';
    }
    ExampleComponent.prototype.ngOnInit = function () {
        this.message = 'World';
    };
    ExampleComponent = __decorate([
        core_1.Component({
            selector: 'example-component',
            template: '{{message}}'
        }), 
        __metadata('design:paramtypes', [])
    ], ExampleComponent);
    return ExampleComponent;
}());
exports.ExampleComponent = ExampleComponent;

//# sourceMappingURL=example.component.js.map
