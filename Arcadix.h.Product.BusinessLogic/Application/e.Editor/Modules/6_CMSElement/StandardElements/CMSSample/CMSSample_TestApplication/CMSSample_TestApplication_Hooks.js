// React related impoprts.
import { useEffect, useImperativeHandle } from 'react';




/**
 * @name GetInitialState
 * @param {object} props props from parent
 * @summary Initialize the component's local state.
 * @returns {object} Returns the local state of the component.
 */
export const GetInitialState = (props) => {
    return {
        "ElementJson": {},
        "ViewSolution": false,
        "ViewComparison": false,
        "LoadUserResponse": false,
        "PageId": props.PageId,
        "ComponentKey": props.ComponentKey,
        "isLoadComplete": false
    };
};

/**
 * @name Initialize
 * @param {object} objContext {state, props, dispatch, CMSSample_TestApplication_ModuleProcessor}
 * @summary Initialize the custom hooks
 */
export const Initialize = (objContext) => {
    /**
     * @summary Checks if the data is loaded to props and then set the component state accordingly.
     */
    useEffect(() => {
        if (!objContext.state.isLoadComplete && objContext.props.ElementJson) {
            objContext.dispatch({
                type: "SET_STATE",
                payload: {
                    "isLoadComplete": true,
                    "ElementJson": objContext.CMSSample_TestApplication_ModuleProcessor.GetElementJsonForComponent(objContext)
                }
            });
        }
    }, [objContext.props.ElementJson]);

    /**
     * @summary Gets the user response.
     */
    useImperativeHandle(objContext.props.ElementRef, () => ({
        GetUserResponse: () => {
            let arrResponse = [];
            arrResponse = [
                {
                    ["iElementId"]: objContext.state.ElementJson["iElementId"],
                    ["vElementTypeName"]: objContext.state.ElementJson["vElementTypeName"],
                    ["Answers"]: objContext.state.ElementJson["vElementJson"]["Values"]
                }
            ];
            return arrResponse;
        }
    }), [objContext.state, objContext.props]);
};
