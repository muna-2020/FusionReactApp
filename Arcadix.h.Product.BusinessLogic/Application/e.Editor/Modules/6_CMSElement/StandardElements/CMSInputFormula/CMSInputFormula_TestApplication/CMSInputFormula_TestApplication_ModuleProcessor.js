//Base classes/hooks.
import EditorBase_ModuleProcessor from '@shared/Framework/BaseClass/EditorBaseClass/EditorBase_ModuleProcessor';

//Application state Classes/methods
import EditorState from "@shared/Framework/DataService/EditorState/EditorState";


import * as CMSInputFormula_Editor_MetaData from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSInputFormula/CMSInputFormula_Editor/CMSInputFormula_Editor_MetaData';

/**
 * @name CMSInputFormula_TestApplication_ModuleProcessor
 * @summary Contains the cmsinputformula's test application version module specific methods.
 * */
class CMSInputFormula_TestApplication_ModuleProcessor extends EditorBase_ModuleProcessor {

    /**
     * @name GetElementJsonForComponent
     * @param {object} objContext {state, props, dispatch, CMSInputFormula_TestApplication_ModuleProcessor}.
     * @param {object} objLoadSolutionType Load Solution Type
     * @param {object} ElementJsonWithAnswer Original Element Json
     * @param {object} UserAnswerJson User answer response
     * @summary Make the values uncheked for the test application version.
     * @returns {object} Element Json modified according to test application viewing.
     */
    GetElementJsonForComponent(objContext, objLoadSolutionType, ElementJsonWithAnswer = null, UserAnswerJson = null) {
        let objElementJson = {
            ...objContext.props.ElementJson, vElementJson: {
                ...objContext.props.ElementJson.vElementJson,
                ["html"]: "",
                ["vNewFormula"]: "Y",
                ["Values"]: [...objContext.props.ElementJson.vElementJson.Values.map(objValue => {
                    return { ...objValue, mathMl: objValue["vDefalutMathMl"] }
                })]
            }
        };
        return objElementJson;
    };

    /**
     * @param {any} strFormulaType
     * @summary 
     */
    AddSubFormula(strFormulaType, objContext) {
        if (EditorState.GetProperty("AddSubFormula")) {
            let fnAddSubFormula = EditorState.GetProperty("AddSubFormula");
            if (objContext.state.ElementJson.vElementJson && objContext.state.ElementJson.vElementJson.vFormulaType && objContext.state.ElementJson.vElementJson.vFormulaType == "scientific") {
                fnAddSubFormula("cmsinputformula", objContext.props.ElementJson, CMSInputFormula_Editor_MetaData.GetScientificMathMl(strFormulaType));
            } else {
                fnAddSubFormula("cmsinputformula", objContext.props.ElementJson, CMSInputFormula_Editor_MetaData.GetSimpleMathMl(strFormulaType));
            }
        }
    }

    /**
     * @name GetDynamicStyles
     * @param {any} props
     * @summary this returns the dynamic styles for the components.
     */
    GetDynamicStyles(props) {
        return [props.JConfiguration.EditorSkinPath + "/Css/Application/ReactJs/PC/Modules/6_CMSElement/CMSInputFormula/CMSInputFormula_Scientific.css",
        props.JConfiguration.EditorSkinPath + "/Css/Application/ReactJs/PC/Modules/6_CMSElement/CMSInputFormula/CMSInputFormula_Simple.css"];
    }
}

export default CMSInputFormula_TestApplication_ModuleProcessor;
