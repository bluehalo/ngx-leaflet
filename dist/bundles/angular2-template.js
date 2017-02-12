/*! @asymmetrik/angular2-template-0.1.1 - Copyright Asymmetrik, Ltd. 2007-2017 - All Rights Reserved.*/
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core')) :
	typeof define === 'function' && define.amd ? define(['exports', '@angular/core'], factory) :
	(factory((global.angular2Sentio = global.angular2Sentio || {}),global.ng.core));
}(this, (function (exports,_angular_core) { 'use strict';

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
    _angular_core.Component({
        selector: 'example-component',
        template: '{{message}}'
    })
], ExampleComponent);

exports.ExampleModule = (function () {
    function ExampleModule() {
    }
    return ExampleModule;
}());
exports.ExampleModule = __decorate([
    _angular_core.NgModule({
        imports: [],
        exports: [
            ExampleComponent
        ],
        declarations: [
            ExampleComponent
        ],
        providers: []
    })
], exports.ExampleModule);

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=angular2-template.js.map
