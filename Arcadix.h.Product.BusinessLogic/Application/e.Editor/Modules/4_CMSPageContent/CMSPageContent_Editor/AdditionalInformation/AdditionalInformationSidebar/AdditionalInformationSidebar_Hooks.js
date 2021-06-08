//React imports
import React, { useEffect, useLayoutEffect } from 'react';

/**
 * @name GetInitialState
 * @param {object} props component props
 * @summary Defines the component local state
 * @returns {object} initial state object
 */
export function GetInitialState(props) {
    let objElementJson = {};
    let blnIsLoadComplete = false;
    if (Object_Framework_Services_TextResource.GetData("/e.Editor/Modules/4_CMSPageContent/AdditionalInformation/AdditionalInformationSidebar", props) &&
        props.ElementJson) {
        objElementJson = {
            ...props.ElementJson,
            ["TextElements"]: [
                {
                    ...props.ElementJson["TextElements"][0],
                    ["Ref"]: React.createRef()
                }
            ]
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
    useDataLoader(objContext);
    useDataLoaded(objContext);
}

function useDataLoader(objContext) {
    useLayoutEffect(() => {
        if (!objContext.Object_Framework_Services_TextResource.GetData("/e.Editor/Modules/4_CMSPageContent/AdditionalInformation/AdditionalInformationSidebar", objContext.props)) {
            objContext.AdditionalInformationSidebar_ModuleProcessor.LoadInitialData(objContext);
        }
    }, []);
}

function useDataLoaded(objContext) {
    useEffect(() => {
        if (objContext.Object_Framework_Services_TextResource.GetData("/e.Editor/Modules/4_CMSPageContent/AdditionalInformation/AdditionalInformationSidebar", objContext.props) &&
            objContext.props.ElementJson) {
            objContext.dispatch({
                "type": "SET_STATE",
                "payload": {
                    "ElementJson": {
                        ...objContext.props.ElementJson,
                        ["TextElements"]: [
                            {
                                ...objContext.props.ElementJson["TextElements"][0],
                                ["Ref"]: React.createRef()
                            }
                        ]
                    },
                    "isLoadComplete": true
                }
            });
        }
    }, [objContext.Object_Framework_Services_TextResource.GetData("/e.Editor/Modules/4_CMSPageContent/AdditionalInformation/AdditionalInformationSidebar", objContext.props),
    objContext.props.ElementJson]);
}
