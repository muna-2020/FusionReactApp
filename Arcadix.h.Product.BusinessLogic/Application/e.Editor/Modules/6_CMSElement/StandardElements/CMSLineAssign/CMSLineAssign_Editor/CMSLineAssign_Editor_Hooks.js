//React Imports
import { useEffect, useImperativeHandle } from 'react';

//UndoRedo imports
import { UndoRedoInitialize, UndoRedoAction } from '@root/Application/e.Editor/PC/Modules/1_EditorFrame/UndoRedo/UndoRedo';

//BaseCMSElement import.
import * as BaseCMSElement from "@shared/Framework/BaseClass/EditorBaseClass/BaseCMSElement";

/**
 * @name GetInitialState
 * @param {object} props component props
 * @summary Reducer
 * @returns {object} initial state object
 */
export function GetInitialState(props) {
    return UndoRedoInitialize({
        "ElementJson": props.ElementJson,
        "PageId": props.PageId,
        "ComponentKey": props.ComponentKey,
        "intSelectedQuestionNumber": -1,
        "arrBlnShowQuestionBorder": props.ElementJson.vElementJson.Questions.map((q, i) => { return false }),
        "arrBlnShowAnswerBorder": props.ElementJson.vElementJson.Answers.map((q, i) => { return true }),
        "isLoadComplete": false
    }, props);
}

/**
 * @name Initialize
 * @param {object} objContext {state, props, dispatch, CMSDragdrop_Editor_ModuleProcessor}
 * @summary Initialize the custom hooks
 */
export function Initialize(objContext) {

    /**
     * @summary Perserves the ElementState.
     */
    useEffect(() => {
        if (objContext.props.PreserveElementState) {
            objContext.props.PreserveElementState(objContext.state.ElementJson["iElementId"], objContext.state);
        }
    }, [objContext.state.StateHistory]);

    /**
     * @summary Used for UndoRedo.
     */
    useImperativeHandle(objContext.props.UndoRedoRef, () => ({
        UndoRedo: (LastActivity, Action) => {
            UndoRedoAction(LastActivity, Action, objContext.state, objContext.dispatch);
        }
    }), [objContext.state]);

    /**
     * @summary Gets the Element Json.
    */
    useImperativeHandle(objContext.props.ElementRef, () => ({
        "GetElementJson": async (blnRemoveRef = true, strDataFor = null) => {
            let arrTextElements = [...objContext.state.ElementJson["vElementJson"]["TextElements"]];
            let arrNewTextElements = [];
            for (let intCount = 0; intCount < arrTextElements.length; intCount++) {
                let objTextElementJson = { ...arrTextElements[intCount] };
                if (arrTextElements[intCount].Ref.current && arrTextElements[intCount].Ref.current.GetElementJson) {
                    objTextElementJson = await arrTextElements[intCount].Ref.current.GetElementJson(blnRemoveRef, strDataFor);
                }
                arrNewTextElements = [
                    ...arrNewTextElements,
                    objTextElementJson
                ];
            }
            let { width, height } = objContext.svgRef.current.getBoundingClientRect();
            let objElementJson = {
                ...objContext.state.ElementJson,
                ["vElementJson"]: {
                    ...objContext.state.ElementJson["vElementJson"],
                    "iHeight": height,
                    "iWidth": width,
                    ["TextElements"]: arrNewTextElements
                }
            };
            return BaseCMSElement.RemoveRefKeyFromJson(objElementJson);
        },
        "GetElementJsonForCopy": async () => {
            let arrHeaderValues = [];
            let arrQuestions = [];
            let arrAnswers = [];
            let arrTextElements = [];
            for (let intCount = 0; intCount < objContext.state.ElementJson["vElementJson"]["HeaderValues"].length; intCount++) {
                if (objContext.state.ElementJson["vElementJson"]["HeaderValues"][intCount]["iElementTextId"] !== null) {
                    let objTextElementJson = objContext.state.ElementJson["vElementJson"]["TextElements"].find(objTempTextElement => objTempTextElement["iElementId"] === objContext.state.ElementJson["vElementJson"]["HeaderValues"][intCount]["iElementTextId"]);
                    let objNewTextElementJson = await objTextElementJson.Ref.current.GetElementJsonForCopy();
                    arrTextElements = [
                        ...arrTextElements,
                        objNewTextElementJson
                    ];
                    arrHeaderValues = [
                        ...arrHeaderValues,
                        {
                            ...objContext.state.ElementJson["vElementJson"]["HeaderValues"][intCount],
                            ["iElementTextId"]: objNewTextElementJson["iElementId"]
                        }
                    ];
                }
                else {
                    arrHeaderValues = [
                        ...arrHeaderValues,
                        objContext.state.ElementJson["vElementJson"]["HeaderValues"][intCount]
                    ];
                }
            }
            for (let intCount = 0; intCount < objContext.state.ElementJson["vElementJson"]["Questions"].length; intCount++) {
                let objTextElementJson = objContext.state.ElementJson["vElementJson"]["TextElements"].find(objTempTextElement => objTempTextElement["iElementId"] === objContext.state.ElementJson["vElementJson"]["Questions"][intCount]["iElementTextId"]);
                let objNewTextElementJson = await objTextElementJson.Ref.current.GetElementJsonForCopy();
                arrTextElements = [
                    ...arrTextElements,
                    objNewTextElementJson
                ];
                arrQuestions = [
                    ...arrQuestions,
                    {
                        ...objContext.state.ElementJson["vElementJson"]["Questions"][intCount],
                        ["iElementTextId"]: objNewTextElementJson["iElementId"]
                    }
                ];
            }
            for (let intCount = 0; intCount < objContext.state.ElementJson["vElementJson"]["Answers"].length; intCount++) {
                let objTextElementJson = objContext.state.ElementJson["vElementJson"]["TextElements"].find(objTempTextElement => objTempTextElement["iElementId"] === objContext.state.ElementJson["vElementJson"]["Answers"][intCount]["iElementTextId"]);
                let objNewTextElementJson = await objTextElementJson.Ref.current.GetElementJsonForCopy();
                arrTextElements = [
                    ...arrTextElements,
                    objNewTextElementJson
                ];
                arrAnswers = [
                    ...arrAnswers,
                    {
                        ...objContext.state.ElementJson["vElementJson"]["Answers"][intCount],
                        ["iElementTextId"]: objNewTextElementJson["iElementId"]
                    }
                ];
            }
            let { width, height } = objContext.svgRef.current.getBoundingClientRect();
            let objElementJson = {
                ...objContext.state.ElementJson,
                ["iElementId"]: UniqueId.GetUniqueId(),
                ["vElementJson"]: {
                    ...objContext.state.ElementJson["vElementJson"],
                    "iHeight": height,
                    "iWidth": width,
                    ["HeaderValues"]: arrHeaderValues,
                    ["Questions"]: arrQuestions,
                    ["Answers"]: arrAnswers,
                    ["TextElements"]: arrTextElements
                }
            };
            objElementJson = BaseCMSElement.RemoveRefKeyFromJson(objElementJson);
            return objElementJson;
        },
        ["GetContextMenuOptions"]: (iElementId) => {
            var strType = ""; var objValue;
            var arrQuestions = [...objContext.state.ElementJson.vElementJson.Questions];
            for (var intQuestionCount = 0; intQuestionCount < arrQuestions.length; intQuestionCount++) {
                if (arrQuestions[intQuestionCount]["iElementTextId"] === iElementId) {
                    strType = "Question";
                    objValue = { ...arrQuestions[intQuestionCount] };
                    break;
                }
            }
            if (strType === "") {
                var arrAnswers = [...objContext.state.ElementJson.vElementJson.Answers];
                for (var intAnswerCount = 0; intAnswerCount < arrAnswers.length; intAnswerCount++) {
                    if (arrAnswers[intAnswerCount]["iElementTextId"] === iElementId) {
                        strType = "Answer";
                        objValue = { ...arrAnswers[intAnswerCount] };
                        break;
                    }
                }
            }
            return objContext.CMSLineAssign_Editor_ModuleProcessor.GetContextMenuOptions(objContext, { "Type": strType, "Value": objValue });
        },
        "GetLatestContext": () => {
            return objContext;
        },
        "UpdateTaskEditStatus": () => {
            objContext.CMSLineAssign_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
        }
    }), [objContext.state, objContext.props])
}

