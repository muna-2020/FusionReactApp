// React related impoprts.
import React, { useReducer, useEffect } from 'react';
import { connect } from 'react-redux';

//Base classes.
import * as Base_Hook from '@shared/Framework/BaseClass/Base_Hook';

//Module realted fies.
import * as Sample_Hook from '@shared/Application/c.ProductManagement/Modules/4_Example/ModuleDevelopment/Step7/Sample_Hook';
import Sample_ModuleProcessor from "@shared/Application/c.ProductManagement/Modules/4_Example/ModuleDevelopment/Step7/Sample_ModuleProcessor";

//Helper classes.
import ObjectQueue from '@shared/Framework/DataService/ObjectQueue/ObjectQueue';


const Sample = (props) => {

    /**
    * @name [state,dispatch]
    * @summary Define state and dispatch for the reducer to set state.
    * @returns {[]} state and dspatch
    */
    const [state, dispatch] = useReducer(Base_Hook.Reducer, Sample_Hook.GetInitialState());

    /**
    * @name objContext
    * @summary Groups state.dispatch and module object(s) in objContext.
    * @returns {object} objContext
    */
    let objContext = { state, props, dispatch, ["Sample_ModuleProcessor"]: new Sample_ModuleProcessor() };

    useEffect(() => {
        ApplicationState.SetProperty("blnShowAnimation", false);
    });

    /**
    * @name Initialize
    * @param {object} objContext context object
    * @summary Initialize method call in Sample_Hook, that contains all the custom hooks.
    * @returns null
    */
    Sample_Hook.Initialize(objContext);
    /**
    * @name GetContent
    * @summary Forms the whole jsx required for the module.
    * @returns {object} jsx, React.Fragment
    */
    const GetContent = () => {
        return (
            <div className="demo-table">
                In Step 6, The follwoing changes are required to be done in jsx.
    
                <ul>
                    <li>1. Initialise state object and define the reducer to change the state</li>
                    <li>2. Create object of module Processor and add state/props/dispatch and module object in single context object</li>
                    <li>3. Create GetContent() Method and move the whole Jsx there and return "React.Fragment"</li>

                </ul>

            </div>
        )
    }

    return (
        <React.Fragment>{
                <React.Fragment>{GetContent()}</React.Fragment>
        }
        </React.Fragment>
    );

}

Sample.DynamicStyles = props => {
    var arrStyles = [
        props.JConfiguration.DemoSkinPath + "/Css/Application/ReactJs/PC/Modules/Sample/Sample.css"
    ];
    return arrStyles;
};


export default Sample;

