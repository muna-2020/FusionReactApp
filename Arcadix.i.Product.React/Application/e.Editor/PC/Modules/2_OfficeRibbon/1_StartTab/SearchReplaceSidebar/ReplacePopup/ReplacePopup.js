//react related imports.
import React from "react";

//module related imports.
import SearchPopup_ModuleProcessor from "@shared/Application/e.Editor/Modules/2_OfficeRibbon/1_StartTab/SearchReplaceSidebar/SearchPopup/SearchPopup_ModuleProcessor";

//Base classes/hooks.
import * as EditorBase_Hook from '@shared/Framework/BaseClass/EditorBaseClass/EditorBase_Hook';

/**
 * @name SearchPopup
 * @param {object} props props from parent
 * @summary Search Popup.
 */
const SearchPopup = (props) => {

    let objContext = { props, SearchPopup_ModuleProcessor : new SearchPopup_ModuleProcessor() };

    /**
     * @name  InitializeDataForSSR
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.SearchPopup_ModuleProcessor.Initialize(objContext, objContext.SearchPopup_ModuleProcessor);

    /**
     * @name ResetSearch
     * @summary reset the search.
     * */
    const ResetSearch = () => {
        props.Events.ResetSearch();
        editorPopup.ClosePopup(props.Id);
    };

    /**
    * @name GetContent
    * @summary returns the common jsx of the table properties sidebar.
    * @returns {any} JSX of the Component.
    */
    const GetContent = () => {
        return (
            <div className="search-popup-container">
                <div className="search-popup-header">
                    <h3>Search</h3>
                    <h4>Text not found</h4>
                </div>
                <p>The search process is complete. The text you were looking for was not found.</p>
                <div className="search-popup-footer">
                    <button onClick={objEvt => ResetSearch()} className="btn">Ok</button>
                    <button onClick={objEvt => editorPopup.ClosePopup(props.Id)} className="btn">Abort</button>
                </div>
            </div>
        )
    };

    /**
    * @summary calls GetContent method to get the JSX.
    * */
    return GetContent();
}

export default SearchPopup;