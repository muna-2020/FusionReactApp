// Base Module object
import Base_ModuleProcessor from '@shared/Framework/BaseClass/Base_ModuleProcessor';

//store related imports
import EditorState from '@shared/Framework/DataService/EditorState/EditorState';

//UniqueId.
import * as UniqueId from "@root/Framework/Services/UniqueId/UniqueId";

import * as FormulaTab_MetaData from "@shared/Application/e.Editor/Modules/2_OfficeRibbon/5_FormulaTab/FormulaTab_MetaData"

/**
 * @name Start_ModuleProcessor
 * @summary module processor for Start tab. 
 */
class Formula_ModuleProcessor extends Base_ModuleProcessor {

    constructor() {
        super();
    }

    /**
     * @name GetFormulaJson.
     * @summary returns Formula json.
     * @returns json
     * */
    GetFormulaJson() {
        return {
            "value": {
                "iFontSize": "19",
                "vBaseFont": "Calibri, Verdana, Arial, Helvetica, sans-serif",
                "iHeight": "26",
                "vZoomProperties": "",
                "iWidth": "21",
                "mathMl": "<msub {Idholder} ><mrow><mn style='font-family:inherit;font-style:inherit;' {Idholder}  Type='FormulaEmpty'>□</mn></mrow><mrow><mn style='font-family:inherit;font-style:inherit;' {Idholder} Type='FormulaEmpty'>□</mn></mrow></msub>"
            },
            "html": "<span class=\"MathJax\" id=\"MathJax-Element-1-Frame\" role=\"textbox\" aria-readonly=\"true\" style=\"\"><nobr><span class=\"math\" id=\"MathJax-Span-1\"><span style=\"display: inline-block; position: relative; width: 21px; height: 0px; font-size: 107%;\"><span style=\"position: absolute; clip: rect(0.7px, 20330px, 30.7px, -9px); top: -20px; left: 0px;\"><span class=\"mrow\" id=\"MathJax-Span-2\"><span class=\"mrow\" id=\"MathJax-Span-3\"><span class=\"msub\" id=\"10920191783074\"><span style=\"display: inline-block; position: relative; width: 20.5px; height: 0px;\"><span style=\"position: absolute; clip: rect(23.7px, 20330px, 50.1px, -9px); top: -43px; left: 0px;\"><span class=\"mrow\" id=\"MathJax-Span-5\" isselected=\"IsSelected\" style=\"\"><span class=\"mn\" id=\"10920191783075\" style=\"font-family: inherit; font-style: inherit;\"><span style=\"font-family: inherit; font-size: 93%; font-style: inherit; font-weight: normal;\">□</span></span></span><span style=\"display: inline-block; width: 0px; height: 43px;\"></span></span><span style=\"position: absolute; top: -32.2px; left: 11px;\"><span class=\"mrow\" id=\"MathJax-Span-7\" style=\"\"><span class=\"mn\" id=\"10920191783076\" style=\"font-family: inherit; font-style: inherit; font-size: 70.7%;\"><span style=\"font-family: inherit; font-size: 93%; font-style: inherit; font-weight: normal;\">□</span></span></span><span style=\"display: inline-block; width: 0px; height: 37px;\"></span></span></span></span></span></span><span style=\"display: inline-block; width: 0px; height: 20px;\"></span></span></span><span style=\"border-left: 0px solid; display: inline-block; overflow: hidden; width: 0px; height: 25.9px; vertical-align: -8.7px;\"></span></span></nobr></span>",
            "RefereceHtml": "<div style='visibility: hidden; overflow: hidden; position: absolute; top: 0px; height: 1px; width: auto; padding: 0px; border: 0px; margin: 0px; text-align: left; text-indent: 0px; text-transform: none; line-height: normal; letter-spacing: normal; word-spacing: normal;'><div id=\"MathJax_SVG_Hidden\"></div><svg><defs id=\"MathJax_SVG_glyphs\"></defs></svg></div>",
            "iElementTypeId": "9",
            "iElementType": "Formula",
            "iElementId": UniqueId.GetUniqueId()
        }
    };

    /**
     * @name GetMathMl
     * @summary returns the selected formula's math ml.
     */
    GetMathMl(){
        return "<msub {Idholder} ><mrow><mn style='font-family:inherit;font-style:inherit;' {Idholder}  Type='FormulaEmpty'>□</mn></mrow><mrow><mn style='font-family:inherit;font-style:inherit;' {Idholder} Type='FormulaEmpty'>□</mn></mrow></msub>";
    };

    /**
     * @name AddFormula.
     * @summary add formula to the active TextEditor as sub element.
     * */
    AddFormula_Old(objContext) {
        if (EditorState.GetProperty("ActiveFormula")) {
            EditorState.GetProperty("ActiveFormula")(this.GetMathMl())
        } else {
            let CurrentTextRef = EditorState.GetReference("CurrentTextRef");
            CurrentTextRef.current.AddFormula(objContext.Formula_ModuleProcessor.GetFormulaJson());
        }
    };

    /**
     * @name AddFormula.
     * @summary add formula to the active TextEditor as sub element.
     * */
    AddFormula(objContext, strGroup, strFormulaType) {
        if (EditorState.GetProperty("AddSubFormula")) {
            console.log('adding as sub formula..........');
            EditorState.GetProperty("AddSubFormula")('cmsformula', {}, FormulaTab_MetaData.GetMathMl(strGroup, strFormulaType)["MathMl"])
        } else {
            let CurrentTextRef = EditorState.GetReference("CurrentTextRef");
            console.log('adding as main formula..........');
            CurrentTextRef.current.AddFormula(FormulaTab_MetaData.GetFormulaJson(strGroup, strFormulaType));
        }
    };

    /**
     * @param {any} objContext
     * @param {any} strFormulaGrp formula group type.
     * @summary 
     */
   ShowFormulaPopup  (objContext,strFormulaGrp) {
        objContext.dispatch({
            type: "SET_STATE",
            payload: { activePopup: strFormulaGrp }
        });
    };


}
export default Formula_ModuleProcessor;