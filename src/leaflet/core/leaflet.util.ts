export class LeafletUtil {

	static mapToArray<T>(map: { [ key: string ]: T }): T[] {
		const toReturn: T[] = [];

		for (const k in map) {
			if (map.hasOwnProperty(k)) {
				toReturn.push(map[k]);
			}
		}

		return toReturn;
	}
}
