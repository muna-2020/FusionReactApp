//Base classes/hooks.
import EditorBase_ModuleProcessor from '@shared/Framework/BaseClass/EditorBaseClass/EditorBase_ModuleProcessor';

//Module related imports
import * as DropdownSidebar_MetaData from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSDropdown/CMSDropdown_Editor/DropdownSidebar/DropdownSidebar_MetaData";
import Object_Framework_Services_TextResource from '@shared/Object/a.Framework/Services/TextResource/TextResource';

//Helper classes/methods
import ObjectQueue from '@shared/Framework/DataService/ObjectQueue/ObjectQueue';

//BaseCMSElement import.
import * as BaseCMSElement from "@shared/Framework/BaseClass/EditorBaseClass/BaseCMSElement";

//Editor State
import EditorState from '@shared/Framework/DataService/EditorState/EditorState';

/**
 * @name DropdownSidebar_ModuleProcessor
 * @summary Contains the DropdownSidebar's editor version module specific methods.
 * */
class DropdownSidebar_ModuleProcessor extends EditorBase_ModuleProcessor {

    /**
     * @name StoreMapList     
     * @summary Returns list of objects used in the module
     * @return {any} Array of object list
     */
    static StoreMapList() {
        return ["Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/e.Editor/Modules/6_CMSElement/CMSDropdown/DropdownSidebar"];
    }

    /**
     * @name LoadInitialData
     * @param {object} objContext passes Context object
     * @summary Calls the Queue and Execute method
     */
    LoadInitialData(objContext) {
        (new ObjectQueue()).QueueAndExecute(objContext.DropdownSidebar_ModuleProcessor.InitialDataParams(objContext.props));
    }

    /**
     * @name InitialDataParams
     * @param {object} props passes props
     * @summary Get initial request params for the component.
     * @returns {object} return objDataCalls
     */
    InitialDataParams(props) {
        let arrResourceParams = ["/e.Editor/Modules/6_CMSElement/CMSDropdown/DropdownSidebar"];
        Object_Framework_Services_TextResource.Initialize(arrResourceParams);
        let arrDataRequest = [Object_Framework_Services_TextResource];
        return arrDataRequest;
    }

    /**
     * @name IsNumericValue
     * @param {string} strValue value to be checked
     * @summary Checks if a value is numerical or decimal point value.
     * @returns {boolean} true/false
     */
    IsNumericValue(strValue) {
        let regex = /^[0-9]+$/;
        if (regex.test(strValue)) {
            return true;
        }
        return false;
    }

    /**
     * @name GetErrors
     * @param {object} objContext {state, props, dispatch}
     * @summary Returns an object of validation reslut.
     * @returns {object} error object
     */
    GetErrors(objContext) {
        let blnIsErrorFree = true;
        let arrErrorsAtValues = [];
        if (objContext.state.ElementJson["vElementJson"]["Values"].length >= 2) {
            objContext.state.ElementJson["vElementJson"]["Values"].map(objTempValue => {
                if (!objTempValue["vText"]) {
                    blnIsErrorFree = false;
                    arrErrorsAtValues = [
                        ...arrErrorsAtValues,
                        objTempValue
                    ];
                }
            });
        }
        else {
            blnIsErrorFree = false;
        }
        return {
            "IsErrorFree": blnIsErrorFree,
            "ErrorsAtValues": arrErrorsAtValues
        };
    }

    /**
     * @name SetValuesToState
     * @param {object} objContext {state, props, dispatch}
     * @param {object} objValue Dropdown value
     * @summary Adds a new value to the values key of the element json.
     */
    SetValuesToState(objContext, objValue) {
        objContext.dispatch({ type: "SET_STATE", payload: { "SelectedValue": objValue } });
    }

    SetOrRemovePointOverride(objContext) {
        let objElementJson;
        if (objContext.state.ElementJson["vElementJson"]["cIsPointOverride"] === "Y") {
            objElementJson = {
                ...objContext.state.ElementJson,
                ["vElementJson"]: {
                    ...objContext.state.ElementJson["vElementJson"],
                    ["cIsPointOverride"]: "N",
                    ["dCorrectPoint"]: 0,
                    ["dNotAnsweredPoint"]: 0,
                    ["Values"]: objContext.state.ElementJson["vElementJson"]["Values"].map(x => {
                        return {
                            ...x,
                            ["dWrongPoint"]: 0
                        };
                    })
                }
            };
        }
        else {
            objElementJson = {
                ...objContext.state.ElementJson,
                ["vElementJson"]: {
                    ...objContext.state.ElementJson["vElementJson"],
                    ["cIsPointOverride"]: "Y"
                }
            };
        }
        objContext.dispatch({
            "type": "SET_STATE",
            "payload": {
                "ElementJson": objElementJson
            }
        });
    }

    OnChangeWrongPointValue(objContext, strValue, objValue) {
        if (strValue === "" || strValue === "-" || !isNaN(parseFloat(strValue))) {
            let objElementJson = {
                ...objContext.state.ElementJson,
                ["vElementJson"]: {
                    ...objContext.state.ElementJson["vElementJson"],
                    ["Values"]: objContext.state.ElementJson["vElementJson"]["Values"].map(objTempValue => {
                        if (objTempValue["iElementDropdownValueId"] === objValue["iElementDropdownValueId"]) {
                            return {
                                ...objTempValue,
                                ["dWrongPoint"]: strValue
                            };
                        }
                        else {
                            return { ...objTempValue };
                        }
                    })
                }
            };
            objContext.dispatch({ type: "SET_STATE", payload: { "ElementJson": objElementJson } });
        }
    }

    OnChangePoint(objContext, strValue, strKey) {
        if (strValue === "" || strValue === "-" || !isNaN(parseFloat(strValue))) {
            let objElementJson = {
                ...objContext.state.ElementJson,
                ["vElementJson"]: {
                    ...objContext.state.ElementJson["vElementJson"],
                    [strKey]: strValue
                }
            };
            objContext.dispatch({ type: "SET_STATE", payload: { "ElementJson": objElementJson } });
        }
    }

    /**
     * @name AddNewValue
     * @param {object} objContext {state, props, dispatch}
     * @summary Adds a new value to the values key of the element json.
     */
    AddNewValue(objContext) {
        let objNewValue = DropdownSidebar_MetaData.GetDefaultValue(objContext);
        let arrValues = [
            ...objContext.state.ElementJson["vElementJson"]["Values"],
            objNewValue
        ];
        arrValues = BaseCMSElement.UpdateDisplayOrder(arrValues);
        let objElementJson = {
            ...objContext.state.ElementJson,
            ["vElementJson"]: {
                ...objContext.state.ElementJson["vElementJson"],
                ["Values"]: arrValues
            }
        };
        objContext.dispatch({ type: "SET_STATE", payload: { "ElementJson": objElementJson, "SelectedValue": arrValues[arrValues.length - 1] } });
    }

    /**
     * @namer RemoveSelectedValue
     * @param {object} objContext {state, props, dispatch}
     * @summary Adds a new value to the values key of the element json.
     */
    RemoveSelectedValue(objContext) {
        if (objContext.state.ElementJson["vElementJson"]["Values"].length > 2) {
            let arrValues = [...objContext.state.ElementJson["vElementJson"]["Values"].filter(objTempValue => objTempValue["iElementDropdownValueId"] !== objContext.state.SelectedValue["iElementDropdownValueId"])];
            arrValues = BaseCMSElement.UpdateDisplayOrder(arrValues);
            let objElementJson = {
                ...objContext.state.ElementJson,
                ["vElementJson"]: {
                    ...objContext.state.ElementJson["vElementJson"],
                    ["Values"]: arrValues
                }
            };
            if (objContext.state.Errors.filter(objErrorValue => objErrorValue["iElementDropdownValueId"] === objContext.state.SelectedValue["iElementDropdownValueId"]).length > 0) {
                let arrErrors = objContext.state.Errors.filter(objErrorValue => objErrorValue["iElementDropdownValueId"] !== objContext.state.SelectedValue["iElementDropdownValueId"]);
                objContext.dispatch({ type: "SET_STATE", payload: { "ElementJson": objElementJson, "SelectedValue": {}, "Errors": arrErrors } });
            }
            else {
                objContext.dispatch({ type: "SET_STATE", payload: { "ElementJson": objElementJson, "SelectedValue": {} } });
            }
        }
    }

    /**
     * @nameMoveSelectedValueUp
     * @param {object} objContext {state, props, dispatch}
     * @summary Moves the selected value one position up.
     */
    MoveSelectedValueUp(objContext) {
        let arrValues = [...objContext.state.ElementJson["vElementJson"]["Values"]];
        let intIndex = arrValues.findIndex(objTempValue => objTempValue["iElementDropdownValueId"] === objContext.state.SelectedValue["iElementDropdownValueId"]);
        let arrNewValues = [...arrValues];
        if (intIndex > 0) {
            let objTemp = arrNewValues[intIndex];
            arrNewValues[intIndex] = arrNewValues[intIndex - 1];
            arrNewValues[intIndex - 1] = objTemp;
            arrValues = BaseCMSElement.UpdateDisplayOrder(arrNewValues);
            let objValue = arrValues.find(objTempValue => objTempValue["iElementDropdownValueId"] === objContext.state.SelectedValue["iElementDropdownValueId"]);
            let objElementJson = {
                ...objContext.state.ElementJson,
                ["vElementJson"]: {
                    ...objContext.state.ElementJson["vElementJson"],
                    ["Values"]: arrValues
                }
            };
            objContext.dispatch({ type: "SET_STATE", payload: { "ElementJson": objElementJson, "SelectedValue": objValue } });
        }
    }

    /**
     * @name MoveSelectedValueDown
     * @param {object} objContext {state, props, dispatch}
     * @summary Moves the selected value one position down.
     */
    MoveSelectedValueDown(objContext) {
        let arrValues = objContext.state.ElementJson["vElementJson"]["Values"].slice();
        let intIndex = arrValues.findIndex(objTempValue => objTempValue["iElementDropdownValueId"] === objContext.state.SelectedValue["iElementDropdownValueId"]);
        let arrNewValues = [...arrValues];
        if (intIndex < arrValues.length) {
            let objTemp = arrNewValues[intIndex];
            arrNewValues[intIndex] = arrNewValues[intIndex + 1];
            arrNewValues[intIndex + 1] = objTemp;
            arrValues = BaseCMSElement.UpdateDisplayOrder(arrNewValues);
            let objValue = arrValues.find(objTempValue => objTempValue["iElementDropdownValueId"] === objContext.state.SelectedValue["iElementDropdownValueId"]);
            let objElementJson = {
                ...objContext.state.ElementJson,
                ["vElementJson"]: {
                    ...objContext.state.ElementJson["vElementJson"],
                    ["Values"]: arrValues
                }
            };
            objContext.dispatch({ type: "SET_STATE", payload: { "ElementJson": objElementJson, "SelectedValue": objValue } });
        }
    }

    /**
     * @name OnChangeInputValue
     * @param {object} objContext {state, props, dispatch}
     * @param {string} strValue changed value
     * @param {object} objValue dropdown value object
     * @summary Trigerred when the values of the input field is changed.
     */
    OnChangeInputValue(objContext, strValue, objValue) {
        let objElementJson = {
            ...objContext.state.ElementJson,
            ["vElementJson"]: {
                ...objContext.state.ElementJson["vElementJson"],
                ["Values"]: objContext.state.ElementJson["vElementJson"]["Values"].map(objTempValue => {
                    if (objTempValue["iElementDropdownValueId"] === objValue["iElementDropdownValueId"]) {
                        return {
                            ...objTempValue,
                            ["vText"]: strValue
                        };
                    }
                    else {
                        return { ...objTempValue };
                    }
                })
            }
        };
        if (objContext.state.Errors.filter(objErrorValue => objErrorValue["iElementDropdownValueId"] === objValue["iElementDropdownValueId"]).length > 0) {
            let arrErrors = objContext.state.Errors.filter(objErrorValue => objErrorValue["iElementDropdownValueId"] !== objValue["iElementDropdownValueId"]);
            objContext.dispatch({ type: "SET_STATE", payload: { "ElementJson": objElementJson, "Errors": arrErrors, "SelectedValue": objValue } });
        }
        else {
            objContext.dispatch({ type: "SET_STATE", payload: { "ElementJson": objElementJson } });
        }
    }

    /**
     * @name OnChangeCorrectOptionRadio
     * @param {object} objContext {state, props, dispatch}
     * @param {object} objValue dropdown value object
     * @param {boolean} blnIsChecked true/false if the radio is checked/unchecked
     * @summary Trigerred when the correct option is changed.
     */
    OnChangeCorrectOptionRadio(objContext, objValue, blnIsChecked) {
        let arrValues = [...objContext.state.ElementJson["vElementJson"]["Values"]];
        let arrNewValues = arrValues.map(objTempValue => {
            if (objTempValue["iElementDropdownValueId"] === objValue["iElementDropdownValueId"]) {
                if (blnIsChecked) {
                    return {
                        ...objTempValue,
                        ["cIsCorrectValue"]: "Y"
                    };
                }
                else {
                    return {
                        ...objTempValue,
                        ["cIsCorrectValue"]: "N"
                    };
                }
            }
            else {
                return {
                    ...objTempValue,
                    ["cIsCorrectValue"]: "N"
                };
            }
        });
        objContext.dispatch({
            type: "SET_STATE",
            payload: {
                "ElementJson": {
                    ...objContext.state.ElementJson,
                    ["vElementJson"]: {
                        ...objContext.state.ElementJson["vElementJson"],
                        ["Values"]: arrNewValues
                    }
                }
            }
        });
    }

    /**
     * @name OnChangeFixWidthRadio
     * @param {object} objContext {state, props, dispatch}
     * @param {boolean} blnIsChecked true/false if the radio is checked/unchecked
     * @summary Trigerred when the fixed width radio button is checked or unchecked.
     */
    OnChangeFixWidthRadio(objContext, blnIsChecked) {
        objContext.dispatch({
            type: "SET_STATE",
            payload: {
                "ElementJson": {
                    ...objContext.state.ElementJson,
                    ["vElementJson"]: {
                        ...objContext.state.ElementJson["vElementJson"],
                        ["cIsFixedWidth"]: blnIsChecked ? "Y" : "N"
                    }
                }
            }
        });
    }

    /**
     * @name OnChangeFixWidthInput
     * @param {object} objContext {state, props, dispatch}
     * @param {string} strValue changed value
     * @summary Trigerred when the fixed width value field is changed.
     */
    OnChangeFixWidthInput(objContext, strValue) {
        if ((strValue === "" || !isNaN(Number(strValue))) && strValue.length < 4) {
            objContext.dispatch({
                type: "SET_STATE",
                payload: {
                    "ElementJson": {
                        ...objContext.state.ElementJson,
                        ["vElementJson"]: {
                            ...objContext.state.ElementJson["vElementJson"],
                            ["iWidth"]: strValue
                        }
                    }
                }
            });
        }
    }

    /**
     * @name OnChangeRandomDisplayCheckBox
     * @param {object} objContext {state, props, dispatch}
     * @param {boolean} blnIsChecked true/false if the checkbox is checked/unchecked
     * @summary Trigerred when the random display radio button is checked or unchecked.
     */
    OnChangeRandomDisplayCheckBox(objContext, blnIsChecked) {
        objContext.dispatch({
            type: "SET_STATE",
            payload: {
                "ElementJson": {
                    ...objContext.state.ElementJson,
                    ["vElementJson"]: {
                        ...objContext.state.ElementJson["vElementJson"],
                        ["cIsRandomizedDisplay"]: blnIsChecked ? "Y" : "N"
                    }
                }
            }
        });
    }

    /**
     * @name OnChangeDefaultTextInput
     * @param {object} objContext {state, props, dispatch}
     * @param {string} strValue Changed Value
     * @summary Trigerred when the default text input field value is changed.
     */
    OnChangeDefaultTextInput(objContext, strValue) {
        objContext.dispatch({
            type: "SET_STATE",
            payload: {
                "ElementJson": {
                    ...objContext.state.ElementJson,
                    ["vElementJson"]: {
                        ...objContext.state.ElementJson["vElementJson"],
                        ["vDefaultText"]: strValue
                    }
                }
            }
        });
    }

    /**
     * @name OnChangeDefaultTextIsEmptyCheckBox
     * @param {object} objContext {state, props, dispatch}
     * @param {boolean} blnIsChecked true/false if the checkbox is checked/unchecked
     * @summary Trigerred when the DefaultTextIsEmpty radio button is checked or unchecked.
     */
    OnChangeDefaultTextIsEmptyCheckBox(objContext, blnIsChecked) {
        objContext.dispatch({
            type: "SET_STATE",
            payload: {
                "ElementJson": {
                    ...objContext.state.ElementJson,
                    ["vElementJson"]: {
                        ...objContext.state.ElementJson["vElementJson"],
                        ["cIsDefaultTextEmpty"]: blnIsChecked ? "Y" : "N"
                    }
                }
            }
        });
    }

    /**
     * @name OnChangeHidePleaseSelectOptionCheckBox
     * @param {object} objContext {state, props, dispatch}
     * @param {boolean} blnIsChecked true/false if the checkbox is checked/unchecked
     * @summary Trigerred when the HidePleaseSelect radio button is checked or unchecked.
     */
    OnChangeHidePleaseSelectOptionCheckBox(objContext, blnIsChecked) {
        objContext.dispatch({
            type: "SET_STATE",
            payload: {
                "ElementJson": {
                    ...objContext.state.ElementJson,
                    ["vElementJson"]: {
                        ...objContext.state.ElementJson["vElementJson"],
                        ["cHidePleaseSelect"]: blnIsChecked ? "Y" : "N"
                    }
                }
            }
        });
    }

    /**
     * @name OnClickAddButton
     * @param {object} objContext {state, props, dispatch}
     * @summary Trigerred when the Add button is clicked. Checks for errors and if values are error free then updates the element json.
     */
    OnClickAddButton(objContext) {
        let objValidation = objContext.DropdownSidebar_ModuleProcessor.GetErrors(objContext);
        if (objValidation["IsErrorFree"]) {
            let objNewElementJson;
            if (objContext.state.ElementJson["cIsFirstLoad"] && objContext.state.ElementJson["cIsFirstLoad"] === "Y") {
                let { cIsFirstLoad, ...objElementJson } = objContext.state.ElementJson;
                objNewElementJson = { ...objElementJson };
            }
            else {
                objNewElementJson = { ...objContext.state.ElementJson };
            }
            objNewElementJson = {
                ...objNewElementJson,
                ["vElementJson"]: {
                    ...objNewElementJson["vElementJson"],
                    ["iWidth"]: objNewElementJson["vElementJson"]["cIsFixedWidth"] === "Y" ? objNewElementJson["vElementJson"]["iWidth"] ? Number(objNewElementJson["vElementJson"]["iWidth"]) : 0 : ""
                }
            }
            objContext.props.PassedEvents.UpdateElementJson(objNewElementJson);
        }
        else {
            objContext.dispatch({ type: "SET_STATE", payload: { "Errors": objValidation["ErrorsAtValues"] } });
        }
    }

    /**
     * @name GetDynamicStyles
     * @param {object} props component props.
     * @summary this returns the styles for the SSR.
     */
    GetDynamicStyles(props) {
        return [
            props.JConfiguration.EditorSkinPath + "/Css/Application/ReactJs/PC/Modules/6_CMSElement/CMSDropdown/DropdownSidebar/DropdownSidebarStyles.css"
        ];
    }
}

export default DropdownSidebar_ModuleProcessor;
