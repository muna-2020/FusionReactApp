//React imports
import React from 'react';

//Module related files
import CMSLineAssign_Editor_ContextMenu from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSLineAssign/CMSLineAssign_Editor/CMSLineAssign_Editor_ContextMenu';
import * as CMSText_Editor_MetaData from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSText/CMSText_Editor/CMSText_Editor_MetaData";

//UniqueId.
import * as UniqueId from "@root/Framework/Services/UniqueId/UniqueId";

/**
 * @name CMSLineAssign_Editor_ModuleProcessor
 * @summary Contains the LineAssign's editor version module specific methods.
 * */
class CMSLineAssign_Editor_ModuleProcessor extends CMSLineAssign_Editor_ContextMenu {

    /**
     * @Name AddQuestionOrAnswer
     * @param {object} objParams {objContext: {state, props, dispatch, CMSLineAssign_Editor_ModuleProcessor}, strAddType, objTextResource}
     * @summary Adds the Question/Answer to the passed row.
     */
    AddQuestionOrAnswer(objParams) {
        let { objContext, strAddType, objTextResource } = objParams;
        let iElementTextId = UniqueId.GetUniqueId();
        let objTextElementJson = CMSText_Editor_MetaData.GetDefaultElementJson(1, iElementTextId, "Text");
        objContext.dispatch({
            "type": "SET_STATE", "payload": {
                ["ElementJson"]: {
                    ...objContext.state.ElementJson,
                    ["vElementJson"]: {
                        ...objContext.state.ElementJson.vElementJson,
                        [`${strAddType}s`]: [
                            ...objContext.state.ElementJson.vElementJson[`${strAddType}s`],
                            {
                                [`iElement${strAddType}Id`]: UniqueId.GetUniqueId(),
                                "iElementTextId": iElementTextId
                            }
                        ],
                        ["TextElements"]: [...objContext.state.ElementJson.vElementJson.TextElements, {
                            ...objTextElementJson,
                            ["Ref"]: React.createRef()
                        }]
                    }
                }
            }
        });
        objContext.CMSLineAssign_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
    }

    /**
     * @Name DeleteQuestionOrAnswer
     * @param {object} objParams {objContext: {state, props, dispatch, CMSLineAssign_Editor_ModuleProcessor}, strDeleteType, Value, objTextResource}
     * @summary Adds the Question/Answer to the passed row.
     */
    DeleteQuestionOrAnswer(objParams) {
        var { objContext, strDeleteType, objSelectedValue, objTextResource } = objParams;
        if (objContext.state.ElementJson.vElementJson[`${strDeleteType}s`].length > 1) {
            objContext.dispatch({
                "type": "SET_STATE", "payload": {
                    "blnQuestionAnswerRemoved": true,
                    ["ElementJson"]: {
                        ...objContext.state.ElementJson,
                        ["vElementJson"]: {
                            ...objContext.state.ElementJson.vElementJson,
                            [`${strDeleteType}s`]: [
                                ...objContext.state.ElementJson.vElementJson[`${strDeleteType}s`].filter(ele => ele[`iElement${strDeleteType}Id`] !== objSelectedValue[`iElement${strDeleteType}Id`])
                            ],
                            ["TextElements"]: [
                                ...objContext.state.ElementJson.vElementJson.TextElements.filter(ele => ele[`iElementTextId`] !== objSelectedValue[`iElementTextId`])
                            ],
                            ["Values"]: [
                                ...objContext.state.ElementJson.vElementJson.Values.filter(ele => ele[`iElement${strDeleteType}Id`] !== objSelectedValue[`iElement${strDeleteType}Id`])
                            ]
                        }
                    }
                }
            });
            objContext.CMSLineAssign_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
        }
    }

    /**
     * @name GetDynamicStyles
     * @param {object} props component props.
     * @summary this returns the styles for the SSR.
     */
    GetDynamicStyles(props) {
        return [props.JConfiguration.EditorSkinPath + "/Css/Application/ReactJs/PC/Modules/6_CMSElement/CMSLineAssign/CMSLineAssignStyles.css"]
    };
}

export default CMSLineAssign_Editor_ModuleProcessor;