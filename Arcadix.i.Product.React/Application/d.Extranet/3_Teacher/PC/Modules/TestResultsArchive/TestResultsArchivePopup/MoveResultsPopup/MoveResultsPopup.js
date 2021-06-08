
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import AutoComplete from '@root/Framework/Controls/AutoComplete/AutoComplete';
import * as MoveResultsBusinessLogic from "@shared/Application/d.Extranet/3_Teacher/PC/Modules/TestResults/MoveResults/MoveResultsBusinessLogic";
import React, {
    useState,
    useEffect,
    useReducer,
    useLayoutEffect,
    useMutationEffect
} from "react";

//Inline Images import
import CloseImage from '@inlineimage/Application/d.Extranet/5_Shared/PC/close.svg?inline';

const MoveResults = props => {

    /**
   * @summary Provides satate and dispatch.
   */
    const [state, dispatch] = useReducer(MoveResultsBusinessLogic.Reducer, MoveResultsBusinessLogic.GetInitialState());

    /**
     * @summary Combines state, props and dispatch in one object, which is sent as a parameter to funtions in business logic.
     */
    let objContext = { state, props, dispatch };

    /**
     * @summary Custom hook that makes the request for the data.
     */
    MoveResultsBusinessLogic.useDataLoader(objContext);

    /**
     * @summary Custom hook that Checks if the data is loaded to props.
     */
    MoveResultsBusinessLogic.useDataLoaded(objContext);
    
    MoveResultsBusinessLogic.useStateDataLoaded(objContext);

    MoveResultsBusinessLogic.useSchoolDataLoaded(objContext);
    
    MoveResultsBusinessLogic.useTeacherDataLoaded(objContext);
    
    MoveResultsBusinessLogic.useClassDataLoaded(objContext);

    let GetContent = () => {
        let { objTextResource, objCycleData, objTestResult } = props.Data;
        let iMainClientId = props.Data.ClientUserDetails.MainClientId;
        let arrState = DataRef(props.state, "state;imainclientid;" + iMainClientId + ";cisdeleted;n").Data.map(sta => {
            return {
                iStateId: sta["iStateId"],
                vStateName: sta["t_TestDrive_Member_State_Data"][0]["vStateName"]
            }
        });
        let arrCycle = DataRef(props.cycle, "cycle;imainclientid;" + iMainClientId + ";cisdeleted;n").Data.map(cyc => {
            return {
                uCycleId: cyc["uCycleId"],
                vCycleName: cyc["vCycleName"]
            }
        });

        let arrSchool = [];
        if (state.objState && DataRef(props.school, "school;istateid;" + state.objState.iStateId + ";cisdeleted;n")["Data"]) {
            arrSchool = DataRef(props.school, "school;istateid;" + state.objState.iStateId + ";cisdeleted;n")["Data"].map(sch => {
                return {
                    uSchoolId: sch["uSchoolId"],
                    vSchoolName: sch["vSchoolName"]
                }
            })
        }

        let arrTeacher = [];
        if (state.objSchool && DataRef(props.teacher, "teacher;t_testdrive_member_teacher_school.uschoolid;" + state.objSchool.uSchoolId + ";t_testdrive_member_teacher_school.cisdeleted;n")["Data"]) {
            arrTeacher = DataRef(props.teacher, "teacher;t_testdrive_member_teacher_school.uschoolid;" + state.objSchool.uSchoolId + ";t_testdrive_member_teacher_school.cisdeleted;n")["Data"].map(tea => {
                return {
                    uTeacherId: tea["uTeacherId"],
                    vTeacherName: tea["vName"] + " " + tea["vFirstName"]
                }
            })
        }

        let arrClass = [];
        if (state.objTeacher && DataRef(props.class, "class;t_TestDrive_Member_Class_Teacher.uteacherid;" + state.objTeacher.uTeacherId + ";t_TestDrive_Member_Class_Teacher.cisdeleted;n")["Data"]) {
            arrClass = DataRef(props.class, "class;t_TestDrive_Member_Class_Teacher.uteacherid;" + state.objTeacher.uTeacherId + ";t_TestDrive_Member_Class_Teacher.cisdeleted;n")["Data"].map(cls => {
                return {
                    uClassId: cls["uClassId"],
                    vClassName: cls["vClassName"]
                }
            })
        }

        let arrPupil = [];
        if (state.objClass && DataRef(props.pupil, "pupil;t_TestDrive_Member_Class_Pupil.uclassid;" + state.objClass.uClassId + ";t_TestDrive_Member_Class_Pupil.cisdeleted;n")["Data"]) {
            arrPupil = DataRef(props.pupil, "pupil;t_TestDrive_Member_Class_Pupil.uclassid;" + state.objClass.uClassId + ";t_TestDrive_Member_Class_Pupil.cisdeleted;n")["Data"].map(ppl => {
                return {
                    uPupilId: ppl["uPupilId"],
                    vPupilName: ppl["vName"] + " " + ppl["vFirstName"]
                }
            })
        }
        let strPreSelectSchool = state.objSchool ? '' : undefined;
        let strPreSelectTeacher = state.objTeacher ? '' : undefined;
        let strPreSelectClass = state.objClass ? '' : undefined;
        let strPreSelectPupil = state.objPupil ? '' : undefined;

        return (
            <div className="move-results-popup">
                <div className="move-results-popup-container">
                    <div className="mover-results-head">
                        <h3>{Localization.TextFormatter(objTextResource, 'MoveResults')}</h3>
                        <span
                            className="close"
                            onClick={e => props.closePopUp(props.objModal)}
                        >
                            {Localization.TextFormatter(objTextResource, 'Shutdown')}
                            <img src={CloseImage} />
                        </span>
                    </div>
                    <p>            
                        {Localization.TextFormatter(objTextResource, 'InstructionMessage')}
                     </p>

                    <div className="move-results-flex">
                        <div className="move-results">
                            <div className="input-block">
                                <span>{Localization.TextFormatter(objTextResource, 'Execution')}:</span>
                                <AutoComplete
                                    Data={arrCycle}
                                    PreselectValue={objCycleData.vCycleName}
                                    Placeholder={Localization.TextFormatter(objTextResource, 'PleaseChoose')}
                                    FunctionEvent="onChange"
                                    FieldName="vCycleName"
                                    onChangeEventHandler={() => { MoveResultsBusinessLogic.OnChangeCycleAutoSuggest(objContext, objItem) }}
                                />

                            </div>
                            <div className="input-block">
                                <span>{Localization.TextFormatter(objTextResource, 'School')}:</span>
                                <AutoComplete
                                    Data={arrSchool}
                                    PreselectValue={strPreSelectSchool}
                                    Placeholder={Localization.TextFormatter(objTextResource, 'PleaseChoose')}
                                    FunctionEvent="onChange"
                                    FieldName="vSchoolName"
                                    onChangeEventHandler={(objItem) => { MoveResultsBusinessLogic.OnChangeSchoolAutoSuggest(objContext, objItem) }}
                                />
                            </div>
                            <div className="input-block">
                                <span>{Localization.TextFormatter(objTextResource, 'ClassLabel') }</span>
                                <AutoComplete
                                    Data={arrClass}
                                    PreselectValue={strPreSelectClass}
                                    Placeholder={Localization.TextFormatter(objTextResource, 'PleaseChoose') }
                                    FunctionEvent="onChange"
                                    FieldName="vClassName"
                                    onChangeEventHandler={(objItem) => { MoveResultsBusinessLogic.OnChangeClassAutoSuggest(objContext, objItem) }}
                                />
                            </div>
                        </div>
                        <div className="move-results">
                            <div className="input-block">
                                <span>{Localization.TextFormatter(objTextResource, 'OrganizationalUnit') }:</span>
                                <AutoComplete
                                    Data={arrState}
                                    PreselectValue=''
                                    Placeholder={Localization.TextFormatter(objTextResource, 'PleaseChoose') }
                                    FunctionEvent="onChange"
                                    FieldName="vStateName"
                                    onChangeEventHandler={(objItem) => { MoveResultsBusinessLogic.OnChangeStateAutoSuggest(objContext, objItem) }}
                                />
                            </div>
                            <div className="input-block">
                                <span>{Localization.TextFormatter(objTextResource, 'Teacher') }:</span>
                                <AutoComplete
                                    Data={arrTeacher}
                                    PreselectValue={strPreSelectTeacher}
                                    Placeholder={Localization.TextFormatter(objTextResource, 'PleaseChoose') }
                                    FunctionEvent="onChange"
                                    FieldName="vTeacherName"
                                    onChangeEventHandler={(objItem) => { MoveResultsBusinessLogic.OnChangeTeacherAutoSuggest(objContext, objItem) }}
                                />
                            </div>
                            <div className="input-block">
                                <span>{Localization.TextFormatter(objTextResource, 'Learners') }:</span>
                                <AutoComplete
                                    Data={arrPupil}
                                    PreselectValue={strPreSelectPupil}
                                    Placeholder={Localization.TextFormatter(objTextResource, 'PleaseChoose') }
                                    FunctionEvent="onChange"
                                    FieldName="vPupilName"
                                    onChangeEventHandler={(objItem) => { MoveResultsBusinessLogic.OnChangePupilAutoSuggest(objContext, objItem) }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="move-popup-footer">
                        <button className="button blue-button" onClick={() => { MoveResultsBusinessLogic.MoveResults(objContext, objTestResult, objCycleData)}}>{Localization.TextFormatter(objTextResource, 'FooterText1') }</button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <React.Fragment>{
            state.isLoadComplete ? GetContent() : <div></div>
        }</React.Fragment>
    )
};

MoveResults.DynamicStyles = props => {
    var arrStyles = [
        props.JConfiguration.ExtranetSkinPath +
        "/Css/Application/3_Teacher/ReactJs/PC/TestResults/TestResultsPopup/MoveResults/MoveResults.css"
    ];
    return arrStyles;
};

export default connect(MoveResultsBusinessLogic.mapStateToProps)(MoveResults);


