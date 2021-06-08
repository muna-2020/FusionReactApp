//React imports
import React from 'react';

//Module related fies.
import CMSDragdropSort_Editor_ContextMenu from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSDragdropSort/CMSDragdropSort_Editor/CMSDragdropSort_Editor_ContextMenu";

//Module realted fies.
import * as CMSDragdropSort_Editor_MetaData from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSDragdropSort/CMSDragdropSort_Editor/CMSDragdropSort_Editor_MetaData";
import * as CMSText_Editor_MetaData from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSText/CMSText_Editor/CMSText_Editor_MetaData";

//UniqueId.
import * as UniqueId from "@root/Framework/Services/UniqueId/UniqueId";

//BaseCMSElement import.
import * as BaseCMSElement from "@shared/Framework/BaseClass/EditorBaseClass/BaseCMSElement";

/**
 * @name CMSDragdropSort_Editor_ModuleProcessor
 * @summary Contains the DragdropSort's editor version module specific methods.
 * */
class CMSDragdropSort_Editor_ModuleProcessor extends CMSDragdropSort_Editor_ContextMenu {

    /**
     * @name GetPointOverride
     * @param {object} objContext {state, props, dispatch}.
     * @summary this collect the points from Element json and return.
     * @ruturns {object} objPoint {Points : [], isSinglePoint : true/false}.
     */
    GetPointOverride(objContext) {
        let objPoint = {
            "Points": [],
            "isSinglePoint": false,
            "NA": objContext.state.ElementJson.vElementJson.hasOwnProperty("dNotAnsweredPoint") ? objContext.state.ElementJson.vElementJson.dNotAnsweredPoint : ""
        };
        objPoint.Points = objContext.state.ElementJson.vElementJson.Values.map(objTempValue => {
            return {
                "CA": objTempValue.hasOwnProperty("dCorrectPoint") ? objTempValue.dCorrectPoint : "",
                "WA": objTempValue.hasOwnProperty("dWrongPoint") ? objTempValue.dWrongPoint : "",
                "ValueId": objTempValue.iElementDragDropSortValueId,
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
                    let objPoint = objPoints.Points.find(objPointTemp => objPointTemp.ValueId == objTempValue.iElementDragDropSortValueId);
                    return {
                        ...objTempValue,
                        "dCorrectPoint": objPoint.CA,
                        "dWrongPoint": objPoint.WA,
                    }
                })
            }
        };
        objContext.CMSDragdropSort_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
        objContext.dispatch({ type: "SET_STATE", payload: { "ElementJson": objElementJson } });
    }

    /**
     * @name RemovePointOverride
     * @param {object} objContext {state, props, dispatch}.
     * @summary removes point override.
     */
    RemovePointOverride(objContext) {
        let objElementJson = {
            ...objContext.state.ElementJson,
            "vElementJson": {
                ...objContext.state.ElementJson["vElementJson"],
                "cIsPointOverride": "N",
                "dNotAnsweredPoint": 0,
                "Values": objContext.state.ElementJson["vElementJson"]["Values"].map(objTempValue => {
                    return {
                        ...objTempValue,
                        "dCorrectPoint": 0,
                        "dWrongPoint": 0
                    }
                })
            }
        };
        objContext.CMSDragdropSort_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
        objContext.dispatch({ type: "SET_STATE", payload: { "ElementJson": objElementJson } });
    }

    /**
     * @name ChangeOrientation
     * @param {object} objParams {objContext:{state, props, dispatch, CMSDragdropSort_Editor_ModuleProcessor} }
     * @summary Changes the orientation(Horizontal/Vertical).
     */
    async ChangeOrientation(objParams) {
        let { objContext } = objParams;
        let arrTextElements = [...objContext.state.ElementJson["vElementJson"]["TextElements"]];
        let arrNewTextElements = [];
        for (let intCount = 0; intCount < arrTextElements.length; intCount++) {
            let objTextElementJson = { ...arrTextElements[intCount] };
            if (arrTextElements[intCount].Ref.current && arrTextElements[intCount].Ref.current.GetElementJson) {
                objTextElementJson = await arrTextElements[intCount].Ref.current.GetElementJson(false);
            }
            arrNewTextElements = [
                ...arrNewTextElements,
                objTextElementJson
            ];
        }
        let objElementJson = {
            ...objContext.state.ElementJson,
            ["vElementJson"]: {
                ...objContext.state.ElementJson["vElementJson"],
                ["cIsHorizontal"]: objContext.state.ElementJson["vElementJson"]["cIsHorizontal"] === "Y" ? "N" : "Y",
                ["TextElements"]: arrNewTextElements
            }
        };
        objContext.CMSDragdropSort_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
        objContext.dispatch({
            type: "SET_STATE",
            payload: {
                "ElementJson": objElementJson
            }
        });
    }

    /**
     * @name InsertAboveOrLeft
     * @param {object} objParams {objContext: {state, props, dispatch, CMSDragdropSort_Editor_ModuleProcessor}, objValue}
     * @summary Inserts a row with default value above/left the passed value.
     */
    InsertAboveOrLeft(objParams) {
        let { objContext, objValue, objTextResource } = objParams;
        let intElementTextId = UniqueId.GetUniqueId();
        let objDefaultValue = CMSDragdropSort_Editor_MetaData.DefaultValue(objContext, intElementTextId);
        let objTextElementJson = CMSText_Editor_MetaData.GetDefaultElementJson(1, intElementTextId);
        let arrValues = objContext.state.ElementJson["vElementJson"]["Values"];
        let intInsertIndex = arrValues.findIndex(objTempValue => objTempValue["iElementDragDropSortValueId"] === objValue["iElementDragDropSortValueId"]);
        let arrNewValues = [...arrValues.slice(0, intInsertIndex), objDefaultValue, ...arrValues.slice(intInsertIndex, arrValues.length)];
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
        objContext.CMSDragdropSort_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
        objContext.dispatch({
            type: "SET_STATE", payload: {
                "ElementJson": {
                    ...objContext.state.ElementJson,
                    ["vElementJson"]: {
                        ...objContext.state.ElementJson["vElementJson"],
                        ["Values"]: BaseCMSElement.UpdateDisplayOrder(arrNewValues),
                        ["TextElements"]: arrNewTextElements
                    }
                }
            }
        });
    }

    /**
     * @name InsertDownOrRight
     * @param {object} objParams {objContext: {state, props, dispatch, CMSDragdropSort_Editor_ModuleProcessor}, objValue}
     * @summary Inserts a row with default value below/right the passed value.
     */
    InsertDownOrRight(objParams) {
        let { objContext, objValue, objTextResource } = objParams;
        let intElementTextId = UniqueId.GetUniqueId();
        let objDefaultValue = CMSDragdropSort_Editor_MetaData.DefaultValue(objContext, intElementTextId);
        let objTextElementJson = CMSText_Editor_MetaData.GetDefaultElementJson(1, intElementTextId);
        let arrValues = objContext.state.ElementJson["vElementJson"]["Values"];
        let intInsertIndex = arrValues.findIndex(objTempValue => objTempValue["iElementDragDropSortValueId"] === objValue["iElementDragDropSortValueId"]);
        let arrNewValues = [...arrValues.slice(0, intInsertIndex + 1), objDefaultValue, ...arrValues.slice(intInsertIndex + 1, arrValues.length)];
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
        objContext.CMSDragdropSort_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
        objContext.dispatch({
            type: "SET_STATE", payload: {
                "ElementJson": {
                    ...objContext.state.ElementJson,
                    ["vElementJson"]: {
                        ...objContext.state.ElementJson["vElementJson"],
                        ["Values"]: BaseCMSElement.UpdateDisplayOrder(arrNewValues),
                        ["TextElements"]: arrNewTextElements
                    }
                }
            }
        });
    }

    /**
     * @name DeleteRowOrColumn
     * @param {object} objParams {objContext: {state, props, dispatch, CMSDragdropSort_Editor_ModuleProcessor}, objValue}
     * @summary Deletes the passed value.
     */
    DeleteRowOrColumn(objParams) {
        let { objContext, objValue } = objParams;
        let arrValues = [...objContext.state.ElementJson["vElementJson"]["Values"].filter(objTempValue => objTempValue["iElementDragDropSortValueId"] !== objValue["iElementDragDropSortValueId"])];
        let arrTextElements = [...objContext.state.ElementJson["vElementJson"]["TextElements"].filter(objTempTextElement => objTempTextElement["iElementId"] !== objValue["iElementTextId"])];
        objContext.CMSDragdropSort_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
        objContext.dispatch({
            type: "SET_STATE", payload: {
                "ElementJson": {
                    ...objContext.state.ElementJson,
                    ["vElementJson"]: {
                        ...objContext.state.ElementJson["vElementJson"],
                        ["Values"]: BaseCMSElement.UpdateDisplayOrder(arrValues),
                        ["TextElements"]: arrTextElements
                    }
                }
            }
        });
    }

    /**
     * @name DeleteCellContent
     * @param {object} objParams {objContext: {state, props, dispatch, CMSDragdropSort_Editor_ModuleProcessor}, objValue}
     * @summary Deletes the Answer of the passed row.
     */
    DeleteCellContent(objParams) {
        let { objContext, objValue } = objParams;
        objContext.state.ElementJson["vElementJson"]["TextElements"].map(objTempTextElement => {
            if (objTempTextElement["iElementId"] === objValue["iElementTextId"]) {
                objTempTextElement.Ref.current.ResetText();
            }
        });
    }

    /**
     * @name MoveUpOrLeft
     * @param {object} objParams {objContext: {state, props, dispatch, CMSDragdropSort_Editor_ModuleProcessor}, objValue}
     * @summary Moves a row one place up/left to the passed value.
     */
    MoveUpOrLeft(objParams) {
        let { objContext, objValue } = objParams;
        let intActiveObjIndex = objContext.state.ElementJson["vElementJson"]["Values"].findIndex(objTempValue => objTempValue["iElementDragDropSortValueId"] === objValue["iElementDragDropSortValueId"]);
        objContext.CMSDragdropSort_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
        objContext.dispatch({
            type: "SET_STATE", payload: {
                "ElementJson": {
                    ...objContext.state.ElementJson,
                    ["vElementJson"]: {
                        ...objContext.state.ElementJson["vElementJson"],
                        ["Values"]: BaseCMSElement.UpdateDisplayOrder(BaseCMSElement.ImmutableSwap(objContext.state.ElementJson["vElementJson"]["Values"], intActiveObjIndex, intActiveObjIndex - 1))
                    }
                }
            }
        });
    }

    /**
     * @name MoveDownOrRight
     * @param {object} objParams {objContext: {state, props, dispatch, CMSDragdropSort_Editor_ModuleProcessor}, objValue}
     * @summary Moves a row one place down/right to the passed value.
     */
    MoveDownOrRight(objParams) {
        let { objContext, objValue } = objParams;
        let intActiveObjIndex = objContext.state.ElementJson["vElementJson"]["Values"].findIndex(objTempValue => objTempValue["iElementDragDropSortValueId"] === objValue["iElementDragDropSortValueId"]);
        objContext.CMSDragdropSort_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
        objContext.dispatch({
            type: "SET_STATE", payload: {
                "ElementJson": {
                    ...objContext.state.ElementJson,
                    ["vElementJson"]: {
                        ...objContext.state.ElementJson["vElementJson"],
                        ["Values"]: BaseCMSElement.UpdateDisplayOrder(BaseCMSElement.ImmutableSwap(objContext.state.ElementJson["vElementJson"]["Values"], intActiveObjIndex, intActiveObjIndex + 1))
                    }
                }
            }
        });
    }

    /**
     * @name GetDynamicStyles
     * @param {object} props component props.
     * @summary this returns the styles for the SSR.
     */
    GetDynamicStyles(props) {
        return [
            props.JConfiguration.EditorSkinPath + "/Css/Application/ReactJs/PC/Modules/6_CMSElement/CMSDragdropSort/CMSDragdropSortStyles.css"
        ];
    }
}

export default CMSDragdropSort_Editor_ModuleProcessor;
