//React related imports.
import React, { useReducer } from 'react';
import { connect } from 'react-redux';

//Module related files.
import * as Teacher_Hook from '@shared/Application/d.Extranet/2_School/Phone/Modules/Teacher/Teacher_Hook';
import Teacher_ModuleProcessor from '@shared/Application/d.Extranet/2_School/Phone/Modules/Teacher/Teacher_ModuleProcessor';
import ImportData from '@root/Application/d.Extranet/2_School/Phone/Modules/Teacher/ImportData/ImportData';

//Inline Images import
import ExclamationMarkImage from '@inlineimage/Framework/ReactJs/PC/Controls/OnlineHelp/exclamation_mark.svg?inline';
import imgCheckGreen from '@inlineimage/Application/d.Extranet/2_School/PC/Modules/Teacher/check_green.svg?inline';
import imgErrorDeactive from '@inlineimage/Application/d.Extranet/2_School/PC/Modules/Teacher/errorDeactive.svg?inline';
import imgGridUpload from '@inlineimage/Application/d.Extranet/2_School/PC/Modules/Teacher/GridUpload.svg?inline';
import imgpluswhite from '@inlineimage/Application/d.Extranet/2_School/PC/Modules/Teacher/pluswhite.svg?inline';

function Teacher(props) {

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

    function GetContent() {
        var objTextResource = Object_Framework_Services_TextResource.GetData("/d.Extranet/2_School/Modules/Teacher", props);
        return (
            <div className="teacher">
                <div className="news-title">
                    <span>Lehrperson</span>
                    <img
                        src={ExclamationMarkImage}

                    />
                </div>
                {
                    state.blnShowInformationBar ?
                        <div className="teacher-header-text">
                            <p> {Localization.TextFormatter(objTextResource, 'YellowBarText')}</p>
                        </div>
                        :
                        <React.Fragment />
                }
                <div className="top-head">
                    <div className="dropdwn-title">
                        <span>Lehrperson:</span>
                    </div>
                    <div className="content-dropdown">
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
                        <button className="button yellow-button information-button" onClick={() => { objContext.Teacher_ModuleProcessor.UpdateInformationPopupStatus(objContext) }}>{state.blnShowInformationBar ? Localization.TextFormatter(objTextResource, 'HideInformationBar') : Localization.TextFormatter(objTextResource, 'ShowInformationBar')}</button>
                    </div>
                </div>

                <table className="teacher-grid-headings">

                </table>

                <div className="teacher-grid-wrap">
                    <PerformanceProfiler ComponentName={"TeacherGrid"} JConfiguration={props.JConfiguration} >
                        <Grid
                            Id="TeacherGrid"
                            Meta={objContext.Teacher_ModuleProcessor.GetGridMetaData(objContext, objTextResource)}
                            Data={objContext.Teacher_ModuleProcessor.GetGridData(objContext)}
                            Resource={objContext.Teacher_ModuleProcessor.GetGridResourceData(objContext, objTextResource)}
                            CallBacks={{...objContext.Teacher_ModuleProcessor.GetGridCallBacks(objContext, objTextResource), CustomEdit: (objData) => objContext.Teacher_ModuleProcessor.AddEditPopup(objContext, objTextResource, objData, true)}}
                            ParentProps={{ ...props }}
                            ImageMeta={GetImageMeta()}
                        />
                    </PerformanceProfiler>
                </div>

                <ImportData Resource={{ Text: objTextResource, SkinPath: props.JConfiguration.ExtranetSkinPath }} {...props} />
            </div>
        );
    }

    return props.isLoadComplete || state.isLoadComplete ? GetContent() : <React.Fragment />;

}

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