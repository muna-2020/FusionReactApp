//React related imports...
import React, { useReducer } from "react";
import { connect } from 'react-redux';

//Base classes...
import * as IntranetBase_Hook from '@shared/Framework/BaseClass/IntranetBaseClass/IntranetBase_Hook';

//Module related files...
import TestPropertyDetails_ModuleProcessor from '@shared/Application/c.Intranet/Modules/3_Test/Test/TestBrowser/TestPropertyDetails/TestPropertyDetails_ModuleProcessor';
import * as TestPropertyDetails_Hook from '@shared/Application/c.Intranet/Modules/3_Test/Test/TestBrowser/TestPropertyDetails/TestPropertyDetails_Hook';
import BasicProperty from '@root/Application/c.Intranet/PC/Modules/3_Test/Test/TestBrowser/TestPropertyDetailsComponents/BasicProperty/BasicProperty';
//import Taxonomy from '@root/Application/c.Intranet/PC/Modules/3_Test/Test/TestBrowser/TestPropertyDetailsComponents/Taxonomy/Taxonomy';
import Language from '@root/Application/c.Intranet/PC/Modules/3_Test/Test/TestBrowser/TestPropertyDetailsComponents/Language/Language';
import Filter from '@root/Application/c.Intranet/PC/Modules/3_Test/Test/TestBrowser/TestPropertyDetailsComponents/Filter/Filter';
import Extras from '@root/Application/c.Intranet/PC/Modules/3_Test/Test/TestBrowser/TestPropertyDetailsComponents/Extras/Extras';
import Description from '@root/Application/c.Intranet/PC/Modules/3_Test/Test/TestBrowser/TestPropertyDetailsComponents/Description/Description';
import SecurityTestNumber from '@root/Application/c.Intranet/PC/Modules/3_Test/Test/TestBrowser/TestPropertyDetailsComponents/SecurityTestNumber/SecurityTestNumber';
import Algorithm from '@root/Application/c.Intranet/PC/Modules/3_Test/Test/TestBrowser/TestPropertyDetailsComponents/Algorithm/Algorithm';
import DisplayOptions from '@root/Application/c.Intranet/PC/Modules/3_Test/Test/TestBrowser/TestPropertyDetailsComponents/DisplayOptions/DisplayOptions';
import TimeKeepingExtras from '@root/Application/c.Intranet/PC/Modules/3_Test/Test/TestBrowser/TestPropertyDetailsComponents/TimeKeepingExtras/TimeKeepingExtras';
import HostHeader from '@root/Application/c.Intranet/PC/Modules/3_Test/Test/TestBrowser/TestPropertyDetailsComponents/HostHeader/HostHeader';
import PreLogin from '@root/Application/c.Intranet/PC/Modules/3_Test/Test/TestBrowser/TestPropertyDetailsComponents/PreLogin/PreLogin';
import LoginControl from '@root/Application/c.Intranet/PC/Modules/3_Test/Test/TestBrowser/TestPropertyDetailsComponents/LoginControl/LoginControl';
import WelcomePage from '@root/Application/c.Intranet/PC/Modules/3_Test/Test/TestBrowser/TestPropertyDetailsComponents/WelcomePage/WelcomePage';
import TestPage from '@root/Application/c.Intranet/PC/Modules/3_Test/Test/TestBrowser/TestPropertyDetailsComponents/TestPage/TestPage';
import FinalPage from '@root/Application/c.Intranet/PC/Modules/3_Test/Test/TestBrowser/TestPropertyDetailsComponents/FinalPage/FinalPage';
import ResultPage from '@root/Application/c.Intranet/PC/Modules/3_Test/Test/TestBrowser/TestPropertyDetailsComponents/ResultPage/ResultPage';
import SchoolYear from '@root/Application/c.Intranet/PC/Modules/3_Test/Test/TestBrowser/TestPropertyDetailsComponents/SchoolYear/SchoolYear';
import External from '@root/Application/c.Intranet/PC/Modules/3_Test/Test/TestBrowser/TestPropertyDetailsComponents/External/External';
import Adaptive from '@root/Application/c.Intranet/PC/Modules/3_Test/Test/TestBrowser/TestPropertyDetailsComponents/Adaptive/Adaptive';

/**
* @name TestPropertyDetails
* @param {object} props props
* @summary This component displays the Test Property details.
* @returns {object} jsx.
*/
const TestPropertyDetails = props => {

    /**
    * @name [state,dispatch]
    * @summary Define state and dispatch for the reducer to set state.
    * @returns {[]} state and dispatch
    */
    const [state, dispatch] = useReducer(IntranetBase_Hook.Reducer, TestPropertyDetails_Hook.GetInitialState(props));

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     * @returns {object} objContext
     */
    let objContext = { state, props, dispatch, ["ModuleName"]: "TestPropertyDetails", ["TestPropertyDetails_ModuleProcessor"]: new TestPropertyDetails_ModuleProcessor() };

    /**
     * @name  Initialize
     * @param {object} objContext objContext
     * @param {object} ModuleProcessor ModuleProcessor
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */

    objContext.TestPropertyDetails_ModuleProcessor.Initialize(objContext, objContext.TestPropertyDetails_ModuleProcessor);

    /**
     * @name Initialize
     * @param {object} objContext context object
     * @summary Initialize method call to load the custom hooks.
     * @returns null
     */
    TestPropertyDetails_Hook.Initialize(objContext);

    /**
    * @name GetContent
    * @summary Forms the whole jsx required for the module.
    * @returns {object} jsx
    */
    const GetContent = () => {
        var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/3_Test/Test", objContext.props) ?? {};//props.TextResource;
        let objTestDetails = objContext.TestPropertyDetails_ModuleProcessor.GetTestDetails(props.SelectedRow, objContext);
        return <div className="file-explorer-detail">
            <FillHeight
                Meta={{
                    HeaderIds: ["MasterHeader", "TaskTitle", "filterHeader","BreadCrumb","OfflineExecution","FilterBlock"],
                    FooterIds: [""]
                }}
                className="bgStyle"
                scrollStyle={{ overflow: "auto" }}
            >
                <h2>{Localization.TextFormatter(objTextResource, 'Test')}</h2>
                <BasicProperty
                    Data={{
                        TestData: objTestDetails
                    }}
                    Resource={{
                        Text: props.TextResource
                    }}
                />

                <Description
                    Data={{
                        TestData: objTestDetails
                    }}
                    Resource={{
                        Text: props.TextResource
                    }}
                />         

                <Extras
                    Data={{
                        TestData: objTestDetails
                    }}
                    Resource={{
                        Text: props.TextResource
                    }}
                />

                <SchoolYear Data={{
                    TestData: objTestDetails
                }}
                    Resource={{
                        Text: props.TextResource
                    }}
                />

                <Language Data={{
                    TestData: objTestDetails
                }}
                    Resource={{
                        Text: props.TextResource
                    }}
                />

                <SecurityTestNumber Data={{
                    TestData: objTestDetails
                }}
                    Resource={{
                        Text: props.TextResource
                    }}
                />

                <Filter
                    Data={{
                        TestData: objTestDetails
                    }}
                    Resource={{
                        Text: props.TextResource
                    }}
                />  

                <Algorithm
                    Data={{
                        TestData: objTestDetails
                    }}
                    Resource={{
                        Text: props.TextResource
                    }}
                /> 

                <Adaptive
                    Data={{
                        TestData: objTestDetails
                    }}
                    Resource={{
                        Text: props.TextResource
                    }}
                />

                <DisplayOptions
                    Data={{
                        TestData: objTestDetails
                    }}
                    Resource={{
                        Text: props.TextResource
                    }}
                /> 
                <TimeKeepingExtras
                    Data={{
                        TestData: objTestDetails
                    }}
                    Resource={{
                        Text: props.TextResource
                    }}
                /> 
                <HostHeader
                    Data={{
                        TestData: objTestDetails
                    }}
                    Resource={{
                        Text: props.TextResource
                    }}
                /> 
                <PreLogin
                    Data={{
                        TestData: objTestDetails
                    }}
                    Resource={{
                        Text: props.TextResource
                    }}
                /> 
                <LoginControl
                    Data={{
                        TestData: objTestDetails
                    }}
                    Resource={{
                        Text: props.TextResource
                    }}
                /> 
                <div>
                    <h3>{Localization.TextFormatter(objTextResource, "TermsandConditions")}</h3>
                    <table>
                        <tr><td style={{ color: "red" }}>To be implemented</td></tr>
                    </table>                
                </div>
                <WelcomePage
                    Data={{
                        TestData: objTestDetails
                    }}
                    Resource={{
                        Text: props.TextResource
                    }}
                /> 
                
                <TestPage
                    Data={{
                        TestData: objTestDetails
                    }}
                    Resource={{
                        Text: props.TextResource
                    }}
                />

                <FinalPage
                    Data={{
                        TestData: objTestDetails
                    }}
                    Resource={{
                        Text: props.TextResource
                    }}
                />

                <ResultPage
                    Data={{
                        TestData: objTestDetails
                    }}
                    Resource={{
                        Text: props.TextResource
                    }}
                /> 

                <External
                    Data={{
                        TestData: objTestDetails
                    }}
                    Resource={{
                        Text: props.TextResource
                    }}
                /> 

            </FillHeight>
        </div>;
    }

    return props.isLoadComplete || state.isLoadComplete ? GetContent() : <div className="file-explorer-detail-empty-message"/>;

};

export default connect(IntranetBase_Hook.MapStoreToProps(TestPropertyDetails_ModuleProcessor.StoreMapList()))(TestPropertyDetails);

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = TestPropertyDetails_ModuleProcessor; 