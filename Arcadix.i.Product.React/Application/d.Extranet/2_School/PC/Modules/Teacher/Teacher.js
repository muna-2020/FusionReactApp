//React related imports.
import React, { useReducer } from 'react';
import { connect } from 'react-redux';

//Module related files.
import * as Teacher_Hook from '@shared/Application/d.Extranet/2_School/PC/Modules/Teacher/Teacher_Hook';
import Teacher_ModuleProcessor from '@shared/Application/d.Extranet/2_School/PC/Modules/Teacher/Teacher_ModuleProcessor';


//Inline Images import
import ExclamationMarkImage from '@inlineimage/Framework/ReactJs/PC/Controls/OnlineHelp/exclamation_mark.svg?inline';
import imgCheckGreen from '@inlineimage/Application/d.Extranet/2_School/PC/Modules/Teacher/check_green.svg?inline';
import imgErrorDeactive from '@inlineimage/Application/d.Extranet/2_School/PC/Modules/Teacher/errorDeactive.svg?inline';
import imgGridDelete from '@inlineimage/Application/d.Extranet/2_School/PC/Modules/Teacher/GridDelete.svg?inline';
import imgGridUpload from '@inlineimage/Application/d.Extranet/2_School/PC/Modules/Teacher/GridUpload.svg?inline';
import imgpluswhite from '@inlineimage/Application/d.Extranet/2_School/PC/Modules/Teacher/pluswhite.svg?inline';


/**
* @name Teacher
* @param {object} props props
* @summary This component displays the Teacher data in grid and let us manipulate those data.
* @returns {object} div that encapsulated the grid with Teacher details.
*/
const Teacher = (props) => {

    /**
    * @name [state,dispatch]
    * @summary Define state and dispatch for the reducer to set state.
    * @returns {[]} state and dispatch
    */
    const [state, dispatch] = useReducer(ExtranetBase_Hook.Reducer, Teacher_Hook.GetInitialState(props));

    /**
    * @name objContext
    * @summary Groups state, dispatch, module processor, TextResource object in objContext.
    * @returns {object} objContext
    */
    let objContext = { state, props, dispatch, ["ModuleName"]: "Teacher", ["Teacher_ModuleProcessor"]: new Teacher_ModuleProcessor() };

    /**
     * @name  InitializeDataForSSR
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.Teacher_ModuleProcessor.Initialize(objContext, objContext.Teacher_ModuleProcessor);

    /**
    * @name Initialize
    * @param {object} objContext context object
    * @summary Initialize method call in Teacher_Hook, that contains all the custom hooks.
    * @returns null
    */
    Teacher_Hook.Initialize(objContext);


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
            "HeaderButtonImage_GridUpload": imgGridUpload
        }
    }

    /**
    * @name GetContent
    * @param {object} props Passes props
    * @summary Forms the whole jsx required for the module.
    * @returns {object} jsx, React.Fragment
    */
    const GetContent = () => {
        var objTextResource = Object_Framework_Services_TextResource.GetData("/d.Extranet/2_School/Modules/Teacher", props);
        var jsxReturn = (
            <div className="light-brown-bg teacher">
                <div id="TopSpacing" className="top-spacing" />
                <div className="panel-flex">
                    <div className="panel-left">
                        <div className="padding-top-20 pl-10 pr-10" id="TopHead">
                            <div className="top-head">
                                <div className="content-dropdown">
                                    <span>{Localization.TextFormatter(objTextResource, 'TeacherDropdownLabel')}</span>
                                    <PerformanceProfiler ComponentName={"SchoolTeacherDropdown"} JConfiguration={props.JConfiguration} >
                                        <WrapperComponent
                                            ComponentName={"Dropdown"}
                                            Id="SchoolTeacherDropdown"
                                            Meta={objContext.Teacher_ModuleProcessor.GetMetaDataSchoolTeacherDropdown()}
                                            Data={objContext.Teacher_ModuleProcessor.GetDataSchoolTeacherDropdown(objContext, objTextResource)}
                                            Resource={objContext.Teacher_ModuleProcessor.GetResourceDataSchoolTeacherDropdown(objTextResource)}
                                            Events={objContext.Teacher_ModuleProcessor.GetEventsDataSchoolTeacherDropdown(objContext)}
                                            ParentProps={{ ...props }}
                                        />
                                    </PerformanceProfiler>
                                </div>
                                <div className="header-right">
                                    <button class="button yellow-button information-button"
                                        onClick={() => { objContext.Teacher_ModuleProcessor.UpdateInformationPopupStatus(objContext) }}>
                                        {state.blnShowInformationBar ? Localization.TextFormatter(objTextResource, 'HideInformationBar') : Localization.TextFormatter(objTextResource, 'ShowInformationBar')}
                                    </button>
                                    <div className="icon-trigger"> {/*online help icon*/}
                                        <img
                                            onClick={() => { objContext.Teacher_ModuleProcessor.ShowOnlineHelp(); }}
                                            src={ExclamationMarkImage} alt=""
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="pl-10 pr-10 padding-top-10 padding-bottom-20" id="TeacherHeaderText">
                            {
                                state.blnShowInformationBar ?
                                    <div class="teacher-header-text">
                                        {Localization.TextFormatter(objTextResource, 'YellowBarText')}
                                    </div> :
                                    <React.Fragment />
                            }
                        </div>
                        <div className="teacher-grid-wrap">
                            <PerformanceProfiler ComponentName={"TeacherGrid"} JConfiguration={props.JConfiguration} >
                                <Grid
                                    Id="TeacherGrid"
                                    Meta={objContext.Teacher_ModuleProcessor.GetGridMetaData(objContext, objTextResource)}
                                    Data={objContext.Teacher_ModuleProcessor.GetGridData(objContext)}
                                    Resource={objContext.Teacher_ModuleProcessor.GetGridResourceData(objContext, objTextResource)}
                                    CallBacks={objContext.Teacher_ModuleProcessor.GetGridCallBacks(objContext, objTextResource)}
                                    ParentProps={{ ...props }}
                                    ImageMeta={GetImageMeta()}
                                />
                            </PerformanceProfiler>
                        </div>
                    </div>
                </div>
            </div>
        );

        return jsxReturn;
    };

    return props.isLoadComplete || state.isLoadComplete ? GetContent() : <React.Fragment />;
};

/**
* @name connect
* @summary Calls mapStateToProps of ExtranetBase_Hook and exports the component, connects store to Module
*/
export default connect(ExtranetBase_Hook.MapStoreToProps(Teacher_ModuleProcessor.StoreMapList()))(Teacher);

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = Teacher_ModuleProcessor; 