
/**
 * @name GetInitialState
 * @summary Initializes the state
 * @param {object} objData Data
 * @returns {object} initial state object
 */
export function GetInitialState(objData) {
    let arrSAOptionData = objData.arrSAOptionData.map(sao => { return { ...sao } });
    let arrReviewCriteriaData = objData.arrReviewCriteriaData.map(rc => { return { ...rc } })
    let objSegment = objData.objDay.objSegment;
    let arrSchoolYearPeriodData = DataRef(objData.objContext.props.Object_Extranet_Teacher_SchoolYearPeriod, "Object_Extranet_Teacher_SchoolYearPeriod;cIsDeleted;N")["Data"];
    let objCurrentSchoolYearPeriod = arrSchoolYearPeriodData.filter(x =>
            new Date(x["dtFromDate"]) < new Date() &&
            new Date(x["dtToDate"]) > new Date()
        );
    let blnCurrentSchoolYear = false;
    if (objSegment["uSchoolYearPeriodId"] == objCurrentSchoolYearPeriod["uSchoolYearPeriodId"]); {
        blnCurrentSchoolYear = true;
    }
    return {
        strTopic: objData.objDay.objTopic ? objData.objDay.objTopic.vTopicDescription : '',
        blnSaveTopicClicked: false,
        arrSAOptionData: arrSAOptionData,
        arrReviewCriteriaData: arrReviewCriteriaData,
        objTopic: objData.objDay.objTopic,
        objSelectedDate: objData.objDate,
        blnCurrentSchoolYear: blnCurrentSchoolYear
    };
}