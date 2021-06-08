//Base classes.
import Base_ModuleProcessor from '@shared/Framework/BaseClass/Base_ModuleProcessor';

/**
* @name HierachicalDropdown_ComponentProcessor
* @summary Class for HierachicalDropdown_ComponentProcessor
*/
class HierachicalDropdown_ComponentProcessor extends Base_ModuleProcessor {

    /**
      * @name GetDefaultOption
      * @param {object} objContext Context Object
      * @summary Returns a default "Please Select" option for the dropdown
      * @returns {object} objDefaultOption
      */
    GetDefaultOption(objContext) {
        let objDefaultOption = {};
        let objTempDefaultOption = {};
        let arrDisplayColumn = objContext.props.Meta.DisplayColumn.split(",");
        let intCount = 0;
        arrDisplayColumn.map(strTempDisplayColumnName => {
            if (intCount == 0) {
                objTempDefaultOption = {
                    [strTempDisplayColumnName]: objContext.props.Meta.DefaultOptionTextKey ? objContext.props.Meta.DefaultOptionTextKey: objContext.props.Resource.Text 
                };
            }
            else {
                objTempDefaultOption = { ...objTempDefaultOption, [strTempDisplayColumnName]: "" };
            }
            intCount++;
        });
        if (objContext.props.Meta.DependingTableName && objContext.props.Meta.IsLanguageDependent == "Y") {
            objDefaultOption = {
                ...objContext.props.Data.HierarchicalDropdownData[0],
                [objContext.props.Meta.ValueColumn]: objContext.props.Meta.DefaultOptionValue,
                [objContext.props.Meta.DependingTableName]: [{ ...objTempDefaultOption, ["iLanguageId"]: parseInt(objContext.props.ParentProps.JConfiguration.InterfaceLanguageId) }]
            };
        }
        else if (objContext.props.Meta.DependingTableName && objContext.props.Meta.IsLanguageDependent == "N") {
            objDefaultOption = {
                ...objContext.props.Data.HierarchicalDropdownData[0],
                [objContext.props.Meta.ValueColumn]: objContext.props.Meta.DefaultOptionValue,
                [objContext.props.Meta.DependingTableName]: [objTempDefaultOption]
            };
        }
        else {
            objDefaultOption = {
                ...objContext.props.Data.HierarchicalDropdownData[0],
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
    * @summary This function will return only array where 0th index holds the selected option text and 1st index holds the object which is language dependent
    * @returns {array} Array of string and preselected object
    */
    GetDependentTableData(objContext, blnIsPreSelected, objSelectedItem, arrData) {
        let SelectedValue = objContext.props.Data.SelectedValue;
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
                if (objDropDownData[strValueColumn] == SelectedValue) {
                    objDropDownData[strDependingTableName].map(objItem => {
                        if (objItem[strLanguageKeyName] == strLanguageKeyValue) {
                            arrDisplayColumn.map(strTempColumnName => {
                                strDisplayData += objItem[strTempColumnName] == null ? "" : objItem[strTempColumnName] + " ";
                            });
                            objPreSelectedItem = objDropDownData;
                        }
                    });
                }
            });
        }
        else //it will be executed when the item in the list is clicked and to print the dropdown list
        {
            objSelectedItem[strDependingTableName].map(objItem => {
                if (objItem[strLanguageKeyName] == strLanguageKeyValue) {
                    arrDisplayColumn.map(strTempColumnName => {
                        strDisplayData += objItem[strTempColumnName] == null ? "" : objItem[strTempColumnName] + " ";
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
    * @param {String} SelectedValue Selected Value
    * @summary This function will return only array where 0th index holds the selected option text and 1st index holds the object these are not language dependent
    * @returns {array} Array of
    */
    GetTableData(objContext, blnIsPreSelected, objSelectedItem, arrData) {
        let SelectedValue = objContext.props.Data.SelectedValue;
        let strDisplayData = "";
        var arrDisplayColumn = objContext.props.Meta.DisplayColumn.split(",");
        let objPreSelectedItem = {};
        if (blnIsPreSelected) //Only once it will be executed when on load to highlight the selected item
        {
            arrData.map(objDropDownData => {
                if (objDropDownData[objContext.props.Meta.ValueColumn] == SelectedValue) {
                    arrDisplayColumn.map(strTempColumnName => {
                        strDisplayData += objDropDownData[strTempColumnName] == null ? "" : objDropDownData[strTempColumnName] + " ";
                    });
                    objPreSelectedItem = objDropDownData;
                }
            });
        }
        else //it will be executed when the item in the list is clicked and to print the dropdown list
        {
            arrDisplayColumn.map(strTempColumnName => {
                strDisplayData += objSelectedItem[strTempColumnName] == null ? "" : objSelectedItem[strTempColumnName] + " ";
            });
        }
        return [strDisplayData.trim(), objPreSelectedItem];
    }

    /**
     * @name ClickHandler
     * @param {any} objContext objContext
     * @param {any} objSelectedItem objSelectedItem
     * @summary Display the column value on clicking the option and execute the callback function
     */
    ClickHandler(objContext, objSelectedItem) {
        var strDisplayData = "";
        if (objContext.props.Meta.IsLanguageDependent == "Y") {
            strDisplayData = objContext.HierarchicalDropdown_ComponentProcessor.GetDependentTableData(objContext, false, objSelectedItem, 0, objSelectedItem[objContext.props.Meta.ValueColumn])[0];
        }
        else {
            strDisplayData = objContext.HierarchicalDropdown_ComponentProcessor.GetTableData(objContext, false, objSelectedItem, 0, objSelectedItem[objContext.props.Meta.ValueColumn])[0];
        }

        objContext.dispatch({
            type: "SET_STATE", payload: {
                "blnShowOption": !objContext.state.blnShowOption,
                "objDisplaySelectedItem": objSelectedItem,
                "strOptionName": strDisplayData,
                "strClassTrigger": "dropdown-list",
                "strClassActive": "dropdown-trigger"
            }
        });
    }

    /**
     * @name OnSelectMethods
     * @param {any} objContext objContext
     * @param {any} OnSelectNode OnSelectNode
     * @summary this function is the combination of two Events
     */
    OnSelectMethods(objContext, OnSelectNode) {
        objContext.HierarchicalDropdown_ComponentProcessor.ClickHandler(objContext, OnSelectNode);
        objContext.props.Events.OnChangeEventHandler(OnSelectNode, objContext.props);
    }
}
export default HierachicalDropdown_ComponentProcessor;