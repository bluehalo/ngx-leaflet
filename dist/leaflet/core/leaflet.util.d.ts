import { EventEmitter, NgZone } from '@angular/core';
export declare class LeafletUtil {
    static mapToArray<T>(map: {
        [key: string]: T;
    }): T[];
    static handleEvent<T>(zone: NgZone, eventEmitter: EventEmitter<T>, event: T): void;
}
