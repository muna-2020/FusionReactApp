// React related impoprts.
import React, { useReducer } from 'react';
import { connect } from 'react-redux';

//Base classes.
import * as Base_Hook from '@shared/Framework/BaseClass/Base_Hook';

//Module realted files.
import * as OfficeRibbon_Sample_Hook from '@shared/Application/c.ProductManagement/Modules/4_Example/Framework/Controls/OfficeRibbon_Sample/OfficeRibbon_Sample_Hook';
import OfficeRibbon_Sample_ModuleProcessor from '@shared/Application/c.ProductManagement/Modules/4_Example/Framework/Controls/OfficeRibbon_Sample/OfficeRibbon_Sample_ModuleProcessor';
import * as OfficeRibbon_Sample_ResourceData from '@shared/Application/c.ProductManagement/Modules/4_Example/Framework/Controls/OfficeRibbon_Sample/OfficeRibbon_Sample_ResourceData';
import OfficeRibbon from '@root/Framework/Controls/OfficeRibbon/OfficeRibbon';

/**
* @name OfficeRibbon_Sample
* @param {object} props props
* @summary This component displays the sample for a OfficeRibbon. OfficeRibbon consist of Tab on Top and contents on bottom.
 * The OfficeRibbon's contents can consist of -
 * a) ToolBar - For this, inside data you need to pass the key "ToolBarData".Please go through the documentation of ToolBar to know what kind of data you need to provide here.
 * b) Component - For this, inside data you need to pass the key "ComponentName". as a value you provide the name of that component which you want to display.
 * c) One which doesn’t show anything – Here you only send the text key. Generally, your module might need to do some action based on a Tab click. For that you can pass the key OnTabClick.
* @returns {object} div that displays a OfficeRibbon.
*/
const OfficeRibbon_Sample = props => {
    /**
    * @name [state,dispatch]
    * @summary Define state and dispatch for the reducer to set state.
    * @returns {[]} state and dspatch
    */
    const [state, dispatch] = useReducer(Base_Hook.Reducer, OfficeRibbon_Sample_Hook.GetInitialState());

    /**
    * @name objContext
    * @summary Groups state.dispatch and module object(s) in objContext.
    * @returns {object} objContext
    */
    let objContext = { state, props, dispatch, ["OfficeRibbon_Sample_ModuleProcessor"]: new OfficeRibbon_Sample_ModuleProcessor() };

    /**
    * @name useDataLoaded
    * @summary Makes showAnimation false in store.
    * @returns null
    */
    OfficeRibbon_Sample_Hook.useDataLoaded(objContext);

    /**
    * @name GetContent
    * @param {object} props Passes props
    * @summary Forms the whole jsx required for the module.
    * @returns {object} jsx, React.Fragment
    */
    const GetContent = () => {
        return (
            <div className="office-ribbon-sample">
                <div className="office-ribbon-summary">This component displays the sample for a OfficeRibbon. OfficeRibbon consist of Tab on Top and contents on bottom.
                     The OfficeRibbon's contents can consist of -
                    <div>
                        a) ToolBar - For this, inside data you need to pass the key "ToolBarData".Please go through the documentation of ToolBar to know what kind of data you need to provide here.
                      </div>
                    <div>
                        b) Component - For this, inside data you need to pass the key "ComponentName". as a value you provide the name of that component which you want to display.
                    </div>
                    <div>
                        c) One which doesn’t show anything – Here you only send the text key. Generally, your module might need to do some action based on a Tab click. For that you can pass the key OnTabClick.
                    </div>
                </div>
                <OfficeRibbon
                    Id={"OfficeRibbon_Sample"}
                    Data={props.Data}
                    Resource={OfficeRibbon_Sample_ResourceData.GetResourceData()}
                    ParentProps={{ ...props }}
                />
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
OfficeRibbon_Sample.DynamicStyles = props => {
    return [
        props.JConfiguration.SupportApplication + "/Demo/PC/Modules/Framework/Controls/OfficeRibbon_Sample/OfficeRibbon_Sample.css"
    ];
};

export default connect(OfficeRibbon_Sample_ModuleProcessor.GetStoreData())(OfficeRibbon_Sample);