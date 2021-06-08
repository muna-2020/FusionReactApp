//React Related Imports 
import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";

//Module related fies.
import * as Base_Hook from '@shared/Framework/BaseClass/Base_Hook';
import * as PageLanguageArea_Hooks from "@shared/Application/e.Editor/Modules/2_OfficeRibbon/PageLanguageArea_BusinessLogic/PageLanguageArea_Hook";
import PageLanguageArea_ModuleProcessor from "@shared/Application/e.Editor/Modules/2_OfficeRibbon/PageLanguageArea_BusinessLogic/PageLanguageArea_ModuleProcessor";

//Application State realted classes
import EditorState from '@shared/Framework/DataService/EditorState/EditorState';

/**
 * @name PageLanguageArea
 * @param {object} props props object
 * @summary Content  method Loading the Task with Page Id and Page Json
 * @returns {Component} PageLanguageArea component.
 */
const PageLanguageArea = (props) => {

    /**
     * @name GetComponent
     * @summary Contains the JSX.
     * @returns {JSX} JSX.
     */
    const GetComponent = () => {
        let intCurrentLanguageId = props.GetActivePageLanguage();
        let objPageProperties = props.GetActivePageProperties();
        if(intCurrentLanguageId && intCurrentLanguageId !== -1 && objPageProperties && objPageProperties !== null)
        {
            return (
                objPageProperties["t_CMS_Page_Language"].map(objTempData => {
                    let objLanguageDetails = props.LanguageData.find(objTempLang => objTempLang["iFrameworkLanguageId"] === objTempData["iLanguageId"]);
                    return (
                        <li 
                            className={intCurrentLanguageId === objTempData["iLanguageId"] ? "active" : ""} 
                            onClick={() => { props.OnLanguageChange(objTempData["iLanguageId"]); }}>
                            {objLanguageDetails["vLanguageCultureInfo"]}
                        </li>
                    );
                })
            );
        }
        else
        {
            return (<React.Fragment />);
        }
    };

    return GetComponent();
};

export default withRouter(connect(Base_Hook.MapStoreToProps(PageLanguageArea_ModuleProcessor.StoreMapList()))(PageLanguageArea));
