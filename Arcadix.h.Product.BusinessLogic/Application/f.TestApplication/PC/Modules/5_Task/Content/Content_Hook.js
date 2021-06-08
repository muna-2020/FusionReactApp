// React related impoprts.
import { useLayoutEffect, useEffect, useImperativeHandle } from 'react';

/**
* @name GetInitialState
* @summary Initializes the state
* @returns {object} initial state object
*/
export function GetInitialState() {
    return {
        "LoadSolutionData": null
    };
}

/**
 * @name Initialize
 * @param {object} objContext Context Object
 * @summary Initialize method call to laod the initial data
 */
export function Initialize(objContext) {
    useDataLoader(objContext);
    useImperativeMethods(objContext);
}

function useDataLoader(objContext) {
    useLayoutEffect(() => {
        return () => {
            ApplicationState.RemoveProperty('EvaluationResponse');
        };
    }, []);
}

function useImperativeMethods(objContext) {
    useImperativeHandle(objContext.props.ContentRef, () => ({
        "TryAgainTask": () => {
            objContext.PageContentRef.current.ResetAnswer();
        },
        "GetUserResponse": () => {
            return objContext.PageContentRef.current.GetUserResponse();
        },
        "LoadSolution": (objLoadSolutionResult) => {
            objContext.PageContentRef.current.LoadSolution(objLoadSolutionResult);
        },
        "ExecuteAction": (strActionType, objData) => {
            objContext.PageContentRef.current.ExecuteAction(strActionType, objData);
        }
    }), [objContext.props]);
}
