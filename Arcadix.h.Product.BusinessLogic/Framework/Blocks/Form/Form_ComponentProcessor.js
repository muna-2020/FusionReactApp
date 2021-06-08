//Base classes.
import Base_ModuleProcessor from '@shared/Framework/BaseClass/Base_ModuleProcessor';

//Helper Files.
import * as FieldValidator from "@root/Framework/Services/Validator/Validator";

/**
* @name Form_ComponentProcessor.
* @summary Class for Form.
*/
class Form_ComponentProcessor extends Base_ModuleProcessor {

    /**
    * @name OnBlurValidate
    * @param {any} objContext
    * @summary Calls the Validation Method on Blur Click and Sets the objValidationMessages local state
    */
    OnBlurValidate(objContext) {
        var objNewValidationMessages = FieldValidator.ValidateClientSide(objContext.props.Meta.HeaderData, objContext.props.Resource.Text, objContext.state.objData);
        objContext.dispatch({ type: 'SET_STATE', payload: { objValidationMessages: objNewValidationMessages } });
    }

    /**
     * @name HandleChange
     * @param {*} strValue 
     * @param {*} strColumnNmae 
     * @param {any} objContext
     * @summary To change values of the form data while the input fields are changed
     */
    HandleChange(strValue, strColumnNmae, objContext) {
        let objData = { ...objContext.state.objData, [strColumnNmae]: strValue }
        objContext.dispatch({ type: 'SET_STATE', payload: { objData: objData } });
        if (strColumnNmae.toLowerCase() == "vpassword") {
            objContext.dispatch({ type: 'SET_STATE', payload: { blnIsPasswordChanged: true } });
        }
    }

    /**
    * @name ShowValidationMessageOnFocus
    * @param {*} strColumnName 
    * @param {any} objContext
    * @summary Calls the ValidateFocus on Focus Click to show the Validation message for that column
    */
    ShowValidationMessageOnFocus(strColumnName, objContext) {
        let strImagePath = objContext.props.Resource.SkinPath + "/Images/Common/Icons/exclamation_mark.svg";
        let strValidationDivName = strColumnName == "vPassword" ? objContext.props.Meta.ValidationDivName + "_Password" : objContext.props.Meta.ValidationDivName;
        FieldValidator.ValidateFocus(strValidationDivName, objContext.state.objValidationMessages, strColumnName, strImagePath);
    }

    /**
     * @name PasswordCheck
     * @param {*} strPassword 
     * @param {*} strConfirmPassword 
     * @param {any} objContext
     * @summary Compares strPassword and strConfirmPassword, sets blnIsPasswordMatching and objValidationMessages accordingly
     */
    PasswordCheck(strPassword, strConfirmPassword, objContext) {
        if (strPassword !== strConfirmPassword) {
            objContext.dispatch({ type: 'SET_STATE', payload: { blnIsPasswordMatching: false } });
            //objContext.dispatch({ type: 'SET_STATE', payload: { objValidationMessages: { ...objContext.state.objValidationMessages, "vPassword": objContext.props.Resource.Text["PasswordValidationMessage"] } } });
        }
        else {
            var objValidationMessages = JSON.parse(JSON.stringify(objContext.state.objValidationMessages));
            if (objValidationMessages && objValidationMessages.vPassword)
                delete objValidationMessages.vPassword;
            objContext.dispatch({ type: 'SET_STATE', payload: { objValidationMessages: objValidationMessages } });
            objContext.dispatch({ type: 'SET_STATE', payload: { blnIsPasswordMatching: true } });
        }
    }

    /**
     * @name DropDownChange
     * @param {*} objChangeData 
     * @param {*} objDropDownProps
     * @param {any} objContext
     * @summary  To change the form Data on change of the dropdown value
     */
    DropDownChange(objChangeData, objDropDownProps, objContext) {
        var strCellName = objDropDownProps.Meta["ValueColumn"];
        //var objEditData = JSON.parse(JSON.stringify(objContext.state.objData));
      //  objEditData[strCellName] = objChangeData[strCellName];

        //above code was giving circular error , Stringify was giving the error, so wrote below code.

      var objEditData = { ...objContext.state.objData, [strCellName]: objChangeData[strCellName] }
      
        objContext.dispatch({ type: 'SET_STATE', payload: { objData: objEditData } });
    }

    /**
     * @name GetLabelData
     * @param {any} strColumnName
     * @param {any} objContext
     * @summary gets the label data from the corresponding tables
     * @returns {string}
     */
    GetLabelData(strColumnName, objContext) {
        var arrLabelData = [], objLabelData;
        var IsLanguageDependent = "";
        var strDisplayColumn = "", strValueColumn = "", strDependingTableName = "", strLabelData = "";
        if ((typeof objContext.props.Data.LabelData[strColumnName]).toLowerCase() === "object") {
            objLabelData = objContext.props.Data.LabelData[strColumnName];
            arrLabelData = objLabelData["Data"];
            IsLanguageDependent = objLabelData["cISLanguageDependent"];
            strDisplayColumn = objLabelData["DisplayColumn"];
            strValueColumn = objLabelData["ValueColumn"];
            strDependingTableName = objLabelData["DependingTableName"];
            if (IsLanguageDependent === "Y") {
                var strLanguageKeyName = "iLanguageId";
                var strLanguageKeyValue = objContext.props.ParentProps.JConfiguration["InterfaceLanguageId"];
                arrLabelData[strDependingTableName].map(item => {
                    if (item[strLanguageKeyName].toString() === strLanguageKeyValue) {
                        strLabelData = item[strDisplayColumn];
                    }
                })
            }
            else if (IsLanguageDependent === "N") {

            }
        }
        else {
            strLabelData = objContext.props.Data.LabelData[strColumnName];
        }

        return strLabelData;
    }
}

export default Form_ComponentProcessor;