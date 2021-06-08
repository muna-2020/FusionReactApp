//React related imports.
import React, { useReducer } from 'react';
import { connect } from 'react-redux';

//Components used in module.
import PerformanceProfiler from "@shared/Framework/Services/Performance/PerformanceProfiler";

//Module related fies.
import AdditionalPropertyValue_ModuleProcessor from "@shared/Application/c.Intranet/Modules/6_Taxonomy/AdditionalPropertyValue/AdditionalPropertyValue_ModuleProcessor";
import * as AdditionalPropertyValue_Hook from '@shared/Application/c.Intranet/Modules/6_Taxonomy/AdditionalPropertyValue/AdditionalPropertyValue_Hook';

/**
 * @name AdditionalPropertyValue
 * @param {object} props props
 * @summary This component displays the AdditionalProperty data in grid.
 * @returns {object} React.Fragement that encapsulated the display grid with AdditionalProperty details.
 */
const AdditionalPropertyValue = props => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     * @returns {[]} state and dispatch
     */
    const [state, dispatch] = useReducer(IntranetBase_Hook.Reducer, AdditionalPropertyValue_Hook.GetInitialState(props));

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     * @returns {object} objContext
     */
    let objContext = { state, props, dispatch, ["ModuleName"]: "AdditionalPropertyValue", ["AdditionalPropertyValue_ModuleProcessor"]: new AdditionalPropertyValue_ModuleProcessor() };

    /**
     * @name  InitializeDataForSSR
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.AdditionalPropertyValue_ModuleProcessor.Initialize(objContext, objContext.AdditionalPropertyValue_ModuleProcessor);

    /**
     * @name Initialize
     * @param {object} objContext context object
     * @summary Initialize method call in AdditionalPropertyValue_Hook, that contains all the custom hooks.
     * @returns null
     */
    AdditionalPropertyValue_Hook.Initialize(objContext);

    /**
     * @name GetDependentDropDown
     * @summary Forms the  jsx required for the dropdown.
     * @returns {object} jsx, React.Fragment
     */
    const GetDependentDropDown = (objTextResource) => {
        return (
            <div className="flex">
                <div className="filter-block">
                    <span style={{ marginRight: "10px" }}>{Localization.TextFormatter(objTextResource, "Subject")}</span>
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
                                CheckDeletedDropDownData: (objNode) => objContext.AdditionalPropertyValue_ModuleProcessor.GetCallBackForSubjectDropDown(objNode, objContext)
                            }}
                            Events={{
                                OnChangeEventHandler: (objChangeData, props) => objContext.AdditionalPropertyValue_ModuleProcessor.OnSubjectDropDownChange(objContext, objChangeData),
                                CheckDeletedDropDownData: objContext.AdditionalPropertyValue_ModuleProcessor.CreateItemEventHandler
                            }}
                            ParentProps={{ ...props }}
                        />
                    </PerformanceProfiler>
                </div>

                <div className="filter-block">
                    <span style={{ marginRight: "10px" }}>{Localization.TextFormatter(objTextResource, "SubSubject")}</span>
                    <PerformanceProfiler ComponentName={"SubSubjectDropDown"} JConfiguration={props.JConfiguration}>
                        <WrapperComponent
                            ComponentName={"Dropdown"}
                            Id="SubSubjectDropDown"
                            Data={{
                                DropdownData: DataRef(objContext.props.Object_Intranet_Taxonomy_Subject)["Data"] ?? [],
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
                                    return objNode["cIsDeleted"] == "N" && objNode["iParentSubjectId"] == state.intSubjectDropdownSelectedValue ? true : false
                                }
                            }}
                            Events={{
                                OnChangeEventHandler: (objChangeData, props) => objContext.AdditionalPropertyValue_ModuleProcessor.OnSubSubjectDropDownChange(objContext, objChangeData),
                                CheckDeletedDropDownData: objContext.AdditionalPropertyValue_ModuleProcessor.CreateItemEventHandler
                            }}
                            ParentProps={{ ...props }}
                        />
                    </PerformanceProfiler>
                </div>

                <div className="filter-block">
                    <span style={{ marginRight: "10px" }}>{Localization.TextFormatter(objTextResource, "Category")}</span>
                    <PerformanceProfiler ComponentName={"CategoryDropDown"} JConfiguration={props.JConfiguration}>
                        <WrapperComponent
                            ComponentName={"Dropdown"}
                            Id="CategoryDropDown"
                            Data={{
                                DropdownData: DataRef(objContext.props.Object_Intranet_Taxonomy_Category)["Data"] ?? [],
                                SelectedValue: state.intCategoryDropdownSelectedValue ? state.intCategoryDropdownSelectedValue : -1
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
                                JConfiguration: props.JConfiguration,
                                SkinPath: props.JConfiguration.IntranetSkinPath
                            }}
                            Callbacks={{
                                CheckDeletedDropDownData: (objNode) => {
                                    return objNode["cIsDeleted"] == "N" && objNode["iSubjectId"] == state.intSubSubjectDropdownSelectedValue ? true : false
                                }
                            }}
                            Events={{
                                OnChangeEventHandler: (objChangeData, props) => objContext.AdditionalPropertyValue_ModuleProcessor.OnCategoryDropDownChange(objContext, objChangeData),
                                CheckDeletedDropDownData: objContext.AdditionalPropertyValue_ModuleProcessor.CreateItemEventHandler
                            }}
                            ParentProps={{ ...props }}
                        />
                    </PerformanceProfiler>
                </div>
            </div>
        );
    }



    /**
     * @name GetCompetencyDropDown
     * @summary Forms the  jsx required for the dropdown.
     * @returns {object} jsx, React.Fragment
     */
    const GetCompetencyDropDown = (objTextResource) => {
        return (
            <div className="filter-block">
                <span style={{ marginRight: "10px" }}>{Localization.TextFormatter(objTextResource, "Competency")}</span>
                <PerformanceProfiler ComponentName={"CategoryCompetencyDropDown"} JConfiguration={props.JConfiguration}>
                    <WrapperComponent
                        ComponentName={"Dropdown"}
                        Id="CategoryCompetencyDropDown"
                        Data={{
                            DropdownData: DataRef(objContext.props.Object_Intranet_Taxonomy_CategoryCompetency)["Data"] ?? [],
                            SelectedValue: state.intCompetencyDropdownSelectedValue ? state.intCompetencyDropdownSelectedValue : -1
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
                            JConfiguration: props.JConfiguration,
                            SkinPath: props.JConfiguration.IntranetSkinPath
                        }}
                        Callbacks={{
                            CheckDeletedDropDownData: (objNode) => {
                                return objNode["cIsDeleted"] == "N" && objNode["iCategoryId"] == state.intCategoryDropdownSelectedValue ? true : false
                            }
                        }}
                        Events={{
                            OnChangeEventHandler: (objChangeData, props) => objContext.AdditionalPropertyValue_ModuleProcessor.OnCompetencyDropDownChange(objContext, objChangeData),
                            CheckDeletedDropDownData: objContext.AdditionalPropertyValue_ModuleProcessor.CreateItemEventHandler
                        }}
                        ParentProps={{ ...props }}
                    />
                </PerformanceProfiler>
            </div>
        );
    }


    /**
     * @name GetAdditionalProperty
     * @summary Forms the  jsx required for the dropdown.
     * @returns {object} jsx, React.Fragment
     */
    const GetAdditionalPropertyDropDown = (objTextResource) => {
        return (
            <PerformanceProfiler ComponentName={"AdditionalTaskPropertyDropDown"} JConfiguration={props.JConfiguration}>
                <WrapperComponent
                    ComponentName={"Dropdown"}
                    Id="AdditionalTaskPropertyDropDown"
                    Data={{
                        DropdownData: DataRef(objContext.props.Object_Intranet_Task_TaskAdditionalProperty)["Data"] ?? [],
                        SelectedValue: state.strAdditionalTaskPropertyId ? state.strAdditionalTaskPropertyId : -1
                    }}
                    Meta={{
                        DependingTableName: "t_TestDrive_Task_AdditionalTaskProperty_Data",
                        IsLanguageDependent: "Y",
                        ValueColumn: "iAdditionalTaskPropertyId",
                        DisplayColumn: "vAdditionalTaskProperty",
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
                        OnChangeEventHandler: (objChangeData, props) => objContext.AdditionalPropertyValue_ModuleProcessor.OnAdditionalPropertyChange(objContext, objChangeData),
                        CheckDeletedDropDownData: objContext.AdditionalPropertyValue_ModuleProcessor.CreateItemEventHandler
                    }}
                    ParentProps={{ ...props }}
                />
            </PerformanceProfiler>
        );
    }

    /**
     * JSX for subject
     */
    function GetContent() {
        var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/6_Taxonomy/AdditionalPropertyValue", objContext.props) ?? {};
        return (
            <div className="subject-container">
                <div className="filter" id="filterHeader">
                    <div className="filter-block">
                        <span style={{ marginRight: "10px" }}>{Localization.TextFormatter(objTextResource, "MetaAttributeName")}</span>
                        {GetAdditionalPropertyDropDown(objTextResource)}
                    </div>
                    {(state.strDependencyColumnValueId == 1 || state.strDependencyColumnValueId == 2) ? GetDependentDropDown(objTextResource) : <div />}
                    {state.strDependencyColumnValueId == 2 ? GetCompetencyDropDown(objTextResource) : <div />}
                </div>
                <div>
                    <PerformanceProfiler ComponentName={"AdditionalPropertyValueGrid"} JConfiguration={props.JConfiguration}>
                        <Grid
                            Id='AdditionalPropertyValueGrid'
                            Meta={objContext.AdditionalPropertyValue_ModuleProcessor.GetMetaData(objContext)}
                            Resource={objContext.AdditionalPropertyValue_ModuleProcessor.GetGridResource(objContext, objTextResource)}
                            Data={objContext.AdditionalPropertyValue_ModuleProcessor.GetGridData(objContext)}
                            CallBacks={objContext.AdditionalPropertyValue_ModuleProcessor.GetGridCallBack(objContext)}
                            ParentProps={{ ...props }}
                        />
                    </PerformanceProfiler>
                </div>
            </div>
        );
    }

    return (
        <React.Fragment>{props.isLoadComplete || state.isLoadComplete ?
            <React.Fragment>{GetContent()}</React.Fragment> : <React.Fragment />}
        </React.Fragment>
    );
}


export default connect(IntranetBase_Hook.MapStoreToProps(AdditionalPropertyValue_ModuleProcessor.StoreMapList()))(AdditionalPropertyValue);

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = AdditionalPropertyValue_ModuleProcessor; 