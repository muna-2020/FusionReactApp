//React Imports
import React, { useLayoutEffect, useEffect } from 'react';

//Module related imports
import Object_Framework_Services_TextResource from '@shared/Object/a.Framework/Services/TextResource/TextResource';

/**
 * @name GetInitialState
 * @summary Reducer
 * @returns {object} initial state object
 */
export function GetInitialState(props) {
    let objElementJson = {};
    let blnIsLoadComplete = false;
    if (Object_Framework_Services_TextResource.GetData("/e.Editor/Modules/6_CMSElement/CMSOverlay/OverlaySidebar", props)) {
        objElementJson = {
            ...props.ElementJson,
            ["vElementJson"]: {
                ...props.ElementJson["vElementJson"],
                ["TextElements"]: [
                    {
                        ...props.ElementJson["vElementJson"]["TextElements"][0],
                        ["Ref"]: React.createRef()
                    }
                ]
            }
        };
        blnIsLoadComplete = true;
    }
    return {
        "ElementJson": objElementJson,
        "isLoadComplete": blnIsLoadComplete
    };
}

/**
* @name Initialize
* @param {object} objContext passes Context Object
* @summary Initialize the custom hooks
*/
export function Initialize(objContext) {
    useDatLoader(objContext);
    useDatLoaded(objContext);
}

function useDatLoader(objContext) {
    useLayoutEffect(() => {
        if (!objContext.Object_Framework_Services_TextResource.GetData("/e.Editor/Modules/6_CMSElement/CMSOverlay/OverlaySidebar", objContext.props)) {
            objContext.OverlaySidebar_ModuleProcessor.LoadInitialData(objContext);
        }
    }, []);
}

function useDatLoaded(objContext) {
    useEffect(() => {
        if (objContext.Object_Framework_Services_TextResource.GetData("/e.Editor/Modules/6_CMSElement/CMSOverlay/OverlaySidebar", objContext.props)) {
            objContext.dispatch({
                type: "SET_STATE",
                payload: {
                    "ElementJson": {
                        ...objContext.props.ElementJson,
                        ["vElementJson"]: {
                            ...objContext.props.ElementJson["vElementJson"],
                            ["TextElements"]: [
                                {
                                    ...objContext.props.ElementJson["vElementJson"]["TextElements"][0],
                                    ["Ref"]: React.createRef()
                                }
                            ]
                        }
                    },
                    "isLoadComplete": true
                }
            });
        }
    }, [objContext.Object_Framework_Services_TextResource.GetData("/e.Editor/Modules/6_CMSElement/CMSOverlay/OverlaySidebar", objContext.props), objContext.props.ElementJson]);
}
