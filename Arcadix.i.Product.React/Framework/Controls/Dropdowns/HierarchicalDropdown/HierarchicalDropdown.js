// React related import
import React, { useEffect, useReducer } from "react";

//Base classes.
import * as Base_Hook from '@shared/Framework/BaseClass/Base_Hook';

//Component Specific import
import * as HierarchicalDropdown_Hook from '@shared/Framework/Controls/Dropdowns/HierarchicalDropdown/HierarchicalDropdown_Hook';
import HierarchicalDropdown_ComponentProcessor from '@shared/Framework/Controls/Dropdowns/HierarchicalDropdown/HierarchicalDropdown_ComponentProcessor';
import Tree from '@root/Framework/Controls/Tree/Tree';

//Inline Images import
import AngleDownImage from '@inlineimage/Framework/ReactJs/PC/Controls/Dropdowns/Dropdown/angle_down.png?inline';

/**
* @name Hierarchical DropDown
* @param {object} props props
* @summary This component displays the Data sent by the module in Hierarchical format.
* @returns {*} returns a jsx with provied data that will be displayed in it.
*/
const HierarchicalDropdown = (props) => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     * @returns {[]} state and dispatch
    */
    const [state, dispatch] = useReducer(Base_Hook.Reducer, HierarchicalDropdown_Hook.GetInitialState(props));

    /**
    * @name objContext
    * @summary Groups state.dispatch and module object(s) in objContext.
    * @returns {object} objContext
    */
    let objContext = { state, props, dispatch, ["ModuleName"]: props.Id, ["HierarchicalDropdown_ComponentProcessor"]: new HierarchicalDropdown_ComponentProcessor() };

    /**
     * @name  Initialize
     * @param {object} objContext objContext
     * @param {object} ModuleProcessor ModuleProcessor
     * @summary Initializing API and DynamicStyles
     * @returns null
     */
    objContext.HierarchicalDropdown_ComponentProcessor.Initialize(objContext, objContext.HierarchicalDropdown_ComponentProcessor);

    /**
    * @name Initialize
    * @param {object} objContext context object
    * @summary Initialize method call in Hierarchical Dropdown_Hook, that contains all the custom hooks.
    */
    HierarchicalDropdown_Hook.Initialize(objContext);

    useEffect(() => {
        window.addEventListener("resize", HideOption);

    }, []);

    //image path for the dropdown
    //var strImagePath = props.Resource.ImagePath ? props.Resource.ImagePath : props.Resource.SkinPath + "/Images/Framework/ReactJs/PC/Controls/Dropdowns/HierarchicalDropdown/angle_down.png";

    let strImagePath = props.ImageMeta && props.ImageMeta.ImagePath ? props.ImageMeta.ImagePath : AngleDownImage;

    /**
     * @name ShowMenu
     * @summay Checks if blnShowOption is true, Dropdown classes will be set to show the list.If its false the dropdown will close and on clicking second time on the button set the toggle value to false and hide the dropdown list
     * */
    const ShowMenu = () => {
        if (state.blnShowOption === false) {
            dispatch({
                type: "SET_STATE", payload: {
                    "blnShowOption": !state.blnShowOption,
                    "strClassTrigger": "dropdown-list show",
                    "strClassActive": "dropdown-trigger active"
                }
            });
            let objSize = document.getElementById(props.Id + state.strDropDownUID).getBoundingClientRect();
            let strLeft = objSize.x;
            let strTop = objSize.y;
            let strWidth = objSize.width;
            let strHeight = objSize.height;
            dispatch({ type: "SET_STATE", payload: { "objStyle": { "position": "fixed", "min-width": strWidth, "top": strTop, "left": strLeft, "margin-top": strHeight - 1 } } });
        } else {
            dispatch({
                type: "SET_STATE", payload: {
                    "blnShowOption": !state.blnShowOption,
                    "strClassTrigger": "dropdown-list",
                    "strClassActive": "dropdown-trigger"
                }
            });
        }
        document.addEventListener("click", HideOption);
    };

    /**
     * @name HideOption
     * @param {any} event event
     * @summay On clicking anywhere in the dom and if blnShowOption is false the dropdown will close
     */
    const HideOption = event => {
        var DropdownMenu = document.getElementById(props.Id + state.strDropDownUID);
        if (DropdownMenu) {
            if (!DropdownMenu.contains(event.target)) {
                dispatch({
                    type: "SET_STATE", payload: {
                        "blnShowOption": false,
                        "strClassTrigger": "dropdown-list",
                        "strClassActive": "dropdown-trigger"
                    }
                });
            }
        }
        document.removeEventListener("click", HideOption);
    };

    /**
    * @name GetContent
    * @summary jsx 
    * @returns {object} JSX for HierarchicalDropdown
    */
    const GetContent = () => {
        let objMeta = {
            IdField: props.Meta.ValueColumn,
            ParentIdField: props.Meta.ParentId,
            TextField: props.Meta.DisplayColumn,
            RootNodeId: props.Meta.Root,
            IsLanguageDependent: props.Meta.IsLanguageDependent,
            DependingTableName: props.Meta.DependingTableName,
            OpenChildNodes: true,
        };
        return (
            <div className="hierarchical-dropdown-wrapper" id={props.Id + state.strDropDownUID}>
                <button
                    id={props.Id + state.strDropDownUID + "_button"}
                    className={(props.Meta.Disabled && props.Meta.Disabled == "Y") ? state.strClassActive + 'disabled' : state.strClassActive}
                    disabled={(props.Meta.Disabled && props.Meta.Disabled == "Y") ? true : null}
                    onClick={() => ShowMenu()}>
                    <span>{state.strOptionName}</span>
                    <img src={strImagePath} />
                </button>
                <ul id={props.Id + state.strDropDownUID + "_ul"} className={state.strClassTrigger} style={state.objStyle} >
                    <Tree
                        Id={props.Id + "_Tree"}
                        Data={{ NodeData: state.arrData, SelectedNodeId: props.Data.SelectedValue }}
                        Meta={objMeta}
                        Resource={{ ...props.Resource, ImagePathDetails: { Spacer: "/Images/Common/JNavigation/spacer.svg" } }}
                        Events={{
                            OnSelectNode: (OnSelectNode) => objContext.HierarchicalDropdown_ComponentProcessor.OnSelectMethods(objContext, OnSelectNode)
                        }}
                        CallBacks={{
                            OnBeforeShowNode: objNode => {
                                return props.CallBacks && props.CallBacks.OnBeforeShowNode ? (props.CallBacks.OnBeforeShowNode(objNode) ? { ...props.CallBacks.OnBeforeShowNode(objNode), ImageType: "Spacer" } : null) : objNode;
                            }
                        }}
                        ParentProps={props.ParentProps}
                    />
                </ul>
            </div>
        );
    }

    /**
     * JSX of display Dropdown
    */
    return state.isLoadComplete ? GetContent() : <React.Fragment />;
};

export default HierarchicalDropdown;