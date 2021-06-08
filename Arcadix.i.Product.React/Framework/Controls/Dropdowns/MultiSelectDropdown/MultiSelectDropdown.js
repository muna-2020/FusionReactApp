// React related imports.
import React, { useReducer } from 'react';

//Base classes.
import * as Base_Hook from '@shared/Framework/BaseClass/Base_Hook';
import * as MultiSelectDropdown_Hook from '@shared/Framework/Controls/Dropdowns/MultiSelectDropdown/MultiSelectDropdown_Hook';

//Inline Images import
import AngleDownImage from '@inlineimage/Framework/ReactJs/PC/Controls/Dropdowns/Dropdown/angle_down.png?inline';

/**
* @name MultiSelectDropDown
* @param {object} props props
* @summary This component displays the MultiSelectDropDown data.
* @returns {object} React.Fragement that encapsulated the MultiSelectDropDown.
*/
const MultiSelectDropDown = (props) => {
    
    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     * @returns {[]} state and dispatch
    */
    const [state, dispatch] = useReducer(Base_Hook.Reducer, MultiSelectDropdown_Hook.GetInitialState(props));

    /**
    * @name objContext
    * @summary Groups state.dispatch and module object(s) in objContext.
    * @returns {object} objContext
    */
    let objContext = { state, props, dispatch };
    
    /**
    * @name Initialize
    * @param {object} objContext context object
    * @summary Initialize method call in MultiSelectDropdown_Hook, that contains all the custom hooks.
    * @returns null
    */
    MultiSelectDropdown_Hook.Initialize(objContext);

    //image path for the dropdown
    //var strImagePath = props.Resource.ImagePath ? props.Resource.ImagePath : props.Resource.SkinPath + "/Images/Framework/ReactJs/PC/Controls/Dropdowns/MultiSelectDropdown/angle_down.png";
    let strImagePath = props.ImageMeta && props.ImageMeta.ImagePath ? props.ImageMeta.ImagePath : AngleDownImage;

    /**
     * @name ShowMenu
     * @summary Displays the Dropdown menu list
     */
    const ShowMenu = () => {
        if (state.blnShowOption === false) {
            dispatch({
                type: "SET_STATE", payload: {
                    "blnShowOption": !state.blnShowOption,
                    "strClassTrigger": "multi-dropdown-list show",
                    "strClassActive": "multi-dropdown-trigger active"
                }
            });
         } else {
            //on clicking second time on the button set the toggle value to false and hide the dropdown list
            dispatch({
                type: "SET_STATE", payload: {
                    "blnShowOption": !state.blnShowOption,
                    "strClassTrigger": "multi-dropdown-list",
                    "strClassActive": "multi-dropdown-trigger"
                }
            });
         }       
        //document.addEventListener("click", HideOption);
    };

    /**
     * @name HideOption
     * @param {*} event event
     * @summary Only on clicking outside dropdown the list will close
     */
    const HideOption = event => {
        var dropdownMenu = document.getElementById(props.Id + state.strMultiDropDownUID);
        if (dropdownMenu) {
            if (!dropdownMenu.contains(event.target)) {
                dispatch({
                    type: "SET_STATE", payload: {
                        "blnShowOption": false,
                        "strClassTrigger": "multi-dropdown-list",
                        "strClassActive": "multi-dropdown-trigger"
                    }
                });
            }
        }
        document.removeEventListener("click", HideOption);
    };

    /**
     * @name ClickHandler
     * @param {*} objSelectedItem objSelectedItem
     * @summary ClickHandler function is used to select the options from the list  
     * first it checks if the click item is present in the 'state.arrSelectedItem' if its present then  'blnRemoveItem = true;'
     * its removed from the list if not then  blnIsItemPresent = false; its added to the list.
     * OnChangeEventHandler callback function to return entire array           
    */
    const ClickHandler = (objSelectedItem) => {
        let blnIsItemPresent = true;
        let blnRemoveItem = false;
        if (state.arrSelectedItem.length > 0) {
            state.arrSelectedItem.map((objItem) => {
                if (objItem[props.Meta.ValueColumn] == objSelectedItem[props.Meta.ValueColumn]) {
                    blnRemoveItem = true;
                }
                else {
                    blnIsItemPresent = false;
                }

            });
        }
        else {
            blnIsItemPresent = false;
        }

        let arrNewValue = []; //Temporary value for return(made by aviral).
        if (!blnIsItemPresent) {
            arrNewValue = [...state.arrSelectedItem, objSelectedItem];
            dispatch({
                type: "SET_STATE", payload: {
                    "arrSelectedItem": arrNewValue, "blnShowOption": true,
                    "strClassTrigger": "multi-dropdown-list show",
                    "strClassActive": "multi-dropdown-trigger active" } });
        }

        if (blnRemoveItem === true) {
            arrNewValue = state.arrSelectedItem.filter((objItem) => objItem[props.Meta.ValueColumn] !== objSelectedItem[objContext.props.Meta.ValueColumn]);
            blnRemoveItem === false;
            dispatch({
                type: "SET_STATE", payload: {
                    "arrSelectedItem": arrNewValue, "blnShowOption": true,
                    "strClassTrigger": "multi-dropdown-list show",
                    "strClassActive": "multi-dropdown-trigger active" } });
        }
       // document.addEventListener("click", HideOption);
        props.Events.OnChangeEventHandler ? props.Events.OnChangeEventHandler(arrNewValue, props) : () => { };
    };

    return (
        <div className="multi-dropdown-wrapper" id={props.Id + state.strMultiDropDownUID}>
            <button id={props.Id + state.strMultiDropDownUID + "_button"}
                onClick={() => ShowMenu()}
                className={(props.Meta.Disabled && props.Meta.Disabled == "Y") ? state.strClassActive + 'disabled' : state.strClassActive}
                disabled={(props.Meta.Disabled && props.Meta.Disabled == "Y") ? true : null}>
                <label>
                    {
                        state.arrSelectedItem.length > 0 ? (
                            props.Meta.IsLanguageDependent === "Y" ? (
                                state.arrSelectedItem.map((objSelectedItem, intIndex) => {
                                    return (
                                        objSelectedItem[props.Meta.DependingTableName].map(objDependTableItem => {
                                            if (objDependTableItem["iLanguageId"] == props.ParentProps.JConfiguration["InterfaceLanguageId"])
                                                return (
                                                    <span>
                                                        {objDependTableItem[props.Meta.ShortNameColumn] + (intIndex < state.arrSelectedItem.length - 1 ? " , " : "")}
                                                    </span>
                                                );
                                            })
                                        );
                                }))
                                : (
                                    state.arrSelectedItem.map((objSelectedItem, intIndex) => {
                                        return (
                                            <span>
                                                {objSelectedItem[props.Meta.ShortNameColumn] + (intIndex < state.arrSelectedItem.length - 1 ? " , " : "")}
                                            </span>
                                        );
                                    })
                                  )
                              )
                            :
                           //<span>{props.Meta.DefaultOptionTextKey ? props.Meta.DefaultOptionTextKey : props.Resource.Text}</span>
                            <span>{props.Meta.DefaultOptionTextKey ? props.Resource.Text[props.Meta.DefaultOptionTextKey] : props.Resource.Text.DefaultOptionText}</span>
                    }
                </label>
                <img src={strImagePath} alt="" />
            </button>

            {/*prints the dropdown list from an array*/}
            <ul id={props.Id + state.strMultiDropDownUID +"_ul" }  className={state.strClassTrigger}>
                {
                    
                        (
                        props.Data.MultiSelectDropdownData.map((objItem, intIndex) => {
                                var blnAddItem = true;
                                if (props.CallBacks.CheckDeletedDropDownData) {
                                    blnAddItem = props.CallBacks.CheckDeletedDropDownData(objItem);
                                }
                                if (blnAddItem) {
                                    if (props.Meta.IsLanguageDependent === "Y") {
                                        return (
                                            objItem[props.Meta.DependingTableName].map((objDependTableItem, intIndex) => {
                                                if (objDependTableItem["iLanguageId"] == props.ParentProps.JConfiguration["InterfaceLanguageId"])
                                                    return (
                                                        <li key={intIndex} id={props.Id + state.strMultiDropDownUID + "_ul_li"} className={(state.arrSelectedItem.filter((objselectedItem) => objselectedItem[props.Meta.ValueColumn] == objItem[props.Meta.ValueColumn]).length !== 0) ? 'dropdown active' : 'dropdown'}>
                                                            <label className="check-container">
                                                                <input type="checkbox" id={props.Id + state.strMultiDropDownUID + "_ul_li_label_input"} value={objDependTableItem[props.Meta.DisplayColumn]} onClick={() => ClickHandler(objItem)} checked={(state.arrSelectedItem.filter((objselectedItem) => objselectedItem[props.Meta.ValueColumn] == objItem[props.Meta.ValueColumn]).length !== 0) ? 'checked' : ''} />
                                                                <span className="checkmark" />
                                                            </label>
                                                            <span>{objDependTableItem[props.Meta.DisplayColumn]}</span>
                                                        </li>
                                                    );
                                            })
                                        );
                                    }
                                    else {
                                        return (
                                            <li key={intIndex} id={props.Id + state.strMultiDropDownUID + "_ul_li"} className={(state.arrSelectedItem.filter((objselectedItem) => objselectedItem[props.Meta.ValueColumn] == objItem[props.Meta.ValueColumn]).length !== 0) ? 'dropdown active' : 'dropdown'}>
                                                <label className="check-container">
                                                    <input type="checkbox" id={props.Id + state.strMultiDropDownUID + "_ul_li_label_input"} value={objItem[props.Meta.DisplayColumn]} onClick={() => ClickHandler(objItem)} checked={(state.arrSelectedItem.filter((objselectedItem) => objselectedItem[props.Meta.ValueColumn] == objItem[props.Meta.ValueColumn]).length !== 0) ? 'checked' : ''} />
                                                    <span className="checkmark" />
                                                </label>
                                                <span>{objItem[props.Meta.DisplayColumn]}</span>
                                            </li>
                                        );
                                    }
                                }
                                else {
                                    return null;
                                }
                            })
                        )                        
                }
            </ul>
        </div>
    );
}

export default MultiSelectDropDown;