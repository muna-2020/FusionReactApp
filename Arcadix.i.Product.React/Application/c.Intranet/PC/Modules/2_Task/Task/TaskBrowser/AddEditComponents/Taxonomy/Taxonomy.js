// React related imports.
import React, { useImperativeHandle, forwardRef, useReducer, useEffect } from 'react';

//Base classes.
import Base_AddEditTaskMaster_ModuleProcessor from '@shared/Application/c.Intranet/Modules/2_Task/Task/TaskBrowser/TaskMaster/Base_AddEditTaskMaster/Base_AddEditTaskMaster_ModuleProcessor';

/**
 * @name Taxonomy
 * @param {object} props props
 * @summary This component is used for Taxonomy in Add/EditTask.
 * @returns {object} React.Fragement that contains the content to be added in popup required for add/edit.
 */
const Taxonomy = (props, ref) => {

    /**
    * @name GetInitialState
    * @param {object} props 
    * @summary Forms the Initial state for component.
    * @returns {object} jsx, React.Fragment
    */
    const GetInitialState = (props) => {
        return {
            objData: {
                "iParentSubjectId": props.Data.IsEdit ? props.Data.SubjectId : -1,
                "iSubjectId": props.Data.IsEdit ? props.Data.DisplayData["iSubjectId"] : -1,
                "iCategoryId": props.Data.IsEdit ? props.Data.DisplayData["iCategoryId"] : -1,
                "iCategoryCompetencyId": props.Data.IsEdit ? props.Data.DisplayData["iCategoryCompetencyId"] : -1,
                "iCategoryCompetencyRangeId": props.Data.IsEdit ? props.Data.DisplayData["iCategoryCompetencyRangeId"] : GetDefaultCategoryCompetencyRange(props),
                "iCategoryCompetencyLevelId": props.Data.IsEdit ? props.Data.DisplayData["iCategoryCompetencyLevelId"] : -1,
                "iIntermediateId": props.Data.IsEdit ? props.Data.DisplayData["iIntermediateId"] : -1,
                "t_TestDrive_Task_AssignedAdditionalTaskProperty": props.Data.IsEdit ? (props.Data.DisplayData["t_TestDrive_Task_AssignedAdditionalTaskProperty"] ? props.Data.DisplayData["t_TestDrive_Task_AssignedAdditionalTaskProperty"] : []) : []
            }
        };
    }

    const GetDefaultCategoryCompetencyRange = (props) => {
        let objCategoryCompetencyRange = props.Data.DropdownData.CompetencyRangeData.find(obj => obj["cIspreselect"] == "Y" && obj["cIsDeleted"] == "N");
        return objCategoryCompetencyRange ? objCategoryCompetencyRange["iCompetencyRangeId"] : -1
    }
    /**
    * @name [state,dispatch]
    * @summary Define state and dispatch for the reducer to set state.
    * @returns {[]} state and dispatch
    */
    const [state, dispatch] = useReducer(IntranetBase_Hook.Reducer, GetInitialState(props));

    /**
     * @name objContext
     * @summary Groups state, dispatch and module object(s) in objContext.
     * @returns {object} objContext
     */
    let objContext = { state, props, dispatch, "Base_AddEditTaskMaster_ModuleProcessor": new Base_AddEditTaskMaster_ModuleProcessor() };    

    useImperativeHandle(ref, () => ({
        GetSaveData: () => {
            return state.objData            
        }
    }), [state, props]);

    let objTextResource = props.Resource.Text;

   /**
    * @name GetTaxonomyContent
    * @summary Forms the whole jsx required for the component.
    * @returns {object} jsx, React.Fragment
    */
    const GetTaxonomyContent = () => {

        return <div> 
            <div className="title">{Localization.TextFormatter(objTextResource, "SubjectArea")}</div>

            <div className="note" onClick={() => props.Events.OnClickHandler("SubjectAreaDiv")}>
                {Localization.TextFormatter(objTextResource, "SubjectAreaNote")}
            </div>

            <div className="col col-2">
                <div className="col-item">
                    <div className="row-left">
                        <span>{Localization.TextFormatter(objTextResource, "SubjectArea")}</span>
                    </div>
                    <div className="row-right" >
                        <div className="intranet-dropdown" Id="iParentSubjectId">
                            <WrapperComponent
                                ComponentName={"Dropdown"}
                                Id="iParentSubjectId"
                                Data={{
                                    DropdownData: props.Data.DropdownData.SubjectData,
                                    SelectedValue: state.objData.iParentSubjectId
                                }}
                                Meta={{
                                    DependingTableName: "t_TestDrive_Subject_Data",
                                    IsLanguageDependent: "Y",
                                    ValueColumn: "iSubjectId",
                                    DisplayColumn: "vSubjectName",
                                    DefaultOptionValue: - 1,
                                    ShowDefaultOption: "true"
                                }}
                                Resource={{
                                    Text: {
                                        DefaultOptionText: Localization.TextFormatter(objTextResource, "PleaseChoose")
                                    },
                                    JConfiguration: props.Resource.JConfiguration,
                                    SkinPath: props.Resource.SkinPath
                                }}
                                Events={{
                                    OnChangeEventHandler: (objChangeData, objDropDownProps) => objContext.Base_AddEditTaskMaster_ModuleProcessor.HandleDropDownChange("subject", objChangeData, objContext, objDropDownProps),
                                }}
                                Callbacks={{
                                    CheckDeletedDropDownData: (objNode) => {
                                        return objNode["cIsDeleted"] == "N" && objNode["iParentSubjectId"] == "0" ? true : false}
                                                }}
                                ParentProps={props.ParentProps}                               
                            />
                        </div>
                    </div>
                </div>
                <div className="col-item">
                    <div className="row-left">
                        <span>{Localization.TextFormatter(objTextResource, "AreaofCompetence")}</span>
                    </div>
                    <div className="row-right">
                        <div className="intranet-dropdown" Id="iSubjectId">
                            <WrapperComponent
                                ComponentName={"Dropdown"}
                                Id="iSubjectId"
                                Data={{
                                    DropdownData: props.Data.DropdownData.SubjectData,
                                    SelectedValue: state.objData.iSubjectId
                                }}
                                Meta={{
                                    DependingTableName: "t_TestDrive_Subject_Data",
                                    IsLanguageDependent: "Y",
                                    ValueColumn: "iSubjectId",
                                    DisplayColumn: "vSubjectName",
                                    DefaultOptionValue: - 1,
                                    ShowDefaultOption: "true"
                                }}
                                Resource={{
                                    Text: {
                                        DefaultOptionText: Localization.TextFormatter(objTextResource, "PleaseChoose")
                                    },
                                    JConfiguration: props.Resource.JConfiguration,
                                    SkinPath: props.Resource.SkinPath
                                }}
                                Events={{
                                    OnChangeEventHandler: (objChangeData, objDropDownProps) => objContext.Base_AddEditTaskMaster_ModuleProcessor.HandleDropDownChange("subsubject", objChangeData, objContext, objDropDownProps),
                                }}
                                Callbacks={{
                                    CheckDeletedDropDownData: (objNode) => {
                                        return objNode["cIsDeleted"] == "N" && objNode["iParentSubjectId"] == state.objData.iParentSubjectId ? true : false}
                                }}
                                ParentProps={props.ParentProps}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="col col-1"
                style={{ display: props.Events.IsTheDropDownToShow("HasCategory") ? "flex" : "none" }}
            >
                <div className="col-item">
                    <div className="row-left">
                        <span>{Localization.TextFormatter(objTextResource, "ActionAspect")}</span>
                    </div>
                    <div className="row-right">
                        <div className="intranet-dropdown" Id="iCategoryId">
                            <WrapperComponent
                                ComponentName={"Dropdown"}
                                Id="iCategoryId"
                                Data={{
                                    DropdownData: props.Data.DropdownData.CategoryData,
                                    SelectedValue: state.objData.iCategoryId
                                }}
                                Meta={{
                                    DependingTableName: "t_TestDrive_Category_Data",
                                    IsLanguageDependent: "Y",
                                    ValueColumn: "iCategoryId",
                                    DisplayColumn: "vCategoryName",
                                    DefaultOptionValue: - 1,
                                    ShowDefaultOption: "true"
                                }}
                                Resource={{
                                    Text: {
                                        DefaultOptionText: Localization.TextFormatter(objTextResource, "PleaseChoose")
                                    },
                                    JConfiguration: props.Resource.JConfiguration,
                                    SkinPath: props.Resource.SkinPath
                                }}
                                Events={{
                                    OnChangeEventHandler: (objChangeData, objDropDownProps) => objContext.Base_AddEditTaskMaster_ModuleProcessor.HandleDropDownChange("category", objChangeData, objContext, objDropDownProps),
                                }}
                                Callbacks={{
                                    CheckDeletedDropDownData: (objNode) => {
                                        return objNode["cIsDeleted"] == "N" && objNode["iSubjectId"] == state.objData.iSubjectId ? true : false}
                                }}
                                ParentProps={props.ParentProps} 
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="col col-1"
                style={{ display: props.Events.IsTheDropDownToShow("HasCompetency") ? "flex" : "none" }}
            >
                <div className="col-item">
                    <div className="row-left">
                        <span>{Localization.TextFormatter(objTextResource, "Competence")}</span>
                    </div>
                    <div className="row-right">
                        <div className="intranet-dropdown" Id="iCategoryCompetencyId">
                            <WrapperComponent
                                ComponentName={"Dropdown"}
                                Id="iCategoryCompetencyId"
                                Data={{
                                    DropdownData: props.Data.DropdownData.CategoryCompetencyData,
                                    SelectedValue: state.objData.iCategoryCompetencyId
                                }}
                                Meta={{
                                    DependingTableName: "t_TestDrive_Category_Competency_Data",
                                    IsLanguageDependent: "Y",
                                    ValueColumn: "iCategoryCompetencyId",
                                    DisplayColumn: "tCompetencyText",
                                    DefaultOptionValue: - 1,
                                    ShowDefaultOption: "true"
                                }}
                                Resource={{
                                    Text: {
                                        DefaultOptionText: Localization.TextFormatter(objTextResource, "PleaseChoose")
                                    },
                                    JConfiguration: props.Resource.JConfiguration,
                                    SkinPath: props.Resource.SkinPath
                                }}
                                Events={{
                                    OnChangeEventHandler: (objChangeData, objDropDownProps) => objContext.Base_AddEditTaskMaster_ModuleProcessor.HandleDropDownChange("competency", objChangeData, objContext, objDropDownProps),
                                }}
                                Callbacks={{
                                    CheckDeletedDropDownData: (objNode) => {
                                        return objNode["cIsDeleted"] == "N" && objNode["iCategoryId"] == state.objData.iCategoryId ? true : false}
                                }}
                                ParentProps={props.ParentProps}  
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="col col-2" style={{ display: props.Events.IsTheDropDownToShow("HasCanDo") ? "flex" : "none" }}
            >
                <div className="col-item">
                    <div className="row-left">
                        <span>{Localization.TextFormatter(objTextResource, "Cycle")}</span>
                    </div>
                    <div className="row-right">
                        <div className="intranet-dropdown" Id="iCategoryCompetencyRangeId">
                            <WrapperComponent
                                ComponentName={"Dropdown"}
                                Id="iCategoryCompetencyRangeId"
                                Data={{
                                    DropdownData: props.Data.DropdownData.CompetencyRangeData,
                                    SelectedValue: state.objData.iCategoryCompetencyRangeId
                                }}
                                Meta={{
                                    DependingTableName: "t_testdrive_Category_Competency_CompetencyRange_Data",
                                    IsLanguageDependent: "Y",
                                    ValueColumn: "iCompetencyRangeId",
                                    DisplayColumn: "vCompetencyRange",
                                    DefaultOptionValue: - 1,
                                    ShowDefaultOption: "true"
                                }}
                                Resource={{
                                    Text: {
                                        DefaultOptionText: Localization.TextFormatter(objTextResource, "PleaseChoose")
                                    },
                                    JConfiguration: props.Resource.JConfiguration,
                                    SkinPath: props.Resource.SkinPath
                                }}
                                Events={{
                                    OnChangeEventHandler: (objChangeData, objDropDownProps) => objContext.Base_AddEditTaskMaster_ModuleProcessor.HandleDropDownChange("competencyrange", objChangeData, objContext, objDropDownProps),
                                }}
                                Callbacks={{
                                    CheckDeletedDropDownData: (objNode) => {
                                        return objNode["cIsDeleted"] == "N" ? true : false
                                    }
                                }}
                                ParentProps={props.ParentProps}
                            />
                        </div>
                    </div>
                </div>                      
                <div className="col-item">
                    <div className="row-left">
                        <span>{Localization.TextFormatter(objTextResource, "ProficiencyLevel")}</span>
                    </div>
                    <div className="row-right">
                        <div className="intranet-dropdown" Id="iCategoryCompetencyLevelId">
                            <WrapperComponent
                                ComponentName={"Dropdown"}
                                Id="iCategoryCompetencyLevelId"
                                Data={{
                                    DropdownData: props.Data.DropdownData.CompetencyLevelData,
                                    SelectedValue: state.objData.iCategoryCompetencyLevelId
                                }}
                                Meta={{
                                    DependingTableName: "t_testdrive_Category_Competency_CompetencyLevel_Data",
                                    IsLanguageDependent: "Y",
                                    ValueColumn: "iCompetencyLevelId",
                                    DisplayColumn: "cCompetencyLevel",
                                    DefaultOptionValue: - 1,
                                    ShowDefaultOption: "true"
                                }}
                                Resource={{
                                    Text: {
                                        DefaultOptionText: Localization.TextFormatter(objTextResource, "PleaseChoose")
                                    },
                                    JConfiguration: props.Resource.JConfiguration,
                                    SkinPath: props.Resource.SkinPath
                                }}
                                Events={{
                                    OnChangeEventHandler: (objChangeData, objDropDownProps) => objContext.Base_AddEditTaskMaster_ModuleProcessor.HandleDropDownChange("competencylevel", objChangeData, objContext, objDropDownProps),
                                }}
                                Callbacks={{
                                    CheckDeletedDropDownData: (objNode) => {
                                        return objNode["cIsDeleted"] == "N" && objNode["iSubjectId"] == state.objData.iParentSubjectId ? true : false
                                    }
                                }}
                                ParentProps={props.ParentProps}  
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="col col-1"
                style={{ display: props.Events.IsTheDropDownToShow("HasCanDo") ? "flex" : "none" }}
            >
                    <div className="col-item">
                        <div className="row-left">
                        <span>{Localization.TextFormatter(objTextResource, "IntermediateStage")}</span>
                        </div>
                        <div className="row-right">
                        <div className="intranet-dropdown" id="iIntermediateId">
                            <WrapperComponent
                                ComponentName={"Dropdown"}
                                    Id="iIntermediateId"
                                    Data={{
                                        DropdownData: props.Data.DropdownData.IntermediateData,
                                        SelectedValue: state.objData.iIntermediateId
                                    }}
                                    Meta={{
                                        IsLanguageDependent: "N",
                                        ValueColumn: "iIntermediateId",
                                        DisplayColumn: "iIntermediateValue",
                                        DefaultOptionValue: - 1,
                                        ShowDefaultOption: "true"
                                    }}
                                    Resource={{
                                        Text: {
                                            DefaultOptionText: Localization.TextFormatter(objTextResource, "PleaseChoose")
                                        },
                                        JConfiguration: props.Resource.JConfiguration,
                                        SkinPath: props.Resource.SkinPath
                                    }}
                                    Events={{
                                        OnChangeEventHandler: (objChangeData, objDropDownProps) => objContext.Base_AddEditTaskMaster_ModuleProcessor.HandleDropDownChange("intermediate", objChangeData, objContext, objDropDownProps),
                                    }}
                                    Callbacks={{
                                        CheckDeletedDropDownData: (objNode) => {
                                            return objNode["cIsDeleted"] == "N" && objNode["iSubjectId"] == state.objData.iParentSubjectId ? true : false
                                        }
                                    }}
                                    ParentProps={props.ParentProps}
                                />                            
                            </div>
                        </div>
                    </div>
            </div>
        </div>
    }

    /**
    * @name GetAdditionalPropertyContent
    * @summary Forms the whole jsx required for the component.
    * @returns {object} jsx, React.Fragment
    */
    const GetAdditionalPropertyContent = () => {
        let strModuleName = "TaskAdditionalProperty";
        let AdditionalProperty = props.ParentProps.ComponentController.GetComponent(strModuleName);
        if (AdditionalProperty != undefined)
            return <AdditionalProperty
                {...props}
                Data={{
                    TaskAdditionalProperty: props.Data.TaskAdditionalProperty,
                    TaskAdditionalPropertyValue: props.Data.TaskAdditionalPropertyValue,
                    AssignedAdditionalTaskPropertyData: state.objData.t_TestDrive_Task_AssignedAdditionalTaskProperty,
                    SubjectId: state.objData.iParentSubjectId,
                    CategoryId: state.objData.iCategoryId,
                    CategoryCompetencyId: state.objData.iCategoryCompetencyId
                }}
                Resource={{
                    Text: props.Resource.Text,
                    JConfiguration: props.Resource.JConfiguration,
                    SkinPath: props.Resource.SkinPath
                }}
                Events={{
                    AdditionalPropHandleChange: (arrTestDrive_Task_AssignedAdditionalTaskProperty) => objContext.Base_AddEditTaskMaster_ModuleProcessor.AdditionalPropHandleChange(arrTestDrive_Task_AssignedAdditionalTaskProperty, objContext),
                    IsTheDropDownToShow: (strKey) => objContext.Base_AddEditTaskMaster_ModuleProcessor.IsTheDropDownToShow(strKey, objContext)
                }}
            />
        else
            return <React.Fragment /> 
    }

    /**
    * @name GetContent
    * @summary Forms the whole jsx required for the component.
    * @returns {object} jsx, React.Fragment
    */
    const GetContent = () => {
        return <React.Fragment>
            {GetTaxonomyContent()}
            {GetAdditionalPropertyContent()}
        </React.Fragment>
    }

    return (
        GetContent()
        )
}

export default forwardRef(Taxonomy);
