import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

//ModuleSpecific
import Navigation_ModuleProcessor from '@shared/Application/d.Extranet/2_School/Phone/LoginAndMaster/Navigation/Navigation_ModuleProcessor';

const ServiceNavigation = (props) => {

    let objContext = { props, ["Navigation_ModuleProcessor"]: new Navigation_ModuleProcessor() };
    const [objSelectedNavigation, SetSelectedNavigation] = useState({});

    const GetSubNavigation = (strNavigationId) => {
        let arrSubNavigation = props.arrNavigation.filter(x => x.ParentNavigationId.toString() === strNavigationId)
        return arrSubNavigation;
    }

    /**
     * @name GetNavigationElements
     * */
    let GetNavigationElements = () => {
        let arrNavElements = [];
        if (props.ServiceNavigationList && props.ServiceNavigationList.length > 0) {
            arrNavElements = props.ServiceNavigationList.map(objNav => {
                let arrSubNavigation = GetSubNavigation(objNav["NavigationId"]);
                return (
                    <li
                        onClick={() => {
                            if(arrSubNavigation.length > 0)
                                SetSelectedNavigation(objSelectedNavigation["NavigationId"] == objNav["NavigationId"] ? {} : objNav)
                            else
                                objContext.Navigation_ModuleProcessor.OnNavigationClick(objContext, objNav);
                        }}
                    >
                        <span>{objNav.NavigationText[props.JConfiguration.LanguageCultureInfo]}</span>
                        {arrSubNavigation && arrSubNavigation.length > 0? 
                            <React.Fragment>
                                {objSelectedNavigation["NavigationId"] == objNav["NavigationId"] ?
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
                                {objSelectedNavigation["NavigationId"] == objNav["NavigationId"] &&
                                    <ul className={"sub-main-navigation show"} >
                                        {arrSubNavigation.map(objSubNavigation =>  <li className="sub-main-navigation-items" onClick={() => objContext.Navigation_ModuleProcessor.OnNavigationClick(objContext, objSubNavigation) }>                        
                                                <span>{objSubNavigation["NavigationName"]}</span>                        
                                        </li>)}
                                    </ul>
                                }
                            </React.Fragment> : <React.Fragment />
                        }
                    </li>
                )

            })
        }
        return arrNavElements;

    }

    function GetContent() {

        return (
            <ul className="service-navigation">
                {GetNavigationElements()}
            </ul>
        )
    }

    return GetContent();
};


export default withRouter(ServiceNavigation);