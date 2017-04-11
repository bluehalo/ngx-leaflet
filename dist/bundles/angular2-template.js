/*! @asymmetrik/angular2-template - 1.3.0 - Copyright Asymmetrik, Ltd. 2007-2017 - All Rights Reserved. + */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core')) :
	typeof define === 'function' && define.amd ? define(['exports', '@angular/core'], factory) :
	(factory((global.angular2Template = global.angular2Template || {}),global.ng.core));
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
ExampleComponent.decorators = [
    { type: _angular_core.Component, args: [{
                selector: 'example-component',
                template: '{{message}}'
            },] },
];
/** @nocollapse */
ExampleComponent.ctorParameters = function () { return []; };

var ExampleModule = (function () {
    function ExampleModule() {
    }
    ExampleModule.forRoot = function () {
        return { ngModule: ExampleModule, providers: [] };
    };
    return ExampleModule;
}());
ExampleModule.decorators = [
    { type: _angular_core.NgModule, args: [{
                exports: [ExampleComponent],
                declarations: [ExampleComponent]
            },] },
];
/** @nocollapse */
ExampleModule.ctorParameters = function () { return []; };

exports.ExampleModule = ExampleModule;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=angular2-template.js.map
