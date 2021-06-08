import React, { useState } from 'react';
import { NavLink } from "react-router-dom";
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

//Base classes.
import * as ExtranetBase_Hook from '@shared/Framework/BaseClass/ExtranetBaseClass/ExtranetBase_Hook';

//ModuleSpecific
import Navigation_ModuleProcessor from '@shared/Application/d.Extranet/2_School/Phone/LoginAndMaster/Navigation/Navigation_ModuleProcessor';
import * as Navigation_Hook from '@shared/Application/d.Extranet/2_School/Phone/LoginAndMaster/Navigation/Navigation_Hook';

//common for Main Navigation and Tablet navigation.
import ApplicationState from '@shared/Framework/DataService/ApplicationState/ApplicationState';
//
// ──────────────────────────────────────────────────────────────────────────────────────── I ──────────
//   :::::: M A I N N A V I G A T I O N   C O M P O N E N T : :  :   :    :     :        :          :
// ──────────────────────────────────────────────────────────────────────────────────────────────────
//



const MainNavigation = (props) => {

    let objContext = { props, ["Navigation_ModuleProcessor"]: new Navigation_ModuleProcessor() };
    const [objSelectedNavigation, SetSelectedNavigation] = useState({});

    /**
    * @name Initialize
    * @param {object} objContext context object
    * @summary Initialize method call in Master_Hook, that contains all the custom hooks.
    * @returns null
    */
    Navigation_Hook.Initialize(objContext);

    const GetSubNavigation = (strNavigationId) => {
        let arrSubNavigation = props.arrNavigation.filter(x => x.ParentNavigationId.toString() === strNavigationId)
        return arrSubNavigation;
    }

    const GetNavigationList = () => {
        let arrMainNavigationList = [];
        let arrFilteredMainNavigation = props.arrNavigation ? props.arrNavigation.filter(x => x.ParentNavigationId === 0) : [];

        arrFilteredMainNavigation.map(objNavigation => {
            let arrSubNavigation = GetSubNavigation(objNavigation["NavigationId"]);
            
            arrMainNavigationList = [...arrMainNavigationList,
            <li
                id={objNavigation.NavigationName}
                onClick={() => {
                    if(arrSubNavigation.length > 0) 
                        SetSelectedNavigation(objSelectedNavigation["NavigationId"] == objNavigation["NavigationId"] ? {} : objNavigation)
                    else
                        objContext.Navigation_ModuleProcessor.OnNavigationClick(objContext, objNavigation)                    
                }}
            >
                <span>{objNavigation.NavigationText[JConfiguration.LanguageCultureInfo]}</span>
                {arrSubNavigation && arrSubNavigation.length > 0? 
                    <React.Fragment>
                       {objSelectedNavigation["NavigationId"] == objNavigation["NavigationId"] ?
                            <img
                                src={require("../../../../../../../../Arcadix.h.Product.Resources/Themes/Default_2020/d.Extranet/Skin2018/Images/Common/Icons/angle_up.png")}
                                alt=""
                            />
                        :
                            <img
                                src={require("../../../../../../../../Arcadix.h.Product.Resources/Themes/Default_2020/d.Extranet/Skin2018/Images/Common/Icons/angle_down.png")}
                                alt=""
                            />
                        }
                        {objSelectedNavigation["NavigationId"] == objNavigation["NavigationId"] &&
                            <ul className={"sub-main-navigation show"}>
                                {arrSubNavigation.map(objSubNavigation =>  <li className="sub-main-navigation-items"  id={objSubNavigation.NavigationName}
                                onClick={() => 
                                    objContext.Navigation_ModuleProcessor.OnNavigationClick(objContext, objSubNavigation)
                                }
                                >                        
                                        <span>{objSubNavigation["NavigationName"]}</span>                        
                                </li>)}
                            </ul>
                        }
                    </React.Fragment> : <React.Fragment />
                }
            </li>
            ];
        });

        //if (props.ClientUserDetails.ApplicationTypeId !== "1") {
        //    arrMainNavigationList = [
               
        //        ...arrMainNavigationList];
        //}

        return arrMainNavigationList;
    };

    return (
        <ul className="main-navigation" >
            {GetNavigationList()}
        </ul>
    );

};

/**
* @name MapStateToProps
* @param {object} objState State object
* @param {object} objOwnProps Props passed
* @summary Returns list of objects used in the module
* @return {Array} Array of object list
*/
const MapStateToProps = (objState, objOwnProps) => {
    return ExtranetBase_Hook.MapStoreToProps([{ "StoreKey": "ApplicationState", "DataKey": "LoadNavigation" }]);
};

export default connect(MapStateToProps)(withRouter(MainNavigation));