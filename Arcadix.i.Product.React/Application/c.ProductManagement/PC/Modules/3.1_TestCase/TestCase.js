// React related imports.
import React, { useReducer } from 'react';
import { connect } from 'react-redux';

//Base classes.
import * as CockpitBase_Hook from '@shared/Framework/BaseClass/CockpitBaseClass/CockpitBase_Hook';

//Module related fies.
import * as TestCase_Hook from '@shared/Application/c.ProductManagement/Modules/3.1_TestCase/TestCase_Hook';
import TestCase_ModuleProcessor from '@shared/Application/c.ProductManagement/Modules/3.1_TestCase/TestCase_ModuleProcessor';
import * as TestCase_MetaData from '@shared/Application/c.ProductManagement/Modules/3.1_TestCase/TestCase_MetaData';
import DocumentDetails from '@root/Application/c.ProductManagement/PC/Modules/7_Shared/DocumentDetails/DocumentDetails';

/**
* @name TestCase
* @param {object} props props
* @summary This component displays the TestCase data
* @returns {object} React.Fragement that contains TestCase details.
*/
const TestCase = props => {

    /**
    * @name [state,dispatch]
    * @summary Define state and dispatch for the reducer to set state.
    * @returns {[]} state and dispatch
    */
    const [state, dispatch] = useReducer(CockpitBase_Hook.Reducer, TestCase_Hook.GetInitialState(props));

    /**
    * @name objContext
    * @summary Groups state.dispatch and module object(s) in objContext.
    * @returns {object} objContext
    */
    let objContext = { state, props, dispatch, ["ModuleName"]: "TestCase", ["TestCase_ModuleProcessor"]: new TestCase_ModuleProcessor() };

    /**
     * @name  Initialize
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns null
     */
    objContext.TestCase_ModuleProcessor.Initialize(objContext, objContext.TestCase_ModuleProcessor);

    /**
     * @name Initialize
     * @param {object} objContext context object
     * @summary Initialize method call to load the custom hooks.
     * @returns null
     */
    TestCase_Hook.Initialize(objContext);

    /**
    * @name GetContent
    * @summary Forms the whole jsx required for the module.
    * @returns {object} jsx
    */
    const GetContent = () => {
        let arrTestCaseData = DataRef(objContext.props.Object_DevServer_ProductManagement_TestCase, "Object_DevServer_ProductManagement_TestCase;uUseCaseId;" + objContext.props.Data.UseCaseId)["Data"];
        arrTestCaseData = arrTestCaseData?.sort((a, b) => a.iOrderId - b.iOrderId) ?? [];
        let objSelectedRow = ApplicationState.GetProperty("SelectedRows")?.["TestCaseGrid"]?.[0];
        let objPageJson = objContext.state.objPageJson != null ? objContext.state.objPageJson["iPageId"] == objSelectedRow["iPageId"] ? objContext.state.objPageJson : {} : {}

        return <div className="file-explorer-container" id="UseCase">
            <div className="file-explorer-flex">
                <SplitPane
                    Meta={{ SplitDirection: "vertical", MinSize: 50, DefaultSize: "70%" }}
                >
                    <div className="usecase-grid-holder">
                        <Grid
                            Id='TestCaseGrid'
                            Meta={{ ...TestCase_MetaData.GetMetaDataForTestCase(), Filter: { "cIsDeleted": "N" } }}
                            Resource={objContext.TestCase_ModuleProcessor.GetResourceData(objContext)}
                            Data={{
                                RowData: arrTestCaseData ? arrTestCaseData : []
                            }}
                            Events={{
                                OnDoubleClick: (objSelectedRow) => { props.Events.OnDoubleClick(objSelectedRow) },
                                OnClickRow: (Data, event) => objContext.TestCase_ModuleProcessor.OnClickRow(Data.SelectedRow, objContext),
                            }}
                            //CallBacks={objContext.ImplementationStep_ModuleProcessor.GetImplementationStepGridCallBacks(objContext)}
                            ParentProps={{ ...objContext.props.ParentProps }}
                        />
                    </div>
                    <div className="file-explorer-detail">
                        {
                            objSelectedRow
                                ?
                                <DocumentDetails
                                    {...props}
                                    Data={{
                                        ModuleId: objSelectedRow.uUseCaseImplementationStepId,
                                        DisplayData: objSelectedRow,
                                        objPageJson: objPageJson
                                    }}
                                />
                                :
                                <div>Please Select TestCase</div>
                        }
                    </div>
                </SplitPane>
            </div>
        </div>;
    }

    return (
        <React.Fragment>{props.isLoadComplete || state.isLoadComplete ?
            <React.Fragment>{GetContent()}</React.Fragment> : <React.Fragment></React.Fragment>}
        </React.Fragment>
    );
}

export default connect(CockpitBase_Hook.MapStoreToProps(TestCase_ModuleProcessor.StoreMapList()))(TestCase);

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = TestCase_ModuleProcessor;