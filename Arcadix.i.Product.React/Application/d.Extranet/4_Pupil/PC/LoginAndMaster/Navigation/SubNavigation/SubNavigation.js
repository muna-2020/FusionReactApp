//React imports
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
//common functionalities.

function mapStoreToProps(state) {
    return {
        SubNavigationList: state.ApplicationState.SubNavigationList
    }
}


/**
 * @name SubNavigation
 * @summary displays the sub navigations
 * @param {any} props
 */
const SubNavigation = (props) => {

    const OnSubNavigationClick = (navItem) => {
        if (navItem.IsOpenNewWindow !== 'Y') {
            ApplicationState.SetProperty("blnShowAnimation", true);
            let ObjData = ApplicationState.GetProperty('NavigationFromHome');
            if (ObjData != "Y" && props.IsFromHome) {
                ApplicationState.SetProperty('NavigationFromHome', "Y");
            }
            var strRouterPath = "";// + props.JConfiguration.VirtualDirName.split('/')[1];
            let strPushRouterPath = strRouterPath + '/' + navItem.URL.substring(0, navItem.URL.lastIndexOf('/'));
            let objParentNavigation = props.arrMainNavigationData.find(x => x["NavigationId"] == navItem.ParentNavigationId);
            let RouterPathNavName = {
                RouterPath: strPushRouterPath,
                NavigationName: navItem.NavigationName,
                NavigationTitle: objParentNavigation.NavigationText ? objParentNavigation.NavigationText[props.JConfiguration.LanguageCultureInfo] : ''
            }
            ApplicationState.SetProperty('RouterPathNavName', RouterPathNavName);
            ApplicationState.SetProperty('RouterPath', strPushRouterPath);           
            var strFullQueryString = window.location.search;
            var strPushUrl = props.JConfiguration.VirtualDirName + navItem.URL.split('?')[0] + strFullQueryString;
            props.history.push({ pathname: strPushUrl });
            let FnDisableServiceNaivation = ApplicationState.GetProperty("FnDisableServiceNaivation");
            FnDisableServiceNaivation();
        }
        Performance.Reset();
    }

    useEffect(() => {
        if (props.SubNavigationList && props.SubNavigationList.length > 0) {
            OnSubNavigationClick(props.SubNavigationList[0]);
        }
    }, [props.SubNavigationList])


    function GetContent() {
        let arrSubNavigation = [];
        if (props.SubNavigationList && props.SubNavigationList.length > 0) {
            arrSubNavigation = props.SubNavigationList.map(x => { return { ...x } })
        }
        return (
            <React.Fragment>
                {
                    arrSubNavigation.length > 0 ?
                        <div id="SubNavigationBlock" style={{ paddingBottom: 12 + "px", display: "block" }}>
                            <div class="sub-navigation">
                                <ul>
                                    {
                                        arrSubNavigation.map((objItem) => {
                                            return (
                                                <li onClick={(e) => { e.stopPropagation(); OnSubNavigationClick(objItem); }} className="active">
                                                    <span>
                                                        {objItem.NavigationText[props.JConfiguration.LanguageCultureInfo]}
                                                    </span>
                                                </li>
                                            );
                                        })
                                    }
                                </ul>
                            </div>
                        </div> : null
                }
            </React.Fragment>
        );
    }

    return GetContent()
}

export default withRouter(connect(mapStoreToProps)(SubNavigation));