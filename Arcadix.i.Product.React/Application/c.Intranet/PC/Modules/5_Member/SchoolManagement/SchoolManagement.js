// React related imports.
import React, { useReducer } from 'react';
import { connect } from 'react-redux';

//Components used in module.
import SchoolManagementSearch from '@root/Application/c.Intranet/PC/Modules/5_Member/SchoolManagement/SchoolManagementSearch/SchoolManagementSearch';

//Module related fies.
import * as SchoolManagement_Hook from '@shared/Application/c.Intranet/Modules/5_Member/SchoolManagement/SchoolManagement_Hook';
import SchoolManagement_ModuleProcessor from '@shared/Application/c.Intranet/Modules/5_Member/SchoolManagement/SchoolManagement_ModuleProcessor';

//In-line Image imports...
import SendLoginImage from '@inlineimage/Framework/ReactJs/PC/Controls/ToolBar/SendLogin_Large.svg?inline';
import OpenExtranetTeacherImage from '@inlineimage/Framework/ReactJs/PC/Controls/ToolBar/OpenExtranetTeacher_Large.svg?inline';
import OpenSchoolExtranetImage from '@inlineimage/Framework/ReactJs/PC/Controls/ToolBar/OpenSchoolExtranet_Large.svg?inline';

/**
 * @name SchoolManagement
 * @param {object} props props
 * @summary This component displays the SchoolManagement  data in grid.
 * @returns {object} React.Fragement that encapsulated the display grid with SchoolManagement  details.
 */
const SchoolManagement = props => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     * @returns {[]} state and dispatch
     */
    const [state, dispatch] = useReducer(IntranetBase_Hook.Reducer, SchoolManagement_Hook.GetInitialState(props));

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     * @returns {object} objContext
     */
    let objContext = { state, props, dispatch, ["ModuleName"]: "SchoolManagement", ["SchoolManagement_ModuleProcessor"]: new SchoolManagement_ModuleProcessor(), ["ImageMeta"]: GetImageMeta() };

    /**
     * @name  InitializeDataForSSR
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.SchoolManagement_ModuleProcessor.Initialize(objContext, objContext.SchoolManagement_ModuleProcessor);

    /**
     * @name Initialize
     * @param {object} objContext context object
     * @summary Initialize method call in SchoolManagement_Hook, that contains all the custom hooks.
     * @returns null
     */
    SchoolManagement_Hook.Initialize(objContext);

    /**
     * @name GetContent
     * @summary Forms the  jsx required for the dropdown.
     * @returns {object} jsx, React.Fragment
     */
    function GetContent() {
        var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/5_Member/SchoolManagment", objContext.props) ?? {};
        return (
            <div className="wrap subject-container class-admin">
                <SchoolManagementSearch
                    Data={{
                        StateData: DataRef(objContext.props.Object_Extranet_State_State)["Data"] ?? [],
                        SchoolTypeData: DataRef(objContext.props.Object_Extranet_School_SchoolType)["Data"] ?? []
                    }}
                    Resource={{
                        Text: Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/5_Member/SchoolManagment", objContext.props) ?? {}
                    }}
                    CallBacks={{
                    }}
                    Events={{
                        OnSearchButtonClick: (objSearchDetails) => objContext.SchoolManagement_ModuleProcessor.OnSearchButtonClick(objContext, objSearchDetails)
                    }}
                    ParentProps={props}
                />
                <Grid
                    Id='SchoolManagementGrid'
                    Meta={objContext.SchoolManagement_ModuleProcessor.GetMetaData(objContext)}
                    Resource={objContext.SchoolManagement_ModuleProcessor.GetGridResource(objContext, objTextResource)}
                    Data={objContext.SchoolManagement_ModuleProcessor.GetGridData(objContext)}
                    Events={objContext.SchoolManagement_ModuleProcessor.GetGridEvent(objContext)}
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
        OpenExtranetTeacherImage: OpenExtranetTeacherImage
    }
}

export default connect(IntranetBase_Hook.MapStoreToProps(SchoolManagement_ModuleProcessor.StoreMapList()))(SchoolManagement);

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = SchoolManagement_ModuleProcessor; 