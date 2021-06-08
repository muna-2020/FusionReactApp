//React related imports
import React, { useReducer } from 'react';
import { connect } from 'react-redux';

//Module related fies.
import * as MovePupilPopUp_Hook from '@shared/Application/d.Extranet/2_School/PC/Modules/ClassAndPupil/Pupil/MovePupilPopUp/MovePupilPopUp_Hook';
import MovePupilPopUp_ModuleProcessor from "@shared/Application/d.Extranet/2_School/PC/Modules/ClassAndPupil/Pupil/MovePupilPopUp/MovePupilPopUp_ModuleProcessor";

//Inline Images import
import ExclamationMarkImage from '@inlineimage/Framework/ReactJs/PC/Controls/OnlineHelp/exclamation_mark.svg?inline';

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
                <td className="select-row">
                    <label className="check-container">
                        {blnIsChecked ?
                            <input id={objPupil.uPupilId} type="checkbox" onClick={(event) => { objContext.MovePupilPopUp_ModuleProcessor.HandleOnCheckBoxItemChange(objContext, event.target.id, event.target.checked) }} checked /> :
                            <input id={objPupil.uPupilId} type="checkbox" onClick={(event) => { objContext.MovePupilPopUp_ModuleProcessor.HandleOnCheckBoxItemChange(objContext, event.target.id, event.target.checked) }} />
                        }
                        <span className="checkmark" />
                    </label>
                </td>
                <td>{objPupil.vName}</td>
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
        let arrState = [];
        if (props.JConfiguration.ApplicationTypeId === "6") {
            let arrTempTeachers = objContext.MovePupilPopUp_ModuleProcessor.GetTeachers(objContext);
            arrTeachers = [{
                "uTeacherId": -1,
                "vFirstName": Localization.TextFormatter(objTextResource, 'Please_Select'),
                "vName": ""
            }, ...arrTempTeachers];
            arrSchool = objContext.MovePupilPopUp_ModuleProcessor.GetSchoolDataForDropdown(objContext);//objContext.MovePupilPopUp_ModuleProcessor.GetSchools(objContext);
            arrState = DataRef(props.Object_Extranet_State_State, "Object_Extranet_State_State;cIsDeleted;N")["Data"];
            arrState = arrState.filter(x => x["vName"] && x["vFirstName"])
        }
        let objSchoolDropdownData = {
            DropdownData: arrSchool,
            SelectedValue: props.ParentProps.ClientUserDetails.UserId
        };

        let objStateDropdownData = {
            DropdownData: arrState,
            SelectedValue: arrState.length > 0 ? arrState[0]["iStateId"] : "-1"
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
            <div className="move-pupil-wrapper">
                <div className="move-pupil-header" id="MovePupilHeader">
                    <span>{Localization.TextFormatter(objTextResource, 'MovePupilHeading')}</span>
                    <span>{Localization.TextFormatter(objTextResource, 'DisplayText')}</span>
                </div>
                <div className="search-content" id="SearchList">
                    {
                        props.JConfiguration.ApplicationTypeId === "6" ?
                            <div className="teacher-dropdown">
                                <label>{Localization.TextFormatter(objTextResource, 'StateDropdownLabel')}</label>
                                <WrapperComponent
                                    ComponentName={"Dropdown"}
                                    Id="StateDropdown"
                                    Meta={objContext.MovePupilPopUp_ModuleProcessor.GetMetaDataStateDropdown()}
                                    Data={objStateDropdownData}
                                    Resource={objContext.MovePupilPopUp_ModuleProcessor.GetResourceDataStateDropdown()}
                                    Events={objContext.MovePupilPopUp_ModuleProcessor.GetEventsDataStateDropdown(objContext)}
                                    ParentProps={{ ...props }}
                                />
                            </div> : <React.Fragment></React.Fragment>
                    }
                    {
                        props.JConfiguration.ApplicationTypeId === "6" ?
                            <div className="teacher-dropdown">
                                <label>{Localization.TextFormatter(objTextResource, 'SchoolDropdownLabel')}</label>
                                <WrapperComponent
                                    ComponentName={"Dropdown"}
                                    Id="SchoolDropdown"
                                    Meta={objContext.MovePupilPopUp_ModuleProcessor.GetMetaDataSchoolDropdown()}
                                    Data={objSchoolDropdownData}
                                    Resource={objContext.MovePupilPopUp_ModuleProcessor.GetResourceDataSchoolDropdown()}
                                    Events={objContext.MovePupilPopUp_ModuleProcessor.GetEventsDataSchoolDropdown(objContext)}
                                    ParentProps={{ ...props }}
                                />
                            </div> : <React.Fragment></React.Fragment>
                    }
                    {
                        props.JConfiguration.ApplicationTypeId === "6" ?
                            <div className="teacher-dropdown">
                                <label>{Localization.TextFormatter(objTextResource, 'TeacherDropdownLabel')}</label>
                                <WrapperComponent
                                    ComponentName={"Dropdown"}
                                    Id="TeacherDropDown"
                                    Meta={objContext.MovePupilPopUp_ModuleProcessor.GetMetaDataTeacherDropdown()}
                                    Data={objTeacherDropdown}
                                    Resource={objContext.MovePupilPopUp_ModuleProcessor.GetResourceDataSchoolDropdown()}
                                    Events={objContext.MovePupilPopUp_ModuleProcessor.GetEventsDataTeacherDropdown(objContext)}
                                    ParentProps={{ ...props }}
                                />
                            </div> : <React.Fragment></React.Fragment>
                    }
                    <label>{Localization.TextFormatter(objTextResource, 'ClassDropdownLabel')}</label>
                    <div id="div_classDropdown" className={JSON.stringify(state.objValidationResult) === "{}" || state.objValidationResult["ValidatedField"] !== "div_classDropdown" ? "class-dropdown" : "class-dropdown validation-border"}>
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
                </div>
                <WrapperComponent
                    ComponentName={"FillHeight"}
                    Id="FillHeightMovePupilPopUp"
                    Meta={objContext.MovePupilPopUp_ModuleProcessor.GetMetaDataFillheightMovePupilPopUp(objContext)}
                    ParentProps={{ ...props }}>
                    <table className="movepupildatapopup">
                        <tbody>
                            <tr className="table-header">
                                <td className="select-row">
                                    <label className="check-container">
                                        {
                                            state.isSelectAll ?
                                                <input id="AllPupil" type="checkbox" checked onClick={(event) => { objContext.MovePupilPopUp_ModuleProcessor.HandleOnCheckBoxItemChange(objContext, event.target.id, event.target.checked) }} /> :
                                                <input id="AllPupil" type="checkbox" onClick={(event) => { objContext.MovePupilPopUp_ModuleProcessor.HandleOnCheckBoxItemChange(objContext, event.target.id, event.target.checked) }} />
                                        }
                                        <span className="checkmark" />
                                    </label>
                                </td>
                                <td>{Localization.TextFormatter(objTextResource, 'Column1')}</td>
                                <td>{Localization.TextFormatter(objTextResource, 'Column2')}</td>
                                <td>{Localization.TextFormatter(objTextResource, 'Column3')}</td>
                            </tr>
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
                </WrapperComponent>
                <div className="move-pupil-footer" id="MovePupilFooter">
                    <div>

                    </div>
                    <div class="error-block">
                        {state.objValidationResult["IsValid"] === false ?
                            <img src={ExclamationMarkImage} alt="" /> : <React.Fragment />
                        }
                        <b>
                            {state.objValidationResult["ValidationMessage"]}
                        </b>
                        {
                            state.blnDuplicatePupilPresent == true ? <b>{objTextResource.MergePupilValidationMessage} </b> : ''
                        }
                    </div>
                    <div>
                        <span className="button brown-button" onClick={(event) => { Popup.ClosePopup(props.Id) }}>{Localization.TextFormatter(objTextResource, 'CancelButtonText')}</span>
                        <span className="button brown-button" onClick={(event) => { objContext.MovePupilPopUp_ModuleProcessor.MovePupil(objContext) }}>{Localization.TextFormatter(objTextResource, 'MovePupilButtonText')}</span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <React.Fragment>{state.isLoadComplete ? GetContent() : <React.Fragment />}</React.Fragment>
    );
};

export default connect(ExtranetBase_Hook.MapStoreToProps(MovePupilPopUp_ModuleProcessor.StoreMapList()))(MovePupilPopUp);
