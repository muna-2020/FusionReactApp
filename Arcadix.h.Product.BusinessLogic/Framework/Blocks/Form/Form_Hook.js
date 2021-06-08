// React related impoprts.
import { useEffect, useImperativeHandle } from 'react';

//Helper Files.
import * as FieldValidator from "@root/Framework/Services/Validator/Validator";

/**
* @name GetInitialState
* @param {props}
* @summary Initializes the objContext.state.
* @returns {object} initial objContext.state. object
*/
export function GetInitialState(props) {
    return {
        objData: props.Data.FormData, //Form Data to be displayed
        objValidationMessages: {}, //Object that holds the Validation details.
        strValidationMessage: "", //variable to hold the Validation message for the selected fields(focused field).
        strConfirmPassword: "", //variable to hold the Validation message for the ConfirmPassword field(when the password and confirmed password are not matching).
        blnIsPasswordMatching: true, //set to false when password and confirmed password are not matching.
        blnIsPasswordChanged: props.Meta.HeaderData && props.Meta.HeaderData.filter(objHeader => objHeader["vColumnName"] == "vPassword").length > 0 ? false : true, //set to true when the user started editing the password. However if password field is not there then set it to true
        blnGetSaveDataCalled: false,  //set to true when the user invoked the GetSaveData method once.
        arrRefIndex: []
    }
}

/**
* @name Initialize
* @summary Initialize the custom hooks
*/
export function Initialize(passwordRef) {
    useEmptyPassWordField(passwordRef);
}


/**
* @name useEmptyPassWordField
* @summary To set the Data in the local objContext.state.
*/
export function useEmptyPassWordField(passwordRef) {
    useEffect(() => {
        passwordRef.current ? passwordRef.current.value = "" : () => { };
        //document.getElementById("ConfirmPassword") ? document.getElementById("ConfirmPassword").value = "" : () => { };
    }, []);
}

/**
* @name useImperativeHandleMethods.
* @param {any} objContext
* @param {any} ref
* @summary To form public methods to be used by the module.
*/
export function useImperativeHandleMethods(objContext, ref, passwordRef, invalidFieldsRefs) {
    useImperativeHandle(ref, () => ({
        /**
        * @name IsValid
        * @summary Return true or false based on the Form is valid or not
        * @returns  {boolean}
        */
        IsValid() {
            let strImagePath = objContext.props.Resource.SkinPath + "/Images/Common/Icons/exclamation_mark.svg";
            var objValidationMessages = FieldValidator.ValidateClientSide(objContext.props.Meta.HeaderData, objContext.props.Resource.Text, objContext.state.objData, "", true, objContext.props.Data.ValidationDivName, strImagePath);
            objContext.dispatch({ type: 'SET_STATE', payload: { objValidationMessages: objValidationMessages } });
            var blnIsValid = objValidationMessages ? false : true;
            if (blnIsValid && objContext.state.blnIsPasswordMatching) {
                //if (document.getElementById("ConfirmPassword")) //when password field is not there in the form
                //    document.getElementById("ConfirmPassword").value = "";

                if (passwordRef.current) //when password field is not there in the form
                    passwordRef.current.value = "";
            }

            return {
                blnIsValid: blnIsValid && objContext.state.blnIsPasswordMatching,
                blnIsPasswordMatching: objContext.state.blnIsPasswordMatching,
                strImagePath: strImagePath
            };
        },

        /**
         * @name GetSaveData
         * @summary Returns the Form Data
         * @returns {object}
         */
        GetSaveData() {
            return objContext.state.blnIsPasswordChanged ? objContext.state.objData : { ...objContext.state.objData, "vPassword": "" };
        },

        /**
         * @name SetInvalidFields
         * @param {*} arrInvalidFields 
         * @summary Takes array of columnName to set those as invalid(Css) and focuses the first column
         */
        SetInvalidFields(arrInvalidFields) {
            var objValidationMessagesFromModule = {};
            arrInvalidFields.map(strInvalidField => {
                objValidationMessagesFromModule = { ...objValidationMessagesFromModule, [strInvalidField]: GetValidationMessage(strInvalidField) };
                //document.getElementById(strInvalidField).classList.add("error-field");
                let intRefIndex = null;
                state.arrRefIndex.map((objRefIndex, index) => {
                    if (objRefIndex["index"] == strInvalidField)
                        intRefIndex = index;
                })
                invalidFieldsRefs.current[intRefIndex].classList.add("error-field");
            });
            objContext.dispatch({ type: 'SET_STATE', payload: { objValidationMessages: objValidationMessagesFromModule } });
            var Element = document.getElementById(arrInvalidFields[0]);
            Element ? Element.focus() : () => { };
            let strImagePath = objContext.props.Resource.SkinPath + "/Images/Common/Icons/exclamation_mark.svg";
            FieldValidator.ValidateFocus(objContext.props.Data.ValidationDivName, objValidationMessagesFromModule, arrInvalidFields[0], strImagePath)
        }

    }), [objContext.state, passwordRef, invalidFieldsRefs, objContext.state.arrRefIndex]);
}