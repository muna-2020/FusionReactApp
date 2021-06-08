// React related impoprts.
import React, { useReducer } from 'react';
import { connect } from 'react-redux';

//Base classes.
import * as Base_Hook from '@shared/Framework/BaseClass/Base_Hook';

//Module realted files.
import * as Tab_Sample_Hook from '@shared/Application/c.ProductManagement/Modules/4_Example/Framework/Controls/Tab_Sample/Tab_Sample_Hook';
import Tab_Sample_ModuleProcessor from '@shared/Application/c.ProductManagement/Modules/4_Example/Framework/Controls/Tab_Sample/Tab_Sample_ModuleProcessor';
import Tab from '@root/Framework/Controls/Tab/Tab';

/**
* @name Tab_Sample
* @param {object} props props
* @summary This component displays the sample for a tab
* @returns {object} div that displays a tab.
*/
const Tab_Sample = props => {

    /**
    * @name [state,dispatch]
    * @summary Define state and dispatch for the reducer to set state.
    * @returns {[]} state and dspatch
    */
    const [state, dispatch] = useReducer(Base_Hook.Reducer, Tab_Sample_Hook.GetInitialState());

    /**
    * @name objContext
    * @summary Groups state.dispatch and module object(s) in objContext.
    * @returns {object} objContext
    */
    let objContext = { state, props, dispatch, ["Tab_Sample_ModuleProcessor"]: new Tab_Sample_ModuleProcessor() };

    /**
    * @name useDataLoaded
    * @summary Makes showAnimation false in store.
    * @returns null
    */
    Tab_Sample_Hook.useDataLoaded(objContext);

    /**
    * @name GetContent
    * @param {object} props Passes props
    * @summary Forms the whole jsx required for the module.
    * @returns {object} jsx, React.Fragment
    */
    const GetContent = () => {
        return (
            <div className="tab-sample">
                <div>This component displays the sample for a tab. Click each tab and see the console.</div>
                <div className="top-navigation">
                    <div className="nav-bar">
                        <div className="nav-bar inner-content-nav">
                            <Tab
                                Id={"Tab_Sample"}
                                Data={props.Data}
                                Events={objContext.Tab_Sample_ModuleProcessor.GetEvents()}
                            />
                        </div>
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
Tab_Sample.DynamicStyles = props => {
    return [
        props.JConfiguration.SupportApplication + "/Demo/PC/Modules/Framework/Controls/Tab_Sample/Tab_Sample.css"
    ];
};

export default connect(Tab_Sample_ModuleProcessor.GetStoreData())(Tab_Sample);