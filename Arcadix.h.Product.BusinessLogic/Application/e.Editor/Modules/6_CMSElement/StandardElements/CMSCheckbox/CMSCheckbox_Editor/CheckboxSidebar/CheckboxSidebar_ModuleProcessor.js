//React imports
import React from 'react';

//Base classes/hooks.
import EditorBase_ModuleProcessor from '@shared/Framework/BaseClass/EditorBaseClass/EditorBase_ModuleProcessor';

//Module related imports
import * as CMSCheckbox_Editor_MetaData from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSCheckbox/CMSCheckbox_Editor/CMSCheckbox_Editor_MetaData";
import * as CMSText_Editor_MetaData from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSText/CMSText_Editor/CMSText_Editor_MetaData";

//Module Objects imports
import Object_Framework_Services_TextResource from '@shared/Object/a.Framework/Services/TextResource/TextResource';

//Helper classes/methods
import ObjectQueue from '@shared/Framework/DataService/ObjectQueue/ObjectQueue';

//UniqueId.
import * as UniqueId from "@root/Framework/Services/UniqueId/UniqueId";

//BaseCMSElement import.
import * as BaseCMSElement from "@shared/Framework/BaseClass/EditorBaseClass/BaseCMSElement";

/**
 * @name CheckboxSidebar_ModuleProcessor
 * @summary Contains the CheckboxSidebar's editor version module specific methods.
 * */
class CheckboxSidebar_ModuleProcessor extends EditorBase_ModuleProcessor {

    /**
     * @name StoreMapList     
     * @summary Returns list of objects used in the module
     * @return {any} Array of object list
     */
    static StoreMapList() {
        return ["Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/e.Editor/Modules/6_CMSElement/CMSCheckbox/CheckboxSidebar"];
    }

    /**
     * @name LoadInitialData
     * @param {object} objContext passes Context object
     * @summary Calls the Queue and Execute method
     */
    LoadInitialData(objContext) {
        (new ObjectQueue()).QueueAndExecute(objContext.CheckboxSidebar_ModuleProcessor.InitialDataParams(objContext.props));
    }

    /**
     * @name InitialDataParams
     * @param {object} props passes props
     * @summary Get initial request params for the component.
     * @returns {object} return objDataCalls
     */
    InitialDataParams(props) {
        let arrResourceParams = ["/e.Editor/Modules/6_CMSElement/CMSCheckbox/CheckboxSidebar"];
        Object_Framework_Services_TextResource.Initialize(arrResourceParams);
        let arrDataRequest = [Object_Framework_Services_TextResource];
        return arrDataRequest;
    }

    /**
     * @name IsNumericValue
     * @param {string} strValue value to be checked
     * @param {string} strOperationType TYPING/ADD
     * @summary Checks if a value is numerical value.
     * @returns {boolean} true/false
     */
    IsNumericValue(strValue, strOperationType) {
        let regex;
        switch (strOperationType.toUpperCase()) {
            case "TYPING":
                regex = /^[0-9]+$/;
                break;
            case "ADD":
                regex = /^[1-9]+$/;
                break;
        }
        if (regex.test(strValue)) {
            return true;
        }
        return false;
    }

    /**
     * @name GetErrors
     * @param {object} objContext {state, props, dispatch}
     * @summary Gets the list of errors.
     * @returns {object} error object
     */
    GetErrors(objContext) {
        let objErrorObject = {
            "ErrorWithCheckboxes": null,
            "ErrorWithColumn": null
        };
        let objTextResource = objContext.props["Object_Framework_Services_TextResource;Id;" + objContext.props.JConfiguration.LanguageCultureInfo + "/e.Editor/Modules/6_CMSElement/CMSCheckbox/CheckboxSidebar"].Data[0]["CheckboxSidebar"];
        if (objContext.state.ElementJson["vElementJson"]["MatrixInformation"]["iNumberOfCheckboxes"] < 2 && objContext.state.ElementJson["vElementJson"]["MatrixInformation"]["iNumberOfCheckboxes"] > 999) {
            objErrorObject["ErrorWithCheckboxes"] = objTextResource["Checkboxes_Value_Out_Of_Range"];
        }
        if (objContext.state.ElementJson["vElementJson"]["MatrixInformation"]["iNumberOfColumns"] < objContext.state.ElementJson["vElementJson"]["Values"].length && objContext.state.ElementJson["vElementJson"]["MatrixInformation"]["iNumberOfColumns"] > 99) {
            objErrorObject["ErrorWithColumn"] = objTextResource["Column_Value_Out_Of_Range"];
        }
        return objErrorObject;
    }

    /**
     * @name OnRowInputChange
     * @param {object} objContext {state, props, dispatch}
     * @param {string} strValue value
     * @summary Invoked when the value in the number of row's field change.
     */
    OnNumberOfCheckboxInputChange(objContext, strValue) {
        if (strValue === "" || objContext.CheckboxSidebar_ModuleProcessor.IsNumericValue(strValue, "TYPING")) {
            let intValue = strValue ? parseInt(strValue) : 0;
            if (intValue >= 0 && intValue <= 999) {
                objContext.dispatch({
                    type: "SET_STATE",
                    payload: {
                        "ElementJson": {
                            ...objContext.state.ElementJson,
                            ["vElementJson"]: {
                                ...objContext.state.ElementJson["vElementJson"],
                                ["MatrixInformation"]: {
                                    ...objContext.state.ElementJson["vElementJson"]["MatrixInformation"],
                                    ["iNumberOfCheckboxes"]: intValue
                                }
                            }
                        }
                    }
                });
            }
        }
    }

    /**
     * @name OnColumnInputChange
     * @param {object} objContext {state, props, dispatch}
     * @param {string} strValue value
     * @summary Invoked when the value in the number of column's field change.
     */
    OnColumnInputChange(objContext, strValue) {
        if (strValue === "" || objContext.CheckboxSidebar_ModuleProcessor.IsNumericValue(strValue, "TYPING")) {
            let intValue = strValue ? parseInt(strValue) : 0;
            if (intValue >= 0 && intValue <= 99) {
                objContext.dispatch({
                    type: "SET_STATE",
                    payload: {
                        "ElementJson": {
                            ...objContext.state.ElementJson,
                            ["vElementJson"]: {
                                ...objContext.state.ElementJson["vElementJson"],
                                ["MatrixInformation"]: {
                                    ...objContext.state.ElementJson["vElementJson"]["MatrixInformation"],
                                    ["iNumberOfColumns"]: intValue
                                }
                            }
                        }
                    }
                });
            }
        }
    }

    /**
     * @name AddOrRemoveCheckboxes
     * @param {object} objContext {state, props, dispatch}
     * @summary Invoked when the value in the number of column's field change.
     * @returns {object} ElementJson
     */
    AddOrRemoveCheckboxes(objContext) {
        let objTextResource = objContext.props["Object_Framework_Services_TextResource;Id;" + objContext.props.JConfiguration.LanguageCultureInfo + "/e.Editor/Modules/6_CMSElement/CMSCheckbox/CheckboxSidebar"].Data[0]["CheckboxSidebar"];
        let objElementJson = {};
        if (objContext.state.ElementJson["vElementJson"]["Values"].length < objContext.state.ElementJson["vElementJson"]["MatrixInformation"]["iNumberOfCheckboxes"]) {
            let arrDefaultCheckboxes = [];
            let arrDefaultTextElements = [];
            for (let intCounter = 0; intCounter < objContext.state.ElementJson["vElementJson"]["MatrixInformation"]["iNumberOfCheckboxes"] - objContext.state.ElementJson["vElementJson"]["Values"].length; intCounter++) {
                let intElementTextId = UniqueId.GetUniqueId();
                let objDefaultCheckBoxValue = CMSCheckbox_Editor_MetaData.GetDefaultCheckboxValueObject(objContext, intElementTextId);
                arrDefaultCheckboxes = [
                    ...arrDefaultCheckboxes,
                    objDefaultCheckBoxValue
                ];
                let objTextElementJson = CMSText_Editor_MetaData.GetDefaultElementJson(1, intElementTextId, objTextResource["Default_Text"]);
                arrDefaultTextElements = [
                    ...arrDefaultTextElements,
                    {
                        ...objTextElementJson,
                        ["Ref"]: React.createRef()
                    }
                ];
            }
            let arrNewValues = [
                ...objContext.state.ElementJson["vElementJson"]["Values"],
                ...arrDefaultCheckboxes
            ];
            let arrNewTextElements = [
                ...objContext.state.ElementJson["vElementJson"]["TextElements"],
                ...arrDefaultTextElements
            ];
            objElementJson = {
                ...objContext.state.ElementJson,
                ["vElementJson"]: {
                    ...objContext.state.ElementJson["vElementJson"],
                    ["Values"]: BaseCMSElement.UpdateDisplayOrder(arrNewValues),
                    ["TextElements"]: arrNewTextElements
                }
            };
        }
        else if (objContext.state.ElementJson["vElementJson"]["Values"].length > objContext.state.ElementJson["vElementJson"]["MatrixInformation"]["iNumberOfCheckboxes"]) {
            let arrNewValues = objContext.state.ElementJson["vElementJson"]["Values"].slice(0, objContext.state.ElementJson["vElementJson"]["MatrixInformation"]["iNumberOfCheckboxes"]);
            let arrLeftOverValues = objContext.state.ElementJson["vElementJson"]["Values"].slice(objContext.state.ElementJson["vElementJson"]["MatrixInformation"]["iNumberOfCheckboxes"], objContext.state.ElementJson["vElementJson"]["Values"].length);
            let arrNewTextElements = objContext.state.ElementJson["vElementJson"]["TextElements"];
            arrLeftOverValues.map(objTempValue => {
                arrNewTextElements = arrNewTextElements.filter(objTempTextElement => objTempTextElement["iElementId"] !== objTempValue["iElementTextId"]);
            });
            objElementJson = {
                ...objContext.state.ElementJson,
                ["vElementJson"]: {
                    ...objContext.state.ElementJson["vElementJson"],
                    ["Values"]: BaseCMSElement.UpdateDisplayOrder(arrNewValues),
                    ["TextElements"]: arrNewTextElements
                }
            };
        }
        else {
            objElementJson = { ...objContext.state.ElementJson };
        }
        objElementJson = {
            ...objElementJson,
            ["vElementJson"]: {
                ...objElementJson["vElementJson"],
                ["cIsMatrixDisplay"]: "Y"
            }
        }
        return objElementJson;
    }

    /**
     * @name UpdateToCMSInput
     * @param {object} objContext {state, props, dispatch}
     * @summary Calls the 'UpdateElementJson' method of the CMSInput element to update the element json.
     */
    OnClickSave(objContext) {
        let objValidation = objContext.CheckboxSidebar_ModuleProcessor.GetErrors(objContext);
        if (objValidation["ErrorWithCheckboxes"] === null && objValidation["ErrorWithColumn"] === null) {
            let objElementJson = objContext.CheckboxSidebar_ModuleProcessor.AddOrRemoveCheckboxes(objContext);
            objContext.props.PassedEvents.UpdateElementJson(objElementJson);
        }
        else {
            objContext.dispatch({
                type: "SET_STATE",
                payload: {
                    "Errors": objValidation
                }
            });
        }
    }

    /**
     * @name GetDynamicStyles
     * @param {object} props component props.
     * @summary this returns the styles for the SSR.
     */
    GetDynamicStyles(props) {
        return [
            props.JConfiguration.EditorSkinPath + "/Css/Application/ReactJs/PC/Modules/6_CMSElement/CMSCheckbox/CheckboxSidebar/CheckboxSidebarStyles.css"
        ];
    }
}

export default CheckboxSidebar_ModuleProcessor;
