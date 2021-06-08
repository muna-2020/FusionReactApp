// React related imports.
import React, { useReducer } from 'react';
import { connect } from 'react-redux';

//Components used in module.
import PerformanceProfiler from '@shared/Framework/Services/Performance/PerformanceProfiler';

//Module related fies.
import * as PupilManagement_Hook from '@shared/Application/c.Intranet/Modules/5_Member/PupilManagement/PupilManagement_Hook';
import PupilManagement_ModuleProcessor from '@shared/Application/c.Intranet/Modules/5_Member/PupilManagement/PupilManagement_ModuleProcessor';
import PupilManagementSearch from '@root/Application/c.Intranet/PC/Modules/5_Member/PupilManagement/PupilManagementSearch/PupilManagementSearch';

//In-line Image imports...
import SendLoginImage from '@inlineimage/Framework/ReactJs/PC/Controls/ToolBar/SendLogin_Large.svg?inline';
import OpenExtranetTeacherImage from '@inlineimage/Framework/ReactJs/PC/Controls/ToolBar/OpenExtranetTeacher_Large.svg?inline';
import OpenSchoolExtranetImage from '@inlineimage/Framework/ReactJs/PC/Controls/ToolBar/OpenSchoolExtranet_Large.svg?inline';
import PupilResultsImage from '@inlineimage/Framework/ReactJs/PC/Controls/ToolBar/PupilResults_Large.svg?inline';
import IconAssignImage from '@inlineimage/Framework/ReactJs/PC/Controls/ToolBar/Icon_Assign.svg?inline';
import OpenExtranetPupilImage from '@inlineimage/Framework/ReactJs/PC/Controls/ToolBar/OpenExtranetPupil.svg?inline';
import ExportExcelTemplateImage from '@inlineimage/Framework/ReactJs/PC/Controls/ToolBar/ExportExcelTemplate_Large.svg?inline';

/**
 * * @name PupilManagement
* @param {object} props props
* @summary This component displays the PupilManagement  data in grid.
* @returns {object} React.Fragement that encapsulated the display grid with PupilManagement details.
*/
const PupilManagement = props => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     * @returns {[]} state and dispatch
     */
    const [state, dispatch] = useReducer(IntranetBase_Hook.Reducer, PupilManagement_Hook.GetInitialState(props));

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     * @returns {object} objContext
     */
    let objContext = { state, props, dispatch, ["ModuleName"]: "PupilManagement", ["PupilManagement_ModuleProcessor"]: new PupilManagement_ModuleProcessor(), ["ImageMeta"]: GetImageMeta() };

    /**
     * @name  Initialize
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns null
     */
    objContext.PupilManagement_ModuleProcessor.Initialize(objContext, objContext.PupilManagement_ModuleProcessor);

    /**
     * @name Initialize
     * @param {object} objContext context object
     * @summary Initialize method call in PupilManagement_Hook, that contains all the custom hooks.
     * @returns null
     */
    PupilManagement_Hook.Initialize(objContext);

    /**
     * @name GetContent
     * @summary Forms the whole jsx required for the module.
     * @returns {object} jsx
     */
    const GetContent = () => {
        var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/5_Member/PupilManagment", objContext.props) ?? {};
        return (
            <div className="subject-container">
                <PerformanceProfiler ComponentName="PupilManagementSearch" JConfiguration={JConfiguration}>
                    <PupilManagementSearch
                        Id="PupilManagementSearch"
                        Data={{
                            StateData: DataRef(objContext.props.Object_Extranet_State_State)["Data"] ?? [],
                        }}
                        Resource={{
                            Text: objTextResource
                        }}
                        CallBacks={{
                        }}
                        Events={{
                            OnSearchButtonClick: (objSearchDetails) => objContext.PupilManagement_ModuleProcessor.OnSearchButtonClick(objContext, objSearchDetails)
                        }}
                        ParentProps={props}
                    />
                </PerformanceProfiler>

                <React.Fragment>
                    <PerformanceProfiler ComponentName="PupilManagementGrid" JConfiguration={JConfiguration}>
                        <Grid
                            Id='PupilManagementGrid'
                            Meta={objContext.PupilManagement_ModuleProcessor.GetMetaData(objContext)}
                            Resource={objContext.PupilManagement_ModuleProcessor.GetGridResource(objContext, objTextResource)}
                            Data={objContext.PupilManagement_ModuleProcessor.GetGridData(objContext)}
                            Events={objContext.PupilManagement_ModuleProcessor.GetGridEvent(objContext)}
                            CallBacks={objContext.PupilManagement_ModuleProcessor.GetGridCallBacks(objContext)}
                            ParentProps={props}
                            iRowsPerPage={objContext.state.iRowsPerPage}
                            iFrom={objContext.state.iFrom}
                            iTotalRowCount={objContext.state.intTotalRowCount}
                            ParentProps={{ ...props }}
                            PageNumber={objContext.state.iPageNumber !== -1 ? objContext.state.iPageNumber : null}

                        />
                    </PerformanceProfiler>
                </React.Fragment>
            </div>
        );
    }

    return (
        <React.Fragment>{state.isLoadComplete || props.isLoadComplete ?
            <React.Fragment>{GetContent()}</React.Fragment> : <React.Fragment />}
        </React.Fragment>
    );
}

/**
 * @name GetImageMeta
 * @summary forms the default images for inline import.
 * */
const GetImageMeta = () => {
    return {
        SendLoginImage: SendLoginImage,
        OpenSchoolExtranetImage: OpenSchoolExtranetImage,
        OpenExtranetTeacherImage: OpenExtranetTeacherImage,
        PupilResultsImage: PupilResultsImage,
        IconAssignImage: IconAssignImage,
        OpenExtranetPupilImage: OpenExtranetPupilImage,
        ExportExcelTemplateImage: ExportExcelTemplateImage
    }
}

export default connect(IntranetBase_Hook.MapStoreToProps(PupilManagement_ModuleProcessor.StoreMapList()))(PupilManagement);

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = PupilManagement_ModuleProcessor; 