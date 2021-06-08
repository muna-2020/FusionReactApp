//React related imports.
import React, { useReducer } from 'react';
import { connect } from 'react-redux';

//Module related files.
import * as TaskQuestion_Hook from '@shared/Application/c.Intranet/Modules/2_Task/Task/TaskActions/TaskQuestion/TaskQuestion_Hook';
import * as TaskQuestion_MetaData from '@shared/Application/c.Intranet/Modules/2_Task/Task/TaskActions/TaskQuestion/TaskQuestion_MetaData';
import TaskQuestion_ModuleProcessor from '@shared/Application/c.Intranet/Modules/2_Task/Task/TaskActions/TaskQuestion/TaskQuestion_ModuleProcessor';

//In-line Images import
import NewImage from '@inlineimage/Framework/ReactJs/PC/Controls/ToolBar/New_Large.svg?inline';
import EditImage from '@inlineimage/Framework/ReactJs/PC/Controls/ToolBar/Edit_Large.svg?inline';
import DeleteImage from '@inlineimage/Framework/ReactJs/PC/Controls/ToolBar/Delete_Large.svg?inline';

/**
* @name TaskQuestion.
* @param {object} props props.
* @summary This component is used to Display TaskQuestion.
* @returns {object} React.Fragement that contains the content to be Displayed on popup.
*/
const TaskQuestion = props => {
    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     * @returns {[]} state and dispatch
     */
    const [state, dispatch] = useReducer(IntranetBase_Hook.Reducer, TaskQuestion_Hook.GetInitialState(props));

    /**
    * @name objContext
    * @summary Groups state.dispatch and module object(s) in objContext.
    * @returns {object} objContext
    */
    let objContext = { state, props, dispatch, ["ModuleName"]: "TaskQuestion", ["TaskQuestion_ModuleProcessor"]: new TaskQuestion_ModuleProcessor(), ["ImageMeta"]: GetImageMeta() };

    /**
    * @name Initialize
    * @param {object} objContext context object
    * @summary Initialize method call in TaskQuestion_Hook, that contains all the custom hooks.
    * @returns null
    */
    TaskQuestion_Hook.Initialize(objContext);

    /**
* @name  InitializeSSR
* @param {object} objContext context object
* @summary Initializing API and DynamicStyles
* @returns Setting ApplicationState
*/
    objContext.TaskQuestion_ModuleProcessor.Initialize(objContext, objContext.TaskQuestion_ModuleProcessor);
    /**
* @name GetSubjectDropDown
* @summary Forms the  jsx required for the dropdown.
* @returns {object} jsx, React.Fragment
*/
    const GetSubjectDropDown = (objTextResource) => {
        return (
                <WrapperComponent
                    ComponentName={"Dropdown"}
                    Id="SubjectDropDown"
                    Data={{
                        DropdownData: DataRef(objContext.props.Object_Intranet_Taxonomy_Subject)["Data"],
                        SelectedValue: state.intSubjectDropdownSelectedValue ? state.intSubjectDropdownSelectedValue : -1
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
                            DefaultOptionText: Localization.TextFormatter(objTextResource, "DefaultOptionText")
                        },
                        JConfiguration: props.JConfiguration,
                        SkinPath: props.JConfiguration.IntranetSkinPath
                    }}
                    Callbacks={{
                        CheckDeletedDropDownData: (objNode) => {
                            return objNode["cIsDeleted"] == "N" && objNode["iParentSubjectId"] == "0" ? true : false
                        }
                    }}
                    Events={{
                        OnChangeEventHandler: (objChangeData, props) => objContext.TaskQuestion_ModuleProcessor.OnSubjectDropDownChange(objContext, objChangeData),
                        CheckDeletedDropDownData: objContext.TaskQuestion_ModuleProcessor.CreateItemEventHandler
                    }}
                    ParentProps={{ ...props }}
                />
        );
    }

    /**
    * @name GetSubSubjectDropDown
    * @summary Forms the  jsx required for the dropdown.
    * @returns {object} jsx, React.Fragment
    */
    const GetSubSubjectDropDown = (objTextResource) => {
        return (
                <WrapperComponent
                    ComponentName={"Dropdown"}
                    Id="SubSubjectDropDown"
                Data={{
                    DropdownData: objContext.state.arrSubSubjectData,
                        SelectedValue: state.intSubSubjectDropdownSelectedValue ? state.intSubSubjectDropdownSelectedValue : -1
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
                            DefaultOptionText: Localization.TextFormatter(objTextResource, "DefaultOptionText")
                        },
                        JConfiguration: props.JConfiguration,
                        SkinPath: props.JConfiguration.IntranetSkinPath
                    }}
                    Callbacks={{
                        CheckDeletedDropDownData: (objNode) => {
                            return objNode["cIsDeleted"] == "N" ? true : false
                        }
                    }}
                    Events={{
                        OnChangeEventHandler: (objChangeData, props) => objContext.TaskQuestion_ModuleProcessor.OnSubSubjectDropDownChange(objContext, objChangeData),
                        CheckDeletedDropDownData: objContext.TaskQuestion_ModuleProcessor.CreateItemEventHandler
                    }}
                    ParentProps={{ ...props }}
                />
        );
    }

    /**
    * @name GetContent
    * @summary Forms the whole jsx required for the module.
    * @returns {object} jsx, React.Fragment
    */
    function GetContent() {
        var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/2_Task/Task/TaskActions/TaskQuestion", objContext.props);
        return (
            <div className="subject-container">
                <div className="filter" id="filterHeader">
                    <div className="filter-block">
                        <span style={{ marginRight: "10px" }}>{Localization.TextFormatter(objTextResource, "SelectSubjectArea")}</span>
                        {GetSubjectDropDown(objTextResource)}
                        <span style={{ marginLeft: "10px", marginRight: "10px" }}>{Localization.TextFormatter(objTextResource, "Competence")}</span>
                        {GetSubSubjectDropDown(objTextResource)}
                    </div>
                </div>
                <div>
                    <React.Fragment>
                        <Grid
                            Id='TaskQuestionGrid'
                            Meta={{ ...TaskQuestion_MetaData.GetMetaData(), Filter: { "cIsDeleted": "N", "iSubjectId": objContext.state.intSubSubjectDropdownSelectedValue } }}
                            Resource={{ Text: objTextResource, SkinPath: props.JConfiguration.IntranetSkinPath }}
                            Data={objContext.TaskQuestion_ModuleProcessor.GetGridData(objContext)}
                            ParentProps={{ ...props }}
                        />
                    </React.Fragment>
                </div>
            </div>
        );
    }

    return (
        <React.Fragment>{props.isLoadComplete || state.isLoadComplete ?
            <React.Fragment>{GetContent()}</React.Fragment> : <React.Fragment></React.Fragment>}
        </React.Fragment>
    );

}

/**
 * @name GetImageMeta
 * @summary forms the default images for inline import.
 * */
const GetImageMeta = () => {
    return {
        NewImage: NewImage,
        EditImage: EditImage,
        DeleteImage: DeleteImage
    }
}
export default connect(IntranetBase_Hook.MapStoreToProps(TaskQuestion_ModuleProcessor.StoreMapList()))(TaskQuestion);
