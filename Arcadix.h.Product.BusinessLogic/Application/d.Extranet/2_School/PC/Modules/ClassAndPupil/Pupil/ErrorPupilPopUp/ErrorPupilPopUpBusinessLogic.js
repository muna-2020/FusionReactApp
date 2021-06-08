import { useLayoutEffect, useEffect } from 'react';
import ArcadixFetchAndCacheData , { DataRef } from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';
import ApplicationState from '@shared/Framework/DataService/ApplicationState/ApplicationState';

/**
 * 
 * @param {*} state 
 * @summary   maps entity/application state to props of the component.
 */
export function mapStateToProps(state) {
    if (!global["mode"]) {
        //Logger.Log("Mapping Pupil");
        return {
            textresource: DataRef(state.Entity,"textresource",true)
        };
    }
    else {
        //Logger.Log("not mapping pupil");
        return {};
    }
};

/**
 * 
 * @param {*} objContext 
 * @summary   Checks if the data(text resource, grid config, class group, gender) is loaded to props and then set the component state accordingly.
 */
export function useDataLoaded(objContext)
{
    useEffect(()=>{
        if(DataRef(objContext.props.textresource, "textresource;id;" + objContext.props.JConfiguration.LanguageCultureInfo + "/d.extranet/2_school/modules/classandpupil/pupil"))
        {
            ApplicationState.SetProperty("blnShowAnimation", false);
            if(!objContext.state.isLoadComplete)
            {
                objContext.dispatch({ type: "DATA_LOAD_COMPLETE", payload: true });
            }
        }
    },[objContext.props.textresource]);
}

/**
 * @summary Returns Initial state of the component.
 */
export function GetInitialState(){
    return {
        isLoadComplete: false
    };
}

/**
 * 
 * @param {*} state 
 * @param {*} action 
 * @summary   Maintain component state
 */
export const Reducer = (state, action) =>{
    switch(action.type)
    {
        case "DATA_LOAD_COMPLETE":
        return{
            ...state,
            ["isLoadComplete"]:action.payload
        };
        case "SET_STATE_VALUES":
        return {
            ...state,
            ...action.payload
        };
    }
}


