//React Related Modules
import React, { useReducer } from 'react';

// Content Component import
import TestPropertyDetails from "@root/Application/c.Intranet/PC/Modules/3_Test/Test/TestBrowser/TestPropertyDetails/TestPropertyDetails";

//Module related import
import TestPropertyDetailsPrintVersion_ModuleProcessor from '@shared/Application/c.Intranet/Modules/3_Test/Test/TestBrowser/TestPropertyDetails/TestPropertyDetailsPrintVersion/TestPropertyDetailsPrintVersion_ModuleProcessor';

/**
* @name TestPropertyDetailsPrintVersion
* @param {object} props props object
* @summary TestPropertyDetailsPrintVersion for Test Preview direct calling content Component
* @returns {object} TestPropertyDetailsPrintVersion
*/
const TestPropertyDetailsPrintVersion = (props) => {

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     * @returns {object} objContext
     */
    let objContext = { props, ["ModuleName"]: "TestPropertyDetailsPrintVersion", ["TestPropertyDetailsPrintVersion_ModuleProcessor"]: new TestPropertyDetailsPrintVersion_ModuleProcessor() };

    /**
     * @name  Initialize
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns null
     */
    objContext.TestPropertyDetailsPrintVersion_ModuleProcessor.Initialize(objContext, objContext.TestPropertyDetailsPrintVersion_ModuleProcessor);

    /**
     * @name GetContent
     * @summary Forms the whole jsx required for the module.
     * @returns {object} jsx, React.Fragment
     */
    const GetContent = () => {
        return (
             <div className="testcontent-printversion">
                <div className="printversion-header">
                    <div className="top-left">
                        <img src={props.JConfiguration.WebDataPath + "Repo/Logo/" + props.JConfiguration.MainClientId + "/JLogo.svg"} />
                    </div>
                    <div className="top-right">
                        <div className="test-details" style={{ textAlign: "left" }}>
                            <b>Druckausgabe: </b>
                        </div>
                        <div className="test-details" style={{ textAlign: "left" }}>
                            <b>Test: </b> <b>{props.SelectedRow.vTestName}</b>
                        </div>
                    </div>
                </div>
               
                <div className="printversion-body">
                    <TestPropertyDetails
                        {...props}
                    />
                </div>
            </div>
        );
    };

    return GetContent();
}

export default TestPropertyDetailsPrintVersion;