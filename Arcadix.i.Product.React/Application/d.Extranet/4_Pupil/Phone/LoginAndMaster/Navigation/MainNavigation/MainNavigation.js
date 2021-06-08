import React from 'react';
import { NavLink } from "react-router-dom";
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

//Base classes.
import * as ExtranetBase_Hook from '@shared/Framework/BaseClass/ExtranetBaseClass/ExtranetBase_Hook';

//ModuleSpecific
import Navigation_ModuleProcessor from '@shared/Application/d.Extranet/2_School/Phone/LoginAndMaster/Navigation/Navigation_ModuleProcessor';

//common for Main Navigation and Tablet navigation.
import ApplicationState from '@shared/Framework/DataService/ApplicationState/ApplicationState';

const MainNavigation = (props) => {

    let objContext = { props, ["Navigation_ModuleProcessor"]: new Navigation_ModuleProcessor() };

    const GetNavigationList = () => {
        let arrMainNavigationList = [];
        let arrFilteredMainNavigation = props.arrNavigation ? props.arrNavigation.filter(x => x.ParentNavigationId === 0) : [];

        arrFilteredMainNavigation.map(objNavigation => {
            arrMainNavigationList = [...arrMainNavigationList,
            <li
                id={objNavigation.NavigationName}
                onClick={() => objContext.Navigation_ModuleProcessor.OnNavigationClick(objContext, objNavigation)}
            >
                <span>{objNavigation.NavigationText[JConfiguration.LanguageCultureInfo]}</span>
            </li>
            ];
        });

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