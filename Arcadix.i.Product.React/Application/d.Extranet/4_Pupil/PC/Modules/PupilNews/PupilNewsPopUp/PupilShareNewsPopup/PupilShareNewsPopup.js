//React imports
import React, { useState } from "react";

//Inline Images import
import imgAllClassNeutral from '@inlineimage/Application/d.Extranet/4_Pupil/PC/Modules/PupilNews/PupilNewsPopUp/PupilShareNewsPopup/all_class_neutral.svg?inline';
import imgProfile1 from '@inlineimage/Application/d.Extranet/4_Pupil/PC/Modules/PupilNews/PupilNewsPopUp/PupilShareNewsPopup/profile1.png?inline';
import imgProfile10 from '@inlineimage/Application/d.Extranet/4_Pupil/PC/Modules/PupilNews/PupilNewsPopUp/PupilShareNewsPopup/profile10.png?inline';
import imgExclamationMark from '@inlineimage/Application/d.Extranet/4_Pupil/PC/Modules/PupilNews/PupilNewsPopUp/PupilShareNewsPopup/exclamation_mark.svg?inline';
import imgMainTeacher from '@inlineimage/Application/d.Extranet/4_Pupil/PC/Modules/PupilNews/PupilNewsPopUp/PupilShareNewsPopup/MainTeacher.svg?inline';
import imgClassTeacher from '@inlineimage/Application/d.Extranet/4_Pupil/PC/Modules/PupilNews/PupilNewsPopUp/PupilShareNewsPopup/ClassTeacher.svg?inline';
import imgSubjectExpert from '@inlineimage/Application/d.Extranet/4_Pupil/PC/Modules/PupilNews/PupilNewsPopUp/PupilShareNewsPopup/SubjectExpert.svg?inline';
import imgIconSharedGroupBrown from '@inlineimage/Application/d.Extranet/4_Pupil/PC/Modules/PupilNews/PupilNewsPopUp/PupilShareNewsPopup/icon_shared_group_brown.png?inline';

const PupilShareNewsPopup = props => {

    var objShareNewsPopupData = props.Data.GetDataForGroupPopup();
    const objTextResource = objShareNewsPopupData.objTextResource;
    const [arrSelectedUsersData, setSelectedUsersData] = useState([]);
    const [strValidationMessage, setValidationMessage] = useState('')

    /**
     * @name OnClickCheckMark
     * @summary checks or unchecks the checkbox
     * @param {any} strType
     * @param {any} strUserID
     */
    const OnClickCheckMark = (strType, strUserID) => {
        var arrNewUsersData = [];
        setValidationMessage('');
        if (arrSelectedUsersData.findIndex(item => { return (item.uUserId == strUserID || item.uGroupId == strUserID) }) === -1) {
            var objToAdd = {
                'uGroupId': strType === "group" ? strUserID : "00000000-0000-0000-0000-000000000000",
                "uUserId": strType !== "group" ? strUserID : "00000000-0000-0000-0000-000000000000",
                "cIsPupil": strType === "pupil" ? "Y" : "N",
                "cIsTeacher": strType === "teacher" ? "Y" : "N",
                "cIsForGroup": strType === "group" ? "Y" : "N",
                "cHasBeenViewed": "N",
                "cIsDeleted": "N"
            }
            arrNewUsersData = [...arrSelectedUsersData, objToAdd];
            setSelectedUsersData(arrNewUsersData);
        }
        else {
            arrNewUsersData = arrSelectedUsersData.filter(item => {
                return ((item.cIsForGroup == 'N' && item.uUserId != strUserID) || (item.cIsForGroup == 'Y' && item.uGroupId != strUserID))
            });
            setSelectedUsersData(arrNewUsersData);
        }
    }

    let GetMarkAllCheckBox = () => {
        let blnChecked = arrSelectedUsersData.length != 0 && arrSelectedUsersData.length == (objShareNewsPopupData.arrCoTeachers.length + objShareNewsPopupData.arrSubjectExperts.length + objShareNewsPopupData.arrPupilData.length + objShareNewsPopupData.arrGroupData.length + 1);
        return <li id="MarkAll">
            <div className="participant-name-icons">
                <img src={imgAllClassNeutral} alt="" />
                <span className="participants-name">{Localization.TextFormatter(objTextResource, 'MarkAll')}</span>
            </div>
            <div className="check-list" >
                <input type="checkbox" id="MarkAll" />
                <label className={blnChecked ? "checkmark" : "checkmark unchecked"} for="MarkAll" onClick={(e) => { OnClickAll(!blnChecked) }} />
            </div>
        </li>
    }

    let OnClickAll = (blnChecked) => {
        if (blnChecked) {
            let arrNewUsersData = [];
            objShareNewsPopupData.arrCoTeachers.map(objTchr => {
                let objToAdd = {
                    "uUserId": objTchr["uTeacherId"],
                    "cIsPupil": "N",
                    "cIsTeacher": "Y",
                    "cIsDeleted": "N",
                    'uGroupId': "00000000-0000-0000-0000-000000000000",
                    "cIsForGroup": "N",
                    "cHasBeenViewed": "N",
                }
                arrNewUsersData = [...arrNewUsersData, objToAdd]
            })
            objShareNewsPopupData.arrSubjectExperts.map(objTchr => {
                let objToAdd = {
                    "uUserId": objTchr["uTeacherId"],
                    "cIsPupil": "N",
                    "cIsTeacher": "Y",
                    "cIsDeleted": "N",
                    'uGroupId': "00000000-0000-0000-0000-000000000000",
                    "cIsForGroup": "N",
                    "cHasBeenViewed": "N",
                }
                arrNewUsersData = [...arrNewUsersData, objToAdd]
            })
            let objMainTeacherAdd = {
                "uUserId": objShareNewsPopupData.objMainTeacher["uTeacherId"],
                "cIsPupil": "N",
                "cIsTeacher": "Y",
                "cIsDeleted": "N",
                'uGroupId': "00000000-0000-0000-0000-000000000000",
                "cIsForGroup": "N",
                "cHasBeenViewed": "N",
            };

            arrNewUsersData = [...arrNewUsersData, objMainTeacherAdd];

            objShareNewsPopupData.arrPupilData.map(objPpl => {
                let objToAdd = {
                    "uUserId": objPpl["uPupilId"],
                    "cIsPupil": "Y",
                    "cIsTeacher": "N",
                    "cIsDeleted": "N",
                    'uGroupId': "00000000-0000-0000-0000-000000000000",
                    "cIsForGroup": "N",
                    "cHasBeenViewed": "N",
                }
                arrNewUsersData = [...arrNewUsersData, objToAdd]
            })

            objShareNewsPopupData.arrGroupData.map(objGrp => {
                var objToAdd = {
                    'uGroupId': objGrp["uNewsGroupId"],
                    "uUserId": "00000000-0000-0000-0000-000000000000",
                    "cIsPupil": "N",
                    "cIsTeacher": "N",
                    "cIsForGroup": "Y",
                    "cHasBeenViewed": "N",
                    "cIsDeleted": "N"
                }
                arrNewUsersData = [...arrNewUsersData, objToAdd]
            })

            setSelectedUsersData(arrNewUsersData);
        } else {
            setSelectedUsersData([])
        }
    }

    /**
     * @name GetMainteacherLi
     * @summary returns the main teacher element
     * */
    const GetMainteacherLi = () => {
        var objMainTeacher = objShareNewsPopupData.objMainTeacher;
        var ReturnLi = [];
        if (objMainTeacher && objMainTeacher.uTeacherId) {
            var blnChecked = arrSelectedUsersData.findIndex(objUser => { return objUser.uUserId === objMainTeacher.uTeacherId }) > -1 ? true : false;
            var strTeacherName = props.Data.GetTeacherName(objMainTeacher.uTeacherId);
            ReturnLi = <li id={objMainTeacher.uTeacherId} type="mainteacher">
                <div className="participant-name-icons">
                    <img src={imgMainTeacher} alt="" />
                    <span className="participants-name">{strTeacherName}</span>
                </div>
                <div className="check-list" >
                    <input type="checkbox" id={strTeacherName} />
                    <label className={blnChecked ? "checkmark" : "checkmark unchecked"} for={strTeacherName} onClick={(e) => { OnClickCheckMark("teacher", objMainTeacher.uTeacherId) }} />
                </div>
            </li>
        }
        return ReturnLi;
    }

    /**
    * @name GetCoteachersLis
    * @summary returns the co teachers elements
    * */
    const GetCoteachersLis = () => {
        var arrCoTeachers = objShareNewsPopupData.arrCoTeachers;
        var returnLis = [];
        arrCoTeachers.map((item, i) => {
            var blnChecked = arrSelectedUsersData.findIndex(objUser => { return objUser.uUserId === item.uTeacherId }) > -1 ? true : false;
            var strTeacherName = props.Data.GetTeacherName(item.uTeacherId);
            var SingleLi = <li id={item.uTeacherId} type="coteacher">
                <div className="participant-name-icons">
                    <img src={imgClassTeacher} alt="" />
                    <span className="participants-name">{strTeacherName + i}</span>
                </div>
                <div className="check-list" >
                    <input type="checkbox" id={strTeacherName} />
                    <label className={blnChecked ? "checkmark" : "checkmark unchecked"} for={strTeacherName + i} onClick={(e) => { OnClickCheckMark("teacher", item.uTeacherId) }} />
                </div>
            </li>
            returnLis = [...returnLis, SingleLi];
        })
        return returnLis;
    }

    /**
     * @name GetSubjectExpertsLis
     * @summary returns the subject experts elements
     * */
    const GetSubjectExpertsLis = () => {
        var arrSubjectExperts = objShareNewsPopupData.arrSubjectExperts;
        var returnLis = [];
        arrSubjectExperts.map((item, i) => {
            var blnChecked = arrSelectedUsersData.findIndex(objUser => { return objUser.uUserId === item.uTeacherId }) > -1 ? true : false;
            var strTeacherName = props.Data.GetTeacherName(item.uTeacherId);
            var SingleLi = <li id={item.uTeacherId} type="subjectexpert">
                <div className="participant-name-icons">
                    <img src={imgSubjectExpert} alt="" />
                    <span className="participants-name">{props.Data.GetTeacherName(item.uTeacherId)}</span>
                </div>
                <div className="check-list" >
                    <input type="checkbox" id={strTeacherName + i} />
                    <label className={blnChecked ? "checkmark" : "checkmark unchecked"} for={strTeacherName + i} onClick={(e) => { OnClickCheckMark("teacher", item.uTeacherId) }} />
                </div>
            </li>
            returnLis = [...returnLis, SingleLi];
        })
        return returnLis;
    }

    /**
    * @name GetGroupsLis
    * @summary returns the group elements
    * */
    const GetGroupsLis = () => {
        var arrGroups = objShareNewsPopupData.arrGroupData.filter(item => { return item.cIsDeleted == "N" });
        var returnLis = [];
        arrGroups.map((item, i) => {
            var blnChecked = arrSelectedUsersData.findIndex(objUser => { return objUser.uGroupId == item.uNewsGroupId }) > -1 ? true : false;
            var strGroupName = item.vGroupName;
            var SingleLi = <li id={item.uNewsGroupId} type="group">
                <div className="participant-name-icons">
                    <img src={imgIconSharedGroupBrown} alt="" />
                    <span className="participants-name">{strGroupName}</span>
                </div>
                <div className="check-list" >
                    <input type="checkbox" id={strGroupName + i} checked={blnChecked} />
                    <label className={blnChecked ? "checkmark" : "checkmark unchecked"} for={strGroupName + i} onClick={(e) => { OnClickCheckMark("group", item.uNewsGroupId) }} />
                </div>
            </li>
            returnLis = [...returnLis, SingleLi];
        })
        return returnLis;
    }
    /**
     * @name GetPupilLis
     * @summary returns the pupil elements
     * */
    const GetPupilLis = () => {
        var arrPupilData = objShareNewsPopupData.arrPupilData;
        var returnLis = [];
        arrPupilData.map((item, i) => {
            var blnChecked = arrSelectedUsersData.findIndex(objUser => { return objUser.uUserId === item.uPupilId }) > -1 ? true : false;
            var strPupilName = item.vFirstName + " " + item.vName;
            var SingleLi = <li id={item.uPupilId} type="pupil">
                <div className="participant-name-icons">
                    <img src={item.iGenderId === 0 ? imgProfile1 : imgProfile10} alt="" />
                    <span className="participants-name">{strPupilName}</span>
                </div>
                <div className="check-list" >
                    <input type="checkbox" id={strPupilName + i} />
                    <label className={blnChecked ? "checkmark" : "checkmark unchecked"} for={strPupilName + i} onClick={(e) => { OnClickCheckMark("pupil", item.uPupilId) }} />
                </div>
            </li>
            returnLis = [...returnLis, SingleLi];
        })
        return returnLis;
    }

    /**
     * @name Validate
     * @summary validates the user is selected or not.
     * */
    let Validate = () => {
        if (arrSelectedUsersData && arrSelectedUsersData.length == 0) {
            setValidationMessage(objTextResource.OneUserRequired)

        } else {
            props.Data.ForwardMessage(arrSelectedUsersData);
            Popup.ClosePopup(props.Id);
        }
    }

    return (
        <div className="share-folder-wrapper-news">
            <div className="share-news">
                <ul className="add-participant">
                    {GetMarkAllCheckBox()}
                    {GetMainteacherLi()}
                    {GetCoteachersLis()}
                    {GetSubjectExpertsLis()}
                    {GetGroupsLis()}
                    {GetPupilLis()}
                </ul>
            </div>

            <div class="footer-block">
                {strValidationMessage.length > 0 ?
                    <React.Fragment>
                        <div className="error-msg">
                            <img src={imgExclamationMark} alt="" />
                            <span>{strValidationMessage}</span>
                        </div>
                    </React.Fragment>
                    :
                    <React.Fragment />
                }{/*footer id*/}
                <div className="footer-button-section">
                    <button className="button orange-button" onClick={e => Popup.ClosePopup(props.Id)}> {Localization.TextFormatter(objTextResource, 'Cancel')} </button>
                    <button className="button orange-button" onClick={e => { Validate() }}>{Localization.TextFormatter(objTextResource, 'Forward')}</button>
                </div>
            </div>
        </div>
    );
};

export default PupilShareNewsPopup;
