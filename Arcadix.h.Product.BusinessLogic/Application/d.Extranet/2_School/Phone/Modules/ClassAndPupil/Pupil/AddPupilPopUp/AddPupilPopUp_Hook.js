//React related imports.
import { useEffect } from 'react';

//Objects required for module.
import Object_Extranet_Pupil_Pupil from '@shared/Object/d.Extranet/4_Pupil/Pupil/Pupil';

/**
 * @name GetInitialState
 * @summary Initializes the state
 * @returns {object} Initial state object
 */
export function GetInitialState(props) {
    return {
        isClassChanged: false,
        isInitialLoadComplete: false,
        arrPupilDisplayData: [],
        arrAllPupilDisplayData: [],
        isFirstNameAscending: true,
        isNameAscending: true,
        strSearchName: '',
        strSearchFirstName: '',
        showNameSearchIcon: true,
        showFirstNameSearchIcon: true,
        strSelectedAllPupilName: '',
        showValidationMessage: false
    };
}

/**
 * @name Initialize
 * @param {object} objContext Passes Context Object
 * @summary Initialize the custom hooks for loading the data 
 */
export function Initialize(objContext) {
    useDataLoader(objContext);
    useDataLoaderForClassChange(objContext);
}

/**
 * @name useDataLoader
 * @param {object} objContext objContext
 * @summary   Gets the InitialDataParams and passes them as a parameter to the DataCall method.
 */
export function useDataLoader(objContext) {
    useEffect(() => {        
        objContext.AddPupilPopUp_ModuleProcessor.LoadInitialData(objContext);
    }, []);
}

/**
 * @name useDataLoaderForClassChange
 * @param {*} objContext objContext
 * @summary
 */
export function useDataLoaderForClassChange(objContext) {
    useEffect(() => {
        if (objContext.state.isClassChanged) {
            let strClassId = objContext.state.objSelClass["uClassId"];
            let objPupilParams = {
                "ForeignKeyFilter": {
                    "t_TestDrive_Member_Class_Pupil.uClassId": strClassId,
                    "Type": "nested"
                }
            };
            Object_Extranet_Pupil_Pupil.GetData(objPupilParams, () => { });
        }

    }, [objContext.state.objSelClass]);
}
