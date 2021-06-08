//React imports
import React from 'react';

//Module realted fies.
import CMSRadioMatrix_Editor_ContextMenu from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSRadioMatrix/CMSRadioMatrix_Editor/CMSRadioMatrix_Editor_ContextMenu";

//Module realted fies.
import * as CMSRadioMatrix_Editor_MetaData from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSRadioMatrix/CMSRadioMatrix_Editor/CMSRadioMatrix_Editor_MetaData";
import * as CMSText_Editor_MetaData from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSText/CMSText_Editor/CMSText_Editor_MetaData";

//Application State classes/methods
import ApplicationState from "@shared/Framework/DataService/ApplicationState/ApplicationState";
import EditorState from '@shared/Framework/DataService/EditorState/EditorState';

//UniqueId.
import * as UniqueId from "@root/Framework/Services/UniqueId/UniqueId";

//BaseCMSElement import.
import * as BaseCMSElement from "@shared/Framework/BaseClass/EditorBaseClass/BaseCMSElement";

/**
 * @name CMSRadioMatrix_Editor_ModuleProcessor
 * @summary Contains the RadioMatrix's editor version module specific methods.
 */
class CMSRadioMatrix_Editor_ModuleProcessor extends CMSRadioMatrix_Editor_ContextMenu {

    /**
     * @name GetPointOverride
     * @param {object} objContext {state, props, dispatch, CMSRadioMatrix_Editor_ModuleProcessor}
     * @summary this collect the points from Element json and return.
     * @ruturns {object} objPoint {Points : [], isSinglePoint : true/false}.
     */
    GetPointOverride(objContext) {
        let objPoint = {
            "Points": [],
            "NA": objContext.state.ElementJson["vElementJson"]["dNotAnsweredPoint"] ? objContext.state.ElementJson["vElementJson"]["dNotAnsweredPoint"] : 0,
            "isSinglePoint": false
        };
        objPoint.Points = objContext.state.ElementJson.vElementJson.Values.map(objTempValue => {
            return {
                "CA": objTempValue.dCorrectPoint ? objTempValue.dCorrectPoint : 0,
                "WA": objTempValue.dWrongPoint ? objTempValue.dWrongPoint : 0,
                "ValueId": objTempValue.iElementRadioMatrixRowId,
                "iDisplayOrder": objTempValue.iDisplayOrder
            };
        });
        return objPoint;
    }

    /**
     * @name SetPointOverride
     * @param {object} objContext {state, props, dispatch, CMSRadioMatrix_Editor_ModuleProcessor}
     * @param {object} objPoints points for the element {Points : [], isSinglePoint : true/false}.
     * @summary this update the Points from the sidebar.
     */
    SetPointOverride(objContext, objPoints) {
        let objElementJson = {
            ...objContext.state.ElementJson,
            "vElementJson": {
                ...objContext.state.ElementJson.vElementJson,
                "cIsPointOverride": "Y",
                "dNotAnsweredPoint": objPoints.NA,
                "Values": objContext.state.ElementJson.vElementJson.Values.map(objTempValue => {
                    let objPoint = objPoints.Points.find(objPointTemp => objPointTemp.ValueId == objTempValue.iElementRadioMatrixRowId);
                    return {
                        ...objTempValue,
                        "dCorrectPoint": objPoint.CA,
                        "dWrongPoint": objPoint.WA
                    };
                })
            }
        };
        objContext.CMSRadioMatrix_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
        objContext.dispatch({ type: "SET_STATE", payload: { "ElementJson": objElementJson } });
    }

    /**
     * @name RemovePointOverride
     * @param {object} objContext {state, props, dispatch, CMSRadioMatrix_Editor_ModuleProcessor}
     * @summary Removes overriden points.
     */
    RemovePointOverride(objContext) {
        let objElementJson = {
            ...objContext.state.ElementJson,
            "vElementJson": {
                ...objContext.state.ElementJson.vElementJson,
                "cIsPointOverride": "N",
                "dNotAnsweredPoint": 0,
                "Values": objContext.state.ElementJson.vElementJson.Values.map(objTempValue => {
                    return {
                        ...objTempValue,
                        "dCorrectPoint": 0,
                        "dWrongPoint": 0
                    };
                })
            }
        };
        objContext.CMSRadioMatrix_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
        objContext.dispatch({ type: "SET_STATE", payload: { "ElementJson": objElementJson } });
    }

    /**
     * @name ChangeSelection
     * @param {object} objContext {state, props, dispatch, CMSRadioMatrix_Editor_ModuleProcessor}
     * @param {object} objRowValue radio row value
     * @param {object} objMatrixColumn radio column value
     * @summary Update the json when the radio is clicked.
     */
    ChangeSelection(objContext, objRowValue, objMatrixColumn) {
        let arrValues = objContext.state.ElementJson["vElementJson"]["Values"].filter(objTempValue => objTempValue["iElementRadioMatrixRowId"] !== objRowValue["iElementRadioMatrixRowId"]);
        arrValues = [
            ...arrValues,
            {
                "iElementRadioMatrixId": objContext.state.ElementJson["iElementId"],
                "iElementRadioMatrixRowId": objRowValue["iElementRadioMatrixRowId"],
                "iElementRadioMatrixColumnId": objMatrixColumn["iElementRadioMatrixColumnId"]
            }
        ];
        objContext.CMSRadioMatrix_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
        objContext.dispatch({
            type: "SET_STATE", payload: {
                "ElementJson": {
                    ...objContext.state.ElementJson,
                    ["vElementJson"]: {
                        ...objContext.state.ElementJson["vElementJson"],
                        ["Values"]: arrValues
                    }
                }
            }
        });
    }

    /**
     * @name InsertRowAbove
     * @param {object} objParams {objContext: {state, props, dispatch, CMSRadioMatrix_Editor_ModuleProcessor}, objValue}
     * @summary Inserts a row with default value ablove the passed value.
     */
    InsertRowAbove(objParams) {
        let { objContext, objValue, objTextResource } = objParams;
        let intElementTextId = UniqueId.GetUniqueId();
        let objTextElementJson = CMSText_Editor_MetaData.GetDefaultElementJson(1, intElementTextId, objTextResource["Default_Text"]);
        let objDefaultRow = CMSRadioMatrix_Editor_MetaData.GetDefaultRow(objContext, intElementTextId);
        let objDefaultValue = CMSRadioMatrix_Editor_MetaData.GetDefaultValue(objContext, objDefaultRow["iElementRadioMatrixRowId"]);
        let arrMatrixRow = objContext.state.ElementJson["vElementJson"]["MatrixRow"];
        let intInsertIndex = arrMatrixRow.findIndex(objTempMatrixRow => objTempMatrixRow["iElementRadioMatrixRowId"] === objValue["iElementRadioMatrixRowId"]);
        let arrNewData = [...arrMatrixRow.slice(0, intInsertIndex), objDefaultRow, ...arrMatrixRow.slice(intInsertIndex, arrMatrixRow.length)];
        let arrValues = [
            ...objContext.state.ElementJson["vElementJson"]["Values"],
            objDefaultValue
        ];
        let arrNewTextElements = [
            ...objContext.state.ElementJson["vElementJson"]["TextElements"],
            {
                ...objTextElementJson,
                ["Ref"]: React.createRef()
            }
        ];
        objContext.CMSRadioMatrix_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
        objContext.dispatch({
            type: "SET_STATE", payload: {
                "ElementJson": {
                    ...objContext.state.ElementJson,
                    ["vElementJson"]: {
                        ...objContext.state.ElementJson["vElementJson"],
                        ["MatrixRow"]: BaseCMSElement.UpdateDisplayOrder(arrNewData),
                        ["Values"]: BaseCMSElement.UpdateDisplayOrder(arrValues),
                        ["TextElements"]: arrNewTextElements
                    }
                }
            }
        });
    }

    /**
     * @name InsertRowBelow
     * @param {object} objParams {objContext: {state, props, dispatch, CMSRadioMatrix_Editor_ModuleProcessor}, objValue}
     * @summary Inserts a row with default value below the passed value.
     */
    InsertRowBelow(objParams) {
        let { objContext, objValue, objTextResource } = objParams;
        let intElementTextId = UniqueId.GetUniqueId();
        let objTextElementJson = CMSText_Editor_MetaData.GetDefaultElementJson(1, intElementTextId, objTextResource["Default_Text"]);
        let objDefaultRow = CMSRadioMatrix_Editor_MetaData.GetDefaultRow(objContext, intElementTextId);
        let objDefaultValue = CMSRadioMatrix_Editor_MetaData.GetDefaultValue(objContext, objDefaultRow["iElementRadioMatrixRowId"]);
        let arrMatrixRow = [...objContext.state.ElementJson["vElementJson"]["MatrixRow"]];
        let intInsertIndex = arrMatrixRow.findIndex(objTempMatrixRow => objTempMatrixRow["iElementRadioMatrixRowId"] === objValue["iElementRadioMatrixRowId"]);
        let arrNewData = [...arrMatrixRow.slice(0, intInsertIndex + 1), objDefaultRow, ...arrMatrixRow.slice(intInsertIndex + 1, arrMatrixRow.length)];
        let arrValues = [
            ...objContext.state.ElementJson["vElementJson"]["Values"],
            objDefaultValue
        ];
        let arrNewTextElements = [
            ...objContext.state.ElementJson["vElementJson"]["TextElements"],
            {
                ...objTextElementJson,
                ["Ref"]: React.createRef()
            }
        ];
        objContext.CMSRadioMatrix_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
        objContext.dispatch({
            type: "SET_STATE", payload: {
                "ElementJson": {
                    ...objContext.state.ElementJson,
                    ["vElementJson"]: {
                        ...objContext.state.ElementJson["vElementJson"],
                        ["MatrixRow"]: BaseCMSElement.UpdateDisplayOrder(arrNewData),
                        ["Values"]: BaseCMSElement.UpdateDisplayOrder(arrValues),
                        ["TextElements"]: arrNewTextElements
                    }
                }
            }
        });
    }

    /**
     * @name InsertColumnLeft
     * @param {object} objParams {objContext: {state, props, dispatch, CMSRadioMatrix_Editor_ModuleProcessor}, objValue}
     * @summary Inserts a row with default value to the Left of the passed value.
     */
    InsertColumnLeft(objParams) {
        let { objContext, objValue, objTextResource } = objParams;
        let intElementTextId = UniqueId.GetUniqueId();
        let objTextElementJson = CMSText_Editor_MetaData.GetDefaultElementJson(1, intElementTextId, objTextResource["Default_Text"]);
        let objDefaultValue = CMSRadioMatrix_Editor_MetaData.GetDefaultColumn(objContext, intElementTextId);
        let arrMatrixColumn = objContext.state.ElementJson["vElementJson"]["MatrixColumn"];
        let intInsertIndex = arrMatrixColumn.findIndex(objTempMatrixColumn => objTempMatrixColumn["iElementRadioMatrixColumnId"] === objValue["iElementRadioMatrixColumnId"]);
        let arrNewData = [...arrMatrixColumn.slice(0, intInsertIndex), objDefaultValue, ...arrMatrixColumn.slice(intInsertIndex, arrMatrixColumn.length)];
        let arrNewTextElements = [
            ...objContext.state.ElementJson["vElementJson"]["TextElements"],
            {
                ...objTextElementJson,
                ["Ref"]: React.createRef()
            }
        ];
        objContext.CMSRadioMatrix_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
        objContext.dispatch({
            type: "SET_STATE", payload: {
                "ElementJson": {
                    ...objContext.state.ElementJson,
                    ["vElementJson"]: {
                        ...objContext.state.ElementJson["vElementJson"],
                        ["MatrixColumn"]: BaseCMSElement.UpdateDisplayOrder(arrNewData),
                        ["TextElements"]: arrNewTextElements
                    }
                }
            }
        });
    }

    /**
     * @name InsertColumnRight
     * @param {object} objParams {objContext: {state, props, dispatch, CMSRadioMatrix_Editor_ModuleProcessor}, objValue}
     * @summary Inserts a row with default value to the right of the passed value.
     */
    InsertColumnRight(objParams) {
        let { objContext, objValue, objTextResource } = objParams;
        let intElementTextId = UniqueId.GetUniqueId();
        let objTextElementJson = CMSText_Editor_MetaData.GetDefaultElementJson(1, intElementTextId, objTextResource["Default_Text"]);
        let objDefaultValue = CMSRadioMatrix_Editor_MetaData.GetDefaultColumn(objContext, intElementTextId);
        let arrMatrixColumn = objContext.state.ElementJson["vElementJson"]["MatrixColumn"];
        let intInsertIndex = arrMatrixColumn.findIndex(objMatrixColumn => objMatrixColumn["iElementRadioMatrixColumnId"] === objValue["iElementRadioMatrixColumnId"]);
        let arrNewData = [...arrMatrixColumn.slice(0, intInsertIndex + 1), objDefaultValue, ...arrMatrixColumn.slice(intInsertIndex + 1, arrMatrixColumn.length)];
        let arrNewTextElements = [
            ...objContext.state.ElementJson["vElementJson"]["TextElements"],
            {
                ...objTextElementJson,
                ["Ref"]: React.createRef()
            }
        ];
        objContext.CMSRadioMatrix_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
        objContext.dispatch({
            type: "SET_STATE", payload: {
                "ElementJson": {
                    ...objContext.state.ElementJson,
                    ["vElementJson"]: {
                        ...objContext.state.ElementJson["vElementJson"],
                        ["MatrixColumn"]: BaseCMSElement.UpdateDisplayOrder(arrNewData),
                        ["TextElements"]: arrNewTextElements
                    }
                }
            }
        });
    }

    /**
     * @name MoveRowUp
     * @param {object} objParams {objContext: {state, props, dispatch, CMSRadioMatrix_Editor_ModuleProcessor}, objValue}
     * @summary Moves a row one place up to the passed value.
     */
    MoveRowUp(objParams) {
        let { objContext, objValue } = objParams;
        let intActiveRowIndex = objContext.state.ElementJson["vElementJson"]["MatrixRow"].findIndex(objMatrixRow => objMatrixRow["iElementRadioMatrixRowId"] === objValue["iElementRadioMatrixRowId"]);
        objContext.CMSRadioMatrix_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
        objContext.dispatch({
            type: "SET_STATE", payload: {
                "ElementJson": {
                    ...objContext.state.ElementJson,
                    ["vElementJson"]: {
                        ...objContext.state.ElementJson["vElementJson"],
                        ["MatrixRow"]: BaseCMSElement.UpdateDisplayOrder(BaseCMSElement.ImmutableSwap(objContext.state.ElementJson["vElementJson"]["MatrixRow"], intActiveRowIndex, intActiveRowIndex - 1))
                    }
                }
            }
        });
    }

    /**
     * @name MoveRowDown
     * @param {object} objParams {objContext: {state, props, dispatch, CMSRadioMatrix_Editor_ModuleProcessor}, objValue}
     * @summary Moves a row one place down to the passed value.
     */
    MoveRowDown(objParams) {
        let { objContext, objValue } = objParams;
        let intActiveRowIndex = objContext.state.ElementJson["vElementJson"]["MatrixRow"].findIndex(objMatrixRow => objMatrixRow["iElementRadioMatrixRowId"] === objValue["iElementRadioMatrixRowId"]);
        objContext.CMSRadioMatrix_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
        objContext.dispatch({
            type: "SET_STATE", payload: {
                "ElementJson": {
                    ...objContext.state.ElementJson,
                    ["vElementJson"]: {
                        ...objContext.state.ElementJson["vElementJson"],
                        ["MatrixRow"]: BaseCMSElement.UpdateDisplayOrder(BaseCMSElement.ImmutableSwap(objContext.state.ElementJson["vElementJson"]["MatrixRow"], intActiveRowIndex, intActiveRowIndex + 1))
                    }
                }
            }
        });
    }

    /**
     * @name AlignValue
     * @param {object} objParams {objContext: {state, props, dispatch, CMSRadioMatrix_Editor_ModuleProcessor}, objValue: checkbox value object}
     * @summary Change the alignment of the radio button in the row.
     */
    AlignValue(objParams) {
        let { objContext, objValue, Align } = objParams;
        let arrNewValues = objContext.state.ElementJson["vElementJson"]["MatrixRow"].map((objTempValue) => {
            if (objTempValue["iElementRadioMatrixRowId"] === objValue["iElementRadioMatrixRowId"]) {
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
                ["MatrixRow"]: arrNewValues
            }
        };
        objContext.CMSRadioMatrix_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
        objContext.dispatch({ type: "SET_STATE", payload: { "ElementJson": objElementJson } });
    }

    /**
     * @name MoveColumnLeft
     * @param {object} objParams {objContext: {state, props, dispatch, CMSRadioMatrix_Editor_ModuleProcessor}, objValue}
     * @summary Moves a row one place left to the passed value.
     */
    MoveColumnLeft(objParams) {
        let { objContext, objValue } = objParams;
        let intActiveColumnIndex = objContext.state.ElementJson["vElementJson"]["MatrixColumn"].findIndex(objColumn => objColumn["iElementRadioMatrixColumnId"] === objValue["iElementRadioMatrixColumnId"]);
        objContext.CMSRadioMatrix_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
        objContext.dispatch({
            type: "SET_STATE", payload: {
                "ElementJson": {
                    ...objContext.state.ElementJson,
                    ["vElementJson"]: {
                        ...objContext.state.ElementJson["vElementJson"],
                        ["MatrixColumn"]: BaseCMSElement.UpdateDisplayOrder(BaseCMSElement.ImmutableSwap(objContext.state.ElementJson["vElementJson"]["MatrixColumn"], intActiveColumnIndex, intActiveColumnIndex - 1))
                    }
                }
            }
        });
    }

    /**
     * @name MoveColumnRight
     * @param {object} objParams {objContext: {state, props, dispatch, CMSRadioMatrix_Editor_ModuleProcessor}, objValue}
     * @summary Moves a row one place right to the passed value.
     */
    MoveColumnRight(objParams) {
        let { objContext, objValue } = objParams;
        let intActiveColumnIndex = objContext.state.ElementJson["vElementJson"]["MatrixColumn"].findIndex(objColumn => objColumn["iElementRadioMatrixColumnId"] === objValue["iElementRadioMatrixColumnId"]);
        objContext.CMSRadioMatrix_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
        objContext.dispatch({
            type: "SET_STATE", payload: {
                "ElementJson": {
                    ...objContext.state.ElementJson,
                    ["vElementJson"]: {
                        ...objContext.state.ElementJson["vElementJson"],
                        ["MatrixColumn"]: BaseCMSElement.UpdateDisplayOrder(BaseCMSElement.ImmutableSwap(objContext.state.ElementJson["vElementJson"]["MatrixColumn"], intActiveColumnIndex, intActiveColumnIndex + 1))
                    }
                }
            }
        });
    }

    /**
     * @name DeleteRow
     * @param {object} objParams {objContext: {state, props, dispatch, CMSRadioMatrix_Editor_ModuleProcessor}, objValue}
     * @summary Deletes the passed row.
     */
    DeleteRow(objParams) {
        let { objContext, objValue } = objParams;
        let arrNewMatrixRow = objContext.state.ElementJson["vElementJson"]["MatrixRow"].filter(objTempMatrixRow => objTempMatrixRow["iElementRadioMatrixRowId"] !== objValue["iElementRadioMatrixRowId"]);
        let arrNewValues = objContext.state.ElementJson["vElementJson"]["Values"].filter(objTempValue => objTempValue["iElementRadioMatrixRowId"] !== objValue["iElementRadioMatrixRowId"]);
        let arrNewTextElements = objContext.state.ElementJson["vElementJson"]["TextElements"].filter(objTempTextElement => objTempTextElement["iElementId"] !== objValue["iElementTextId"]);
        objContext.CMSRadioMatrix_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
        objContext.dispatch({
            type: "SET_STATE", payload: {
                "ElementJson": {
                    ...objContext.state.ElementJson,
                    ["vElementJson"]: {
                        ...objContext.state.ElementJson["vElementJson"],
                        ["MatrixRow"]: BaseCMSElement.UpdateDisplayOrder(arrNewMatrixRow),
                        ["Values"]: arrNewValues,
                        ["TextElements"]: arrNewTextElements
                    }
                }
            }
        });
    }

    /**
     * @name DeleteColumn
     * @param {object} objParams {objContext: {state, props, dispatch, CMSRadioMatrix_Editor_ModuleProcessor}, objValue}
     * @summary Deletes the passed column.
     */
    DeleteColumn(objParams) {
        let { objContext, objValue } = objParams;
        let arrNewMatrixColumn = objContext.state.ElementJson["vElementJson"]["MatrixColumn"].filter(objTempMatrixColumn => objTempMatrixColumn["iElementRadioMatrixColumnId"] !== objValue["iElementRadioMatrixColumnId"]);
        let arrNewValues = objContext.state.ElementJson["vElementJson"]["Values"].filter(objTempValue => objTempValue["iElementRadioMatrixColumnId"] !== objValue["iElementRadioMatrixColumnId"]);
        let arrNewTextElements = objContext.state.ElementJson["vElementJson"]["TextElements"].filter(objTempTextElement => objTempTextElement["iElementId"] !== objValue["iElementTextId"]);
        objContext.CMSRadioMatrix_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
        objContext.dispatch({
            type: "SET_STATE", payload: {
                "ElementJson": {
                    ...objContext.state.ElementJson,
                    ["vElementJson"]: {
                        ...objContext.state.ElementJson["vElementJson"],
                        ["MatrixColumn"]: BaseCMSElement.UpdateDisplayOrder(arrNewMatrixColumn),
                        ["Values"]: arrNewValues,
                        ["TextElements"]: arrNewTextElements
                    }
                }
            }
        });
    }

    /**
     * @name RandomDisplay
     * @param {object} objParams {objContext: {state, props, dispatch, CMSRadioMatrix_Editor_ModuleProcessor}, strGridField}
     * @summary Sets the random display for test application version.
     */
    RandomDisplay(objParams) {
        let { objContext, strGridField } = objParams;
        let objElementJson = {};
        if (strGridField === "COLUMN") {
            objElementJson = {
                ...objContext.state.ElementJson,
                ["vElementJson"]: {
                    ...objContext.state.ElementJson["vElementJson"],
                    ["cIsRandomizedColumnDisplay"]: objContext.state.ElementJson["vElementJson"]["cIsRandomizedColumnDisplay"] === "N" ? "Y" : "N"
                }
            };
        }
        if (strGridField === "ROW") {
            objElementJson = {
                ...objContext.state.ElementJson,
                ["vElementJson"]: {
                    ...objContext.state.ElementJson["vElementJson"],
                    ["cIsRandomizedRowDisplay"]: objContext.state.ElementJson["vElementJson"]["cIsRandomizedRowDisplay"] === "N" ? "Y" : "N"
                }
            };

        }
        objContext.CMSRadioMatrix_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
        objContext.dispatch({ type: "SET_STATE", payload: { "ElementJson": objElementJson } });
    }

    /**
     * @name ChangeOrientationOfRowHeader
     * @param {object} objParams {objContext: {state, props, dispatch, CMSRadioMatrix_Editor_ModuleProcessor}}
     * @summary Sets the random display for test application version.
     */
    ChangeOrientationOfRowHeader(objParams) {
        let { objContext } = objParams;
        let objElementJson = {
            ...objContext.state.ElementJson,
            ["vElementJson"]: {
                ...objContext.state.ElementJson["vElementJson"],
                ["cIsTitleToLeft"]: objContext.state.ElementJson["vElementJson"]["cIsTitleToLeft"] === "N" ? "Y" : "N"
            }
        };
        objContext.CMSRadioMatrix_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
        objContext.dispatch({ type: "SET_STATE", payload: { "ElementJson": objElementJson } });
    }

    /**
     * @name CloseSidebar
     * @summary Closes the side bar.
     */
    CloseSidebar() {
        const fnHideSidebar = ApplicationState.GetProperty("hideSidebar");
        fnHideSidebar();
    }

    /**
     * @name LookAndFeel
     * @param {object} objParams {objContext: {state, props, dispatch, CMSRadioMatrix_Editor_ModuleProcessor}}
     * @summary Opens the LookAndFeel sidebar.
     */
    LookAndFeel(objParams) {
        let { objContext } = objParams;
        objContext.CMSRadioMatrix_Editor_ModuleProcessor.CloseSidebar();
        let objTextResource = EditorState.GetReference("CommonTextResource");
        const fnShowSidebar = ApplicationState.GetProperty("showSidebar");
        fnShowSidebar({
            "Data": {
                "ElementJson": { ...objContext.state.ElementJson },
                "Skins": CMSRadioMatrix_Editor_MetaData.GetSkins()
            },
            "PassedEvents": {
                "UpdateElementJson": (objNewElementJson) => {
                    objContext.CMSRadioMatrix_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
                    objContext.dispatch({ type: "SET_STATE", payload: { "ElementJson": objNewElementJson } });
                    objContext.CMSRadioMatrix_Editor_ModuleProcessor.CloseSidebar();
                },
                "Preview": (objNewElementJson) => {
                    objContext.CMSRadioMatrix_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
                    objContext.dispatch({ type: "SET_STATE", payload: { "ElementJson": objNewElementJson } });
                },
                "CloseSidebar": (objData) => {
                    objContext.CMSRadioMatrix_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
                    objContext.dispatch({ type: "SET_STATE", payload: { "ElementJson": objData.ElementJson } });
                    objContext.CMSRadioMatrix_Editor_ModuleProcessor.CloseSidebar();
                }
            },
            "SidebarProps": {
                "SidebarName": "LookAndFeelSidebar",
                "Header": objContext.CMSRadioMatrix_Editor_ModuleProcessor.TextFormatter(objTextResource, "LookNFeel_SidebarHeader"),
                "Title": objContext.CMSRadioMatrix_Editor_ModuleProcessor.TextFormatter(objTextResource, "LookNFeel_SidebarTitle"),
                "Status": 1,
                "AutoHide": true
            }
        });
    }

    /**
     * @name LookAndFeel
     * @param {object} objParams {objContext: {state, props, dispatch, CMSRadioMatrix_Editor_ModuleProcessor}}
     * @summary Opens the LookAndFeel sidebar.
     */
    TrueFalse(objParams) {
        let { objContext, objTextResource } = objParams;
        let objDefaultElementJson;
        if (objContext.state.ElementJson["vElementJson"]["cIsTrueFlase"] === "N") {
            objDefaultElementJson = CMSRadioMatrix_Editor_MetaData.GetDefaultElementJsonForTrueFalse(objContext, objTextResource);
        }
        else {
            objDefaultElementJson = CMSRadioMatrix_Editor_MetaData.GetDefaultElementJson(objContext.state.ElementJson["iOrder"]);
        }
        let arrTextElements = objDefaultElementJson["vElementJson"]["TextElements"].map(x => {
            return {
                ...x,
                ["Ref"]: React.createRef(),
                ["TextRef"]: React.createRef()
            };
        });
        let objElementJson = {
            ...objDefaultElementJson,
            ["iElementId"]: objContext.state.ElementJson["iElementId"],
            ["Ref"]: objContext.state.ElementJson["Ref"],
            ["vElementJson"]: {
                ...objDefaultElementJson["vElementJson"],
                ["TextElements"]: arrTextElements
            }
        };
        objContext.CMSRadioMatrix_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
        objContext.dispatch({ type: "SET_STATE", payload: { "ElementJson": objElementJson } });
    }

    /**
     * @name LoadLikert
     * @param {object} objParams {objContext: {state, props, dispatch, CMSRadioMatrix_Editor_ModuleProcessor}}
     * @summary Display/Hide likert
     */
    LoadLikert(objParams) {
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
                    ["cIsLikert"]: "Y",
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
            let arrTextElements = [...objContext.state.ElementJson["vElementJson"]["TextElements"]]
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
                    ["cSetHeaderFooterAsTitle"]: "N",
                    ["TextElements"]: arrTextElements
                }
            };
        }
        objContext.CMSRadioMatrix_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
        objContext.dispatch({ type: "SET_STATE", payload: { "ElementJson": objElementJson } });
    }

    /**
     * @name SetHeaderFooterAsTitle
     * @param {object} objParams {objContext: {state, props, dispatch, CMSRadioMatrix_Editor_ModuleProcessor}}
     * @summary Sets/Remove Header and Footer As Title
     */
    SetHeaderFooterAsTitle(objParams) {
        let { objContext } = objParams;
        let objElementJson = {
            ...objContext.state.ElementJson,
            ["vElementJson"]: {
                ...objContext.state.ElementJson["vElementJson"],
                ["cSetHeaderFooterAsTitle"]: objContext.state.ElementJson["vElementJson"]["cSetHeaderFooterAsTitle"] === "Y" ? "N" : "Y"
            }
        };
        objContext.CMSRadioMatrix_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
        objContext.dispatch({ type: "SET_STATE", payload: { "ElementJson": objElementJson } });
    }

    /**
     * @name OnBlur
     * @param {object} objContext {state, props, dispatch, CMSCheckbox_Editor_ModuleProcessor}
     * @param {object} objTextElementJson Text Element Json
     * @summary Gets the Element json of header/footer text and updates it.
     */
    async OnBlur(objContext, objTextElementJson) {
        objContext = objContext.props.ElementRef.current.GetLatestContext();
        let objTempElementJson = await objTextElementJson["Ref"].current.GetElementJson(false);
        let objElementJson = {
            ...objContext.state.ElementJson,
            ["vElementJson"]: {
                ...objContext.state.ElementJson["vElementJson"],
                ["TextElements"]: objContext.state.ElementJson["vElementJson"]["TextElements"].map(x => {
                    if (x["iElementId"] === objTextElementJson["iElementId"]) {
                        return {
                            ...x,
                            ["vElementJson"]: {
                                ...x["vElementJson"],
                                ["vText"]: objTempElementJson["vElementJson"]["vText"],
                                ["SubElements"]: objTempElementJson["vElementJson"]["SubElements"]
                            }
                        }
                    }
                    else {
                        return { ...x };
                    }
                })
            }
        };
        objContext.CMSRadioMatrix_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
        objContext.dispatch({ type: "SET_STATE", payload: { "ElementJson": objElementJson } });
    }

    /**
     * @name GetDynamicStyles
     * @param {object} props component props.
     * @summary this returns the styles for the SSR.
     */
    GetDynamicStyles(props) {
        return [
            props.JConfiguration.EditorSkinPath + "/Css/Application/ReactJs/PC/Modules/6_CMSElement/CMSRadioMatrix/CMSRadioMatrixStyles.css"
        ];
    }
}

export default CMSRadioMatrix_Editor_ModuleProcessor;
