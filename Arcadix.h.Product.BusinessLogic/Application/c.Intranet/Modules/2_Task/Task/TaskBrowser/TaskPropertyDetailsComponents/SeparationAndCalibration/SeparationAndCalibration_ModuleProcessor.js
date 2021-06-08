//Base classes.
import IntranetBase_ModuleProcessor from '@shared/Framework/BaseClass/IntranetBaseClass/IntranetBase_ModuleProcessor';

//Objects required for module.
import Object_Intranet_Test_SeparationAndCalibrationTask from '@shared/Object/c.Intranet/3_Test/Test/SeparationAndCalibration/SeparationAndCalibrationTask/SeparationAndCalibrationTask'
import Object_Intranet_Test_SeparationAndCalibrationGroup from '@shared/Object/c.Intranet/3_Test/Test/SeparationAndCalibration/SeparationAndCalibrationGroup/SeparationAndCalibrationGroup'
import Object_Intranet_Test_InputStatus from '@shared/Object/c.Intranet/3_Test/Test/SeparationAndCalibration/InputStatus/InputStatus'

/**
* @name SeparationAndCalibration_ModuleProcessor
* @summary Class for Task module display.
*/
class SeparationAndCalibration_ModuleProcessor extends IntranetBase_ModuleProcessor {

    /**
     * @name StoreMapList     
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static StoreMapList() {
        return [
            "Object_Intranet_Test_SeparationAndCalibrationTask",
            "Object_Intranet_Test_SeparationAndCalibrationGroup",
            "Object_Intranet_Test_InputStatus"
        ];
    }

    /**
     * @name LoadInitialData
     * @param {object} objContext passes Context object
     * @summary Calls the Queue and Execute method
     */
    LoadInitialData(objContext) {
        new ObjectQueue().QueueAndExecute(this.InitialDataParams(objContext.props));
    }

    /**
     * @name InitialDataParams
     * @param {object} props passes props
     * @summary Get initial request params for the component.
     * @returns {object} return objDataCalls
     */
    InitialDataParams(props) {

        let arrDataRequest = [];

        //SeparationAndCalibrationTask
        Object_Intranet_Test_SeparationAndCalibrationTask.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Intranet_Test_SeparationAndCalibrationTask];

        //SeparationAndCalibrationTask
        Object_Intranet_Test_SeparationAndCalibrationGroup.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Intranet_Test_SeparationAndCalibrationGroup];

        //InputStatus
        Object_Intranet_Test_InputStatus.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Intranet_Test_InputStatus];

        return arrDataRequest;
    }

    /**
     * @name SeparationAndCalibrationTaskDetails
     * @param {object} objSelectedRow SelectedRow
     * @param {object} objContext objContext
     * @summary Gets the property details to be displayed on TaskDisplayProperties
     */
    SeparationAndCalibrationTaskDetails(objSelectedRow, objContext) {  
        //Separation And Calibration details
        let arrSeparationAndCalibrationTaskDetails = [];
        if (objSelectedRow["iTaskTypeId"] == 1 && objSelectedRow["iTaskUsageId"] == 3 && objSelectedRow["cIsAdaptiveTask"] == 'Y') {
            arrSeparationAndCalibrationTaskDetails = DataRef(objContext.props.Object_Intranet_Test_SeparationAndCalibrationTask)["Data"]
                .filter(objSepTask => objSepTask["iTaskId"] == objSelectedRow["iPageId"])
                .map(objTask => {
                    let objGroup = DataRef(objContext.props.Object_Intranet_Test_SeparationAndCalibrationGroup)["Data"].find(obj => obj["uSeparationAndCalibrationGroupId"] == objTask["uSeparationAndCalibrationGroupId"]);
                    let strGroupName = objGroup ? objGroup.t_TestDrive_SeparationAndCalibration_Group_Data.find(objData => objData["iLanguageId"] == JConfiguration.InterfaceLanguageId)["vGroupName"] : "";
                    let objInputStatus = DataRef(objContext.props.Object_Intranet_Test_InputStatus)["Data"].find(obj => obj["iInputStatusId"] == objTask["iInputStatusId"]);
                    let strInputStatusName = objInputStatus ? objInputStatus.t_TestDrive_InputStatus_Data.find(objData => objData["iLanguageId"] == JConfiguration.InterfaceLanguageId)["vInputStatusName"] : "";

                    return {
                        ...objTask,
                        ["GroupName"]: strGroupName,
                        ["InputStatusName"]: strInputStatusName
                    }
                });
            if (arrSeparationAndCalibrationTaskDetails.length == 0)
                arrSeparationAndCalibrationTaskDetails = [{ "NotAssigned": true }]
        }

        return arrSeparationAndCalibrationTaskDetails;
    }
}

export default SeparationAndCalibration_ModuleProcessor;