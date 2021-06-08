// React related imports.
import React, {useReducer } from "react";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
//Base classes.
import * as IntranetBase_Hook from "@shared/Framework/BaseClass/IntranetBaseClass/IntranetBase_Hook";
import * as SubNavigation_Hook from '@shared/Application/c.Intranet/LoginAndMaster/Navigation/SubNavigation/SubNavigation_Hook';
import SubNavigation_ModuleProcessor from "@shared/Application/c.Intranet/LoginAndMaster/Navigation/SubNavigation/SubNavigation_ModuleProcessor";
//Component used
import Tree from '@root/Framework/Controls/Tree/Tree';

/**
 * @name SubNavigation
 * @param {*} props
 * @returns {object} React.Fragement to form the SubNavigation.
 */
const SubNavigation = props => {

    /**
    * @name [state,dispatch]
    * @summary Define state and dispatch for the reducer to set state.
    * @returns {[]} state and dispatch
    */
    const [state, dispatch] = useReducer(IntranetBase_Hook.Reducer, SubNavigation_Hook.GetInitialState(props));

    let objContext = { state, props, dispatch, ["ModuleName"]: "SubNavigation", ["SubNavigation_ModuleProcessor"]: new SubNavigation_ModuleProcessor() };
    /**
     * @name  Initialize
     * @param {object} objContext context object
     * @param {object} ModuleProcessor Props
     * @summary Initializing API and DynamicStyles
     * @returns null
     */
    objContext.SubNavigation_ModuleProcessor.Initialize(objContext, objContext.SubNavigation_ModuleProcessor);

    //custom hooks
    SubNavigation_Hook.Initialize(objContext);

    /**
    * When ActiveSubNavigationId changes in Redux(when the MainNavigation is Changed),
    * Selects the First one from the SubNavigation and does the Routing as well(by calling the OnSubNavigationClick)...
    */
    SubNavigation_Hook.useNavigateOnMainNavigationChange(objContext);

    /**
    * Does the routing for the First SubNavigation based on the URL...
    */
    SubNavigation_Hook.useLoadNavigationOnRefresh(objContext);

    /**
     * @name GetContent
     * @param {any} props
     * @sumarry Forms the JSX for the SubNavigation...
     * @returns {object} JSX
     */
    const GetContent = (props) => {
        //let Tree = props.ComponentController.GetFrameworkComponent("Tree");
        let objTreeData = objContext.SubNavigation_ModuleProcessor.GetTreeData(objContext);
        let blnLoadComplete = (props.ActiveMainNavigationId == -1 || props.ActiveMainNavigationId == -2) ? state.blnFoldersLoaded : true;
    
        return <Tree
            Id="Tree_Master"
            Meta={objTreeData.Meta}
            Data={objTreeData.Data}
            Events={objContext.SubNavigation_ModuleProcessor.GetTreeEvents(objContext)}
            CallBacks={objContext.SubNavigation_ModuleProcessor.GetTreeCallBacks(objContext)}
            Resource={{
                SkinPath: JConfiguration.IntranetSkinPath,
            }}
            ParentProps={props}
        />
    }

    return props.isLoadComplete || ((props.ActiveMainNavigationId == -1 || props.ActiveMainNavigationId == -2) ? state.blnFoldersLoaded : props.ActiveSubNavigationId) ? GetContent(props) : <React.Fragment />;

}

export default withRouter(connect(IntranetBase_Hook.MapStoreToProps(SubNavigation_ModuleProcessor.StoreMapList()))(SubNavigation));