// React related imports.
import React, { useState, useEffect, useMemo, useReducer } from "react";
import OfficeRibbon from '@root/Framework/Controls/OfficeRibbon/OfficeRibbon';

//Base classes.
import * as Base_Hook from '@shared/Framework/BaseClass/Base_Hook';

//Component realted fies.
import * as TabbedPopup_Hook from '@shared/Framework/Blocks/Popup/TabbedPopup/TabbedPopup_Hook';
import TabbedPopup_ComponentProcessor from '@shared/Framework/Blocks/Popup/TabbedPopup/TabbedPopup_ComponentProcessor';
import ComponentLoader from '@root/Core/4_ComponentLoader/ComponentLoader';
import ApplicationState from '@shared/Framework/DataService/ApplicationState/ApplicationState';

//Inline Images import
import SaveImage from '@inlineimage/Framework/ReactJs/PC/Controls/ToolBar/Save.svg?inline';
import SaveAndCloseImage from '@inlineimage/Framework/ReactJs/PC/Controls/ToolBar/SaveAndClose_Large.svg?inline';

/**
* @name TabbedPopup
* @param {object} props props
* @summary This component displays the TabbedPopup.
* @returns {object} returns a jsx .
*/
const TabbedPopup = props => {

    /**
    * @name [state,dispatch]
    * @summary Define state and dispatch for the reducer to set state.
    * @returns {[]} state and dispatch
    */
    const [state, dispatch] = useReducer(Base_Hook.Reducer, TabbedPopup_Hook.GetInitialState(props));

    /**
    * @name objContext
    * @summary Groups state.dispatch and module object(s) in objContext.
    * @returns {object} objContext
    */
    const objContext = { state, props, dispatch, ["ModuleName"]: props.Id, ["TabbedPopup_ComponentProcessor"]: new TabbedPopup_ComponentProcessor() };

    /**
     * @name  Initialize
     * @param {object} objContext objContext
     * @param {object} ModuleProcessor ModuleProcessor
     * @summary Initializing API and DynamicStyles
     * @returns null
     */
    objContext.TabbedPopup_ComponentProcessor.Initialize(objContext, objContext.TabbedPopup_ComponentProcessor);

    /**
     * @name GetNavigations
     * @summary To get the side navigation div --> tree like structurte
     * @returns  JSX for navigation
     */
    const GetNavigations = () => {
        var Nav = state.arrPopupNavigationData.map(objNav => {
            return (
                <React.Fragment>
                    <ul>
                        <li>
                            <span>{objNav.Text}</span>
                        </li>
                        <li>
                            <ul>
                                {objNav.Children.map(objChild => {
                                    var strNavId = "Nav_" + objChild.Id;
                                    return (
                                        <li id={strNavId} onClick={() => {
                                            objContext.TabbedPopup_ComponentProcessor.NavigateTabs(objChild.Id, objContext);
                                            objChild.Event();
                                        }}>
                                            <span className={state.strSelectedNavId == strNavId ? "active" : ""}>{objChild.Text}</span>
                                        </li>
                                    );
                                })}
                            </ul>
                        </li>
                    </ul>
                </React.Fragment>
            );
        });
        return Nav;
    };

    /**
     * @name GetModule
     * @summary To get the module either by SSR or ComponentController
     * @returns  JSX for Module
     */
    const GetModule = () => {
        let strModuleName = props.Meta.PopupName
        let objProps = { ...props, "DivName": props.DivName + "_" + strModuleName };
        let objServerRenderModule = props.ParentProps.JConfiguration["SSR_Components"].filter(x => x["Name"] == props.Meta.PopupName);
        let blnServerRenderModule = false;
        let blnCacheSSRComponent = false;//not used for now
        if (objServerRenderModule.length > 0) {
            blnServerRenderModule = true;
            blnCacheSSRComponent = objServerRenderModule[0]["IsCache"] == "Y" ? true : false;
        }
        let objJConfiguration = { ...props.ParentProps.JConfiguration, IsSSREnabled: blnServerRenderModule };
        return <ComponentLoader
            {...objProps}
            ComponentController={props.ParentProps.ComponentController}
            JConfiguration={objJConfiguration}
            IsFromRouteLoader={false}
            ComponentName={strModuleName}
            NavigateTabs={strNavId => objContext.TabbedPopup_ComponentProcessor.NavigateTabs(strNavId, objContext)}
            SetNavigationData={arrNavigationData => objContext.TabbedPopup_ComponentProcessor.SetNavigationData(arrNavigationData, objContext)}
            SetOfficeRibbonData={arrOfficeRibbonData => objContext.TabbedPopup_ComponentProcessor.SetOfficeRibbonData(arrOfficeRibbonData, objContext)}
        />;
    }

    /**
     * @name GetContent
     * @param {any} props
     * @returns  JSX for Popup
     */
    const GetContent = () => {
        return <div className="master-add-edit-wrapper" onScroll={() => {
            ApplicationState.GetReference("HideOption") ? ApplicationState.GetReference("HideOption")() : () => { };
            }}
        >
            {/* To get the tabs and Office ribbon */}
            <div className="addedit-ribbon nav-bar">
                <OfficeRibbon
                    Id={"OfficeRibbon_TabbedPopup"}
                    Data={{ OfficeRibbonData: state.arrOfficeRibbonData }}
                    Resource={props.Resource}
                    ImageMeta={GetDefaultInlineImages()}
                    ParentProps={props}
                />
            </div>

            {/* Navigation at the left */}
            <div className="master-addedit-flex">
                {state.arrPopupNavigationData.length > 0 ? <div className="master-addedit-navigation">
                    {GetNavigations()}
                </div> : <React.Fragment />
                }                
                <div className="master-addedit-content-area">
                    {/* Module from the SSR or ComponentController */}
                    {useMemo(() => GetModule(), [])}
                </div>
            </div>
        </div>;
    }

    return GetContent();
};

/**
 * @name GetDefaultInlineImages
 * @summary forms the default images for inline import.
 * */
const GetDefaultInlineImages = () => {
    return {
        SaveImage: SaveImage,
        SaveAndCloseImage: SaveAndCloseImage
    }
}

/**
 * @name GetDimensions
 * @param {any} objPopupData     
 * @summary adds new popup by updating the local state with new popup details.
 */
TabbedPopup.GetDimensions = (objPopupData) => {
    return {
        Height: objPopupData && objPopupData.Meta.Height ? objPopupData.Meta.Height : 662,
        Width: objPopupData && objPopupData.Meta.Width ? objPopupData.Meta.Width : 950
    };
};


export default TabbedPopup;


//   Just a popup component
//   Will have a common navigation at left and ribbon at top.
//   Componentloader will load the module based on the component name given in the Component controller.
//   The module will be setting the navigation data ,tab and ribbon data in ApplicationState
//      -->PopupTabData
//      -->PopupRibbonData
//      -->PopupNavigationData
//   The navigation data and ribbon will have the method pointers to the module for
//   navigation
//   Actions in the ribbon
// Module will called by calling a popup
//     props.showPopup({
//         MaxHeight: '70%',
//         MaxWidth: '84%',
//         popUpMinHeight: '70%',
//         popUpMinWidth: '84%',
//         showHeader: false,
//         popUpName: 'masteraddedit', //name of the component to be displayed inside the popup. must be present in ComponentController
//         passedEvents: {
//             objTextResource: {},
//             ClientUserDetails : props.ClientUserDetails,
//             //teacher : objContext.props.teacher
//         },
//         headerTitle: '',
//         popupClassName: 'import-data-parent',
//         Data: {
//             isSSRDisabled:true,
//             ModuleName:"popupsample1" //name of the module to be called
//         },
//         isSSRDisabled : true
//     })
//Sample data
// let arrTabData = [
//     { "text": "DATEI", "type": "dropdown" }, { "text": "START DASHBOARD", "type": "ribbon" }
// ]
// let RibbonData = [
//     {//Group1
//         "vGroupName": "DashBoard",
//         "t_GroupData": [
//             {
//                 "vTextName": "sample popup 1",
//                 "uImageUrl": "Refresh_Large.png",
//                 "type": "single"
//             }
//         ]
//     },
// ]
// let Navdata = [
//     {//Group1
//         "Text": "Nav1",
//         "Id": "NavId1",
//         "Children": [
//             {
//                 "Text": "1...",
//                 "Id": "Id1",
//                 "Event": () => { HideAndSeek("Id1") }
//             },
//             {
//                 "Text": "2...",
//                 "Id": "Id2",
//                 "Event": () => { HideAndSeek("Id2") }
//             },
//             {
//                 "Text": "3...",
//                 "Id": "Id3",
//                 "Event": () => { HideAndSeek("Id3") }
//             }
//         ]
//     },
//     {//Group1
//         "Text": "Nav2",
//         "Id": "NavId2",
//         "Children": [
//             {
//                 "Text": "4...",
//                 "Id": "Id4",
//                 "Event": () => { HideAndSeek("Id4") }
//             }
//         ]
//     }
// ]
