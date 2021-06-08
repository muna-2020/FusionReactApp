    //React related imports.
import React, { useReducer } from 'react';

//Module related files.
import * as AddEditPresentationTest_Hook from '@shared/Application/c.Intranet/Modules/3_Test/Test/TestBrowser/TestMaster/PresentationTest/AddEditPresentationTest/AddEditPresentationTest_Hook';
import AddEditPresentationTest_ModuleProcessor from '@shared/Application/c.Intranet/Modules/3_Test/Test/TestBrowser/TestMaster/PresentationTest/AddEditPresentationTest/AddEditPresentationTest_ModuleProcessor';
import BasicProperty from "@root/Application/c.Intranet/PC/Modules/3_Test/Test/TestBrowser/AddEditComponents/BasicProperty/BasicProperty";
import Description from "@root/Application/c.Intranet/PC/Modules/3_Test/Test/TestBrowser/AddEditComponents/Description/Description";
import Language from "@root/Application/c.Intranet/PC/Modules/3_Test/Test/TestBrowser/AddEditComponents/Language/Language";
import Filter from "@root/Application/c.Intranet/PC/Modules/3_Test/Test/TestBrowser/AddEditComponents/Filter/Filter";
import HostHeader from "@root/Application/c.Intranet/PC/Modules/3_Test/Test/TestBrowser/AddEditComponents/HostHeader/HostHeader";
import LoginControl from "@root/Application/c.Intranet/PC/Modules/3_Test/Test/TestBrowser/AddEditComponents/LoginControl/LoginControl";
import SchoolYear from "@root/Application/c.Intranet/PC/Modules/3_Test/Test/TestBrowser/AddEditComponents/SchoolYear/SchoolYear";
import Algorithm from "@root/Application/c.Intranet/PC/Modules/3_Test/Test/TestBrowser/AddEditComponents/Algorithm/Algorithm";
import Audit from '@root/Framework/Blocks/Audit/Audit';

/**
* @name AddEditPresentationTest.
* @param {object} props props.
* @summary This component is used to Add/Edit the AddEditPresentationTest data.
* @returns {object} React.Fragement that contains the content to be added in popup required for add/edit.
*/
const AddEditPresentationTest = (props) => {

    /**
   * @name [state,dispatch]
   * @summary Define state and dispatch for the reducer to set state.
   * @returns {[]} state and dispatch
   */
    const [state, dispatch] = useReducer(IntranetBase_Hook.Reducer, AddEditPresentationTest_Hook.GetInitialState(props));

    /**
    * @name objContext
    * @summary Groups state.dispatch and module object(s) in objContext.
    * @returns {object} objContext
    */
    let objContext = { state, props, dispatch, "AddEditPresentationTest_ModuleProcessor": new AddEditPresentationTest_ModuleProcessor() };

    /**
    * @name Initialize
    * @param {object} objContext context object
    * @summary Initialize method call in AddEditLanguage_Hook, that contains all the custom hooks.
    * @returns null
    */
    AddEditPresentationTest_Hook.Initialize(objContext);

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
                        OnKeyDown: (e) => objContext.AddEditPresentationTest_ModuleProcessor.HandleEnterKeyDown(e, objContext.AddEditPresentationTest_ModuleProcessor, objContext)
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
                style={{ display: (state.strDivToShow == "Algorithm" ? "block" : "none") }}>
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
            
                <LoginControl
                    Data={{
                        DisplayData: state.objData
                    }}
                    Resource={{
                        Text: props.Resource.Text,
                        SkinPath: props.Resource.SkinPath
                    }}
                    ParentProps={{ ...props }}
                />

                <div>
                    <div className="title">{Localization.TextFormatter(props.Resource.Text, "TermsandConditions")}</div>
                    <div style={{ color: "red" }}> To be implemented</div>
                </div>

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
                    GetAuditUserName: (struUserId) => objContext.AddEditPresentationTest_ModuleProcessor.GetAdministratorName(struUserId, objContext)
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

export default AddEditPresentationTest;