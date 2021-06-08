// React related imports.
import React, { useReducer } from 'react';
import { connect } from 'react-redux';

//Base classes.
import * as Base_Hook from '@shared/Framework/BaseClass/Base_Hook';

//Module related files.
import * as Tree_Sample_Hook from '@shared/SupportApplication/Demo/Modules/Framework/Controls/Tree_Sample/Tree_Sample/Tree_Sample_Hook';
import Tree_Sample_ModuleProcessor from '@shared/SupportApplication/Demo/Modules/Framework/Controls/Tree_Sample/Tree_Sample/Tree_Sample_ModuleProcessor';

//Components used
import Tree from '@root/Framework/Controls/Tree/Tree';

/**
* @name Tree
* @param {object} props props
* @summary This component displays the Tree_Sample.
* @returns {object} JSX.
*/
const Tree_Sample = props => {

    /**
   * @name [state,dispatch]
   * @summary Define state and dispatch for the reducer to set state.
   * @returns {[]} state and dspatch
   */
    const [state, dispatch] = useReducer(Base_Hook.Reducer, Tree_Sample_Hook.GetInitialState());

    /**
    * @name objContext
    * @summary Groups state.dispatch and module object(s) in objContext.
    * @returns {object} objContext
    */
    let objContext = { state, props, dispatch, ["Tree_Sample_ModuleProcessor"]: new Tree_Sample_ModuleProcessor() };

    /**
    * @name useDataLoaded
    * @summary Makes showAnimation false in store.
    * @returns null
    */
    Tree_Sample_Hook.useDataLoaded(objContext);

    /**
    * @name GetContent
    * @summary JSX formation 
    * @returns {object} JSX
    */
    const GetContent = () => {
        return <Tree
            Id={"Tree_Sample1"}
            Meta={objContext.Tree_Sample_ModuleProcessor.GetMeta()}
            Data={props.Data}
            Events={objContext.Tree_Sample_ModuleProcessor.GetEvents()}
            CallBacks={objContext.Tree_Sample_ModuleProcessor.GetCallBacks()}
            Resource={objContext.Tree_Sample_ModuleProcessor.GetResourceData()}
        />;
    }

    return GetContent();
}

/**
 * @summary returns styles required for the module
 * @param {object} props component props
 * @returns {React.Component} react component
 */
Tree_Sample.DynamicStyles = (props) => {
    return [
        props.JConfiguration.IntranetSkinPath + "/Css/Framework/ReactJs/PC/Controls/Tree/Tree.css",

    ];
};

export default connect(Tree_Sample_ModuleProcessor.GetStoreData())(Tree_Sample);