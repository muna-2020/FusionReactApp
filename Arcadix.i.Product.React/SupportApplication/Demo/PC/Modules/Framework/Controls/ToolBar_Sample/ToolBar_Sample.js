// React related impoprts.
import React, { useReducer } from 'react';
import { connect } from 'react-redux';

//Base classes.
import * as Base_Hook from '@shared/Framework/BaseClass/Base_Hook';

//Module realted files.
import * as ToolBar_Sample_Hook from '@shared/SupportApplication/Demo/Modules/Framework/Controls/ToolBar_Sample/ToolBar_Sample_Hook';
import ToolBar_Sample_ModuleProcessor from '@shared/SupportApplication/Demo/Modules/Framework/Controls/ToolBar_Sample/ToolBar_Sample_ModuleProcessor';
import * as ToolBar_Sample_ResourceData from '@shared/SupportApplication/Demo/Modules/Framework/Controls/ToolBar_Sample/ToolBar_Sample_ResourceData';
import ToolBar from "@root/Framework/Controls/ToolBar/ToolBar";

/**
* @name ToolBar_Sample
* @param {object} props props
* @summary This component displays the sample for a tool bar
* @returns {object} div that displays a tool bar.
*/
const ToolBar_Sample = props => {
    /**
   * @name [state,dispatch]
   * @summary Define state and dispatch for the reducer to set state.
   * @returns {[]} state and dspatch
   */
    const [state, dispatch] = useReducer(Base_Hook.Reducer, ToolBar_Sample_Hook.GetInitialState());

    /**
    * @name objContext
    * @summary Groups state.dispatch and module object(s) in objContext.
    * @returns {object} objContext
    */
    let objContext = { state, props, dispatch, ["ToolBar_Sample_ModuleProcessor"]: new ToolBar_Sample_ModuleProcessor() };

    /**
    * @name useDataLoaded
    * @summary Makes showAnimation false in store.
    * @returns null
    */
    ToolBar_Sample_Hook.useDataLoaded(objContext);

    /**
    * @name GetContent
    * @param {object} props Passes props
    * @summary Forms the whole jsx required for the module.
    * @returns {object} jsx, React.Fragment
    */
    const GetContent = () => {
        return (
            <div className="toolbar-sample">
                <div>This component displays the sample for a tool bar. Click each tools and see the console.</div>
                <div className="top-navigation">
                    <div id="divRibbonContent" className="ribbon">
                        <ToolBar
                            Id={"ToolBar_Sample"}
                            Data={props.Data}
                            Resource={ToolBar_Sample_ResourceData.GetResourceData()}
                        />
                    </div>
                </div>
            </div>
        );
    };

    return state.IsLoadComplete ? GetContent() : <React.Fragment />;
};

/**
* @name DynamicStyles
* @param {object} props props
* @summary Required for css
* @returns {Array} arrStyles
*/
ToolBar_Sample.DynamicStyles = props => {
    return [
        props.JConfiguration.SupportApplication + "/Demo/PC/Modules/Framework/Controls/ToolBar_Sample/ToolBar_Sample.css"
    ];
};

export default connect(ToolBar_Sample_ModuleProcessor.GetStoreData())(ToolBar_Sample);