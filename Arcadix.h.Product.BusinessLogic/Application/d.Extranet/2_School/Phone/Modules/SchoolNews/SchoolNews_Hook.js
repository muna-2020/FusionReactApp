export * from '@shared/Application/d.Extranet/2_School/PC/Modules/SchoolNews/SchoolNews_Hook';

//Common functionalities.
import { DataRef } from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

/**
 * @name GetInitialState
 * @param {object} props Props
 * @summary returns initial state
 * @returns {Object} Initial object
 * */
export function GetInitialState(props) {
    let blnIsLoadComplete = false;
    if (
        DataRef(props.Object_Extranet_School_News, "Object_Extranet_School_News;cIsSchool;Y;uUserId;" + props.ClientUserDetails.SchoolDetails.uSchoolId)["Data"] &&
        DataRef(props.Object_Extranet_Teacher_SchoolYearPeriod) &&
        Object_Framework_Services_TextResource.GetData("/d.Extranet/2_School/Modules/SchoolNews", props)
    ) {
        blnIsLoadComplete = true;
    }
    return {
        strMessagetext: "",
        isLoadComplete: blnIsLoadComplete,
        objSchoolYearPeriod: { "uSchoolYearPeriodId": "" },
        strTeacherOrPupil: "teacher",
        objSchoolYearDropdown: undefined,
        blnShowValidation: false,
        blnShowChat: false
    };
}