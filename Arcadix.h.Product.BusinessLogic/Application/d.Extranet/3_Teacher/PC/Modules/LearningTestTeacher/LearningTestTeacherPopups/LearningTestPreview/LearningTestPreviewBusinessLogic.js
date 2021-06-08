import { useLayoutEffect, useEffect } from 'react';


/**
 * 
 * @param {*} state 
 * @summary   maps entity/application state to props of the component.
 */
export function InitialDataParams(JConfiguration, props)
{
    let objTestPreviewLinkParams = {
        "uTestId": props.Data.TestId
    };
    let arrParams = [
        {
            "URL": "API/Extranet/Teacher/TeacherLearningTest/GetTestPreviewLink",
            "Params": objTestPreviewLinkParams
        }
    ];
    return { 
        "DataCalls": arrParams
    };
};

/**
 * 
 * @param {*} objContext 
 * @param {*} arrParams 
 * @summary   Call 'Execute' method of 'ArcadixFetch'.
 */
export function DataCall(objContext, arrParams){
    ArcadixFetchData.Execute(arrParams, function (objReturn) {
        let strTestPreviewLink = objReturn["TeacherLearningTest"]["Data"];
        objContext.dispatch({type:"SET_STATE_VALUES", payload:{ "strTestPreviewLink": strTestPreviewLink }});
    });
};

/**
 * 
 * @param {*} objContext 
 * @summary   Gets the InitialDataParams and ExtranetTestParams and passes them as a parameter to the DataCall method.
 */
export function useDataLoader(objContext)
{
    useEffect(() => {
        DataCall(objContext, InitialDataParams(objContext.props.JConfiguration, objContext.props).DataCalls);
    }, [])
}

/**
 * 
 * @param {*} objContext 
 * @summary   Checks if the data is loaded to props and then set the component state accordingly.
 */
export function useDataLoaded(objContext)
{
    useEffect(() => {
        if(objContext.state.strTestPreviewLink && objContext.state.strTestPreviewLink !== "")
        {
            if(!objContext.state.isLoadComplete)
            {
                objContext.dispatch({ type: "DATA_LOAD_COMPLETE", payload: true });
            }
            ApplicationState.SetProperty("blnShowAnimation", false);
        }
    }, [objContext.state.strTestPreviewLink]);
}

/**
 * @summary   returns the component initial state
 */
export function GetInitialState()
{
    return {
        isLoadComplete: false,
        strTestPreviewLink: ""
    };
};

/**
 * 
 * @param {*} state 
 * @param {*} action 
 * @summary   Sets the component state
 */
export function Reducer(state, action)
{
    switch(action.type)
    {
        case 'SET_STATE_VALUES':
        return{
            ...state,
            ...action.payload
        };
        case 'DATA_LOAD_COMPLETE':
        return{
            ...state,
            ["isLoadComplete"]: action.payload
        };
    }
};
