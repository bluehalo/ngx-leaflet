/*! @asymmetrik/ngx-template - 4.0.0 - Copyright Asymmetrik, Ltd. 2007-2019 - All Rights Reserved. + */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core')) :
    typeof define === 'function' && define.amd ? define(['exports', '@angular/core'], factory) :
    (factory((global.ngxTemplate = {}),global.ng.core));
}(this, (function (exports,core) { 'use strict';

    var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
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
        ExampleComponent = __decorate([
            core.Component({
                selector: 'example-component',
                template: '{{message}}'
            })
        ], ExampleComponent);
        return ExampleComponent;
    }());

    var __decorate$1 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var ExampleModule = /** @class */ (function () {
        function ExampleModule() {
        }
        ExampleModule_1 = ExampleModule;
        ExampleModule.forRoot = function () {
            return { ngModule: ExampleModule_1, providers: [] };
        };
        var ExampleModule_1;
        ExampleModule = ExampleModule_1 = __decorate$1([
            core.NgModule({
                exports: [ExampleComponent],
                declarations: [ExampleComponent]
            })
        ], ExampleModule);
        return ExampleModule;
    }());

    exports.ExampleModule = ExampleModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ngx-template.js.map
