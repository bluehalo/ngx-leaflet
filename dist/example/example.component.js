import { Component } from '@angular/core';
var ExampleComponent = /** @class */ (function () {
    function ExampleComponent() {
        this.message = 'Hello';
    }
    ExampleComponent.prototype.ngOnInit = function () {
        var _this = this;
        setTimeout(function () {
            _this.message += ' World';
        }, 1000);
    };
    ExampleComponent.decorators = [
        { type: Component, args: [{
                    selector: 'example-component',
                    template: '{{message}}'
                },] },
    ];
    return ExampleComponent;
}());
export { ExampleComponent };
//# sourceMappingURL=example.component.js.map