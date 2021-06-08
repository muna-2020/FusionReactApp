import {useLayoutEffect} from 'react';
import ArcadixFetchAndCacheData , { DataRef } from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

/**
 * 
 * @param {*} state 
 * @summary   maps entity/application state to props of the component.
 */
export function mapStateToProps(state) {
    if (!global["mode"]) {
        Logger.Log("Mapping");
        return {
            schoolyearperiod: DataRef(state.Entity, "schoolyearperiod", true),
            semester: DataRef(state.Entity, "semester", true),
            textresource: DataRef(state.Entity, "textresource", true),
            DisplayFor: state.ApplicationState.DisplayFor
        };
    }
    else {
        Logger.Log("not mapping");
        return {};
    }
};

/**
 * 
 * @param {*} JConfiguration 
 * @param {*} props 
 * @summary   Get initials request params for the component.
 */
export function InitialDataParams(JConfiguration, props){
    let objResourceParams = {
        "SortKeys": [
            {
                "dtCreatedOn": {
                    "order": "asc"
                }
            }
        ],
        "SearchQuery": {
            "must": [
                {
                    "match": {
                        "Id": JConfiguration.LanguageCultureInfo + "/d.Extranet/5_SharedModule/WeekDisplay"
                    }
                }
            ]
        }
    };
    let objSchoolYearPeriodParams = {
        "SortKeys": [
            {
                "iDisplayOrder": {
                    "order": "asc"
                }
            }
        ],
        "SearchQuery": {
            "must":
            [
                {
                    "match":{
                        "cIsDeleted":"N"
                    }
                }
            ]
        }
    };
    let objSemesterParams = {
        "SortKeys": [
            {
                "iDisplayOrder": {
                    "order": "asc"
                }
            }
        ],
        "SearchQuery": {
            "must":[
                {
                    "match":{
                        "cIsDeleted":"N"
                    }
                }
            ]
        }
    };
    let arrParams = [
        {
            "URL": "API/Object/Blocks/TextResource/TextResource",
            "Params": objResourceParams,
            "ReturnDataOnServerRender": true,
            "MethodType": "Get"
        },
        {
            "URL": "API/Object/Extranet/Teacher/SchoolYearPeriod",
            "Params": objSchoolYearPeriodParams,
            "MethodType": "Get"
        },
        {
            "URL": "API/Object/Extranet/Teacher/Semester",
            "Params": objSemesterParams,
            "MethodType": "Get"
        }
    ];
    return { "DataCalls": arrParams};
};

/**
 * 
 * @param {*} objParams 
 * @summary   Calls FetchAndCacheData execute method to make the api call.
 */
export function DataCall(arrParams, strToggleExecute = "FetchAndCacheExecute"){
    let objArcadixFetchAndCacheData = new ArcadixFetchAndCacheData();
    switch(strToggleExecute)
    {
        case "FetchAndCacheExecute":
            objArcadixFetchAndCacheData.Execute(arrParams, function (objReturn) {
                //Do something
            });
        break;
    }
}

/**
 * 
 * @param {*} objContext 
 * @summary   Gets the InitialDataParams and passes them as a parameter to the DataCall method.
 */
export function useDataLoader(objContext){
    const GetRequiredData = () => {
        DataCall(InitialDataParams(objContext.props.JConfiguration, objContext.props).DataCalls);
    };
    useLayoutEffect(GetRequiredData, []);
}

/**
 * 
 * @param {*} objContext 
 * @summary   Checks if the data is loaded to props and then set the component state accordingly.
 */
export function useDataLoaded(objContext)
{    
    useLayoutEffect(() => {
        if(DataRef(objContext.props.schoolyearperiod, "schoolyearperiod;cisdeleted;n") && 
        DataRef(objContext.props.semester, "semester;cisdeleted;n") && 
        DataRef(objContext.props.textresource, "textresource;id;" + objContext.props.JConfiguration.LanguageCultureInfo + "/d.extranet/5_sharedmodule/weekdisplay"))
        {
            let objTextResource = DataRef(objContext.props.textresource, "textresource;id;" + objContext.props.JConfiguration.LanguageCultureInfo + "/d.extranet/5_sharedmodule/weekdisplay").Data[0]["WeekDisplay"];
            switch(objContext.props.DisplayFor)
            {
                case 1:
                objContext.dispatch({ type:"SET_STATE_VALUES", payload:{"DisplayFor": objTextResource["DayDisplayText"], "intCategory": 1, "iDisplayOrder": -1, "StartDate": "", "EndDate": "", "CurrentDate": ""} });
                break;
                case 2:
                objContext.dispatch({ type:"SET_STATE_VALUES", payload:{"DisplayFor": objTextResource["WeekDisplayText"], "intCategory": 2, "iDisplayOrder": -1, "StartDate": "", "EndDate": "", "CurrentDate": ""} });
                break;
                case 3:
                objContext.dispatch({ type:"SET_STATE_VALUES", payload:{"DisplayFor": objTextResource["SemesterDisplayText"], "intCategory": 3, "iDisplayOrder": -1, "StartDate": "", "EndDate": "", "CurrentDate": ""} });
                break;
                case 4:
                objContext.dispatch({ type:"SET_STATE_VALUES", payload:{"DisplayFor": objTextResource["SchoolYearDisplayText"], "intCategory": 4, "iDisplayOrder": -1, "StartDate": "", "EndDate": "", "CurrentDate": ""} });
                break;
                case 5:
                objContext.dispatch({ type:"SET_STATE_VALUES", payload:{"DisplayFor": objContext.state.DisplayFor, "intCategory": objContext.state.intCategory, "iDisplayOrder": -1, "StartDate": "", "EndDate": "", "CurrentDate": ""} });
                break;
                default:
                objContext.dispatch({ type:"SET_STATE_VALUES", payload:{"DisplayFor": objTextResource["SchoolYearDisplayText"], "intCategory": 4, "iDisplayOrder": -1, "StartDate": "", "EndDate": "", "CurrentDate": ""} });
            }
            GetDateRangeForDisplay(objContext);
            if(!objContext.state.isLoadComplete)
            {
                objContext.dispatch({ type: "DATA_LOAD_COMPLETE", payload: true });
            }
        }
    }, [objContext.props.schoolyear, objContext.props.semester, objContext.props.textresource, objContext.props.DisplayFor]);
}

/**
 * 
 * @param {*} objContext 
 * @param {*} strDate 
 * @summary   Gets the date according to the locale.
 */
export function GetLoacleDate(objContext, strDate)
{
    let arrSplittedDate = strDate.split('.');
    let intDay = parseInt(arrSplittedDate[0]);
    let intMonth = parseInt(arrSplittedDate[1]);
    let intYear = parseInt(arrSplittedDate[2]);
    let strLocaleDate = new Date(intYear, intMonth - 1, intDay).toLocaleDateString(objContext.props.JConfiguration.LanguageCultureInfo);
    return strLocaleDate;
}

/**
 * 
 * @param {*} strDate 
 * @summary   Returns date's day index in week.
 */
function GetDayIndex(strDate)
{
    let arrSplitedDate = strDate.split('.');
    let intDay = parseInt(arrSplitedDate[0]);
    let intMonth = parseInt(arrSplitedDate[1]);
    if(intMonth - 1 === 0)
    {
        intMonth = 12;
    }
    else
    {
        intMonth -= 1;
    }
    let intYear = parseInt(arrSplitedDate[2]);
    let objDate = new Date(intYear, intMonth, intDay);
    let intDayIndex = objDate.getDay() + 1;
    return intDayIndex;
}

/**
 * 
 * @param {*} strDate 
 * @summary   Returns date's day of week.
 */
function GetDayOfWeek(intDayIndex)
{
    switch(intDayIndex)
    {
        case 1:
        return "SUNDAY";
        case 2:
        return "MONDAY";
        case 3:
        return "TUESDAY";
        case 4:
        return "WEDNESDAY";
        case 5:
        return "THURSDAY";
        case 6:
        return "FRIDAY";
        case 7:
        return "SATURDAY";
    }
}

/**
 * 
 * @param {*} intMonth 
 * @param {*} intYear 
 * @summary   Gets the days in a particular month
 */
function GetDaysInMonth(intMonth, intYear)
{
    if(intMonth === 1 || intMonth === 3 || intMonth === 5 || intMonth === 7 || intMonth === 8 || intMonth === 10 || intMonth === 12)
    {
        return 31;
    }
    else if(intMonth === 2)
    {
        if(intYear % 4 === 0)
        {
            return 29;
        }
        else
        {
            return 28;
        }
    }
    else if(intMonth === 4 || intMonth === 6 || intMonth === 9 || intMonth === 11)
    {
        return 30;
    }
}

/**
 * 
 * @param {*} objContext 
 * @param {*} strFromDate 
 * @param {*} strToDate 
 * @param {*} strCurrentDate 
 * @summary   Checks id the given date lies between the given FromDate and ToDate.
 */
function CheckIfDateInRange(objContext, strFromDate, strToDate, strCurrentDate)
{
    let arrSplitedCurrentDate = strCurrentDate.split('.');
    let intCurrentDay = parseInt(arrSplitedCurrentDate[0]);
    let intCurrentMonth = parseInt(arrSplitedCurrentDate[1]);
    let intCurrentYear = parseInt(arrSplitedCurrentDate[2]);
    let arrSplitedFromDate = strFromDate.split('.');
    let intFromDay = parseInt(arrSplitedFromDate[0]);
    let intFromMonth = parseInt(arrSplitedFromDate[1]);
    let intFromYear = parseInt(arrSplitedFromDate[2]);
    let arrSplitedToDate = strToDate.split('.');
    let intToDay = parseInt(arrSplitedToDate[0]);
    let intToMonth = parseInt(arrSplitedToDate[1]);
    let intToYear = parseInt(arrSplitedToDate[2]);

    if(intCurrentYear >= intFromYear && intCurrentYear <= intToYear)
    {
        if(intCurrentYear === intFromYear)
        {
            if(intCurrentMonth >= intFromMonth)
            {
                if(intCurrentMonth === intFromMonth)
                {
                    if(intCurrentDay >= intFromDay)
                    {
                        return true;
                    }
                    else return false;
                }
                else return true;
            }
            else return false;
        }
        else if(intCurrentYear === intToYear)
        {
            if(intCurrentMonth <= intToMonth)
            {
                if(intCurrentMonth === intToMonth)
                {
                    if(intCurrentDay <= intToDay)
                    {
                        return true;
                    }
                    else return false;
                }
                else return true;
            }
            else return false;
        }
        else return true;
    }
    else return false;
}

/**
 * 
 * @param {*} objContext 
 * @param {*} strStartDate 
 * @summary   Gets the previous week to the StartDate of the current week.
 */
function GetPreviousWeek(objContext, strStartDate)
{
    let intWeekStartDay, intWeekStartMonth, intWeekStartYear, intWeekEndDay, intWeekEndMonth, intWeekEndYear;
    let arrSplitedDate = strStartDate.split('.');
    let intCurrentDay = parseInt(arrSplitedDate[0]);
    let intCurrentMonth = parseInt(arrSplitedDate[1]);
    let intCurrentYear = parseInt(arrSplitedDate[2]);
    if(intCurrentDay - 7 <= 0)
    {
        if(intCurrentMonth - 1 === 0)
        {
            intWeekStartMonth = 12;
            intWeekStartYear = intCurrentYear - 1;
            if(intCurrentDay - 1 === 0)
            {
                intWeekEndMonth = 12;
                intWeekEndYear = intCurrentYear - 1;
            }
            else
            {
                intWeekEndMonth = intCurrentMonth;
                intWeekEndYear = intCurrentYear;
            }
        }
        else
        {
            intWeekStartMonth = intCurrentMonth - 1;
            intWeekStartYear = intCurrentYear;
            intWeekEndMonth = intCurrentMonth;
            intWeekEndYear = intCurrentYear;
        }
        let intDaysInPreviousMonth = GetDaysInMonth(intWeekStartMonth, intWeekStartYear);
        intWeekStartDay = intDaysInPreviousMonth - (7 - intCurrentDay);
        if(intCurrentDay - 1 === 0)
        {
            intWeekEndDay = intDaysInPreviousMonth;
        }
        else
        {
            intWeekEndDay = intCurrentDay - 1;
        }
    }
    else
    {
        intWeekStartDay = intCurrentDay - 7;
        intWeekStartMonth = intCurrentMonth;
        intWeekStartYear = intCurrentYear;
        intWeekEndDay = intCurrentDay - 1;
        intWeekEndMonth = intCurrentMonth;
        intWeekEndYear = intCurrentYear;
    }
    return {
        "StartDate": intWeekStartDay + '.' + intWeekStartMonth + '.' + intWeekStartYear,
        "EndDate": intWeekEndDay + '.' + intWeekEndMonth + '.' + intWeekEndYear
    };
}

/**
 * 
 * @param {*} objContext 
 * @param {*} objCurrentFullDate 
 * @summary   Gets the Current week for the present date.
 */
function GetCurrentWeek(objContext, objCurrentFullDate)
{
    let intWeekStartDay, intWeekStartMonth, intWeekStartYear, intWeekEndDay, intWeekEndMonth, intWeekEndYear;
    let intCurrentDay = objCurrentFullDate.getDate();//(1-31)
    let intCurrentMonth = objCurrentFullDate.getMonth() + 1;//(1-12)
    let intCurrentYear = objCurrentFullDate.getFullYear();
    let intWeekDay = objCurrentFullDate.getDay();//(0-7)
    let intDaysInCurrentMonth = GetDaysInMonth(intCurrentMonth, intCurrentYear);
    if((intCurrentDay - intWeekDay) > 0 && (intCurrentDay + (7 - intWeekDay)) <= intDaysInCurrentMonth)
    {
        intWeekStartDay = intCurrentDay - intWeekDay;
        intWeekEndDay = intWeekStartDay + 6;
        intWeekStartMonth = intCurrentMonth;
        intWeekStartYear = intCurrentYear;
        intWeekEndMonth = intCurrentMonth;
        intWeekEndYear = intCurrentYear;
    }
    else if((intCurrentDay - intWeekDay) <= 0)
    {
        if(intCurrentMonth - 1 === 0)
        {
            intWeekStartMonth = 12;
        }
        else
        {
            intWeekStartMonth = intCurrentMonth - 1;
        }
        intWeekEndMonth = intCurrentMonth;
        if(intWeekStartMonth === 12 && intWeekEndMonth === 1)
        {
            intWeekStartYear = intCurrentYear - 1;
            intWeekEndYear = intCurrentYear;
        }
        else
        {
            intWeekStartYear = intCurrentYear;
            intWeekEndYear = intCurrentYear;
        }
        let intDaysInPerviousMonth = GetDaysInMonth(intWeekStartMonth, intWeekStartYear);
        intWeekStartDay = intDaysInPerviousMonth - (intWeekDay - intCurrentDay);
        intWeekEndDay = (6 - intWeekDay) + intCurrentDay;
    }
    else
    {
        intWeekStartMonth = intCurrentMonth;
        if(intCurrentMonth + 1 === 13)
        {
            intWeekEndMonth = 1;
        }
        else
        {
            intWeekEndMonth = intCurrentMonth + 1;
        }
        if(intWeekStartMonth === 12 && intWeekEndMonth === 1)
        {
            intWeekStartYear = intCurrentYear;
            intWeekEndYear = intCurrentYear + 1;
        }
        else
        {
            intWeekStartYear = intCurrentYear;
            intWeekEndYear = intCurrentYear;
        }
        intWeekStartDay = intCurrentDay - intWeekDay;
        if(intCurrentDay < intDaysInCurrentMonth)
        {
            intWeekEndDay = intCurrentDay + (7 - intWeekDay);
            if(intWeekEndDay > intDaysInCurrentMonth)
            {
                intWeekEndDay = intWeekEndDay - intDaysInCurrentMonth;
            }
        }
        else if(intDaysInCurrentMonth === intCurrentDay)
        {
            intWeekEndDay = 1;
        }
    }
    return {
        "StartDate": intWeekStartDay + '.' + intWeekStartMonth + '.' + intWeekStartYear,
        "EndDate": intWeekEndDay + '.' + intWeekEndMonth + '.' + intWeekEndYear
    };
}

/**
 * 
 * @param {*} objContext 
 * @param {*} strEndDate 
 * @summary   Gets the Next week to the EndDate of the current week.
 */
function GetNextWeek(objContext, strEndDate)
{
    let intWeekStartDay, intWeekStartMonth, intWeekStartYear, intWeekEndDay, intWeekEndMonth, intWeekEndYear;
    let arrSplitedDate = strEndDate.split('.');
    let intCurrentDay = parseInt(arrSplitedDate[0]);
    let intCurrentMonth = parseInt(arrSplitedDate[1]);
    let intCurrentYear = parseInt(arrSplitedDate[2]);
    let intDaysInCurrentMonth = GetDaysInMonth(intCurrentMonth, intCurrentYear);
    if(intCurrentDay + 7 <= intDaysInCurrentMonth)
    {
        intWeekStartDay = intCurrentDay + 1;
        intWeekEndDay = intCurrentDay + 7;
        intWeekStartMonth = intCurrentMonth;
        intWeekEndMonth = intCurrentMonth;
        intWeekStartYear = intCurrentYear;
        intWeekEndYear = intCurrentYear;
    }
    else
    {
        if(intCurrentDay === intDaysInCurrentMonth)
        {
            intWeekStartDay = 1;
            intWeekEndDay = 7 + 1;
        }
        else if(intCurrentDay < intDaysInCurrentMonth)
        {
            intWeekStartDay = intCurrentDay + 1;
            intWeekEndDay = 7 - (intDaysInCurrentMonth - intCurrentDay);
        }
        if(intCurrentMonth + 1 === 13)
        {
            intWeekStartMonth = intCurrentMonth;
            intWeekEndMonth = 1;
            if(intCurrentDay < intDaysInCurrentMonth)
            {
                intWeekStartYear = intCurrentYear;
            }
            else if(intCurrentDay === intDaysInCurrentMonth)
            {
                intWeekStartYear = intCurrentYear + 1;
            }
            intWeekEndYear = intCurrentYear + 1;
        }
        else
        {
            intWeekStartMonth = intCurrentMonth;
            intWeekEndMonth = intCurrentMonth + 1;
            intWeekStartYear = intCurrentYear;
            intWeekEndYear = intCurrentYear;
        }
    }
    return {
        "StartDate": intWeekStartDay + '.' + intWeekStartMonth + '.' + intWeekStartYear,
        "EndDate": intWeekEndDay + '.' + intWeekEndMonth + '.' + intWeekEndYear
    };
}

/**
 * 
 * @param {*} objContext 
 * @param {*} blnGetPrevious 
 * @param {*} blnGetNext 
 * @summary   Gets the date range according to week. Both Previous and Next functionality is inside.
 */
function GetWeekForCurrentDate(objContext, blnGetPrevious = false, blnGetNext = false)
{
    let objWeekRange = {};
    let arrSchoolYearPeriods = DataRef(objContext.props.schoolyearperiod, "schoolyearperiod;cisdeleted;n").Data;
    let objFirstSchoolYearPeriod = arrSchoolYearPeriods[0];
    let objLastSchoolYearPeriod = arrSchoolYearPeriods[arrSchoolYearPeriods.length - 1];
    let arrSplitedFromDate = objFirstSchoolYearPeriod["dtFromDate"].split('T')[0].split('-');
    let strFromDate = arrSplitedFromDate[2] + "." + arrSplitedFromDate[1] + "." + arrSplitedFromDate[0];
    let arrSplitedToDate = objLastSchoolYearPeriod["dtToDate"].split('T')[0].split('-');
    let strToDate = arrSplitedToDate[2] + "." + arrSplitedToDate[1] + "." + arrSplitedToDate[0];
    let strStartDate = "";
    let strEndDate = "";
    let blnIsLeftEnd = false;
    let blnIsRightEnd = false;
    if(blnGetPrevious)
    {
        objWeekRange = GetPreviousWeek(objContext, objContext.state.StartDate);
        strStartDate = objWeekRange["StartDate"];
        strEndDate = objWeekRange["EndDate"];
        if(!CheckIfDateInRange(objContext, strFromDate, strToDate, strStartDate) && !CheckIfDateInRange(objContext, strFromDate, strToDate, strEndDate))
        {
            strStartDate = objContext.state.StartDate;
            strEndDate = objContext.state.EndDate;
            blnIsLeftEnd = true;
        }
        else
        {
            let objPreviousWeekThanNewStartDate = GetPreviousWeek(objContext, strStartDate);
            let strNewStartDate = objPreviousWeekThanNewStartDate["StartDate"];
            let strNewEndDate = objPreviousWeekThanNewStartDate["EndDate"];
            if(!CheckIfDateInRange(objContext, strFromDate, strToDate, strNewStartDate) && !CheckIfDateInRange(objContext, strFromDate, strToDate, strNewEndDate))
            {
                blnIsLeftEnd = true;
            }
        }
    }
    else if(blnGetNext)
    {
        objWeekRange = GetNextWeek(objContext, objContext.state.EndDate);
        strStartDate = objWeekRange["StartDate"];
        strEndDate = objWeekRange["EndDate"];
        if(!CheckIfDateInRange(objContext, strFromDate, strToDate, strStartDate) && !CheckIfDateInRange(objContext, strFromDate, strToDate, strEndDate))
        {
            strStartDate = objContext.state.StartDate;
            strEndDate = objContext.state.EndDate;
            blnIsRightEnd = true;
        }
        else
        {
            let objNextWeekThanNewStartDate = GetNextWeek(objContext, strStartDate);
            let strNewStartDate = objNextWeekThanNewStartDate["StartDate"];
            let strNewEndDate = objNextWeekThanNewStartDate["EndDate"];
            if(!CheckIfDateInRange(objContext, strFromDate, strToDate, strNewStartDate) && !CheckIfDateInRange(objContext, strFromDate, strToDate, strNewEndDate))
            {
                blnIsRightEnd = true;
            }
        }
    }
    else
    {
        objWeekRange = GetCurrentWeek(objContext, new Date());
        strStartDate = objWeekRange["StartDate"];
        strEndDate = objWeekRange["EndDate"];
        if(!CheckIfDateInRange(objContext, strFromDate, strToDate, strStartDate) && !CheckIfDateInRange(objContext, strFromDate, strToDate, strEndDate))
        {
            strStartDate = objContext.state.StartDate;
            strEndDate = objContext.state.EndDate;
            blnIsLeftEnd = true;
            blnIsRightEnd = true;
        }
        else
        {
            let objPreviousWeekThanNewStartDate = GetPreviousWeek(objContext, strStartDate);
            let strNewStartDate = objPreviousWeekThanNewStartDate["StartDate"];
            let strNewEndDate = objPreviousWeekThanNewStartDate["EndDate"];
            if(!CheckIfDateInRange(objContext, strFromDate, strToDate, strNewStartDate) && !CheckIfDateInRange(objContext, strFromDate, strToDate, strNewEndDate))
            {
                blnIsLeftEnd = true;
            }
            let objNextWeekThanNewStartDate = GetNextWeek(objContext, strStartDate);
            strNewStartDate = objNextWeekThanNewStartDate["StartDate"];
            strNewEndDate = objNextWeekThanNewStartDate["EndDate"];
            if(!CheckIfDateInRange(objContext, strFromDate, strToDate, strNewStartDate) && !CheckIfDateInRange(objContext, strFromDate, strToDate, strNewEndDate))
            {
                blnIsRightEnd = true;
            }
        }
    }
    return {
        'StartDate': strStartDate,
        'EndDate': strEndDate,
        'CurrentDate': "",
        'intDisplayOrder': -1,
        'isLeftEnd': blnIsLeftEnd,
        'isRightEnd': blnIsRightEnd
    };
}

/**
 * 
 * @param {*} objContext 
 * @param {*} blnGetPrevious 
 * @param {*} blnGetNext 
 * @summary   Gets the date range according to semester. Both Previous and Next functionality is inside.
 */
function GetSemesterForCurrentDate(objContext, blnGetPrevious = false, blnGetNext = false)
{
    let arrSemesters = DataRef(objContext.props.semester, "semester;cisdeleted;n").Data;
    let iDisplayOrder = -1;
    let strStartDate = "";
    let strEndDate = "";
    let blnIsLeftEnd = false;
    let blnIsRightEnd = false;
    if(blnGetPrevious)
    {
        if(arrSemesters.findIndex(objTempSemester => objTempSemester["iDisplayOrder"] < objContext.state.iDisplayOrder) > -1)
        {
            let arrTempSemesters = arrSemesters.filter(objTempSemester => objTempSemester["iDisplayOrder"] < objContext.state.iDisplayOrder);
            let objSemesterDetails = arrTempSemesters[arrTempSemesters.length - 1];
            let arrSplitedFromDate = objSemesterDetails["dtFrom"].split('T')[0].split('-');
            let strFromDate = arrSplitedFromDate[2] + "." + arrSplitedFromDate[1] + "." + arrSplitedFromDate[0];
            let arrSplitedToDate = objSemesterDetails["dtTo"].split('T')[0].split('-');
            let strToDate = arrSplitedToDate[2] + "." + arrSplitedToDate[1] + "." + arrSplitedToDate[0];
            strStartDate = strFromDate;
            strEndDate = strToDate;
            iDisplayOrder = objSemesterDetails["iDisplayOrder"];
            if(arrSemesters.filter(objTempSemester => objTempSemester["iDisplayOrder"] < iDisplayOrder).length === 0)
            {
                blnIsLeftEnd = true;
            }
            if(arrSemesters.filter(objTempSemester => objTempSemester["iDisplayOrder"] > iDisplayOrder).length === 0)
            {
                blnIsRightEnd = true;
            }
        }
        else
        {
            strStartDate = objContext.state.StartDate;
            strEndDate = objContext.state.EndDate;
            iDisplayOrder = objContext.state.iDisplayOrder;
        }
    }
    else if(blnGetNext)
    {
        if(arrSemesters.findIndex(objTempSemester => objTempSemester["iDisplayOrder"] > objContext.state.iDisplayOrder) > -1)
        {
            let objSemesterDetails = arrSemesters.filter(objTempSemester => objTempSemester["iDisplayOrder"] > objContext.state.iDisplayOrder)[0];
            let arrSplitedFromDate = objSemesterDetails["dtFrom"].split('T')[0].split('-');
            let strFromDate = arrSplitedFromDate[2] + "." + arrSplitedFromDate[1] + "." + arrSplitedFromDate[0];
            let arrSplitedToDate = objSemesterDetails["dtTo"].split('T')[0].split('-');
            let strToDate = arrSplitedToDate[2] + "." + arrSplitedToDate[1] + "." + arrSplitedToDate[0];
            strStartDate = strFromDate;
            strEndDate = strToDate;
            iDisplayOrder = objSemesterDetails["iDisplayOrder"];
            if(arrSemesters.filter(objTempSemester => objTempSemester["iDisplayOrder"] < iDisplayOrder).length === 0)
            {
                blnIsLeftEnd = true;
            }
            if(arrSemesters.filter(objTempSemester => objTempSemester["iDisplayOrder"] > iDisplayOrder).length === 0)
            {
                blnIsRightEnd = true;
            }
        }
        else
        {
            strStartDate = objContext.state.StartDate;
            strEndDate = objContext.state.EndDate;
            iDisplayOrder = objContext.state.iDisplayOrder;
        }
    }
    else
    {
        let objCurrentFullDate =  new Date();
        let intCurrentDay = objCurrentFullDate.getDate();
        let intCurrentMonth = objCurrentFullDate.getMonth();
        let intCurrentYear = objCurrentFullDate.getFullYear();
        let strCurrentDate = intCurrentDay + '.' + intCurrentMonth + '.' + intCurrentYear;
        arrSemesters.forEach(objTempSemester => {
            let arrSplitedFromDate = objTempSemester["dtFrom"].split('T')[0].split('-');
            let strFromDate = arrSplitedFromDate[2] + "." + arrSplitedFromDate[1] + "." + arrSplitedFromDate[0];
            let arrSplitedToDate = objTempSemester["dtTo"].split('T')[0].split('-');
            let strToDate = arrSplitedToDate[2] + "." + arrSplitedToDate[1] + "." + arrSplitedToDate[0];
            if(CheckIfDateInRange(objContext, strFromDate, strToDate, strCurrentDate))
            {
                iDisplayOrder = objTempSemester["iDisplayOrder"];
                strStartDate = strFromDate;
                strEndDate = strToDate;
                if(arrSemesters.filter(objTempSemester => objTempSemester["iDisplayOrder"] < iDisplayOrder).length === 0)
                {
                    blnIsLeftEnd = true;
                }
                if(arrSemesters.filter(objTempSemester => objTempSemester["iDisplayOrder"] > iDisplayOrder).length === 0)
                {
                    blnIsRightEnd = true;
                }
            }
        });
    }
    return {
        'StartDate' : strStartDate,
        'EndDate' : strEndDate,
        'CurrentDate': "",
        'intDisplayOrder': iDisplayOrder,
        'isLeftEnd': blnIsLeftEnd,
        'isRightEnd': blnIsRightEnd
    };
}

/**
 * 
 * @param {*} objContext 
 * @param {*} blnGetPrevious 
 * @param {*} blnGetNext 
 * @summary   Gets the date range according to school year. Both Previous and Next functionality is inside.
 */
function GetSchoolYearPeriodForCurrentDate(objContext, blnGetPrevious = false, blnGetNext = false)
{
    let arrSchoolYearPeriods = DataRef(objContext.props.schoolyearperiod, "schoolyearperiod;cisdeleted;n").Data;
    let iDisplayOrder = -1;
    let strStartDate = "";
    let strEndDate = "";
    let blnIsLeftEnd = false;
    let blnIsRightEnd = false;
    if(blnGetPrevious)
    {
        if(arrSchoolYearPeriods.findIndex(objTempSchoolYearPeriod => objTempSchoolYearPeriod["iDisplayOrder"] < objContext.state.iDisplayOrder) > -1)
        {
            let arrTempSchoolYearPeriods = arrSchoolYearPeriods.filter(objTempSchoolYearPeriod => objTempSchoolYearPeriod["iDisplayOrder"] < objContext.state.iDisplayOrder);
            let objSchoolYearPeriodDetails = arrTempSchoolYearPeriods[arrTempSchoolYearPeriods.length-1];
            let arrSplitedFromDate = objSchoolYearPeriodDetails["dtFromDate"].split('T')[0].split('-');
            let strFromDate = arrSplitedFromDate[2] + "." + arrSplitedFromDate[1] + "." + arrSplitedFromDate[0];
            let arrSplitedToDate = objSchoolYearPeriodDetails["dtToDate"].split('T')[0].split('-');
            let strToDate = arrSplitedToDate[2] + "." + arrSplitedToDate[1] + "." + arrSplitedToDate[0];
            strStartDate = strFromDate;
            strEndDate = strToDate;
            iDisplayOrder = objSchoolYearPeriodDetails["iDisplayOrder"];
            if(arrSchoolYearPeriods.filter(objTempSchoolYearPeriod => objTempSchoolYearPeriod["iDisplayOrder"] < iDisplayOrder).length === 0)
            {
                blnIsLeftEnd = true;
            }
            if(arrSchoolYearPeriods.filter(objTempSchoolYearPeriod => objTempSchoolYearPeriod["iDisplayOrder"] > iDisplayOrder).length === 0)
            {
                blnIsRightEnd = true;
            }
        }
        else
        {
            strStartDate = objContext.state.StartDate;
            strEndDate = objContext.state.EndDate;
            iDisplayOrder = objContext.state.iDisplayOrder;
        }
    }
    else if(blnGetNext)
    {
        if(arrSchoolYearPeriods.findIndex(objTempSchoolYearPeriod => objTempSchoolYearPeriod["iDisplayOrder"] > objContext.state.iDisplayOrder) > -1)
        {
            let objSchoolYearPeriodDetails = arrSchoolYearPeriods.filter(objTempSchoolYearPeriod => objTempSchoolYearPeriod["iDisplayOrder"] > objContext.state.iDisplayOrder)[0];
            let arrSplitedFromDate = objSchoolYearPeriodDetails["dtFromDate"].split('T')[0].split('-');
            let strFromDate = arrSplitedFromDate[2] + "." + arrSplitedFromDate[1] + "." + arrSplitedFromDate[0];
            let arrSplitedToDate = objSchoolYearPeriodDetails["dtToDate"].split('T')[0].split('-');
            let strToDate = arrSplitedToDate[2] + "." + arrSplitedToDate[1] + "." + arrSplitedToDate[0];
            strStartDate = strFromDate;
            strEndDate = strToDate;
            iDisplayOrder = objSchoolYearPeriodDetails["iDisplayOrder"];
            if(arrSchoolYearPeriods.filter(objTempSchoolYearPeriod => objTempSchoolYearPeriod["iDisplayOrder"] < iDisplayOrder).length === 0)
            {
                blnIsLeftEnd = true;
            }
            if(arrSchoolYearPeriods.filter(objTempSchoolYearPeriod => objTempSchoolYearPeriod["iDisplayOrder"] > iDisplayOrder).length === 0)
            {
                blnIsRightEnd = true;
            }
        }
        else
        {
            strStartDate = objContext.state.StartDate;
            strEndDate = objContext.state.EndDate;
            iDisplayOrder = objContext.state.iDisplayOrder;
        }
    }
    else
    {
        let objCurrentFullDate =  new Date();
        let intCurrentDay = objCurrentFullDate.getDate();
        let intCurrentMonth = objCurrentFullDate.getMonth();
        let intCurrentYear = objCurrentFullDate.getFullYear();
        let strCurrentDate = intCurrentDay + '.' + intCurrentMonth + '.' + intCurrentYear;
        arrSchoolYearPeriods.forEach(objTempSchoolYearPeriod => {
            let arrSplitedFromDate = objTempSchoolYearPeriod["dtFromDate"].split('T')[0].split('-');
            let strFromDate = arrSplitedFromDate[2] + "." + arrSplitedFromDate[1] + "." + arrSplitedFromDate[0];
            let arrSplitedToDate = objTempSchoolYearPeriod["dtToDate"].split('T')[0].split('-');
            let strToDate = arrSplitedToDate[2] + "." + arrSplitedToDate[1] + "." + arrSplitedToDate[0];
            if(CheckIfDateInRange(objContext, strFromDate, strToDate, strCurrentDate))
            {
                iDisplayOrder = objTempSchoolYearPeriod["iDisplayOrder"];
                strStartDate = strFromDate;
                strEndDate = strToDate;
                if(arrSchoolYearPeriods.filter(objTempSchoolYearPeriod => objTempSchoolYearPeriod["iDisplayOrder"] < iDisplayOrder).length === 0)
                {
                    blnIsLeftEnd = true;
                }
                if(arrSchoolYearPeriods.filter(objTempSchoolYearPeriod => objTempSchoolYearPeriod["iDisplayOrder"] > iDisplayOrder).length === 0)
                {
                    blnIsRightEnd = true;
                }
            }
        });
    }
    return {
        'StartDate' : strStartDate,
        'EndDate' : strEndDate,
        'CurrentDate': "",
        'intDisplayOrder': iDisplayOrder,
        'isLeftEnd': blnIsLeftEnd,
        'isRightEnd': blnIsRightEnd
    };
}

/**
 * 
 * @param {*} objContext 
 * @param {*} strCurrentDate 
 * @summary   Returns the prevoius day date.
 */
function GetPreviousDayDate(objContext, strCurrentDate)
{
    let arrSplitedDate = strCurrentDate.split('.');
    let intCurrentDay = parseInt(arrSplitedDate[0]);
    let intCurrentMonth = parseInt(arrSplitedDate[1]);
    let intCurrentYear = parseInt(arrSplitedDate[2]);
    let intPreviousDay = -1, intPreviousMonth = -1, intPreviousYear = -1;
    if((intCurrentDay - 1) < 1)
    {
        if((intCurrentMonth - 1) < 1)
        {
            intPreviousDay = 31;
            intPreviousMonth = 12;
            intPreviousYear = intCurrentYear - 1;
        }
        else
        {
            intPreviousMonth = intCurrentMonth - 1;
            intPreviousYear = intCurrentYear;
            let intDaysInPerviousMonth = GetDaysInMonth(intPreviousMonth, intPreviousYear);
            intPreviousDay = intDaysInPerviousMonth;
        }
    }
    else
    {
        intPreviousDay = intCurrentDay - 1;
        intPreviousMonth = intCurrentMonth;
        intPreviousYear = intCurrentYear;
    }
    let strPreviousDate = intPreviousDay + '.' + intPreviousMonth + '.' + intPreviousYear;
    return strPreviousDate;
}

/**
 * 
 * @param {*} objContext 
 * @param {*} strCurrentDate 
 * @summary   Returns the next day date.
 */
function GetNextDayDate(objContext, strCurrentDate)
{
    let arrSplitedDate = strCurrentDate.split('.');
    let intCurrentDay = parseInt(arrSplitedDate[0]);
    let intCurrentMonth = parseInt(arrSplitedDate[1]);
    let intCurrentYear = parseInt(arrSplitedDate[2]);
    let intNextDay = -1, intNextMonth = -1, intNextYear = -1;
    let intDaysInCurrentMonth = GetDaysInMonth(intCurrentMonth, intCurrentYear);
    if((intCurrentDay + 1) > intDaysInCurrentMonth)
    {
        if((intCurrentMonth + 1) > 12)
        {
            intNextDay = 1;
            intNextMonth = 1;
            intNextYear = intCurrentYear + 1;
        }
        else
        {
            intNextMonth = intCurrentMonth + 1;
            intNextYear = intCurrentYear;
            intNextDay = 1;
        }
    }
    else if((intCurrentDay + 1) <= intDaysInCurrentMonth)
    {
        intNextDay = intCurrentDay + 1;
        intNextMonth = intCurrentMonth;
        intNextYear = intCurrentYear;
    }
    let strNextDate = intNextDay + '.' + intNextMonth + '.' + intNextYear;
    return strNextDate;
}

/**
 * 
 * @param {*} objContext 
 * @param {*} objTodaysDate 
 * @summary   Returns current day date.
 */
function GetCurrentDayDate(objContext, objTodaysDate)
{
    let intTodaysDay = objTodaysDate.getDate();//(1-31)
    let intTodaysMonth = objTodaysDate.getMonth() + 1;//(1-12)
    let intTodaysYear = objTodaysDate.getFullYear();
    let strTodaysDate = intTodaysDay + '.' + intTodaysMonth + '.' + intTodaysYear;
    return strTodaysDate;
}

/**
 * 
 * @param {*} objContext 
 * @param {*} blnGetPrevious 
 * @param {*} blnGetNext 
 * @summary   Returns the current day or 
 */
function GetDayForCurrentDate(objContext, blnGetPrevious = false, blnGetNext = false)
{
    let arrSchoolYearPeriods = DataRef(objContext.props.schoolyearperiod, "schoolyearperiod;cisdeleted;n").Data;
    let objFirstSchoolYearPeriod = arrSchoolYearPeriods[0];
    let objLastSchoolYearPeriod = arrSchoolYearPeriods[arrSchoolYearPeriods.length - 1];
    let arrSplitedFromDate = objFirstSchoolYearPeriod["dtFromDate"].split('T')[0].split('-');
    let strFromDate = arrSplitedFromDate[2] + "." + arrSplitedFromDate[1] + "." + arrSplitedFromDate[0];
    let arrSplitedToDate = objLastSchoolYearPeriod["dtToDate"].split('T')[0].split('-');
    let strToDate = arrSplitedToDate[2] + "." + arrSplitedToDate[1] + "." + arrSplitedToDate[0];
    let strCurrentDate = "";
    let blnIsLeftEnd = false;
    let blnIsRightEnd = false;
    if(blnGetPrevious)
    {
        let strToBePreviousDate = GetPreviousDayDate(objContext, objContext.state.CurrentDate);
        let strDayOfWeek = GetDayOfWeek(GetDayIndex(strToBePreviousDate));
        while(strDayOfWeek === "SATURDAY" || strDayOfWeek === "SUNDAY")
        {
            strToBePreviousDate = GetPreviousDayDate(objContext, strToBePreviousDate);
            strDayOfWeek = GetDayOfWeek(GetDayIndex(strToBePreviousDate));
        }
        if(CheckIfDateInRange(objContext, strFromDate, strToDate, strToBePreviousDate))
        {
            strCurrentDate = strToBePreviousDate;
            let strPreviousDate = GetPreviousDayDate(objContext, strCurrentDate);
            if(!CheckIfDateInRange(objContext, strFromDate, strToDate, strPreviousDate))
            {
                blnIsLeftEnd = true;
            }
        }
    }
    else if(blnGetNext)
    {
        let strToBeNextDate = GetNextDayDate(objContext, objContext.state.CurrentDate);
        let strDayOfWeek = GetDayOfWeek(GetDayIndex(strToBeNextDate));
        while(strDayOfWeek === "SATURDAY" || strDayOfWeek === "SUNDAY")
        {
            strToBeNextDate = GetNextDayDate(objContext, strToBeNextDate);
            strDayOfWeek = GetDayOfWeek(GetDayIndex(strToBeNextDate));
        }
        if(CheckIfDateInRange(objContext, strFromDate, strToDate, strToBeNextDate))
        {
            strCurrentDate = strToBeNextDate;
            let strNextDate = GetNextDayDate(objContext, strCurrentDate);
            if(!CheckIfDateInRange(objContext, strFromDate, strToDate, strNextDate))
            {
                blnIsRightEnd = true;
            }
        }
    }
    else
    {
        let strTodaysDate = GetCurrentDayDate(objContext, new Date());
        if(CheckIfDateInRange(objContext, strFromDate, strToDate, strTodaysDate))
        {
            strCurrentDate = strTodaysDate;
            let strPreviousDate = GetPreviousDayDate(objContext, strCurrentDate);
            if(!CheckIfDateInRange(objContext, strFromDate, strToDate, strPreviousDate))
            {
                blnIsLeftEnd = true;
            }
            let strNextDate = GetNextDayDate(objContext, strCurrentDate);
            if(!CheckIfDateInRange(objContext, strFromDate, strToDate, strNextDate))
            {
                blnIsRightEnd = true;
            }
        }
    }
    return {
        'StartDate' : "",
        'EndDate' : "",
        'CurrentDate': strCurrentDate,
        'intDisplayOrder': -1,
        'isLeftEnd': blnIsLeftEnd,
        'isRightEnd': blnIsRightEnd
    };
}

/**
 * 
 * @param {*} objContext 
 * @param {*} blnGetPrevious 
 * @param {*} blnGetNext 
 * @summary   Returns the date range by switching according to DispayFor property of the props. Returns the date range to the OnChangeEventHandler of the component.
 */
export function GetDateRangeForDisplay(objContext, blnGetPrevious = false, blnGetNext = false)
{
    let objDateRanges = {};
    let intDisplayFor = parseInt(objContext.props.DisplayFor);
    switch(intDisplayFor)
    {
        case 1:
        objDateRanges = GetDayForCurrentDate(objContext, blnGetPrevious, blnGetNext);
        break;
        case 2:
        objDateRanges = GetWeekForCurrentDate(objContext, blnGetPrevious, blnGetNext);
        break;
        case 3:
        objDateRanges = GetSemesterForCurrentDate(objContext, blnGetPrevious, blnGetNext);
        break;
        case 4:
        objDateRanges = GetSchoolYearPeriodForCurrentDate(objContext, blnGetPrevious, blnGetNext);
        break;
        case 5:
        switch(objContext.state.intCategory)
        {
            case 1:
            objDateRanges = GetDayForCurrentDate(objContext, blnGetPrevious, blnGetNext);
            break;
            case 2:
            objDateRanges = GetWeekForCurrentDate(objContext, blnGetPrevious, blnGetNext);
            break;
            case 3:
            objDateRanges = GetSemesterForCurrentDate(objContext, blnGetPrevious, blnGetNext);
            break;
            case 4:
            objDateRanges = GetSchoolYearPeriodForCurrentDate(objContext, blnGetPrevious, blnGetNext);
            break;
        }
        break;
    }
    let strStartDate = objDateRanges["StartDate"] && objDateRanges["StartDate"] !== "" ? GetLoacleDate(objContext, objDateRanges["StartDate"]): "";
    let strEndDate = objDateRanges["EndDate"] && objDateRanges["EndDate"] !== "" ? GetLoacleDate(objContext, objDateRanges["EndDate"]): "";
    let strCurrentDate = objDateRanges["CurrentDate"] && objDateRanges["CurrentDate"] !== "" ? GetLoacleDate(objContext, objDateRanges["CurrentDate"]): "";
    let intDayIndex = objDateRanges["CurrentDate"] && objDateRanges["CurrentDate"] !== "" ? GetDayIndex(strCurrentDate) : -1;
    let strDayOfWeek = objDateRanges["CurrentDate"] && objDateRanges["CurrentDate"] !== "" ? GetDayOfWeek(intDayIndex) : "";
    objContext.dispatch({ type:"SET_STATE_VALUES", payload:{
        "StartDate": objDateRanges["StartDate"] ? objDateRanges["StartDate"]: "", 
        "EndDate": objDateRanges["EndDate"] ? objDateRanges["EndDate"]: "", 
        "CurrentDate": objDateRanges["CurrentDate"] ? objDateRanges["CurrentDate"]: "",
        "iDisplayOrder": objDateRanges["intDisplayOrder"] ? parseInt(objDateRanges["intDisplayOrder"]) : -1,
        "isLeftEnd": objDateRanges["isLeftEnd"],
        "isRightEnd": objDateRanges["isRightEnd"],
        "DayIndex": intDayIndex,
        "DayOfWeek": strDayOfWeek
    } });
    if(objContext.props.OnChangeDisplay)
    {
        let objReturnData = {
            "StartDate": strStartDate, 
            "EndDate": strEndDate, 
            "CurrentDate": strCurrentDate,
            "DayIndex": intDayIndex,
            "DayOfWeek": strDayOfWeek
        };
        objContext.props.OnChangeDisplay(objReturnData);
    }
}

/**
 * @summary   returns the component initial state
 */
export function GetInitialState()
{
    return {
        isLoadComplete: false,
        intCategory: -1,
        DisplayFor: "",
        arrWeekData: [],
        StartDate: "",
        EndDate: "",
        CurrentDate: "",
        DayIndex: -1,
        DayOfWeek: "",
        iDisplayOrder: -1,
        isLeftEnd: false,
        isRightEnd: false
    };
}

/**
 * 
 * @param {*} state 
 * @param {*} action 
 * @summary   Sets the component state
 */
export function Reducer(state, action)
{
    switch(action.type)
    {
        case 'SET_STATE_VALUES':
        return{
            ...state,
            ...action.payload
        };
        case 'DATA_LOAD_COMPLETE':
        return{
            ...state,
            ["isLoadComplete"]: action.payload
        };
    }
}
