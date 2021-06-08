import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import Navigation from '@root/Application/d.Extranet/4_Pupil/PC/LoginAndMaster/Navigation/Navigation';
import { DataRef } from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';
import ApplicationState from '@shared/Framework/DataService/ApplicationState/ApplicationState';
import Home_ModuleProcessor from '@shared/Application/d.Extranet/4_Pupil/PC/LoginAndMaster/Home/Home_ModuleProcessor';
import * as ExtranetBase_Hook from '@shared/Framework/BaseClass/ExtranetBaseClass/ExtranetBase_Hook';
import { connect } from 'react-redux'

const Home = (props) => {

    useEffect(() => {
        // hide dropdown nav if open
        if (document.getElementById('dropDownNavigation')) {
            document.getElementById('dropDownNavigation').style.display = 'none';
        }
        ApplicationState.SetProperty("blnShowAnimation", false);
    }, [])

    let objNavigation = {};
    if (DataRef(props.Object_Framework_Services_FrameworkNavigation, "Object_Framework_Services_FrameworkNavigation;ApplicationType;" + props.JConfiguration.ApplicationTypeId)) {
        objNavigation = DataRef(props.Object_Framework_Services_FrameworkNavigation, "Object_Framework_Services_FrameworkNavigation;ApplicationType;" + props.JConfiguration.ApplicationTypeId)["Data"][0];
    }
    let strApplicationName = "";
    let arrNavigationData = [];
    if (Object.keys(objNavigation).length > 0) {
        strApplicationName = Object.keys(objNavigation)[1];
        arrNavigationData = objNavigation[strApplicationName];
    }

    const arrMainNavigationData = arrNavigationData ? arrNavigationData.filter(x => x.iParentNavigationId != -1 && x.iParentNavigationId != -2) : [];

    return (
        <div className="home-page-nav-wrapper">
            <div className="pupil-secondary-navigation home-page-bottom-navigation">
                <Navigation ClientUserDetails={props.ClientUserDetails} IsFromHome={true} ShowNavigations={true} ComponentController={props.ComponentController} JConfiguration={props.JConfiguration} ParentName="Home" arrMainNavigationData={arrMainNavigationData} SecondaryNav={true} />
            </div>
        </div>
    )
}

Home.DynamicStyles = props => {
    return [];
};

export default withRouter(connect(ExtranetBase_Hook.MapStoreToProps(Home_ModuleProcessor.StoreMapList()))(Home));
