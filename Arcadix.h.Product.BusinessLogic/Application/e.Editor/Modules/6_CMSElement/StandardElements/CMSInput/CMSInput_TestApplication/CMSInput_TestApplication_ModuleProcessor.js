//Base classes/hooks.
import EditorBase_ModuleProcessor from '@shared/Framework/BaseClass/EditorBaseClass/EditorBase_ModuleProcessor';

/**
 * @name CMSInput_TestApplication_ModuleProcessor
 * @summary Contains the Input's test application version module specific methods.
 * */
class CMSInput_TestApplication_ModuleProcessor extends EditorBase_ModuleProcessor {

    /**
     * @name GetElementJsonForComponent
     * @param {object} objContext {state, props, dispatch, CMSInput_TestApplication_ModuleProcessor}
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
        let objElementJson = {
            ...objContext.props.ElementJson,
            ["vElementJson"]: {
                ...objContext.props.ElementJson["vElementJson"],
                ["Values"]: []
            }
        };
        return objElementJson;
    }

    /**
     * @name IsNumericOrDoubleValue
     * @param {string} value value to be checked
     * @param {string} strOperationType ADD-Save, Typing->Editing the input
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
     * @name ChangeInput
     * @param {object} objContext {state, props, dispatch, CMSInput_TestApplication_ModuleProcessor}
     * @param {string} strValue value given by user
     * @summary Sets the state with the new input value.
     */
    ChangeInput(objContext, strValue) {
        objContext.dispatch({
            type: "SET_STATE",
            payload: {
                "InputValue": strValue,
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
     * @param {object} objContext {state, props, dispatch, CMSInput_TestApplication_ModuleProcessor}
     * @param {string} strValue value given by user
     * @summary Saves the typed text to the state property.
     */
    OnInputChange(objContext, strValue) {
        if (objContext.state.blnIsTextOnlyBox) {
            if (objContext.state.ElementJson["vElementJson"]["cIsNumber"] === "Y") {
                if (strValue === "-" || strValue === "" || !isNaN(Number(strValue))) {
                    strValue = strValue.replace(" ", "");
                    objContext.CMSInput_TestApplication_ModuleProcessor.ChangeInput(objContext, strValue);
                }
            }
            else {
                objContext.CMSInput_TestApplication_ModuleProcessor.ChangeInput(objContext, strValue);
            }
        }
        else if (objContext.state.blnIsWordOnlyBox) {
            if (strValue === "" || !objContext.CMSInput_TestApplication_ModuleProcessor.IsNumericOrDoubleValue(strValue, "TYPING")) {
                objContext.CMSInput_TestApplication_ModuleProcessor.ChangeInput(objContext, strValue);
            }
        }
        else if (objContext.state.blnIsNumberOnlyBox) {
            if (strValue === "-" || strValue === "" || !isNaN(Number(strValue))) {
                strValue = strValue.replace(" ", "");
                objContext.CMSInput_TestApplication_ModuleProcessor.ChangeInput(objContext, strValue);
            }
        }
        else if (objContext.state.blnIsLetterOnlyBox && (strValue === "" || strValue.length === 1)) {
            objContext.CMSInput_TestApplication_ModuleProcessor.ChangeInput(objContext, strValue);
        }
        else if ((strValue.length === 1 || strValue.length === 0) && (strValue === "" || strValue === "." || strValue === "," || strValue === ";")) {
            objContext.CMSInput_TestApplication_ModuleProcessor.ChangeInput(objContext, strValue);
        }
    }

    /**
     * @name ResetAnswer
     * @param {object} objContext {state, props, dispatch, CMSInput_TestApplication_ModuleProcessor}
     * @summary Resets the user response.
     */
    ResetAnswer(objContext) {
        objContext.dispatch({
            "type": "SET_STATE",
            "payload": {
                "InputValue": "",
                "ViewComparison": false,
                "ViewSolution": false,
                "LoadUserResponse": false,
                "ElementJsonWithAnswer": null,
                "UserAnswerJson": null,
                "ElementStatus": null
            }
        });
    }
}

export default CMSInput_TestApplication_ModuleProcessor;
