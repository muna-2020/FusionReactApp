//React Imports
import { useLayoutEffect, useEffect } from 'react';

/**
 * @name GetInitialState
 * @param {object} props component props
 * @summary return initial state for the component.
 * @returns {object} initial state object
 */
export function GetInitialState(props) {
    return {
        Formatting: "0",
        Coloring: "0",
        CellPadding: "0",
        CellSpacing: "0",
        IsPercentage: "Y",
        ColumnWidth: [],
        "isLoadComplete": false
    };
};

/**
 * @name Initialize
 * @param {object} objContext passes Context Object.
 * @summary Initialize the custom hooks.
 */
export function Initialize(objContext) {

    /**
     * @name useLayoutEffect
     * @summary If the text resource is not present, then makes the api call for text resource else not.
     */
    useLayoutEffect(() => {
        if (!objContext.props["Object_Framework_Services_TextResource;Id;" + objContext.props.JConfiguration.LanguageCultureInfo + "/e.Editor/Modules/2_OfficeRibbon/3_Tables/TablePropertiesSidebar"]) {
            objContext.TablePropertiesSidebar_ModuleProcessor.LoadInitialData(objContext);
        }
    }, []);

    /**
     * @name useEffect
     * @summary Sets the isLoadComplete when the text resource is loaded.
     */
    useEffect(() => {
        if (objContext.props["Object_Framework_Services_TextResource;Id;" + objContext.props.JConfiguration.LanguageCultureInfo + "/e.Editor/Modules/2_OfficeRibbon/3_Tables/TablePropertiesSidebar"]) {
            if (!objContext.state.isLoadComplete) {
                objContext.dispatch({ type: "SET_STATE", payload: { "isLoadComplete": true } });
            }
        }
    }, [objContext.props["Object_Framework_Services_TextResource;Id;" + objContext.props.JConfiguration.LanguageCultureInfo + "/e.Editor/Modules/2_OfficeRibbon/3_Tables/TablePropertiesSidebar"], objContext.props.ElementJson]);
}