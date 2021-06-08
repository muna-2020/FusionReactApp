//React related imports.
import { useEffect } from 'react';

//Module related fies.
import Class_ModuleProcessor from "@shared/Application/d.Extranet/2_School/PC/Modules/ClassAndPupil/Class/Class_ModuleProcessor";


export function GetInitialState(props) {
    return {
        isDataSentToPupil: false,
        isLoadComplete: false,
        arrClassGridData: [],
        intActivationStatusToggleData: 1, //all classes is -1
        intClassAndTeamTeacherStatusToggleData: -1,
        uTeacherId: "",
        isNewRowAdded: false,
        blnIsSaved: false,
    };
}

/**
 * @name Initialize
 * @param {object} objContext Passes Context Object
 * @summary Initialize the custom hooks for loading the data 
 */
export function Initialize(objContext) {
    useDataLoaded(objContext);
    useOnClassDataUpdate(objContext);
    useOnClassGridDataUpdate(objContext);
}

/**
 * @name useDataLoaded
 * @param {object} objContext objContext
 * @summary Checks if the data is loaded to props and then set the component state accordingly.
 */
function useDataLoaded(objContext) {
    useEffect(() => {
        if (objContext.state.isLoadComplete)
            ApplicationState.SetProperty("blnShowAnimation", false);
        let strUserId = objContext.props.PropsCommonFunctions.GetSchoolIdByApplicationType(objContext.props);
        if (DataRef(objContext.props.Object_Extranet_Teacher_SchoolYear, "Object_Extranet_Teacher_SchoolYear;cIsDeleted;N")["Data"] &&
            DataRef(objContext.props.Object_Extranet_Teacher_SchoolYearPeriod, "Object_Extranet_Teacher_SchoolYearPeriod;cIsDeleted;N")["Data"]) {
            if (objContext.props.PropsCommonFunctions.IsSchoolOrAdminTeacher(objContext.props) &&
                DataRef(objContext.props.Object_Extranet_Teacher_Class, "Object_Extranet_Teacher_Class;t_TestDrive_Member_Class_Teacher.uSchoolId;" + strUserId)["Data"] &&
                DataRef(objContext.props.Object_Extranet_Teacher_Teacher, "Object_Extranet_Teacher_Teacher;t_TestDrive_Member_Teacher_School.uSchoolId;" + strUserId + ";t_TestDrive_Member_Teacher_School.cIsDeleted;N")["Data"]) {
                let arrClasses = objContext.Class_ModuleProcessor.GetClassesForSchool(objContext, objContext.state.intActivationStatusToggleData, objContext.state.uTeacherId);
                let objClassData = objContext.Class_ModuleProcessor.GetClassDataFromApplicationState(objContext);
                if (objClassData === null || JSON.stringify(objClassData) === "{}") {
                    objContext.Class_ModuleProcessor.SetApplicationState(objContext, arrClasses[0]);
                }
                if (objContext.state.blnIsSaved) {
                    ApplicationState.SetProperty("blnShowAnimation", false);
                    objContext.dispatch({ type: "SET_STATE", payload: { "blnIsSaved": false } });
                }
                if (!objContext.state.isLoadComplete) {
                    objContext.dispatch({ type: "SET_STATE", payload: { "isLoadComplete": true } });
                }
                objContext.dispatch({ type: "SET_STATE", payload: { "arrClassGridData": arrClasses, "isNewRowAdded": false } });
            }
            else if (objContext.props.JConfiguration.ApplicationTypeId === "1" &&
                DataRef(objContext.props.Object_Extranet_Teacher_Class, "Object_Extranet_Teacher_Class;t_TestDrive_Member_Class_Teacher.uTeacherId;" + objContext.props.ClientUserDetails.UserId)["Data"]) {
                let arrClasses = objContext.Class_ModuleProcessor.GetClassesForTeacher(objContext, objContext.state.intActivationStatusToggleData);
                let strClassId = "";
                let objClassData = {};
                if (objContext.state.isNewRowAdded) {
                    strClassId = arrClasses[0]["uClassId"];
                    objContext.Class_ModuleProcessor.EditUserPreference(objContext, strClassId);
                    objClassData = arrClasses[0];
                }
                else {
                    strClassId = ApplicationState.GetProperty("SelectedClassId");
                    let arrClassData = arrClasses.filter(objClass => objClass.uClassId === strClassId);
                    if (arrClassData.length > 0) {
                        objClassData = arrClassData[0];
                    }
                }
                let objPreSelectedClassData = objContext.Class_ModuleProcessor.GetClassDataFromApplicationState(objContext);
                if (typeof objClassData === "undefined" || JSON.stringify(objClassData) === "{}") {
                    objContext.Class_ModuleProcessor.SetApplicationState(objContext, objContext.Class_ModuleProcessor.GetDefaultClass(objContext));
                }
                else if (objPreSelectedClassData === null || JSON.stringify(objPreSelectedClassData) === "{}" || objPreSelectedClassData["uClassId"] !== objClassData["uClassId"]) {
                    objContext.Class_ModuleProcessor.SetApplicationState(objContext, objClassData);
                }
                objContext.dispatch({ type: "SET_STATE", payload: { "arrClassGridData": arrClasses, "isNewRowAdded": false } });
                if (objContext.state.blnIsSaved) {
                    ApplicationState.SetProperty("blnShowAnimation", false);
                    objContext.dispatch({ type: "SET_STATE", payload: { "blnIsSaved": false } });
                }
                if (!objContext.state.isLoadComplete) {
                    objContext.dispatch({ type: "SET_STATE", payload: { "isLoadComplete": true } });
                }
            }
        }
    }, [
        objContext.props.Object_Extranet_Teacher_Teacher,
        objContext.props.Object_Extranet_Teacher_Class,
        objContext.props.Object_Extranet_Teacher_SchoolYear,
        objContext.props.Object_Extranet_Teacher_SchoolYearPeriod
    ]);
}

function useOnClassGridDataUpdate(objContext) {
    useEffect(() => {
        console.log("arrClassGridData", objContext.state.arrClassGridData);
        if (objContext.state.arrClassGridData.length == 0) {
            objContext.props.OnClassDataUpdate(false);
        } else {
            objContext.props.OnClassDataUpdate(true);
        }
    }, [objContext.state.arrClassGridData]);
}

function useOnClassDataUpdate(objContext) {
    useEffect(() => {
        if (objContext.state.isLoadComplete && objContext.state.blnIsSaved && objContext.props.JConfiguration.ApplicationTypeId == "1") {
            let strTeacherId = objContext.props.ClientUserDetails.UserId;
            let arrClassData = DataRef(objContext.props.Object_Extranet_Teacher_Class, "Object_Extranet_Teacher_Class;t_TestDrive_Member_Class_Teacher.uTeacherId;" + strTeacherId)["Data"]
            
            let arrNonDeletedClasses = arrClassData.filter(x =>
                x["t_TestDrive_Member_Class_Teacher"].filter(y =>
                    y["uTeacherId"] == strTeacherId &&
                    y["cIsDeleted"] == "N" &&
                    y["cIsCoTeacher"] == "N" &&
                    y["cIsSubjectExpert"] == "N"
                ).length > 0
            );
            let strClassFilter = "Object_Extranet_Teacher_Class;t_TestDrive_Member_Class_Teacher.uTeacherId;" + strTeacherId + ";t_TestDrive_Member_Class_Teacher.cIsDeleted;N";
            let objClassReturn = {
                Filter: strClassFilter,
                Value: {
                    Data: arrNonDeletedClasses,
                    TimeStamp: "0",
                    PrimaryKeyName: "uClassId",
                    Count: arrNonDeletedClasses.length
                }
            };
            if(DataRef(objContext.props.Object_Extranet_Teacher_Class, strClassFilter)["Data"]){
                ArcadixCacheData.EditData("Object_Extranet_Teacher_Class", objClassReturn, () => { });
            }else{
                ArcadixCacheData.AddData("Object_Extranet_Teacher_Class", objClassReturn, () => { });
            }            
        }
    }, [objContext.state.blnIsSaved]);
}