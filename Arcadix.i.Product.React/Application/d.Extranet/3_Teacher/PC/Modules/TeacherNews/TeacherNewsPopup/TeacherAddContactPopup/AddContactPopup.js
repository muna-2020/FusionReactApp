//React imports
import React, { useState } from "react";

//Inline Images import
import ClassTeacherImage from '@inlineimage/Application/d.Extranet/3_Teacher/PC/Modules/TeacherNews/ClassTeacher.svg?inline';
import SubjectExpertImage from '@inlineimage/Application/d.Extranet/3_Teacher/PC/Modules/TeacherNews/SubjectExpert.svg?inline';
import ProfileMaleImage from '@inlineimage/Application/d.Extranet/3_Teacher/PC/Modules/TeacherNews/profile1.png?inline';
import ProfileFemaleImage from '@inlineimage/Application/d.Extranet/3_Teacher/PC/Modules/TeacherNews/profile10.png?inline';
import AllClassImage from '@inlineimage/Application/d.Extranet/3_Teacher/PC/Modules/TeacherNews/all_class_neutral.svg?inline';
import ExclamationMarkImage from '@inlineimage/Application/d.Extranet/5_Shared/PC/exclamation_mark.svg?inline';

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
                    <img src={ClassTeacherImage} alt="" />
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
                    <img src={SubjectExpertImage} alt="" />
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
                    <img src={item.iGenderId === 0 ? ProfileMaleImage : ProfileFemaleImage} alt="" />
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

    let GetMarkAllCheckBox = () => {
        let blnChecked = arrGroupData.length != 0 && arrGroupData.length == (objGroupPopupData.arrCoTeachers.length + objGroupPopupData.arrSubjectExperts.length + objGroupPopupData.arrPupilData.length);
        return <li id="MarkAll">
            <div className="participant-name-icons">
                <img src={AllClassImage} alt="" />
                <span className="participants-name">{Localization.TextFormatter(objTextResource, 'MarkAll')}</span>
            </div>
            <div className="check-list" >
                <input type="checkbox" id="MarkAll" />
                <label className={blnChecked ? "checkmark" : "checkmark disabled"} for="MarkAll" onClick={(e) => { OnClickAll(!blnChecked) }} />
            </div>
        </li>
    }

    let OnClickAll = (blnChecked) => {
        if (blnChecked) {
            let arrNewGroupData = [];
            objGroupPopupData.arrCoTeachers.map(objTchr => {
                let objToAdd = {
                    "uUserId": objTchr["uTeacherId"],
                    "cIsPupil": "N",
                    "cIsTeacher": "Y",
                    "cIsDeleted": "N"
                }
                arrNewGroupData = [...arrNewGroupData, objToAdd]
            })
            objGroupPopupData.arrSubjectExperts.map(objTchr => {
                let objToAdd = {
                    "uUserId": objTchr["uTeacherId"],
                    "cIsPupil": "N",
                    "cIsTeacher": "Y",
                    "cIsDeleted": "N"
                }
                arrNewGroupData = [...arrNewGroupData, objToAdd]
            })
            objGroupPopupData.arrPupilData.map(objPpl => {
                let objToAdd = {
                    "uUserId": objPpl["uPupilId"],
                    "cIsPupil": "Y",
                    "cIsTeacher": "N",
                    "cIsDeleted": "N"
                }
                arrNewGroupData = [...arrNewGroupData, objToAdd]
            })
            setGroupData(arrNewGroupData);
        } else {
            setGroupData([])
            setRemovedGroupData([])
        }
    }

    return (
        <div className="teachernews-popup-content">
            <div className="teachernews-popup-content-block">
                <span className="header-title">{Localization.TextFormatter(objTextResource, 'name_the_group')} </span>

                <input type="text" className="search-by-name" value={strGroupName} onChange={(event) => { setGroupName(event.target.value); setValidationMessage(''); }} />

                <span className="table-header-list">{Localization.TextFormatter(objTextResource, 'add_participant')}</span>

                <ul className="add-participants">
                    {GetMarkAllCheckBox()}
                    {GetCoteachersLis()}
                    {GetSubjectExpertsLis()}
                    {GetPupilLis()}
                </ul>
            </div>
            <div className="footer-section">
                {
                    strValidationMessage.length > 0 ?
                        <React.Fragment>
                            <div className="error-msg">
                                <img src={ExclamationMarkImage} alt="" />
                                <span>{strValidationMessage}</span>
                            </div>
                        </React.Fragment>
                        :
                        <React.Fragment />
                }
                {/*footer id*/}
                <div className="footer-buttons">
                    <span className="footerclose-button button" onClick={e => Popup.ClosePopup(props.Id)}>{Localization.TextFormatter(objTextResource, 'abort')}</span>
                    <span className="button yellow-button" onClick={e => {
                        ValidateData();
                    }}>{Localization.TextFormatter(objTextResource, 'save')}</span>
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
AddContactPopup.DynamicStyles = props => {
    return [props.JConfiguration.ExtranetSkinPath + "/Css/Application/3_Teacher/ReactJs/PC/TeacherNews/TeacherAddContactPopup/AddContactPopup.css"];
};

/**
 * @summary exports the component.
 * */
export default AddContactPopup;
