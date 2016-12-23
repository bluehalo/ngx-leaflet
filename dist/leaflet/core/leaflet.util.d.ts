export declare class LeafletUtil {
    /**
     * Combine two associative arrays in a shallow manner. Where there are duplicate properties,
     * the value in the second object will overwrite the value of the first object
     *
     * @param aMap The first object
     * @param bMap The second object
     * @returns {{}} The aggregate of both objects
     */
    static mergeMaps<T>(aMap: {
        [key: string]: T;
    }, bMap: {
        [key: string]: T;
    }): {
        [key: string]: T;
    };
    /**
     * Subtracts the properties of an associative array in a shallow manner.
     * Where there are duplicate properties, the properties will be removed
     * from the first object.
     *
     * @param aMap The object from which to subtract properties
     * @param bMap The object containing properties to subtract
     * @returns {{}}
     */
    static mapSubtract<T>(aMap: {
        [key: string]: T;
    }, bMap: {
        [key: string]: T;
    }): {
        [key: string]: T;
    };
    static mapToArray<T>(map: {
        [key: string]: T;
    }): T[];
}
