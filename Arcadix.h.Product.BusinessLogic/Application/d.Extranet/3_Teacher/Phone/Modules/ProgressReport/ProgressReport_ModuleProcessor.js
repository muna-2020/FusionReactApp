//Base class imports
import ProgressReport_ModuleProcessor_Browser from '@shared/Application/d.Extranet/3_Teacher/PC/Modules/ProgressReport/ProgressReport_ModuleProcessor';

/**
* @name ProgressReport_ModuleProcessor
* @summary Class for TimeTableSchedule module display and manipulate.
*/
class ProgressReport_ModuleProcessor extends ProgressReport_ModuleProcessor_Browser {

    /**
    * @name GetDynamicStlyes
    * @param {object} props props
    * @returns {object} DynamicStlyes
    */
    GetDynamicStyles(props) {
        return [
            props.JConfiguration.ExtranetSkinPath + "/Css/Application/3_Teacher/ReactJs/Phone/Modules/ProgressReport/ProgressReport.css"
        ];
    }

    SetDisplayResultIndex(objContext, intIndex) {
        objContext.dispatch({ type: "SET_STATE", payload: { blnDisplayResultIndex: intIndex  }});
    }
}

export default ProgressReport_ModuleProcessor;