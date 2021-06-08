//React imports
import React from 'react';

//Module related fies.
import CMSCheckboxMatrix_Editor_ContextMenu from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSCheckboxMatrix/CMSCheckboxMatrix_Editor/CMSCheckboxMatrix_Editor_ContextMenu";

//Module related files.
import * as CMSCheckboxMatrix_Editor_MetaData from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSCheckboxMatrix/CMSCheckboxMatrix_Editor/CMSCheckboxMatrix_Editor_MetaData";
import * as CMSText_Editor_MetaData from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSText/CMSText_Editor/CMSText_Editor_MetaData";

//Application State classes/methods
import ApplicationState from "@shared/Framework/DataService/ApplicationState/ApplicationState";
import EditorState from '@shared/Framework/DataService/EditorState/EditorState';

//UniqueId.
import * as UniqueId from "@root/Framework/Services/UniqueId/UniqueId";

//BaseCMSElement import.
import * as BaseCMSElement from "@shared/Framework/BaseClass/EditorBaseClass/BaseCMSElement";

/**
 * @name CMSCheckboxMatrix_Editor_ModuleProcessor
 * @summary Contains the CheckboxMatrix's editor version module specific methods.
 * */
class CMSCheckboxMatrix_Editor_ModuleProcessor extends CMSCheckboxMatrix_Editor_ContextMenu {

    /**
     * @name OnCheckChange
     * @param {object} objContext {state, props, dispatch, CMSCheckboxMatrix_Editor_ModuleProcessor}
     * @param {object} objRowItem Checkbox row value
     * @param {object} objColumnItem Checkbox column value
     * @summary Update the json when the check box is clicked.
     */
    OnCheckChange(objContext, objRowItem, objColumnItem) {
        let arrNewValues = objContext.state.ElementJson["vElementJson"]["Values"].map(objTempValue => {
            if (objTempValue["iElementCheckBoxMatrixRowId"] === objRowItem["iElementCheckBoxMatrixRowId"] && objTempValue["iElementCheckBoxMatrixColumnId"] === objColumnItem["iElementCheckBoxMatrixColumnId"]) {
                return {
                    ...objTempValue,
                    ["cIsCorrectValue"]: objTempValue.cIsCorrectValue === "Y" ? "N" : "Y"
                }
            } else {
                return objTempValue
            }
        });
        objContext.CMSCheckboxMatrix_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
        objContext.dispatch({
            type: "SET_STATE", payload: {
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
     * @name GetPointOverride
     * @param {object} objContext {state, props, dispatch}.
     * @summary this collect the points from Element json and return.
     * @ruturns {object} objPoint {Points : [], isSinglePoint : true/false}.
     */
    GetPointOverride(objContext) {
        let objPoint = {
            "Points": [],
            "NA": objContext.state.ElementJson["vElementJson"]["dNotAnsweredPoint"],
            "isSinglePoint": false
        };
        objPoint.Points = objContext.state.ElementJson.vElementJson.Values.map(objTempValue => {
            return {
                "CA": objTempValue.dCorrectPoint ? objTempValue.dCorrectPoint : "",
                "WA": objTempValue.dWrongPoint ? objTempValue.dWrongPoint : "",
                "ValueId": objTempValue.iElementCheckBoxMatrixRowId + "" + objTempValue.iElementCheckBoxMatrixColumnId,
                "iDisplayOrder": objTempValue.iDisplayOrder
            };
        });
        return objPoint;
    }

    /**
     * @name SetPointOverride
     * @param {object} objContext {state, props, dispatch}.
     * @param {any} objPoints points for the element {Points : [], isSinglePoint : true/false}.
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
                    let objPoint = objPoints.Points.find(objPointTemp => objPointTemp.ValueId == objTempValue.iElementCheckBoxMatrixRowId + "" + objTempValue.iElementCheckBoxMatrixColumnId);
                    return {
                        ...objTempValue,
                        "dCorrectPoint": objPoint.CA,
                        "dWrongPoint": objPoint.WA
                    }
                })
            }
        };
        objContext.CMSCheckboxMatrix_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
        objContext.dispatch({
            type: "SET_STATE",
            payload: {
                "ElementJson": objElementJson
            }
        });
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
        objContext.CMSCheckboxMatrix_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
        objContext.dispatch({ type: "SET_STATE", payload: { "ElementJson": objElementJson } });
    }

    /**
     * @name UpdateValueDisplayOrder
     * @param {any} objContext {state, props, dispatch, CMSCheckboxMatrix_Editor_ModuleProcessor}
     * @param {Array} arrValues values. 
     * @summary update the display order of the values.
     * @returns {Array} updated Values.
     */
    UpdateValueDisplayOrder(arrMatrixRow, arrMatrixColumn, arrValues) {
        let arrNewValues = [];
        let intDisplayOrder = 1;
        arrMatrixRow.forEach(objTempRow => {
            arrMatrixColumn.forEach(objTempColumn => {
                let objValue = arrValues.find(objTempValue => objTempValue.iElementCheckBoxMatrixRowId === objTempRow.iElementCheckBoxMatrixRowId
                    && objTempValue.iElementCheckBoxMatrixColumnId === objTempColumn.iElementCheckBoxMatrixColumnId);
                arrNewValues = [...arrNewValues, { ...objValue, ["iDisplayOrder"]: intDisplayOrder }];
                intDisplayOrder = intDisplayOrder + 1;
            });
        });
        return arrNewValues;
    }

    /**
     * @name InsertRowAbove
     * @param {object} objParams {objContext: {state, props, dispatch, CMSCheckboxMatrix_Editor_ModuleProcessor}, objValue}
     * @summary Inserts a row with default value above the passed value.
     */
    InsertRowAbove(objParams) {
        let { objContext, objValue, objTextResource } = objParams;
        let intElementTextId = UniqueId.GetUniqueId();
        let objTextElementJson = CMSText_Editor_MetaData.GetDefaultElementJson(1, intElementTextId);
        let objDefaultRow = CMSCheckboxMatrix_Editor_MetaData.GetDefaultRow(objContext, intElementTextId);
        let arrMatrixRow = objContext.state.ElementJson["vElementJson"]["MatrixRow"];
        let intInsertIndex = arrMatrixRow.findIndex(objTempMatrixRow => objTempMatrixRow["iElementCheckBoxMatrixRowId"] === objValue["iElementCheckBoxMatrixRowId"]);
        let arrNewMatrixRow = BaseCMSElement.UpdateDisplayOrder([...arrMatrixRow.slice(0, intInsertIndex), { ...objDefaultRow }, ...arrMatrixRow.slice(intInsertIndex, arrMatrixRow.length)]);
        let objNewRow = arrNewMatrixRow.find(objTempRow => objTempRow["iElementCheckBoxMatrixRowId"] === objDefaultRow["iElementCheckBoxMatrixRowId"]);
        let arrNewValues = [
            ...objContext.state.ElementJson.vElementJson.Values,
            ...objContext.state.ElementJson.vElementJson.MatrixColumn.map((objColumnTemp, intTempIndex) => {
                return {
                    ["iElementCheckBoxMatrixRowId"]: objNewRow["iElementCheckBoxMatrixRowId"],
                    ["iElementCheckBoxMatrixColumnId"]: objColumnTemp["iElementCheckBoxMatrixColumnId"],
                    ["cIsCorrectValue"]: intTempIndex === 0 ? "Y" : "N"
                };
            })
        ];
        let arrMatrixColumn = objContext.state.ElementJson.vElementJson.MatrixColumn;
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
        objContext.CMSCheckboxMatrix_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
        objContext.dispatch({
            type: "SET_STATE", payload: {
                "ElementJson": {
                    ...objContext.state.ElementJson,
                    ["vElementJson"]: {
                        ...objContext.state.ElementJson["vElementJson"],
                        ["MatrixRow"]: arrNewMatrixRow,
                        ["TextElements"]: arrNewTextElements,
                        ["Values"]: objContext.CMSCheckboxMatrix_Editor_ModuleProcessor.UpdateValueDisplayOrder(arrNewMatrixRow, arrMatrixColumn, arrNewValues)
                    }
                }
            }
        });
    }

    /**
     * @name InsertRowBelow
     * @param {object} objParams {objContext: {state, props, dispatch, CMSCheckboxMatrix_Editor_ModuleProcessor}, objValue}
     * @summary Inserts a row with default value below the passed value.
     */
    InsertRowBelow(objParams) {
        let { objContext, objValue, objTextResource } = objParams;
        let intElementTextId = UniqueId.GetUniqueId();
        let objTextElementJson = CMSText_Editor_MetaData.GetDefaultElementJson(1, intElementTextId);
        let objDefaultRow = CMSCheckboxMatrix_Editor_MetaData.GetDefaultRow(objContext, intElementTextId);
        let arrMatrixRow = [...objContext.state.ElementJson["vElementJson"]["MatrixRow"]];
        let intInsertIndex = arrMatrixRow.findIndex(objTempMatrixRow => objTempMatrixRow["iElementCheckBoxMatrixRowId"] === objValue["iElementCheckBoxMatrixRowId"]);
        let arrNewMatrixRow = BaseCMSElement.UpdateDisplayOrder([...arrMatrixRow.slice(0, intInsertIndex + 1), { ...objDefaultRow }, ...arrMatrixRow.slice(intInsertIndex + 1, arrMatrixRow.length)]);
        let objNewRow = arrNewMatrixRow.find(objTempRow => objTempRow["iElementCheckBoxMatrixRowId"] === objDefaultRow["iElementCheckBoxMatrixRowId"]);
        let arrNewValues = [
            ...objContext.state.ElementJson.vElementJson.Values,
            ...objContext.state.ElementJson.vElementJson.MatrixColumn.map((objColumnTemp, intTempIndex) => {
                return {
                    ["iElementCheckBoxMatrixRowId"]: objNewRow["iElementCheckBoxMatrixRowId"],
                    ["iElementCheckBoxMatrixColumnId"]: objColumnTemp["iElementCheckBoxMatrixColumnId"],
                    ["cIsCorrectValue"]: intTempIndex === 0 ? "Y" : "N",
                };
            })
        ];
        let arrMatrixColumn = objContext.state.ElementJson.vElementJson.MatrixColumn;
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
        objContext.CMSCheckboxMatrix_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
        objContext.dispatch({
            type: "SET_STATE",
            payload: {
                "ElementJson": {
                    ...objContext.state.ElementJson,
                    ["vElementJson"]: {
                        ...objContext.state.ElementJson["vElementJson"],
                        ["MatrixRow"]: arrNewMatrixRow,
                        ["TextElements"]: arrNewTextElements,
                        ["Values"]: objContext.CMSCheckboxMatrix_Editor_ModuleProcessor.UpdateValueDisplayOrder(arrNewMatrixRow, arrMatrixColumn, arrNewValues)
                    }
                }
            }
        });
    }

    /**
     * @name InsertColumnLeft
     * @param {object} objParams {objContext: {state, props, dispatch, CMSCheckboxMatrix_Editor_ModuleProcessor}, objValue}
     * @summary Inserts a row with default value to the Left of the passed value.
     */
    InsertColumnLeft(objParams) {
        let { objContext, objValue, objTextResource } = objParams;
        let intElementTextId = UniqueId.GetUniqueId();
        let objTextElementJson = CMSText_Editor_MetaData.GetDefaultElementJson(1, intElementTextId);
        let objDefaultColumn = CMSCheckboxMatrix_Editor_MetaData.GetDefaultColumn(objContext, intElementTextId);
        let arrMatrixColumn = objContext.state.ElementJson["vElementJson"]["MatrixColumn"];
        let intInsertIndex = arrMatrixColumn.findIndex(objTempMatrixColumn => objTempMatrixColumn["iElementCheckBoxMatrixColumnId"] === objValue["iElementCheckBoxMatrixColumnId"]);
        let arrNewMatrixColumn = BaseCMSElement.UpdateDisplayOrder([...arrMatrixColumn.slice(0, intInsertIndex), objDefaultColumn, ...arrMatrixColumn.slice(intInsertIndex, arrMatrixColumn.length)]);
        let objNewColumn = arrNewMatrixColumn.find(objTempColumn => objTempColumn["iElementCheckBoxMatrixColumnId"] === objDefaultColumn["iElementCheckBoxMatrixColumnId"]);
        let arrNewValues = [
            ...objContext.state.ElementJson.vElementJson.Values,
            ...objContext.state.ElementJson.vElementJson.MatrixRow.map(objRowTemp => {
                return {
                    ["iElementCheckBoxMatrixRowId"]: objRowTemp["iElementCheckBoxMatrixRowId"],
                    ["iElementCheckBoxMatrixColumnId"]: objNewColumn["iElementCheckBoxMatrixColumnId"],
                    ["cIsCorrectValue"]: "N",
                };
            })
        ];
        let arrMatrixRow = objContext.state.ElementJson.vElementJson.MatrixRow;
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
        objContext.CMSCheckboxMatrix_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
        objContext.dispatch({
            type: "SET_STATE", payload: {
                "ElementJson": {
                    ...objContext.state.ElementJson,
                    ["vElementJson"]: {
                        ...objContext.state.ElementJson["vElementJson"],
                        ["MatrixColumn"]: arrNewMatrixColumn,
                        ["TextElements"]: arrNewTextElements,
                        ["Values"]: objContext.CMSCheckboxMatrix_Editor_ModuleProcessor.UpdateValueDisplayOrder(arrMatrixRow, arrNewMatrixColumn, arrNewValues)
                    }
                }
            }
        });
    }

    /**
     * @name InsertColumnRight
     * @param {object} objParams {objContext: {state, props, dispatch, CMSCheckboxMatrix_Editor_ModuleProcessor}, objValue}
     * @summary Inserts a row with default value to the right of the passed value.
     */
    InsertColumnRight(objParams) {
        let { objContext, objValue, objTextResource } = objParams;
        let intElementTextId = UniqueId.GetUniqueId();
        let objTextElementJson = CMSText_Editor_MetaData.GetDefaultElementJson(1, intElementTextId);
        let objDefaultColumn = CMSCheckboxMatrix_Editor_MetaData.GetDefaultColumn(objContext, intElementTextId);
        let arrMatrixColumn = objContext.state.ElementJson["vElementJson"]["MatrixColumn"];
        let intInsertIndex = arrMatrixColumn.findIndex(objMatrixColumn => objMatrixColumn["iElementCheckBoxMatrixColumnId"] === objValue["iElementCheckBoxMatrixColumnId"]);
        let arrNewMatrixColumn = BaseCMSElement.UpdateDisplayOrder([...arrMatrixColumn.slice(0, intInsertIndex + 1), objDefaultColumn, ...arrMatrixColumn.slice(intInsertIndex + 1, arrMatrixColumn.length)]);
        let objNewColumn = arrNewMatrixColumn.find(objTempColumn => objTempColumn["iElementCheckBoxMatrixColumnId"] === objDefaultColumn["iElementCheckBoxMatrixColumnId"]);
        let arrNewValues = [...objContext.state.ElementJson.vElementJson.Values,
        ...objContext.state.ElementJson.vElementJson.MatrixRow.map(objRowTemp => {
            return {
                ["iElementCheckBoxMatrixRowId"]: objRowTemp["iElementCheckBoxMatrixRowId"],
                ["iElementCheckBoxMatrixColumnId"]: objNewColumn["iElementCheckBoxMatrixColumnId"],
                ["cIsCorrectValue"]: "N"
            };
        })];
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
        let arrMatrixRow = objContext.state.ElementJson.vElementJson.MatrixRow;
        objContext.CMSCheckboxMatrix_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
        objContext.dispatch({
            type: "SET_STATE", payload: {
                "ElementJson": {
                    ...objContext.state.ElementJson,
                    ["vElementJson"]: {
                        ...objContext.state.ElementJson["vElementJson"],
                        ["MatrixColumn"]: arrNewMatrixColumn,
                        ["TextElements"]: arrNewTextElements,
                        ["Values"]: objContext.CMSCheckboxMatrix_Editor_ModuleProcessor.UpdateValueDisplayOrder(arrMatrixRow, arrNewMatrixColumn, arrNewValues)
                    }
                }
            }
        });
    }

    /**
     * @name MoveRowUp
     * @param {object} objParams {objContext: {state, props, dispatch, CMSCheckboxMatrix_Editor_ModuleProcessor}, objValue}
     * @summary Moves a row one place up to the passed value.
     */
    MoveRowUp(objParams) {
        let { objContext, objValue } = objParams;
        let intActiveRowIndex = objContext.state.ElementJson["vElementJson"]["MatrixRow"].findIndex(objMatrixRow => objMatrixRow["iElementCheckBoxMatrixRowId"] === objValue["iElementCheckBoxMatrixRowId"]);
        let arrNewMatrixRow = BaseCMSElement.UpdateDisplayOrder(BaseCMSElement.ImmutableSwap(objContext.state.ElementJson["vElementJson"]["MatrixRow"], intActiveRowIndex, intActiveRowIndex - 1));
        let arrMatrixColumn = objContext.state.ElementJson.vElementJson.MatrixColumn;
        let arrValues = objContext.state.ElementJson.vElementJson.Values;
        objContext.CMSCheckboxMatrix_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
        objContext.dispatch({
            type: "SET_STATE", payload: {
                "ElementJson": {
                    ...objContext.state.ElementJson,
                    ["vElementJson"]: {
                        ...objContext.state.ElementJson["vElementJson"],
                        ["MatrixRow"]: arrNewMatrixRow,
                        ["Values"]: objContext.CMSCheckboxMatrix_Editor_ModuleProcessor.UpdateValueDisplayOrder(arrNewMatrixRow, arrMatrixColumn, arrValues)
                    }
                }
            }
        });
    }

    /**
     * @name MoveRowDown
     * @param {object} objParams {objContext: {state, props, dispatch, CMSCheckboxMatrix_Editor_ModuleProcessor}, objValue}
     * @summary Moves a row one place down to the passed value.
     */
    MoveRowDown(objParams) {
        let { objContext, objValue } = objParams;
        let intActiveRowIndex = objContext.state.ElementJson["vElementJson"]["MatrixRow"].findIndex(objMatrixRow => objMatrixRow["iElementCheckBoxMatrixRowId"] === objValue["iElementCheckBoxMatrixRowId"]);
        let arrNewMatrixRow = BaseCMSElement.UpdateDisplayOrder(BaseCMSElement.ImmutableSwap(objContext.state.ElementJson["vElementJson"]["MatrixRow"], intActiveRowIndex, intActiveRowIndex + 1));
        let arrMatrixColumn = objContext.state.ElementJson.vElementJson.MatrixColumn;
        let arrValues = objContext.state.ElementJson.vElementJson.Values;
        objContext.CMSCheckboxMatrix_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
        objContext.dispatch({
            type: "SET_STATE", payload: {
                "ElementJson": {
                    ...objContext.state.ElementJson,
                    ["vElementJson"]: {
                        ...objContext.state.ElementJson["vElementJson"],
                        ["MatrixRow"]: arrNewMatrixRow,
                        ["Values"]: objContext.CMSCheckboxMatrix_Editor_ModuleProcessor.UpdateValueDisplayOrder(arrNewMatrixRow, arrMatrixColumn, arrValues)
                    }
                }
            }
        });
    }

    /**
     * @name AlignValue
     * @param {object} objParams {objContext: {state, props, dispatch, CMSCheckboxMatrix_Editor_ModuleProcessor}, objValue: checkbox value object}
     * @summary Change the alignment of the checkboxes in the row.
     */
    AlignValue(objParams) {
        let { objContext, objValue, Align } = objParams;
        let arrNewValues = objContext.state.ElementJson["vElementJson"]["MatrixRow"].map((objTempValue) => {
            if (objTempValue["iElementCheckBoxMatrixRowId"] === objValue["iElementCheckBoxMatrixRowId"]) {
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
        objContext.CMSCheckboxMatrix_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
        objContext.dispatch({ type: "SET_STATE", payload: { "ElementJson": objElementJson } });
    }

    /**
     * @name MoveColumnLeft
     * @param {object} objParams {objContext: {state, props, dispatch, CMSCheckboxMatrix_Editor_ModuleProcessor}, objValue}
     * @summary Moves a row one place left to the passed value.
     */
    MoveColumnLeft(objParams) {
        let { objContext, objValue } = objParams;
        let intActiveColumnIndex = objContext.state.ElementJson["vElementJson"]["MatrixColumn"].findIndex(objColumn => objColumn["iElementCheckBoxMatrixColumnId"] === objValue["iElementCheckBoxMatrixColumnId"]);
        let arrNewMatrixColumn = BaseCMSElement.UpdateDisplayOrder(BaseCMSElement.ImmutableSwap(objContext.state.ElementJson["vElementJson"]["MatrixColumn"], intActiveColumnIndex, intActiveColumnIndex - 1));
        let arrMatrixRow = objContext.state.ElementJson.vElementJson.MatrixRow;
        let arrValues = objContext.state.ElementJson.vElementJson.Values;
        objContext.CMSCheckboxMatrix_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
        objContext.dispatch({
            type: "SET_STATE", payload: {
                "ElementJson": {
                    ...objContext.state.ElementJson,
                    ["vElementJson"]: {
                        ...objContext.state.ElementJson["vElementJson"],
                        ["MatrixColumn"]: arrNewMatrixColumn,
                        ["Values"]: objContext.CMSCheckboxMatrix_Editor_ModuleProcessor.UpdateValueDisplayOrder(arrMatrixRow, arrNewMatrixColumn, arrValues)
                    }
                }
            }
        });
    }

    /**
     * @name MoveColumnRight
     * @param {object} objParams {objContext: {state, props, dispatch, CMSCheckboxMatrix_Editor_ModuleProcessor}, objValue}
     * @summary Moves a row one place right to the passed value.
     */
    MoveColumnRight(objParams) {
        let { objContext, objValue } = objParams;
        let intActiveColumnIndex = objContext.state.ElementJson["vElementJson"]["MatrixColumn"].findIndex(objColumn => objColumn["iElementCheckBoxMatrixColumnId"] === objValue["iElementCheckBoxMatrixColumnId"]);
        let arrNewMatrixColumn = BaseCMSElement.UpdateDisplayOrder(BaseCMSElement.ImmutableSwap(objContext.state.ElementJson["vElementJson"]["MatrixColumn"], intActiveColumnIndex, intActiveColumnIndex + 1));
        let arrMatrixRow = objContext.state.ElementJson.vElementJson.MatrixRow;
        let arrValues = objContext.state.ElementJson.vElementJson.Values;
        objContext.CMSCheckboxMatrix_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
        objContext.dispatch({
            type: "SET_STATE", payload: {
                "ElementJson": {
                    ...objContext.state.ElementJson,
                    ["vElementJson"]: {
                        ...objContext.state.ElementJson["vElementJson"],
                        ["MatrixColumn"]: arrNewMatrixColumn,
                        ["Values"]: objContext.CMSCheckboxMatrix_Editor_ModuleProcessor.UpdateValueDisplayOrder(arrMatrixRow, arrNewMatrixColumn, arrValues)
                    }
                }
            }
        });
    }

    /**
     * @name DeleteRow
     * @param {object} objParams {objContext: {state, props, dispatch, CMSCheckboxMatrix_Editor_ModuleProcessor}, objValue}
     * @summary Deletes the passed row.
     */
    DeleteRow(objParams) {
        let { objContext, objValue } = objParams;
        let arrNewMatrixRow = BaseCMSElement.UpdateDisplayOrder(objContext.state.ElementJson["vElementJson"]["MatrixRow"].filter(objTempMatrixRow => objTempMatrixRow["iElementCheckBoxMatrixRowId"] !== objValue["iElementCheckBoxMatrixRowId"]));
        let arrNewValues = objContext.state.ElementJson["vElementJson"]["Values"].filter(objTempValue => objTempValue["iElementCheckBoxMatrixRowId"] !== objValue["iElementCheckBoxMatrixRowId"]);
        let arrNewTextElements = objContext.state.ElementJson["vElementJson"]["TextElements"].filter(objTempTextElement => objTempTextElement["iElementId"] !== objValue["iElementTextId"]);
        let arrMatrixColumn = objContext.state.ElementJson.vElementJson.MatrixColumn;
        objContext.CMSCheckboxMatrix_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
        objContext.dispatch({
            type: "SET_STATE", payload: {
                "ElementJson": {
                    ...objContext.state.ElementJson,
                    ["vElementJson"]: {
                        ...objContext.state.ElementJson["vElementJson"],
                        ["MatrixRow"]: arrNewMatrixRow,
                        ["Values"]: objContext.CMSCheckboxMatrix_Editor_ModuleProcessor.UpdateValueDisplayOrder(arrNewMatrixRow, arrMatrixColumn, arrNewValues),
                        ["TextElements"]: arrNewTextElements
                    }
                }
            }
        });
    }

    /**
     * @name DeleteColumn
     * @param {object} objParams {objContext: {state, props, dispatch, CMSCheckboxMatrix_Editor_ModuleProcessor}, objValue}
     * @summary Deletes the passed column.
     */
    DeleteColumn(objParams) {
        let { objContext, objValue } = objParams;
        let arrNewMatrixColumn = BaseCMSElement.UpdateDisplayOrder(objContext.state.ElementJson["vElementJson"]["MatrixColumn"].filter(objTempMatrixColumn => objTempMatrixColumn["iElementCheckBoxMatrixColumnId"] !== objValue["iElementCheckBoxMatrixColumnId"]));
        let arrNewValues = objContext.state.ElementJson["vElementJson"]["Values"].filter(objTempValue => objTempValue["iElementCheckBoxMatrixColumnId"] !== objValue["iElementCheckBoxMatrixColumnId"]);
        let arrNewTextElements = objContext.state.ElementJson["vElementJson"]["TextElements"].filter(objTempTextElement => objTempTextElement["iElementId"] !== objValue["iElementTextId"]);
        let arrMatrixRow = objContext.state.ElementJson.vElementJson.MatrixRow;
        objContext.CMSCheckboxMatrix_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
        objContext.dispatch({
            type: "SET_STATE", payload: {
                "ElementJson": {
                    ...objContext.state.ElementJson,
                    ["vElementJson"]: {
                        ...objContext.state.ElementJson["vElementJson"],
                        ["MatrixColumn"]: arrNewMatrixColumn,
                        ["Values"]: objContext.CMSCheckboxMatrix_Editor_ModuleProcessor.UpdateValueDisplayOrder(arrMatrixRow, arrNewMatrixColumn, arrNewValues),
                        ["TextElements"]: arrNewTextElements
                    }
                }
            }
        });
    }

    /**
     * @name RandomDisplay
     * @param {object} objParams {objContext: {state, props, dispatch, CMSCheckboxMatrix_Editor_ModuleProcessor}, strGridField}
     * @summary Sets the random display for test application version.
     */
    RandomDisplay(objParams) {
        let { objContext, strGridField } = objParams;
        let objElementJson;
        if (strGridField === "COLUMN") {
            objElementJson = {
                ...objContext.state.ElementJson,
                ["vElementJson"]: {
                    ...objContext.state.ElementJson["vElementJson"],
                    ["cIsRandomizedColumnDisplay"]: strGridField === "COLUMN" && objContext.state.ElementJson["vElementJson"]["cIsRandomizedColumnDisplay"] === "N" ? "Y" : "N"
                }
            };
        }
        else {
            objElementJson = {
                ...objContext.state.ElementJson,
                ["vElementJson"]: {
                    ...objContext.state.ElementJson["vElementJson"],
                    ["cIsRandomizedRowDisplay"]: strGridField === "ROW" && objContext.state.ElementJson["vElementJson"]["cIsRandomizedRowDisplay"] === "N" ? "Y" : "N"
                }
            };
        }
        objContext.CMSCheckboxMatrix_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
        objContext.dispatch({ type: "SET_STATE", payload: { "ElementJson": objElementJson } });
    }

    /**
     * @name ChangeOrientationOfRowHeader
     * @param {object} objParams {objContext: {state, props, dispatch, CMSCheckboxMatrix_Editor_ModuleProcessor}}
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
        objContext.CMSCheckboxMatrix_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
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
     * @param {object} objParams {objContext: {state, props, dispatch, CMSCheckboxMatrix_Editor_ModuleProcessor}}
     * @summary Opens the LookAndFeel sidebar.
     */
    LookAndFeel(objParams) {
        let { objContext } = objParams;
        objContext.CMSCheckboxMatrix_Editor_ModuleProcessor.CloseSidebar();
        let objTextResource = EditorState.GetReference("CommonTextResource");
        const fnShowSidebar = ApplicationState.GetProperty("showSidebar");
        fnShowSidebar({
            "Data": {
                "ElementJson": { ...objContext.state.ElementJson },
                "Skins": CMSCheckboxMatrix_Editor_MetaData.GetSkins()
            },
            "PassedEvents": {
                "UpdateElementJson": (objNewElementJson) => {
                    objContext.CMSCheckboxMatrix_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
                    objContext.dispatch({ type: "SET_STATE", payload: { "ElementJson": objNewElementJson } });
                    objContext.CMSCheckboxMatrix_Editor_ModuleProcessor.CloseSidebar();
                },
                "Preview": (objNewElementJson) => {
                    objContext.CMSCheckboxMatrix_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
                    objContext.dispatch({ type: "SET_STATE", payload: { "ElementJson": objNewElementJson } });
                },
                "CloseSidebar": (objData) => {
                    objContext.CMSCheckboxMatrix_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
                    objContext.dispatch({ type: "SET_STATE", payload: { "ElementJson": objData.ElementJson } });
                    objContext.CMSCheckboxMatrix_Editor_ModuleProcessor.CloseSidebar();
                }
            },
            "SidebarProps": {
                "SidebarName": "LookAndFeelSidebar",
                "Header": objContext.CMSCheckboxMatrix_Editor_ModuleProcessor.TextFormatter(objTextResource, "LookNFeel_SidebarHeader"),
                "Title": objContext.CMSCheckboxMatrix_Editor_ModuleProcessor.TextFormatter(objTextResource, "LookNFeel_SidebarTitle"),
                "Status": 1,
                "AutoHide": true
            }
        });
    }

    /**
     * @name LoadLikert
     * @param {object} objParams {objContext: {state, props, dispatch, CMSCheckboxMatrix_Editor_ModuleProcessor}}
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
        objContext.CMSCheckboxMatrix_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
        objContext.dispatch({ type: "SET_STATE", payload: { "ElementJson": objElementJson } });
    }

    /**
     * @name SetHeaderFooterAsTitle
     * @param {object} objParams {objContext: {state, props, dispatch, CMSCheckboxMatrix_Editor_ModuleProcessor}}
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
        objContext.CMSCheckboxMatrix_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
        objContext.dispatch({ type: "SET_STATE", payload: { "ElementJson": objElementJson } });
    }

    /**
     * @name OnBlur
     * @param {object} objContext {state, props, dispatch, CMSCheckboxMatrix_Editor_ModuleProcessor}
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
        objContext.CMSCheckboxMatrix_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
        objContext.dispatch({ type: "SET_STATE", payload: { "ElementJson": objElementJson } });
    }

    /**
     * @name GetDynamicStyles
     * @param {object} props component props.
     * @summary this returns the styles for the SSR.
     */
    GetDynamicStyles(props) {
        return [
            props.JConfiguration.EditorSkinPath + "/Css/Application/ReactJs/PC/Modules/6_CMSElement/CMSCheckboxMatrix/CMSCheckboxMatrixStyles.css"
        ];
    }
}

export default CMSCheckboxMatrix_Editor_ModuleProcessor;
