//React imports
import React from 'react';

//Module related imports
import CMSDragdropAssign_Editor_ContextMenu from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSDragdropAssign/CMSDragdropAssign_Editor/CMSDragdropAssign_Editor_ContextMenu';

//Module related fies.
import * as CMSDragdropAssign_Editor_MetaData from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSDragdropAssign/CMSDragdropAssign_Editor/CMSDragdropAssign_Editor_MetaData";
import * as CMSText_Editor_MetaData from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSText/CMSText_Editor/CMSText_Editor_MetaData";

//UniqueId.
import * as UniqueId from "@root/Framework/Services/UniqueId/UniqueId";

//BaseCMSElement import.
import * as BaseCMSElement from "@shared/Framework/BaseClass/EditorBaseClass/BaseCMSElement";

/**
 * @name CMSDragdropAssign_Editor_ModuleProcessor
 * @summary Contains the DragdropAssign's editor version module specific methods.
 * */
class CMSDragdropAssign_Editor_ModuleProcessor extends CMSDragdropAssign_Editor_ContextMenu {

    /**
     * @name GetPointOverride
     * @param {object} objContext {state, props, dispatch}.
     * @summary this collect the points from Element json and return.
     * @returns {object} objPoint {Points : [], isNACommon : true/false}.
     */
    GetPointOverride(objContext) {
        let objPoint = {
            "NA": objContext.state.ElementJson["vElementJson"]["dNotAnsweredPoint"],
            "WA": objContext.state.ElementJson["vElementJson"]["dWrongPoint"],
            "CA": objContext.state.ElementJson["vElementJson"]["dCorrectPoint"],
            "isSinglePoint": true
        };
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
                "dCorrectPoint": objPoints.CA,
                "dWrongPoint": objPoints.WA
            }
        };
        objContext.CMSDragdropAssign_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
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
                "dCorrectPoint": 0,
                "dWrongPoint": 0
            }
        };
        objContext.CMSDragdropAssign_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
        objContext.dispatch({ type: "SET_STATE", payload: { "ElementJson": objElementJson } });
    }

    /**
     * @name InsertAbove
     * @param {object} objParams {objContext: {state, props, dispatch, CMSDragdropAssign_Editor_ModuleProcessor}, objValue}
     * @summary Inserts a row with default value ablove the passed value with their mapped text elements.
     */
    InsertAbove(objParams) {
        let { objContext, objValue } = objParams;
        let intElementTextId1 = UniqueId.GetUniqueId();
        let intElementTextId2 = UniqueId.GetUniqueId();
        let intElementTextId3 = UniqueId.GetUniqueId();
        let objNewValue = CMSDragdropAssign_Editor_MetaData.GetDefaultValue(objContext, [intElementTextId1, intElementTextId2, intElementTextId3]);
        let objTextElementJson1 = CMSText_Editor_MetaData.GetDefaultElementJson(1, intElementTextId1, "");
        let objTextElementJson2 = CMSText_Editor_MetaData.GetDefaultElementJson(1, intElementTextId2, "");
        let objTextElementJson3 = CMSText_Editor_MetaData.GetDefaultElementJson(1, intElementTextId3, "");
        let arrNewTextElements = [
            ...objContext.state.ElementJson["vElementJson"]["TextElements"],
            {
                ...objTextElementJson1,
                ["Ref"]: React.createRef()
            },
            {
                ...objTextElementJson2,
                ["Ref"]: React.createRef()
            },
            {
                ...objTextElementJson3,
                ["Ref"]: React.createRef()
            }
        ];
        let arrValues = objContext.state.ElementJson["vElementJson"]["Values"];
        let intIndex = arrValues.findIndex(objTempValue => objTempValue["iElementDragDropAssignValueId"] === objValue["iElementDragDropAssignValueId"]);
        let arrNewData = [...arrValues.slice(0, intIndex), objNewValue, ...arrValues.slice(intIndex, arrValues.length)];
        arrValues = BaseCMSElement.UpdateDisplayOrder(arrNewData);
        objContext.CMSDragdropAssign_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
        objContext.dispatch({
            type: 'SET_STATE', payload: {
                "ElementJson": {
                    ...objContext.state.ElementJson,
                    ["vElementJson"]: {
                        ...objContext.state.ElementJson["vElementJson"],
                        ["Values"]: arrValues,
                        ["TextElements"]: arrNewTextElements
                    }
                }
            }
        });
    }

    /**
     * @name InsertBelow
     * @param {object} objParams {objContext: {state, props, dispatch, CMSDragdropAssign_Editor_ModuleProcessor}, objValue}
     * @summary Inserts a row with default value below the passed value with their mapped text elements.
     */
    InsertBelow(objParams) {
        let { objContext, objValue } = objParams;
        let intElementTextId1 = UniqueId.GetUniqueId();
        let intElementTextId2 = UniqueId.GetUniqueId();
        let intElementTextId3 = UniqueId.GetUniqueId();
        let objNewValue = CMSDragdropAssign_Editor_MetaData.GetDefaultValue(objContext, [intElementTextId1, intElementTextId2, intElementTextId3]);
        let objTextElementJson1 = CMSText_Editor_MetaData.GetDefaultElementJson(1, intElementTextId1, "");
        let objTextElementJson2 = CMSText_Editor_MetaData.GetDefaultElementJson(1, intElementTextId2, "");
        let objTextElementJson3 = CMSText_Editor_MetaData.GetDefaultElementJson(1, intElementTextId3, "");
        let arrNewTextElements = [
            ...objContext.state.ElementJson["vElementJson"]["TextElements"],
            {
                ...objTextElementJson1,
                ["Ref"]: React.createRef()
            },
            {
                ...objTextElementJson2,
                ["Ref"]: React.createRef()
            },
            {
                ...objTextElementJson3,
                ["Ref"]: React.createRef()
            }
        ];
        let arrValues = objContext.state.ElementJson["vElementJson"]["Values"];
        let intIndex = arrValues.findIndex(objTempValue => objTempValue["iElementDragDropAssignValueId"] === objValue["iElementDragDropAssignValueId"]);
        let arrNewData = [...arrValues.slice(0, intIndex + 1), objNewValue, ...arrValues.slice(intIndex + 1, arrValues.length)];
        arrValues = BaseCMSElement.UpdateDisplayOrder(arrNewData);
        objContext.CMSDragdropAssign_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
        objContext.dispatch({
            type: 'SET_STATE', payload: {
                "ElementJson": {
                    ...objContext.state.ElementJson,
                    ["vElementJson"]: {
                        ...objContext.state.ElementJson["vElementJson"],
                        ["Values"]: arrValues,
                        ["TextElements"]: arrNewTextElements
                    }
                }
            }
        });
    }

    /**
     * @name RemoveRow
     * @param {object} objParams {objContext: {state, props, dispatch, CMSDragdropAssign_Editor_ModuleProcessor}, objValue}
     * @summary Deletes the object from the value and its mapped text element from TextElements.
     */
    RemoveRow(objParams) {
        let { objContext, objValue } = objParams;
        let arrValues = [...objContext.state.ElementJson["vElementJson"]["Values"].filter(objTempValue => objTempValue["iElementDragDropAssignValueId"] !== objValue["iElementDragDropAssignValueId"])];
        let arrTextElements;
        if (objValue["cIsTemporary"] && objValue["cIsTemporary"] === "Y") {
            arrTextElements = [...objContext.state.ElementJson["vElementJson"]["TextElements"]];
            objValue["iElementTextId"].map(intTempId => {
                arrTextElements = arrTextElements.filter(objTempTextElement => objTempTextElement["iElementId"] !== intTempId);
            });
        }
        else {
            arrTextElements = [...objContext.state.ElementJson["vElementJson"]["TextElements"].filter(objTempTextElement => objTempTextElement["iElementId"] !== objValue["iElementTextId"])];
        }
        objContext.CMSDragdropAssign_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
        objContext.dispatch({
            type: 'SET_STATE', payload: {
                "ElementJson": {
                    ...objContext.state.ElementJson,
                    ["vElementJson"]: {
                        ...objContext.state.ElementJson["vElementJson"],
                        ["Values"]: arrValues,
                        ["TextElements"]: arrTextElements
                    }
                }
            }
        });
    }

    /**
     * @name DeleteAnswer
     * @param {object} objParams {objContext: {state, props, dispatch, CMSDragdropAssign_Editor_ModuleProcessor}, objValue}
     * @summary Deletes the Answer of the object and activates blocks in the row for editing.
     */
    DeleteAnswer(objParams) {
        let { objContext, objValue, intElementTextId } = objParams;
        if (objValue["cIsTemporary"] && objValue["cIsTemporary"] === "Y") {
            objValue["iElementTextId"].map(intTempId => {
                if (intTempId === intElementTextId) {
                    let objTempElementJson = objContext.state.ElementJson["vElementJson"]["TextElements"].filter(objTempTextElement => objTempTextElement["iElementId"] == intElementTextId)[0];
                    objTempElementJson["Ref"].current.ResetText();
                }
            });
        }
        else {
            let arrNewTextElements, arrValues;
            let intElementTextId1 = UniqueId.GetUniqueId();
            let intElementTextId2 = UniqueId.GetUniqueId();
            let intElementTextId3 = UniqueId.GetUniqueId();
            let objTextElementJson1 = CMSText_Editor_MetaData.GetDefaultElementJson(1, intElementTextId1, "");
            let objTextElementJson2 = CMSText_Editor_MetaData.GetDefaultElementJson(1, intElementTextId2, "");
            let objTextElementJson3 = CMSText_Editor_MetaData.GetDefaultElementJson(1, intElementTextId3, "");
            arrNewTextElements = [
                ...objContext.state.ElementJson["vElementJson"]["TextElements"],
                {
                    ...objTextElementJson1,
                    ["Ref"]: React.createRef()
                },
                {
                    ...objTextElementJson2,
                    ["Ref"]: React.createRef()
                },
                {
                    ...objTextElementJson3,
                    ["Ref"]: React.createRef()
                }
            ];
            arrNewTextElements = [...arrNewTextElements.filter(objTempTextElement => objTempTextElement["iElementId"] !== objValue["iElementTextId"])];
            arrValues = objContext.state.ElementJson["vElementJson"]["Values"].map(objTempValue => {
                if (objTempValue["iElementDragDropAssignValueId"] === objValue["iElementDragDropAssignValueId"]) {
                    return {
                        ...objTempValue,
                        ["cIsTemporary"]: "Y",
                        ["iElementTextId"]: [intElementTextId1, intElementTextId2, intElementTextId3],
                        ["iBlockId"]: -1
                    };
                }
                else {
                    return {
                        ...objTempValue
                    };
                }
            });
            objContext.CMSDragdropAssign_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
            objContext.dispatch({
                type: 'SET_STATE',
                payload: {
                    "ElementJson": {
                        ...objContext.state.ElementJson,
                        ["vElementJson"]: {
                            ...objContext.state.ElementJson["vElementJson"],
                            ["Values"]: arrValues,
                            ["TextElements"]: arrNewTextElements
                        }
                    }
                }
            });
        }
    }

    /**
     * @name ActivateOnlyPassedBlockId
     * @param {object} objContext {state, props, dispatch, CMSDragdropAssign_Editor_ModuleProcessor}
     * @param {number} intBlockId block id to be activated
     * @param {object} objValue dragdrop assign value object
     * @param {object} objTextElementJson text element json
     * @summary Activates the value by reassigning the iBlockId.
     */
    async ActivateOnlyPassedBlockId(objContext, objValue) {
        let objTextElementJson, intBlockId;
        for (let intIndex = 0; intIndex < objValue["iElementTextId"].length; intIndex++) {
            let objTempJson = objContext.state.ElementJson["vElementJson"]["TextElements"].filter(objTempTextElement => objTempTextElement["iElementId"] === objValue["iElementTextId"][intIndex])[0];
            let objTempElementJson = await objTempJson["Ref"].current.GetElementJson();
            if (objTempElementJson["vElementJson"]["vText"]) {
                objTextElementJson = { ...objTempElementJson };
                intBlockId = intIndex + 1;
                break;
            }
        }
        if (objTextElementJson) {
            let arrTextElements = [...objContext.state.ElementJson["vElementJson"]["TextElements"]];
            objValue["iElementTextId"].map(intTempId => {
                if (objTextElementJson["iElementId"] !== intTempId) {
                    arrTextElements = arrTextElements.filter(objTempTextElement => objTempTextElement["iElementId"] !== intTempId);
                }
            });
            let arrValues = objContext.state.ElementJson["vElementJson"]["Values"].map(objTempValue => {
                if (objTempValue["iElementDragDropAssignValueId"] === objValue["iElementDragDropAssignValueId"]) {
                    return {
                        "iElementDragDropAssignValueId": objValue["iElementDragDropAssignValueId"],
                        "iElementTextId": objTextElementJson["iElementId"],
                        "iBlockId": intBlockId,
                        "iDisplayOrder": objTempValue["iDisplayOrder"]
                    };
                }
                else {
                    return {
                        ...objTempValue
                    };
                }
            });
            objContext.CMSDragdropAssign_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
            objContext.dispatch({
                type: "SET_STATE", payload: {
                    "ElementJson": {
                        ...objContext.state.ElementJson,
                        ["vElementJson"]: {
                            ...objContext.state.ElementJson["vElementJson"],
                            ["Values"]: arrValues,
                            ["TextElements"]: arrTextElements
                        }
                    }
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
            props.JConfiguration.EditorSkinPath + "/Css/Application/ReactJs/PC/Modules/6_CMSElement/CMSDragdropAssign/CMSDragdropAssignStyles.css"
        ];
    }
}

export default CMSDragdropAssign_Editor_ModuleProcessor;
