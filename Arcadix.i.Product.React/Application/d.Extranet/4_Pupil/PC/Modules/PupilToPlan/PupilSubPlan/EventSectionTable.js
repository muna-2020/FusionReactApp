//React imports
import React, { useState } from 'react';

//Inline Images import
import imgDown from '@inlineimage/Application/d.Extranet/4_Pupil/PC/Modules/PupilToPlan/PupilSubPlan/EventSectionTable/down.png?inline';
import imgComment from '@inlineimage/Application/d.Extranet/4_Pupil/PC/Modules/PupilToPlan/PupilSubPlan/EventSectionTable/comment.svg?inline';

/**
* @name EventSectionTable
* @param {object} props props
* @summary This component displays the EventSection Table
* @returns {object} div that encapsulated the components with EventSection Table details.
*/
const EventSectionTable = (props) => {
    const [Img, SetHoverImg] = useState("Comment");
    const HandleHoverImg = () => {
        SetHoverImg("Down");
    };
    const HandleOutImg = () => {
        SetHoverImg("Comment");
    };

    return (
        <table className="event-section-table">
            <thead>
                <td />
                {GetWeekDays()}
            </thead>
            {GetSectionElements()}
        </table>
    );

    /**
    * @name GetWeekDays
    * @summary Forms the jsx td of the WeekDays
    * @returns {object} jsx, td
    */
    function GetWeekDays() {
        let arrWeekDayElements = props.arrWeekDayMonth.map(wkDy => {
            return (
                <td>{wkDy.t_LearnCoacher_Planner_TimeTable_Day_Data[0].vTimeTableDayShortName + " " + wkDy.iDayNumber + ". " + wkDy.iMonthNumber}</td>
            );
        });
        return arrWeekDayElements;
    }

    /**
    * @name GetSectionElements
    * @summary Forms the jsx td of the section elements
    * @returns {object} jsx, td
    */
    function GetSectionElements() {
        let arrSectionElements = props.arrData.map((clsTime) => {
            return (
                clsTime.cIsBreak == "N" ? <tr>
                    <td>{clsTime.vClassTimeFrom + " - " + clsTime.vClassTimeTo}</td>
                    {
                        clsTime.arrDays.map((clsDay, index) => {
                            let objTeacherFeedBack = clsDay.objTopic && clsDay.objTopic.t_LearnCoacher_LearningJournal_Pupil_CommentFeedback ? clsDay.objTopic.t_LearnCoacher_LearningJournal_Pupil_CommentFeedback.find(fdbk => fdbk["cIsByTeacher"] == "Y") : undefined;
                            return (
                                clsDay.objSegment ? <td style={{ background: clsDay.objSegment.vColor }} onClick={() => { OpenPopup(clsTime, clsDay, props.arrWeekDayMonth[index]); }}>
                                    <ul>
                                        <li className="flex-table">
                                            <span>{clsDay.objSubject.t_TestDrive_Subject_Data.find(objSubjectData => objSubjectData["iLanguageId"].toString() == JConfiguration.InterfaceLanguageId).vSubjectName} <br />
                                                {clsDay.objTopic ? <div className="subDetails">{"  " + clsDay.objTopic.vTopicDescription}</div> : ''}
                                            </span>
                                            <React.Fragment>
                                                {clsDay.objTopic ? clsDay.objTopic.vTopicDescription && clsDay.objTopic.t_LearnCoacher_LearningJournal_Pupil_CommentFeedback && clsDay.objTopic.t_LearnCoacher_LearningJournal_Pupil_CommentFeedback.length > 0 ? <span className="check-mark" /> : '' : ''}
                                                {objTeacherFeedBack ? <img onMouseOver={() => HandleHoverImg()} onMouseOut={() => HandleOutImg()} src={Img == "Comment" ? imgComment : imgDown} alt="" /> : ''}
                                            </React.Fragment>
                                        </li>
                                    </ul>
                                </td> : <td />
                            );
                        })
                    }
                </tr> : <tr>
                        <td>{clsTime.vClassTimeFrom + " - " + clsTime.vClassTimeTo}</td>
                        <td className="break" />
                        <td className="break" />
                        <td className="break" />
                        <td className="break" />
                        <td className="break" />
                    </tr>
            );
        });
        return arrSectionElements;
    }

    /**
    * @name OpenPopup
    * @param {object} objTime Time
    * @param {object} objDay Day
    * @param {object} objDate Date
    * @summary Opens pupil to plan popup
    */
    function OpenPopup(objTime, objDay, objDate) {
        Popup.ShowPopup({
            Data: {
                objTime: objTime,
                objDay: objDay,
                objDate: objDate,
                arrSAOptionData: props.arrSAOptionData,
                arrReviewCriteriaData: props.arrReviewCriteriaData,
                strClassId: props.strClassId,
                strPupilId: props.strPupilId,
                pupilName: props.pupilName,
                objContext: props.objContext,
                Object_Extranet_Teacher_Topic: props.objContext.props.Object_Extranet_Teacher_Topic,
                blnDay: false
            },
            Meta: {
                PopupName: 'PupilToPlan_PopUp',
                ShowHeader: false,
                ShowCloseIcon: false,
                Height: "98%",
                Width: "98%"
            },
            Resource: {
                Text: props.objTextResource,
                SkinPath: JConfiguration.ExtranetSkinPath
            },
            Events: {
            },
            CallBacks: {
            }
        });
    }
};

///**
//* @name DynamicStyles
//* @summary Required for css
//* @returns {Array} arrStyles
//*/
//EventSectionTable.DynamicStyles = () => {
//    var arrStyles = [
//        JConfiguration.ExtranetSkinPath + "/Css/Application/4_Pupil/ReactJs/PC/Modules/PupilToPlan/PupilToPlan.css"
//    ];
//    return arrStyles;
//};

export default EventSectionTable;