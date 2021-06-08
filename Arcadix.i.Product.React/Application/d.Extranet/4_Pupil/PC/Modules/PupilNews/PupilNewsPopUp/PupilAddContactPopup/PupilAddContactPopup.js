//React imports
import React, { useState } from "react";
import FillHeight from '@root/Framework/Controls/FillHeight/FillHeight'

//Inline Images import
import imgAllClassNeutral from '@inlineimage/Application/d.Extranet/4_Pupil/PC/Modules/PupilNews/PupilNewsPopUp/PupilAddContactPopup/all_class_neutral.svg?inline';
import imgExclamationMark from '@inlineimage/Application/d.Extranet/4_Pupil/PC/Modules/PupilNews/PupilNewsPopUp/PupilAddContactPopup/exclamation_mark.svg?inline';
import imgProfile1 from '@inlineimage/Application/d.Extranet/4_Pupil/PC/Modules/PupilNews/PupilNewsPopUp/PupilAddContactPopup/profile1.png?inline';
import imgProfile10 from '@inlineimage/Application/d.Extranet/4_Pupil/PC/Modules/PupilNews/PupilNewsPopUp/PupilAddContactPopup/profile10.png?inline';
import imgMainTeacher from '@inlineimage/Application/d.Extranet/4_Pupil/PC/Modules/PupilNews/PupilNewsPopUp/PupilAddContactPopup/MainTeacher.svg?inline';
import imgClassTeacher from '@inlineimage/Application/d.Extranet/4_Pupil/PC/Modules/PupilNews/PupilNewsPopUp/PupilAddContactPopup/ClassTeacher.svg?inline';
import imgSubjectExpert from '@inlineimage/Application/d.Extranet/4_Pupil/PC/Modules/PupilNews/PupilNewsPopUp/PupilAddContactPopup/SubjectExpert.svg?inline';

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

    let GetMarkAllCheckBox = () => {
        let blnChecked = arrGroupData.length != 0 && arrGroupData.length == (objGroupPopupData.arrCoTeachers.length + objGroupPopupData.arrSubjectExperts.length + objGroupPopupData.arrPupilData.length + 1);
        return <li id="MarkAll">
            <div className="participant-name-icons">
                <img src={imgAllClassNeutral} alt="" />
                <span className="participants-name">{Localization.TextFormatter(objTextResource, 'MarkAll')}</span>
            </div>
            <div className="check-list" >
                <input type="checkbox" id="MarkAll" />
                <label className={blnChecked ? "checkmark checked" : "checkmark"} for="MarkAll" onClick={(e) => { OnClickAll(!blnChecked) }} />
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
            let objMainTeacherAdd = {
                "uUserId": objGroupPopupData.objMainTeacher["uTeacherId"],
                "cIsPupil": "N",
                "cIsTeacher": "Y",
                "cIsDeleted": "N"
            };

            arrNewGroupData = [...arrNewGroupData, objMainTeacherAdd];
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

    /**
     * @name GetMainteacherLi
     * @summary returns the main teacher element
     * */
    const GetMainteacherList = () => {
        var objMainTeacher = objGroupPopupData.objMainTeacher;
        var ReturnLi = [];
        if (objMainTeacher && objMainTeacher.uTeacherId) {
            var blnChecked = arrGroupData.findIndex(itemGroupData => { return itemGroupData.uUserId === objMainTeacher.uTeacherId }) > -1 ? true : false;
            var strTeacherName = props.Data.GetTeacherName(objMainTeacher.uTeacherId);
            ReturnLi = <li id={objMainTeacher.uTeacherId} type="mainteacher">
                <div className="participant-name-icons">
                    <img src={imgMainTeacher} alt="" />
                    <span className="participants-name">{strTeacherName}</span>
                </div>
                <div className="check-list" >
                    <input type="checkbox" id={strTeacherName} />
                    <label className={blnChecked ? "checkmark checked" : "checkmark"} for={strTeacherName} onClick={(e) => { OnClickCheckMark("teacher", objMainTeacher.uTeacherId, blnChecked, objMainTeacher.cIsNew) }} />
                </div>
            </li>
        }
        return ReturnLi;
    }

    const GetCoteachersList = () => {
        var arrCoTeachers = objGroupPopupData.arrCoTeachers;
        var returnLis = [];
        arrCoTeachers.map((item, i) => {
            var blnChecked = arrGroupData.findIndex(itemGroupData => { return itemGroupData.uUserId === item.uTeacherId }) > -1 ? true : false;
            var strTeacherName = props.Data.GetTeacherName(item.uTeacherId);
            var SingleLi = <li id={item.uTeacherId}>
                <div className="participant-name-icons">
                    <img src={imgClassTeacher} alt="" />
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

    const GetSubjectExpertsList = () => {
        var arrSubjectExperts = objGroupPopupData.arrSubjectExperts;
        var returnLis = [];
        arrSubjectExperts.map((item, i) => {
            var blnChecked = arrGroupData.findIndex(itemGroupData => { return itemGroupData.uUserId === item.uTeacherId }) > -1 ? true : false;
            var strTeacherName = props.Data.GetTeacherName(item.uTeacherId);
            var SingleLi = <li id={item.uTeacherId}>
                <div className="participant-name-icons">
                    <img src={imgSubjectExpert} alt="" />
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

    const GetPupilList = () => {
        var arrPupilData = objGroupPopupData.arrPupilData;
        var returnLis = [];
        arrPupilData.map((item, i) => {
            var blnChecked = arrGroupData.findIndex(itemGroupData => { return itemGroupData.uUserId === item.uPupilId }) > -1 ? true : false;
            var strPupilName = item.vFirstName + " " + item.vName;
            var SingleLi = <li id={item.uPupilId}>
                <div className="participant-name-icons">
                    <img src={item.iGenderId === 0 ? imgProfile1 : imgProfile10} alt="" />
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
                    <FillHeight
                        ComponentName={"FillHeight"}
                        Id="PupilNews_AddGroup" Meta={{ HeaderIds: [`EditorPopup_Header_Id${props.Id}`, "NewskPopUpHeader"], FooterIds: ["NewsPopUpFooter"] }} ParentProps={{ ...props }} ParentReference={`EditorPopupParent${props.modalUId}`} className="bgStyle" scrollStyle={{ overflow: "auto" }}> {/*addtional padding is used to exclude the final height */}
                        {/* <span className="news-popup-contentheader">
                            Neue Gruppe
                       </span> */}
                        <span className="header-title add-participant">{objTextResource.name_the_group} </span>

                        <span className="add-participant">
                            <input type="text" className={strTextClass} value={strGroupName} onChange={(event) => { UpdateGroupName(event.target.value); }} onBlur={(event) => { UpdateGroupName(event.target.value) }} />
                        </span>

                        <span className="table-header-list add-participant">{objTextResource.add_participant}</span>
                        <ul className="add-participant">
                            {GetMarkAllCheckBox()}
                            {GetMainteacherList()}
                            {GetCoteachersList()}
                            {GetSubjectExpertsList()}
                            {GetPupilList()}
                        </ul>
                    </FillHeight>
                </div>

                <div className="news-popup-footer" id="NewsPopUpFooter">
                    {strValidationMessage.length > 0 ?
                        <React.Fragment>
                            <div className="error-msg">
                                <img src={imgExclamationMark} alt="" />
                                <span>{strValidationMessage}</span>
                            </div>
                        </React.Fragment>
                        :
                        <React.Fragment />}{/*footer id*/}
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
