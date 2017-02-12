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
ExampleComponent = __decorate([
    Component({
        selector: 'example-component',
        template: '{{message}}'
    })
], ExampleComponent);
export { ExampleComponent };

//# sourceMappingURL=example.component.js.map
