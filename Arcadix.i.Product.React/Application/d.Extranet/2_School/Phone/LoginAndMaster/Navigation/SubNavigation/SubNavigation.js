import React, { useState } from 'react';

const SubNavigation = (props) => {

    const [objSelectedNavigation, SetSelectedNavigation] = useState({});

    /**
     * @summary click handler
     * @param {any} objClickedNavigation
     */
    const OnSubNavigationClick = (objClickedNavigation) => {
        SetSelectedNavigation(objClickedNavigation);
        if (objClickedNavigation.OnNavigationClick != undefined) {
            objClickedNavigation.OnNavigationClick(objClickedNavigation);
        }
        else {
            props.OnSubNavigationClickHandler(objClickedNavigation);
        }
    };

    return (
        <ul className="sub-navigation" >
            {
                props.arrSubNavigation.map((objItem) => {
                    var intSubNavigationId = Object.keys(objSelectedNavigation).length !== 0 ? objSelectedNavigation.NavigationId : props.arrSubNavigation[0].NavigationId; //save the clicked id and initial id on load
                    var strClassName = objItem.NavigationId === intSubNavigationId ? "active" : ""; //set class active only if the id matches
                    return (
                        <li onClick={(e) => { e.stopPropagation(); OnSubNavigationClick(objItem); }}>
                            <span className={strClassName}>
                                {objItem.NavigationIcon ? (<img src={ props.JConfiguration.ExtranetSkinPath + "/Images/Common/" + objItem.NavigationIcon } />) : null}
                                {/* {objItem.t_Framework_Navigation_Data.filter((x => x["iLanguageId"].toString === props.JConfiguration.InterfaceLanguageId)) ? objItem.t_Framework_Navigation_Data[0].vNavigationText : null} */}
                                {objItem.NavigationText[props.JConfiguration.LanguageCultureInfo]}
                            </span>
                        </li>
                    );
                })
            }
        </ul>
    );
}

export default SubNavigation;