// React related imports.
import { useEffect } from 'react';

//Application state reducer of store.
import ApplicationState from '@shared/Framework/DataService/ApplicationState/ApplicationState';
import { DataRef } from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

/**
* @name GetInitialState
* @param {object} props Passes the props
* @summary Initializes the state
* @returns {object} initial state object
*/
export function GetInitialState(props) {
    return {
        isLoadComplete: false, //Local state to hold true when initial load is complete
        isHelpDataPresent: false, //Local state to hold true when help data load is complete. Only when this help data is present, we will show the JSX 
        arrHelpHistory: [],
        intHistoryIndex: 0,
        strPreviousHelpGroupKey: "",
        strPreviousHelpKey: ""
    };
}

/**
* @name Initialize
* @param {object} objContext Passes Context Object
* @summary Initialize the custom hooks
*/
export function Initialize(objContext) {
    useDataLoader(objContext);
    useDataLoaded(objContext);
    useShowHelp(objContext);
    useHelpGroupDataLoaded(objContext);
    useHelpDataLoaded(objContext);
}


/** 
* @name useDataLoader
* @param {object} objContext objContext
* @summary Gets the InitialDataParams and passes them as a parameter to the DataCall method.
*/
function useDataLoader(objContext){
    useEffect(() => {
        objContext.OnlineHelp_ComponentProcessor.LoadInitialData(objContext);
    }, []);
}

/**
* @name useDataLoaded
* @param {object} objContext Context object
* @summary use effect to set the Initial data
*/
function useDataLoaded(objContext) {
    useEffect(() => {
        if (!objContext.state.isLoadComplete && 
            //DataRef(objContext.props.Object_Framework_Services_HelpGroup, "Object_Framework_Services_HelpGroup;iApplicationTypeId;" + ClientUserDetails.ApplicationTypeId)["Data"]
            DataRef(objContext.props.Object_Framework_Services_HelpGroup, "Object_Framework_Services_HelpGroup;iApplicationTypeId;1")["Data"]
            ) {
            ApplicationState.SetProperty("blnShowAnimation", false);
            //let arrHelpGroup = DataRef(objContext.props.Object_Framework_Services_HelpGroup, "Object_Framework_Services_HelpGroup;iApplicationTypeId;" + ClientUserDetails.ApplicationTypeId)["Data"];
            objContext.dispatch({ type: "SET_STATE", payload: { "isLoadComplete": true} });
        }
    }, [objContext.props.Object_Framework_Services_HelpGroup]);
}

function useShowHelp(objContext) {
    useEffect(() => {
        if (objContext.state.isLoadComplete &&
            DataRef(objContext.props.Object_Framework_Services_HelpGroup, "Object_Framework_Services_HelpGroup;iApplicationTypeId;1")["Data"]
        ) {
            let arrHelpGroupData = DataRef(objContext.props.Object_Framework_Services_HelpGroup, "Object_Framework_Services_HelpGroup;iApplicationTypeId;1")["Data"];
            let objShowHelp = ApplicationState.GetProperty("ShowHelp");
            arrHelpGroupData.map(objHelpGroupData => {
                if (objHelpGroupData.vHelpGroupKey == objShowHelp.NavigationName && !objShowHelp.ShowHelpIcon) {
                    ApplicationState.SetProperty("ShowHelp", { NavigationName: objShowHelp.NavigationName, ShowHelpIcon: true, ShowAt: objShowHelp.ShowAt });
                }
            });
        }
    }, [objContext.props.ShowHelp]);
}

/**
* @name useHelpGroupDataLoaded
* @param {object} objContext Context object
* @summary use effect to set get the Help data
*/
function useHelpGroupDataLoaded(objContext) {
    useEffect(() => {
        if (objContext.state.isLoadComplete &&
            //DataRef(objContext.props.Object_Framework_Services_HelpGroup, "Object_Framework_Services_HelpGroup;iApplicationTypeId;" + ClientUserDetails.ApplicationTypeId)["Data"] &&
            DataRef(objContext.props.Object_Framework_Services_HelpGroup, "Object_Framework_Services_HelpGroup;iApplicationTypeId;1")["Data"] &&
            objContext.props.OnlineHelpGroupObject.OnlineHelpGroupKey
        ) {
            let objHelpGroup = objContext.OnlineHelp_ComponentProcessor.GetHelpGroup(objContext);
            if (objHelpGroup)
                objContext.OnlineHelp_ComponentProcessor.GetHelp(objContext, objHelpGroup);
            let strOnlineHelpGroupKey = objContext.props.OnlineHelpGroupObject.OnlineHelpGroupKey;
            let strOnlineHelpKey = objContext.props.OnlineHelpGroupObject.OnlineHelpKey;
            if (objContext.state.intHistoryIndex == 0) {
                objContext.dispatch({
                    type: "SET_STATE",
                    payload: {
                        "strPreviousHelpGroupKey": strOnlineHelpGroupKey,
                        "strPreviousHelpKey": strOnlineHelpKey,
                        "arrHelpHistory": [...objContext.state.arrHelpHistory, strOnlineHelpGroupKey + "_" + strOnlineHelpKey],
                        "intHistoryIndex": objContext.state.intHistoryIndex + 1
                    }
                });
            }
        }
    }, [objContext.props.OnlineHelpGroupObject]);
}

/**
* @name useHelpDataLoaded
* @param {object} objContext Context object
* @summary use effect to set get the Help data
*/
function useHelpDataLoaded(objContext) {
    useEffect(() => {
        if (objContext.state.isLoadComplete &&
            !objContext.state.isHelpDataPresent &&
            //DataRef(objContext.props.Object_Framework_Services_HelpGroup, "Object_Framework_Services_HelpGroup;iApplicationTypeId;" + ClientUserDetails.ApplicationTypeId)["Data"]
            DataRef(objContext.props.Object_Framework_Services_HelpGroup, "Object_Framework_Services_HelpGroup;iApplicationTypeId;1")["Data"]
        ) {
            let objHelpGroup = objContext.OnlineHelp_ComponentProcessor.GetHelpGroup(objContext);
            if (
                DataRef(objContext.props.Object_Framework_Services_Help, "Object_Framework_Services_Help;uHelpGroupId;" + objHelpGroup["uHelpGroupId"])["Data"]
            ) {
                objContext.dispatch({ type: "SET_STATE", payload: { "isHelpDataPresent": true } });
            }
        }
    }, [objContext.props.Object_Framework_Services_Help]);
}