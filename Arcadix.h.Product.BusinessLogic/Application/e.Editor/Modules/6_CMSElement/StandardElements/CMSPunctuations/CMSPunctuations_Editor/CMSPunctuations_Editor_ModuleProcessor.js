//Module related files
import CMSPunctuations_Editor_ContextMenu from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSPunctuations/CMSPunctuations_Editor/CMSPunctuations_Editor_ContextMenu';

import * as CMSPunctuations_Editor_MetaData from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSPunctuations/CMSPunctuations_Editor/CMSPunctuations_Editor_MetaData';

/**
 * @name CMSPunctuations_Editor_ModuleProcessor
 * @summary Contains the Punctuations's editor version module specific methods.
 * */
class CMSPunctuations_Editor_ModuleProcessor extends CMSPunctuations_Editor_ContextMenu {

    /**
     * @name SetRandomOrder
     * @param {any} objContext {state, props, dispatch}
     */
    SetRandomOrder(objContext) {
        objContext.dispatch({
            "type": "SET_STATE", "payload": {
                "ElementJson": {
                    ...objContext.state.ElementJson,
                    "vElementJson": {
                        ...objContext.state.ElementJson.vElementJson,
                        "cIsRandomDisplay": objContext.state.ElementJson.vElementJson.cIsRandomDisplay === "N" ? "Y" : "N",
                    }
                }
            }
        });
        objContext.CMSPunctuations_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
    }

    /**
     * @name AddAlternativeSolution
     * @param {object} objContext {state, props, dispatch}
     */
    AddAlternativeSolution(objContext){
        objContext.dispatch({
            "type": "SET_STATE", "payload": {
                "ElementJson":
                {
                    ...objContext.state.ElementJson,
                    "vElementJson": {
                        ...objContext.state.ElementJson.vElementJson,
                        "Values": [
                            ...objContext.state.ElementJson.vElementJson.Values, CMSPunctuations_Editor_MetaData.GetDefaultAlternativeSolutionJson(objContext.state.ElementJson.iElementId)
                        ]
                    }
                }
            }
        });
        objContext.CMSPunctuations_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
    }

    /**
     * @name RemoveAlternativeSolution
     * @param {object} objContext {state, props, dispatch}
     * @param {number} iSolutionId alternate solution id
     */
    RemoveAlternativeSolution(objContext, iSolutionId){
        objContext.dispatch({
            "type": "SET_STATE", "payload": {
                "ElementJson":
                {
                    ...objContext.state.ElementJson,
                    "vElementJson": {
                        ...objContext.state.ElementJson.vElementJson,
                        "Values": [...objContext.state.ElementJson.vElementJson.Values.filter(v => v.iElementPunctuationAlternateSolutionId !== iSolutionId)]
                    }
                }
            }
        });
        objContext.CMSPunctuations_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
    }

    /**
     * @name GetDynamicStyles
     * @param {object} props component props.
     * @summary this returns the styles for the SSR.
     */
    GetDynamicStyles(props) {
        return [
            props.JConfiguration.EditorSkinPath + "/Css/Application/ReactJs/PC/Modules/6_CMSElement/CMSPunctuations/CMSPunctuationsStyles.css"
        ];
    }
}

export default CMSPunctuations_Editor_ModuleProcessor;