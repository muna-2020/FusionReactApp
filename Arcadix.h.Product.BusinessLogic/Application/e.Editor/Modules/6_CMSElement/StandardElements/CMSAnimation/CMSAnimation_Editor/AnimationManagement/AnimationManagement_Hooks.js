//React Imports
import { useEffect } from 'react';

//Application state Classes
import ApplicationState from '@shared/Framework/DataService/ApplicationState/ApplicationState';

/**
 * @name GetInitialState
 * @param {object} props component props
 * @summary Reducer
 * @returns {object} initial state object
 */
export function GetInitialState(props) {
    return {
        "ElementJson": null,
        "isLoadComplete": false
    };
}

/**
 * @name Initialize
 * @param {object} objContext {state, props, dispatch, Animationmanagement_ModuleProcessor}
 * @summary Initialize the custom hooks
 */
export function Initialize(objContext) {

    /**
     * @name useEffect
     * @summary Updates the local state.
     */
    useEffect(() => {
        if (!objContext.props.ElementDetails["WrapperContents"]) {
            const FetchWrapperContents = async () => {
                let objElementJson = await objContext.AnimationManagement_ModuleProcessor.GetElementJsonForElementNode(objContext);
                if (objElementJson["WrapperContents"]) {
                    objContext.props.UpdateElementJson(objElementJson);
                }
            };
            ApplicationState.SetProperty("blnShowAnimation", true);
            FetchWrapperContents();
        }
        else {
            objContext.dispatch({
                "type": "SET_STATE",
                "payload": {
                    "ElementJson": {
                        ...objContext.props.ElementDetails
                    },
                    "isLoadComplete": objContext.props.ElementDetails["WrapperContents"] ? true : false
                }
            });
            ApplicationState.SetProperty("blnShowAnimation", false);
        }
    }, [objContext.props.ElementDetails]);
}
