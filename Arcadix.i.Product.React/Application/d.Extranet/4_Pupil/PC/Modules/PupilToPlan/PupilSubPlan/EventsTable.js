//React imports
import React from 'react';


/**
* @name EventTable
* @param {object} props props
* @summary This component displays the Event Table
* @returns {object} div that encapsulated the components with Event Table details.
*/
const EventsTable = (props) => {
    return (
        <table className="events-table">
            <thead>
                <td/>
                <td>{props.objCurrentDay.strDayShortCutName + " " + props.objCurrentDay.iDayNumber + " . " + props.objCurrentDay.iMonthNumber}</td>
            </thead>
            {GetElements()}
        </table>
    );

    /**
    * @name GetElements
    * @summary Forms the jsx tr of the elements
    * @returns {object} jsx, tr
    */
    function GetElements() {
        let arrElements = props.arrData.map(clsTime => {
            return (
                clsTime.cIsBreak == "N" ?
                    <tr>
                        <td>{clsTime.vClassTimeFrom + " - " + clsTime.vClassTimeTo}</td>
                        {clsTime.objSegment ? <td style={{ background: clsTime.objSegment.vColor }} onClick={() => { OpenPopup(clsTime, props.objCurrentDay) }}>
                            {clsTime.objSubject.t_TestDrive_Subject_Data.find(objSubjectData => objSubjectData["iLanguageId"].toString() == JConfiguration.InterfaceLanguageId).vSubjectName}
                            {clsTime.objTopic ? <div className="subDetails">{"  " + clsTime.objTopic.vTopicDescription}</div> : ''}
                            {clsTime.objTopic ? clsTime.objTopic.vTopicDescription && clsTime.objTopic.t_LearnCoacher_LearningJournal_Pupil_CommentFeedback.length > 0 ? <span className="check-mark" /> : '' : ''}
                        </td> : <td />}
                    </tr> ://else
                    <tr>
                        <td>{clsTime.vClassTimeFrom + " - " + clsTime.vClassTimeTo}</td>
                        <td className="break" />
                    </tr>
            );
        });
        return arrElements;
    }

    /**
    * @name OpenPopup
    * @param {object} objTime Time
    * @param {object} objDate Date
    * @summary Opens pupil to plan popup
    */
    function OpenPopup(objTime, objDate) {
        let objDay = {
            ...objTime.objDay,
            objSubject: objTime.objSubject,
            objSegment: objTime.objSegment,
            objTopic: objTime.objTopic,
        };

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
                blnDay:true
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
//EventsTable.DynamicStyles = () => {
//    var arrStyles = [
//        JConfiguration.ExtranetSkinPath + "/Css/Application/4_Pupil/ReactJs/PC/Modules/PupilToPlan/PupilToPlan.css"
//    ];
//    return arrStyles;
//};

export default EventsTable;