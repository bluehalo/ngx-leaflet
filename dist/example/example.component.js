import { Component, OnInit } from '@angular/core';
var ExampleComponent = /** @class */ (function () {
    function ExampleComponent() {
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
//# sourceMappingURL=example.component.js.map