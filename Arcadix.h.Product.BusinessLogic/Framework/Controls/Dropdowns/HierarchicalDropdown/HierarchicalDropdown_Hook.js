// React related impoprts.
import { useEffect } from 'react';

//Base classes.
import { GetUniqueId } from "@root/Framework/Services/UniqueId/UniqueId";

/**
* @name GetInitialState
* @summary Initializes the state
* @returns {object} initial state object
*/
export function GetInitialState(props) {
    return {
        strClassTrigger: "dropdown-list",
        strClassActive: "dropdown-trigger",
        blnShowOption: false,
        strOptionName: "",
        objDisplaySelectedItem: {},
        strDropDownUID: GetUniqueId(),
        isLoadComplete: false
    };
}

/**
* @name Initialize
* @param {object} objContext Passes Context Object
* @summary Initialize the custom hooks
*/
export function Initialize(objContext) {
    useDataLoaded(objContext);
}

/**
* @name useDataLoaded
* @param {object} objContext Context object
* @summary use effect to set the Initial data of Hierarchical Dropdown
*/
export function useDataLoaded(objContext) {    
    var objPreSelectedValue = {};
    let strPreselectedValue = "";
    var arrData = [];
    useEffect(() => {
        //To set the Data with default value in the state.
        if (objContext.props.Data.HierarchicalDropdownData) {           
            if (objContext.props.Meta.ShowDefaultOption)    //props if need to add any default option
            {
                let objDefaultOption = objContext.HierarchicalDropdown_ComponentProcessor.GetDefaultOption(objContext);
                arrData = [objDefaultOption, ...objContext.props.Data.HierarchicalDropdownData]; 
            }
            else {
                arrData = objContext.props.Data.HierarchicalDropdownData;
            }
        }
        objContext.dispatch({ type: "SET_STATE", payload: { "arrData": arrData } });
        //To set the preselected value in the state only once.
        if (!objContext.state.isLoadComplete) {
            switch (objContext.props.Meta.IsLanguageDependent) {
                case "Y":
                    let arrLanguageDependentTableData = objContext.HierarchicalDropdown_ComponentProcessor.GetDependentTableData(objContext, true, {}, arrData);
                    strPreselectedValue = arrLanguageDependentTableData[0];
                    objPreSelectedValue = arrLanguageDependentTableData[1];
                    break;
                default:
                    let arrLanguageData = objContext.HierarchicalDropdown_ComponentProcessor.GetTableData(objContext, true, {}, arrData);
                    strPreselectedValue = arrLanguageData[0];
                    objPreSelectedValue = arrLanguageData[1];
                    break;
            }
            objContext.dispatch({
                type: "SET_STATE", payload: {
                    "isLoadComplete": true, "strOptionName": strPreselectedValue, "objDisplaySelectedItem": objPreSelectedValue,
                    "arrData": arrData
                }
            });
        }       
    }, [objContext.props.Data.HierarchicalDropdownData]);
}