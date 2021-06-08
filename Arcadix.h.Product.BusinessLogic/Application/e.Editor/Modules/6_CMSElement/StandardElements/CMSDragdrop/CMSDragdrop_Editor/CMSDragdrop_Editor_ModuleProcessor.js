//React imports
import React from 'react';

//Module related fies.
import CMSDragdrop_Editor_ContextMenu from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSDragdrop/CMSDragdrop_Editor/CMSDragdrop_Editor_ContextMenu";

//Module related fies.
import * as CMSDragdrop_Editor_MetaData from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSDragdrop/CMSDragdrop_Editor/CMSDragdrop_Editor_MetaData";
import * as CMSText_Editor_MetaData from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSText/CMSText_Editor/CMSText_Editor_MetaData";

//UniqueId.
import * as UniqueId from "@root/Framework/Services/UniqueId/UniqueId";

//BaseCMSElement import.
import * as BaseCMSElement from "@shared/Framework/BaseClass/EditorBaseClass/BaseCMSElement";

/**
 * @name CMSDragdrop_Editor_ModuleProcessor
 * @summary Contains the Dragdrop's editor version module specific methods.
 * */
class CMSDragdrop_Editor_ModuleProcessor extends CMSDragdrop_Editor_ContextMenu {

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
            "NA": objContext.state.ElementJson.vElementJson.dNotAnsweredPoint ? objContext.state.ElementJson.vElementJson.dNotAnsweredPoint : ""
        };
        objPoint.Points = objContext.state.ElementJson.vElementJson.Values.map(objTempValue => {
            return {
                "CA": objTempValue.dCorrectPoint ? objTempValue.dCorrectPoint : "",
                "WA": objTempValue.dWrongPoint ? objTempValue.dWrongPoint : "",
                "ValueId": objTempValue.iElementDragDropValueId,
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
                "cIsPointOverride": "N",
                "dNotAnsweredPoint": objPoints.NA,
                "Values": objContext.state.ElementJson.vElementJson.Values.map(objTempValue => {
                    let objPoint = objPoints.Points.find(objPointTemp => objPointTemp.ValueId == objTempValue.iElementDragDropValueId);
                    return {
                        ...objTempValue,
                        "dCorrectPoint": objPoint.CA,
                        "dWrongPoint": objPoint.WA,
                    }
                })
            }
        };
        objContext.CMSDragdrop_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
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
        objContext.CMSDragdrop_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
        objContext.dispatch({ type: "SET_STATE", payload: { "ElementJson": objElementJson } });
    }

    /**
     * @name InsertAbove
     * @param {object} objParams {objContext: {state, props, dispatch, CMSDragdrop_Editor_ModuleProcessor}, objValue, objTextResource}
     * @summary Inserts a row with default value above the passed value.
     */
    InsertAbove(objParams) {
        let { objContext, objValue, objTextResource } = objParams;
        let intElementTextQuestionId = UniqueId.GetUniqueId();
        let objTextElementJsonQuestion = CMSText_Editor_MetaData.GetDefaultElementJson(1, intElementTextQuestionId, objTextResource["Default_Text"]);
        let intElementTextAnswerId = UniqueId.GetUniqueId();
        let objTextElementJsonAnswer = CMSText_Editor_MetaData.GetDefaultElementJson(1, intElementTextAnswerId, objTextResource["Default_Text"]);
        let objNewValue = CMSDragdrop_Editor_MetaData.GetDefaultQuestionAnswerValue(objContext, intElementTextQuestionId, intElementTextAnswerId);
        let arrQuestions = objContext.state.ElementJson["vElementJson"]["Questions"].slice();
        let arrAnswers = objContext.state.ElementJson["vElementJson"]["Answers"].slice();
        let arrValues = objContext.state.ElementJson["vElementJson"]["Values"].slice();
        let intInsertQuestionIndex = arrQuestions.findIndex(objTempValue => objTempValue["iElementDragDropQuestionId"] === objValue["iElementDragDropQuestionId"]);
        let intInsertAnswerIndex = arrAnswers.findIndex(objTempValue => objTempValue["iElementDragDropAnswerId"] === objValue["iElementDragDropAnswerId"]);
        let intInsertValueIndex = arrValues.findIndex(objTempValue => objTempValue["iElementDragDropValueId"] === objValue["iElementDragDropValueId"]);
        let arrNewQuestions = [...arrQuestions.slice(0, intInsertQuestionIndex), { ...objNewValue["Question"] }, ...arrQuestions.slice(intInsertQuestionIndex, arrQuestions.length)];
        let arrNewAnswers = [...arrAnswers.slice(0, intInsertAnswerIndex), { ...objNewValue["Answer"] }, ...arrAnswers.slice(intInsertAnswerIndex, arrAnswers.length)];
        let arrNewValues = [...arrValues.slice(0, intInsertValueIndex), { ...objNewValue["Value"] }, ...arrValues.slice(intInsertValueIndex, arrValues.length)];
        let arrNewTextElements = [
            ...objContext.state.ElementJson["vElementJson"]["TextElements"],
            {
                ...objTextElementJsonQuestion,
                ["Ref"]: React.createRef()
            },
            {
                ...objTextElementJsonAnswer,
                ["Ref"]: React.createRef()
            }
        ];
        objContext.CMSDragdrop_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
        objContext.dispatch({
            type: 'SET_STATE',
            payload: {
                "ElementJson": {
                    ...objContext.state.ElementJson,
                    ["vElementJson"]: {
                        ...objContext.state.ElementJson["vElementJson"],
                        ["Questions"]: arrNewQuestions,
                        ["Answers"]: arrNewAnswers,
                        ["Values"]: BaseCMSElement.UpdateDisplayOrder(arrNewValues),
                        ["TextElements"]: arrNewTextElements
                    }
                }
            }
        });
    }

    /**
     * @name InsertBelow
     * @param {object} objParams {objContext: {state, props, dispatch, CMSDragdrop_Editor_ModuleProcessor}, objValue, objTextResource}
     * @summary Inserts a row with default value below the passed value.
     */
    InsertBelow(objParams) {
        let { objContext, objValue, objTextResource } = objParams;
        let intElementTextQuestionId = UniqueId.GetUniqueId();
        let objTextElementJsonQuestion = CMSText_Editor_MetaData.GetDefaultElementJson(1, intElementTextQuestionId, objTextResource["Default_Text"]);
        let intElementTextAnswerId = UniqueId.GetUniqueId();
        let objTextElementJsonAnswer = CMSText_Editor_MetaData.GetDefaultElementJson(1, intElementTextAnswerId, objTextResource["Default_Text"]);
        let objNewValue = CMSDragdrop_Editor_MetaData.GetDefaultQuestionAnswerValue(objContext, intElementTextQuestionId, intElementTextAnswerId);
        let arrQuestions = objContext.state.ElementJson["vElementJson"]["Questions"].slice();
        let arrAnswers = objContext.state.ElementJson["vElementJson"]["Answers"].slice();
        let arrValues = objContext.state.ElementJson["vElementJson"]["Values"].slice();
        let intInsertQuestionIndex = arrQuestions.findIndex(objTempValue => objTempValue["iElementDragDropQuestionId"] === objValue["iElementDragDropQuestionId"]);
        let intInsertAnswerIndex = arrAnswers.findIndex(objTempValue => objTempValue["iElementDragDropAnswerId"] === objValue["iElementDragDropAnswerId"]);
        let intInsertValueIndex = arrValues.findIndex(objTempValue => objTempValue["iElementDragDropValueId"] === objValue["iElementDragDropValueId"]);
        let arrNewQuestions = [...arrQuestions.slice(0, intInsertQuestionIndex + 1), { ...objNewValue["Question"] }, ...arrQuestions.slice(intInsertQuestionIndex + 1, arrQuestions.length)];
        let arrNewAnswers = [...arrAnswers.slice(0, intInsertAnswerIndex + 1), { ...objNewValue["Answer"] }, ...arrAnswers.slice(intInsertAnswerIndex + 1, arrAnswers.length)];
        let arrNewValues = [...arrValues.slice(0, intInsertValueIndex + 1), { ...objNewValue["Value"] }, ...arrValues.slice(intInsertValueIndex + 1, arrValues.length)];
        let arrNewTextElements = [
            ...objContext.state.ElementJson["vElementJson"]["TextElements"],
            {
                ...objTextElementJsonQuestion,
                ["Ref"]: React.createRef()
            },
            {
                ...objTextElementJsonAnswer,
                ["Ref"]: React.createRef()
            }
        ];
        objContext.CMSDragdrop_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
        objContext.dispatch({
            type: 'SET_STATE',
            payload: {
                "ElementJson": {
                    ...objContext.state.ElementJson,
                    ["vElementJson"]: {
                        ...objContext.state.ElementJson["vElementJson"],
                        ["Questions"]: arrNewQuestions,
                        ["Answers"]: arrNewAnswers,
                        ["Values"]: BaseCMSElement.UpdateDisplayOrder(arrNewValues),
                        ["TextElements"]: arrNewTextElements
                    }
                }
            }
        });
    }

    /**
     * @name RemoveRow
     * @param {object} objParams {objContext: {state, props, dispatch, CMSDragdrop_Editor_ModuleProcessor}, objValue, objTextResource}
     * @summary Deletes the passed row.
     */
    RemoveRow(objParams) {
        let { objContext, objAnswer, objQuestion, objValue, objTextResource } = objParams;
        let arrNewValues = objContext.state.ElementJson["vElementJson"]["Values"].filter(objTempValue => objTempValue["iElementDragDropValueId"] !== objValue["iElementDragDropValueId"]);
        let arrNewQuestions = objContext.state.ElementJson["vElementJson"]["Questions"].filter(objTempValue => objTempValue["iElementDragDropQuestionId"] !== objQuestion["iElementDragDropQuestionId"]);
        let arrNewAnswers = objContext.state.ElementJson["vElementJson"]["Answers"].filter(objTempValue => objTempValue["iElementDragDropAnswerId"] !== objAnswer["iElementDragDropAnswerId"]);
        let arrTextElements = objContext.state.ElementJson["vElementJson"]["TextElements"].filter(objTempValue => objTempValue["iElementId"] !== objAnswer["iElementTextId"] && objTempValue["iElementId"] !== objQuestion["iElementTextId"]);
        objContext.CMSDragdrop_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
        objContext.dispatch({
            type: 'SET_STATE', payload: {
                "ElementJson": {
                    ...objContext.state.ElementJson,
                    ["vElementJson"]: {
                        ...objContext.state.ElementJson["vElementJson"],
                        ["Questions"]: arrNewQuestions,
                        ["Answers"]: arrNewAnswers,
                        ["Values"]: BaseCMSElement.UpdateDisplayOrder(arrNewValues),
                        ["TextElements"]: arrTextElements
                    }
                }
            }
        });
    }

    /**
     * @name MoveUp
     * @param {object} objParams {objContext: {state, props, dispatch, CMSDragdrop_Editor_ModuleProcessor}, objValue, objTextResource}
     * @summary Moves a row one place up to the passed value.
     */
    MoveUp(objParams) {
        let { objContext, objValue, objTextResource } = objParams;
        let intValueIndex = objContext.state.ElementJson["vElementJson"]["Values"].findIndex(objTempValue => objTempValue["iElementDragDropValueId"] === objValue["iElementDragDropValueId"]);
        objContext.CMSDragdrop_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
        objContext.dispatch({
            type: 'SET_STATE', payload: {
                "ElementJson": {
                    ...objContext.state.ElementJson,
                    ["vElementJson"]: {
                        ...objContext.state.ElementJson["vElementJson"],
                        ["Values"]: BaseCMSElement.UpdateDisplayOrder(BaseCMSElement.ImmutableSwap(objContext.state.ElementJson["vElementJson"]["Values"], intValueIndex, intValueIndex - 1))
                    }
                }
            }
        });
    }

    /**
     * @name MoveDown
     * @param {object} objParams {objContext: {state, props, dispatch, CMSDragdrop_Editor_ModuleProcessor}, objValue, objTextResource}
     * @summary Moves a row one place down to the passed value.
     */
    MoveDown(objParams) {
        let { objContext, objValue, objTextResource } = objParams;
        let intValueIndex = objContext.state.ElementJson["vElementJson"]["Values"].findIndex(objTempValue => objTempValue["iElementDragDropValueId"] === objValue["iElementDragDropValueId"]);
        objContext.CMSDragdrop_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
        objContext.dispatch({
            type: 'SET_STATE', payload: {
                "ElementJson": {
                    ...objContext.state.ElementJson,
                    ["vElementJson"]: {
                        ...objContext.state.ElementJson["vElementJson"],
                        ["Values"]: BaseCMSElement.UpdateDisplayOrder(BaseCMSElement.ImmutableSwap(objContext.state.ElementJson["vElementJson"]["Values"], intValueIndex, intValueIndex + 1))
                    }
                }
            }
        });
    }

    /**
     * @name DeleteCellContent
     * @param {object} objParams {objContext: {state, props, dispatch, CMSDragdrop_Editor_ModuleProcessor}, objValue, strDragdropField}
     * @summary Deletes the Question/Answer of the passed row.
     */
    DeleteCellContent(objParams) {
        let { objContext, objValue } = objParams;
        objContext.state.ElementJson["vElementJson"]["TextElements"].map(objTempTextElement => {
            if (objTempTextElement["iElementId"] === objValue["iElementTextId"]) {
                objTempTextElement.Ref.current.ResetText();
            }
        });
    }

    // /**
    //  * @Name AddQuestionOrAnswer
    //  * @param {object} objParams {objContext: {state, props, dispatch, CMSDragdrop_Editor_ModuleProcessor}, objValue, strDragdropField, objTextResource}
    //  * @summary Adds the Question/Answer to the passed row.
    //  */
    // AddQuestionOrAnswer(objParams) {
    //     let { objContext, objValue, objTextResource } = objParams;
    //     objContext.state.ElementJson["vElementJson"]["TextElements"].map(objTempTextElement => {
    //         if (objTempTextElement["iElementId"] === objValue["iElementTextId"]) {
    //             objTempTextElement.Ref.current.SetDefaultText(objTextResource["Default_Text"]);
    //         }
    //     });
    // }

    /**
     * @name ShowOrHideQuestionOrAnswerField
     * @param {object} objParams {objContext: {state, props, dispatch, CMSDragdrop_Editor_ModuleProcessor}, objValue, strDragdropField, objTextResource}
     * @summary Hide/Show the Question/Answer of the passed row.
     */
    ShowOrHideQuestionOrAnswerField(objParams) {
        let { objContext, strKeyName, strDragdropField, objTextResource } = objParams;
        let objValue = objParams[strKeyName];
        let strKey = strDragdropField === "Questions" ? "iElementDragDropQuestionId" : "iElementDragDropAnswerId";
        let arrNewData = objContext.state.ElementJson["vElementJson"][strDragdropField].map(objTempData => {
            if (objTempData[strKey] === objValue[strKey]) {
                return {
                    ...objTempData,
                    ["cIsHidden"]: objTempData["cIsHidden"] === "Y" ? "N" : "Y"
                };
            }
            else {
                return {
                    ...objTempData
                };
            }
        });
        // let arrNewValues = objContext.state.ElementJson["vElementJson"]["Values"].map(objTempValue => {
        //     if(objTempValue[strKey] === objValue[strKey])
        //     {

        //     }
        // })
        objContext.CMSDragdrop_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
        objContext.dispatch({
            type: 'SET_STATE', payload: {
                "ElementJson": {
                    ...objContext.state.ElementJson,
                    ["vElementJson"]: {
                        ...objContext.state.ElementJson["vElementJson"],
                        [strDragdropField]: arrNewData
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
            props.JConfiguration.EditorSkinPath + "/Css/Application/ReactJs/PC/Modules/6_CMSElement/CMSDragdrop/CMSDragdropStyles.css"
        ];
    }
}

export default CMSDragdrop_Editor_ModuleProcessor;
