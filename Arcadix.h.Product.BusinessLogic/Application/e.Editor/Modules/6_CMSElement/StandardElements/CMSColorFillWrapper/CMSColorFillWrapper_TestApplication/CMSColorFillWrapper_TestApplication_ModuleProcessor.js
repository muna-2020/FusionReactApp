//Base classes/hooks.
import EditorBase_ModuleProcessor from '@shared/Framework/BaseClass/EditorBaseClass/EditorBase_ModuleProcessor';

/**
 * @name CMSColorFillWrapper_Editor_ContextMenu
 * @summary Contains the context menu related methods of the CMSColorFillWrapper
 * */
class CMSColorFillWrapper_TestApplication_ModuleProcessor extends EditorBase_ModuleProcessor {

    /**
     * @name GetElementJsonForComponent
     * @param {object} objContext {state, props, dispatch, CMSColorFillWrapper_TestApplication_ModuleProcessor}
     * @param {object} objLoadSolutionType Load Solution Type
     * @param {object} ElementJsonWithAnswer Original Element Json
     * @param {object} UserAnswerJson User answer response
     * @summary Make the values uncheked for the test application version
     * @returns {object} Element Json modified according to test application viewing
     */
    GetElementJsonForComponent(objContext, objLoadSolutionType, ElementJsonWithAnswer = null, UserAnswerJson = null) {
        let objElementJson = { ...objContext.props.ElementJson };
        if ((objLoadSolutionType["ViewSolution"] || objLoadSolutionType["ViewComparison"] || objLoadSolutionType["LoadUserResponse"]) && ElementJsonWithAnswer) {
            var arrActualValues = ElementJsonWithAnswer.vElementJson.Values;
            objElementJson = {
                ...objElementJson, "vElementJson": { ...objElementJson["vElementJson"], "Values": arrActualValues }
            }
        }
        return objElementJson;
    }

    /**
    * @name ResetAnswer
    * @param {object} objContext {state, props, dispatch, CMSColorFillWrapper_TestApplication_ModuleProcessor}
    * @summary Resets the user response
    */
    ResetAnswer(objContext) {
        objContext.strSelectedColor.current = null;
        objContext.arrUserAnswers.current = [];
        objContext.arrTransparentShapeIds.current.map((id) => {
            document.getElementById(id).setAttribute("fill", "rgba(0, 0, 0, 0)")
        });
        objContext.dispatch({
            "type": "SET_STATE",
            "payload": {
                "ElementJson": {
                    ...objContext.state.ElementJson,
                    ["vElementJson"]: {
                        ...objContext.state.ElementJson["vElementJson"]
                    }
                },
                "ViewComparison": false,
                "ViewSolution": false,
                "LoadUserResponse": false,
                "ElementJsonWithAnswer": null,
                "UserAnswerJson": null,
                "ElementStatus": null,
                "strSelectedColor": null
            }
        });
    }
}

export default CMSColorFillWrapper_TestApplication_ModuleProcessor;
