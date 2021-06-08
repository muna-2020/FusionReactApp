//Base classes/hooks.
import EditorBase_ModuleProcessor from '@shared/Framework/BaseClass/EditorBaseClass/EditorBase_ModuleProcessor';

//Module related imports
import * as MultiInputSidebar_MetaData from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSMultiInput/CMSMultiInput_Editor/MultiInputSidebar/MultiInputSidebar_MetaData";
import Object_Framework_Services_TextResource from '@shared/Object/a.Framework/Services/TextResource/TextResource';

//Helper classes/methods
import ObjectQueue from '@shared/Framework/DataService/ObjectQueue/ObjectQueue';

//BaseCMSElement import.
import * as BaseCMSElement from "@shared/Framework/BaseClass/EditorBaseClass/BaseCMSElement";

/**
 * @name MultiInputSidebar_ModuleProcessor
 * @summary Contains the MultiInputSidebar's editor version module specific methods.
 * */
class MultiInputSidebar_ModuleProcessor extends EditorBase_ModuleProcessor {

    /**
     * @name StoreMapList     
     * @summary Returns list of objects used in the module
     * @return {any} Array of object list
     */
    static StoreMapList() {
        return ["Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/e.Editor/Modules/6_CMSElement/CMSMultiInput/MultiInputSidebar"];
    }

    /**
     * @name LoadInitialData
     * @param {object} objContext {state, props, dispatch, MultiInputSidebar_ModuleProcessor}
     * @summary Calls the Queue and Execute method
     */
    LoadInitialData(objContext) {
        (new ObjectQueue()).QueueAndExecute(objContext.MultiInputSidebar_ModuleProcessor.InitialDataParams(objContext.props));
    }

    /**
     * @name InitialDataParams
     * @param {object} props passes props
     * @summary Get initial request params for the component.
     * @returns {object} return objDataCalls
     */
    InitialDataParams(props) {
        let arrResourceParams = ["/e.Editor/Modules/6_CMSElement/CMSMultiInput/MultiInputSidebar"];
        Object_Framework_Services_TextResource.Initialize(arrResourceParams);
        let arrDataRequest = [Object_Framework_Services_TextResource];
        return arrDataRequest;
    }

    /**
     * @name IsNumericOrDoubleValue
     * @param {string} strValue value to be checked
     * @summary Checks if a value is numerical or decimal point value.
     * @returns {boolean} true/false
     */
    IsNumericOrDoubleValue(strValue) {
        let regex = /^[-]?[0-9]+([.][0]*[1-9]+)?([,][-]?[0-9]+([.][0]*[1-9]+)?)*$/;
        if (regex.test(strValue)) {
            return true;
        }
        return false;
    }

    /**
     * @name IsCorrectTolerance
     * @param {string} strValue value to be checked
     * @summary Checks if the tolerance value is correct or not.
     */
    IsCorrectTolerance(strValue) {
        let regex = /^[0-9]+([.]?[0-9]+)?$/;
        if (regex.test(strValue)) {
            return true;
        }
        return false;
    }

    /**
     * @name OnCaseChange
     * @param {object} objContext {state, props, dispatch, MultiInputSidebar_ModuleProcessor}
     * @summary Invoked when the CaseChange checkbox is clicked.
     */
    OnCaseChange(objContext) {
        objContext.dispatch({
            type: "SET_STATE",
            payload: {
                "ElementJson": {
                    ...objContext.state.ElementJson,
                    ["vElementJson"]: {
                        ...objContext.state.ElementJson["vElementJson"],
                        ["cIsCaseSensitive"]: objContext.state.ElementJson["vElementJson"]["cIsCaseSensitive"] === "Y" ? "N" : "Y"
                    }
                }
            }
        });
    }

    /**
     * @name OnNumberOnlyChange
     * @param {object} objContext {state, props, dispatch, MultiInputSidebar_ModuleProcessor}
     * @summary Invoked when 'NumberOnly' checkbox is clicked.
     */
    OnNumberOnlyChange(objContext) {
        objContext.dispatch({
            type: "SET_STATE",
            payload: {
                "ElementJson": {
                    ...objContext.state.ElementJson,
                    ["vElementJson"]: {
                        ...objContext.state.ElementJson["vElementJson"],
                        ["cIsNumber"]: objContext.state.ElementJson["vElementJson"]["cIsNumber"] === "Y" ? "N" : "Y",
                        ["cIsCaseSensitive"]: "N"
                    }
                }
            }
        });
    }

    /**
     * @name OnChangePoints
     * @param {object} objContext {state, props, dispatch, MultiInputSidebar_ModuleProcessor}
     * @param {string} strValue point
     * @summary Input handler for the point override.
     */
    OnNAInputChange(objContext, strValue) {
        if (strValue === "-" || !isNaN(Number(strValue))) {
            objContext.dispatch({
                "type": "SET_STATE",
                "payload": {
                    "NAFieldValue": strValue
                }
            });
        }
    }

    /**
     * @name OnChangePoints
     * @param {object} objContext {state, props, dispatch, MultiInputSidebar_ModuleProcessor}
     * @param {string} strValue point
     * @summary Input handler for the point override.
     */
    OnWAInputChange(objContext, strValue) {
        if (strValue === "-" || !isNaN(Number(strValue))) {
            objContext.dispatch({
                "type": "SET_STATE",
                "payload": {
                    "WAFieldValue": strValue
                }
            });
        }
    }

    /**
     * @name OnCAInputChange
     * @param {object} objContext {state, props, dispatch, MultiInputSidebar_ModuleProcessor}
     * @param {string} strValue value
     * @summary Invoked when the value of the 'CA' field changes.
     */
    OnCAInputChange(objContext, strValue) {
        if (strValue === "-" || !isNaN(Number(strValue))) {
            objContext.dispatch({
                "type": "SET_STATE",
                "payload": {
                    "CAFieldValue": strValue
                }
            });
        }
    }

    /**
     * @name AddValue
     * @param {object} objContext {state, props, dispatch, MultiInputSidebar_ModuleProcessor}
     * @summary Trigerred when the Add button clicked.
     */
    AddValue(objContext) {
        if (objContext.state.Errors["ListError"].length === 0 && !objContext.state.Errors["ValueError"]) {
            if (objContext.state.ValueFieldValue) {
                let arrValueSplit = objContext.state.ValueFieldValue.split(",");
                let arrValues = [...objContext.state.ElementJson["vElementJson"]["Values"]];
                let dblCorrectPoint = Number(objContext.state.CAFieldValue);
                if (objContext.state.ElementJson["vElementJson"]["cIsNumber"] === "Y") {
                    arrValueSplit.map(strValue => {
                        let dblTolerance = objContext.state.ToleranceFieldValue ? objContext.state.ToleranceFieldValue : "0.0";
                        let objNewValue = MultiInputSidebar_MetaData.GetDefaultValue(objContext, strValue, dblTolerance, dblCorrectPoint);
                        arrValues = [
                            ...arrValues,
                            objNewValue
                        ];
                    });
                }
                else {
                    arrValueSplit.map(strValue => {
                        let objNewValue = MultiInputSidebar_MetaData.GetDefaultValue(objContext, strValue, null, dblCorrectPoint);
                        arrValues = [
                            ...arrValues,
                            objNewValue
                        ];
                    });
                }
                arrValues = BaseCMSElement.UpdateDisplayOrder(arrValues);
                objContext.MultiInputSidebar_ModuleProcessor.UpdateStateForAddOrUpdateValue(objContext, arrValues);
            }
            else {
                let strError = objContext.MultiInputSidebar_ModuleProcessor.GetInputError(objContext, "VALUE", "");
                objContext.dispatch({ type: "SET_STATE", payload: { "Errors": { ...objContext.state.Errors, ["ValueError"]: strError }, "ValueFieldValue": "" } });
            }
        }
    }

    /**
     * @name UpdateValue
     * @param {object} objContext {state, props, dispatch, MultiInputSidebar_ModuleProcessor}
     * @summary Trigerred when the Update button is clicked.
     */
    UpdateValue(objContext) {
        if (objContext.state.Errors["ListError"].length === 0 && !objContext.state.Errors["ValueError"]) {
            let dblCorrectPoint = Number(objContext.state.CAFieldValue);
            let arrValueSplit = objContext.state.ValueFieldValue.split(",");
            let arrValues = [];
            if (objContext.state.ElementJson["vElementJson"]["cIsNumber"] === "Y") {
                objContext.state.ElementJson["vElementJson"]["Values"].map(objTempValue => {
                    if (objTempValue["iElementMultiInputValueId"] === objContext.state.iElementMultiInputValueId) {
                        arrValueSplit.map((strValue, intCount) => {
                            let dblTolerance = objContext.state.ToleranceFieldValue ? objContext.state.ToleranceFieldValue : "0.0";
                            if (intCount === 0) {
                                arrValues = [
                                    ...arrValues,
                                    {
                                        ...objTempValue,
                                        ["vText"]: strValue,
                                        ["dTolerance"]: dblTolerance,
                                        ["dCorrectpoint"]: dblCorrectPoint
                                    }
                                ];
                            }
                            else {
                                let objNewValue = MultiInputSidebar_MetaData.GetDefaultValue(objContext, strValue, dblTolerance, dblCorrectPoint);
                                arrValues = [
                                    ...arrValues,
                                    objNewValue
                                ];
                            }
                        });
                    }
                    else {
                        arrValues = [
                            ...arrValues,
                            objTempValue
                        ];
                    }
                });
            }
            else {
                objContext.state.ElementJson["vElementJson"]["Values"].map(objTempValue => {
                    if (objTempValue["iElementMultiInputValueId"] === objContext.state.iElementMultiInputValueId) {
                        arrValueSplit.map((strValue, intCount) => {
                            if (intCount === 0) {
                                arrValues = [
                                    ...arrValues,
                                    {
                                        ...objTempValue,
                                        ["vText"]: strValue,
                                        ["dCorrectPoint"]: dblCorrectPoint
                                    }
                                ];
                            }
                            else {
                                let objNewValue = MultiInputSidebar_MetaData.GetDefaultValue(objContext, strValue, null, dblCorrectPoint);
                                arrValues = [
                                    ...arrValues,
                                    objNewValue
                                ];
                            }
                        });
                    }
                    else {
                        arrValues = [
                            ...arrValues,
                            objTempValue
                        ];
                    }
                });
            }
            arrValues = BaseCMSElement.UpdateDisplayOrder(arrValues);
            objContext.MultiInputSidebar_ModuleProcessor.UpdateStateForAddOrUpdateValue(objContext, arrValues);
        }
    }

    /**
     * @name UpdateStateForAddOrUpdateValue
     * @param {object} objContext {state, props, dispatch, MultiInputSidebar_ModuleProcessor}
     * @param {array} arrValues values array
     * @summary Updates the state for add and update operations
     */
    UpdateStateForAddOrUpdateValue(objContext, arrValues) {
        objContext.dispatch({
            type: "SET_STATE",
            payload: {
                "ElementJson": {
                    ...objContext.state.ElementJson,
                    ["vElementJson"]: {
                        ...objContext.state.ElementJson["vElementJson"],
                        ["Values"]: arrValues
                    }
                },
                "Errors": {
                    ...objContext.state.Errors,
                    ["ValueError"]: "",
                    ["ListError"]: []
                },
                "ValueFieldValue": "",
                "ToleranceFieldValue": "",
                "iElementMultiInputValueId": "",
                "ShowCancelButton": false,
                "CAFieldValue": ""
            }
        });
    }

    /**
     * @name RemoveValue
     * @param {object} objContext {state, props, dispatch, MultiInputSidebar_ModuleProcessor}
     * @param {object} objValue MultiInput value
     * @summary Triggered when the remove(X) button is clicked in the value display row.
     */
    RemoveValue(objContext, objValue) {
        let arrErrorAtValueId = objContext.MultiInputSidebar_ModuleProcessor.GetListError(objContext, objValue["iElementMultiInputValueId"]);
        let arrValues = objContext.state.ElementJson["vElementJson"]["Values"].filter(objTempValue => objTempValue["iElementMultiInputValueId"] !== objValue["iElementMultiInputValueId"]);
        arrValues = BaseCMSElement.UpdateDisplayOrder(arrValues);
        if (objContext.state.ValueFieldValue === objValue["vText"]) {
            objContext.dispatch({
                type: "SET_STATE",
                payload: {
                    "ElementJson": {
                        ...objContext.state.ElementJson,
                        ["vElementJson"]: {
                            ...objContext.state.ElementJson["vElementJson"],
                            ["Values"]: [...arrValues]
                        }
                    },
                    "Errors": {
                        ...objContext.state.Errors,
                        ["ValueError"]: "",
                        ["ListError"]: arrErrorAtValueId
                    },
                    "ValueFieldValue": "",
                    "ToleranceFieldValue": "",
                    "iElementMultiInputValueId": "",
                    "CAFieldValue": "",
                    "ShowCancelButton": false
                }
            });
        }
        else {
            objContext.dispatch({
                type: "SET_STATE",
                payload: {
                    "ElementJson": {
                        ...objContext.state.ElementJson,
                        ["vElementJson"]: {
                            ...objContext.state.ElementJson["vElementJson"],
                            ["Values"]: [...arrValues]
                        }
                    },
                    "Errors": {
                        ...objContext.state.Errors,
                        ["ListError"]: arrErrorAtValueId
                    }
                }
            });
        }
    }

    /**
     * @name GetInputError
     * @param {object} objContext {state, props, dispatch, MultiInputSidebar_ModuleProcessor}
     * @param {string} strFieldName value/tolerance
     * @param {string} strValue value
     * @summary Called to check the errors while typing in the 'value' or 'tolerance' field.
     * @returns {string} Error message
     */
    GetInputError(objContext, strFieldName, strValue) {
        let objTextResource = Object_Framework_Services_TextResource.GetData("/e.Editor/Modules/6_CMSElement/CMSMultiInput/MultiInputSidebar", objContext.props);
        let strReturnValue = "";
        switch (strFieldName) {
            case "VALUE":
                if (!strValue) {
                    strReturnValue = objContext.MultiInputSidebar_ModuleProcessor.TextFormatter(objTextResource, "EmptyValuesError");
                }
                else if (strValue.split(",").filter(strTempValue => objContext.state.ElementJson["vElementJson"]["Values"].filter(objTempValue => objTempValue["vText"].toString() === strTempValue).length > 0).length > 0) {
                    strReturnValue = objContext.MultiInputSidebar_ModuleProcessor.TextFormatter(objTextResource, "ValueAlreadyExist");
                }
                else if (objContext.state.ElementJson["vElementJson"]["cIsNumber"] === "Y" && isNaN(Number(strValue))) {
                    strReturnValue = objContext.MultiInputSidebar_ModuleProcessor.TextFormatter(objTextResource, "NonNumericValuesError");
                }
                break;
            case "TOLERANCE":
                if (strValue !== "" && isNaN(Number(strValue))) {
                    //strReturnValue = objContext.MultiInputSidebar_ModuleProcessor.TextFormatter(objTextResource, "NonNumericValuesError");
                    strReturnValue = "Invalid";
                }
                break;
        }
        return strReturnValue;
    }

    /**
     * @name GetListError
     * @param {object} objContext {state, props, dispatch, MultiInputSidebar_ModuleProcessor}
     * @param {number} iElementMultiInputValueIdToExclude MultiInput value id
     * @summary Returns the errors in the list of displayed value.
     * @returns {any} array of errors
     */
    GetListError(objContext, iElementMultiInputValueIdToExclude) {
        let arrErrorAtValueId = [];
        if (objContext.state.ElementJson["vElementJson"]["cIsNumber"] === "Y") {
            objContext.state.ElementJson["vElementJson"]["Values"].map(objTempValue => {
                if (!objContext.MultiInputSidebar_ModuleProcessor.IsNumericOrDoubleValue(objTempValue["vText"])) {
                    if (iElementMultiInputValueIdToExclude && objTempValue["iElementMultiInputValueId"] !== iElementMultiInputValueIdToExclude) {
                        arrErrorAtValueId = [...arrErrorAtValueId, objTempValue["iElementMultiInputValueId"]];
                    }
                    else {
                        arrErrorAtValueId = [...arrErrorAtValueId, objTempValue["iElementMultiInputValueId"]];
                    }
                }
            });
        }
        return arrErrorAtValueId;
    }

    /**
     * @name GetDropdownData
     * @param {object} objContext {state, props, dispatch, MultiInputSidebar_ModuleProcessor}
     * @summary Used to select the number of input fields to be displayed for the MultiInput Element
     * @returns {any} array of count of values.
     */
    GetDropdownData(objContext) {
        let arrData = [];
        for (let intCounter = 1; intCounter < objContext.state.ElementJson["vElementJson"]["Values"].length; intCounter++) {
            arrData = [
                ...arrData,
                intCounter.toString()
            ];
        }
        return arrData;
    }

    /**
     * @name ChangeUnitOfMeasurementInput
     * @param {object} objContext {state, props, dispatch, MultiInputSidebar_ModuleProcessor}
     * @param {string} strValue value given by user
     * @summary sets the measurement unit for the multi input element
     */
    ChangeUnitOfMeasurementInput(objContext, strValue) {
        objContext.dispatch({
            type: "SET_STATE",
            payload: {
                "ElementJson": {
                    ...objContext.state.ElementJson,
                    ["vElementJson"]: {
                        ...objContext.state.ElementJson["vElementJson"],
                        ["vMeasurementUnit"]: strValue
                    }
                }
            }
        });
    }

    /**
     * @name ChangeMeasurementPrefixSelection
     * @param {object} objContext {state, props, dispatch, MultiInputSidebar_ModuleProcessor}
     * @sumamry Invoked when the selection of measurement prefix field changes.
     */
    ChangeMeasurementPrefixSelection(objContext) {
        objContext.dispatch({
            type: "SET_STATE",
            payload: {
                "ElementJson": {
                    ...objContext.state.ElementJson,
                    ["vElementJson"]: {
                        ...objContext.state.ElementJson["vElementJson"],
                        ["cHasMeasurementPrefix"]: objContext.state.ElementJson["vElementJson"]["cHasMeasurementPrefix"] === "Y" ? "N" : "Y"
                    }
                }
            }
        });
    }

    /**
     * @name ChangeNumberOfFieldsVisibleInTest
     * @param {object} objContext {state, props, dispatch, MultiInputSidebar_ModuleProcessor}
     * @param {string} strValue value given by user
     * @summary Triggered when the selection is changed in the NumberOfFieldsVisibleInTest select field.
     */
    ChangeNumberOfFieldsVisibleInTest(objContext, strValue) {
        objContext.dispatch({
            type: "SET_STATE",
            payload: {
                "ElementJson": {
                    ...objContext.state.ElementJson,
                    ["vElementJson"]: {
                        ...objContext.state.ElementJson["vElementJson"],
                        ["iNumberOfInputDisplay"]: parseInt(strValue)
                    }
                }
            }
        });
    }

    /**
     * @name ChangeWidth
     * @param {object} objContext {state, props, dispatch, MultiInputSidebar_ModuleProcessor}
     * @param {string} strValue value
     * @summary Invoked when the value in the width filed changes.
     */
    ChangeWidth(objContext, strValue) {
        if (strValue[0] && strValue[0] === "0") {
            strValue = "";
        }
        let regex = /^[1-9][0-9]{0,2}$/;
        if (strValue === "" || regex.test(strValue)) {
            objContext.dispatch({
                type: "SET_STATE",
                payload: {
                    "ElementJson": {
                        ...objContext.state.ElementJson,
                        ["vElementJson"]: {
                            ...objContext.state.ElementJson["vElementJson"],
                            ["iWidthInPixel"]: strValue
                        }
                    }
                }
            });
        }
    }

    /**
     * @name OnValueInputChange
     * @param {object} objContext {state, props, dispatch, MultiInputSidebar_ModuleProcessor}
     * @param {string} strValue value
     * @summary Invoked when the value of the 'value' field changes.
     */
    OnValueInputChange(objContext, strValue) {
        let strError = objContext.MultiInputSidebar_ModuleProcessor.GetInputError(objContext, "VALUE", strValue);
        objContext.dispatch({
            type: "SET_STATE",
            payload: {
                "Errors": {
                    ...objContext.state.Errors,
                    ["ValueError"]: strError
                },
                "ValueFieldValue": strValue
            }
        });
    }

    /**
     * @name OnToleranceInputChange
     * @param {object} objContext {state, props, dispatch, MultiInputSidebar_ModuleProcessor}
     * @param {string} strValue value
     * @summary Invoked when the value of the 'tolerance' field changes.
     */
    OnToleranceInputChange(objContext, strValue) {
        let strError = objContext.MultiInputSidebar_ModuleProcessor.GetInputError(objContext, "TOLERANCE", strValue,);
        if (!strError) {
            objContext.dispatch({ type: "SET_STATE", payload: { "ToleranceFieldValue": strValue } });
        }
    }

    /**
     * @name SetValuesForUpdate
     * @param {object} objContext {state, props, dispatch, MultiInputSidebar_ModuleProcessor}
     * @param {object} objValue MultiInput value
     * @summary Invoked when a value is clicked from the displayed values rows.
     */
    SetValuesForUpdate(objContext, objValue) {
        objContext.dispatch({
            type: "SET_STATE",
            payload: {
                "ShowCancelButton": true,
                "ValueFieldValue": objValue["vText"],
                "ToleranceFieldValue": objValue["dTolerance"] ? objValue["dTolerance"] : "0.0",
                "iElementMultiInputValueId": objValue["iElementMultiInputValueId"],
                "CAFieldValue": objValue["dCorrectPoint"]
            }
        });
    }

    /**
     * @name HideCancelButton
     * @param {object} objContext {state, props, dispatch, MultiInputSidebar_ModuleProcessor}
     * @summary Hides the Cancel button.
     */
    HideCancelButton(objContext) {
        objContext.dispatch({
            type: "SET_STATE",
            payload: {
                "Errors": { ...objContext.state.Errors, ["ValueError"]: "" },
                "ShowCancelButton": false,
                "ToleranceFieldValue": "0.0",
                "ValueFieldValue": "",
                "iElementMultiInputValueId": ""
            }
        });
    }

    /**
     * @name Save
     * @param {object} objContext {state, props, dispatch, MultiInputSidebar_ModuleProcessor}
     * @summary Calls the 'UpdateElementJson' method of the CMSMultiInput element to update the element json.
     */
    Save(objContext) {
        let blnValidWidth = objContext.state.ElementJson["vElementJson"]["iWidthInPixel"] && parseInt(objContext.state.ElementJson["vElementJson"]["iWidthInPixel"]) >= 10 ? true : false;
        if (blnValidWidth && !objContext.state.Errors["ValueError"] && objContext.state.Errors["ListError"].length === 0 && objContext.state.ElementJson["vElementJson"]["Values"].length > 0) {
            let objElementJson;
            if (objContext.state.ElementJson["cIsFirstLoad"] && objContext.state.ElementJson["cIsFirstLoad"] === "Y") {
                let { cIsFirstLoad, ...objNewElementJson } = objContext.state.ElementJson;
                objElementJson = { ...objNewElementJson };
            }
            else {
                objElementJson = { ...objContext.state.ElementJson };
            }
            if (parseInt(objElementJson["vElementJson"]["iNumberOfInputDisplay"]) === 0) {
                objElementJson = {
                    ...objElementJson,
                    ["vElementJson"]: {
                        ...objElementJson["vElementJson"],
                        ["iNumberOfInputDisplay"]: objElementJson["vElementJson"]["Values"].length
                    }
                };
            }
            objElementJson = {
                ...objElementJson,
                ["vElementJson"]: {
                    ...objElementJson["vElementJson"],
                    ["dWrongPoint"]: objContext.state.WAFieldValue,
                    ["dNotAnsweredPoint"]: objContext.state.NAFieldValue
                }
            };
            objContext.props.PassedEvents.UpdateElementJson(objElementJson);
        }
    }

    /**
     * @name GetDynamicStyles
     * @param {object} props component props.
     * @summary this returns the styles for the SSR.
     */
    GetDynamicStyles(props) {
        return [
            props.JConfiguration.EditorSkinPath + "/Css/Application/ReactJs/PC/Modules/6_CMSElement/CMSMultiInput/MultiInputSidebar/MultiInputSidebarStyles.css"
        ];
    }
}

export default MultiInputSidebar_ModuleProcessor;
