//React related imports.
import React, { useReducer } from 'react';
import { connect } from 'react-redux';


//Module related files.
import * as AddEditHighStakeAdaptiveTest_Hook from '@shared/Application/c.Intranet/Modules/3_Test/Test/TestBrowser/TestMaster/HighStakeAdaptiveTest/AddEditHighStakeAdaptiveTest/AddEditHighStakeAdaptiveTest_Hook';
import AddEditHighStakeAdaptiveTest_ModuleProcessor from '@shared/Application/c.Intranet/Modules/3_Test/Test/TestBrowser/TestMaster/HighStakeAdaptiveTest/AddEditHighStakeAdaptiveTest/AddEditHighStakeAdaptiveTest_ModuleProcessor';
import BasicProperty from "@root/Application/c.Intranet/PC/Modules/3_Test/Test/TestBrowser/AddEditComponents/BasicProperty/BasicProperty";
import Description from "@root/Application/c.Intranet/PC/Modules/3_Test/Test/TestBrowser/AddEditComponents/Description/Description";
import Extras from "@root/Application/c.Intranet/PC/Modules/3_Test/Test/TestBrowser/AddEditComponents/Extras/Extras";
import Language from "@root/Application/c.Intranet/PC/Modules/3_Test/Test/TestBrowser/AddEditComponents/Language/Language";
import Filter from "@root/Application/c.Intranet/PC/Modules/3_Test/Test/TestBrowser/AddEditComponents/Filter/Filter";
import Security from "@root/Application/c.Intranet/PC/Modules/3_Test/Test/TestBrowser/AddEditComponents/Security/Security";
import DisplayOptions from "@root/Application/c.Intranet/PC/Modules/3_Test/Test/TestBrowser/AddEditComponents/DisplayOptions/DisplayOptions";
import TimeKeepingExtras from "@root/Application/c.Intranet/PC/Modules/3_Test/Test/TestBrowser/AddEditComponents/TimeKeepingExtras/TimeKeepingExtras";
import HostHeader from "@root/Application/c.Intranet/PC/Modules/3_Test/Test/TestBrowser/AddEditComponents/HostHeader/HostHeader";
import PreLogin from "@root/Application/c.Intranet/PC/Modules/3_Test/Test/TestBrowser/AddEditComponents/PreLogin/PreLogin";
import LoginControl from "@root/Application/c.Intranet/PC/Modules/3_Test/Test/TestBrowser/AddEditComponents/LoginControl/LoginControl";
import WelcomePage from "@root/Application/c.Intranet/PC/Modules/3_Test/Test/TestBrowser/AddEditComponents/WelcomePage/WelcomePage";
import TestPage from "@root/Application/c.Intranet/PC/Modules/3_Test/Test/TestBrowser/AddEditComponents/TestPage/TestPage";
import FinalPage from "@root/Application/c.Intranet/PC/Modules/3_Test/Test/TestBrowser/AddEditComponents/FinalPage/FinalPage";
import ResultPage from "@root/Application/c.Intranet/PC/Modules/3_Test/Test/TestBrowser/AddEditComponents/ResultPage/ResultPage";
import AdaptiveAlgorithm from "@root/Application/c.Intranet/PC/Modules/3_Test/Test/TestBrowser/AddEditComponents/AdaptiveAlgorithm/AdaptiveAlgorithm";
import Adaptive from "@root/Application/c.Intranet/PC/Modules/3_Test/Test/TestBrowser/AddEditComponents/Adaptive/Adaptive";
import Audit from '@root/Framework/Blocks/Audit/Audit';

/**
* @name AddEditHighStakeAdaptiveTest.
* @param {object} props props.
* @summary This component is used to Add/Edit the AddEditHighStakeAdaptiveTest data.
* @returns {object} React.Fragement that contains the content to be added in popup required for add/edit.
*/
const AddEditHighStakeAdaptiveTest = (props) => {

    /**
   * @name [state,dispatch]
   * @summary Define state and dispatch for the reducer to set state.
   * @returns {[]} state and dispatch
   */
    const [state, dispatch] = useReducer(IntranetBase_Hook.Reducer, AddEditHighStakeAdaptiveTest_Hook.GetInitialState());

    /**
    * @name objContext
    * @summary Groups state.dispatch and module object(s) in objContext.
    * @returns {object} objContext
    */
    let objContext = { state, props, dispatch, "AddEditHighStakeAdaptiveTest_ModuleProcessor": new AddEditHighStakeAdaptiveTest_ModuleProcessor() };

    /**
    * @name Initialize
    * @param {object} objContext context object
    * @summary Initialize method call in AddEditLanguage_Hook, that contains all the custom hooks.
    * @returns null
    */
    AddEditHighStakeAdaptiveTest_Hook.Initialize(objContext);

    const GetContent = () => {
        return <div className="addedit-test">
            <div id="General"
                style={{ display: (state.strDivToShow == "General" ? "block" : "none") }}
                className="task-tabcontent">
                <BasicProperty
                    ref={state.objComponentRefs.BasicPropertyRef}
                    Data={{
                        DisplayData: state.objData,
                        DropdownData: {
                            SubjectData: props.Data.DropDownData.arrSubjectData,
                            SkinData: props.Data.DropDownData.arrSkinData
                        },
                        TestType: props.Data.Type,
                        IsEdit: props.Data.IsEdit,
                        IsSaveClicked: state.blnSaveClicked
                    }}
                    Resource={{
                        Text: props.Resource.Text,
                        SkinPath: props.Resource.SkinPath
                    }}
                    Events={{
                        OnKeyDown: (e) => objContext.AddEditHighStakeAdaptiveTest_ModuleProcessor.HandleEnterKeyDown(e, objContext.AddEditHighStakeAdaptiveTest_ModuleProcessor, objContext)
                    }}
                    ParentProps={{ ...props }}
                />

                <Description
                    ref={state.objComponentRefs.DescriptionRef}
                    Data={{
                        DisplayData: state.objData,
                        IsEdit: props.Data.IsEdit,
                        IsSaveClicked: state.blnSaveClicked
                    }}
                    Resource={{
                        Text: props.Resource.Text,
                        SkinPath: props.Resource.SkinPath
                    }}
                    ParentProps={{ ...props }}
                />

                <Extras
                    ref={state.objComponentRefs.ExtrasRef}
                    Data={{
                        DisplayData: state.objData,
                        IsEdit: props.Data.IsEdit,
                        IsSaveClicked: state.blnSaveClicked
                    }}
                    Resource={{
                        Text: props.Resource.Text,
                        SkinPath: props.Resource.SkinPath
                    }}
                    Events={{
                        OnKeyDown: (e) => objContext.AddEditHighStakeAdaptiveTest_ModuleProcessor.HandleEnterKeyDown(e, objContext.AddEditHighStakeAdaptiveTest_ModuleProcessor, objContext)
                    }}
                    ParentProps={{ ...props }}
                />

                <Language
                    ref={state.objComponentRefs.LanguageRef}
                    Data={{
                        DisplayData: state.objData,
                        MainClientLanguageData: props.Data.MainClientLanguageData,
                        LanguageData: props.Data.LanguageData,
                        MultiLanguageData: props.Data.MultiLanguageData,
                        IsEdit: props.Data.IsEdit
                    }}
                    Resource={{
                        Text: props.Resource.Text,
                        SkinPath: props.Resource.SkinPath,
                        JConfiguration: props.Resource.JConfiguration
                    }}
                    ParentProps={{ ...props }}
                />

                <div>
                    <div className="title">{Localization.TextFormatter(props.Resource.Text, "SecurityTestNumber")}</div>
                    <div className="mb-10" style={{ color: "red" }}> To be implemented (Pupil and Teacher templates)</div>
                </div>

                <Filter
                    ref={state.objComponentRefs.FilterRef}
                    Data={{
                        DisplayData: state.objData,
                        IsEdit: props.Data.IsEdit
                    }}
                    Resource={{
                        Text: props.Resource.Text,
                        SkinPath: props.Resource.SkinPath
                    }}
                    ParentProps={{ ...props }}
                />
            </div>

            <div id="Security"
                style={{ display: (state.strDivToShow == "Security" ? "block" : "none") }}
                className="task-tabcontent">
                <Security
                    ref={state.objComponentRefs.SecurityRef}
                    Data={{
                        DisplayData: state.objData,
                        IsEdit: props.Data.IsEdit
                    }}
                    Resource={{
                        Text: props.Resource.Text,
                        SkinPath: props.Resource.SkinPath
                    }}
                    ParentProps={{ ...props }}
                />
            </div>

            <div id="Algorithm"
                style={{ display: (state.strDivToShow == "Algorithm" ? "block" : "none") }}>
                <AdaptiveAlgorithm
                    ref={state.objComponentRefs.AdaptiveAlgorithmRef}
                    Data={{
                        DisplayData: state.objData,
                        AlgorithmData: props.Data.AlgorithmData,
                        IsEdit: props.Data.IsEdit,
                        SubjectId: ApplicationState.GetProperty("SubjectId") ? ApplicationState.GetProperty("SubjectId") : -1,
                        SubjectData: props.Data.DropDownData.arrSubjectData,
                        DropdownData: {
                            SeparationAndCalibrationGroupData: props.Data.DropDownData.arrSeparationAndCalibrationGroupData
                        },
                    }}
                    Resource={{
                        Text: props.Resource.Text,
                        SkinPath: props.Resource.SkinPath
                    }}  
                    Events={{
                        OnKeyDown: (e) => objContext.AddEditHighStakeAdaptiveTest_ModuleProcessor.HandleEnterKeyDown(e, objContext.AddEditHighStakeAdaptiveTest_ModuleProcessor, objContext)
                    }}
                    ParentProps={{ ...props }}
                />
            </div>

            <div id="Adaptive"
                style={{ display: (state.strDivToShow == "Adaptive" ? "block" : "none") }}
                className="task-tabcontent">
                <Adaptive
                    ref={state.objComponentRefs.AdaptiveRef}
                    Data={{
                        DisplayData: state.objData,
                        IsEdit: props.Data.IsEdit,
                        SubjectId: ApplicationState.GetProperty("SubjectId") ? ApplicationState.GetProperty("SubjectId") : -1,
                        SubjectData: props.Data.DropDownData.arrSubjectData
                    }}
                    Resource={{
                        Text: props.Resource.Text,
                        SkinPath: props.Resource.SkinPath
                    }}
                    Events={{
                        OnKeyDown: (e) => objContext.AddEditHighStakeAdaptiveTest_ModuleProcessor.HandleEnterKeyDown(e, objContext.AddEditHighStakeAdaptiveTest_ModuleProcessor, objContext)
                    }}
                    ParentProps={{ ...props }}
                />
            </div>

            <div id="TimeKeeping"
                style={{ display: (state.strDivToShow == "TimeKeeping" ? "block" : "none") }}
                className="task-tabcontent">
                <DisplayOptions
                    ref={state.objComponentRefs.DisplayOptionsRef}
                    Data={{
                        DisplayData: state.objData,
                        TestProgressDisplayData: props.Data.TestProgressDisplayData,
                        IsEdit: props.Data.IsEdit
                    }}
                    Resource={{
                        Text: props.Resource.Text,
                        SkinPath: props.Resource.SkinPath,
                        JConfiguration: props.Resource.JConfiguration
                    }}
                    ParentProps={{ ...props }}
                />

                <TimeKeepingExtras
                    ref={state.objComponentRefs.TimeKeepingExtrasRef}
                    Data={{
                        DisplayData: state.objData,
                        IsEdit: props.Data.IsEdit,
                        IsSaveClicked: state.blnSaveClicked
                    }}
                    Resource={{
                        Text: props.Resource.Text,
                        SkinPath: props.Resource.SkinPath,
                    }}
                    Events={{
                        OnKeyDown: (e) => objContext.AddEditHighStakeAdaptiveTest_ModuleProcessor.HandleEnterKeyDown(e, objContext.AddEditHighStakeAdaptiveTest_ModuleProcessor, objContext)
                    }}
                    ParentProps={{ ...props }}
                />
            </div>

            <div id="TestCall"
                style={{ display: (state.strDivToShow == "TestCall" ? "block" : "none") }}
                className="task-tabcontent">
                <HostHeader
                    Data={{
                        DisplayData: state.objData,
                        IsEdit: props.Data.IsEdit
                    }}
                    Resource={{
                        Text: props.Resource.Text,
                        SkinPath: props.Resource.SkinPath
                    }}
                    ParentProps={{ ...props }}
                />

                <PreLogin
                    ref={state.objComponentRefs.PreLoginRef}
                    Data={{
                        DisplayData: state.objData,
                        IsEdit: props.Data.IsEdit
                    }}
                    Resource={{
                        Text: props.Resource.Text,
                        SkinPath: props.Resource.SkinPath
                    }}
                    ParentProps={{ ...props }}
                />

                <LoginControl
                    Data={{
                        DisplayData: state.objData,
                        IsEdit: props.Data.IsEdit
                    }}
                    Resource={{
                        Text: props.Resource.Text,
                        SkinPath: props.Resource.SkinPath
                    }}
                    ParentProps={{ ...props }}
                />

                <div>
                    <div className="title">{Localization.TextFormatter(props.Resource.Text, "TermsandConditions")}</div>
                    <div className="mb-10" style={{ color: "red" }}> To be implemented</div>
                </div>
            </div>

            <div id="WelcomePage"
                style={{ display: (state.strDivToShow == "WelcomePage" ? "block" : "none") }}
                className="task-tabcontent">
                <WelcomePage
                    ref={state.objComponentRefs.WelcomePageRef}
                    Data={{
                        DisplayData: state.objData,
                        MultiLanguageData: props.Data.MultiLanguageData,
                        IsEdit: props.Data.IsEdit,
                        IsSaveClicked: state.blnSaveClicked
                    }}
                    Resource={{
                        Text: props.Resource.Text,
                        SkinPath: props.Resource.SkinPath
                    }}
                    Events={{
                        OnKeyDown: (e) => objContext.AddEditHighStakeAdaptiveTest_ModuleProcessor.HandleEnterKeyDown(e, objContext.AddEditHighStakeAdaptiveTest_ModuleProcessor, objContext)
                    }}
                    ParentProps={{ ...props }}
                />
            </div>

            <div id="TestPage"
                style={{ display: (state.strDivToShow == "TestPage" ? "block" : "none") }}
                className="task-tabcontent">
                <TestPage
                    ref={state.objComponentRefs.TestPageRef}
                    Data={{
                        DisplayData: state.objData,
                        MultiLanguageData: props.Data.MultiLanguageData,
                        IsEdit: props.Data.IsEdit,
                        IsSaveClicked: state.blnSaveClicked
                    }}
                    Resource={{
                        Text: props.Resource.Text,
                        SkinPath: props.Resource.SkinPath
                    }}
                    Events={{
                        OnKeyDown: (e) => objContext.AddEditHighStakeAdaptiveTest_ModuleProcessor.HandleEnterKeyDown(e, objContext.AddEditHighStakeAdaptiveTest_ModuleProcessor, objContext)
                    }}
                    ParentProps={{ ...props }}
                />
            </div>

            <div id="FinalPage"
                style={{ display: (state.strDivToShow == "FinalPage" ? "block" : "none") }}
                className="task-tabcontent">
                <FinalPage
                    ref={state.objComponentRefs.FinalPageRef}
                    Data={{
                        DisplayData: state.objData,
                        MultiLanguageData: props.Data.MultiLanguageData,
                        DropdownData: {
                            ResultCertificateData: props.Data.DropDownData.arrResultCertificateData
                        },
                        IsEdit: props.Data.IsEdit,
                        IsSaveClicked: state.blnSaveClicked
                    }}
                    Events={{
                        OnKeyDown: (e) => objContext.AddEditHighStakeAdaptiveTest_ModuleProcessor.HandleEnterKeyDown(e, objContext.AddEditHighStakeAdaptiveTest_ModuleProcessor, objContext)
                    }}
                    Resource={{
                        Text: props.Resource.Text,
                        SkinPath: props.Resource.SkinPath
                    }}
                    ParentProps={{ ...props }}
                />
            </div>

            <div id="ResultPage"
                style={{ display: (state.strDivToShow == "ResultPage" ? "block" : "none") }}
                className="task-tabcontent">
                <ResultPage
                    ref={state.objComponentRefs.ResultPageRef}
                    Data={{
                        DisplayData: state.objData,
                        MultiLanguageData: props.Data.MultiLanguageData,
                        DropDownData: {
                            TestResultAttributeData: props.Data.DropDownData.arrTestResultAttributeData
                        },
                        IsEdit: props.Data.IsEdit,
                        IsSaveClicked: state.blnSaveClicked
                    }}
                    Events={{
                        OnKeyDown: (e) => objContext.AddEditHighStakeAdaptiveTest_ModuleProcessor.HandleEnterKeyDown(e, objContext.AddEditHighStakeAdaptiveTest_ModuleProcessor, objContext)
                    }}
                    Resource={{
                        Text: props.Resource.Text,
                        SkinPath: props.Resource.SkinPath
                    }}
                    ParentProps={{ ...props }}
                />
            </div>

            {objContext.state.strDivToShow == "AuditDiv" ? <Audit
                Data={{
                    PrimaryKeyValue: state.objData.uTestId,
                    ObjectKey: "Object_Intranet_Test_IntranetTest",
                    AuditType: "CMS"
                }}
                Resource={{
                    Text: props.Resource.Text,
                    JConfiguration: props.JConfiguration,
                    SkinPath: props.Resource.SkinPath
                }}
                Events={{
                    SetAuditOfficeRibbon: (objRibbonData) => objContext.props.SetOfficeRibbonData(objRibbonData)
                }}
                CallBacks={{
                    GetAuditUserName: (struUserId) => objContext.AddEditHighStakeAdaptiveTest_ModuleProcessor.GetAdministratorName(struUserId, objContext)
                }}
                ParentProps={{ ...props }}
            /> : <React.Fragment />}


            <div id="ValidationError" ></div>
        </div>
    }

    //return state.objData ? GetContent() : <React.Fragment />;
    return (
        <React.Fragment>{
            state.isLoadComplete ?
                <React.Fragment>{GetContent()}</React.Fragment> : <React.Fragment></React.Fragment>
        }
        </React.Fragment>
    );
}

export default AddEditHighStakeAdaptiveTest
//export default connect(IntranetBase_Hook.MapStoreToProps(AddEditHighStakeAdaptiveTest_ModuleProcessor.StoreMapList()))(AddEditHighStakeAdaptiveTest);