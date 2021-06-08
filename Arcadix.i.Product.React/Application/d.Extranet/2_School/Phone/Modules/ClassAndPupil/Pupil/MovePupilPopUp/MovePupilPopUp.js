//React related imports
import React, { useReducer } from 'react';
import { connect } from 'react-redux';

//Module related fies.
import * as MovePupilPopUp_Hook from '@shared/Application/d.Extranet/2_School/Phone/Modules/ClassAndPupil/Pupil/MovePupilPopUp/MovePupilPopUp_Hook';
import MovePupilPopUp_ModuleProcessor from "@shared/Application/d.Extranet/2_School/Phone/Modules/ClassAndPupil/Pupil/MovePupilPopUp/MovePupilPopUp_ModuleProcessor";

/**
 * @name MovePupilPopUp
 * @param {any} props props
 * @summary This component consists of MovePupil component.
 * @returns {*} jsx
 */
const MovePupilPopUp = (props) => {

    /**
     * @summary Provides state and dispatch.
     */
    const [state, dispatch] = useReducer(ExtranetBase_Hook.Reducer, MovePupilPopUp_Hook.GetInitialState());

    /**
     * @name Assigning objContext
     * @summary Groups state, props and dispatch and module object in to object, which can be passed across method in the module and used 
     */
    let objContext = { state, props, dispatch, ["MovePupilPopUp_ModuleProcessor"]: new MovePupilPopUp_ModuleProcessor() };


    /**
    * @name  InitializeCss
    * @param {object} props Props
    * @param {object} ModuleProcessor Props
    * @summary Initializing DynamicStyles and Data for SSR
    * @returns Setting ApplicationState
    */
    objContext.MovePupilPopUp_ModuleProcessor.Initialize(objContext, objContext.MovePupilPopUp_ModuleProcessor);

    /**
     * @name Initialize
     * @summary Initialize Custom hooks
     */
    MovePupilPopUp_Hook.Initialize(objContext);

    /**
     * @name ViewPupil
     * @param {*} objPupil objPupil
     * @param {*} blnIsChecked blnIsChecked
     * @summary returns the required jsx for component
     * @returns {*} jsx
     */
    function ViewPupil(objPupil, blnIsChecked) {
        return (
            <tr>
                <td>
                    <label class="select-container">
                        {blnIsChecked ?
                            <input id={objPupil.uPupilId} type="checkbox" onClick={(event) => { objContext.MovePupilPopUp_ModuleProcessor.HandleOnCheckBoxItemChange(objContext, event.target.id, event.target.checked) }} checked /> :
                            <input id={objPupil.uPupilId} type="checkbox" onClick={(event) => { objContext.MovePupilPopUp_ModuleProcessor.HandleOnCheckBoxItemChange(objContext, event.target.id, event.target.checked) }} />
                        }
                        <span class="checkmark"></span>
                    </label>
                    {objPupil.vName}
                </td>
                <td>{objPupil.vFirstName}</td>
                <td>{Localization.DateFormatter(objPupil.vBirthdate)}</td>
            </tr>
        );
    }

    /**
     * @name GetContent
     * @summary returns the jsx
     * @returns {*} jsx
     * */
    function GetContent() {
        let objTextResource = props.Resource.Text;
        let arrTeachers = [];
        let arrSchool = [];

        if (props.JConfiguration.ApplicationTypeId === "6") {
            let arrTempTeachers = objContext.MovePupilPopUp_ModuleProcessor.GetTeachers(objContext);
            arrTeachers = [{
                "uTeacherId": -1,
                "vFirstName": Localization.TextFormatter(objTextResource, 'Please_Select'),
                "vName": ""
            }, ...arrTempTeachers];
            arrSchool = DataRef(props.Object_Extranet_School_School, "Object_Extranet_School_School;iMainClientId;" + ClientUserDetails.MainClientId + ";cIsDeleted;N")["Data"];//objContext.MovePupilPopUp_ModuleProcessor.GetSchools(objContext);
        }
        let objSchoolDropdownData = {
            DropdownData: arrSchool,
            SelectedValue: props.ParentProps.ClientUserDetails.UserId
        };
        let objTeacherDropdown = {
            DropdownData: arrTeachers,
            SelectedValue: state.SelectedTeacherId
        };
        let objClassDropdown = {
            DropdownData: state.arrClassData,
            SelectedValue: state.SelectedClassId
        };


        return (
            <div className="popup-box import-data">
                <div className="importdata-wrapper">
                    <div className="import-head">
                        <div className="import-header-title">
                            <span>{Localization.TextFormatter(objTextResource, 'MovePupilHeading')}</span>
                        </div>
                    </div>

                    <div className="import-data-all-content">

                        <div className={state.classContent}>
                            <div className="popup-content">
                                <p>{Localization.TextFormatter(objTextResource, 'DisplayText')}<br />
                                </p>
                            </div>
                        </div>

                        {
                            props.JConfiguration.ApplicationTypeId === "6" ?
                                <div className="dropdown-all">
                                    <div class="dropdwn-title"><span>{Localization.TextFormatter(objTextResource, 'SchoolDropdownLabel')}</span></div>
                                    <WrapperComponent
                                        ComponentName={"Dropdown"}
                                        Id="SchoolDropdown"
                                        Meta={objContext.MovePupilPopUp_ModuleProcessor.GetMetaDataSchoolDropdown()}
                                        Data={objSchoolDropdownData}
                                        Resource={objContext.MovePupilPopUp_ModuleProcessor.GetResourceDataSchoolDropdown()}
                                        Events={objContext.MovePupilPopUp_ModuleProcessor.GetEventsDataSchoolDropdown(objContext)}
                                        ParentProps={{ ...props }}
                                    />
                                </div>
                                : <React.Fragment></React.Fragment>
                        }
                        {
                            props.JConfiguration.ApplicationTypeId === "6" ?
                                <div className="dropdown-all">
                                    <div class="dropdwn-title"><span>{Localization.TextFormatter(objTextResource, 'TeacherDropdownLabel')}</span></div>
                                    <WrapperComponent
                                        ComponentName={"Dropdown"}
                                        Id="TeacherDropDown"
                                        Meta={objContext.MovePupilPopUp_ModuleProcessor.GetMetaDataTeacherDropdown()}
                                        Data={objTeacherDropdown}
                                        Resource={objContext.MovePupilPopUp_ModuleProcessor.GetResourceDataSchoolDropdown()}
                                        Events={objContext.MovePupilPopUp_ModuleProcessor.GetEventsDataTeacherDropdown(objContext)}
                                        ParentProps={{ ...props }}
                                    />
                                </div>
                                : <React.Fragment></React.Fragment>
                        }

                        <div className="dropdown-all">
                            <div class="dropdwn-title"><span>{Localization.TextFormatter(objTextResource, 'ClassDropdownLabel')}</span></div>
                            <WrapperComponent
                                ComponentName={"Dropdown"}
                                Id="ClassDropDown"
                                Meta={objContext.MovePupilPopUp_ModuleProcessor.GetMetaDataClassDropdown()}
                                Data={objClassDropdown}
                                Resource={objContext.MovePupilPopUp_ModuleProcessor.GetResourceDataClassDropdown(objTextResource)}
                                Events={objContext.MovePupilPopUp_ModuleProcessor.GetEventsDataClassDropdown(objContext)}
                                ParentProps={{ ...props }}
                            />
                        </div>

                        <table className="popup-table-wrapper">
                            <thead>
                                <tr>
                                    <td>
                                        <label class="select-container">
                                            {
                                                state.isSelectAll ?
                                                    <input id="AllPupil" type="checkbox" checked onClick={(event) => { objContext.MovePupilPopUp_ModuleProcessor.HandleOnCheckBoxItemChange(objContext, event.target.id, event.target.checked) }} /> :
                                                    <input id="AllPupil" type="checkbox" onClick={(event) => { objContext.MovePupilPopUp_ModuleProcessor.HandleOnCheckBoxItemChange(objContext, event.target.id, event.target.checked) }} />
                                            }
                                            <span class="checkmark"></span>
                                        </label>
                                        {Localization.TextFormatter(objTextResource, 'Column1')}
                                    </td>
                                    <td>{Localization.TextFormatter(objTextResource, 'Column2')}</td>
                                    <td>{Localization.TextFormatter(objTextResource, 'Column3')}</td>

                                </tr>
                            </thead>
                            <tbody>
                                {state.arrPupilData.map(objPupil => {
                                    let blnIsChecked = false;
                                    if (state.isSelectAll) {
                                        blnIsChecked = true;
                                    }
                                    else {
                                        blnIsChecked = state.arrSelectedPupil.includes(objPupil.uPupilId);
                                    }
                                    return ViewPupil(objPupil, blnIsChecked);
                                })
                                }

                            </tbody>
                        </table>


                    </div>

                    <div className="import-footer-btn">
                        <span onClick={(event) => { Popup.ClosePopup(props.Id) }}>{Localization.TextFormatter(objTextResource, 'CancelButtonText')}</span>
                        <span onClick={(event) => { objContext.MovePupilPopUp_ModuleProcessor.MovePupil(objContext) }}>{Localization.TextFormatter(objTextResource, 'MovePupilButtonText')}</span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <React.Fragment>{state.isLoadComplete ? GetContent() : <React.Fragment />}</React.Fragment>
    );
}

export default connect(ExtranetBase_Hook.MapStoreToProps(MovePupilPopUp_ModuleProcessor.StoreMapList()))(MovePupilPopUp);
