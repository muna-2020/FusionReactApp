//React related imports.
import React, { useReducer } from 'react';


//Module related files.
import * as AddEditDemoTest_Hook from '@shared/Application/c.Intranet/Modules/3_Test/Test/TestBrowser/TestMaster/DemoTest/AddEditDemoTest/AddEditDemoTest_Hook';
import AddEditDemoTest_ModuleProcessor from '@shared/Application/c.Intranet/Modules/3_Test/Test/TestBrowser/TestMaster/DemoTest/AddEditDemoTest/AddEditDemoTest_ModuleProcessor';
import BasicProperty from "@root/Application/c.Intranet/PC/Modules/3_Test/Test/TestBrowser/AddEditComponents/BasicProperty/BasicProperty";
import Description from "@root/Application/c.Intranet/PC/Modules/3_Test/Test/TestBrowser/AddEditComponents/Description/Description";
import Language from "@root/Application/c.Intranet/PC/Modules/3_Test/Test/TestBrowser/AddEditComponents/Language/Language";
import Filter from "@root/Application/c.Intranet/PC/Modules/3_Test/Test/TestBrowser/AddEditComponents/Filter/Filter";
import SchoolYear from "@root/Application/c.Intranet/PC/Modules/3_Test/Test/TestBrowser/AddEditComponents/SchoolYear/SchoolYear";
import HostHeader from "@root/Application/c.Intranet/PC/Modules/3_Test/Test/TestBrowser/AddEditComponents/HostHeader/HostHeader";
import WelcomePage from "@root/Application/c.Intranet/PC/Modules/3_Test/Test/TestBrowser/AddEditComponents/WelcomePage/WelcomePage";
import TestPage from "@root/Application/c.Intranet/PC/Modules/3_Test/Test/TestBrowser/AddEditComponents/TestPage/TestPage";
import FinalPage from "@root/Application/c.Intranet/PC/Modules/3_Test/Test/TestBrowser/AddEditComponents/FinalPage/FinalPage";
import Algorithm from "@root/Application/c.Intranet/PC/Modules/3_Test/Test/TestBrowser/AddEditComponents/Algorithm/Algorithm";
import Audit from '@root/Framework/Blocks/Audit/Audit';

/**
* @name AddEditDemoTest.
* @param {object} props props.
* @summary This component is used to Add/Edit the AddEditDemoTest data.
* @returns {object} React.Fragement that contains the content to be added in popup required for add/edit.
*/
const AddEditDemoTest = (props) => {

    /**
   * @name [state,dispatch]
   * @summary Define state and dispatch for the reducer to set state.
   * @returns {[]} state and dispatch
   */
    const [state, dispatch] = useReducer(IntranetBase_Hook.Reducer, AddEditDemoTest_Hook.GetInitialState(props));

    /**
    * @name objContext
    * @summary Groups state.dispatch and module object(s) in objContext.
    * @returns {object} objContext
    */
    let objContext = { state, props, dispatch, "AddEditDemoTest_ModuleProcessor": new AddEditDemoTest_ModuleProcessor() };

    /**
    * @name Initialize
    * @param {object} objContext context object
    * @summary Initialize method call in AddEditLanguage_Hook, that contains all the custom hooks.
    * @returns null
    */
    AddEditDemoTest_Hook.Initialize(objContext);

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
                            CategoryData: props.Data.DropDownData.arrCategoryData,
                            SkinData: props.Data.DropDownData.arrSkinData,
                            CategoryCompetencyData: props.Data.DropDownData.arrCategoryCompetencyData
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
                        OnKeyDown: (e) => objContext.AddEditDemoTest_ModuleProcessor.HandleEnterKeyDown(e, objContext.AddEditDemoTest_ModuleProcessor, objContext)
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

                <SchoolYear
                    ref={state.objComponentRefs.SchoolYearRef}
                    Data={{
                        DisplayData: state.objData,
                        SchoolYearData: props.Data.SchoolYearData,
                        IsEdit: props.Data.IsEdit
                    }}
                    Resource={{
                        Text: props.Resource.Text,
                        SkinPath: props.Resource.SkinPath,
                        JConfiguration: props.Resource.JConfiguration
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

            <div id="Algorithm"
                style={{ display: (state.strDivToShow == "Algorithm" ? "block" : "none") }}
                className="task-tabcontent">
                <Algorithm
                    ref={state.objComponentRefs.AlgorithmRef}
                    Data={{
                        DisplayData: state.objData,
                        AlgorithmData: props.Data.AlgorithmData,
                        IsEdit: props.Data.IsEdit
                    }}
                    Resource={{
                        Text: props.Resource.Text,
                        SkinPath: props.Resource.SkinPath
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
            </div>

            <div id="WelcomePage"
                style={{ display: (state.strDivToShow == "WelcomePage" ? "block" : "none") }}
                className="task-tabcontent">
                <WelcomePage
                    ref={state.objComponentRefs.WelcomePageRef}
                    Data={{
                        DisplayData: state.objData,
                        MultiLanguageData: props.Data.MultiLanguageData,
                        IsEdit: props.Data.IsEdit
                    }}
                    Resource={{
                        Text: props.Resource.Text,
                        SkinPath: props.Resource.SkinPath
                    }}
                    Events={{
                        OnKeyDown: (e) => objContext.AddEditDemoTest_ModuleProcessor.HandleEnterKeyDown(e, objContext.AddEditDemoTest_ModuleProcessor, objContext)
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
                        IsEdit: props.Data.IsEdit
                    }}
                    Resource={{
                        Text: props.Resource.Text,
                        SkinPath: props.Resource.SkinPath
                    }}
                    Events={{
                        OnKeyDown: (e) => objContext.AddEditDemoTest_ModuleProcessor.HandleEnterKeyDown(e, objContext.AddEditDemoTest_ModuleProcessor, objContext)
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
                    Resource={{
                        Text: props.Resource.Text,
                        SkinPath: props.Resource.SkinPath
                    }}
                    Events={{
                        OnKeyDown: (e) => objContext.AddEditDemoTest_ModuleProcessor.HandleEnterKeyDown(e, objContext.AddEditDemoTest_ModuleProcessor, objContext)
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
                    GetAuditUserName: (struUserId) => objContext.AddEditDemoTest_ModuleProcessor.GetAdministratorName(struUserId, objContext)
                }}
                ParentProps={{ ...props }}
            /> : <React.Fragment />}


            <div id="ValidationError" ></div>
        </div>
    }

    return (
        <React.Fragment>{
            state.objData ?
                <React.Fragment>{GetContent()}</React.Fragment> : <React.Fragment></React.Fragment>
        }
        </React.Fragment>
    );
}

export default AddEditDemoTest;