//React imports
import React, { useState } from "react";

//Common imports
import * as Localization from '@root/Framework/Blocks/Localization/Localization';
import FillHeight from "@root/Framework/Controls/FillHeight/FillHeight";

/**
 * @name PupilAddContactPopup
 * @summary popup for create group.
 * @param {any} props
 * @returns {Element}
 */
const PupilAddContactPopup = props => {
    var objGroupPopupData = props.Data.GetDataForGroupPopup();
    var objGroupData = props.Data.Mode === "Edit" ? objGroupPopupData.objGroupData : undefined;
    var arrSelectedUser = props.Data.Mode === "Edit" ? objGroupData.t_LearnCoacher_News_Group_User.filter(item => { return item.cIsDeleted === "N" }) : [];
    var strGroupNameFromProps = props.Data.Mode === "Edit" ? objGroupData.vGroupName : "";
    const objTextResource = objGroupPopupData.objTextResource;
    const [arrGroupData, setGroupData] = useState(arrSelectedUser);
    const [arrRemovedGroupData, setRemovedGroupData] = useState([]);
    const [strGroupName, setGroupName] = useState(strGroupNameFromProps);
    const [strTextClass, setTextClass] = useState("search-by-name")
    const [strValidationMessage, setValidationMessage] = useState('')

    /**
     * @name OnClickCheckMark
     * @summary to check or uncheck checkbox
     * @param {any} strTeacherOrPupil
     * @param {any} strUserID
     */
    const OnClickCheckMark = (strTeacherOrPupil, strUserID, blnChecked, blnNew) => {
        var arrNewGroupData = [];
        if (!blnChecked) {
            var objToAdd = {
                "uUserId": strUserID,
                "cIsPupil": strTeacherOrPupil === "pupil" ? "Y" : "N",
                "cIsTeacher": strTeacherOrPupil === "teacher" ? "Y" : "N",
                "cIsDeleted": "N",
                "cIsNew": true
            }
            arrNewGroupData = [...arrGroupData, objToAdd];
            if (props.Data.Mode === "Edit" && arrRemovedGroupData.find(x => x["uUserId"] == strUserID)) {
                let arrNewRemovedData = arrRemovedGroupData.filter(x => x["uUserId"] != strUserID);
                setRemovedGroupData(arrNewRemovedData);
            }
        }
        else {
            arrNewGroupData = arrGroupData.filter(item => { return item.uUserId != strUserID });
            if (props.Data.Mode === "Edit" && (undefined == blnNew || !blnNew)) {
                let objRemovedItem = arrGroupData.find(item => { return item.uUserId == strUserID });
                let arrNewRemovedData = [...arrRemovedGroupData, { ...objRemovedItem, cIsDeleted: "Y" }];
                setRemovedGroupData(arrNewRemovedData);
            }
        }
        setGroupData(arrNewGroupData);
        setValidationMessage('')
    }

    const GetCoteachersLis = () => {
        var arrCoTeachers = objGroupPopupData.arrCoTeachers;
        var returnLis = [];
        arrCoTeachers.map((item, i) => {
            var blnChecked = arrGroupData.findIndex(itemGroupData => { return itemGroupData.uUserId === item.uTeacherId }) > -1 ? true : false;
            var strTeacherName = props.Data.GetTeacherName(item.uTeacherId);
            var SingleLi = <li id={item.uTeacherId}>
                <div className="participant-name-icons">
                    <img src={JConfiguration.ExtranetSkinPath + "/Images/Background/ClassTeacher.svg"} alt="" />
                    <span className="participants-name">{strTeacherName + i}</span>
                </div>
                <div className="check-list" >
                    <input type="checkbox" id={strTeacherName} />
                    <label className={blnChecked ? "checkmark checked" : "checkmark"} for={strTeacherName + i} onClick={(e) => { OnClickCheckMark("teacher", item.uTeacherId, blnChecked, item.cIsNew) }} />
                </div>
            </li>
            returnLis = [...returnLis, SingleLi];
        })
        return returnLis;
    }

    const GetSubjectExpertsLis = () => {
        var arrSubjectExperts = objGroupPopupData.arrSubjectExperts;
        var returnLis = [];
        arrSubjectExperts.map((item, i) => {
            var blnChecked = arrGroupData.findIndex(itemGroupData => { return itemGroupData.uUserId === item.uTeacherId }) > -1 ? true : false;
            var strTeacherName = props.Data.GetTeacherName(item.uTeacherId);
            var SingleLi = <li id={item.uTeacherId}>
                <div className="participant-name-icons">
                    <img src={JConfiguration.ExtranetSkinPath + "/Images/Background/SubjectExpert.svg"} alt="" />
                    <span className="participants-name">{props.Data.GetTeacherName(item.uTeacherId)}</span>
                </div>
                <div className="check-list" >
                    <input type="checkbox" id={strTeacherName + i} />
                    <label className={blnChecked ? "checkmark checked" : "checkmark"} for={strTeacherName + i} onClick={(e) => { OnClickCheckMark("teacher", item.uTeacherId, blnChecked, item.cIsNew) }} />
                </div>
            </li>
            returnLis = [...returnLis, SingleLi];
        })
        return returnLis;
    }

    const GetPupilLis = () => {
        var arrPupilData = objGroupPopupData.arrPupilData;
        var returnLis = [];
        arrPupilData.map((item, i) => {
            var blnChecked = arrGroupData.findIndex(itemGroupData => { return itemGroupData.uUserId === item.uPupilId }) > -1 ? true : false;
            var strPupilName = item.vFirstName + " " + item.vName;
            var SingleLi = <li id={item.uPupilId}>
                <div className="participant-name-icons">
                    <img src={JConfiguration.ExtranetSkinPath + (item.iGenderId === 0 ? "/Images/Background/profile1.png" : "/Images/Background/profile10.png")} alt="" />
                    <span className="participants-name">{strPupilName}</span>
                </div>
                <div className="check-list" >
                    <input type="checkbox" id={strPupilName + i} />
                    <label className={blnChecked ? "checkmark checked" : "checkmark"} for={strPupilName + i} onClick={(e) => { OnClickCheckMark("pupil", item.uPupilId, blnChecked, item.cIsNew) }} />
                </div>
            </li>
            returnLis = [...returnLis, SingleLi];
        })
        return returnLis;
    }

    let UpdateGroupName = (strValue) => {
        if (strValue.trim().length < 1)
            setTextClass("search-by-name focus")
        else
            setTextClass("search-by-name")
        setGroupName(strValue)
        setValidationMessage('');
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
        <div className="news-popup-wrapper" id="NewsPopUpWrapper"> {/*parent refernece*/}
            <div className="news-popup-content">
                {/*
                <div className="news-popup-header" id="NewskPopUpHeader"> {/*header id/}
                    <div className="header-icons ">
                        <img className="news-icon" src={JConfiguration.ExtranetSkinPath + "/Images/Common/Icons/mitteilungen.svg"} alt="" />
                        <img className="close-icons" src={JConfiguration.ExtranetSkinPath + "/Images/Common/Icons/close.svg"} alt="" onClick={e => Popup.ClosePopup(props.Id)} />
                    </div>
                </div> */}
                <div className="news-popup-content-block">
                    <FillHeight Id="PupilNews_AddGroup" Meta={{ HeaderIds: [`EditorPopup_Header_Id${props.Id}`, "NewskPopUpHeader"], FooterIds: ["NewsPopUpFooter"] }} ParentProps={{ ...props }} ParentReference={`EditorPopupParent${props.modalUId}`} className="bgStyle" scrollStyle={{ overflow: "auto" }}> {/*addtional padding is used to exclude the final height */}
                        {/* <span className="news-popup-contentheader">
                            Neue Gruppe
                       </span> */}
                        <span className="header-title add-participant">{objTextResource.name_the_group} </span>

                        <span className="add-participant">
                            <input type="text" className={strTextClass} value={strGroupName} onChange={(event) => { UpdateGroupName(event.target.value); }} onBlur={(event) => { UpdateGroupName(event.target.value) }} />
                        </span>

                        <span className="table-header-list add-participant">{objTextResource.add_participant}</span>
                        <ul className="add-participant">
                            {GetCoteachersLis()}
                            {GetSubjectExpertsLis()}
                            {GetPupilLis()}
                        </ul>
                    </FillHeight>
                </div>

                <div className="news-popup-footer" id="NewsPopUpFooter">
                    {strValidationMessage.length > 0 ? <React.Fragment><img src={JConfiguration.ExtranetSkinPath + "/Images/Common/Icons/exclamation_mark.svg"} alt="" /> <span>{strValidationMessage}</span></React.Fragment> : <React.Fragment />}{/*footer id*/}
                    <div className="footer-section">
                        <span className="footerclose-button" onClick={e => Popup.ClosePopup(props.Id)}>{objTextResource.abort}</span>
                        <span className="button yellow-button" onClick={e => { ValidateData() }}>{Localization.TextFormatter(objTextResource, 'save')}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PupilAddContactPopup;
