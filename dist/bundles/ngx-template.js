/*! @asymmetrik/ngx-template - 2.0.0 - Copyright Asymmetrik, Ltd. 2007-2017 - All Rights Reserved. + */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core')) :
	typeof define === 'function' && define.amd ? define(['exports', '@angular/core'], factory) :
	(factory((global.ngxTemplate = {}),global.ng.core));
}(this, (function (exports,core) { 'use strict';

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
        { type: core.Component, args: [{
                    selector: 'example-component',
                    template: '{{message}}'
                },] },
    ];
    /** @nocollapse */
    ExampleComponent.ctorParameters = function () { return []; };
    return ExampleComponent;
}());

var ExampleModule = /** @class */ (function () {
    function ExampleModule() {
    }
    ExampleModule.forRoot = function () {
        return { ngModule: ExampleModule, providers: [] };
    };
    ExampleModule.decorators = [
        { type: core.NgModule, args: [{
                    exports: [ExampleComponent],
                    declarations: [ExampleComponent]
                },] },
    ];
    /** @nocollapse */
    ExampleModule.ctorParameters = function () { return []; };
    return ExampleModule;
}());

exports.ExampleModule = ExampleModule;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ngx-template.js.map
