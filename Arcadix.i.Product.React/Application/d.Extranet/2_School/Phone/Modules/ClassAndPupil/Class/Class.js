//React related imports
import React, { useReducer } from 'react';
import { connect } from 'react-redux';

//Module related fies.
import * as Class_Hook from '@shared/Application/d.Extranet/2_School/Phone/Modules/ClassAndPupil/Class/Class_Hook';
import Class_ModuleProcessor from "@shared/Application/d.Extranet/2_School/Phone/Modules/ClassAndPupil/Class/Class_ModuleProcessor";

//Inline Images import
import imgCheckGreen from '@inlineimage/Application/d.Extranet/2_School/PC/Modules/Teacher/check_green.svg?inline';
import imgErrorDeactive from '@inlineimage/Application/d.Extranet/2_School/PC/Modules/Teacher/errorDeactive.svg?inline';
import imgpluswhite from '@inlineimage/Application/d.Extranet/2_School/PC/Modules/Teacher/pluswhite.svg?inline';
import imgMovePupil from '@inlineimage/Application/d.Extranet/2_School/PC/Modules/ClassAndPupil/Pupil/movePupil.svg?inline';
import imgGridDelete from '@inlineimage/Application/d.Extranet/2_School/PC/Modules/Teacher/GridDelete.svg?inline';
import imgGridUpload from '@inlineimage/Application/d.Extranet/2_School/PC/Modules/Teacher/GridUpload.svg?inline';

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
     * @name GetImageMeta
     * @summary Returns the required images meta for Grid
     * @returns {*} Image meta object
     */

    function GetImageMeta() {
        return {
            "ActiveImageIcon_Check_Green": imgCheckGreen,
            "ActiveImageIcon_ErrorDeactive": imgErrorDeactive,
            "HeaderButtonImage_PlusWhite": imgpluswhite,
            "HeaderButtonImage_MovePupil": imgMovePupil,
            "Activate": imgGridDelete,
            "Deactivate": imgGridDelete,
            "ExtraButton": imgGridUpload

        }
    }

    /**
     * @name GetContent
     * @summary Returns the required jsx for component
     * @returns {*} jsx
     */
    function GetContent() {
        let objTextResource = objContext.props.TextResource;
        let arrActivationStatusToggleData = objContext.Class_ModuleProcessor.GetActivationStatusToggleData(objContext);
        let strTeacherId = state.uTeacherId ? state.uTeacherId : "";
        let strActivationStatusDropdownId = state.intActivationStatusToggleData !== -1 ? state.intActivationStatusToggleData : -1;
        let strClassAndTeamTeacherStatusDropdownId = state.intClassAndTeamTeacherStatusToggleData !== -1 ? state.intClassAndTeamTeacherStatusToggleData : -1;
        let arrClassAndTeamTeacherStatusToggleData = [];
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
            showTeacherDropDown = arrTeacherData.length > 0;
        }
        let showClassAndTeamTeacherDropdown = false;
        let objClassAndTeamTeacherToggleDropdownData = {};
        if (props.JConfiguration.ApplicationTypeId === "1") {
            showClassAndTeamTeacherDropdown = true;
            arrClassAndTeamTeacherStatusToggleData = objContext.Class_ModuleProcessor.GetClassAndTeamTeacherStatusToggleData(objContext);
            objClassAndTeamTeacherToggleDropdownData = {
                DropdownData: arrClassAndTeamTeacherStatusToggleData,
                SelectedValue: strClassAndTeamTeacherStatusDropdownId
            }
        }

        let objData = {
            "RowData": state.arrClassGridData,
            "DropDownData": objContext.Class_ModuleProcessor.GetDropdownData(objContext),
            "RenderGrid": state.intActivationStatusToggleData,
            "AdditionalPaddingIds": ["Header", "SubNavigation", "outletBand", "TopHeadClassPupilLeftpanel", "TopSpacing", "ClassPupilHeaderText"]
        };
        let objResource = {
            "SkinPath": props.JConfiguration.ExtranetSkinPath,
            "Text": objValidationMessagesForGrid,
            "ImagePathDetails": {
            }
        };
        let objActivationToggleDropdownData = {
            DropdownData: arrActivationStatusToggleData,
            SelectedValue: strActivationStatusDropdownId
        };
        let objTeacherDropdownData = {
            DropdownData: arrTeacherData,
            SelectedValue: strTeacherId
        };

        return (
            <div className="klassen">
                <div className="top-head">
                    {showTeacherDropDown === true ? <>
                        <div className="dropdwn-title">
                            <span>{Localization.TextFormatter(objTextResource, 'TeacherDropdownLabel')}</span>
                        </div>
                        <div className="content-dropdown">
                            <WrapperComponent
                                ComponentName={"Dropdown"}
                                Id="TeacherDropdownClassComponent"
                                Meta={objContext.Class_ModuleProcessor.GetMetaDataTeacherDropDown(objContext)}
                                Data={objTeacherDropdownData}
                                Resource={objContext.Class_ModuleProcessor.GetResourceDataTeacherDropDown(objTextResource)}
                                Events={objContext.Class_ModuleProcessor.GetEventsTeacherDropDown(objContext)}
                                ParentProps={{ ...props }}
                            />
                        </div>
                    </> : <></>}
                    <div className="dropdwn-title">
                        <span>{Localization.TextFormatter(objTextResource, 'ClassesActiveInactiveLabel')}</span>
                    </div>

                    <div className="content-dropdown">
                        <WrapperComponent
                            ComponentName={"Dropdown"}
                            Id="TeacherstatusToggleDropDown"
                            Meta={objContext.Class_ModuleProcessor.GetMetaDataStatusToggleDropDown(objContext)}
                            Data={objActivationToggleDropdownData}
                            Resource={objContext.Class_ModuleProcessor.GetResourceDataStatusToggleDropDown()}
                            Events={objContext.Class_ModuleProcessor.GetEventsStatusToggleDropDown(objContext)}
                            ParentProps={{ ...props }}
                        />
                    </div>
                </div>

                <Grid
                    Id="Class_Grid"
                    Meta={objContext.Class_ModuleProcessor.GetMetaData(objContext)}
                    Data={objData}
                    Resource={objResource}
                    CallBacks={objContext.Class_ModuleProcessor.GetCallBacksGrid(objContext)}
                    Events={objContext.Class_ModuleProcessor.GetEventsGrid(objContext)}
                    ParentProps={{ ...props }}
                    ImageMeta={GetImageMeta()}
                />
            </div>
        );
    }
    return (<React.Fragment>{state.isLoadComplete ? GetContent() : <React.Fragment />}</React.Fragment>);
}

export default connect(ExtranetBase_Hook.MapStoreToProps(Class_ModuleProcessor.StoreMapList()))(Class);