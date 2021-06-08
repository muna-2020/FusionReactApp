//UniqueId.
import * as UniqueId from "@root/Framework/Services/UniqueId/UniqueId";

/**
 * @param {string} strFormulaType
 * @summary
 */
export const GetScientificMathMl = (strFormulaType) => {
    let objScientificMathMl = {
        "plus": "<mo style='font-family:inherit;font-style:inherit;'  {Idholder}>&#43;</mo>",
        "minus": "<mo style='font-family:inherit;font-style:inherit;'  {Idholder}>&#45;</mo>",
        "multiply": "<mo style='font-family:inherit;font-style:inherit;'  {Idholder}>&#215;</mo>",
        "devide": "<mo style='font-family:inherit;font-style:inherit;'  {Idholder}>&#247;</mo>",
        "fraction": "<mfrac {Idholder}><mrow><mn style='font-family:inherit;font-style:inherit;'  {Idholder} Type='FormulaEmpty'>&#9633;</mn></mrow><mrow><mn style='font-family:inherit;font-style:inherit;'  {Idholder} Type='FormulaEmpty'>&#9633;</mn></mrow></mfrac>",
        "super": "<msup {Idholder}><mrow><mn style='font-family:inherit;font-style:inherit;'  {Idholder} Type='FormulaEmpty'>&#9633;</mn></mrow><mrow><mn style='font-family:inherit;font-style:inherit;'  {Idholder} Type='FormulaEmpty'>&#9633;</mn></mrow></msup>",
        "squreroot": "<msqrt {Idholder}><mrow><mn style='font-family:inherit;font-style:inherit;'  {Idholder}  Type='FormulaEmpty'>&#9633;</mn></mrow></msqrt>",
        "root": "<mroot {Idholder}><mrow><mn style='font-family:inherit;font-style:inherit;'  {Idholder} Type='FormulaEmpty'>&#9633;</mn></mrow><mrow Type='FormulaPreScript'><mn style='font-family:inherit;font-style:inherit;' {Idholder} Type='FormulaEmpty'>&#9633;</mn></mrow></mroot>",
        "summation": "<mrow {Idholder}><msubsup noid='true'><mrow><mo style='font-family:inherit;font-style:inherit;'  noid='true'>&#931;</mo></mrow><mrow><mn style='font-family:inherit;font-style:inherit;'  {Idholder} Type='FormulaEmpty' >&#9633;</mn></mrow><mrow><mn style='font-family:inherit;font-style:inherit;'  {Idholder} Type='FormulaEmpty'>&#9633;</mn></mrow></msubsup><mn style='font-family:inherit;font-style:inherit;'  {Idholder} Type='FormulaEmpty'>&#9633;</mn></mrow>",
        "smallbracket": "<mrow {Idholder}><mo style='font-family:inherit;font-style:inherit;'>(</mo><mn style='font-family:inherit;font-style:inherit;'  {Idholder} Type='FormulaEmpty'>&#9633;</mn><mo style='font-family:inherit;font-style:inherit;'>)</mo></mrow>",
        "squarebracket": "<mrow {Idholder}><mo style='font-family:inherit;font-style:inherit;'>[</mo><mn style='font-family:inherit;font-style:inherit;'  {Idholder} Type='FormulaEmpty'>&#9633;</mn><mo style='font-family:inherit;font-style:inherit;'>]</mo></mrow>",
        "flowerbracket": "<mrow {Idholder}><mo style='font-family:inherit;font-style:inherit;'>{</mo><mn style='font-family:inherit;font-style:inherit;'  {Idholder} Type='FormulaEmpty'>&#9633;</mn><mo style='font-family:inherit;font-style:inherit;'>}</mo></mrow>",
        "sine": "<mrow {Idholder}><mi style='font-family:inherit;font-style:inherit;'  noid='true'>sin</mi><mo style='font-family:inherit;font-style:inherit;'  noid='true'>(</mo><mn style='font-family:inherit;font-style:inherit;'  {Idholder} Type='FormulaEmpty'>&#9633;</mn><mo style='font-family:inherit;font-style:inherit;'  noid='true'>)</mo></mrow>",
        "cos": "<mrow {Idholder}><mi style='font-family:inherit;font-style:inherit;'  noid='true'>cos</mi><mo style='font-family:inherit;font-style:inherit;'  noid='true'>(</mo><mn style='font-family:inherit;font-style:inherit;'  {Idholder} Type='FormulaEmpty'>&#9633;</mn><mo style='font-family:inherit;font-style:inherit;'  noid='true'>)</mo></mrow>",
        "tan": "<mrow {Idholder}><mi style='font-family:inherit;font-style:inherit;'  noid='true'>tan</mi><mo style='font-family:inherit;font-style:inherit;'  noid='true'>(</mo><mn style='font-family:inherit;font-style:inherit;'  {Idholder} Type='FormulaEmpty'>&#9633;</mn><mo style='font-family:inherit;font-style:inherit;'  noid='true'>)</mo></mrow>",
        "sec": "<mrow {Idholder}><mi style='font-family:inherit;font-style:inherit;'  noid='true'>sec</mi><mo style='font-family:inherit;font-style:inherit;'  noid='true'>(</mo><mn style='font-family:inherit;font-style:inherit;'  {Idholder} Type='FormulaEmpty'>&#9633;</mn><mo style='font-family:inherit;font-style:inherit;'  noid='true'>)</mo></mrow>",
        "csc": "<mrow {Idholder}><mi style='font-family:inherit;font-style:inherit;'  noid='true'>csc</mi><mo style='font-family:inherit;font-style:inherit;'  noid='true'>(</mo><mn style='font-family:inherit;font-style:inherit;'  {Idholder} Type='FormulaEmpty'>&#9633;</mn><mo style='font-family:inherit;font-style:inherit;'  noid='true'>)</mo></mrow>",
        "cot": "<mrow {Idholder}><mi style='font-family:inherit;font-style:inherit;'  noid='true'>cot</mi><mo style='font-family:inherit;font-style:inherit;'  noid='true'>(</mo><mn style='font-family:inherit;font-style:inherit;'  {Idholder} Type='FormulaEmpty'>&#9633;</mn><mo style='font-family:inherit;font-style:inherit;'  noid='true'>)</mo></mrow>",
        "sini": "<mrow {Idholder}><msup {Idholder}><mrow><mi style='font-family:inherit;font-style:inherit;'  noid='true'>sin</mi></mrow><mrow><mn style='font-family:inherit;font-style:inherit;'  {Idholder}>-1</mn></mrow></msup><mo style='font-family:inherit;font-style:inherit;'  noid='true'>(</mo><mn style='font-family:inherit;font-style:inherit;'  {Idholder} Type='FormulaEmpty'>&#9633;</mn><mo style='font-family:inherit;font-style:inherit;'  noid='true'>)</mo></mrow>",
        "cosi": "<mrow {Idholder}><msup {Idholder}><mrow><mi style='font-family:inherit;font-style:inherit;'  noid='true'>cos</mi></mrow><mrow><mn style='font-family:inherit;font-style:inherit;'  {Idholder}>-1</mn></mrow></msup><mo style='font-family:inherit;font-style:inherit;'  noid='true'>(</mo><mn style='font-family:inherit;font-style:inherit;'  {Idholder} Type='FormulaEmpty'>&#9633;</mn><mo style='font-family:inherit;font-style:inherit;'  noid='true'>)</mo></mrow>",
        "tani": "<mrow {Idholder}><msup {Idholder}><mrow><mi style='font-family:inherit;font-style:inherit;'  noid='true'>tan</mi></mrow><mrow><mn style='font-family:inherit;font-style:inherit;'  {Idholder}>-1</mn></mrow></msup><mo style='font-family:inherit;font-style:inherit;'  noid='true'>(</mo><mn style='font-family:inherit;font-style:inherit;'  {Idholder} Type='FormulaEmpty'>&#9633;</mn><mo style='font-family:inherit;font-style:inherit;'  noid='true'>)</mo></mrow>",
    };
    return objScientificMathMl[strFormulaType];
};

/**
 * @param {any} strFormulaType
 * @summary 
 */
export const GetSimpleMathMl = (strFormulaType) => {
    let arrNumerics = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    let arrAlphabets = ["a", "b", "c", "d", "e", "f", "x", "y", "z", "r","."];
    let arrOperators = ["(", ")"];
    let objSimpleMathMl = {
        "π": "<mi style='font-family:inherit;font-style:inherit;' {Idholder} >&#x3C0;</mi>",
        "+": "<mo style='font-family:inherit;font-style:inherit;' {Idholder} >&#43;</mo>",
        "-": "<mo style='font-family:inherit;font-style:inherit;' {Idholder} >&#45;</mo>",
        "×": "<mo style='font-family:inherit;font-style:inherit;' {Idholder} >&#215;</mo>",
        "hoch": "<msup {Idholder}><mrow><mn style='font-family:inherit;font-style:inherit;'  {Idholder} Type='FormulaEmpty'>□</mn></mrow><mrow><mn style='font-family:inherit;font-style:inherit;' {Idholder} Type='FormulaEmpty'>□</mn></mrow></msup>",
        ":": "<mo style='font-family:inherit;font-style:inherit;' {Idholder} >:</mo>",
        "bruchstrich": "<mfrac {Idholder}><mrow><mn style='font-family:inherit;font-style:inherit;'  {Idholder} Type='FormulaEmpty'>□</mn></mrow><mrow><mn style='font-family:inherit;font-style:inherit;' {Idholder} Type='FormulaEmpty'>□</mn></mrow></mfrac>",
        "root_w": "<msqrt {Idholder}><mrow><mn style='font-family:inherit;font-style:inherit;'  {Idholder}  Type='FormulaEmpty'>□</mn></mrow></msqrt>"
    };
    if (arrNumerics.includes(strFormulaType)) {
        return "<mn style='font-family:inherit;font-style:inherit;' {Idholder} >" + strFormulaType + "</mn>";
    } else if (arrAlphabets.includes(strFormulaType)) {
        return "<mi style='font-family:inherit;font-style:inherit;' {Idholder} >" + strFormulaType + "</mi>";
    } else if (arrOperators.includes(strFormulaType)) {
        return "<mo style='font-family:inherit;font-style:inherit;' {Idholder} >" + strFormulaType + "</mo>";
    } else {
        return objSimpleMathMl[strFormulaType];
    }
};

/**
 * @param {number} intOrder The order where the Element needs to be added.
 * @param {object} objAdditionalProperties contains the type of formula need to display.
 * @summary return the defalt elementjson for CMSInputFormula.
 * @returns {object} default checkbox json.
 * */
export const GetDefaultElementJson = (intOrder, objAdditionalProperties) => {
    let strFormulaType = objAdditionalProperties.formulaType;
    return {
        "iElementTypeId": "52",
        "vElementTypeName": "InputFormula",
        "iElementId": UniqueId.GetUniqueId(),
        "iOrder": intOrder,
        "vElementJson": {
            "dCorrectPoint": 1,
            "dWrongPoint": -0.5,
            "dNotAnsweredPoint": 0,
            "vFormulaType": strFormulaType,
            "vNewFormula": "Y",
            "html": "",
            "Values": [{
                "iFontSize": "19",
                "vBaseFont": "Calibri, Verdana, Arial, Helvetica, sans-serif",
                "iHeight": "26",
                "vZoomProperties": "",
                "iWidth": "21",
                "vDefalutMathMl": '<mrow><mn style="font-family:inherit;font-style:inherit;" type="FormulaEmpty" {Idholder}>□</mn></mrow>',
                "mathMl": '<mrow><mn style="font-family:inherit;font-style:inherit;" {Idholder} type="FormulaEmpty">□</mn></mrow>'
            }],
        }
    };
}
