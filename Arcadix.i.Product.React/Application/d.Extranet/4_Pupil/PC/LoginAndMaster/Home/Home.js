//React imports.
import React, { useEffect, useReducer } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux'

//Components.
import Navigation from '@root/Application/d.Extranet/4_Pupil/PC/LoginAndMaster/Navigation/Navigation';

//Base imports.
import * as ExtranetBase_Hook from '@shared/Framework/BaseClass/ExtranetBaseClass/ExtranetBase_Hook';

//Module specific
import Home_ModuleProcessor from '@shared/Application/d.Extranet/4_Pupil/PC/LoginAndMaster/Home/Home_ModuleProcessor';
import * as Home_Hook from '@shared/Application/d.Extranet/4_Pupil/PC/LoginAndMaster/Home/Home_Hook';

const Home = (props) => {

    useEffect(() => {
        // hide dropdown nav if open
        if (document.getElementById('dropDownNavigation')) {
            document.getElementById('dropDownNavigation').style.display = 'none';
        }
        //if (props.DropDownNavigationRef.current)
        //    props.DropDownNavigationRef.current.style.display = 'none';
    }, [])

    /**
    * @name [state,dispatch]
    * @summary Define state and dispatch for the reducer to set state.
    * @returns {[]} state and dispatch
    */
    const [state, dispatch] = useReducer(ExtranetBase_Hook.Reducer, Home_Hook.GetInitialState(props));

    /**
    * @name objContext
    * @summary Groups state, dispatch and module processor, TextResource object in objContext.
    * @returns {object} objContext
    */
    let objContext = { state, props, dispatch, ["ModuleName"]: "Home", ["Home_ModuleProcessor"]: new Home_ModuleProcessor() };

    objContext.Home_ModuleProcessor.Initialize(objContext, objContext.Home_ModuleProcessor);

    /**
    * @name Initialize
    * @param {object} objContext context object
    * @summary Initialize method call in Home_Hook, that contains all the custom hooks.
    * @returns null
    */
    Home_Hook.Initialize(objContext);

    /**
     * @name GetContent
     * @summary returns the jsx for the component.
     * */
    function GetContent() {
        let objNavigation = {};
        if (DataRef(props.Object_Framework_Services_ExtranetNavigation, "Object_Framework_Services_ExtranetNavigation;ApplicationType;" + props.JConfiguration.ApplicationTypeId)) {
            objNavigation = DataRef(props.Object_Framework_Services_ExtranetNavigation, "Object_Framework_Services_ExtranetNavigation;ApplicationType;" + props.JConfiguration.ApplicationTypeId)["Data"][0];
        }
        let strApplicationName = "";
        if (Object.keys(objNavigation).length > 0) {
            strApplicationName = Object.keys(objNavigation)[1];
        }
        let arrNavigationData = objNavigation[strApplicationName];
        const arrMainNavigationData = arrNavigationData ? arrNavigationData.filter(x => x.iParentNavigationId != -1 && x.iParentNavigationId != -2) : [];
        let objTextResource = Object_Framework_Services_TextResource.GetData("/d.Extranet/4_Pupil/LoginAndMaster/Master", props);
        return (
            <div className="home-page-nav-wrapper">
                {props.ShowTestMessage && props.ShowTestMessage.ShowEssayTestMessage ? <div>{Localization.TextFormatter(objTextResource, "EssayTestMessage")}</div> : <React.Fragment />}
                {props.ShowTestMessage && props.ShowTestMessage.ShowNotActiveTestMessage ? <div>{Localization.TextFormatter(objTextResource, "NotActivatedMessage")}</div> : <React.Fragment />}

                <div className="pupil-secondary-navigation home-page-bottom-navigation">
                    <Navigation ClientUserDetails={props.ClientUserDetails} IsFromHome={true} ShowNavigations={true} ComponentController={props.ComponentController} JConfiguration={props.JConfiguration} ParentName="Home" arrMainNavigationData={arrMainNavigationData} SecondaryNav={true} />
                </div>
            </div>
        )
    }

    return (
        <React.Fragment>
            {props.isLoadComplete || state.isLoadComplete ? GetContent(props) : <React.Fragment />}
        </React.Fragment>
    );
}

export default withRouter(connect(ExtranetBase_Hook.MapStoreToProps(Home_ModuleProcessor.StoreMapList()))(Home));
