//Objects required for module.
import Object_Extranet_Teacher_SchoolYearPeriod from '@shared/Object/d.Extranet/3_Teacher/SchoolYearPeriod/SchoolYearPeriod';
import Object_Extranet_Teacher_Semester from '@shared/Object/d.Extranet/3_Teacher/Semester/Semester';

/**
* @name WeekDisplay_ModuleProcessor
* @summary Class for LearningJournal module display and manipulate.
*/
class WeekDisplay_ModuleProcessor extends ExtranetBase_ModuleProcessor {

    /**
     * @name StoreMapList     
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static StoreMapList() {
        return [
            "Object_Extranet_Teacher_SchoolYearPeriod",
            "Object_Extranet_Teacher_Semester",
            "Object_Framework_Services_TextResource",
            { "StoreKey": "ApplicationState", "DataKey": "DisplayFor" }
        ];
    }

    /**
    * @name LoadInitialData
    * @param {object} objContext context object
    * @summary Calls the Queue and Execute method
    */
    LoadInitialData(objContext) {
        //(new ObjectQueue()).QueueAndExecute(this.InitialDataParams(objContext.props));
        (new ObjectQueue()).QueueAndExecuteAPI(this, objContext.props);
    }

    /**
    * @name InitialDataParams
    * @param {object} props Passes props
    * @summary Get initial request params for the component.
    * @returns {Array} return arrays of initial request params
    */
    InitialDataParams(props) {
        let arrDataRequest = [];

        //SchoolYearPeriod
        let objSchoolYearPeriodParams = {
            "SortKeys": [
                {
                    "iDisplayOrder": {
                        "order": "asc"
                    }
                }
            ],
            "SearchQuery": {
                //"must":
                //    [
                //        {
                //            "match": {
                //                "cIsDeleted": "N"
                //            }
                //        }
                //    ]
            }
        };
        Object_Extranet_Teacher_SchoolYearPeriod.Initialize(objSchoolYearPeriodParams);
        arrDataRequest = [...arrDataRequest, Object_Extranet_Teacher_SchoolYearPeriod];

        //Semester
        let objSemesterParams = {
            "SortKeys": [
                {
                    "iDisplayOrder": {
                        "order": "asc"
                    }
                }
            ],
            "SearchQuery": {
                "must": [
                    {
                        "match": {
                            "cIsDeleted": "N"
                        }
                    }
                ]
            }
        };
        Object_Extranet_Teacher_Semester.Initialize(objSemesterParams);
        arrDataRequest = [...arrDataRequest, Object_Extranet_Teacher_Semester];

        //Text Resource
        let arrResourceParams = ["/d.Extranet/5_SharedModule/WeekDisplay"];
        Object_Framework_Services_TextResource.Initialize(arrResourceParams);
        arrDataRequest = [...arrDataRequest, Object_Framework_Services_TextResource];

        return arrDataRequest;
    }

    /**
    * @name FormDisplayTopic
    * @param {object} objContext Passes context object
    * @param {String} strDate Date
    * @summary Gets the date according to the locale.
    * @returns {Array} LocaleDate
    */
    GetLoacleDate(objContext, strDate) {
        let arrSplittedDate = strDate.split('.');
        let intDay = parseInt(arrSplittedDate[0]);
        let intMonth = parseInt(arrSplittedDate[1]);
        let intYear = parseInt(arrSplittedDate[2]);
        let strLocaleDate = new Date(intYear, intMonth - 1, intDay).toLocaleDateString(objContext.props.JConfiguration.LanguageCultureInfo);
        return strLocaleDate;
    }

    /**
    * @name GetFormattedLocaleStartDate
    * @param {object} objContext Passes context object
    * @param {String} strDate Date
    * @summary Gets the start date according to the locale with formatting.
    * @returns {Array} LocaleDate
    */
    GetFormattedLocaleStartDate(objContext, strDate) {
        let arrSplittedDate = strDate.split('.');
        let intDay = parseInt(arrSplittedDate[0]);
        let intMonth = parseInt(arrSplittedDate[1]);
        let intYear = parseInt(arrSplittedDate[2]);
        let strLocaleDate = new Date(intYear, intMonth - 1, intDay).toLocaleDateString(objContext.props.JConfiguration.LanguageCultureInfo, { dateStyle: "long" });
        let arrDate = strLocaleDate.split(' ');
        let strDay = arrDate[0].split('.')[0];
        let strMonth = arrDate[1];
        let strYear = arrDate[2];
        return strMonth + " " + strDay;
    }

    /**
    * @name GetFormattedLocaleEndDate
    * @param {object} objContext Passes context object
    * @param {String} strDate Date
    * @summary Gets the end date according to the locale with formatting.
    * @returns {Array} LocaleDate
    */
    GetFormattedLocaleEndDate(objContext, strDate) {
        let arrSplittedDate = strDate.split('.');
        let intDay = parseInt(arrSplittedDate[0]);
        let intMonth = parseInt(arrSplittedDate[1]);
        let intYear = parseInt(arrSplittedDate[2]);
        let strLocaleDate = new Date(intYear, intMonth - 1, intDay).toLocaleDateString(objContext.props.JConfiguration.LanguageCultureInfo, { dateStyle: "long" });
        let arrDate = strLocaleDate.split(' ');
        let strDay = arrDate[0].split('.')[0];
        let strMonth = arrDate[1];
        let strYear = arrDate[2];
        return strMonth + " " + strDay + " " + strYear;
    }

    /**
    * @name GetFormattedLocaleCurrentDate
    * @param {object} objContext Passes context object
    * @param {String} strDate Date
    * @summary Gets the current date according to the locale with formatting.
    * @returns {Array} LocaleDate
    */
    GetFormattedLocaleCurrentDate(objContext, strDate) {
        let arrSplittedDate = strDate.split('.');
        let intDay = parseInt(arrSplittedDate[0]);
        let intMonth = parseInt(arrSplittedDate[1]);
        let intYear = parseInt(arrSplittedDate[2]);
        let strLocaleDate = new Date(intYear, intMonth - 1, intDay).toLocaleDateString(objContext.props.JConfiguration.LanguageCultureInfo, { dateStyle: "long" });
        let arrDate = strLocaleDate.split(' ');
        let strDay = arrDate[0].split('.')[0];
        let strMonth = arrDate[1];
        let strYear = arrDate[2];
        return strDay + " " + strMonth + " " + strYear;
    }

    /**
    * @name FormDisplayTopic
    * @param {String} strDate Date
    * @summary Returns date's day index in week.
    * @returns {Integer} DayIndex
    */
    GetDayIndex(strDate) {
        let arrSplitedDate = strDate.split('.');
        let intDay = parseInt(arrSplitedDate[0]);
        let intMonth = parseInt(arrSplitedDate[1]);
        if (intMonth - 1 === 0) {
            intMonth = 12;
        }
        else {
            intMonth -= 1;
        }
        let intYear = parseInt(arrSplitedDate[2]);
        let objDate = new Date(intYear, intMonth, intDay);
        let intDayIndex = objDate.getDay() + 1;
        return intDayIndex;
    }

    /**
    * @name GetDayOfWeek
    * @param {Integer} intDayIndex DayIndex
    * @summary Returns date's day of week.
    * @returns {Integer} DayIndex
    */
    GetDayOfWeek(intDayIndex) {
        switch (intDayIndex) {
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
    * @name GetDaysInMonth
    * @param {Integer} intMonth Month
    * @param {Integer} intYear Year
    * @summary Gets the days in a particular month
    * @returns {Integer} Days
    */
    GetDaysInMonth(intMonth, intYear) {
        if (intMonth === 1 || intMonth === 3 || intMonth === 5 || intMonth === 7 || intMonth === 8 || intMonth === 10 || intMonth === 12) {
            return 31;
        }
        else if (intMonth === 2) {
            if (intYear % 4 === 0) {
                return 29;
            }
            else {
                return 28;
            }
        }
        else if (intMonth === 4 || intMonth === 6 || intMonth === 9 || intMonth === 11) {
            return 30;
        }
    }

    /**
    * @name CheckIfDateInRange
    * @param {object} objContext Context object
    * @param {String} strFromDate FromDate
    * @param {String} strToDate ToDate
    * @param {String} strCurrentDate CurrentDate
    * @summary Checks id the given date lies between the given FromDate and ToDate.
    * @returns {Boolean} true/false
    */
    CheckIfDateInRange(objContext, strFromDate, strToDate, strCurrentDate) {
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

        if (intCurrentYear >= intFromYear && intCurrentYear <= intToYear) {
            if (intCurrentYear === intFromYear) {
                if (intCurrentMonth >= intFromMonth) {
                    if (intCurrentMonth === intFromMonth) {
                        if (intCurrentDay >= intFromDay) {
                            return true;
                        }
                        else return false;
                    }
                    else return true;
                }
                else return false;
            }
            else if (intCurrentYear === intToYear) {
                if (intCurrentMonth <= intToMonth) {
                    if (intCurrentMonth === intToMonth) {
                        if (intCurrentDay <= intToDay) {
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
    * @name GetPreviousWeek
    * @param {object} objContext Context object
    * @param {String} strStartDate StartDate
    * @summary Gets the previous week to the StartDate of the current week.
    * @returns {Object} Object with two keys - StartDate and EndDate
    */
    GetPreviousWeek(objContext, strStartDate) {
        let intWeekStartDay, intWeekStartMonth, intWeekStartYear, intWeekEndDay, intWeekEndMonth, intWeekEndYear;
        let arrSplitedDate = strStartDate.split('.');
        let intCurrentDay = parseInt(arrSplitedDate[0]);
        let intCurrentMonth = parseInt(arrSplitedDate[1]);
        let intCurrentYear = parseInt(arrSplitedDate[2]);
        if (intCurrentDay - 7 <= 0) {
            if (intCurrentMonth - 1 === 0) {
                intWeekStartMonth = 12;
                intWeekStartYear = intCurrentYear - 1;
                if (intCurrentDay - 1 === 0) {
                    intWeekEndMonth = 12;
                    intWeekEndYear = intCurrentYear - 1;
                }
                else {
                    intWeekEndMonth = intCurrentMonth;
                    intWeekEndYear = intCurrentYear;
                }
            }
            else {
                intWeekStartMonth = intCurrentMonth - 1;
                intWeekStartYear = intCurrentYear;
                intWeekEndMonth = intCurrentMonth;
                intWeekEndYear = intCurrentYear;
            }
            let intDaysInPreviousMonth = this.GetDaysInMonth(intWeekStartMonth, intWeekStartYear);
            intWeekStartDay = intDaysInPreviousMonth - (7 - intCurrentDay);
            if (intCurrentDay - 1 === 0) {
                intWeekEndDay = intDaysInPreviousMonth;
            }
            else {
                intWeekEndDay = intCurrentDay - 1;
            }
        }
        else {
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
    * @name GetCurrentWeek
    * @param {object} objContext Context object
    * @param {object} objCurrentFullDate CurrentFullDate
    * @summary Gets the Current week for the present date.
    * @returns {Object} Object with two keys - StartDate and EndDate
    */
    GetCurrentWeek(objContext, objCurrentFullDate) {
        let intWeekStartDay, intWeekStartMonth, intWeekStartYear, intWeekEndDay, intWeekEndMonth, intWeekEndYear;
        let intCurrentDay = objCurrentFullDate.getDate();//(1-31)
        let intCurrentMonth = objCurrentFullDate.getMonth() + 1;//(1-12)
        let intCurrentYear = objCurrentFullDate.getFullYear();
        let intWeekDay = objCurrentFullDate.getDay();//(0-7)
        let intDaysInCurrentMonth = this.GetDaysInMonth(intCurrentMonth, intCurrentYear);
        if ((intCurrentDay - intWeekDay) > 0 && (intCurrentDay + (7 - intWeekDay)) <= intDaysInCurrentMonth) {
            intWeekStartDay = intCurrentDay - intWeekDay;
            intWeekEndDay = intWeekStartDay + 6;
            intWeekStartMonth = intCurrentMonth;
            intWeekStartYear = intCurrentYear;
            intWeekEndMonth = intCurrentMonth;
            intWeekEndYear = intCurrentYear;
        }
        else if ((intCurrentDay - intWeekDay) <= 0) {
            if (intCurrentMonth - 1 === 0) {
                intWeekStartMonth = 12;
            }
            else {
                intWeekStartMonth = intCurrentMonth - 1;
            }
            intWeekEndMonth = intCurrentMonth;
            if (intWeekStartMonth === 12 && intWeekEndMonth === 1) {
                intWeekStartYear = intCurrentYear - 1;
                intWeekEndYear = intCurrentYear;
            }
            else {
                intWeekStartYear = intCurrentYear;
                intWeekEndYear = intCurrentYear;
            }
            let intDaysInPerviousMonth = this.GetDaysInMonth(intWeekStartMonth, intWeekStartYear);
            intWeekStartDay = intDaysInPerviousMonth - (intWeekDay - intCurrentDay);
            intWeekEndDay = (6 - intWeekDay) + intCurrentDay;
        }
        else {
            intWeekStartMonth = intCurrentMonth;
            if (intCurrentMonth + 1 === 13) {
                intWeekEndMonth = 1;
            }
            else {
                intWeekEndMonth = intCurrentMonth + 1;
            }
            if (intWeekStartMonth === 12 && intWeekEndMonth === 1) {
                intWeekStartYear = intCurrentYear;
                intWeekEndYear = intCurrentYear + 1;
            }
            else {
                intWeekStartYear = intCurrentYear;
                intWeekEndYear = intCurrentYear;
            }
            intWeekStartDay = intCurrentDay - intWeekDay;
            if (intCurrentDay < intDaysInCurrentMonth) {
                intWeekEndDay = intCurrentDay + (7 - intWeekDay);
                if (intWeekEndDay > intDaysInCurrentMonth) {
                    intWeekEndDay = intWeekEndDay - intDaysInCurrentMonth;
                }
            }
            else if (intDaysInCurrentMonth === intCurrentDay) {
                intWeekEndDay = 1;
            }
        }
        return {
            "StartDate": intWeekStartDay + '.' + intWeekStartMonth + '.' + intWeekStartYear,
            "EndDate": intWeekEndDay + '.' + intWeekEndMonth + '.' + intWeekEndYear
        };
    }

    /**
    * @name GetNextWeek
    * @param {object} objContext Context object
    * @param {String} strEndDate EndDate
    * @summary Gets the Next week to the EndDate of the current week.
    * @returns {Object} Object with two keys - StartDate and EndDate
    */
    GetNextWeek(objContext, strEndDate) {
        let intWeekStartDay, intWeekStartMonth, intWeekStartYear, intWeekEndDay, intWeekEndMonth, intWeekEndYear;
        let arrSplitedDate = strEndDate.split('.');
        let intCurrentDay = parseInt(arrSplitedDate[0]);
        let intCurrentMonth = parseInt(arrSplitedDate[1]);
        let intCurrentYear = parseInt(arrSplitedDate[2]);
        let intDaysInCurrentMonth = this.GetDaysInMonth(intCurrentMonth, intCurrentYear);
        if (intCurrentDay + 7 <= intDaysInCurrentMonth) {
            intWeekStartDay = intCurrentDay + 1;
            intWeekEndDay = intCurrentDay + 7;
            intWeekStartMonth = intCurrentMonth;
            intWeekEndMonth = intCurrentMonth;
            intWeekStartYear = intCurrentYear;
            intWeekEndYear = intCurrentYear;
        }
        else {
            if (intCurrentDay === intDaysInCurrentMonth) {
                intWeekStartDay = 1;
                intWeekEndDay = 7 + 1;
            }
            else if (intCurrentDay < intDaysInCurrentMonth) {
                intWeekStartDay = intCurrentDay + 1;
                intWeekEndDay = 7 - (intDaysInCurrentMonth - intCurrentDay);
            }
            if (intCurrentMonth + 1 === 13) {
                intWeekStartMonth = intCurrentMonth;
                intWeekEndMonth = 1;
                if (intCurrentDay < intDaysInCurrentMonth) {
                    intWeekStartYear = intCurrentYear;
                }
                else if (intCurrentDay === intDaysInCurrentMonth) {
                    intWeekStartYear = intCurrentYear + 1;
                }
                intWeekEndYear = intCurrentYear + 1;
            }
            else {
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
    * @name GetWeekForCurrentDate
    * @param {object} objContext Context object
    * @param {Boolean} blnGetPrevious GetPrevious
    * @param {Boolean} blnGetNext GetNext
    * @summary Gets the date range according to week. Both Previous and Next functionality is inside.
    * @returns {Object} Object with two keys - StartDate, EndDate, CurrentDate, intDisplayOrder, isLeftEnd, isRightEnd
    */
    GetWeekForCurrentDate(objContext, blnGetPrevious = false, blnGetNext = false) {
        let objWeekRange = {};
        let arrSchoolYearPeriods = DataRef(objContext.props.Object_Extranet_Teacher_SchoolYearPeriod, "")["Data"];
        arrSchoolYearPeriods = arrSchoolYearPeriods.sort((a, b) => new Date(a["dtFromDate"]) - new Date(b["dtFromDate"]));
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
        if (blnGetPrevious) {
            objWeekRange = this.GetPreviousWeek(objContext, objContext.state.StartDate);
            strStartDate = objWeekRange["StartDate"];
            strEndDate = objWeekRange["EndDate"];
            if (!this.CheckIfDateInRange(objContext, strFromDate, strToDate, strStartDate) && !this.CheckIfDateInRange(objContext, strFromDate, strToDate, strEndDate)) {
                strStartDate = objContext.state.StartDate;
                strEndDate = objContext.state.EndDate;
                blnIsLeftEnd = true;
            }
            else {
                let objPreviousWeekThanNewStartDate = this.GetPreviousWeek(objContext, strStartDate);
                let strNewStartDate = objPreviousWeekThanNewStartDate["StartDate"];
                let strNewEndDate = objPreviousWeekThanNewStartDate["EndDate"];
                if (!this.CheckIfDateInRange(objContext, strFromDate, strToDate, strNewStartDate) && !this.CheckIfDateInRange(objContext, strFromDate, strToDate, strNewEndDate)) {
                    blnIsLeftEnd = true;
                }
            }
        }
        else if (blnGetNext) {
            objWeekRange = this.GetNextWeek(objContext, objContext.state.EndDate);
            strStartDate = objWeekRange["StartDate"];
            strEndDate = objWeekRange["EndDate"];
            if (!this.CheckIfDateInRange(objContext, strFromDate, strToDate, strStartDate) && !this.CheckIfDateInRange(objContext, strFromDate, strToDate, strEndDate)) {
                strStartDate = objContext.state.StartDate;
                strEndDate = objContext.state.EndDate;
                blnIsRightEnd = true;
            }
            else {
                let objNextWeekThanNewStartDate = this.GetNextWeek(objContext, strStartDate);
                let strNewStartDate = objNextWeekThanNewStartDate["StartDate"];
                let strNewEndDate = objNextWeekThanNewStartDate["EndDate"];
                if (!this.CheckIfDateInRange(objContext, strFromDate, strToDate, strNewStartDate) && !this.CheckIfDateInRange(objContext, strFromDate, strToDate, strNewEndDate)) {
                    blnIsRightEnd = true;
                }
            }
        }
        else {
            objWeekRange = this.GetCurrentWeek(objContext, new Date());
            strStartDate = objWeekRange["StartDate"];
            strEndDate = objWeekRange["EndDate"];
            if (!this.CheckIfDateInRange(objContext, strFromDate, strToDate, strStartDate) && !this.CheckIfDateInRange(objContext, strFromDate, strToDate, strEndDate)) {
                strStartDate = objContext.state.StartDate;
                strEndDate = objContext.state.EndDate;
                blnIsLeftEnd = true;
                blnIsRightEnd = true;
            }
            else {
                let objPreviousWeekThanNewStartDate = this.GetPreviousWeek(objContext, strStartDate);
                let strNewStartDate = objPreviousWeekThanNewStartDate["StartDate"];
                let strNewEndDate = objPreviousWeekThanNewStartDate["EndDate"];
                if (!this.CheckIfDateInRange(objContext, strFromDate, strToDate, strNewStartDate) && !this.CheckIfDateInRange(objContext, strFromDate, strToDate, strNewEndDate)) {
                    blnIsLeftEnd = true;
                }
                let objNextWeekThanNewStartDate = this.GetNextWeek(objContext, strStartDate);
                strNewStartDate = objNextWeekThanNewStartDate["StartDate"];
                strNewEndDate = objNextWeekThanNewStartDate["EndDate"];
                if (!this.CheckIfDateInRange(objContext, strFromDate, strToDate, strNewStartDate) && !this.CheckIfDateInRange(objContext, strFromDate, strToDate, strNewEndDate)) {
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
    * @name GetSemesterForCurrentDate
    * @param {object} objContext Context object
    * @param {Boolean} blnGetPrevious GetPrevious
    * @param {Boolean} blnGetNext GetNext
    * @summary Gets the date range according to semester. Both Previous and Next functionality is inside.
    * @returns {Object} Object with two keys - StartDate, EndDate, CurrentDate, intDisplayOrder, isLeftEnd, isRightEnd
    */
    GetSemesterForCurrentDate(objContext, blnGetPrevious = false, blnGetNext = false) {
        let arrSemesters = DataRef(objContext.props.Object_Extranet_Teacher_Semester, "Object_Extranet_Teacher_Semester;cIsDeleted;N")["Data"];
        let iDisplayOrder = -1;
        let strStartDate = "";
        let strEndDate = "";
        let blnIsLeftEnd = false;
        let blnIsRightEnd = false;
        if (blnGetPrevious) {
            if (arrSemesters.findIndex(objTempSemester => objTempSemester["iDisplayOrder"] < objContext.state.iDisplayOrder) > -1) {
                let arrTempSemesters = arrSemesters.filter(objTempSemester => objTempSemester["iDisplayOrder"] < objContext.state.iDisplayOrder);
                let objSemesterDetails = arrTempSemesters[arrTempSemesters.length - 1];
                let arrSplitedFromDate = objSemesterDetails["dtFrom"].split('T')[0].split('-');
                let strFromDate = arrSplitedFromDate[2] + "." + arrSplitedFromDate[1] + "." + arrSplitedFromDate[0];
                let arrSplitedToDate = objSemesterDetails["dtTo"].split('T')[0].split('-');
                let strToDate = arrSplitedToDate[2] + "." + arrSplitedToDate[1] + "." + arrSplitedToDate[0];
                strStartDate = strFromDate;
                strEndDate = strToDate;
                iDisplayOrder = objSemesterDetails["iDisplayOrder"];
                if (arrSemesters.filter(objTempSemester => objTempSemester["iDisplayOrder"] < iDisplayOrder).length === 0) {
                    blnIsLeftEnd = true;
                }
                if (arrSemesters.filter(objTempSemester => objTempSemester["iDisplayOrder"] > iDisplayOrder).length === 0) {
                    blnIsRightEnd = true;
                }
            }
            else {
                strStartDate = objContext.state.StartDate;
                strEndDate = objContext.state.EndDate;
                iDisplayOrder = objContext.state.iDisplayOrder;
            }
        }
        else if (blnGetNext) {
            if (arrSemesters.findIndex(objTempSemester => objTempSemester["iDisplayOrder"] > objContext.state.iDisplayOrder) > -1) {
                let objSemesterDetails = arrSemesters.filter(objTempSemester => objTempSemester["iDisplayOrder"] > objContext.state.iDisplayOrder)[0];
                let arrSplitedFromDate = objSemesterDetails["dtFrom"].split('T')[0].split('-');
                let strFromDate = arrSplitedFromDate[2] + "." + arrSplitedFromDate[1] + "." + arrSplitedFromDate[0];
                let arrSplitedToDate = objSemesterDetails["dtTo"].split('T')[0].split('-');
                let strToDate = arrSplitedToDate[2] + "." + arrSplitedToDate[1] + "." + arrSplitedToDate[0];
                strStartDate = strFromDate;
                strEndDate = strToDate;
                iDisplayOrder = objSemesterDetails["iDisplayOrder"];
                if (arrSemesters.filter(objTempSemester => objTempSemester["iDisplayOrder"] < iDisplayOrder).length === 0) {
                    blnIsLeftEnd = true;
                }
                if (arrSemesters.filter(objTempSemester => objTempSemester["iDisplayOrder"] > iDisplayOrder).length === 0) {
                    blnIsRightEnd = true;
                }
            }
            else {
                strStartDate = objContext.state.StartDate;
                strEndDate = objContext.state.EndDate;
                iDisplayOrder = objContext.state.iDisplayOrder;
            }
        }
        else {
            let objCurrentFullDate = new Date();
            let intCurrentDay = objCurrentFullDate.getDate();
            let intCurrentMonth = objCurrentFullDate.getMonth() + 1;
            let intCurrentYear = objCurrentFullDate.getFullYear();
            let strCurrentDate = intCurrentDay + '.' + intCurrentMonth + '.' + intCurrentYear;
            arrSemesters.forEach(objTempSemester => {
                let arrSplitedFromDate = objTempSemester["dtFrom"].split('T')[0].split('-');
                let strFromDate = arrSplitedFromDate[2] + "." + arrSplitedFromDate[1] + "." + arrSplitedFromDate[0];
                let arrSplitedToDate = objTempSemester["dtTo"].split('T')[0].split('-');
                let strToDate = arrSplitedToDate[2] + "." + arrSplitedToDate[1] + "." + arrSplitedToDate[0];
                if (this.CheckIfDateInRange(objContext, strFromDate, strToDate, strCurrentDate)) {
                    iDisplayOrder = objTempSemester["iDisplayOrder"];
                    strStartDate = strFromDate;
                    strEndDate = strToDate;
                    if (arrSemesters.filter(objTempSemester => objTempSemester["iDisplayOrder"] < iDisplayOrder).length === 0) {
                        blnIsLeftEnd = true;
                    }
                    if (arrSemesters.filter(objTempSemester => objTempSemester["iDisplayOrder"] > iDisplayOrder).length === 0) {
                        blnIsRightEnd = true;
                    }
                }
            });
        }
        return {
            'StartDate': strStartDate,
            'EndDate': strEndDate,
            'CurrentDate': "",
            'intDisplayOrder': iDisplayOrder,
            'isLeftEnd': blnIsLeftEnd,
            'isRightEnd': blnIsRightEnd
        };
    }

    /**
    * @name GetSchoolYearPeriodForCurrentDate
    * @param {object} objContext Context object
    * @param {Boolean} blnGetPrevious GetPrevious
    * @param {Boolean} blnGetNext GetNext
    * @summary Gets the date range according to school year. Both Previous and Next functionality is inside.
    * @returns {Object} Object with two keys - StartDate, EndDate, CurrentDate, intDisplayOrder, isLeftEnd, isRightEnd
    */
    GetSchoolYearPeriodForCurrentDate(objContext, blnGetPrevious = false, blnGetNext = false) {
        let arrSchoolYearPeriods = DataRef(objContext.props.Object_Extranet_Teacher_SchoolYearPeriod, "")["Data"];
        let iDisplayOrder = -1;
        let strStartDate = "";
        let strEndDate = "";
        let blnIsLeftEnd = false;
        let blnIsRightEnd = false;
        let strSchoolYearPeriod = '';
        if (blnGetPrevious) {
            if (arrSchoolYearPeriods.findIndex(objTempSchoolYearPeriod => objTempSchoolYearPeriod["iDisplayOrder"] > objContext.state.iDisplayOrder) > -1) {
                let arrTempSchoolYearPeriods = arrSchoolYearPeriods.filter(objTempSchoolYearPeriod => objTempSchoolYearPeriod["iDisplayOrder"] > objContext.state.iDisplayOrder);
                let objSchoolYearPeriodDetails = arrTempSchoolYearPeriods[0];
                let arrSplitedFromDate = objSchoolYearPeriodDetails["dtFromDate"].split('T')[0].split('-');
                let strFromDate = arrSplitedFromDate[2] + "." + arrSplitedFromDate[1] + "." + arrSplitedFromDate[0];
                let arrSplitedToDate = objSchoolYearPeriodDetails["dtToDate"].split('T')[0].split('-');
                let strToDate = arrSplitedToDate[2] + "." + arrSplitedToDate[1] + "." + arrSplitedToDate[0];
                strStartDate = strFromDate;
                strEndDate = strToDate;
                iDisplayOrder = objSchoolYearPeriodDetails["iDisplayOrder"];
                strSchoolYearPeriod = objSchoolYearPeriodDetails["uSchoolYearPeriodId"];
                if (arrSchoolYearPeriods.filter(objTempSchoolYearPeriod => objTempSchoolYearPeriod["iDisplayOrder"] > iDisplayOrder).length === 0) {
                    blnIsLeftEnd = true;
                }
                if (arrSchoolYearPeriods.filter(objTempSchoolYearPeriod => objTempSchoolYearPeriod["iDisplayOrder"] < iDisplayOrder).length === 0) {
                    blnIsRightEnd = true;
                }
            }
            else {
                strStartDate = objContext.state.StartDate;
                strEndDate = objContext.state.EndDate;
                iDisplayOrder = objContext.state.iDisplayOrder;
                uSchoolYearPeriodId = objContext.state.strSchoolYearPeriod
            }
        }
        else if (blnGetNext) {
            if (arrSchoolYearPeriods.findIndex(objTempSchoolYearPeriod => objTempSchoolYearPeriod["iDisplayOrder"] < objContext.state.iDisplayOrder) > -1) {
                let objSchoolYearPeriodDetails = arrSchoolYearPeriods.filter(objTempSchoolYearPeriod => objTempSchoolYearPeriod["iDisplayOrder"] < objContext.state.iDisplayOrder);
                objSchoolYearPeriodDetails = objSchoolYearPeriodDetails[objSchoolYearPeriodDetails.length - 1];
                let arrSplitedFromDate = objSchoolYearPeriodDetails["dtFromDate"].split('T')[0].split('-');
                let strFromDate = arrSplitedFromDate[2] + "." + arrSplitedFromDate[1] + "." + arrSplitedFromDate[0];
                let arrSplitedToDate = objSchoolYearPeriodDetails["dtToDate"].split('T')[0].split('-');
                let strToDate = arrSplitedToDate[2] + "." + arrSplitedToDate[1] + "." + arrSplitedToDate[0];
                strStartDate = strFromDate;
                strEndDate = strToDate;
                iDisplayOrder = objSchoolYearPeriodDetails["iDisplayOrder"];
                strSchoolYearPeriod = objSchoolYearPeriodDetails["uSchoolYearPeriodId"];
                if (arrSchoolYearPeriods.filter(objTempSchoolYearPeriod => objTempSchoolYearPeriod["iDisplayOrder"] > iDisplayOrder).length === 0) {
                    blnIsLeftEnd = true;
                }
                if (arrSchoolYearPeriods.filter(objTempSchoolYearPeriod => objTempSchoolYearPeriod["iDisplayOrder"] < iDisplayOrder).length === 0) {
                    blnIsRightEnd = true;
                }
            }
            else {
                strStartDate = objContext.state.StartDate;
                strEndDate = objContext.state.EndDate;
                iDisplayOrder = objContext.state.iDisplayOrder;
                uSchoolYearPeriodId = objContext.state.strSchoolYearPeriod;
            }
        }
        else {
            let objCurrentFullDate = new Date();
            let intCurrentDay = objCurrentFullDate.getDate();
            let intCurrentMonth = objCurrentFullDate.getMonth() + 1;
            let intCurrentYear = objCurrentFullDate.getFullYear();
            let strCurrentDate = intCurrentDay + '.' + intCurrentMonth + '.' + intCurrentYear;
            arrSchoolYearPeriods.forEach(objTempSchoolYearPeriod => {
                let arrSplitedFromDate = objTempSchoolYearPeriod["dtFromDate"].split('T')[0].split('-');
                let strFromDate = arrSplitedFromDate[2] + "." + arrSplitedFromDate[1] + "." + arrSplitedFromDate[0];
                let arrSplitedToDate = objTempSchoolYearPeriod["dtToDate"].split('T')[0].split('-');
                let strToDate = arrSplitedToDate[2] + "." + arrSplitedToDate[1] + "." + arrSplitedToDate[0];
                if (this.CheckIfDateInRange(objContext, strFromDate, strToDate, strCurrentDate)) {
                    iDisplayOrder = objTempSchoolYearPeriod["iDisplayOrder"];
                    strStartDate = strFromDate;
                    strEndDate = strToDate;
                    strSchoolYearPeriod = objTempSchoolYearPeriod["uSchoolYearPeriodId"];
                    if (arrSchoolYearPeriods.filter(objTempSchoolYearPeriod => objTempSchoolYearPeriod["iDisplayOrder"] > iDisplayOrder).length === 0) {
                        blnIsLeftEnd = true;
                    }
                    if (arrSchoolYearPeriods.filter(objTempSchoolYearPeriod => objTempSchoolYearPeriod["iDisplayOrder"] < iDisplayOrder).length === 0) {
                        blnIsRightEnd = true;
                    }
                }
            });
        }
        return {
            'StartDate': strStartDate,
            'EndDate': strEndDate,
            'CurrentDate': "",
            'intDisplayOrder': iDisplayOrder,
            'isLeftEnd': blnIsLeftEnd,
            'isRightEnd': blnIsRightEnd,
            'uSchoolYearPeriodId': strSchoolYearPeriod
        };
    }

    /**
    * @name GetPreviousDayDate
    * @param {object} objContext Context object
    * @param {String} strCurrentDate CurrentDate
    * @summary Returns the prevoius day date.
    * @returns {String} Previous Date
    */
    GetPreviousDayDate(objContext, strCurrentDate) {
        let arrSplitedDate = strCurrentDate.split('.');
        let intCurrentDay = parseInt(arrSplitedDate[0]);
        let intCurrentMonth = parseInt(arrSplitedDate[1]);
        let intCurrentYear = parseInt(arrSplitedDate[2]);
        let intPreviousDay = -1, intPreviousMonth = -1, intPreviousYear = -1;
        if ((intCurrentDay - 1) < 1) {
            if ((intCurrentMonth - 1) < 1) {
                intPreviousDay = 31;
                intPreviousMonth = 12;
                intPreviousYear = intCurrentYear - 1;
            }
            else {
                intPreviousMonth = intCurrentMonth - 1;
                intPreviousYear = intCurrentYear;
                let intDaysInPerviousMonth = this.GetDaysInMonth(intPreviousMonth, intPreviousYear);
                intPreviousDay = intDaysInPerviousMonth;
            }
        }
        else {
            intPreviousDay = intCurrentDay - 1;
            intPreviousMonth = intCurrentMonth;
            intPreviousYear = intCurrentYear;
        }
        let strPreviousDate = intPreviousDay + '.' + intPreviousMonth + '.' + intPreviousYear;
        return strPreviousDate;
    }

    /**
    * @name GetNextDayDate
    * @param {object} objContext Context object
    * @param {String} strCurrentDate CurrentDate
    * @summary Returns the next day date.
    * @returns {String} Next Date
    */
    GetNextDayDate(objContext, strCurrentDate) {
        let arrSplitedDate = strCurrentDate.split('.');
        let intCurrentDay = parseInt(arrSplitedDate[0]);
        let intCurrentMonth = parseInt(arrSplitedDate[1]);
        let intCurrentYear = parseInt(arrSplitedDate[2]);
        let intNextDay = -1, intNextMonth = -1, intNextYear = -1;
        let intDaysInCurrentMonth = this.GetDaysInMonth(intCurrentMonth, intCurrentYear);
        if ((intCurrentDay + 1) > intDaysInCurrentMonth) {
            if ((intCurrentMonth + 1) > 12) {
                intNextDay = 1;
                intNextMonth = 1;
                intNextYear = intCurrentYear + 1;
            }
            else {
                intNextMonth = intCurrentMonth + 1;
                intNextYear = intCurrentYear;
                intNextDay = 1;
            }
        }
        else if ((intCurrentDay + 1) <= intDaysInCurrentMonth) {
            intNextDay = intCurrentDay + 1;
            intNextMonth = intCurrentMonth;
            intNextYear = intCurrentYear;
        }
        let strNextDate = intNextDay + '.' + intNextMonth + '.' + intNextYear;
        return strNextDate;
    }

    /**
    * @name GetCurrentDayDate
    * @param {object} objContext Context object
    * @param {object} objTodaysDate Today'sDate
    * @summary Returns current day date.
    * @returns {String} Today's Date
    */
    GetCurrentDayDate(objContext, objTodaysDate) {
        let intTodaysDay = objTodaysDate.getDate();//(1-31)
        let intTodaysMonth = objTodaysDate.getMonth() + 1;//(1-12)
        let intTodaysYear = objTodaysDate.getFullYear();
        let strTodaysDate = intTodaysDay + '.' + intTodaysMonth + '.' + intTodaysYear;
        return strTodaysDate;
    }

    /**
    * @name GetDayForCurrentDate
    * @param {object} objContext Context object
    * @param {boolean} blnGetPrevious GetPrevious
    * @param {boolean} blnGetNext GetNext
    * @summary Returns the current day or
    * @returns {Object} Object with two keys - StartDate, EndDate, CurrentDate, intDisplayOrder, isLeftEnd, isRightEnd
    */
    GetDayForCurrentDate(objContext, blnGetPrevious = false, blnGetNext = false) {
        let arrSchoolYearPeriods = DataRef(objContext.props.Object_Extranet_Teacher_SchoolYearPeriod, "")["Data"];
        let objFirstSchoolYearPeriod = arrSchoolYearPeriods[0];
        let objLastSchoolYearPeriod = arrSchoolYearPeriods[arrSchoolYearPeriods.length - 1];
        let arrSplitedFromDate = objFirstSchoolYearPeriod["dtFromDate"].split('T')[0].split('-');
        let strFromDate = arrSplitedFromDate[2] + "." + arrSplitedFromDate[1] + "." + arrSplitedFromDate[0];
        let arrSplitedToDate = objLastSchoolYearPeriod["dtToDate"].split('T')[0].split('-');
        let strToDate = arrSplitedToDate[2] + "." + arrSplitedToDate[1] + "." + arrSplitedToDate[0];
        let strCurrentDate = "";
        let blnIsLeftEnd = false;
        let blnIsRightEnd = false;
        if (blnGetPrevious) {
            let strToBePreviousDate = this.GetPreviousDayDate(objContext, objContext.state.CurrentDate);
            let strDayOfWeek = this.GetDayOfWeek(this.GetDayIndex(strToBePreviousDate));
            while (strDayOfWeek === "SATURDAY" || strDayOfWeek === "SUNDAY") {
                strToBePreviousDate = this.GetPreviousDayDate(objContext, strToBePreviousDate);
                strDayOfWeek = this.GetDayOfWeek(this.GetDayIndex(strToBePreviousDate));
            }
            if (this.CheckIfDateInRange(objContext, strFromDate, strToDate, strToBePreviousDate)) {
                strCurrentDate = strToBePreviousDate;
                let strPreviousDate = this.GetPreviousDayDate(objContext, strCurrentDate);
                if (!this.CheckIfDateInRange(objContext, strFromDate, strToDate, strPreviousDate)) {
                    blnIsLeftEnd = true;
                }
            }
        }
        else if (blnGetNext) {
            let strToBeNextDate = this.GetNextDayDate(objContext, objContext.state.CurrentDate);
            let strDayOfWeek = this.GetDayOfWeek(this.GetDayIndex(strToBeNextDate));
            while (strDayOfWeek === "SATURDAY" || strDayOfWeek === "SUNDAY") {
                strToBeNextDate = this.GetNextDayDate(objContext, strToBeNextDate);
                strDayOfWeek = this.GetDayOfWeek(this.GetDayIndex(strToBeNextDate));
            }
            if (this.CheckIfDateInRange(objContext, strFromDate, strToDate, strToBeNextDate)) {
                strCurrentDate = strToBeNextDate;
                let strNextDate = this.GetNextDayDate(objContext, strCurrentDate);
                if (!this.CheckIfDateInRange(objContext, strFromDate, strToDate, strNextDate)) {
                    blnIsRightEnd = true;
                }
            }
        }
        else {
            let strTodaysDate = this.GetCurrentDayDate(objContext, new Date());
            if (this.CheckIfDateInRange(objContext, strFromDate, strToDate, strTodaysDate)) {
                strCurrentDate = strTodaysDate;
                let strPreviousDate = this.GetPreviousDayDate(objContext, strCurrentDate);
                if (!this.CheckIfDateInRange(objContext, strFromDate, strToDate, strPreviousDate)) {
                    blnIsLeftEnd = true;
                }
                let strNextDate = this.GetNextDayDate(objContext, strCurrentDate);
                if (!this.CheckIfDateInRange(objContext, strFromDate, strToDate, strNextDate)) {
                    blnIsRightEnd = true;
                }
            }
        }
        return {
            'StartDate': "",
            'EndDate': "",
            'CurrentDate': strCurrentDate,
            'intDisplayOrder': -1,
            'isLeftEnd': blnIsLeftEnd,
            'isRightEnd': blnIsRightEnd
        };
    }

    /**
    * @name GetDateRangeForDisplay
    * @param {object} objContext Context object
    * @param {boolean} blnGetPrevious GetPrevious
    * @param {boolean} blnGetNext GetNext
    * @summary Returns the date range by switching according to DispayFor property of the props. Returns the date range to the OnChangeEventHandler of the component.
    */
    GetDateRangeForDisplay(objContext, blnGetPrevious = false, blnGetNext = false) {
        let objDateRanges = {};
        let intDisplayFor = parseInt(objContext.props.DisplayFor);
        switch (intDisplayFor) {
            case 1:
                objDateRanges = this.GetDayForCurrentDate(objContext, blnGetPrevious, blnGetNext);
                break;
            case 2:
                objDateRanges = this.GetWeekForCurrentDate(objContext, blnGetPrevious, blnGetNext);
                break;
            case 3:
                objDateRanges = this.GetSemesterForCurrentDate(objContext, blnGetPrevious, blnGetNext);
                break;
            case 4:
                objDateRanges = this.GetSchoolYearPeriodForCurrentDate(objContext, blnGetPrevious, blnGetNext);
                break;
            case 5:
                switch (objContext.state.intCategory) {
                    case 1:
                        objDateRanges = this.GetDayForCurrentDate(objContext, blnGetPrevious, blnGetNext);
                        break;
                    case 2:
                        objDateRanges = this.GetWeekForCurrentDate(objContext, blnGetPrevious, blnGetNext);
                        break;
                    case 3:
                        objDateRanges = this.GetSemesterForCurrentDate(objContext, blnGetPrevious, blnGetNext);
                        break;
                    case 4:
                        objDateRanges = this.GetSchoolYearPeriodForCurrentDate(objContext, blnGetPrevious, blnGetNext);
                        break;
                }
                break;
        }
        let strStartDate = objDateRanges["StartDate"] && objDateRanges["StartDate"] !== "" ? this.GetLoacleDate(objContext, objDateRanges["StartDate"]) : "";
        let strEndDate = objDateRanges["EndDate"] && objDateRanges["EndDate"] !== "" ? this.GetLoacleDate(objContext, objDateRanges["EndDate"]) : "";
        let strCurrentDate = objDateRanges["CurrentDate"] && objDateRanges["CurrentDate"] !== "" ? this.GetLoacleDate(objContext, objDateRanges["CurrentDate"]) : "";
        let intDayIndex = objDateRanges["CurrentDate"] && objDateRanges["CurrentDate"] !== "" ? this.GetDayIndex(strCurrentDate) : -1;
        let strDayOfWeek = objDateRanges["CurrentDate"] && objDateRanges["CurrentDate"] !== "" ? this.GetDayOfWeek(intDayIndex) : "";
        objContext.dispatch({
            type: "SET_STATE", payload: {
                "StartDate": objDateRanges["StartDate"] ? objDateRanges["StartDate"] : "",
                "EndDate": objDateRanges["EndDate"] ? objDateRanges["EndDate"] : "",
                "CurrentDate": objDateRanges["CurrentDate"] ? objDateRanges["CurrentDate"] : "",
                "iDisplayOrder": objDateRanges["intDisplayOrder"] ? parseInt(objDateRanges["intDisplayOrder"]) : -1,
                "isLeftEnd": objDateRanges["isLeftEnd"],
                "isRightEnd": objDateRanges["isRightEnd"],
                "DayIndex": intDayIndex,
                "DayOfWeek": strDayOfWeek,
                "strSchoolYearPeriodId": objDateRanges["uSchoolYearPeriodId"]
            }
        });
        if (objContext.props.OnChangeDisplay) {
            let objReturnData = {
                "StartDate": strStartDate,
                "EndDate": strEndDate,
                "CurrentDate": strCurrentDate,
                "DayIndex": intDayIndex,
                "DayOfWeek": strDayOfWeek,
                "iDisplayOrder": objDateRanges["intDisplayOrder"] ? parseInt(objDateRanges["intDisplayOrder"]) : -1,
                "uSchoolYearPeriodId": objDateRanges["uSchoolYearPeriodId"] ? objDateRanges["uSchoolYearPeriodId"] : undefined
            };
            objContext.props.OnChangeDisplay(objReturnData);
        }
    }

    /**
    * @name GetPrefetchFiles
    * @param {object} props props
    * @returns {object} PrefetchFiles
    */
    GetPrefetchFiles(props) {
        return {
            "Components": [],
            "Files": []
        }
    }
}

export default WeekDisplay_ModuleProcessor;