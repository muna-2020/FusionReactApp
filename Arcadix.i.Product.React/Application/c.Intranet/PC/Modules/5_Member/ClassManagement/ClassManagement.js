// React related imports.
import React, { useReducer } from 'react';
import { connect } from 'react-redux';

//Module related fies.
import * as ClassManagement_Hook from '@shared/Application/c.Intranet/Modules/5_Member/ClassManagement/ClassManagement_Hook';
import ClassManagement_ModuleProcessor from '@shared/Application/c.Intranet/Modules/5_Member/ClassManagement/ClassManagement_ModuleProcessor';
import ClassManagementSearch from '@root/Application/c.Intranet/PC/Modules/5_Member/ClassManagement/ClassManagementSearch/ClassManagementSearch';

//In-line Image imports...
import SendLoginImage from '@inlineimage/Framework/ReactJs/PC/Controls/ToolBar/SendLogin_Large.svg?inline';
import OpenExtranetTeacherImage from '@inlineimage/Framework/ReactJs/PC/Controls/ToolBar/OpenExtranetTeacher_Large.svg?inline';
import OpenSchoolExtranetImage from '@inlineimage/Framework/ReactJs/PC/Controls/ToolBar/OpenSchoolExtranet_Large.svg?inline';
import ShowAllPupilsImage from '@inlineimage/Framework/ReactJs/PC/Controls/ToolBar/ShowAllPupils_Large.svg?inline';
import CertificateImage from '@inlineimage/Framework/ReactJs/PC/Controls/ToolBar/Certificate_Large.svg?inline';
import ResultImage from '@inlineimage/Framework/ReactJs/PC/Controls/ToolBar/Result_Large.svg?inline';

/**
 * @name ClassManagement
 * @param {object} props props
 * @summary This component displays the ClassManagement  data in grid.
 * @returns {object} React.Fragement that encapsulated the display grid with ClassManagement  details.
 */
const ClassManagement = props => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     * @returns {[]} state and dispatch
     */
    const [state, dispatch] = useReducer(IntranetBase_Hook.Reducer, ClassManagement_Hook.GetInitialState(props));

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     * @returns {object} objContext
     */
    let objContext = { state, props, dispatch, ["ModuleName"]: "ClassManagement", ["ClassManagement_ModuleProcessor"]: new ClassManagement_ModuleProcessor(), ["ImageMeta"]: GetImageMeta() };

    /**
     * @name  InitializeDataForSSR
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.ClassManagement_ModuleProcessor.Initialize(objContext, objContext.ClassManagement_ModuleProcessor);

    /**
     * @name Initialize
     * @param {object} objContext context object
     * @summary Initialize method call in ClassManagement_Hook, that contains all the custom hooks.
     * @returns null
     */
    ClassManagement_Hook.Initialize(objContext);

    /**
     * @name GetContent
     * @summary Forms the  jsx required for the dropdown.
     * @returns {object} jsx, React.Fragment
     */
    function GetContent() {
        var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/5_Member/ClassManagment", objContext.props) ?? {};
        return (
            <div className="wrap subject-container class-admin">
                <ClassManagementSearch
                    Data={{
                        StateData: DataRef(objContext.props.Object_Extranet_State_State)["Data"] ?? [],
                        SchoolYearData: DataRef(objContext.props.Object_Extranet_Teacher_SchoolYear)["Data"] ?? []
                    }}
                    Resource={{
                        Text: objTextResource
                    }}
                    CallBacks={{
                    }}
                    Events={{
                        OnSearchButtonClick: (objSearchDetails) => objContext.ClassManagement_ModuleProcessor.OnSearchButtonClick(objContext, objSearchDetails)
                    }}
                    ParentProps={props}
                />
                <Grid
                    Id='ClassManagementGrid'
                    Meta={objContext.ClassManagement_ModuleProcessor.GetMetaData(objContext)}
                    Resource={objContext.ClassManagement_ModuleProcessor.GetGridResource(objContext, objTextResource)}
                    Data={objContext.ClassManagement_ModuleProcessor.GetGridData(objContext)}
                    CallBacks={objContext.ClassManagement_ModuleProcessor.GetGridCallBack(objContext)}
                    Events={objContext.ClassManagement_ModuleProcessor.GetGridEvent(objContext)}
                    ParentProps={{ ...props }}
                />
            </div>

        );
    }

    return (
        <React.Fragment>{props.isLoadComplete || state.isLoadComplete ?
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
        CertificateImage: CertificateImage,
        ResultImage: ResultImage,
        ShowAllPupilsImage: ShowAllPupilsImage
    }
}

export default connect(IntranetBase_Hook.MapStoreToProps(ClassManagement_ModuleProcessor.StoreMapList()))(ClassManagement);

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = ClassManagement_ModuleProcessor; 