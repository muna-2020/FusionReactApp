//React imports
import React from 'react';

//Module related fies.
import CMSCheckbox_Editor_ContextMenu from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSCheckbox/CMSCheckbox_Editor/CMSCheckbox_Editor_ContextMenu";
import * as CMSCheckbox_Editor_MetaData from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSCheckbox/CMSCheckbox_Editor/CMSCheckbox_Editor_MetaData";
import * as CMSText_Editor_MetaData from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSText/CMSText_Editor/CMSText_Editor_MetaData";

//Application State classes/methods
import ApplicationState from "@shared/Framework/DataService/ApplicationState/ApplicationState";
import EditorState from '@shared/Framework/DataService/EditorState/EditorState';

//UniqueId.
import * as UniqueId from "@root/Framework/Services/UniqueId/UniqueId";

//BaseCMSElement import.
import * as BaseCMSElement from "@shared/Framework/BaseClass/EditorBaseClass/BaseCMSElement";

/**
 * @name CMSCheckbox_Editor_ModuleProcessor
 * @summary Contains the checkbox's editor version module specific methods.
 * */
class CMSCheckbox_Editor_ModuleProcessor extends CMSCheckbox_Editor_ContextMenu {

    /**
     * @name CloseSidebar
     * @summary Closes the side bar.
     */
    CloseSidebar() {
        const fnHideSidebar = ApplicationState.GetProperty("hideSidebar");
        fnHideSidebar();
    }

    /**
     * @name PreserveTextState
     * @param {object} objContext {state, props, dispatch}.
     * @param {object} objState state to be preserved.
     * @summary Preserving text state for undo-redo purpose.
     */
    PreserveTextState(objContext, objState) {
        objContext.Element_UndoRedoDataRef.current = {
            ...objContext.Element_UndoRedoDataRef.current,
            [objState.ElementJson.iElementId]: { ...objState }
        };
        if (objContext.props.ParentRef && objContext.props.ParentRef.current && objContext.props.ParentRef.current.PreserveElementState) {
            objContext.props.ParentRef.current.PreserveElementState({ ...objContext.state, TextState: objContext.Element_UndoRedoDataRef.current });
        }
    }

    /**
     * @name GetPointOverride
     * @param {object} objContext {state, props, dispatch}.
     * @summary this collect the points from Element json and return.
     * @returns {object} objPoint {Points : [], isNACommon : true/false}.
     */
    GetPointOverride(objContext) {
        let objPoint = {
            "Points": [],
            "NA": objContext.state.ElementJson["vElementJson"]["dNotAnsweredPoint"],
            "isSinglePoint": false
        };
        objPoint.Points = objContext.state.ElementJson["vElementJson"]["Values"].map(objTempValue => {
            return {
                "CA": objTempValue["dCorrectPoint"],
                "WA": objTempValue["dWrongPoint"],
                "ValueId": objTempValue["iElementCheckBoxValueId"],
                "iDisplayOrder": objTempValue["iDisplayOrder"]
            };
        });
        return objPoint;
    }

    /**
     * @name SetPointOverride
     * @param {object} objContext {state, props, dispatch}.
     * @param {any} objPoints points for the element {Points : [], isNACommon : true/false}.
     * @summary this update the Points from the sidebar.
     */
    SetPointOverride(objContext, objPoints) {
        let objElementJson = {
            ...objContext.state.ElementJson,
            ["vElementJson"]: {
                ...objContext.state.ElementJson["vElementJson"],
                "cIsPointOverride": "Y",
                "dNotAnsweredPoint": objPoints.NA,
                "Values": objContext.state.ElementJson["vElementJson"]["Values"].map(objTempValue => {
                    let objPoint = objPoints.Points.find(objPointTemp => objPointTemp.ValueId === objTempValue.iElementCheckBoxValueId);
                    return {
                        ...objTempValue,
                        "dCorrectPoint": objPoint.CA,
                        "dWrongPoint": objPoint.WA
                    }
                })
            }
        };
        objContext.CMSCheckbox_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
        objContext.dispatch({ type: "SET_STATE", payload: { "ElementJson": objElementJson } });
    }

    /**
     * @name RemovePointOverride
     * @param {object} objContext {state, props, dispatch}.
     * @summary  removes point override.
     */
    RemovePointOverride(objContext) {
        let objElementJson = {
            ...objContext.state.ElementJson,
            "vElementJson": {
                ...objContext.state.ElementJson["vElementJson"],
                "cIsPointOverride": "N",
                "dNotAnsweredPoint": 0,
                "Values": objContext.state.ElementJson["vElementJson"]["Values"].map(objValue => {
                    return {
                        ...objValue,
                        "dCorrectPoint": 0,
                        "dWrongPoint": 0
                    }
                })
            }
        };
        objContext.CMSCheckbox_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
        objContext.dispatch({ type: "SET_STATE", payload: { "ElementJson": objElementJson } });
    }

    /**
     * @name ChangeOrientation
     * @param {object} objParams {objContext: {state, props, dispatch, CMSCheckbox_Editor_ModuleProcessor}, strValue: "Y"or"N"}
     * @summary change orientation to horizonalt/vertical.
     */
    ChangeOrientation(objParams) {
        let { objContext, strValue } = objParams;
        let objElementJson = {
            ...objContext.state.ElementJson,
            ["vElementJson"]: {
                ...objContext.state.ElementJson["vElementJson"],
                ["cIsHorizontal"]: strValue
            }
        };
        objContext.CMSCheckbox_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
        objContext.dispatch({ type: "SET_STATE", payload: { "ElementJson": objElementJson } });
    }

    /**
     * @name InsertAbove
     * @param {object} objParams {objContext: {state, props, dispatch, CMSCheckbox_Editor_ModuleProcessor}, objValue: checkbox value object}
     * @summary add a new checkbox above/left of active checkbox.
     */
    InsertAbove(objParams) {
        let { objContext, objValue, objTextResource } = objParams;
        let intElementTextId = UniqueId.GetUniqueId();
        let objDefaultCheckBoxValueObject = CMSCheckbox_Editor_MetaData.GetDefaultCheckboxValueObject(objContext, intElementTextId);
        let objTextElementJson = CMSText_Editor_MetaData.GetDefaultElementJson(1, intElementTextId);
        let arrValues = objContext.state.ElementJson["vElementJson"]["Values"];
        let intInsertIndex = arrValues.findIndex(objTempValue => objTempValue['iElementCheckBoxValueId'] === objValue['iElementCheckBoxValueId']);
        let arrNewValues = [...arrValues.slice(0, intInsertIndex), { ...objDefaultCheckBoxValueObject }, ...arrValues.slice(intInsertIndex, arrValues.length)];
        let arrNewTextElements = [
            ...objContext.state.ElementJson["vElementJson"]["TextElements"],
            {
                ...objTextElementJson,
                ["vElementJson"]: {
                    ...objTextElementJson["vElementJson"],
                    ["vText"]: objTextResource["Default_Text"]
                },
                ["Ref"]: React.createRef()
            }
        ];
        objContext.CMSCheckbox_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
        objContext.dispatch({
            type: "SET_STATE",
            payload: {
                "ElementJson": {
                    ...objContext.state.ElementJson,
                    ["vElementJson"]: {
                        ...objContext.state.ElementJson["vElementJson"],
                        ["MatrixInformation"]: {
                            ...objContext.state.ElementJson["vElementJson"]["MatrixInformation"],
                            ["iNumberOfCheckboxes"]: arrNewValues.length
                        },
                        ["Values"]: BaseCMSElement.UpdateDisplayOrder(arrNewValues),
                        ["TextElements"]: arrNewTextElements
                    }
                }
            }
        });
    }

    /**
     * @name InsertBelow
     * @param {object} objParams {objContext: {state, props, dispatch, CMSCheckbox_Editor_ModuleProcessor}, objValue: checkbox value object}
     * @summary add a new checkbox below/right the active checkbox. objValue is activeCheckBox
     */
    InsertBelow(objParams) {
        let { objContext, objValue, objTextResource } = objParams;
        let intElementTextId = UniqueId.GetUniqueId();
        let objDefaultCheckBoxValueObject = CMSCheckbox_Editor_MetaData.GetDefaultCheckboxValueObject(objContext, intElementTextId);
        let objTextElementJson = CMSText_Editor_MetaData.GetDefaultElementJson(1, intElementTextId);
        let arrValues = objContext.state.ElementJson["vElementJson"]["Values"];
        let intInsertIndex = arrValues.findIndex(objTempValue => objTempValue['iElementCheckBoxValueId'] === objValue['iElementCheckBoxValueId']);
        let arrNewValues = [...arrValues.slice(0, intInsertIndex + 1), { ...objDefaultCheckBoxValueObject }, ...arrValues.slice(intInsertIndex + 1, arrValues.length)];
        let arrNewTextElements = [
            ...objContext.state.ElementJson["vElementJson"]["TextElements"],
            {
                ...objTextElementJson,
                ["vElementJson"]: {
                    ...objTextElementJson["vElementJson"],
                    ["vText"]: objTextResource["Default_Text"]
                },
                ["Ref"]: React.createRef()
            }
        ];
        objContext.CMSCheckbox_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
        objContext.dispatch({
            type: "SET_STATE",
            payload: {
                "ElementJson": {
                    ...objContext.state.ElementJson,
                    ["vElementJson"]: {
                        ...objContext.state.ElementJson["vElementJson"],
                        ["MatrixInformation"]: {
                            ...objContext.state.ElementJson["vElementJson"]["MatrixInformation"],
                            ["iNumberOfCheckboxes"]: arrNewValues.length
                        },
                        ["Values"]: BaseCMSElement.UpdateDisplayOrder(arrNewValues),
                        ["TextElements"]: arrNewTextElements
                    }
                }
            }
        });
    }

    /**
     * @name MoveUp
     * @param {object} objParams {objContext: {state, props, dispatch, CMSCheckbox_Editor_ModuleProcessor}, objValue: checkbox value object}
     * @summary move the checkbox value up/left
     */
    MoveUp(objParams) {
        let { objContext, objValue } = objParams;
        let intActiveObjIndex = objContext.state.ElementJson["vElementJson"]["Values"].findIndex(objTempValue => objTempValue['iElementCheckBoxValueId'] === objValue['iElementCheckBoxValueId']);
        let objElementJson = {
            ...objContext.state.ElementJson,
            ["vElementJson"]: {
                ...objContext.state.ElementJson["vElementJson"],
                ["Values"]: BaseCMSElement.UpdateDisplayOrder(BaseCMSElement.ImmutableSwap(objContext.state.ElementJson["vElementJson"]["Values"], intActiveObjIndex, intActiveObjIndex - 1))
            }
        };
        objContext.CMSCheckbox_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
        objContext.dispatch({ type: "SET_STATE", payload: { "ElementJson": objElementJson } });
    }

    /**
     * @name MoveDown
     * @param {object} objParams {objContext: {state, props, dispatch, CMSCheckbox_Editor_ModuleProcessor}, objValue: checkbox value object}
     * @summary move the checkbox value down/right
     */
    MoveDown(objParams) {
        let { objContext, objValue } = objParams;
        let intActiveObjIndex = objContext.state.ElementJson["vElementJson"]["Values"].findIndex(objTempValue => objTempValue['iElementCheckBoxValueId'] === objValue['iElementCheckBoxValueId']);
        let objElementJson = {
            ...objContext.state.ElementJson,
            ["vElementJson"]: {
                ...objContext.state.ElementJson["vElementJson"],
                ["Values"]: BaseCMSElement.UpdateDisplayOrder(BaseCMSElement.ImmutableSwap(objContext.state.ElementJson["vElementJson"]["Values"], intActiveObjIndex, intActiveObjIndex + 1))
            }
        };
        objContext.CMSCheckbox_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
        objContext.dispatch({ type: "SET_STATE", payload: { "ElementJson": objElementJson } });
    }

    /**
     * @name Remove
     * @param {object} objParams {objContext: {state, props, dispatch, CMSCheckbox_Editor_ModuleProcessor}, objValue: checkbox value object}
     * @summary remove active obj from the Values. objValue is activeCheckBox.
     */
    Remove(objParams) {
        let { objContext, objValue } = objParams;
        let arrNewValues = [...objContext.state.ElementJson["vElementJson"]["Values"].filter(objTempValue => objTempValue["iElementCheckBoxValueId"] !== objValue["iElementCheckBoxValueId"])];
        let arrNewTextElements = [...objContext.state.ElementJson["vElementJson"]["TextElements"].filter(objTempElement => objTempElement["iElementId"] !== objValue["iElementTextId"])];
        let objElementJson = {
            ...objContext.state.ElementJson,
            ["vElementJson"]: {
                ...objContext.state.ElementJson["vElementJson"],
                ["MatrixInformation"]: {
                    ...objContext.state.ElementJson["vElementJson"]["MatrixInformation"],
                    ["iNumberOfCheckboxes"]: arrNewValues.length
                },
                ["Values"]: BaseCMSElement.UpdateDisplayOrder(arrNewValues),
                ["TextElements"]: arrNewTextElements
            }
        };
        objContext.CMSCheckbox_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
        objContext.dispatch({ type: "SET_STATE", payload: { "ElementJson": objElementJson } });
    }

    /**
     * @name AlignValue
     * @param {object} objParams {objContext: {state, props, dispatch, CMSCheckbox_Editor_ModuleProcessor}, objValue: checkbox value object}
     * @summary Change the alignment of the checkbox value.
     */
    AlignValue(objParams) {
        let { objContext, objValue, Align } = objParams;
        let arrNewValues = objContext.state.ElementJson["vElementJson"]["Values"].map((objTempValue) => {
            if (objTempValue["iElementCheckBoxValueId"] === objValue["iElementCheckBoxValueId"]) {
                return {
                    ...objTempValue,
                    ["vVerticalAlign"]: Align
                };
            }
            else {
                return {
                    ...objTempValue
                };
            }
        });
        let objElementJson = {
            ...objContext.state.ElementJson,
            ["vElementJson"]: {
                ...objContext.state.ElementJson["vElementJson"],
                ["Values"]: arrNewValues
            }
        };
        objContext.CMSCheckbox_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
        objContext.dispatch({ type: "SET_STATE", payload: { "ElementJson": objElementJson } });
    }

    /**
     * @name RandomDisplay
     * @param {object} objParams {objContext: {state, props, dispatch, CMSCheckbox_Editor_ModuleProcessor}}
     * @summary Sets the random display for test application version.
     */
    RandomDisplay(objParams) {
        let { objContext } = objParams;
        let objElementJson = {
            ...objContext.state.ElementJson,
            ["vElementJson"]: {
                ...objContext.state.ElementJson["vElementJson"],
                ["cIsRandomDisplay"]: objContext.state.ElementJson["vElementJson"]["cIsRandomDisplay"] === "N" ? "Y" : "N"
            }
        };
        objContext.CMSCheckbox_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
        objContext.dispatch({ type: "SET_STATE", payload: { "ElementJson": objElementJson } });
    }

    /**
     * @name ShowMatrixForm
     * @param {object} objParams {objContext: {state, props, dispatch, CMSCheckbox_Editor_ModuleProcessor}}
     * @summary Sets the Matrix display on/off.
     */
    async ShowMatrixForm(objParams) {
        let { objContext } = objParams;
        let arrTextElements = [...objContext.state.ElementJson["vElementJson"]["TextElements"]];
        let arrNewTextElements = [];
        for (let intCount = 0; intCount < arrTextElements.length; intCount++) {
            let objTextElementJson = { ...arrTextElements[intCount] };
            if (objTextElementJson.Ref.current && objTextElementJson.Ref.current.GetElementJson) {
                objTextElementJson = await objTextElementJson.Ref.current.GetElementJson(false);
            }
            arrNewTextElements = [
                ...arrNewTextElements,
                {
                    ...objTextElementJson
                }
            ];
        }
        let objElementJson = {
            ...objContext.state.ElementJson,
            ["vElementJson"]: {
                ...objContext.state.ElementJson["vElementJson"],
                ["TextElements"]: arrNewTextElements
            }
        };
        if (objElementJson["vElementJson"]["cIsMatrixDisplay"] === "Y") {
            objContext.CMSCheckbox_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
            objContext.dispatch({
                type: "SET_STATE", payload: {
                    "ElementJson": {
                        ...objElementJson,
                        ["vElementJson"]: {
                            ...objElementJson["vElementJson"],
                            ["cIsMatrixDisplay"]: "N"
                        }
                    }
                }
            });
        }
        else {
            objContext.CMSCheckbox_Editor_ModuleProcessor.ShowCheckBoxMatrixSidebar(objContext, objElementJson);
        }
    }

    /**
     * @name ShowMatrixPropertiesSidebar
     * @param {object} objParams {objContext: {state, props, dispatch, CMSCheckbox_Editor_ModuleProcessor}}
     * @summary Opens the checkbox's matrix sidebar.
     */
    async ShowMatrixPropertiesSidebar(objParams) {
        let { objContext } = objParams;
        let arrTextElements = [...objContext.state.ElementJson["vElementJson"]["TextElements"]];
        let arrNewTextElements = [];
        for (let intCount = 0; intCount < arrTextElements.length; intCount++) {
            let objTextElementJson = { ...arrTextElements[intCount] };
            if (objTextElementJson.Ref.current && objTextElementJson.Ref.current.GetElementJson) {
                objTextElementJson = await objTextElementJson.Ref.current.GetElementJson(false);
            }
            arrNewTextElements = [
                ...arrNewTextElements,
                {
                    ...objTextElementJson
                }
            ];
        }
        let objElementJson = {
            ...objContext.state.ElementJson,
            ["vElementJson"]: {
                ...objContext.state.ElementJson["vElementJson"],
                ["TextElements"]: arrNewTextElements
            }
        };
        objContext.CMSCheckbox_Editor_ModuleProcessor.ShowCheckBoxMatrixSidebar(objContext, objElementJson);
    }

    /**
     * @name ShowCheckBoxMatrixSidebar
     * @param {object} objContext {state, props, dispatch}
     * @param {object} objElementJson Element json to be sent to sidebar.
     * @summary Opens up the side bar.
     */
    ShowCheckBoxMatrixSidebar(objContext, objElementJson) {
        objContext.CMSCheckbox_Editor_ModuleProcessor.CloseSidebar();
        let objTextResource = EditorState.GetReference("CommonTextResource");
        const fnShowSidebar = ApplicationState.GetProperty("showSidebar");
        fnShowSidebar({
            "FolderID": objContext.props.FolderID,
            "ContainerId": objContext.props.ContainerId,
            "ElementJson": { ...objElementJson },
            "PassedEvents": {
                "UpdateElementJson": (objNewElementJson) => {
                    objContext.CMSCheckbox_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
                    objContext.dispatch({ type: "SET_STATE", payload: { "ElementJson": objNewElementJson } });
                    objContext.CMSCheckbox_Editor_ModuleProcessor.CloseSidebar();
                }
            },
            "SidebarProps": {
                "SidebarName": "CheckboxSidebar",
                "Header": objContext.CMSCheckbox_Editor_ModuleProcessor.TextFormatter(objTextResource, "Checkbox_SidebarHeader"),
                "Title": objContext.CMSCheckbox_Editor_ModuleProcessor.TextFormatter(objTextResource, "Checkbox_SidebarTitle"),
                "Status": 1,
                "AutoHide": false
            }
        });
    }

    /**
     * @name OnCheckChange
     * @param {object} objContext {state, props, dispatch, CMSCheckbox_Editor_ModuleProcessor}
     * @param {object} objValue checkbox value object
     * @summary Triggered when the checkbox is checked/unchecked.
     */
    OnCheckChange(objContext, objValue) {
        let arrValues = objContext.state.ElementJson["vElementJson"]["Values"].map(objTempValue => {
            if (objTempValue["iElementCheckBoxValueId"] === objValue["iElementCheckBoxValueId"]) {
                return {
                    ...objTempValue,
                    ["cIsCorrectValue"]: objTempValue["cIsCorrectValue"] === "N" ? "Y" : "N"
                };
            }
            else {
                return { ...objTempValue };
            }
        });
        let objElementJson = {
            ...objContext.state.ElementJson,
            ["vElementJson"]: {
                ...objContext.state.ElementJson["vElementJson"],
                ["Values"]: arrValues
            }
        };
        objContext.CMSCheckbox_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
        objContext.dispatch({ type: "SET_STATE", payload: { "ElementJson": objElementJson } });
    }

    /**
     * @name LookAndFeel
     * @param {object} objParams {objContext: {state, props, dispatch, CMSCheckbox_Editor_ModuleProcessor}}
     * @summary Opens the LookAndFeel sidebar.
     */
    LookAndFeel(objParams) {
        let { objContext } = objParams;
        objContext.CMSCheckbox_Editor_ModuleProcessor.CloseSidebar();
        let objTextResource = EditorState.GetReference("CommonTextResource");
        const fnShowSidebar = ApplicationState.GetProperty("showSidebar");
        fnShowSidebar({
            "Data": {
                "ElementJson": { ...objContext.state.ElementJson },
                "Skins": CMSCheckbox_Editor_MetaData.GetSkins()
            },
            "PassedEvents": {
                "UpdateElementJson": (objNewElementJson) => {
                    objContext.CMSCheckbox_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
                    objContext.dispatch({ type: "SET_STATE", payload: { "ElementJson": objNewElementJson } });
                    objContext.CMSCheckbox_Editor_ModuleProcessor.CloseSidebar();
                },
                "Preview": (objNewElementJson) => {
                    objContext.CMSCheckbox_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
                    objContext.dispatch({ type: "SET_STATE", payload: { "ElementJson": objNewElementJson } });
                },
                "CloseSidebar": (objData) => {
                    objContext.CMSCheckbox_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
                    objContext.dispatch({ type: "SET_STATE", payload: { "ElementJson": objData.ElementJson } });
                    objContext.CMSCheckbox_Editor_ModuleProcessor.CloseSidebar();
                }
            },
            "SidebarProps": {
                "SidebarName": "LookAndFeelSidebar",
                "Header": objContext.CMSCheckbox_Editor_ModuleProcessor.TextFormatter(objTextResource, "LookNFeel_SidebarHeader"),
                "Title": objContext.CMSCheckbox_Editor_ModuleProcessor.TextFormatter(objTextResource, "LookNFeel_SidebarTitle"),
                "Status": 1,
                "AutoHide": true
            }
        });
    }

    /**
     * @name Likert
     * @param {object} objParams {objContext: {state, props, dispatch, CMSCheckbox_Editor_ModuleProcessor}}
     * @summary Opens the LookAndFeel sidebar.
     */
    Likert(objParams) {
        let { objContext, objTextResource } = objParams;
        let objElementJson;
        if (objContext.state.ElementJson["vElementJson"]["cIsLikert"] === "N") {
            let intElementTextId_Header = UniqueId.GetUniqueId();
            let intElementTextId_Footer = UniqueId.GetUniqueId();
            let objHeaderTextElementJson = CMSText_Editor_MetaData.GetDefaultElementJson(1, intElementTextId_Header, objTextResource["DefaultLikertHeaderText"]);
            let objFooterTextElementJson = CMSText_Editor_MetaData.GetDefaultElementJson(1, intElementTextId_Footer, objTextResource["DefaultLikertFooterText"]);
            objElementJson = {
                ...objContext.state.ElementJson,
                ["vElementJson"]: {
                    ...objContext.state.ElementJson["vElementJson"],
                    ["HeaderValues"]: objContext.state.ElementJson["vElementJson"]["HeaderValues"].map(x => {
                        if (x["vHeaderType"] === "TextLeft") {
                            return {
                                ...x,
                                ["iElementTextId"]: intElementTextId_Header
                            };
                        }
                        else if (x["vHeaderType"] === "TextRight") {
                            return {
                                ...x,
                                ["iElementTextId"]: intElementTextId_Footer
                            };
                        }
                        else {
                            return {
                                ...x
                            };
                        }
                    }),
                    ["cIsHorizontal"]: "Y",
                    ["cIsLikert"]: "Y",
                    ["cShowHeaderFooter"]: "Y",
                    ["TextElements"]: [
                        ...objContext.state.ElementJson["vElementJson"]["TextElements"],
                        {
                            ...objHeaderTextElementJson,
                            ["Ref"]: React.createRef()
                        },
                        {
                            ...objFooterTextElementJson,
                            ["Ref"]: React.createRef()
                        }
                    ]
                }
            };
        }
        else {
            let arrTextElements = [...objContext.state.ElementJson["vElementJson"]["TextElements"]];
            let arrHeaderValues = objContext.state.ElementJson["vElementJson"]["HeaderValues"].map(x => {
                if (x["vHeaderType"] === "TextLeft" || x["vHeaderType"] === "TextRight") {
                    arrTextElements = arrTextElements.filter(y => y["iElementId"] !== x["iElementTextId"]);
                    return {
                        ...x,
                        ["iElementTextId"]: null
                    };
                }
                else {
                    return {
                        ...x
                    };
                }
            });
            objElementJson = {
                ...objContext.state.ElementJson,
                ["vElementJson"]: {
                    ...objContext.state.ElementJson["vElementJson"],
                    ["HeaderValues"]: arrHeaderValues,
                    ["cIsLikert"]: "N",
                    ["cShowHeaderFooter"]: "N",
                    ["TextElements"]: arrTextElements
                }
            };
        }
        objContext.CMSCheckbox_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
        objContext.dispatch({ type: "SET_STATE", payload: { "ElementJson": objElementJson } });
    }

    /**
     * @name ShowHeaderFooter
     * @param {object} objParams {objContext: {state, props, dispatch, CMSCheckbox_Editor_ModuleProcessor}}
     * @summary Opens the LookAndFeel sidebar.
     */
    ShowHeaderFooter(objParams) {
        let { objContext, objTextResource } = objParams;
        let objElementJson;
        if (objContext.state.ElementJson["vElementJson"]["cShowHeaderFooter"] === "N") {
            let intElementTextId_Header = UniqueId.GetUniqueId();
            let intElementTextId_Footer = UniqueId.GetUniqueId();
            let objHeaderTextElementJson = CMSText_Editor_MetaData.GetDefaultElementJson(1, intElementTextId_Header, objTextResource["DefaultLikertHeaderText"]);
            let objFooterTextElementJson = CMSText_Editor_MetaData.GetDefaultElementJson(1, intElementTextId_Footer, objTextResource["DefaultLikertFooterText"]);
            objElementJson = {
                ...objContext.state.ElementJson,
                ["vElementJson"]: {
                    ...objContext.state.ElementJson["vElementJson"],
                    ["HeaderValues"]: objContext.state.ElementJson["vElementJson"]["HeaderValues"].map(x => {
                        if (x["vHeaderType"] === "TextLeft") {
                            return {
                                ...x,
                                ["iElementTextId"]: intElementTextId_Header
                            };
                        }
                        else if (x["vHeaderType"] === "TextRight") {
                            return {
                                ...x,
                                ["iElementTextId"]: intElementTextId_Footer
                            };
                        }
                        else {
                            return {
                                ...x
                            };
                        }
                    }),
                    ["cShowHeaderFooter"]: "Y",
                    ["TextElements"]: [
                        ...objContext.state.ElementJson["vElementJson"]["TextElements"],
                        {
                            ...objHeaderTextElementJson,
                            ["Ref"]: React.createRef()
                        },
                        {
                            ...objFooterTextElementJson,
                            ["Ref"]: React.createRef()
                        }
                    ]
                }
            };
        }
        else {
            let arrTextElements = [...objContext.state.ElementJson["vElementJson"]["TextElements"]];
            let arrHeaderValues = objContext.state.ElementJson["vElementJson"]["HeaderValues"].map(x => {
                if (x["vHeaderType"] === "TextLeft" || x["vHeaderType"] === "TextRight") {
                    arrTextElements = arrTextElements.filter(y => y["iElementId"] !== x["iElementTextId"]);
                    return {
                        ...x,
                        ["iElementTextId"]: null
                    };
                }
                else {
                    return {
                        ...x
                    };
                }
            });
            objElementJson = {
                ...objContext.state.ElementJson,
                ["vElementJson"]: {
                    ...objContext.state.ElementJson["vElementJson"],
                    ["HeaderValues"]: arrHeaderValues,
                    ["cShowHeaderFooter"]: "N",
                    ["TextElements"]: arrTextElements
                }
            };
        }
        objContext.CMSCheckbox_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
        objContext.dispatch({ type: "SET_STATE", payload: { "ElementJson": objElementJson } });
    }

    /**
     * @name GetDynamicStyles
     * @param {object} props component props.
     * @summary this returns the styles for the SSR.
     */
    GetDynamicStyles(props) {
        return [
            props.JConfiguration.EditorSkinPath + "/Css/Application/ReactJs/PC/Modules/6_CMSElement/CMSCheckbox/CMSCheckboxStyles.css"
        ];
    }
}

export default CMSCheckbox_Editor_ModuleProcessor;
