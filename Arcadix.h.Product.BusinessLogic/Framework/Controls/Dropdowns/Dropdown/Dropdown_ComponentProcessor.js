//Base classes.
import Base_ModuleProcessor from '@shared/Framework/BaseClass/Base_ModuleProcessor';

/**
* @name Dropdown_ComponentProcessor
* @summary Class for Dropdown.
*/
class Dropdown_ComponentProcessor extends Base_ModuleProcessor {

    /**
    * @name GetDefaultOption
    * @param {object} objContext Context Object
    * @summary Returns an object that contains the default text option (generally "please Select") for the dropdown
    * @returns {object} DefaultOption
    */
    GetDefaultOption(objContext) {
        let objDefaultOption = {};
        let objTempDefaultOption = {};
        let arrDisplayColumn = objContext.props.Meta.DisplayColumn.split(",");
        let intCount = 0;

        arrDisplayColumn.map(strTempDisplayColumnName => {
            if (intCount === 0) {
                objTempDefaultOption = {
                    [strTempDisplayColumnName]: objContext.props.Meta.DefaultOptionTextKey ? objContext.props.Resource.Text[objContext.props.Meta.DefaultOptionTextKey] : objContext.props.Resource.Text.DefaultOptionText
                };
            }
            else {
                objTempDefaultOption = { ...objTempDefaultOption, [strTempDisplayColumnName]: "" };
            }
            intCount++;
        });

        if (objContext.props.Meta.DependingTableName && objContext.props.Meta.IsLanguageDependent === "Y") {
            objDefaultOption = {
                ...objContext.props.Data.DropdownData[0],
                [objContext.props.Meta.ValueColumn]: objContext.props.Meta.DefaultOptionValue,
                [objContext.props.Meta.DependingTableName]: [{ ...objTempDefaultOption, ["iLanguageId"]: parseInt(objContext.props.ParentProps.JConfiguration.InterfaceLanguageId) }]
            };
        }
        else if (objContext.props.Meta.DependingTableName && objContext.props.Meta.IsLanguageDependent === "N") {
            objDefaultOption = {
                ...objContext.props.Data.DropdownData[0],
                [objContext.props.Meta.ValueColumn]: objContext.props.Meta.DefaultOptionValue,
                [objContext.props.Meta.DependingTableName]: [objTempDefaultOption]
            };
        }
        else {
            objDefaultOption = {
                ...objContext.props.Data.DropdownData[0],
                ...objTempDefaultOption,
                [objContext.props.Meta.ValueColumn]: objContext.props.Meta.DefaultOptionValue
            };
        }
        return objDefaultOption;
    }

    /**
    * @name GetDependentTableData
    * @param {object} objContext Context Object
    * @param {boolean} blnIsPreSelected Is PreSelected
    * @param {object} objSelectedItem Selected Item
    * @param {Array} arrData Data
    * @param {String} strSelectedValue Selected Value
    * @summary this function while return only array where 0th index holds the selected option text and 1st index holds the object which is language dependent
    * @returns {array} Array of Dependent Table Data
    */
    GetDependentTableData(objContext, blnIsPreSelected, objSelectedItem, arrData, strSelectedValue) {
        var arrDisplayColumn = objContext.props.Meta.DisplayColumn.split(",");
        var strDependingTableName = objContext.props.Meta.DependingTableName;
        var strValueColumn = objContext.props.Meta.ValueColumn;
        var strLanguageKeyName = "iLanguageId";//this.props.ForeignKeyName;
        var strLanguageKeyValue = parseInt(objContext.props.ParentProps.JConfiguration["InterfaceLanguageId"]);
        let strDisplayData = "";
        let objPreSelectedItem = {};
        if (blnIsPreSelected) //Only once it will be executed when on load to highlight the selected item
        {
            arrData.map(objDropDownData => {
                if (objDropDownData[strValueColumn] != undefined && objDropDownData[strValueColumn].toString() == strSelectedValue) {
                    objDropDownData[strDependingTableName].map(objItem => {
                        if (objItem[strLanguageKeyName] == strLanguageKeyValue) {
                            arrDisplayColumn.map(strTempColumnName => {
                                strDisplayData += objItem[strTempColumnName] === null ? "" : objItem[strTempColumnName] + " ";
                            });
                            objPreSelectedItem = objDropDownData;
                        }
                    });
                }
            });
        }
        else //it will be executed when the item in the list is clicked and to print the dropdown list
        {
            objSelectedItem && objSelectedItem[strDependingTableName].map(objItem => {
                if (objItem[strLanguageKeyName] == strLanguageKeyValue) {
                    arrDisplayColumn.map(strTempColumnName => {
                        strDisplayData += objItem[strTempColumnName] === null ? "" : objItem[strTempColumnName] + " ";
                    });
                }
            });
        }
        return [strDisplayData.trim(), objPreSelectedItem];
    }

    /**
    * @name GetTableData
    * @param {object} objContext Context Object
    * @param {boolean} blnIsPreSelected Is PreSelected
    * @param {object} objSelectedItem Selected Item
    * @param {Array} arrData Data
    * @param {String} strSelectedValue Selected Value
    * @summary this function while return only array where 0th index holds the selected option text and 1st index holds the object these are not language dependent
    * @returns {array} Array of Table Data
    */
    GetTableData(objContext, blnIsPreSelected, objSelectedItem, arrData, strSelectedValue) {
        let strDisplayData = "";
        var arrDisplayColumn = objContext.props.Meta.DisplayColumn.split(",");
        let objPreSelectedItem = {};
        if (blnIsPreSelected) //Only once it will be executed when on load to highlight the selected item
        {
            arrData.map(objDropDownData => {
                if (objDropDownData[objContext.props.Meta.ValueColumn].toString() == strSelectedValue) {
                    arrDisplayColumn.map(strTempColumnName => {
                        strDisplayData += objDropDownData[strTempColumnName] === null ? "" : objDropDownData[strTempColumnName] + " ";
                    });
                    objPreSelectedItem = objDropDownData;
                }
            });
        }
        else //it will be executed when the item in the list is clicked and to print the dropdown list
        {
            arrDisplayColumn.map(strTempColumnName => {
                strDisplayData += objSelectedItem[strTempColumnName] === null ? "" : objSelectedItem[strTempColumnName] + " ";
            });
        }
        return [strDisplayData.trim(), objPreSelectedItem];
    }

    /**
    * @name ClickHandler
    * @param {object} objContext Context Object
    * @param {object} objSelectedItem SelectedItem
    * @param {Integer} intIndex Index
    * @summary Display the column value on clicking the option and executes callbackfunction to
    */
    ClickHandler(objContext, objSelectedItem, intIndex) {
        let strDisplayData = "";
        if (objContext.props.Meta.IsLanguageDependent == "Y") {
            strDisplayData = objContext.Dropdown_ComponentProcessor.GetDependentTableData(objContext, false, objSelectedItem, [], objSelectedItem[objContext.props.Meta.ValueColumn])[0];
        }
        else {
            strDisplayData = objContext.Dropdown_ComponentProcessor.GetTableData(objContext, false, objSelectedItem, [], objSelectedItem[objContext.props.Meta.ValueColumn])[0];
        }
        if (objContext.props.Events.OnChangeEventHandler) {
            objContext.props.Events.OnChangeEventHandler(objSelectedItem, { ...objContext.props, intIndex: intIndex });
        }
        //"strOptionName" -> displaying the value in the dropdown after selecting, "objDisplaySelectedItem" -> Initial DropDown Value
        objContext.dispatch({
            type: "SET_STATE", payload: {
                "blnShowOption": !objContext.state.blnShowOption,
                "strClassTrigger": "dropdown-list",
                "strClassActive": "dropdown-trigger",
                "strOptionName": strDisplayData,
                "objDisplaySelectedItem": objSelectedItem,
                "strSelectedValue": objSelectedItem[objContext.props.Meta.ValueColumn]
            }
        });
    }

}

export default Dropdown_ComponentProcessor;