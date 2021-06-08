//React imports 
import { useEffect } from 'react';

/**
 * @name GetInitialState
 * @summary returns initial state
 * @returns {Object}
 * */
export function GetInitialState() {
    return {
        isLoadComplete: false,
        objCycle: undefined,
        objState: undefined,
        objSchool: undefined,
        objTeacher: undefined,
        objClass: undefined,
        objPupil: undefined
    };
}

/**
 * @name Initialize
 * @summary Initializing the hooks.
 * @param {any} objContext
 */
export function Initialize(objContext) {
    useDataLoader(objContext);
    useDataLoaded(objContext);
    useSchoolDataLoader(objContext);
    useTeacherDataLoader(objContext);
    useClassDataLoader(objContext);
    usePupilDataLoader(objContext);
}

/**
 * @name useDataLoader
 * @summary Custom hook which is to make data call when component loaded.
 * @param {any} objContext
 */
export function useDataLoader(objContext) {
    useEffect(() => {
        objContext.MoveResults_ModuleProcessor.LoadInitialData(objContext);
    }, []);
}

/**
 * @name useSchoolDataLoader
 * @summary loads the school data after state changes.
 * @param {any} objContext
 */
export function useSchoolDataLoader(objContext) {
    useEffect(() => {
        if (objContext.state.isLoadComplete) {
            objContext.MoveResults_ModuleProcessor.GetSchoolData(objContext);
        }
    }, [objContext.state.objState])
}

/**
 * @name useTeacherDataLoader
 * @summary loads the teacher data after school changes.
 * @param {any} objContext
 */
export function useTeacherDataLoader(objContext) {
    useEffect(() => {
        if (objContext.state.isLoadComplete && objContext.state.objSchool) {
            objContext.MoveResults_ModuleProcessor.GetTeacherData(objContext);
        }
    }, [objContext.state.objSchool])
}

/**
 * @name useClassDataLoader
 * @summary loads the class data after teacher changes.
 * @param {any} objContext
 */
export function useClassDataLoader(objContext) {
    useEffect(() => {
        if (objContext.state.isLoadComplete && objContext.state.objTeacher) {
            objContext.MoveResults_ModuleProcessor.GetClassData(objContext);
        }
    }, [objContext.state.objTeacher])
}

/**
 * @name usePupilDataLoader
 * @summary loads the pupil data after class changes.
 * @param {any} objContext
 */
export function usePupilDataLoader(objContext) {
    useEffect(() => {
        if (objContext.state.isLoadComplete && objContext.state.objClass) {
            objContext.MoveResults_ModuleProcessor.GetPupilData(objContext);
        }
    }, [objContext.state.objClass])
}

/**
 * @name useDataLoaded
 * @param {*} objContext 
 * @summary   Checks if the data is loaded to props and then set the component state accordingly.
 */
export function useDataLoaded(objContext) {
    useEffect(() => {
        if (!objContext.state.isLoadComplete &&
            !objContext.props.Data.IsOrientationTest || DataRef(objContext.props.Object_Intranet_Cycle_Cycle, "Object_Intranet_Cycle_Cycle;cIsActive;Y;cIsDeleted;N;iCycleTypeId;" + objContext.MoveResults_ModuleProcessor.strOrientaionCycleTypeId) &&
            objContext.props.Data.IsOrientationTest || DataRef(objContext.props.Object_Intranet_Cycle_Cycle, "Object_Intranet_Cycle_Cycle;cIsActive;Y;cIsDeleted;N;iCycleTypeId;" + objContext.MoveResults_ModuleProcessor.strHighStakeCycleTypeId)) {
            objContext.dispatch({ type: 'SET_STATE', payload: { isLoadComplete: true } })
        }
    }, [objContext.props.Object_Intranet_Cycle_Cycle, objContext.props.Object_Extranet_State_State]);
}