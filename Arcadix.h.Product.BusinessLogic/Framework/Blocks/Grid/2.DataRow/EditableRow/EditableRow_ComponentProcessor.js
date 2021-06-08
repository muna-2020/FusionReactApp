//Base classes.
import Base_ModuleProcessor from '@shared/Framework/BaseClass/Base_ModuleProcessor';

//Helper Files.
import * as FieldValidator from "@root/Framework/Services/Validator/Validator";

/**
* @name Row_ComponentProcessor
* @summary Class for Row.
*/
class Row_ComponentProcessor extends Base_ModuleProcessor {

    /**
    * @name OnCancelEdit
    * @param {*} event
    * @summary to cancel the edit action....... make the blnEditMode to false
    */
    OnCancelEdit(objContext){
        objContext.dispatch({ type: 'SET_STATE', payload: { blnEditMode: false } });
        objContext.props.Events.OnClickRow("Cancel");
    }

    /**
     * @name OnEditClickRow
     * @param {*} event
     * @summary To set the blnEditMode to true, when edit action is invoked Only if Grid is in Non Edit Mode
     */
    OnEditClickRow(objContext){
        //To check if Grid is in Non Edit Mode
        if (!objContext.props.CallBacks.CheckEditMode()) {
            //objEditRowDetails has two details 
            //1.blnAllowEdit => to make the row to edit mode(input) or not.
            //2.ButtonKeys => array of button keys to select the RowAction Action Buttons from  objContext.props.RowActionButtons
            let objEditRowDetails = objContext.props.ParentProps.CallBacks.OnBeforeEditRow(objContext.props.Data.RowData);
            objContext.dispatch({
                type: 'SET_STATE', payload: {
                    blnEditMode: true, objEditRowData: objContext.props.Data.RowData, blnAllowEdit: objEditRowDetails["AllowEdit"],
                    arrRowActionButtonsKeys: objEditRowDetails["ButtonKeys"]
                }
            });
            objContext.props.Events.OnClickRow("Edit", objContext.props.Data.RowData);
        }
    }

    /**
    * @name OnSaveClickRow
    * @param {*} objEditRowData 
    * @summary Check for the Validation
    * If Validation passes, Calls the OnSaveClickRow from the Module
    */
    OnSaveClickRow(objContext) {
        let objEditRowData = objContext.state.objEditRowData;
        let strImagePath = objContext.props.Resource.SkinPath + "/Images/Common/Icons/exclamation_mark.svg";
        let arrHeader = objContext.props.Meta.HeaderData.filter(objHeader => objHeader["vControlType"].toLowerCase() != "dropdown" && objHeader["vControlType"].toLowerCase() != "image");
        var objValidationMessages = FieldValidator.ValidateClientSide(arrHeader, objContext.props.Resource.Text, objContext.state.objEditRowData, "", true, "Div_ValidationMessage", strImagePath);
        var blnValid = !objValidationMessages;
        if (!blnValid) {
            objContext.dispatch({ type: 'SET_STATE', payload: { objValidationMessages: objValidationMessages, blnSaveActionInvoked : true } });
        }
        else {
            //objContext.dispatch({ type: 'SET_STATE', payload: { blnEditMode: false } });
            objContext.props.Events.OnClickRow("Save", objEditRowData);
        }
    }

    /**
     * @name OnSelectRow
     * @param {any} objSelectedRowData
     * @summary To select the Row
     */
    OnSelectRow(objContext) {
        let objSelectedRowData = objContext.props.Data.RowData;
        if (!objContext.props.CallBacks.CheckEditMode()) {
            objContext.props.Events.OnClickRow("Select", objSelectedRowData);
        }
    }

    /**
    * @name OnBlurValidate
    * @summary Calls the Validation Method on Blur Click and Sets the objValidationMessages local objContext.state
    */
    OnBlurValidate(objContext) {
        var objNewValidationMessages;
        if (objContext.state.blnSaveActionInvoked) {
            objNewValidationMessages = FieldValidator.ValidateClientSide(objContext.props.Meta.HeaderData, objContext.props.Resource.Text, objContext.state.objEditRowData);
            objContext.dispatch({ type: 'SET_STATE', payload: { objValidationMessages: objNewValidationMessages } });
        }     
        return objNewValidationMessages;
    }

    /**
    * @name OnFocusValidate
    * @param {*} strColumnName 
    * @summary Calls the ValidateFocus on Focus Click to show the Validation message for that column
    */
    OnFocusValidate(strColumnName, objContext){
        let strImagePath = objContext.props.Resource.SkinPath + "/Images/Common/Icons/exclamation_mark.svg";
        FieldValidator.ValidateFocus("Div_ValidationMessage", objContext.state.objValidationMessages, strColumnName, strImagePath);
    }

    /**
     * @name OnEditRowChange
     * @param {any} strVlaue
     * @param {any} strKey
     * @summary gets the objects key from the html attribute and updates the row object
     */
    OnEditRowChange(strVlaue, strKey, objContext){
        var objEditedData = { ...objContext.state.objEditRowData, [strKey]: strVlaue };
        objContext.dispatch({ type: 'SET_STATE', payload: { objEditRowData: objEditedData } });
        let objNewValidationMessages;
        if (objContext.state.blnSaveActionInvoked) {
            objNewValidationMessages = FieldValidator.ValidateClientSide(objContext.props.Meta.HeaderData, objContext.props.Resource.Text, objEditedData, strKey);
            objContext.dispatch({ type: 'SET_STATE', payload: { objValidationMessages: objNewValidationMessages } });
        }
        let strImagePath = objContext.props.Resource.SkinPath + "/Images/Common/Icons/exclamation_mark.svg";
        FieldValidator.ValidateFocus("Div_ValidationMessage", objNewValidationMessages, strKey, strImagePath);
    }

    /**
     * @name GetMultiColumnData
     * @param {*} objData 
     * @param {*} strColumnName 
     * @summary Forms the Text from the DataTableField based on the Column name
     * @returns {string}
     */
    GetMultiColumnData(objData, strColumnName){
        var arrColumnNames = strColumnName.split(',');
        var strReturnText;
        if (arrColumnNames.length == 2) {
            strReturnText = objData[arrColumnNames[0]] + " " + objData[arrColumnNames[1]];
        }
        else {
            strReturnText = objData[strColumnName];
        }
        return strReturnText;
    }

    /**
     * @name OnDropDownValueChange
     * @param {*} objChangeData 
     * @param {*} props 
     * @summary  To change the row object on change of the dropdown value
     */
    OnDropDownValueChange(objChangeData, objDropDownProps, objContext){
        console.log(objChangeData)
        var strCellName = objDropDownProps["Id"];
        var objEditData = JSON.parse(JSON.stringify(objContext.state.objEditRowData));
        if (strCellName.split('.').length === 2) {
            var strTableName, strColumnNmae;
            strTableName = strCellName.split('.')[0];
            strColumnNmae = strCellName.split('.')[1];
            objEditData[strTableName][0][strColumnNmae] = objChangeData[strColumnNmae];
        }
        else {
            objEditData[strCellName] = objChangeData[strCellName];
        }
        objContext.dispatch({ type: 'SET_STATE', payload: { objEditRowData: objEditData } });
    }

    /**
     * @name GetWatermark
     * @param {*} objHeader 
     * @summary Forms the WaterMark for the Input Field
     * @returns {string}
     */
    GetWatermark(objHeader, objContext){
        var strWaterMark = "";
        if (objHeader["vValidationType"] === "date") {
            strWaterMark = "tt.mm.jjjj"//JConfiguration["Locale"]["DateFormatText"];
        }
        else {
            strWaterMark = objContext.props.Resource.Text[objHeader.vTextResourceKey];
        }
        return strWaterMark;
    }
}

export default Row_ComponentProcessor;