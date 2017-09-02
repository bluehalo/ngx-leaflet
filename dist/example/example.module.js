import { NgModule } from '@angular/core';
import { ExampleComponent } from './example.component';
var ExampleModule = /** @class */ (function () {
    function ExampleModule() {
    }
    ExampleModule.forRoot = function () {
        return { ngModule: ExampleModule, providers: [] };
    };
    ExampleModule.decorators = [
        { type: NgModule, args: [{
                    exports: [ExampleComponent],
                    declarations: [ExampleComponent]
                },] },
    ];
    /** @nocollapse */
    ExampleModule.ctorParameters = function () { return []; };
    return ExampleModule;
}());
export { ExampleModule };
//# sourceMappingURL=example.module.js.map