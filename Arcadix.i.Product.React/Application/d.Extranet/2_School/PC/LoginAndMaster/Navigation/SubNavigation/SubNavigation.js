//React imports
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
//Base classes.
import * as ExtranetBase_Hook from '@shared/Framework/BaseClass/ExtranetBaseClass/ExtranetBase_Hook';

//Application state reducer of store.
import { withRouter } from 'react-router-dom';
import Navigation_ModuleProcessor from '@shared/Application/d.Extranet/2_School/PC/LoginAndMaster/Navigation/Navigation_ModuleProcessor';


/**
 * @name SubNavigation
 * @summary displays the sub navigations
 * @param {any} props
 */
const SubNavigation = (props) => {

    /**
     * @name objSelectedNavigation
     * @summary holds the selected navigation.
     * */
    const [objSelectedNavigation, SetSelectedNavigation] = useState({});

    let objContext = { props, ["Navigation_ModuleProcessor"]: new Navigation_ModuleProcessor() };

    /**
     * @name OnSubNavigationClick
     * @summary click handler
     * @param {any} objClickedNavigation
     */
    const OnSubNavigationClick = (objClickedNavigation) => {
        SetSelectedNavigation(objClickedNavigation);
        objContext.Navigation_ModuleProcessor.OnSubNavigationClickHandler(objContext, objClickedNavigation);
    };

    //let ShowOnlineHelp = () => {
    //    let objOnlineHelpObject = {
    //        blnShowOnlineHelp: true
    //    };
    //    if (Object.keys(objSelectedNavigation).length !== 0) {
    //        objOnlineHelpObject["OnlineHelpGroupKey"] = objSelectedNavigation["NavigationName"];
    //        objOnlineHelpObject["OnlineHelpKey"] = objSelectedNavigation["NavigationName"];//"";
    //    } else {
    //        objOnlineHelpObject["OnlineHelpGroupKey"] = props.arrSubNavigation[0]["NavigationName"];
    //        objOnlineHelpObject["OnlineHelpKey"] = props.arrSubNavigation[0]["NavigationName"];//"";
    //    }
    //    ApplicationState.SetProperty("OnlineHelpGroupObject", objOnlineHelpObject);
    //};

    let ShowOnlineHelp = () => {
        let objHelpView = {
            "HelpAction": "Open"
        };
        if (Object.keys(objSelectedNavigation).length !== 0) {
            objHelpView["HelpGroup"] = objSelectedNavigation["NavigationName"];
            objHelpView["HelpKey"] = objSelectedNavigation["NavigationName"];
        } else {
            objHelpView["HelpGroup"] = props.arrSubNavigation[0]["NavigationName"];
            objHelpView["HelpKey"] = props.arrSubNavigation[0]["NavigationName"];
        }
        ApplicationState.SetProperty("HelpData", objHelpView);
    };

    useEffect(() => {
        if (props["HighlightSubNavigations" + props.Id] && props["HighlightSubNavigations" + props.Id].Id === props.Id) {
            var objSubNavigation = props.arrSubNavigation.filter(x => x.NavigationName == props["HighlightSubNavigations" + props.Id].NavigationName)[0];
            SetSelectedNavigation(objSubNavigation);
            ApplicationState.SetProperty("HighlightSubNavigations" + props.Id, {});
        }
    }, [props["HighlightSubNavigations" + props.Id]]);

    let GetActiveId = () => {
        var intSubNavigationId = -1;
        if (Object.keys(objSelectedNavigation).length !== 0) {
            intSubNavigationId = objSelectedNavigation.NavigationId;
        } else if (ApplicationState.GetProperty('ActiveSubNavigationId')) {
            intSubNavigationId = ApplicationState.GetProperty('ActiveSubNavigationId');
        } else if (props.ActiveServiceNavigationId) {
            intSubNavigationId = props.ActiveServiceNavigationId;
        } else {
            intSubNavigationId = props.arrSubNavigation[0].NavigationId
        }
        return intSubNavigationId;
    }

    function GetContent() {
        var intSubNavigationId = GetActiveId();
        let objSelectedSubNavigation = props.arrSubNavigation.find(objSubNavigation => objSubNavigation.NavigationId == intSubNavigationId);
        let objShowHelp = ApplicationState.GetProperty("ShowHelp");
        if (!objShowHelp || (objSelectedSubNavigation && objShowHelp.NavigationName != objSelectedSubNavigation["NavigationName"] && objShowHelp.ShowAt == "SubNavigation"))
            ApplicationState.SetProperty("ShowHelp", {
                NavigationName: objSelectedSubNavigation["NavigationName"], ShowHelpIcon: false, ShowAt: "SubNavigation"
            });
        return (
            <React.Fragment>
                <ul className="sub-navigation" onClick={(e) => { e.stopPropagation(); }}>
                    {
                        props.arrSubNavigation.map((objItem) => {
                            var strClassName = objItem.NavigationId == intSubNavigationId ? "active" : ""; //set class active only if the id matches
                            return (
                                <li onClick={(e) => { e.stopPropagation(); OnSubNavigationClick(objItem); }}>
                                    <span className={strClassName}>
                                        {objItem.NavigationIcon ? (<img src={props.JConfiguration.ExtranetSkinPath + "/Images/Common/" + objItem.NavigationIcon} />) : null}
                                        {objItem.NavigationText[props.JConfiguration.LanguageCultureInfo]}
                                    </span>
                                </li>
                            );
                        })
                    }
                    {
                        // props.ShowHelp && props.ShowHelp.ShowHelpIcon ?
                        <li className="help-icon">
                            <div class="icon-trigger">
                                <img onClick={() => { ShowOnlineHelp(); }} src={props.JConfiguration.ExtranetSkinPath + "/Images/Common/Icons/exclamation_mark.svg"} alt="" />
                            </div>
                        </li>
                        //     : <React.Fragment />
                    }
                </ul>

            </React.Fragment>
        );
    }
    return GetContent()
}

/**
* @name MapStateToProps
* @param {object} objState State object
* @param {object} objOwnProps Props passed
        * @summary Returns list of objects used in the module
* @return {Array} Array of object list
        */
const MapStateToProps = (objState, objOwnProps) => {
    return ExtranetBase_Hook.MapStoreToProps([{ "StoreKey": "ApplicationState", "DataKey": "HighlightSubNavigations" + objOwnProps["Id"] }]);
};

export default connect(MapStateToProps)(withRouter(SubNavigation));