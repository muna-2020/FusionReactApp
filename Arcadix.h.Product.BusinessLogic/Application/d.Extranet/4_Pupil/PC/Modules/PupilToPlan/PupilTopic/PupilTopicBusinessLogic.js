import { useState, useEffect, useLayoutEffect } from 'react';
import ArcadixFetchAndCacheData, { DataRef } from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

export function mapStateToProps(state) {
    if (!global["mode"]) {
        console.log("mapping");
        return {
            showPopup: state.ApplicationState.showPopUp,
            closePopup: state.ApplicationState.closePopUp
        };
    }

}

export function SaveTopic(objPopUpContext, objPassedData) {   
    return new Promise((resolve, reject) => {
        let objSelDate = objPopUpContext.state.objSelectedDate;
        let objEditData = {
            uLearningJournalPupilTopicId: objPopUpContext.state.objTopic ? objPopUpContext.state.objTopic["uLearningJournalPupilTopicId"] : '00000000-0000-0000-0000-000000000000',
            uSegmentId: objPassedData.objDay.objSegment.uSegmentId,
            uPupilId: objPassedData.strPupilId,
            uClassId: objPassedData.strClassId,
            vTopicDescription: objPopUpContext.state.strTopic,
            dtTopicDate: objSelDate.iYearNumber + "-" + objSelDate.iMonthNumber + "-" + objSelDate.iDayNumber
        };
        let objSaveParams = {
            ForeignKeyFilter: {
                uClassId: objPassedData.strClassId,
            },
            SearchQuery: {
            },
            vEditData: objEditData
        };

        let arrDataRequest = [
            {
                URL: "API/Object/Extranet/Teacher/LearningJournal/Topic",
                Params: objSaveParams,
                MethodType: "Put"
            }
        ];
        let objArcadixFetchAndCacheData = new ArcadixFetchAndCacheData();
        objArcadixFetchAndCacheData.Execute(arrDataRequest, function (objReturn) {
            resolve(objReturn);
        });
    });
}

export function DataCall(objParams) {
    let objArcadixFetchAndCacheData = new ArcadixFetchAndCacheData();
    objArcadixFetchAndCacheData.Execute(objParams, function (objReturn) {
    });
}

export function UpdateTopicState(objPopUpContext, value) {
    objPopUpContext.dispatch({ type: 'Update_Topic', payload: value });
}

export function useDataLoader(objContext) {
    const GetRequiredData = () => {
        Logger.Log("Getting initial data");
        DataCall(InitialDataLoad(objContext.props.JConfiguration, objContext.props));
    };
    useLayoutEffect(GetRequiredData, []);
}

export function GetInitialState(objData) {  
    let arrSAOptionData = objData.arrSAOptionData.map(sao => { return { ...sao } });
    let arrReviewCriteriaData = objData.arrReviewCriteriaData.map(rc => { return { ...rc } })
    let objSegment = objData.objDay.objSegment;
    let arrSchoolYearPeriodData = DataRef(objContext.props.schoolyearperiod, "schoolyearperiod;cisdeleted;n")["Data"];
    let objCurrentSchoolYearPeriod = arrSchoolYearPeriodData
        .filter(x =>
            new Date(x["dtFromDate"]) < new Date() &&
            new Date(x["dtToDate"]) > new Date()
    );
    let blnCurrentSchoolYear = false;
    if (objSegment["uSchoolYearPeriodId"] == objCurrentSchoolYearPeriod["uSchoolYearPeriodId"]); {
        blnCurrentSchoolYear = true;
    }
    return {
        strTopic: objData.objDay.objTopic ? objData.objDay.objTopic.vTopicDescription : '',
        arrSAOptionData: arrSAOptionData,
        arrReviewCriteriaData: arrReviewCriteriaData,
        objTopic: { ...objData.objDay.objTopic },
        objSelectedDate: objData.objDate,
        blnCurrentSchoolYear: blnCurrentSchoolYear
    };
}

export function Reducer(state, action) {
    switch (action.type) {
        case 'Update_Topic':
            return {
                ...state,
                strTopic: action.payload
            };
    }
}
