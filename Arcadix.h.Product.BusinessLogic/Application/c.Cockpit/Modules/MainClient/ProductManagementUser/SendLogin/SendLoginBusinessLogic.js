import { useEffect } from 'react';
import ArcadixFetchAndCacheData, { DataRef } from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';
import ApplicationState from '@shared/Framework/DataService/ApplicationState/ApplicationState';
import * as FieldValidator from "@root/Framework/Services/Validator/Validator";

export function mapStateToProps(state) {
    if (!global["mode"]) {
        return {
            //intranetadministrator: DataRef(state.Entity, "intranetadministrator", true)
        };
    }
    else {
        Logger.Log("not mapping class");
        return {};
    }
}

export function GetInitialState() {
    return {
        isLoadComplete: false,
        strTotalCount: "",
        strPostedCount: "",
        strFailedCount: "",
        blnIsCancellable: false,
    }
}

export const Reducer = (state, action) => {
    switch (action.type) {
        case "DATA_LOAD_COMPLETE":
            return {
                ...state,
                ["isLoadComplete"]: action.payload
            }
        case 'SET_STATE_VALUES':
            return {
                ...state,
                ...action.payload
            };
    }
}