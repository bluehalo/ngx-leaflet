import { EventEmitter, NgZone } from '@angular/core';

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

	static handleEvent<T>(zone: NgZone, eventEmitter: EventEmitter<T>, event: T) {

		// Don't want to emit if there are no observers
		if (0 < eventEmitter.observers.length) {
			zone.run(() => {
				eventEmitter.emit(event);
			});
		}

	}
}
