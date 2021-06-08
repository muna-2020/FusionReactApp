//React imports
import React, { useState } from "react";

//Inline Images import
import ClassTeacherImage from '@inlineimage/Application/d.Extranet/3_Teacher/PC/Modules/TeacherNews/ClassTeacher.svg?inline';
import SubjectExpertImage from '@inlineimage/Application/d.Extranet/3_Teacher/PC/Modules/TeacherNews/SubjectExpert.svg?inline';
import ProfileMaleImage from '@inlineimage/Application/d.Extranet/3_Teacher/PC/Modules/TeacherNews/profile1.png?inline';
import ProfileFemaleImage from '@inlineimage/Application/d.Extranet/3_Teacher/PC/Modules/TeacherNews/profile10.png?inline';
import AllClassImage from '@inlineimage/Application/d.Extranet/3_Teacher/PC/Modules/TeacherNews/all_class_neutral.svg?inline';
import SharedGroupBrownImage from '@inlineimage/Application/d.Extranet/3_Teacher/PC/Modules/TeacherNews/icon_shared_group_brown.png?inline';
import ExclamationMarkImage from '@inlineimage/Application/d.Extranet/5_Shared/PC/exclamation_mark.svg?inline';


/**
 * @name TeacherShareNewsPopup
 * @summary component for select users to send forward message
 * @param {any} props
 * @returns {Element}
 */
const TeacherShareNewsPopup = props => {

    var objGroupPopupData = props.Data.GetDataForGroupPopup();
    const objTextResource = objGroupPopupData.objTextResource;
    const [arrSelectedData, setSelctedData] = useState([]);
    const [strValidationMessage, setValidationMessage] = useState('')

    /**
     * @name OnClickCheckMark
     * @summary checks or unchecks the checkbox
     * @param {any} strType
     * @param {any} strUserId
     */
    const OnClickCheckMark = (strType, strUserId) => {
        var arrNewSelectedData = [];
        if (arrSelectedData.filter(item => item.uUserId == strUserId || item.uGroupId == strUserId).length == 0) {
            var objToAdd = {
                "uGroupId": strType === "group" ? strUserId : "00000000-0000-0000-0000-000000000000",
                "uUserId": strType !== "group" ? strUserId : "00000000-0000-0000-0000-000000000000",
                "cIsPupil": strType === "pupil" ? "Y" : "N",
                "cIsTeacher": strType === "teacher" ? "Y" : "N",
                "cIsForGroup": strType === "group" ? "Y" : "N",
                "cHasBeenViewed": "N",
                "cIsDeleted": "N"
            }
            arrNewSelectedData = [...arrSelectedData, objToAdd];
            setSelctedData(arrNewSelectedData);
        }
        else {
            arrNewSelectedData = arrSelectedData.filter(item => (item.cIsForGroup == 'N' && item.uUserId != strUserId) || (item.cIsForGroup == 'Y' && item.uGroupId != strUserId));
            setSelctedData(arrNewSelectedData);
        }
    }

    /**
     * @name GetMainteacherLi
     * @summary returns the main teacher element
     * */
    const GetMainteacherLi = () => {
        var objMainTeacher = objGroupPopupData.objMainTeacher;
        var ReturnLi = [];
        if (objMainTeacher && objMainTeacher.uTeacherId && objMainTeacher.uTeacherId != ClientUserDetails.UserId) {
            var blnChecked = arrSelectedData.filter(itemGroupData => itemGroupData.uUserId == objMainTeacher.uTeacherId).length > 0;
            var strTeacherName = props.Data.GetTeacherName(objMainTeacher.uTeacherId);
            ReturnLi = <li id={'li_' + objMainTeacher.uTeacherId} type="mainteacher">
                <div className="participant-name-icons">
                    <img src={ClassTeacherImage} alt="" />
                    <span className="participants-name">{strTeacherName}</span>
                </div>
                <div className="check-list" >
                    <input type="checkbox" id={objMainTeacher.uTeacherId} />
                    <label className={blnChecked ? "checkmark" : "checkmark unchecked"} for={objMainTeacher.uTeacherId} onClick={(e) => { OnClickCheckMark("teacher", objMainTeacher.uTeacherId) }} />
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
        var arrCoTeachers = objGroupPopupData.arrCoTeachers;
        var returnLis = [];
        arrCoTeachers.filter(x => x["uTeacherId"] != ClientUserDetails.UserId).map((item, i) => {
            var blnChecked = arrSelectedData.filter(itemGroupData => itemGroupData.uUserId == item.uTeacherId).length > 0;
            var strTeacherName = props.Data.GetTeacherName(item.uTeacherId);
            var SingleLi = <li id={'li_' + item.uTeacherId} type="coteacher">
                <div className="participant-name-icons">
                    <img src={ClassTeacherImage} alt="" />
                    <span className="participants-name">{strTeacherName + i}</span>
                </div>
                <div className="check-list" >
                    <input type="checkbox" id={item.uTeacherId} />
                    <label className={blnChecked ? "checkmark" : "checkmark unchecked"} for={item.uTeacherId} onClick={(e) => { OnClickCheckMark("teacher", item.uTeacherId) }} />
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
        var arrSubjectExperts = objGroupPopupData.arrSubjectExperts;
        var returnLis = [];
        arrSubjectExperts.filter(x => x["uTeacherId"] != ClientUserDetails.UserId).map((item, i) => {
            var blnChecked = arrSelectedData.filter(itemGroupData => itemGroupData.uUserId == item.uTeacherId).length > 0;
            var strTeacherName = props.Data.GetTeacherName(item.uTeacherId);
            var SingleLi = <li id={'li_' + item.uTeacherId} type="subjectexpert">
                <div className="participant-name-icons">
                    <img src={SubjectExpertImage} alt="" />
                    <span className="participants-name">{strTeacherName}</span>
                </div>
                <div className="check-list" >
                    <input type="checkbox" id={item.uTeacherId} />
                    <label className={blnChecked ? "checkmark" : "checkmark unchecked"} for={item.uTeacherId} onClick={(e) => { OnClickCheckMark("teacher", item.uTeacherId) }} />
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
        var arrGroupData = objGroupPopupData.arrGroupData.filter(item => { return item.cIsDeleted === "N" });
        var returnLis = [];
        arrGroupData.map((item, i) => {
            var blnChecked = arrSelectedData.filter(itemGroupData => itemGroupData.uGroupId == item.uNewsGroupId).length > 0;
            var strGroupName = item.vGroupName;
            var SingleLi = <li id={'li_' + item.uNewsGroupId} type="group">
                <div className="participant-name-icons">
                    <img src={SharedGroupBrownImage} alt="" />
                    <span className="participants-name">{strGroupName}</span>
                </div>
                <div className="check-list" >
                    <input type="checkbox" id={item.uNewsGroupId} />
                    <label className={blnChecked ? "checkmark" : "checkmark unchecked"} for={item.uNewsGroupId} onClick={(e) => { OnClickCheckMark("group", item.uNewsGroupId) }} />
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
        var arrPupilData = objGroupPopupData.arrPupilData;
        var returnLis = [];
        arrPupilData.map((item, i) => {
            var blnChecked = arrSelectedData.filter(itemGroupData => itemGroupData.uUserId == item.uPupilId).length > 0;
            var strPupilName = item.vFirstName + " " + item.vName;
            var SingleLi = <li id={'li_' + item.uPupilId} type="pupil">
                <div className="participant-name-icons">
                    <img src={item.iGenderId == 0 ? ProfileMaleImage : ProfileFemaleImage} alt="" />
                    <span className="participants-name">{strPupilName}</span>
                </div>
                <div className="check-list" >
                    <input type="checkbox" id={item.uPupilId} />
                    <label className={blnChecked ? "checkmark" : "checkmark unchecked"} for={item.uPupilId} onClick={(e) => { OnClickCheckMark("pupil", item.uPupilId) }} />
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
        if (arrSelectedData && arrSelectedData.length == 0) {
            setValidationMessage(objTextResource.OneUserRequired)

        } else {
            props.Data.ForwardMessage(arrSelectedData);
            Popup.ClosePopup(props.Id);
        }
    }

    let GetMarkAllCheckBox = () => {
        let blnChecked = arrSelectedData.length != 0 && arrSelectedData.length == (objGroupPopupData.arrCoTeachers.length + objGroupPopupData.arrSubjectExperts.length + objGroupPopupData.arrPupilData.length + objGroupPopupData.arrGroupData.length);
        return <li id="MarkAll">
            <div className="participant-name-icons">
                <img src={AllClassImage} alt="" />
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
            let arrNewSelectedData = [];
            objGroupPopupData.arrCoTeachers.filter(x => x["uTeacherId"] != ClientUserDetails.UserId).map(objTchr => {
                let objToAdd = {
                    "uUserId": objTchr["uTeacherId"],
                    "cIsPupil": "N",
                    "cIsTeacher": "Y",
                    "cIsDeleted": "N",
                    'uGroupId': "00000000-0000-0000-0000-000000000000",
                    "cIsForGroup": "N",
                    "cHasBeenViewed": "N",
                }
                arrNewSelectedData = [...arrNewSelectedData, objToAdd]
            })
            objGroupPopupData.arrSubjectExperts.filter(x => x["uTeacherId"] != ClientUserDetails.UserId).map(objTchr => {
                let objToAdd = {
                    "uUserId": objTchr["uTeacherId"],
                    "cIsPupil": "N",
                    "cIsTeacher": "Y",
                    "cIsDeleted": "N",
                    'uGroupId': "00000000-0000-0000-0000-000000000000",
                    "cIsForGroup": "N",
                    "cHasBeenViewed": "N",
                }
                arrNewSelectedData = [...arrNewSelectedData, objToAdd]
            })
            if (objGroupPopupData.objMainTeacher["uTeacherId"] != ClientUserDetails.UserId) {
                let objMainTeacherAdd = {
                    "uUserId": objGroupPopupData.objMainTeacher["uTeacherId"],
                    "cIsPupil": "N",
                    "cIsTeacher": "Y",
                    "cIsDeleted": "N",
                    'uGroupId': "00000000-0000-0000-0000-000000000000",
                    "cIsForGroup": "N",
                    "cHasBeenViewed": "N",
                };
                arrNewSelectedData = [...arrNewSelectedData, objMainTeacherAdd];
            }

            objGroupPopupData.arrPupilData.map(objPpl => {
                let objToAdd = {
                    "uUserId": objPpl["uPupilId"],
                    "cIsPupil": "Y",
                    "cIsTeacher": "N",
                    "cIsDeleted": "N",
                    'uGroupId': "00000000-0000-0000-0000-000000000000",
                    "cIsForGroup": "N",
                    "cHasBeenViewed": "N",
                }
                arrNewSelectedData = [...arrNewSelectedData, objToAdd]
            });

            objGroupPopupData.arrGroupData.map(objGrp => {
                var objToAdd = {
                    'uGroupId': objGrp["uNewsGroupId"],
                    "uUserId": "00000000-0000-0000-0000-000000000000",
                    "cIsPupil": "N",
                    "cIsTeacher": "N",
                    "cIsForGroup": "Y",
                    "cHasBeenViewed": "N",
                    "cIsDeleted": "N"
                }
                arrNewSelectedData = [...arrNewSelectedData, objToAdd]
            });

            setSelctedData(arrNewSelectedData);
        } else {
            setSelctedData([])
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

            <div class="footer-section">
                <div className="error-msg">
                    {
                        strValidationMessage.length > 0
                            ? <React.Fragment>
                                <img src={ExclamationMarkImage} alt="" />
                                <span>{strValidationMessage}</span>
                            </React.Fragment>
                            : <React.Fragment />
                    }
                </div>
                <div className="footer-buttons">
                    <button className="button footerclose-button" onClick={e => Popup.ClosePopup(props.Id)}> {Localization.TextFormatter(objTextResource, 'Cancel')} </button>
                    <button className="button orange-button" onClick={e => {
                        Validate();
                    }}>{Localization.TextFormatter(objTextResource, 'Forward')}</button>
                </div>
            </div>
        </div>
    );
};

/**
 * @name DynamicStyles
 * @summary Css files specific to this module
 * @param {any} props
 * @returns {Element}
 */
TeacherShareNewsPopup.DynamicStyles = props => {
    return [
        props.JConfiguration.ExtranetSkinPath + "/Css/Application/3_Teacher/ReactJs/PC/TeacherNews/TeacherShareNewsPopup/TeacherShareNewsPopup.css"
    ];
};

export default TeacherShareNewsPopup;

