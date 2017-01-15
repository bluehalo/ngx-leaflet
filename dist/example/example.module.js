"use strict";
var core_1 = require("@angular/core");
var example_component_1 = require("./example.component");
var ExampleModule = (function () {
    function ExampleModule() {
    }
    return ExampleModule;
}());
ExampleModule = __decorate([
    core_1.NgModule({
        imports: [],
        exports: [
            example_component_1.ExampleComponent
        ],
        declarations: [
            example_component_1.ExampleComponent
        ],
        providers: []
    })
], ExampleModule);
exports.ExampleModule = ExampleModule;

//# sourceMappingURL=example.module.js.map
