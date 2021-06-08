//React related imports
import React, { useReducer } from 'react';
import { connect } from 'react-redux';

//Module related fies.
import * as Class_Hook from '@shared/Application/d.Extranet/2_School/PC/Modules/ClassAndPupil/Class/Class_Hook';
import Class_ModuleProcessor from "@shared/Application/d.Extranet/2_School/PC/Modules/ClassAndPupil/Class/Class_ModuleProcessor";


/**
 * @name Class
 * @param {any} props props
 * @summary This component consists of Class component.
 * @returns {*} jsx
 */
const Class = (props) => {

    /**
     * @name Initializing Reducer
     * @summary Provides state and dispatch.
     */
    const [state, dispatch] = useReducer(ExtranetBase_Hook.Reducer, Class_Hook.GetInitialState(props));

    /**
     * @name Assigning objContext
     * @summary Groups state, props and dispatch and module object in to object, which can be passed across method in the module and used 
     */
    let objContext = { state, props, dispatch, ["ModuleName"]: "Class", ["Class_ModuleProcessor"]: new Class_ModuleProcessor() };

    /**
     * @name  InitializeDataForSSR
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.Class_ModuleProcessor.Initialize(objContext, objContext.Class_ModuleProcessor);

    /**
     * @name Initialize
     * @summary Initialize Custom hooks
     */
    Class_Hook.Initialize(objContext);

    /**
     * @name GetContent
     * @summary Returns the required jsx for component
     * @returns {*} jsx
     */
    function GetContent() {
        let objTextResource = objContext.props.TextResource;
        const arrActivationStatusToggleData = objContext.Class_ModuleProcessor.GetActivationStatusToggleData(objContext);
        let objClassData = objContext.Class_ModuleProcessor.GetClassDataFromApplicationState(objContext);
        let objValidationMessagesForGrid = {
            ...objTextResource,
            "EmptyDataMessage": Localization.TextFormatter(objTextResource, 'EmptyDataMessage'),
            "Date": Localization.TextFormatter(objTextResource, 'Date'),
            "Email": Localization.TextFormatter(objTextResource, 'Email'),
            "Required": Localization.TextFormatter(objTextResource, 'Required')
        };

        let arrTeacherData = [];
        let showTeacherDropDown = false;
        if (props.JConfiguration.ApplicationTypeId === "6" || (props.JConfiguration.ApplicationTypeId === "1" && props.ClientUserDetails.TeacherDetails.t_TestDrive_Member_Teacher_School[0].cIsAdmin == "Y")) {
            arrTeacherData = objContext.Class_ModuleProcessor.GetTeachers(objContext);
            showTeacherDropDown = true;
        }

        return (
            <div className="panel-left">
                <div className="padding-top-10" id="TopHeadClassPupilLeftpanel">
                    <div className="top-head">
                        {showTeacherDropDown === true ?
                            <React.Fragment>
                                <span>{Localization.TextFormatter(objTextResource, 'TeacherDropdownLabel')}</span>
                                <div className="content-dropdown">
                                    <PerformanceProfiler ComponentName={"TeacherDropdownClassComponent"} JConfiguration={props.JConfiguration} >
                                        <WrapperComponent
                                            ComponentName={"Dropdown"}
                                            id="TeacherDropdownClassComponent"
                                            Data={arrTeacherData}
                                            IsLanguageDependent="N"
                                            DisplayColumn="vFirstName,vName"
                                            ValueColumn="uTeacherId"
                                            SelectedValue=""
                                            ShowDefaultOption={true}
                                            DefaultOptionText={Localization.TextFormatter(objTextResource, 'TeacherDropdownAllItem')}
                                            DefaultOptionValue=""
                                            JConfiguration={props.JConfiguration}
                                            OnChangeEventHandler={(objItem, dropdownProps) => { objContext.Class_ModuleProcessor.HandleDropDownForTeacher(objContext, objItem); }}
                                            ParentProps={{ ...props }}
                                        />
                                    </PerformanceProfiler>
                                </div>
                            </React.Fragment> : <React.Fragment></React.Fragment>}
                        <span>{Localization.TextFormatter(objTextResource, 'ClassesActiveInactiveLabel')}</span>
                        <div className="content-dropdown">
                            <PerformanceProfiler ComponentName={"statusToggleDropDown"} JConfiguration={props.JConfiguration} >
                                <WrapperComponent
                                    ComponentName={"Dropdown"}
                                    id="statusToggleDropDown"
                                    Data={arrActivationStatusToggleData}
                                    IsLanguageDependent="N"
                                    DisplayColumn="key"
                                    ValueColumn="value"
                                    SelectedValue={arrActivationStatusToggleData[0].value}
                                    JConfiguration={props.JConfiguration}
                                    OnChangeEventHandler={(objItem, dropdownProps) => { objContext.Class_ModuleProcessor.HandleActivationStatusToggle(objContext, objItem); }}
                                    ParentProps={{ ...props }}
                                />
                            </PerformanceProfiler>
                        </div>
                    </div>
                </div>
                <WrapperComponent
                    ComponentName={"FillHeight"}
                    id="TeacherClassFillHeight" HeaderIds={["Header", "SubNavigation", "outletBand", "TopHeadClassPupilLeftpanel"]} className="bgStyle" scrollStyle={{ overflow: "auto" }}
                    ParentProps={{ ...props }}>
                    <PerformanceProfiler ComponentName={"TeacherClassGrid"} JConfiguration={props.JConfiguration} >
                        <Grid
                            Id={"TeacherClassGrid"}
                            RowData={state.arrClassGridData}
                            Header={objContext.Class_ModuleProcessor.GetColumns(objContext)}
                            TextResource={objValidationMessagesForGrid}
                            DropDownData={objContext.Class_ModuleProcessor.GetDropdownData(objContext)}
                            GridActionButtons={objContext.Class_ModuleProcessor.GetHeaderButtons(objContext)}
                            RowActionButtons={objContext.Class_ModuleProcessor.GetActionButtons(objContext)}
                            OnClickRow={(objClass) => { objContext.Class_ModuleProcessor.HandleOnClickRow(objContext, objClass) }}
                            SaveMethod={(objSaveData) => { objContext.Class_ModuleProcessor.SaveMethod(objContext, objSaveData) }}
                            SkinPath={props.JConfiguration.ExtranetSkinPath}
                            JConfiguration={props.JConfiguration}
                            OnBeforeGridRowRender={(objRowData) => objContext.Class_ModuleProcessor.GetActiveStatus(objRowData, props.JConfiguration)}
                            Filter={objContext.Class_ModuleProcessor.GetFilteredClassRowData(objContext)}
                            ParentProps={{ ...props }}
                        //PreselectValue={objClassData ? objClassData["uClassId"] ? objClassData["uClassId"] : "000000000000-0000-0000-0000-00000000" : "000000000000-0000-0000-0000-00000000"}
                        />
                    </PerformanceProfiler>
                </WrapperComponent>
            </div>
        );
    }
    return (<React.Fragment>{props.isLoadComplete || state.isLoadComplete ? GetContent() : <React.Fragment />}</React.Fragment>);
}

export default connect(ExtranetBase_Hook.MapStoreToProps(Class_ModuleProcessor.StoreMapList()))(Class);
/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = Class_ModuleProcessor; 