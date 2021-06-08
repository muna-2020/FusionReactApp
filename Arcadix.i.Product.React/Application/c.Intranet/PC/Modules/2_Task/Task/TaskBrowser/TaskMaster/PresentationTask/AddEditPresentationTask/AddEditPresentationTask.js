// React related imports.
import React, { useReducer } from 'react';
import { connect } from 'react-redux';

//Base classes.
import * as IntranetBase_Hook from '@shared/Framework/BaseClass/IntranetBaseClass/IntranetBase_Hook';

//Module related fies.
import * as AddEditPresentationTask_Hook from '@shared/Application/c.Intranet/Modules/2_Task/Task/TaskBrowser/TaskMaster/PresentationTask/AddEditPresentationTask/AddEditPresentationTask_Hook';
import AddEditPresentationTask_ModuleProcessor from '@shared/Application/c.Intranet/Modules/2_Task/Task/TaskBrowser/TaskMaster/PresentationTask/AddEditPresentationTask/AddEditPresentationTask_ModuleProcessor';
import BasicProperties from '@root/Application/c.Intranet/PC/Modules/2_Task/Task/TaskBrowser/AddEditComponents/BasicProperties/BasicProperties';
import Taxonomy from '@root/Application/c.Intranet/PC/Modules/2_Task/Task/TaskBrowser/AddEditComponents/Taxonomy/Taxonomy';
import Language from '@root/Application/c.Intranet/PC/Modules/2_Task/Task/TaskBrowser/AddEditComponents/Language/Language';
import DevelopmentHistoryBasicProperties from '@root/Application/c.Intranet/PC/Modules/2_Task/Task/TaskBrowser/AddEditComponents/DevelopmentHistoryBasicProperties/DevelopmentHistoryBasicProperties';
import WorkflowStatus from '@root/Application/c.Intranet/PC/Modules/2_Task/Task/TaskBrowser/AddEditComponents/WorkflowStatus/WorkflowStatus';
import SubjectArea from '@root/Application/c.Intranet/PC/Modules/2_Task/Task/TaskBrowser/AddEditComponents/SubjectArea/SubjectArea';
import Audit from '@root/Framework/Blocks/Audit/Audit';

//Common helper class method.
import { DataRef } from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

/**
 * @name AddEditPresentationTask
 * @param {object} props props
 * @summary This component is used to Add/Edit the Task data.
 * @returns {object} React.Fragement that contains the content to be added in popup required for add/edit.
 */
const AddEditPresentationTask = props => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     * @returns {[]} state and dispatch
     */
    const [state, dispatch] = useReducer(IntranetBase_Hook.Reducer, AddEditPresentationTask_Hook.GetInitialState(props));

    /**
     * @name objContext
     * @summary Groups state, dispatch and module object(s) in objContext.
     * @returns {object} objContext
     */
    let objContext = { state, props, dispatch, "AddEditPresentationTask_ModuleProcessor": new AddEditPresentationTask_ModuleProcessor() };

    /**
     * @name Initialize
     * @param {object} objContext context object
     * @summary Initialize method call in AddEditPresentationTask_Hook, that contains all the custom hooks.
     * @returns null
     */
    AddEditPresentationTask_Hook.Initialize(objContext);

    /**
     * @name GetTaskDiv
     * @summary Forms the whole jsx required for the TaskDiv.
     * @returns {object} jsx, React.Fragment
     */
    const GetTaskDiv = () => {
        return <div id="TaskDiv" style={{
            display: (state.strDivToShow == "TaskDiv" ? "block" : "none")
        }} className="task-tabcontent">
            <BasicProperties
                ref={state.objComponentRefs.BasicPropertyRef}
                Data={{
                    DisplayData: state.objData,
                    DropdownData: { SkinData: DataRef(objContext.props.Object_Cockpit_Skin)["Data"] },
                    MultiLanguageData: props.Data.MultiLanguageData,
                    DivToShow: state.strDivToShow,
                    IsEdit: props.Data.IsEdit,
                    IsSaveClicked: state.blnSaveClicked
                }}
                Resource={{
                    Text: props.Resource.Text,
                    JConfiguration: props.JConfiguration,
                    SkinPath: props.Resource.SkinPath
                }}
                Events={{
                    OnKeyDown: (e) => objContext.AddEditPresentationTask_ModuleProcessor.HandleEnterKeyDown(e, objContext.AddEditPresentationTask_ModuleProcessor, objContext)
                }}
                ParentProps={{ ...props }}
            />                     

            <Taxonomy
                ref={state.objComponentRefs.TaxonomyRef}
                Data={{
                    DisplayData: state.objData,
                    SubjectId: props.Data.IsEdit ? objContext.AddEditPresentationTask_ModuleProcessor.GetSubjectId(state.objData["iSubjectId"], objContext) : -1,
                    DropdownData: {
                        SubjectData: DataRef(objContext.props.Object_Intranet_Taxonomy_Subject)["Data"],
                        CategoryData: DataRef(objContext.props.Object_Intranet_Taxonomy_Category)["Data"],
                        CategoryCompetencyData: DataRef(objContext.props.Object_Intranet_Taxonomy_CategoryCompetency)["Data"],
                        CompetencyRangeData: DataRef(objContext.props.Object_Intranet_Taxonomy_CompetencyRange)["Data"],
                        CompetencyLevelData: DataRef(objContext.props.Object_Intranet_Taxonomy_CompetencyLevel)["Data"],
                        IntermediateData: DataRef(objContext.props.Object_Intranet_Taxonomy_Intermediate)["Data"]                    
                    },
                    MultiLanguageData: props.Data.MultiLanguageData,
                    DivToShow: state.strDivToShow,
                    IsEdit: props.Data.IsEdit,
                    IsSaveClicked: state.blnSaveClicked,
                    //additional prop data
                    TaskAdditionalProperty: DataRef(objContext.props.Object_Intranet_Task_TaskAdditionalProperty)["Data"],
                    TaskAdditionalPropertyValue: DataRef(objContext.props.Object_Intranet_Task_TaskAdditionalPropertyValue)["Data"]
                }}
                Resource={{
                    Text: props.Resource.Text,
                    JConfiguration: props.JConfiguration,
                    SkinPath: props.Resource.SkinPath
                }}
                Events={{
                    IsTheDropDownToShow: (strKey) => objContext.AddEditPresentationTask_ModuleProcessor.IsTheDropDownToShow(strKey, objContext),
                    OnClickHandler: (strDivId) => {
                        objContext.dispatch({ type: "SET_STATE", payload: { "strDivToShow": strDivId } });
                        document.getElementById("Nav_SubjectAreaDiv").click();
                    }
                }}
                ParentProps={{ ...props }}
            />            

            <Language
                ref={state.objComponentRefs.LanguageRef}
                Data={{
                    DisplayData: state.objData,
                    LanguageData: props.Data.LanguageData,
                    MainClientLanguageData: props.Data.MainClientLanguageData,
                    MultiLanguageData: props.Data.MultiLanguageData,
                    IsEdit: props.Data.IsEdit
                }}
                Events={{
                    IsShowLanguageDiv: () => objContext.AddEditPresentationTask_ModuleProcessor.IsShowLanguageDiv(objContext)
                }}
                Resource={{
                    Text: props.Resource.Text,
                    JConfiguration: props.Resource.JConfiguration
                }}
            />
        </div>
    };

    /**
    * @name GetDevelopmentHistoryDiv
    * @summary Forms the whole jsx required for the DevelopmentHistoryDiv.
    * @returns {object} jsx, React.Fragment
    */
    const GetDevelopmentHistoryDiv = () => {
        return <div style={{ display: (state.strDivToShow == "DevelopmentHistoryDiv" ? "block" : "none") }} className="task-tabcontent">

            <DevelopmentHistoryBasicProperties
                ref={state.objComponentRefs.DevelepmentHistoryBasicPropertyRef}
                Data={{
                    DisplayData: state.objData,
                    IsEdit: props.Data.IsEdit,
                    IsSaveClicked: state.blnSaveClicked
                }}
                Resource={{
                    Text: props.Resource.Text
                }}
                Events={{
                    OnKeyDown: (e) => objContext.AddEditPresentationTask_ModuleProcessor.HandleEnterKeyDown(e, objContext.AddEditPresentationTask_ModuleProcessor, objContext)
                }}
            />

            <WorkflowStatus
                ref={state.objComponentRefs.WorkFlowStatusRef}
                Data={{
                    DropdownData: {
                        ActiveWorkFlowStatuses: objContext.props.Data.DropDownData.arrActiveWorkFlowStatuses
                    },
                    DisplayData: state.objData,
                    MultiLanguageData: props.Data.MultiLanguageData,
                    ClientUserDetails: props.Data.ClientUserDetails,
                    IsEdit: props.Data.IsEdit,
                }}
                Resource={{
                    Text: props.Resource.Text,
                    JConfiguration: props.JConfiguration,
                    SkinPath: props.Resource.SkinPath
                }}
                Events={{
                    GetAdministratorName: (strUserId) => objContext.AddEditPresentationTask_ModuleProcessor.GetAdministratorName(strUserId, objContext)
                }}
                ParentProps={{ ...props }}
            />
        </div>
    };   

    /**
    * @name GetSubjectAreaDiv
    * @summary Forms the whole jsx required for the SubjectAreaDiv.
    * @returns {object} jsx, React.Fragment
    */
    const GetSubjectAreaDiv = () => {
        return state.strDivToShow == "SubjectAreaDiv" ? <SubjectArea
            Data={{
                DivToShow: state.strDivToShow,
            }}
            Events={{
                SetSubjectOfficeRibbon: (objRibbonData) => objContext.props.SetOfficeRibbonData(objRibbonData)
            }}
            ParentProps={{ ...props }}
        /> : <div />
    };

    /**
     * @name GetAuditDiv
     * @summary Forms the whole jsx required for the AuditDiv.
     * @returns {object} jsx, React.Fragment
     */
    const GetAuditDiv = () => {
        return state.strDivToShow == "AuditDiv" ? <Audit
            Data={{
                PrimaryKeyValue: state.objData.iPageId,
                AuditType: "CMS",
                ObjectKey: "Object_Intranet_Task_Task"
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
                GetAuditUserName: (struUserId) => objContext.AddEditPresentationTask_ModuleProcessor.GetAdministratorName(struUserId, objContext)
            }}
            ParentProps={{ ...props }}
        /> : <div />
    };

    /**
    * @name GetContent
    * @summary Forms the whole jsx required for the module.
    * @returns {object} jsx, React.Fragment
    */
    const GetContent = () => {
        return <React.Fragment>
            {GetTaskDiv()}
            {GetDevelopmentHistoryDiv()}
            {GetSubjectAreaDiv()}
            {GetAuditDiv()}
            <div id="ValidationError" />
        </React.Fragment>
    };

    return (
        <React.Fragment>{
            state.isLoadComplete ?
                <React.Fragment>{GetContent()}</React.Fragment> : <React.Fragment></React.Fragment>
        }
        </React.Fragment>
    );
};

export default connect(IntranetBase_Hook.MapStoreToProps(AddEditPresentationTask_ModuleProcessor.StoreMapList()))(AddEditPresentationTask);