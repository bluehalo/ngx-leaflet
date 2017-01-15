(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@angular/core"], factory);
    }
})(function (require, exports) {
    "use strict";
    var core_1 = require("@angular/core");
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
        core_1.Component({
            selector: 'example-component',
            template: '{{message}}'
        }),
        __metadata("design:paramtypes", [])
    ], ExampleComponent);
    exports.ExampleComponent = ExampleComponent;
});

//# sourceMappingURL=example.component.js.map
