import {useEffect, useLayoutEffect } from 'react';
import ArcadixFetchAndCacheData, { DataRef } from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';
import ApplicationState from '@shared/Framework/DataService/ApplicationState/ApplicationState';

/**
 * 
 * @param {*} state 
 * @summary   maps entity/application state to props of the component.
 */
export function mapStateToProps(state) {
    if (!global["mode"]) {
        return {
            contextmenu: DataRef(state.Entity,"contextmenu",true),
            contentObj: state.ApplicationState.contentObj
        };
    }
    else {
        return {};
    }
}
 
/**
 * 
 * @param {*} JConfiguration 
 * @param {*} props 
 * @summary   Get initials request params for the component.
 */
export function InitialDataParams(JConfiguration, props) {
    var objParams = {
        "ForeignKeyFilter": {},
        "SearchQuery": {
            "must": [
                {
                    "match": {
                        "vPageName": props.contentObj.PageName
                    }
                },
                {
                    "match": {
                        "vContextMenuType": props.contentObj.ContextMenuType
                    }
                } 
            ]  
        },
        "SortKeys": {},
        "OutputColumns": {}
    };
   
    var arrDataRequest = [       
        {
            "URL": "API/Object/Framework/ContextMenu",
            "Params": objParams,
            "MethodType": "Get"
        },
        
    ];
    return {
        "DataCalls": arrDataRequest
    }
};

/**
 * 
 * @param {*} arrParams
 * @summary   Calls FetchAndCacheData execute method to make the api call.
 */
export function dataCall(arrParams) {
    var objArcadixFetchAndCacheData = new ArcadixFetchAndCacheData();
    objArcadixFetchAndCacheData.Execute(arrParams);
    //ApplicationState.SetProperty("blnShowAnimation", false);
}

/**
 * 
 * @param {*} objContext 
 * @summary   Calls the DataCall method and the InitialDataParams.
 */
export function useDataLoader(objContext) {
    if(objContext.props.contentObj){
        Logger.Log("---------------",JSON.stringify(InitialDataParams(objContext.props.JConfiguration, objContext.props).DataCalls));
        const getRequiredData = () => {
            Logger.Log("getting required data");
            dataCall(InitialDataParams(objContext.props.JConfiguration, objContext.props).DataCalls);
        }
        useLayoutEffect(getRequiredData, [objContext.props.contentObj]);
    }
   
}

/**
 * 
 * @param {*} objContext 
 * @summary   Checks if the data is loaded to props and then set the component state accordingly.
 */
export function useDataLoaded(objContext) {
    useEffect(() => {
        if (!objContext.state.isLoadComplete && objContext.props.contentObj &&
            DataRef(objContext.props.contextmenu, "contextmenu;vPageName;" + objContext.props.contentObj.PageName + ";vContextMenuType;" + objContext.props.contentObj.ContextMenuType) 
        ) {
            objContext.dispatch({ type: "DATA_LOAD_COMPLETE", payload: true });           
        }
        else {
            Logger.Log("data is loading")
        }
    },
        [
            objContext.props.contextmenu
        ]);
}

/**
 * 
 * @param {*} state 
 * @param {*} action 
 * @summary   Maintain component state
 */
export function reducer(state, action) {
    switch (action.type) {
        case 'DATA_LOAD_COMPLETE': {
            return { ...state, ["isLoadComplete"]: action.payload }
        }
    }
}




