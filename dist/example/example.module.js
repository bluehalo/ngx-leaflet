import { NgModule } from '@angular/core';
import { ExampleComponent } from './example.component';
var ExampleModule = (function () {
    function ExampleModule() {
    }
    ExampleModule.forRoot = function () {
        return { ngModule: ExampleModule, providers: [] };
    };
    return ExampleModule;
}());
export { ExampleModule };
ExampleModule.decorators = [
    { type: NgModule, args: [{
                exports: [ExampleComponent],
                declarations: [ExampleComponent]
            },] },
];
/** @nocollapse */
ExampleModule.ctorParameters = function () { return []; };
//# sourceMappingURL=example.module.js.map