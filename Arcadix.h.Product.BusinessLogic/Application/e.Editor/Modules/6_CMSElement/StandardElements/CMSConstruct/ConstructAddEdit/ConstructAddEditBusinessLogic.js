import React, { useLayoutEffect, useEffect } from 'react';
import ArcadixFetchAndCacheData, { DataRef } from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

/**
 * 
 * @param {*} JConfiguration 
 * @param {*} props 
 */
export function InitialDataParams(JConfiguration, props) {
    let objResourceParams = {
        "SearchQuery": {
            "must": [
                {
                    "match": {
                        "Id": JConfiguration.LanguageCultureInfo + "/e.Editor/Modules/6_CMSElement/CMSConstruct/ConstructAddEdit"
                    }
                }
            ]
        }
    };

    let arrDataRequest = [
        {
            "URL": "API/Object/Modules/CMSConstructInstance/CMSConstructInstance",
            "MethodType": "Get",
        },
        {
            "URL": "API/Object/Blocks/TextResource/TextResource",
            "Params": objResourceParams,
            "MethodType": "Get",
            "ReturnDataOnServerRender": true
        }
    ];

    return { "DataCalls": arrDataRequest };
}

/**
 * 
 * @param {*} state 
 */
export function mapStateToProps(state) {
    if (!global["mode"]) {
        return {
            textresource: DataRef(state.Entity, "textresource", true),
            constructaddedit: state.Entity.cmsconstructinstance,
        };
    } else {
        return {};
    }
}

/**
 * 
 * @param {*} arrParams
 * @summary   Calls FetchAndCacheData execute method to make the api call.
 */
export function DataCall(objParams) {
    var objArcadixFetchAndCacheData = new ArcadixFetchAndCacheData();
    return new Promise(function (resolve, reject) {
        objArcadixFetchAndCacheData.Execute(objParams, function (objReturn) {
            console.log("Image Args", objReturn);
            resolve({ success: true });
        });
    });
}

/**
 * 
 * @param {*} objContext 
 * @summary   Calls the DataCall method and the InitialDataParams.
 */
export function useDataLoader(props) {
    useLayoutEffect(() => {
        console.log("getting required data");
        DataCall(InitialDataParams(props.JConfiguration, props).DataCalls)
            .then(json => {
                if (json.success) {
                    console.log("datacall result", json);
                }
            });
    }, []);
};

/**
 * 
 * @param {*} objContext 
 * @summary   Checks if the data is loaded to props and then set the component state accordingly.
 */
export function useDataLoaded(props, state, dispatch) {
    useEffect(() => {
        if (!state.isLoadComplete &&
            DataRef(props.cmspage)
        ) {
            dispatch({ type: "DATA_LOAD_COMPLETE", payload: true })
        }
        else {
            console.log("data is loading")
        }
    },
        [
            props.constructaddedit,
        ]);
}

/** state reducer used for maintaining local state
 * @param {*} state 
 * @param {*} action 
 */
export function reducer(state, action) {
    switch (action.type) {
        case 'DATA_LOAD_COMPLETE': {
            return { ...state, ["isLoadComplete"]: action.payload }
        }
        case 'ADDNODES': return {
            ...state,
            arrNodes: action.payload
        }
        case 'SETSELECTEDIMAGE': return {
            ...state,
            SelectedImage: action.payload
        }
        default: return state;
    }
}

/**
 * recursivly create tree from array
 * @param {*} arrNodes 
 */
export const CreateTree = (arrNodes) => {
    let arrRoot = arrNodes.filter(item => item.Id == 0 && item.PId == "-1");
    arrRoot = arrRoot.map(Node => {
        return { ...Node, Children: GetChildren(Node.Id, arrNodes) }
    });
    return arrRoot;
}

const GetChildren = (intParentId, arrNodes) => {
    let arrChildren = arrNodes.filter(item => item.PId == intParentId);
    arrChildren = arrChildren.map(objChild => {
        return { ...objChild, Children: GetChildren(objChild["Id"], arrNodes) }
    });
    return arrChildren;
}