// React related imports.
import React, { useReducer } from 'react';
import { connect } from 'react-redux';

//Components used in module.
import TeacherManagementSearch from '@root/Application/c.Intranet/PC/Modules/5_Member/TeacherManagement/TeacherManagementSearch/TeacherManagementSearch';

//Module related fies.
import * as TeacherManagement_Hook from '@shared/Application/c.Intranet/Modules/5_Member/TeacherManagement/TeacherManagement_Hook';
import TeacherManagement_ModuleProcessor from '@shared/Application/c.Intranet/Modules/5_Member/TeacherManagement/TeacherManagement_ModuleProcessor';

//In-line Image imports...
import SendLoginImage from '@inlineimage/Framework/ReactJs/PC/Controls/ToolBar/SendLogin_Large.svg?inline';
import OpenExtranetTeacherImage from '@inlineimage/Framework/ReactJs/PC/Controls/ToolBar/OpenExtranetTeacher_Large.svg?inline';
import OpenSchoolExtranetImage from '@inlineimage/Framework/ReactJs/PC/Controls/ToolBar/OpenSchoolExtranet_Large.svg?inline';
import ShowAllPupilsImage from '@inlineimage/Framework/ReactJs/PC/Controls/ToolBar/ShowAllPupils_Large.svg?inline';
import CertificateImage from '@inlineimage/Framework/ReactJs/PC/Controls/ToolBar/Certificate_Large.svg?inline';
import ResultImage from '@inlineimage/Framework/ReactJs/PC/Controls/ToolBar/Result_Large.svg?inline';
import NewImage from '@inlineimage/Framework/ReactJs/PC/Controls/ToolBar/New_Large.svg?inline';
import EditImage from '@inlineimage/Framework/ReactJs/PC/Controls/ToolBar/Edit_Large.svg?inline';
import DeleteImage from '@inlineimage/Framework/ReactJs/PC/Controls/ToolBar/Delete_Large.svg?inline';

/**
 * @name TeacherManagement
 * @param {object} props props
 * @summary This component displays the TeacherManagement  data in grid.
 * @returns {object} React.Fragement that encapsulated the display grid with TeacherManagement  details.
 */
const TeacherManagement = props => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     * @returns {[]} state and dispatch
     */
    const [state, dispatch] = useReducer(IntranetBase_Hook.Reducer, TeacherManagement_Hook.GetInitialState(props));

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     * @returns {object} objContext
     */
    let objContext = { state, props, dispatch, ["ModuleName"]: "TeacherManagement", ["TeacherManagement_ModuleProcessor"]: new TeacherManagement_ModuleProcessor(), ["ImageMeta"]: GetImageMeta() };

    /**
     * @name  InitializeDataForSSR
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.TeacherManagement_ModuleProcessor.Initialize(objContext, objContext.TeacherManagement_ModuleProcessor);

    /**
     * @name Initialize
     * @param {object} objContext context object
     * @summary Initialize method call in TeacherManagement_Hook, that contains all the custom hooks.
     * @returns null
     */
    TeacherManagement_Hook.Initialize(objContext);

    /**
     * @name GetContent
     * @summary Forms the  jsx required for the dropdown.
     * @returns {object} jsx, React.Fragment
     */
    function GetContent() {
        var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/5_Member/TeacherManagment", objContext.props);
        return (
            <div className="wrap school-container class-admin">
                { !objContext.props.Meta?.IsOpenSchoolTeachers ?
                    <TeacherManagementSearch
                        Data={{
                            StateData: DataRef(objContext.props.Object_Extranet_State_State)["Data"] ?? [],
                        }}
                        Resource={{
                            Text: Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/5_Member/TeacherManagment", objContext.props) ?? {}
                        }}
                        CallBacks={{
                        }}
                        Events={{
                            OnSearchButtonClick: (objSearchDetails) => objContext.TeacherManagement_ModuleProcessor.OnSearchButtonClick(objContext, objSearchDetails)
                        }}
                        ParentProps={props}
                    />
                    : <React.Fragment />
                }

                <React.Fragment>
                    <Grid
                        Id='TeacherManagementGrid'
                        Meta={objContext.TeacherManagement_ModuleProcessor.GetMetaData(objContext)}
                        Resource={objContext.TeacherManagement_ModuleProcessor.GetGridResource(objContext, objTextResource)}
                        Data={objContext.TeacherManagement_ModuleProcessor.GetGridData(objContext)}
                        CallBacks={objContext.TeacherManagement_ModuleProcessor.GetGridCallBack(objContext)}
                        Events={objContext.TeacherManagement_ModuleProcessor.GetGridEvent(objContext)}
                        ParentProps={{ ...props }}
                    />
                </React.Fragment>


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
        ShowAllPupilsImage: ShowAllPupilsImage,
        OpenSchoolExtranetImage: OpenSchoolExtranetImage,
        OpenExtranetTeacherImage: OpenExtranetTeacherImage,
        CertificateImage: CertificateImage,
        ResultImage: ResultImage,
        NewImage: NewImage,
        EditImage: EditImage,
        DeleteImage: DeleteImage,
    }
}

export default connect(IntranetBase_Hook.MapStoreToProps(TeacherManagement_ModuleProcessor.StoreMapList()))(TeacherManagement);

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = TeacherManagement_ModuleProcessor; 