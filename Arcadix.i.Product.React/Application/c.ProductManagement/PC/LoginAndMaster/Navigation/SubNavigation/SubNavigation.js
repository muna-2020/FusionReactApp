// React related imports.
import React, {useReducer } from "react";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';

//Base classes.
import * as SubNavigation_Hook from '@shared/Application/c.ProductManagement/LoginAndMaster/Navigation/SubNavigation/SubNavigation_Hook';
import SubNavigation_ModuleProcessor from "@shared/Application/c.ProductManagement/LoginAndMaster/Navigation/SubNavigation/SubNavigation_ModuleProcessor";
import * as IntranetBase_Hook from "@shared/Framework/BaseClass/IntranetBaseClass/IntranetBase_Hook";

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

    /**
     * @name LoadNavigationOnRefresh
     * @param {any} objContext
     * @summary LoadNavigationOnRefresh
     */
    objContext.SubNavigation_ModuleProcessor.LoadNavigationForSSR(objContext);

    //custom hooks
    SubNavigation_Hook.Initialize(objContext);
    

    /**
     * @name GetContent
     * @param {any} props
     * @sumarry Forms the JSX for the SubNavigation...
     * @returns {object} JSX
     */
    const GetContent = () => {

        let objTreeData = objContext.SubNavigation_ModuleProcessor.GetTreeData(objContext);

        return <div name="SubDiv" className="h-100" onContextMenu={(e) => objContext.SubNavigation_ModuleProcessor.OnMainDivRightClick(objContext, e)}
        >
            <Tree
                Id="Tree_Master"
                Meta={objTreeData.Meta}
                Data={objTreeData.Data}
                Events={objContext.SubNavigation_ModuleProcessor.GetTreeEvents(objContext)}
                CallBacks={objContext.SubNavigation_ModuleProcessor.GetTreeCallBacks(objContext)}
                Resource={{
                    SkinPath: JConfiguration.IntranetSkinPath,
                    ImagePathDetails: { "Folder": "/Images/Framework/ReactJs/PC/Controls/Tree/folder_brown.png", "Module": "/Images/Framework/ReactJs/PC/Controls/Tree/Module.svg" }
                }}
                ParentProps={props}
            />
        </div>
    }

  return (

    <div className="sub-navigation" id="DivSubNavigation">
          {props.isLoadComplete || state.isLoadComplete ? GetContent() : <React.Fragment />}
    </div>
    
  );
};

export default withRouter(connect(IntranetBase_Hook.MapStoreToProps(SubNavigation_ModuleProcessor.StoreMapList()))(SubNavigation));
