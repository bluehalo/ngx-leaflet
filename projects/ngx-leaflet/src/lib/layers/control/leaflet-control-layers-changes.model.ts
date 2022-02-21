export class LeafletControlLayersChanges {
	layersRemoved: number = 0;
	layersChanged: number = 0;
	layersAdded: number = 0;

	changed(): boolean {
		return !(this.layersRemoved === 0 && this.layersChanged === 0 && this.layersAdded === 0);
	}
}
