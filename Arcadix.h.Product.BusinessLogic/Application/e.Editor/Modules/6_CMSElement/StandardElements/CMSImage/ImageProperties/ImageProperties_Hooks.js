//React Imports
import { useEffect } from 'react';

//Common helper class method.
import { DataRef } from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

/**
 * @name GetInitialState
 * @param {object} props component props
 * @summary Reducer
 * @returns {object} initial state object
 */
export function GetInitialState(props) {
    return {
        ...props,
        "ElementJson": {
            ...props.ElementJson
        },
        "iMinimumToBeCorrect": props.ElementJson.vElementJson.iMinimumToBeCorrect ? props.ElementJson.vElementJson.iMinimumToBeCorrect : "",
        "blnShowError": false,
        "isLoadComplete": false
    };
}

/**
* @name Initialize
* @param {object} objContext passes Context Object
* @summary Initialize the custom hooks
*/
export function Initialize(objContext) {

    /**
     * @summary If the text resource is not present, then makes the api call for text resource else not.
     */
    useEffect(() => {
        objContext.ImageProperties_ModuleProcessor.LoadInitialData(objContext);
    }, []);

    /**
     * @summary Sets the isLoadComplete when the text resource is loaded.
     */
    useEffect(() => {
        if (DataRef(objContext.props["Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/e.Editor/Modules/6_CMSElement/CMSImage/ImageProperties"])["Data"]) {
            if (!objContext.state.isLoadComplete) {
                objContext.dispatch({ type: "SET_STATE", payload: { "isLoadComplete": true } });
            }
            objContext.dispatch({ type: "SET_STATE", payload: { "ElementJson": objContext.props.ElementJson } });
        }
    }, [objContext.props["Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/e.Editor/Modules/6_CMSElement/CMSImage/ImageProperties"]
    ]);
}
