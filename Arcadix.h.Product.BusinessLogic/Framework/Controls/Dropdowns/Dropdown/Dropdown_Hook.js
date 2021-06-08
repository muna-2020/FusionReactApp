// React related imports.
import { useEffect } from 'react';

//component related files
import { GetUniqueId } from "@root/Framework/Services/UniqueId/UniqueId";
import Dropdown_ComponentProcessor from '@shared/Framework/Controls/Dropdowns/Dropdown/Dropdown_ComponentProcessor';

/**
* @name GetInitialState
* @param {object} props Passes the props
* @summary Initializes the state
* @returns {object} initial state object
*/
export function GetInitialState(props) {
        let strPreselectedValue = "";
        let objPreSelectedValue = {};
        let arrData = [];
    let objDropdown_ComponentProcessor = new Dropdown_ComponentProcessor();
        if (props.Meta.ShowDefaultOption)    //props if need to add any default option
        {
            let objDefaultOption = objDropdown_ComponentProcessor.GetDefaultOption({props});
            arrData = [objDefaultOption, ...props.Data.DropdownData];
        }
        else {
            arrData = props.Data.DropdownData;
        }
        switch (props.Meta.IsLanguageDependent) {
            case "Y":
                let arrLanguageDependentTableData = objDropdown_ComponentProcessor.GetDependentTableData({ props }, true, {}, arrData, props.Data.SelectedValue);
                strPreselectedValue = arrLanguageDependentTableData[0];
                objPreSelectedValue = arrLanguageDependentTableData[1];
                break;
            default:
                let arrLanguageData = objDropdown_ComponentProcessor.GetTableData({ props }, true, {}, arrData, props.Data.SelectedValue);
                strPreselectedValue = arrLanguageData[0];
                objPreSelectedValue = arrLanguageData[1];
                break;
        }

    return {
        arrData, //array of object to hold the data
        strSelectedValue: parseInt(props.Data.SelectedValue), //Local state to hold the selected value
        strClassTrigger: "dropdown-list", //Local state to change the class name for list when hide/show happens. 
        strClassActive: "dropdown-trigger", //Local state to change the class name for icon when hide/show happens.
        blnShowOption: false, // to toggle the list hide and show
        strOptionName: strPreselectedValue, //Local state to hold the pre selected name if any preselected value is present
        objDisplaySelectedItem: objPreSelectedValue, //Local state to hold the selected item
        strDropDownUID: GetUniqueId(), //Local state to keep on unique id for the dropdown
        isLoadComplete: true //Local state to hold true when load is complete
    };
}

/**
* @name Initialize
* @param {object} objContext Passes Context Object
* @summary Initialize the custom hooks
*/
export function Initialize(objContext) {
    useDataLoader(objContext);
}

/**
* @name useDataLoaded
* @param {object} objContext Context object
* @summary use effect to set the Initial data
*/
function useDataLoader(objContext) {    
    useEffect(() => {
        if (objContext.props.Data.DropdownData) {

            let strPreselectedValue = "";
            let objPreSelectedValue = {};
            let arrData = [];

            let objDropdown_ComponentProcessor = new Dropdown_ComponentProcessor();
            if (objContext.props.Meta.ShowDefaultOption)    //props if need to add any default option
            {
                let objDefaultOption = objDropdown_ComponentProcessor.GetDefaultOption(objContext);
                arrData = [objDefaultOption, ...objContext.props.Data.DropdownData];
            }
            else {
                arrData = objContext.props.Data.DropdownData;
            }
            switch (objContext.props.Meta.IsLanguageDependent) {
                case "Y":
                    let arrLanguageDependentTableData = objDropdown_ComponentProcessor.GetDependentTableData(objContext, true, {}, arrData, objContext.props.Data.SelectedValue);
                    strPreselectedValue = arrLanguageDependentTableData[0];
                    objPreSelectedValue = arrLanguageDependentTableData[1];
                    break;
                default:
                    let arrLanguageData = objDropdown_ComponentProcessor.GetTableData(objContext, true, {}, arrData, objContext.props.Data.SelectedValue);
                    strPreselectedValue = arrLanguageData[0];
                    objPreSelectedValue = arrLanguageData[1];
                    break;
            }
          
            objContext.dispatch({ type: "SET_STATE", payload: { "isLoadComplete": true, "strOptionName": strPreselectedValue, "objDisplaySelectedItem": objPreSelectedValue, "arrData": arrData } });

        }
    }, [objContext.props.Data.DropdownData, objContext.props.Data.SelectedValue]);
}