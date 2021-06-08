//React imports
import React, { useState } from "react";

//Common imports
import * as Localization from '@root/Framework/Blocks/Localization/Localization';

const PupilShareNewsPopup = props => {

    var objGroupPopupData = props.Data.GetDataForGroupPopup();
    const objTextResource = objGroupPopupData.objTextResource;
    const [arrGroupData, setGroupData] = useState([]);
    const [strValidationMessage, setValidationMessage] = useState('')

    /**
     * @name OnClickCheckMark
     * @summary checks or unchecks the checkbox
     * @param {any} strType
     * @param {any} strUserID
     */
    const OnClickCheckMark = (strType, strUserID) => {
        var arrNewGroupData = [];
        setValidationMessage('');
        if (arrGroupData.findIndex(item => { return item.uUserId === strUserID }) === -1) {
            var objToAdd = {
                'uGroupId': strType === "group" ? strUserID : "00000000-0000-0000-0000-000000000000",
                "uUserId": strType !== "group" ? strUserID : "00000000-0000-0000-0000-000000000000",
                "cIsPupil": strType === "pupil" ? "Y" : "N",
                "cIsTeacher": strType === "teacher" ? "Y" : "N",
                "cIsForGroup": strType === "group" ? "Y" : "N",
                "cHasBeenViewed": "N",
                "cIsDeleted": "N"
            }
            arrNewGroupData = [...arrGroupData, objToAdd];
            setGroupData(arrNewGroupData);
        }
        else {
            arrNewGroupData = arrGroupData.filter(item => { return item.uUserId !== strUserID });
            setGroupData(arrNewGroupData);
        }
    }

    /**
     * @name GetMainteacherLi
     * @summary returns the main teacher element
     * */
    const GetMainteacherLi = () => {
        var objMainTeacher = objGroupPopupData.objMainTeacher;
        var ReturnLi = [];
        if (objMainTeacher && objMainTeacher.uTeacherId) {
            var blnChecked = arrGroupData.findIndex(itemGroupData => { return itemGroupData.uUserId === objMainTeacher.uTeacherId }) > -1 ? true : false;
            var strTeacherName = props.Data.GetTeacherName(objMainTeacher.uTeacherId);
            ReturnLi = <li id={objMainTeacher.uTeacherId} type="mainteacher">
                <div className="participant-name-icons">
                    <img src={JConfiguration.ExtranetSkinPath + "/Images/Background/ClassTeacher.svg"} alt="" />
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
        var arrCoTeachers = objGroupPopupData.arrCoTeachers;
        var returnLis = [];
        arrCoTeachers.map((item, i) => {
            var blnChecked = arrGroupData.findIndex(itemGroupData => { return itemGroupData.uUserId === item.uTeacherId }) > -1 ? true : false;
            var strTeacherName = props.Data.GetTeacherName(item.uTeacherId);
            var SingleLi = <li id={item.uTeacherId} type="coteacher">
                <div className="participant-name-icons">
                    <img src={JConfiguration.ExtranetSkinPath + "/Images/Background/ClassTeacher.svg"} alt="" />
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
        var arrSubjectExperts = objGroupPopupData.arrSubjectExperts;
        var returnLis = [];
        arrSubjectExperts.map((item, i) => {
            var blnChecked = arrGroupData.findIndex(itemGroupData => { return itemGroupData.uUserId === item.uTeacherId }) > -1 ? true : false;
            var strTeacherName = props.Data.GetTeacherName(item.uTeacherId);
            var SingleLi = <li id={item.uTeacherId} type="subjectexpert">
                <div className="participant-name-icons">
                    <img src={JConfiguration.ExtranetSkinPath + "/Images/Background/SubjectExpert.svg"} alt="" />
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
        var arrGroupData = objGroupPopupData.arrGroupData.filter(item => { return item.cIsDeleted === "N" });
        var returnLis = [];
        arrGroupData.map((item, i) => {
            var blnChecked = arrGroupData.findIndex(itemGroupData => { return itemGroupData.uUserId === item.uNewsGroupId }) > -1 ? true : false;
            var strGroupName = item.vGroupName;
            var SingleLi = <li id={item.uNewsGroupId} type="group">
                <div className="participant-name-icons">
                    <img src={JConfiguration.ExtranetSkinPath + "/Images/Background/icon_shared_group_brown.png"} alt="" />
                    <span className="participants-name">{strGroupName}</span>
                </div>
                <div className="check-list" >
                    <input type="checkbox" id={strGroupName + i} />
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
        var arrPupilData = objGroupPopupData.arrPupilData;
        var returnLis = [];
        arrPupilData.map((item, i) => {
            var blnChecked = arrGroupData.findIndex(itemGroupData => { return itemGroupData.uUserId === item.uPupilId }) > -1 ? true : false;
            var strPupilName = item.vFirstName + " " + item.vName;
            var SingleLi = <li id={item.uPupilId} type="pupil">
                <div className="participant-name-icons">
                    <img src={JConfiguration.ExtranetSkinPath + (item.iGenderId === 0 ? "/Images/Background/profile1.png" : "/Images/Background/profile10.png")} alt="" />
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
        if (arrGroupData && arrGroupData.length == 0) {
            setValidationMessage(objTextResource.OneUserRequired)

        } else {
            props.Data.ForwardMessage(arrGroupData);
            Popup.ClosePopup(props.Id);
        }
    }

    return (
        <div className="share-folder-wrapper-news">
            <div className="share-news">
                <ul className="add-participant">
                    {GetMainteacherLi()}
                    {GetCoteachersLis()}
                    {GetSubjectExpertsLis()}
                    {GetGroupsLis()}
                    {GetPupilLis()}
                </ul>
            </div>

            <div class="footer-block">
                {strValidationMessage.length > 0 ? <React.Fragment><img src={JConfiguration.ExtranetSkinPath + "/Images/Common/Icons/exclamation_mark.svg"} alt="" /> <span>{strValidationMessage}</span></React.Fragment> : <React.Fragment />}{/*footer id*/}
                <button className="button orange-button" onClick={e => Popup.ClosePopup(props.Id)}> {Localization.TextFormatter(objTextResource, 'Cancel')} </button>
                <button className="button orange-button" onClick={e => {Validate()}}>{Localization.TextFormatter(objTextResource, 'Forward')}</button>
            </div>
        </div>
    );
};

export default PupilShareNewsPopup;
