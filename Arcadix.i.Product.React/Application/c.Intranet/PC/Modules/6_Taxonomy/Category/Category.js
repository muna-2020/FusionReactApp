// React related imports.
import React, { useReducer } from 'react';
import { connect } from 'react-redux';

//Components used in module
import PerformanceProfiler from "@shared/Framework/Services/Performance/PerformanceProfiler";

//Module related fies.
import * as Category_Hook from '@shared/Application/c.Intranet/Modules/6_Taxonomy/Category/Category_Hook';
import Category_ModuleProcessor from "@shared/Application/c.Intranet/Modules/6_Taxonomy/Category/Category_ModuleProcessor";

/**
* @name Category
* @param {object} props props
* @summary This component displays the Category data in grid.
* @returns {object} React.Fragement that encapsulated the display grid with Category details.
*/
const Category = props => {

    /**
    * @name [state,dispatch]
    * @summary Define state and dispatch for the reducer to set state.
    * @returns {[]} state and dispatch
    */
    const [state, dispatch] = useReducer(IntranetBase_Hook.Reducer, Category_Hook.GetInitialState(props));

    /**
    * @name objContext
    * @summary Groups state.dispatch and module object(s) in objContext.
    * @returns {object} objContext
    */
    let objContext = { state, props, dispatch, ["ModuleName"]: "Category", ["Category_ModuleProcessor"]: new Category_ModuleProcessor() };

    /**
    * @name  InitializeSSR
    * @param {object} objContext context object
    * @summary Initializing API and DynamicStyles
    * @returns Setting ApplicationState
*/
    objContext.Category_ModuleProcessor.Initialize(objContext, objContext.Category_ModuleProcessor);

    /**
    * @name Initialize
    * @param {object} objContext context object
    * @summary Initialize method call in Category_Hook, that contains all the custom hooks.
    * @returns null
    */
    Category_Hook.Initialize(objContext);

    /**
   * @name GetSubjectDropDown
   * @summary Forms the  jsx required for the dropdown.
   * @returns {object} jsx, React.Fragment
   */
    const GetSubjectDropDown = (objTextResource) => {
        return (
            <PerformanceProfiler ComponentName={"SubjectDropDown"} JConfiguration={props.JConfiguration}>
                <WrapperComponent
                    ComponentName={"Dropdown"}
                    Id="SubjectDropDown"
                    Data={{
                        DropdownData: DataRef(objContext.props.Object_Intranet_Taxonomy_Subject)["Data"] ?? [],
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
                            DefaultOptionText: Localization.TextFormatter(objTextResource, "PleaseChoose")
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
                        OnChangeEventHandler: (objChangeData, props) => objContext.Category_ModuleProcessor.OnSubjectDropDownChange(objContext, objChangeData),
                        CheckDeletedDropDownData: objContext.Category_ModuleProcessor.CreateItemEventHandler
                    }}
                    ParentProps={{ ...props }}
                />
            </PerformanceProfiler>
        );
    }

    /**
    * @name GetSubSubjectDropDown
    * @summary Forms the  jsx required for the dropdown.
    * @returns {object} jsx, React.Fragment
    */
    const GetSubSubjectDropDown = (objTextResource) => {
        return (
            <PerformanceProfiler ComponentName={"SubSubjectDropDown"} JConfiguration={props.JConfiguration}>
                <WrapperComponent
                    ComponentName={"Dropdown"}
                    Id="SubSubjectDropDown"
                    Data={{
                        DropdownData: state.arrSubSubjectData,
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
                            DefaultOptionText: Localization.TextFormatter(objTextResource, "PleaseChoose")
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
                        OnChangeEventHandler: (objChangeData, props) => objContext.Category_ModuleProcessor.OnSubSubjectDropDownChange(objContext, objChangeData),
                        CheckDeletedDropDownData: objContext.Category_ModuleProcessor.CreateItemEventHandler
                    }}
                    ParentProps={{ ...props }}
                />
            </PerformanceProfiler>
        );
    }

    /**
    * @name GetContent
    * @summary Forms the whole jsx required for the module.
    * @returns {object} jsx, React.Fragment
    */
    function GetContent() {
        var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/6_Taxonomy/Category", objContext.props) ?? {};
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
                        <PerformanceProfiler ComponentName={"CategoryGrid"} JConfiguration={props.JConfiguration}>
                            <Grid
                                Id='CategoryGrid'
                                Meta={objContext.Category_ModuleProcessor.GetMetaData(objContext)}
                                Resource={objContext.Category_ModuleProcessor.GetGridResource(objContext, objTextResource)}
                                Data={objContext.Category_ModuleProcessor.GetGridData(objContext)}
                                ParentProps={{ ...props }}
                            />
                        </PerformanceProfiler>
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


export default connect(IntranetBase_Hook.MapStoreToProps(Category_ModuleProcessor.StoreMapList()))(Category);

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = Category_ModuleProcessor; 