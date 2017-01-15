/*! @asymmetrik/angular2-template-0.0.9 - Copyright Asymmetrik, Ltd. 2007-2017 - All Rights Reserved.*/
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(factory());
}(this, (function () { 'use strict';

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

})));
//# sourceMappingURL=angular2-template.js.map
