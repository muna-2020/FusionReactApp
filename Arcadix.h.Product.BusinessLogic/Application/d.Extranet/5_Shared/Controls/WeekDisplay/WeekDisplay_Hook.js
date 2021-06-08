//React specific
import { useEffect } from 'react';

//Common functionality imports
import { DataRef } from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

/**
* @name GetInitialState
* @summary State of the teacher profile component
* @returns {object} initial state object
*/
export function GetInitialState() {
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
        isRightEnd: false,
        strSchoolYearPeriodId:undefined
    };
}

/**
* @name Initialize
* @param {object} objContext Passes Context Object
* @summary Initialize the custom hooks
*/
export function Initialize(objContext) {
    useDataLoader(objContext);
    useDataLoaded(objContext);
}

/** 
 * @name useDataLoader
 * @param {object} objContext objContext
 * @summary   Gets the InitialDataParams and passes them as a parameter to the DataCall method.
 */
export function useDataLoader(objContext) {
    useEffect(() => {
        objContext.WeekDisplay_ModuleProcessor.LoadInitialData(objContext);
    }, []);
}

/**
 * @name useDataLoaded
 * @param {object} objContext objContext
 * @summary   Checks if the data is loaded to props and then set the component state accordingly.
 */
export function useDataLoaded(objContext) {
    useEffect(() => {
        if (DataRef(objContext.props.Object_Extranet_Teacher_SchoolYearPeriod, "")["Data"] &&
            DataRef(objContext.props.Object_Extranet_Teacher_Semester, "Object_Extranet_Teacher_Semester;cIsDeleted;N")["Data"] &&
            objContext.props.Object_Framework_Services_TextResource.GetData("/d.Extranet/5_SharedModule/WeekDisplay", objContext.props)
        ) {
            let objTextResource = objContext.props.Object_Framework_Services_TextResource.GetData("/d.Extranet/5_SharedModule/WeekDisplay", objContext.props);
            switch (objContext.props.DisplayFor) {
                case 1:
                    objContext.dispatch({ type: "SET_STATE", payload: { "DisplayFor": objTextResource["DayDisplayText"], "intCategory": 1, "iDisplayOrder": -1, "StartDate": "", "EndDate": "", "CurrentDate": "" } });
                    break;
                case 2:
                    objContext.dispatch({ type: "SET_STATE", payload: { "DisplayFor": objTextResource["WeekDisplayText"], "intCategory": 2, "iDisplayOrder": -1, "StartDate": "", "EndDate": "", "CurrentDate": "" } });
                    break;
                case 3:
                    objContext.dispatch({ type: "SET_STATE", payload: { "DisplayFor": objTextResource["SemesterDisplayText"], "intCategory": 3, "iDisplayOrder": -1, "StartDate": "", "EndDate": "", "CurrentDate": "" } });
                    break;
                case 4:
                    objContext.dispatch({ type: "SET_STATE", payload: { "DisplayFor": objTextResource["SchoolYearDisplayText"], "intCategory": 4, "iDisplayOrder": -1, "StartDate": "", "EndDate": "", "CurrentDate": "" } });
                    break;
                case 5:
                    objContext.dispatch({ type: "SET_STATE", payload: { "DisplayFor": objContext.state.DisplayFor, "intCategory": objContext.state.intCategory, "iDisplayOrder": -1, "StartDate": "", "EndDate": "", "CurrentDate": "" } });
                    break;
                default:
                    objContext.dispatch({ type: "SET_STATE", payload: { "DisplayFor": objTextResource["SchoolYearDisplayText"], "intCategory": 4, "iDisplayOrder": -1, "StartDate": "", "EndDate": "", "CurrentDate": "" } });
            }
            objContext.WeekDisplay_ModuleProcessor.GetDateRangeForDisplay(objContext);
            if (!objContext.state.isLoadComplete) {
                objContext.dispatch({ type: "SET_STATE", payload: { "isLoadComplete": true } });
            }
        }
    }, [objContext.props.Object_Extranet_Teacher_SchoolYearPeriod,
        objContext.props.Object_Extranet_Teacher_Semester,
        objContext.props.Object_Framework_Services_TextResource,
        objContext.props.DisplayFor]);
}