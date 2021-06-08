// React related imports.
import React, { useReducer, useEffect } from 'react';

//Base classes.
import * as Base_Hook from '@shared/Framework/BaseClass/Base_Hook';
import * as Dropdown_Hook from '@shared/Framework/Controls/Dropdowns/Dropdown/Dropdown_Hook';
import Dropdown_ComponentProcessor from '@shared/Framework/Controls/Dropdowns/Dropdown/Dropdown_ComponentProcessor';
import ApplicationState from '@shared/Framework/DataService/ApplicationState/ApplicationState';

//Inline Images import
import AngleDownImage from '@inlineimage/Framework/ReactJs/PC/Controls/Dropdowns/Dropdown/angle_down.png?inline';

/**
* @name Dropdown
* @param {object} props props
* @summary This component displays the Dropdown. There can be 3 test cases for the Dropdown.
             * Dropdown can show simple data.
             * Dropdown can show multilanguage data.
             * Dropdown can be disabled, i.e. if you click it, the list will not be displayed.
             * Note - Dropdown can also show default text, which the module need to pass as a prop.
* @returns {object} returns a jsx with provided data that will be displayed in it.
*/
const Dropdown = props => {

    /**
    * @name [state,dispatch]
    * @summary Define state and dispatch for the reducer to set state.
    * @returns {[]} state and dspatch
    */
    const [state, dispatch] = useReducer(Base_Hook.Reducer, Dropdown_Hook.GetInitialState(props));

    /**
    * @name objContext
    * @summary Groups state.dispatch and module object(s) in objContext.
    * @returns {object} objContext
    */
    let objContext = { state, props, dispatch, ["ModuleName"]: props.Id, ["Dropdown_ComponentProcessor"]: new Dropdown_ComponentProcessor(), ["IsFrameworkComponent"] : true };


    objContext.Dropdown_ComponentProcessor.Initialize(objContext, objContext.Dropdown_ComponentProcessor);

    /**
    * @name Initialize
    * @param {object} objContext context object
    * @summary Initialize method call in Dropdown_Hook, that contains all the custom hooks.
    * @returns null
    */
    Dropdown_Hook.Initialize(objContext);

    useEffect(() => {
        //window.addEventListener("resize", HideOption);
    }, []);

    /**
    * @name HideOption
    * @param {any} event Event
    * @summary On clicking anywhere in the DOM the dropdown closes
    */
    const HideOption = (event) => {
        var DropdownMenu = document.getElementById(props.Id + state.strDropDownUID);
        if (DropdownMenu && !DropdownMenu.contains(event.target)) {
            dispatch({ type: "SET_STATE", payload: { "blnShowOption": !state.blnShowOption, "strClassTrigger": "dropdown-list", "strClassActive": "dropdown-trigger" } });
        }
        document.removeEventListener("click", HideOption);
    };


    /**
    * @name ShowOption
    * @summary Shows the Dropdown Menu when clicked. Again when dropdown is clicked while it is open, it closes.
    */
    const ShowOption = (e) => {

        if (state.blnShowOption === false) {
            dispatch({ type: "SET_STATE", payload: { "blnShowOption": !state.blnShowOption, "strClassTrigger": "dropdown-list show", "strClassActive": "dropdown-trigger active" } });
            let objSize = document.getElementById(props.Id + state.strDropDownUID).getBoundingClientRect();
            let strLeft = objSize.x;
            let strTop = objSize.y;
            let strWidth = objSize.width;
            let strHeight = objSize.height;
            dispatch({ type: "SET_STATE", payload: { "objStyle": { "position": "fixed", "min-width": strWidth, "top": strTop, "left": strLeft, "margin-top": strHeight - 1 } } });
        }
        else //on clicking second time on the button set the toggle value to false and hide the dropdown list            
        {
            dispatch({ type: "SET_STATE", payload: { "blnShowOption": !state.blnShowOption, "strClassTrigger": "dropdown-list", "strClassActive": "dropdown-trigger" } });
        }
        document.addEventListener("click", HideOption);
        ApplicationState.SetReference("HideOption", HideOption);
    };



    /**
    * @name GetContent
    * @summary Dropdown JSX formation 
    * @returns {object} JSX for Dropdown
    */
    const GetContent = () => {

        let strValidationClassName = props.Meta.ValidationClassName ? props.Meta.ValidationClassName : ""; //used for form validation

        //The dropdown will check if ImagePath exists.If it exists, then Dropdown will take the Image path.
        //If it doesnot exist, then Dropdown will take the Skin path and concatinate the default path to it.
        //var strImagePath = props.Resource.ImagePath ? props.Resource.ImagePath : props.Resource.SkinPath + "/Images/Framework/ReactJs/PC/Controls/Dropdowns/Dropdown/angle_down.png";

        let strImagePath = props.ImageMeta && props.ImageMeta.AngleDownImage ? props.ImageMeta.AngleDownImage : AngleDownImage;

        return (
            <div onScroll={() => console.log("scrolling")} id={props.Id + state.strDropDownUID} className="dropdown-wrapper"> {/*disabling dropdown using button disbled  by property  "Disabled"*/}
                <button
                    id={props.Id + "_button"}
                    className={(props.Meta.Disabled && props.Meta.Disabled == "Y") ? state.strClassActive + " " + strValidationClassName + ' disabled' : state.strClassActive + strValidationClassName}
                    disabled={(props.Meta.Disabled && props.Meta.Disabled == "Y") ? true : null}
                    onClick={() => { ShowOption(); }}
                >
                    <span>{state.strOptionName}</span>
                    <img src={strImagePath} />
                </button>
                <ul id={props.Id + "_ul"} className={state.strClassTrigger + strValidationClassName} style={state.objStyle} >
                    {
                        state.arrData.map((objItem, intIndex) => {
                            var blnAddItem = true;
                            if (props.Callbacks && props.Callbacks.CheckDeletedDropDownData && objItem[props.Meta.ValueColumn] !== props.Meta.DefaultOptionValue) {
                                blnAddItem = props.Callbacks.CheckDeletedDropDownData(objItem);
                            }
                            if (blnAddItem) {
                                var strDisplayData = "";
                                if (props.Meta.IsLanguageDependent == "Y") {
                                    strDisplayData = objContext.Dropdown_ComponentProcessor.GetDependentTableData(objContext, false, objItem, [], state.strSelectedValue)[0];
                                }
                                else {
                                    strDisplayData = objContext.Dropdown_ComponentProcessor.GetTableData(objContext, false, objItem, [], state.strSelectedValue)[0];
                                }
                                return (
                                    <li
                                        id={props.Id + "_li_" + intIndex}
                                        key={props.Id + "_li_" + intIndex}
                                        index={intIndex}
                                        className={objItem[props.Meta.ValueColumn] === state.objDisplaySelectedItem[props.Meta.ValueColumn] ? "active" : strValidationClassName}
                                        onClick={() => { objContext.Dropdown_ComponentProcessor.ClickHandler(objContext, objItem, intIndex); }}
                                    >
                                        {
                                            (props.Meta.IsLink && props.Meta.IsLink == "Y") ?
                                                <a href={objItem.URL} style={{ display: "block" }} target="_blank">
                                                    {strDisplayData}
                                                </a> : strDisplayData
                                        }
                                    </li>
                                );
                            }
                            else {
                                return null;
                            }
                        })
                    }
                </ul>
            </div>
        );
    };

    return state.isLoadComplete ? GetContent() : <React.Fragment />;
};

export default Dropdown;