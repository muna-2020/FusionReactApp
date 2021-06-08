//React imports
import React, { useReducer, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

//Base classes.
import * as ExtranetBase_Hook from '@shared/Framework/BaseClass/ExtranetBaseClass/ExtranetBase_Hook';

//Module Specific
import SubNavigation from "@root/Application/d.Extranet/2_School/PC/LoginAndMaster/Navigation/SubNavigation/SubNavigation";
import Navigation_ModuleProcessor from '@shared/Application/d.Extranet/2_School/PC/LoginAndMaster/Navigation/Navigation_ModuleProcessor';
import * as Navigation_Hook from '@shared/Application/d.Extranet/2_School/PC/LoginAndMaster/Navigation/Navigation_Hook';

/**
 * @name MainNavigation
 * @summary displays the main navigation
 * @param {any} props
 */
const MainNavigation = (props) => {

    /**
    * @name [state,dispatch]
    * @summary Define state and dispatch for the reducer to set state.
    * @returns {[]} state and dispatch
    */
    const [state, dispatch] = useReducer(ExtranetBase_Hook.Reducer, Navigation_Hook.GetInitialState());

    /**
    * @name objContext
    * @summary Groups state, dispatch and module processor, TextResource object in objContext.
    * @returns {object} objContext
    */
    let objContext = { dispatch, state, props, ["Navigation_ModuleProcessor"]: new Navigation_ModuleProcessor() };

    /**
    * @name Initialize
    * @param {object} objContext context object
    * @summary Initialize method call in Master_Hook, that contains all the custom hooks.
    * @returns null
    */
    Navigation_Hook.Initialize(objContext);

    /**
     * @name arrFilteredMainNavigation
     * @summary holds the filtered main navigation.
     * */
    let arrFilteredMainNavigation = props.arrNavigation ? props.arrNavigation.filter(x => x.ParentNavigationId == 0) : [];
    if (props.OutletData && props.OutletData.ShowOutlet) {
        return (<React.Fragment />)
    } else {
        return (
            <ul className={state.strMainNavigation}>
                {
                    (arrFilteredMainNavigation.length > 0) ? arrFilteredMainNavigation.map((objItem) => {
                        //var intSubNavId = Object.keys(state.objSelectedNavigation).length !== 0 ? state.objSelectedNavigation.NavigationId : arrFilteredMainNavigation[0].NavigationId;
                        if (props.history.location.pathname !== "/") {
                            var browserUrl = window.location.pathname;
                            var arrBrowserUrl = browserUrl.split("/");
                            var strMainNavFromUrl = arrBrowserUrl[1];
                            var objMainNavigation = arrFilteredMainNavigation.filter(x => x.NavigationName == strMainNavFromUrl)[0];
                            var intNavigationId;
                            if (objMainNavigation) {
                                intNavigationId = objMainNavigation["NavigationId"];
                            } else {
                                intNavigationId = Object.keys(state.objSelectedNavigation).length !== 0 ? state.objSelectedNavigation.NavigationId : arrFilteredMainNavigation[0].NavigationId;
                            }

                        }
                        //var strClassName = objItem.NavigationId === intSubNavId ? "active" : "";
                        var strClassName = objItem.NavigationId === intNavigationId ? "active" : "";
                        var strAlignRightClassName = objItem.IsAlignRight === "Y" ? "main-navigation-right-button" : "";

                        return (
                            <React.Fragment>
                                <li id={objItem.NavigationName} onClick={(e) => {
                                    objContext.Navigation_ModuleProcessor.OnMainNavigationClick(objContext, objItem);
                                }} className={strAlignRightClassName}>
                                    <span className={strClassName}>
                                        {objItem.vNavigationIcon ? (<img src={objItem.vNavigationIcon} />) : null}

                                        {objItem.NavigationText[props.JConfiguration.LanguageCultureInfo]}
                                    </span>
                                    {/*//check if subnavigation exists*/
                                    }
                                    {
                                        (state.arrSubNavigation.length !== 0 && state.objSelectedNavigation.NavigationId == objItem.NavigationId) ?
                                            <SubNavigation
                                                Id={"ExtranetSubNavigation"}
                                                arrSubNavigation={state.arrSubNavigation}
                                                JConfiguration={props.JConfiguration}
                                                OnSubNavigationClickHandler={(objClickedSubNavigation) => { objContext.Navigation_ModuleProcessor.OnSubNavigationClickHandler(objContext, objClickedSubNavigation) }}
                                                ShowHelp={props.ShowHelp}
                                            />
                                            : null
                                    }
                                </li >
                            </React.Fragment >
                        );
                    })
                        : <React.Fragment />
                }
            </ul >
        );

    }
}

/**
* @name MapStateToProps
* @param {object} objState State object
* @param {object} objOwnProps Props passed
* @summary Returns list of objects used in the module
* @return {Array} Array of object list
*/
const MapStateToProps = (objState, objOwnProps) => {
    return ExtranetBase_Hook.MapStoreToProps([{ "StoreKey": "ApplicationState", "DataKey": "HighlightNavigations" + objOwnProps["Id"] }, { "StoreKey": "ApplicationState", "DataKey": "LoadNavigation" }, { "StoreKey": "ApplicationState", "DataKey": "OutletData" }]);
};

export default connect(MapStateToProps)(withRouter(MainNavigation));