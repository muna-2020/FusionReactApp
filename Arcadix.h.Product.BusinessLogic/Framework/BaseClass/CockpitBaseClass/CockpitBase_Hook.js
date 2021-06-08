import { DataRef } from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';
import * as Base_Hook from '@shared/Framework/BaseClass/Base_Hook';
/**
 * @name MapStoreToProps
 * @param {object} arrObjects store
 * @summary   maps entity/application state to props of the component.
 * @returns {object} component's props
 */
export function MapStoreToProps(arrObjects) {
    return Base_Hook.MapStoreToProps(arrObjects);
}

/**
* @name Reducer
* @param {object} objState  takes state
* @param {object} objAction  takes action
* @summary Reducer
* @returns {object} actions to perform
*/
export const Reducer = (objState, objAction) => {
    switch (objAction.type.toUpperCase()) {
        default:
            return Base_Hook.Reducer(objState, objAction);
    }
};

export function InitializeCss(props, objModuleProcessor) {
    Base_Hook.InitializeCss(props, objModuleProcessor);
}