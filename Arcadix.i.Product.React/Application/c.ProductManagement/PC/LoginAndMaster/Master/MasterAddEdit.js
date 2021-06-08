import React, { useState, useEffect, useMemo } from "react";
import OfficeRibbon from '@root/Framework/Controls/OfficeRibbon/OfficeRibbon';

//Component related imports
import ComponentLoader from '@root/Core/4_ComponentLoader/ComponentLoader';

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

const MasterAddEdit = props => {
    //Navigation data for the Side navigation -->to handle the hide and show in the module
    const [arrPopupNavigationData, setArrNavigationData] = useState([]);
    const [arrOfficeRibbonData, setArrOfficeRibbonData] = useState([]);
    const [strSelectedNavId, SetSelectedNavId] = useState("");

    const SetNavigationData = (arrNavigationData) => {
        setArrNavigationData(arrNavigationData);
        //To select the first tab
        SetSelectedNavId("Nav_" + arrNavigationData[0].Children[0].Id);
    }
    const SetOfficeRibbonData = (arrOfficeRibbonData) => {
        setArrOfficeRibbonData(arrOfficeRibbonData);
    }

    useEffect(() => {
        console.log('masteraddediy called')
    }, []);


    //To be used in module component to navigate the tab
    //The TabId should be passed as an argument 
    const NavigateTabs = (strNabId) => {
        SetSelectedNavId("Nav_" + strNabId);
    }

    /**
     * To get the side navigation div --> tree like structurte
     */
    const GetNavigations = () => {
        var Nav = arrPopupNavigationData.map(objNav => {
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
                                            SetSelectedNavId(strNavId);
                                            objChild.Event();
                                        }}>
                                            <span className={strSelectedNavId == strNavId ? "active" : ""}>{objChild.Text}</span>
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

    const GetModule = () => {
        /**
        * To get the module either by SSR or ComponentController
        */
        let strModuleName = props.Data.ModuleName

        let objProps = { ...props, "DivName": props.DivName + "_" + strModuleName };

        return <ComponentLoader
            {...objProps}
            IsFromRouteLoader={false}
            ComponentName={strModuleName}
            NavigateTabs={NavigateTabs}
            SetNavigationData={SetNavigationData}
            SetOfficeRibbonData={SetOfficeRibbonData}
        />;
    }

    let domModule = useMemo(() => GetModule(), []);
    return (
        <React.Fragment>
            <div className="master-add-edit-wrapper">
                <div className="title-bar">
                    <div className="title-bar-flex">
                        <h3>{props.Data.Title} </h3>
                        <div className="title-controls">
                            <img onClick={objEvt => props.toggleMaximize(props.objModal)}
                                src={
                                    props.JConfiguration.IntranetSkinPath +
                                    "/Images/Common/Icons/Icon_Maximize.png"
                                }
                                alt=""
                            />
                            <img
                                src={
                                    props.JConfiguration.IntranetSkinPath +
                                    "/Images/Common/Icons/Icon_Close.png"
                                }
                                onClick={e => {
                                    Popup.ClosePopup(props.ObjModal);
                                }}
                                alt=""
                            />
                        </div>
                    </div>
                </div>
                {/* To get the tabs and Office ribbon */}
                <div className="nav-bar">
                    <div className="addedit-ribbon">
                        <OfficeRibbon
                            OfficeRibbonData={arrOfficeRibbonData}
                            SkinPath={props.JConfiguration.IntranetSkinPath}
                            JConfiguration={props.JConfiguration}
                            ComponentController={props.ComponentController}
                            isSSRDisabled={false}
                            ModuleName={props.Data.ModuleName}
                        />
                    </div>
                </div>
                {/* Navigation at the left */}
                <div className="master-addedit-flex">
                    <div className="master-addedit-navigation">
                        {arrPopupNavigationData ? GetNavigations() : <React.Fragment />}
                    </div>
                    <div className="master-addedit-content-area">
                        {/* Module from the SSR or ComponentController */}
                        {domModule}
                    </div>
                </div>


            </div>
        </React.Fragment>
    );
};

MasterAddEdit.DynamicStyles = props => {
    var arrStyles = [
        props.JConfiguration.IntranetSkinPath +
        "/Css/Application/ReactJs/PC/LoginAndMaster/MasterAddEdit.css"
    ];
    return arrStyles;
};

export default MasterAddEdit;
