// React related imports.
import React, { useReducer } from 'react';
import { connect } from 'react-redux';

//Base classes.
import * as CockpitBase_Hook from '@shared/Framework/BaseClass/CockpitBaseClass/CockpitBase_Hook';

//Module related fies.
import * as TestCaseStep_Hook from '@shared/Application/c.ProductManagement/Modules/3.1.1_TestCaseStep/TestCaseStep_Hook';
import TestCaseStep_ModuleProcessor from '@shared/Application/c.ProductManagement/Modules/3.1.1_TestCaseStep/TestCaseStep_ModuleProcessor';
import * as TestCaseStep_MetaData from '@shared/Application/c.ProductManagement/Modules/3.1.1_TestCaseStep/TestCaseStep_MetaData';


/**
* @name TestCaseStep
* @param {object} props props
* @summary This component displays the TestCaseStep data
* @returns {object} React.Fragement that contains TestCaseStep details.
*/
const TestCaseStep = props => {

    /**
    * @name [state,dispatch]
    * @summary Define state and dispatch for the reducer to set state.
    * @returns {[]} state and dispatch
    */
    const [state, dispatch] = useReducer(CockpitBase_Hook.Reducer, TestCaseStep_Hook.GetInitialState(props));

    /**
    * @name objContext
    * @summary Groups state.dispatch and module object(s) in objContext.
    * @returns {object} objContext
    */
    let objContext = { state, props, dispatch, ["ModuleName"]: "TestCaseStep", ["TestCaseStep_ModuleProcessor"]: new TestCaseStep_ModuleProcessor() };

    /**
     * @name  Initialize
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns null
     */
    objContext.TestCaseStep_ModuleProcessor.Initialize(objContext, objContext.TestCaseStep_ModuleProcessor);

    /**
     * @name Initialize
     * @param {object} objContext context object
     * @summary Initialize method call to load the custom hooks.
     * @returns null
     */
    TestCaseStep_Hook.Initialize(objContext);

    /**
    * @name GetContent
    * @summary Forms the whole jsx required for the module.
    * @returns {object} jsx
    */
    const GetContent = () => {
        return <Grid
            Id='TestCaseStepGrid'
            Meta={{ ...TestCaseStep_MetaData.GetMetaDataForTestCaseStep(), Filter: { "cIsDeleted": "N" } }}
            Resource={objContext.TestCaseStep_ModuleProcessor.GetResourceData(objContext)}
            Data={{
                RowData: DataRef(objContext.props.Object_DevServer_ProductManagement_TestCaseStep, "Object_DevServer_ProductManagement_TestCaseStep;uTestCaseId;" + objContext.props.Data.uTestCaseId)["Data"]
            }}
            Events={{
                OnClickRow: (Data, event) => objContext.TestCaseStep_ModuleProcessor.OnClickRow(Data.SelectedRow, objContext),
            }}
            ParentProps={{ ...objContext.props }}
        />

    }

    return (
        <React.Fragment>{props.isLoadComplete || state.isLoadComplete ?
            <React.Fragment>{GetContent()}</React.Fragment> : <React.Fragment></React.Fragment>}
        </React.Fragment>
    );
}

export default connect(CockpitBase_Hook.MapStoreToProps(TestCaseStep_ModuleProcessor.StoreMapList()))(TestCaseStep);