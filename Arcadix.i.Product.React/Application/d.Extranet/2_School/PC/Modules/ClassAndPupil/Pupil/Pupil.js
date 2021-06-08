//React related imports
import React, { useReducer } from 'react';
import { connect } from 'react-redux';

//Module related fies.
import * as Pupil_Hook from '@shared/Application/d.Extranet/2_School/PC/Modules/ClassAndPupil/Pupil/Pupil_Hook';
import Pupil_ModuleProcessor from "@shared/Application/d.Extranet/2_School/PC/Modules/ClassAndPupil/Pupil/Pupil_ModuleProcessor";


//Inline Images import
import imgGridDelete from '@inlineimage/Application/d.Extranet/2_School/PC/Modules/ClassAndPupil/Pupil/GridDelete.svg?inline';
import imgCheckGreen from '@inlineimage/Application/d.Extranet/2_School/PC/Modules/Teacher/check_green.svg?inline';
import imgErrorDeactive from '@inlineimage/Application/d.Extranet/2_School/PC/Modules/Teacher/errorDeactive.svg?inline';
import imgMovePupil from '@inlineimage/Application/d.Extranet/2_School/PC/Modules/ClassAndPupil/Pupil/movePupil.svg?inline';
import imgpluswhite from '@inlineimage/Application/d.Extranet/2_School/PC/Modules/Teacher/pluswhite.svg?inline';


/**
 * @name Pupil
 * @param {any} props props
 * @summary This component consists Pupil component.
 * @returns {*} jsx
 */
const Pupil = (props) => {

    /**
     * @name Initializing Reducer
     * @summary Provides state and dispatch.
     */
    const [state, dispatch] = useReducer(ExtranetBase_Hook.Reducer, Pupil_Hook.GetInitialState(props));

    /**
     * @summary Combines state, props and dispatch in one object, which is sent as a parameter to functions in business logic.
     */
    let objContext = { state, props, dispatch, ["ModuleName"]: "Pupil", ["Pupil_ModuleProcessor"]: new Pupil_ModuleProcessor() };

    /**
     * @name  InitializeDataForSSR
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.Pupil_ModuleProcessor.Initialize(objContext, objContext.Pupil_ModuleProcessor);

    /**
     * @name Initialize
     * @summary Initialize Custom hooks
     */
    Pupil_Hook.Initialize(objContext);

    /**
     * Initializing objClassData object
     * */
    let objClassData = objContext.Pupil_ModuleProcessor.GetClassDataFromApplicationState(objContext);

    let GetStatusToggleDropdown = () => {
        let arrActivationStatusDropdownData = objContext.Pupil_ModuleProcessor.GetActivationStatusToggleData(objContext);
        let strActivationStatusDropdownId = state.intActivationStatusTogglValue !== -1 ? state.intActivationStatusTogglValue : -1;
        let objActivationToggleDropdownData = {
            DropdownData: arrActivationStatusDropdownData,
            SelectedValue: strActivationStatusDropdownId
        };
        let objTextResource = props.TextResource;
        return <WrapperComponent
            ComponentName={"Dropdown"}
            Id="statusToggleDropDown"
            Meta={objContext.Pupil_ModuleProcessor.GetMetaDataStatusToggleDropDown(objContext)}
            Data={objActivationToggleDropdownData}
            Resource={objContext.Pupil_ModuleProcessor.GetResourceDataStatusToggleDropDown(objTextResource)}
            Events={objContext.Pupil_ModuleProcessor.GetEventsStatusToggleDropDown(objContext)}
            ParentProps={{ ...props }
            }
        />
    }

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
            "Activate": imgGridDelete
        }
    }

    /**
     * @name GetContent
     * @summary Returns the required jsx for component
     * @returns {*} jsx
     */
    function GetContent() {
        let objTextResource = props.TextResource;
        let objData = {
            "RowData": state.arrPupilGridData,
            "DropDownData": objContext.Pupil_ModuleProcessor.GetDropdownData(objContext),
            "AdditionalPaddingIds": ["Header", "SubNavigation", "outletBand", "TopHeadClassPupilRightpanel", "TopSpacing", "ClassPupilHeaderText"]
        };
        let objResource = {
            "SkinPath": props.JConfiguration.ExtranetSkinPath,
            "Text": objTextResource,
            "ImagePathDetails": {               
            }
        }

        return (
            <div className="panel-right">
                <div className="padding-top-10" id="TopHeadClassPupilRightpanel">
                    <div className="top-head">
                        <span>{Localization.TextFormatter(objTextResource, 'PupilLabel')} {objClassData && JSON.stringify(objClassData) !== "{}" ? objClassData["vClassName"] : ""}</span>
                        <div className="content-dropdown status-dropdown">
                            <PerformanceProfiler ComponentName={"statusToggleDropDown"} JConfiguration={props.JConfiguration} >
                                {GetStatusToggleDropdown()}
                            </PerformanceProfiler>
                        </div>
                        <button class="button yellow-button information-button" onClick={() => { props.UpdateInformationPopupStatus() }}>{props.ShowInformationBar ? Localization.TextFormatter(objTextResource, 'HideInformationBar') : Localization.TextFormatter(objTextResource, 'ShowInformationBar')}</button>
                    </div>
                </div>
                {props.ShowPuilGrid ?
                    <PerformanceProfiler ComponentName={"PupilGrid"} JConfiguration={props.JConfiguration} >
                        <Grid
                            Id="Pupil_Grid"
                            Meta={objContext.Pupil_ModuleProcessor.GetMetaData(objContext)}
                            Data={objData}
                            Resource={objResource}
                            CallBacks={objContext.Pupil_ModuleProcessor.GetCallBacks(objContext)}
                            ParentProps={{ ...props }}
                            ImageMeta={GetImageMeta()}
                        />
                    </PerformanceProfiler>
                    : <React.Fragment />}

            </div>
        );
    }

    let GetPupilBar = () => {
        let objTextResource = props.TextResource;
        return <React.Fragment>
            <div className="panel-right">
                <div className="padding-top-10" id="TopHeadClassPupilRightpanel">
                    <div className="top-head">
                        <span>{Localization.TextFormatter(objTextResource, 'PupilLabel')} </span>
                        <div className="content-dropdown status-dropdown">
                            <PerformanceProfiler ComponentName={"statusToggleDropDown"} JConfiguration={props.JConfiguration} >
                                {GetStatusToggleDropdown()}
                            </PerformanceProfiler>
                        </div>
                        <button class="button yellow-button information-button" onClick={() => { props.UpdateInformationPopupStatus() }}>{props.ShowInformationBar ? Localization.TextFormatter(objTextResource, 'HideInformationBar') : Localization.TextFormatter(objTextResource, 'ShowInformationBar')}</button>
                    </div>
                </div>
                <div class="no-data">{Localization.TextFormatter(objTextResource, 'SelectClassText')}</div>
            </div>
        </React.Fragment>
    }

    return (
        <React.Fragment>
            {
                objClassData && JSON.stringify(objClassData) !== "{}" && props.isLoadComplete && objClassData["uClassId"] != "00000000-0000-0000-0000-000000000000" ? state.isLoadComplete ? GetContent() : <React.Fragment>{GetPupilBar()}</React.Fragment> : <React.Fragment>{GetPupilBar()}</React.Fragment>
            }
        </React.Fragment>
    );
};

export default connect(ExtranetBase_Hook.MapStoreToProps(Pupil_ModuleProcessor.StoreMapList()))(Pupil);