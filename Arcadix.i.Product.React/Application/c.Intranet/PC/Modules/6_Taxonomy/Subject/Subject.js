//React related imports.
import React, { useReducer } from 'react';
import { connect } from 'react-redux';

//Components used in module.
import HierarchicalDropdown from "@root/Framework/Controls/Dropdowns/HierarchicalDropdown/HierarchicalDropdown";

//Module related fies.
import * as Subject_Hook from '@shared/Application/c.Intranet/Modules/6_Taxonomy/Subject/Subject_Hook';
import Subject_ModuleProcessor from "@shared/Application/c.Intranet/Modules/6_Taxonomy/Subject/Subject_ModuleProcessor";
import PerformanceProfiler from '@shared/Framework/Services/Performance/PerformanceProfiler';

/**
* @name Subject
* @param {object} props props
* @summary This component displays the Subject data in grid.
* @returns {object} React.Fragement that encapsulated the display grid with Subject details.
*/
const Subject = props => {

    /**
    * @name [state,dispatch]
    * @summary Define state and dispatch for the reducer to set state.
    * @returns {[]} state and dispatch
    */
    const [state, dispatch] = useReducer(IntranetBase_Hook.Reducer, Subject_Hook.GetInitialState(props));

    /**
    * @name objContext
    * @summary Groups state.dispatch and module object(s) in objContext.
    * @returns {object} objContext
    */
    let objContext = { state, props, dispatch, ["ModuleName"]: "Subject", ["Subject_ModuleProcessor"]: new Subject_ModuleProcessor() };

    /**
     * @name  Initialize
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns null
     */
    objContext.Subject_ModuleProcessor.Initialize(objContext, objContext.Subject_ModuleProcessor);

    /**
    * @name Initialize
    * @param {object} objContext context object
    * @summary Initialize method call in Subject_Hook, that contains all the custom hooks.
    * @returns null
    */
    Subject_Hook.Initialize(objContext);

   
    
    /**
     * JSX for subject
     */
    function GetContent() {
        var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/6_Taxonomy/Subject", objContext.props) ?? {};
        return (
            <div className="subject-container">
                <div className="filter" id="filterHeader">
                    <div className="filter-block">
                        <span className="filter-label" style={{ marginRight: "10px" }}>{Localization.TextFormatter(objTextResource,"SelectSubjectArea")}</span>
                        <HierarchicalDropdown
                            Id="Subject_HierarchicalDropdown"
                            Data={{
                                HierarchicalDropdownData: objContext.Subject_ModuleProcessor.GetSubjectDropDownData(objContext),
                                SelectedValue: -1
                            }}
                            Meta={{
                                ValueColumn: "iSubjectId",
                                ParentId: 'iParentSubjectId',
                                DisplayColumn: "vSubjectName",
                                DependingTableName: "t_TestDrive_Subject_Data",
                                IsLanguageDependent: "Y",
                                Root: -2,
                                DefaultOptionValue: -1, //Pass the id of the default option text      
                                ShowDefaultOption: true,
                            }}
                            Events={{
                                OnChangeEventHandler: (objChangeData, objDropDownProps) => objContext.Subject_ModuleProcessor.OnDropDownChange(objContext, objChangeData)
                            }}
                            CallBacks={{
                                OnBeforeShowNode: (objNode) =>  objNode["cIsDeleted"] == "N" ? objNode : null
                            }}
                            Resource={{
                                SkinPath: JConfiguration.IntranetSkinPath,
                                Text: objTextResource["PleaseChoose"]
                            }}
                            ParentProps={props}
                        />
                    </div>
                </div>
                <div>
                    <React.Fragment>
                        <PerformanceProfiler ComponentName="SubjectGrid" JConfiguration={JConfiguration}>
                            <Grid
                                Id='SubjectGrid'
                                Meta={objContext.Subject_ModuleProcessor.GetMetaData(objContext)}
                                Resource={objContext.Subject_ModuleProcessor.GetResourceData(objContext)}
                                Data={objContext.Subject_ModuleProcessor.GetGridData(objContext)}
                                ParentProps={{ ...props }}
                            />
                        </PerformanceProfiler>
                    </React.Fragment>
                </div>
            </div>
        );
    }
    return (
        <React.Fragment>{props.isLoadComplete ||state.isLoadComplete ?
            <React.Fragment>{GetContent()}</React.Fragment> : <React.Fragment/>}
        </React.Fragment>
    );
}

export default connect(IntranetBase_Hook.MapStoreToProps(Subject_ModuleProcessor.StoreMapList()))(Subject);

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = Subject_ModuleProcessor; 