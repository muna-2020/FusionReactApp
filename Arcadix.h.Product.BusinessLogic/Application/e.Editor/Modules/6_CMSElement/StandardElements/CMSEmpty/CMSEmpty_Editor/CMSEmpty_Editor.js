/**
 * ------------------------Required Imports----------------------------
 */
import React, { useLayoutEffect, useEffect } from 'react';
import { UndoRedoUpdate } from '@root/Application/e.Editor/PC/Modules/1_EditorFrame/UndoRedo/UndoRedo';
import * as Common from '@root/Framework/Blocks/Common/Common';
import ArcadixFetchAndCacheData, { DataRef } from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

/**
 * Copy-Paste This!!!!
 * @param {*} state 
 * @summary   maps entity/application state to props of the component.
 */
export function MapStateToProps(state, ownProps) {
    if (!global["mode"]) {
        return {
            ...ownProps,
            textresource: DataRef(state.Entity, "textresource", true)
        };
    }
    else {
        return {};
    }
}

/** 
 * Implement Required Action Handlers Allmust be wrapped in the UndoRedoUpdate function to ensure Undo-Redo functionality,
 * EXCEPT the default case and REPLACE key
 * REPLACE Action handler should be copy pasted as it is.
 * state reducer used for maintaining local state
 * @param {*} state 
 * @param {*} action 
 */
export const Reducer = (state, action) => {
    switch (action.type.toUpperCase()) {
        case "ACTION_KEY": {
            return UndoRedoUpdate({
                ...state, objCheckBox: {
                    ...state.objCheckBox,
                    Values: action.payload
                }
            });
        }
        case "REPLACE":
            return {
                ...action.payload
            };

        default: {
            return state;
        }
    }
};

/**
 * Implement other required methods to mke the component work after this.
 */

