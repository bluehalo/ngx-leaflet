/*! @asymmetrik/angular2-leaflet-1.0.14 - Copyright Asymmetrik, Ltd. 2007-2017 - All Rights Reserved.*/
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(factory());
}(this, (function () { 'use strict';

var leaflet_module_1 = require("./leaflet/leaflet.module");
exports.LeafletModule = leaflet_module_1.LeafletModule;
var leaflet_directive_1 = require("./leaflet/core/leaflet.directive");
exports.LeafletDirective = leaflet_directive_1.LeafletDirective;
var leaflet_directive_wrapper_1 = require("./leaflet/core/leaflet.directive.wrapper");
exports.LeafletDirectiveWrapper = leaflet_directive_wrapper_1.LeafletDirectiveWrapper;
var leaflet_control_layers_util_1 = require("./leaflet/layers/control/leaflet-control-layers.util");
exports.LeafletControlLayersUtil = leaflet_control_layers_util_1.LeafletControlLayersUtil;
var leaflet_layers_util_1 = require("./leaflet/layers/leaflet-layers.util");
exports.LeafletLayersUtil = leaflet_layers_util_1.LeafletLayersUtil;
var leaflet_tile_layer_definition_model_1 = require("./leaflet/layers/leaflet-tile-layer-definition.model");
exports.LeafletTileLayerDefinition = leaflet_tile_layer_definition_model_1.LeafletTileLayerDefinition;

})));
//# sourceMappingURL=angular2-leaflet.js.map
