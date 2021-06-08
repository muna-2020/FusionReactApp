//React imports
import React, { useState } from "react";

//Common imports
import * as Localization from '@root/Framework/Blocks/Localization/Localization';

/**
 * @name AddContactPopup
 * @summary add, edit group
 * @param {any} props
 */
const AddContactPopup = props => {

    var objGroupPopupData = props.Data.GetDataForGroupPopup();
    var objGroupData = props.Data.Mode === "Edit" ? objGroupPopupData.objGroupData : undefined;
    var arrSelectedUser = props.Data.Mode === "Edit" ? objGroupData.t_LearnCoacher_News_Group_User.filter(item => { return item.cIsDeleted === "N" }) : [];
    var strGroupNameFromProps = props.Data.Mode === "Edit" ? objGroupData.vGroupName : "";
    const objTextResource = objGroupPopupData.objTextResource;
    const [arrGroupData, setGroupData] = useState(arrSelectedUser);
    const [arrRemovedGroupData, setRemovedGroupData] = useState([]);
    const [strGroupName, setGroupName] = useState(strGroupNameFromProps);
    const [strValidationMessage, setValidationMessage] = useState('')

    /**
     * @name OnClickCheckMark
     * @summary to check or uncheck checkbox
     * @param {any} strTeacherOrPupil
     * @param {any} strUserID
     */
    const OnClickCheckMark = (strTeacherOrPupil, strUserID) => {
        var arrNewGroupData = [];
        if (arrGroupData.findIndex(item => { return item.uUserId === strUserID }) === -1) {
            var objToAdd = {
                "uUserId": strUserID,
                "cIsPupil": strTeacherOrPupil === "pupil" ? "Y" : "N",
                "cIsTeacher": strTeacherOrPupil === "teacher" ? "Y" : "N",
                "cIsDeleted": "N"
            }
            arrNewGroupData = [...arrGroupData, objToAdd];
            setRemovedGroupData(arrRemovedGroupData.filter(item => { return item.uUserId !== strUserID }));
        }
        else {
            arrNewGroupData = arrGroupData.filter(item => { return item.uUserId !== strUserID });
            var objGroupDataToRemove = arrGroupData.find(item => { return item.uUserId === strUserID });
            objGroupDataToRemove = { ...objGroupDataToRemove, 'cIsDeleted': 'Y' };
            setRemovedGroupData([...arrRemovedGroupData, objGroupDataToRemove]);
        }
        setGroupData(arrNewGroupData);
        setValidationMessage('')
    }

    /**
     * @name GetCoteachersLis
     * @summary returns the teacher elements
     * @returns {Element}
     * */
    const GetCoteachersLis = () => {
        var arrCoTeachers = objGroupPopupData.arrCoTeachers;
        var returnLis = [];
        arrCoTeachers.map((item, i) => {
            var blnChecked = arrGroupData.findIndex(itemGroupData => { return itemGroupData.uUserId === item.uTeacherId }) > -1 ? true : false;
            var strTeacherName = props.Data.GetTeacherName(item.uTeacherId);
            var SingleLi = <li id={item.uTeacherId}>
                <div className="participant-name-icons">
                    <img src={props.JConfiguration.ExtranetSkinPath + "/Images/Background/ClassTeacher.svg"} alt="" />
                    <span className="participants-name">{strTeacherName + i}</span>
                </div>
                <div className="check-list" >
                    <input type="checkbox" id={strTeacherName} />
                    <label className={blnChecked ? "checkmark" : "checkmark disabled"} for={strTeacherName + i} onClick={(e) => { OnClickCheckMark("teacher", item.uTeacherId) }} />
                </div>
            </li>
            returnLis = [...returnLis, SingleLi];
        })
        return returnLis;
    }

    /**
     * @name GetSubjectExpertsLis
     * @summary returns the subject experts elements.
     * @returns {Element}
     * */
    const GetSubjectExpertsLis = () => {
        var arrSubjectExperts = objGroupPopupData.arrSubjectExperts;
        var returnLis = [];
        arrSubjectExperts.map((item, i) => {
            var blnChecked = arrGroupData.findIndex(itemGroupData => { return itemGroupData.uUserId === item.uTeacherId }) > -1 ? true : false;
            var strTeacherName = props.Data.GetTeacherName(item.uTeacherId);
            var SingleLi = <li id={item.uTeacherId}>
                <div className="participant-name-icons">
                    <img src={props.JConfiguration.ExtranetSkinPath + "/Images/Background/SubjectExpert.svg"} alt="" />
                    <span className="participants-name">{props.Data.GetTeacherName(item.uTeacherId)}</span>
                </div>
                <div className="check-list" >
                    <input type="checkbox" id={strTeacherName + i} />
                    <label className={blnChecked ? "checkmark" : "checkmark disabled"} for={strTeacherName + i} onClick={(e) => { OnClickCheckMark("teacher", item.uTeacherId) }} />
                </div>
            </li>
            returnLis = [...returnLis, SingleLi];
        })
        return returnLis;
    }

    /**
     * @name GetPupilLis
     * @summary returns the pupil elements
     * @returns {Element}
     * */
    const GetPupilLis = () => {
        var arrPupilData = objGroupPopupData.arrPupilData;
        var returnLis = [];
        arrPupilData.map((item, i) => {
            var blnChecked = arrGroupData.findIndex(itemGroupData => { return itemGroupData.uUserId === item.uPupilId }) > -1 ? true : false;
            var strPupilName = item.vFirstName + " " + item.vName;
            var SingleLi = <li id={item.uPupilId}>
                <div className="participant-name-icons">
                    <img src={props.JConfiguration.ExtranetSkinPath + (item.iGenderId === 0 ? "/Images/Background/profile1.png" : "/Images/Background/profile10.png")} alt="" />
                    <span className="participants-name">{strPupilName}</span>
                </div>
                <div className="check-list" >
                    <input type="checkbox" id={strPupilName + i} />
                    <label className={blnChecked ? "checkmark" : "checkmark disabled"} for={strPupilName + i} onClick={(e) => { OnClickCheckMark("pupil", item.uPupilId) }} />
                </div>
            </li>
            returnLis = [...returnLis, SingleLi];
        })
        return returnLis;
    }

    /**
     * @name ValidateData
     * @summary validates the user is selected or not.
     * */
    let ValidateData = () => {
        if (strGroupName.trim().length <= 0) {
            setValidationMessage(objTextResource["NameRequired"])
        } else if (arrGroupData.length == 0) {
            setValidationMessage(objTextResource["OneUserRequired"])
        } else {
            props.Data.SaveGroup(strGroupName, [...arrGroupData, ...arrRemovedGroupData]);
            Popup.ClosePopup(props.Id);
        }
    }

    return (
        <div className="teachernews-popup-content">
            <div className="teachernews-popup-content-block">
                <span className="header-title">{Localization.TextFormatter(objTextResource, 'name_the_group')} </span>

                <input type="text" className="search-by-name" value={strGroupName} onChange={(event) => { setGroupName(event.target.value); setValidationMessage(''); }} />

                <span className="table-header-list">{Localization.TextFormatter(objTextResource, 'add_participant')}</span>

                <ul className="add-participants">
                    {GetCoteachersLis()}
                    {GetSubjectExpertsLis()}
                    {GetPupilLis()}
                </ul>
            </div>
            <div className="footer-section">
                {strValidationMessage.length > 0 ? <React.Fragment><img src={JConfiguration.ExtranetSkinPath + "/Images/Common/Icons/exclamation_mark.svg"} alt="" /> <span>{strValidationMessage}</span></React.Fragment> : <React.Fragment />}{/*footer id*/}
                <span className="footerclose-button button" onClick={e => Popup.ClosePopup(props.Id)}>{Localization.TextFormatter(objTextResource, 'abort')}</span>
                <span className="button yellow-button" onClick={e => {
                    ValidateData();
                }}>{Localization.TextFormatter(objTextResource, 'save')}</span>
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
AddContactPopup.DynamicStyles = props => {
    return [props.JConfiguration.ExtranetSkinPath + "/Css/Application/3_Teacher/ReactJs/PC/TeacherNews/TeacherAddContactPopup/AddContactPopup.css"];
};

/**
 * @summary exports the component.
 * */
export default AddContactPopup;
