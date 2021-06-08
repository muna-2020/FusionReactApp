
/**
 * @name GetDefaultFormulaJson
 * @summary 
 * */
const GetDefaultScientificFormulaJson = () => {
    return {
        "iElementTypeId": "56",
        "vElementTypeName": "InputFormula",
        "iElementId": UniqueId.GetUniqueId(),
        "vElementJson": {
            "html": "",
            "Values": [{
                "iFontSize": "19",
                "vBaseFont": "Calibri, Verdana, Arial, Helvetica, sans-serif",
                "iHeight": "26",
                "vZoomProperties": "",
                "iWidth": "21",
                "mathM": "<msqrt {Idholder} ><mrow><mn  {Idholder} style='font-family:inherit;font-style:inherit;' Type='FormulaEmpty'>□</mn></mrow></msqrt>"
            }]
        }
    };
}; 