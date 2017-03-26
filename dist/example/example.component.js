import { Component } from '@angular/core';
var ExampleComponent = (function () {
    function ExampleComponent() {
        this.message = 'Hello';
    }
    ExampleComponent.prototype.ngOnInit = function () {
        var _this = this;
        setTimeout(function () {
            _this.message += ' World';
        }, 1000);
    };
    return ExampleComponent;
}());
export { ExampleComponent };
ExampleComponent.decorators = [
    { type: Component, args: [{
                selector: 'example-component',
                template: '{{message}}'
            },] },
];
/** @nocollapse */
ExampleComponent.ctorParameters = function () { return []; };
//# sourceMappingURL=example.component.js.map