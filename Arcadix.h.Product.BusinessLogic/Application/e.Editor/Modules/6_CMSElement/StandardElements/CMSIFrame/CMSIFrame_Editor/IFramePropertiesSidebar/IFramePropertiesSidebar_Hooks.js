//React Imports
import { useLayoutEffect, useEffect } from 'react';

//Module Related imports
import Object_Framework_Services_TextResource from '@shared/Object/a.Framework/Services/TextResource/TextResource';

/**
 * @name GetInitialState
 * @param {object} props component props
 * @summary Reducer
 * @returns {object} initial state object
 */
export function GetInitialState(props) {
    return {
        "ElementJson": props.ElementJson,
        "isLoadComplete": false
    };
}

/**
 * @name Initialize
 * @param {object} { props, state, dispatch, Properties_ModuleProcessor}
 * @summary Initialize the custom hooks.
 */
export function Initialize(objContext) {
    useDataLoader(objContext);
    useDataLoaded(objContext);
}

/**
 * @name useDataLoader
 * @param {object} { props, state, dispatch, Properties_ModuleProcessor}
 * @summary Custom Data Loader hook.
 */
function useDataLoader(objContext) {
    useLayoutEffect(() => {
        if (!Object_Framework_Services_TextResource.GetData("/e.Editor/Modules/6_CMSElement/CMSIFrame/IFramePropertiesSidebar", objContext.props)) {
            objContext.IFramePropertiesSidebar_ModuleProcessor.LoadInitialData(objContext);
        }
    }, []);

}

/**
 * @name useDataLoaded
 * @param {object} {props, state, dispatch, Properties_ModuleProcessor}
 * @summary Custom data loaded hook
 */
function useDataLoaded(objContext) {
    useEffect(() => {
        if (Object_Framework_Services_TextResource.GetData("/e.Editor/Modules/6_CMSElement/CMSIFrame/IFramePropertiesSidebar", objContext.props) &&
            objContext.props.ElementJson) {
            if (!objContext.state.isLoadComplete) {
                objContext.dispatch({ type: "SET_STATE", payload: { "isLoadComplete": true } });
            }
            objContext.dispatch({
                "type": "SET_STATE",
                "payload": {
                    "ElementJson": objContext.props.ElementJson
                }
            });
        }
    }, [Object_Framework_Services_TextResource.GetData("/e.Editor/Modules/6_CMSElement/CMSIFrame/IFramePropertiesSidebar", objContext.props), objContext.props.ElementJson]);
}
