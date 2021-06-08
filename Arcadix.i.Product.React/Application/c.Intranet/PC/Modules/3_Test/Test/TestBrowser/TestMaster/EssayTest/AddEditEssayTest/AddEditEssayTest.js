//React related imports.
import React, { useReducer } from 'react';

//Module related files.
import * as AddEditEssayTest_Hook from '@shared/Application/c.Intranet/Modules/3_Test/Test/TestBrowser/TestMaster/EssayTest/AddEditEssayTest/AddEditEssayTest_Hook';
import AddEditEssayTest_ModuleProcessor from '@shared/Application/c.Intranet/Modules/3_Test/Test/TestBrowser/TestMaster/EssayTest/AddEditEssayTest/AddEditEssayTest_ModuleProcessor';

import BasicProperty from "@root/Application/c.Intranet/PC/Modules/3_Test/Test/TestBrowser/AddEditComponents/BasicProperty/BasicProperty";
import Description from "@root/Application/c.Intranet/PC/Modules/3_Test/Test/TestBrowser/AddEditComponents/Description/Description";
import Language from "@root/Application/c.Intranet/PC/Modules/3_Test/Test/TestBrowser/AddEditComponents/Language/Language";
import Filter from "@root/Application/c.Intranet/PC/Modules/3_Test/Test/TestBrowser/AddEditComponents/Filter/Filter";
import SchoolYear from "@root/Application/c.Intranet/PC/Modules/3_Test/Test/TestBrowser/AddEditComponents/SchoolYear/SchoolYear";
import Audit from '@root/Framework/Blocks/Audit/Audit';

/**
* @name AddEditEssayTest.
* @param {object} props props.
* @summary This component is used to Add/Edit the AddEditEssayTest data.
* @returns {object} React.Fragement that contains the content to be added in popup required for add/edit.
*/
const AddEditEssayTest = (props) => {

    /**
   * @name [state,dispatch]
   * @summary Define state and dispatch for the reducer to set state.
   * @returns {[]} state and dspatch
   */
    const [state, dispatch] = useReducer(IntranetBase_Hook.Reducer, AddEditEssayTest_Hook.GetInitialState());

    /**
    * @name objContext
    * @summary Groups state.dispatch and module object(s) in objContext.
    * @returns {object} objContext
    */
    let objContext = { state, props, dispatch, "AddEditEssayTest_ModuleProcessor": new AddEditEssayTest_ModuleProcessor() };

    /**
    * @name Initialize
    * @param {object} objContext context object
    * @summary Initialize method call in AddEditLanguage_Hook, that contains all the custom hooks.
    * @returns null
    */
    AddEditEssayTest_Hook.Initialize(objContext);

    const GetContent = () => {
        return <div>
            {objContext.state.strDivToShow == "General" ? <div id="General" className="task-tabcontent">
                <BasicProperty
                    Data={{
                        DisplayData: state.objData,
                        DropdownData: { SubjectData: props.Data.DropDownData.arrSubjectData },
                        //MultiLanguageData: props.Data.MultiLanguageData,
                        //DivToShow: state.strDivToShow
                    }}
                    Resource={{
                        Text: props.Resource.Text,
                        SkinPath: props.Resource.SkinPath
                    }}
                    Events={{
                        OnChangeEventHandler: (strValue, strColName, strLanguageId = "") => objContext.AddEditEssayTest_ModuleProcessor.HandleChange(strColName, strValue, objContext, strLanguageId),
                        OnDropDownChangeHandler: (strValue, strColName, strLanguageId = "") => objContext.AddEditEssayTest_ModuleProcessor.HandleChange(strColName, strValue, objContext, strLanguageId),
                        //CheckDeletedDropDownData: objContext.AddEditEssayTest_ModuleProcessor.CreateItemEventHandler
                        OnKeyDown: (e) => objContext.AddEditExternalTest_ModuleProcessor.HandleEnterKeyDown(e, objContext.AddEditEssayTest_ModuleProcessor, objContext)
                    }}
                    ParentProps={{ ...props }}
                />

                <Description
                    Data={{
                        DisplayData: state.objData                       
                    }}
                    Resource={{
                        Text: props.Resource.Text,
                        SkinPath: props.Resource.SkinPath
                    }}
                    Events={{
                        OnChangeEventHandler: (strValue, strColName, strLanguageId = "") => objContext.AddEditEssayTest_ModuleProcessor.HandleChange(strColName, strValue, objContext, strLanguageId),
                    }}
                    ParentProps={{ ...props }}
                />

               <SchoolYear
                    Data={{
                            DisplayData: state.objData,
                            SchoolYearData: props.Data.SchoolYearData
                    }}
                    Resource={{
                        Text: props.Resource.Text,
                        SkinPath: props.Resource.SkinPath,
                        JConfiguration: props.Resource.JConfiguration
                    }}
                    Events={{
                        HandleCheckBoxClick: (strSchoolYearId) => objContext.AddEditEssayTest_ModuleProcessor.HandleSchoolYearChange(strSchoolYearId, objContext),
                        IsSchoolYearChecked: (strSchoolYearId) => objContext.AddEditEssayTest_ModuleProcessor.IsSchoolYearChecked(strSchoolYearId, objContext)
                    }}
                    ParentProps={{ ...props }}
                />
                               
                <Language
                    Data={{
                        DisplayData: state.objData,
                        MainClientLanguageData: props.Data.MainClientLanguageData,
                        LanguageData: props.Data.LanguageData
                    }}
                    Resource={{
                        Text: props.Resource.Text,
                        SkinPath: props.Resource.SkinPath,
                        JConfiguration: props.Resource.JConfiguration
                    }}
                    Events={{
                        HandleLanguageCheckBoxClick: (strLanguageId, blnIsForLanguageActive = false, blnIsLanguageActive = false) => objContext.AddEditEssayTest_ModuleProcessor.HandleLanguageCheckBoxClick(strLanguageId, blnIsForLanguageActive, blnIsLanguageActive, objContext),
                        IsLanguageAdded: (strLanguageId, blnIsForLanguageActive = false) => objContext.AddEditEssayTest_ModuleProcessor.IsLanguageAdded(strLanguageId, blnIsForLanguageActive, objContext),
                        IsShowLanguageDiv: () => objContext.AddEditEssayTest_ModuleProcessor.IsShowLanguageDiv(objContext)
                    }}
                    ParentProps={{ ...props }}
                />  

                <div>
                    <div className="title">{Localization.TextFormatter(props.Resource.Text, "SecurityTestNumber")}</div>
                    <div style={{ color: "red" }}> To be implemented (Pupil and Teacher templates)</div>
                </div>                 

                <Filter
                    Data={{
                        DisplayData: state.objData
                    }}
                    Resource={{
                        Text: props.Resource.Text,
                        SkinPath: props.Resource.SkinPath
                    }}
                    Events={{
                        HandleFilterCheckBoxClick: (blnIsActive) => objContext.AddEditEssayTest_ModuleProcessor.HandleFilterCheckBoxClick(blnIsActive, objContext),
                    }}
                    ParentProps={{ ...props }}
                />
            </div> : <React.Fragment />}  

            {objContext.state.strDivToShow == "AuditDiv" ? <Audit
                Data={{
                    PrimaryKeyValue: state.objData.uTestId,
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
                    GetAuditUserName: (struUserId) => objContext.AddEditEssayTest_ModuleProcessor.GetAdministratorName(struUserId, objContext)
                }}
                ParentProps={{ ...props }}
            /> : <React.Fragment />}


            <div id="ValidationError" ></div>
        </div>
    }

    //return state.objData ? GetContent() : <React.Fragment />;
    return (
        <React.Fragment>{
            <div> Yet to be discussed and implemented</div>
            //state.isLoadComplete ?
            //    <React.Fragment>{GetContent()}</React.Fragment> : <React.Fragment></React.Fragment>
        }
        </React.Fragment>
    );
}

export default AddEditEssayTest;