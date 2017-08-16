export class LeafletUtil {

	static mapToArray<T>(map: { [ key: string ]: T }): T[] {
		let toReturn: T[] = [];

		for (let k in map) {
			if (map.hasOwnProperty(k)) {
				toReturn.push(map[k]);
			}
		}

		return toReturn;
	}
}
