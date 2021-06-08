// React related imports.
import React, { useReducer } from 'react';
import { connect } from 'react-redux';

//Module related fies.
import TestPdf_ModuleProcessor from '@shared/Application/c.Intranet/Modules/3_Test/Test/TestActions/TestPdf/TestPdf_ModuleProcessor';
import * as TestPdf_Hook from '@shared/Application/c.Intranet/Modules/3_Test/Test/TestActions/TestPdf/TestPdf_Hook';

/**
 * @name TestPdf
 * @param {object} props props
 * @summary This component is used to Assign Task To Test.
 * @returns {object} React.Fragement that contains the content to be added in popup required for TestPdf.
 */
const TestPdf = props => {

    /**
    * @name [state,dispatch]
    * @summary Define state and dispatch for the reducer to set state.
    * @returns {[]} state and dispatch
    */
    const [state, dispatch] = useReducer(IntranetBase_Hook.Reducer, TestPdf_Hook.GetInitialState(props));

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     * @returns {object} objContext
     */
    let objContext = { state, props, dispatch, ["TestPdf_ModuleProcessor"]: new TestPdf_ModuleProcessor(), ["Object_Framework_Services_TextResource"]: Object_Framework_Services_TextResource };

    /**
     * @name  InitializeDataForSSR
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.TestPdf_ModuleProcessor.Initialize(objContext, objContext.TestPdf_ModuleProcessor); 

    /**
      * @name Initialize
      * @param {object} objContext context object
      * @summary Initialize method call in AddEditTask_Hook, that contains all the custom hooks.
      * @returns null
      */
    TestPdf_Hook.Initialize(objContext);

    /**
     * @summary JSX for TestPdf
     */
    function GetContent() {
        var objTextResource = objContext.Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/3_Test/Test/TestActions/PrintToPdf", objContext.props);
        return <div className="print-to-pdf-parent">
           
            <div className="print-to-pdf-content-flex">
                <div className="mb-20">{objTextResource.Message}</div>

                <div className="col col-1">
                    <div className="col-item">
                        <div className="row-left nowrap">
                            {Localization.TextFormatter(objTextResource, "ExecutionName")}
                        </div>
                        <div className="row-right">
                            <input
                                type="text"
                                id="ExecutionName"
                                style={{ "width": "250px" }}
                                value={objContext.state.vTestPdfName}
                                onChange={() => { objContext.TestPdf_ModuleProcessor.HandleChange(objContext, event) }}
                            />
                        </div>
                    </div>
                </div>

                <div className="col col-1">
                    <div className="col-item">
                        <div className="row-left nowrap">
                            InputStatus
                        </div>
                        <div className="row-right" style={{ color: "red" }}>
                            (-NI-)
                        </div>
                    </div>
                </div>
            </div>
            <div className="print-to-pdf-footer">
                <button className="ptp-btn" onClick={() => objContext.TestPdf_ModuleProcessor.InsertOfflineExecutionDetails(objContext)}>
                    Okay
                </button>
                <button className="ptp-btn" onClick={() => { Popup.ClosePopup(props.Id); }}>
                    Cancel
                </button>
            </div>
        </div>
    }

    return props.isLoadComplete || state.isLoadComplete ? GetContent() : <React.Fragment />;

}

export default connect(IntranetBase_Hook.MapStoreToProps(TestPdf_ModuleProcessor.StoreMapList()))(TestPdf);
