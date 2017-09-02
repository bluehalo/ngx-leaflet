var LeafletControlLayersChanges = /** @class */ (function () {
    function LeafletControlLayersChanges() {
        this.layersRemoved = 0;
        this.layersChanged = 0;
        this.layersAdded = 0;
    }
    LeafletControlLayersChanges.prototype.changed = function () {
        return !(this.layersRemoved === 0 && this.layersChanged === 0 && this.layersAdded === 0);
    };
    return LeafletControlLayersChanges;
}());
export { LeafletControlLayersChanges };
//# sourceMappingURL=leaflet-control-layers-changes.model.js.map