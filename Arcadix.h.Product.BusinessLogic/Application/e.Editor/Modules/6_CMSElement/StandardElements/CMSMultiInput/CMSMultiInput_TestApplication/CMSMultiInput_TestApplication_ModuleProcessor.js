//Base classes/hooks.
import EditorBase_ModuleProcessor from '@shared/Framework/BaseClass/EditorBaseClass/EditorBase_ModuleProcessor';

/**
 * @name CMSMultiInput_TestApplication_ModuleProcessor
 * @summary Contains the MultiInput's test application version module specific methods.
 * */
class CMSMultiInput_TestApplication_ModuleProcessor extends EditorBase_ModuleProcessor {

    /**
     * @name GetElementJsonForComponent
     * @param {object} objContext {state, props, dispatch, CMSMultiInput_TestApplication_ModuleProcessor}
     * @param {object} objLoadSolutionType Load Solution Type
     * @param {object} ElementJsonWithAnswer Original Element Json
     * @param {object} UserAnswerJson User answer response
     * @summary Returns the required elementJson for the test application version of multi input.
     * @returns {object} ElementJson
     */
    GetElementJsonForComponent(objContext = null, objLoadSolutionType = null, ElementJsonWithAnswer = null, UserAnswerJson = null, props = null) {
        if (objContext === null) {
            objContext = {
                "props": props
            };
        }
        let objElementJson;
        if (objLoadSolutionType["ViewSolution"])//Show Original Solution
        {
            if (UserAnswerJson !== null) {
                objElementJson = {
                    ...objContext.props.ElementJson,
                    ["vElementJson"]: {
                        ...objContext.props.ElementJson["vElementJson"],
                        ["Values"]: UserAnswerJson["Answers"]
                    }
                };
            }
            else {
                let arrValues = objContext.props.ElementJson["vElementJson"]["Values"].slice(0, parseInt(objContext.props.ElementJson["vElementJson"]["iNumberOfInputDisplay"]));
                objElementJson = {
                    ...objContext.props.ElementJson,
                    ["vElementJson"]: {
                        ...objContext.props.ElementJson["vElementJson"],
                        ["Values"]: [...arrValues.map(objTempValue => {
                            return {
                                ...objTempValue,
                                ["vText"]: ""
                            };
                        })]
                    }
                };
            }
        }
        else if (objLoadSolutionType["ViewComparison"] || objLoadSolutionType["LoadUserResponse"])//Load User Response and User response Comparison
        {
            objElementJson = {
                ...objContext.props.ElementJson,
                ["vElementJson"]: {
                    ...objContext.props.ElementJson["vElementJson"],
                    ["Values"]: UserAnswerJson["Answers"]
                }
            };
        }
        else//Normal Execution
        {
            let arrValues = objContext.props.ElementJson["vElementJson"]["Values"].slice(0, parseInt(objContext.props.ElementJson["vElementJson"]["iNumberOfInputDisplay"]));
            objElementJson = {
                ...objContext.props.ElementJson,
                ["vElementJson"]: {
                    ...objContext.props.ElementJson["vElementJson"],
                    ["Values"]: [...arrValues.map(objTempValue => {
                        return {
                            ...objTempValue,
                            ["vText"]: ""
                        };
                    })]
                }
            };
        }
        return objElementJson;
    }

    /**
     * @name IsNumericOrDoubleValue
     * @param {string} value value to be checked
     * @param {string} strOperationType ADD-Save, Typing-Editing the input
     * @summary Checks if a value is numerical or decimal point value.
     * @returns {boolean} true/false
     */
    IsNumericOrDoubleValue(value, strOperationType) {
        let regex;
        switch (strOperationType.toUpperCase()) {
            case "TYPING":
                regex = /^[0-9]+(\.[0-9]*)?$/;
                break;
            case "ADD":
                regex = /^[0-9]+(\.[0-9]+)?$/;
                break;
        }
        if (regex.test(value)) {
            return true;
        }
        return false;
    }

    /**
     * @name UpdateInputValueToState
     * @param {object} objContext {state, props, dispatch, CMSMultiInput_TestApplication_ModuleProcessor}
     * @param {string} strValue value given by user
     * @param {object} objValue multi input value
     * @sumamry Updates the state to new value.
     */
    UpdateInputValueToState(objContext, strValue, objValue) {
        let arrValues = objContext.state.ElementJson["vElementJson"]["Values"].map(objTempValue => {
            if (objTempValue["iElementMultiInputValueId"] === objValue["iElementMultiInputValueId"]) {
                return {
                    ...objTempValue,
                    ["vText"]: strValue
                };
            }
            else {
                return {
                    ...objTempValue
                };
            }
        });
        let objNewElementJson = {
            ...objContext.state.ElementJson,
            ["vElementJson"]: {
                ...objContext.state.ElementJson["vElementJson"],
                ["Values"]: [...arrValues]
            }
        };
        objContext.IsInputChanged.current = true;
        objContext.PointerDataRef.current = 0;
        objContext.dispatch({
            type: "SET_STATE",
            payload: {
                "ElementJson": objNewElementJson,
                // "ViewComparison": false,
                // "ViewSolution": false,
                // "LoadUserResponse": false,
                // "ElementJsonWithAnswer": null,
                // "UserAnswerJson": null,
                // "ElementStatus": null
            }
        });
    }

    /**
     * @name OnInputChange
     * @param {object} objContext {state, props, dispatch, CMSMultiInput_TestApplication_ModuleProcessor}
     * @param {string} strValue value given by user
     * @param {object} objValue multi input value
     * @summary Saves the typed text to the state property.
     */
    OnInputChange(objContext, strValue, objValue) {
        if (objContext.state.ElementJson["vElementJson"]["cIsNumber"] === "Y") {
            if (strValue === "-" || strValue === "" || !isNaN(Number(strValue))) {
                strValue.replace(" ", "");
                objContext.CMSMultiInput_TestApplication_ModuleProcessor.UpdateInputValueToState(objContext, strValue, objValue);
            }
        }
        else {
            objContext.CMSMultiInput_TestApplication_ModuleProcessor.UpdateInputValueToState(objContext, strValue, objValue);
        }
    }

    /**
     * @name VerifyResponse
     * @param {object} objContext {state, props, dispatch, CMSMultiInput_TestApplication_ModuleProcessor}
     * @param {string} strText input value
     * @summary Verifieas user response
     * @returns {boolean} Correct/Incorrect response.
     */
    VerifyResponse(objContext, strText) {
        let blnIsCorrectResponse = false;
        if (objContext.state.ViewComparison) {
            if (objContext.IsInputChanged.current) {
                objContext.ValuesDataRef.current = objContext.state.ElementJsonWithAnswer["vElementJson"]["Values"];
                objContext.IsInputChanged.current = false;
            }
            let objItem;
            if (objContext.state.ElementJsonWithAnswer["vElementJson"]["cIsNumber"].toLowerCase() === "y") {
                let numUserResponse = Number(strText);
                objContext.ValuesDataRef.current.map(objTempData => {
                    let numTolerance = 0;
                    let numAnswer = Number(objTempData["vText"]);
                    if (objTempData["dTolerance"] && objTempData["dTolerance"] !== null) {
                        numTolerance = Number(objTempData["dTolerance"]);
                    }
                    let numRangeStart = numAnswer - numTolerance;
                    let numRangeEnd = numAnswer + numTolerance;
                    if (numUserResponse >= numRangeStart && numUserResponse <= numRangeEnd) {
                        blnIsCorrectResponse = true;
                        objItem = { ...objTempData };
                    }
                });
            }
            else {
                if (objContext.state.ElementJsonWithAnswer["vElementJson"]["cIsCaseSensitive"].toLowerCase() === "n") {
                    strText = strText.toLowerCase();
                    objContext.ValuesDataRef.current.map(objTempData => {
                        if (strText === objTempData["vText"].toLowerCase()) {
                            blnIsCorrectResponse = true;
                            objItem = { ...objTempData };
                        }
                    });
                }
                else {
                    objContext.ValuesDataRef.current.map(objTempData => {
                        if (strText === objTempData["vText"]) {
                            blnIsCorrectResponse = true;
                            objItem = { ...objTempData };
                        }
                    });
                }
            }
            if (blnIsCorrectResponse) {
                objContext.ValuesDataRef.current = objContext.ValuesDataRef.current.filter(objTempValue => objTempValue["iElementMultiInputValueId"] !== objItem["iElementMultiInputValueId"]);
            }
        }
        return blnIsCorrectResponse;
    }

    /**
     * @name ResetAnswer
     * @param {object} objContext {state, props, dispatch, CMSMultiInput_TestApplication_ModuleProcessor}
     * @summary Resets the user response.
     */
    ResetAnswer(objContext) {
        objContext.CMSMultiInput_TestApplication_ModuleProcessor.ResetAnswerForTextElements(objContext);
        objContext.ValuesDataRef.current = [];
        objContext.AvailableValuesDataRef.current = [];
        objContext.PointerDataRef.current = 0;
        objContext.dispatch({
            "type": "SET_STATE",
            "payload": {
                "ElementJson": {
                    ...objContext.state.ElementJson,
                    ["vElementJson"]: {
                        ...objContext.state.ElementJson["vElementJson"],
                        ["Values"]: [...objContext.state.ElementJson["vElementJson"]["Values"].map(objTempValue => {
                            return {
                                ...objTempValue,
                                ["vText"]: ""
                            };
                        })]
                    }
                },
                "arrMultiInputAnswered": [],
                "ViewSolution": false,
                "ViewComparison": false,
                "LoadUserResponse": false,
                "ElementJsonWithAnswer": null,
                "UserAnswerJson": null,
                "ElementStatus": null
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
            props.JConfiguration.EditorSkinPath + "/Css/Application/ReactJs/PC/Modules/6_CMSElement/CMSMultiInput/CMSMultiInputStyles.css"
        ];
    }
}

export default CMSMultiInput_TestApplication_ModuleProcessor;
