(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./example/example.module"], factory);
    }
})(function (require, exports) {
    "use strict";
    var example_module_1 = require("./example/example.module");
    exports.ExampleModule = example_module_1.ExampleModule;
});

//# sourceMappingURL=index.js.map
