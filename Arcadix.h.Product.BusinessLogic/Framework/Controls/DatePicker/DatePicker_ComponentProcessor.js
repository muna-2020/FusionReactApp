//Base classes.
import Base_ModuleProcessor from '@shared/Framework/BaseClass/Base_ModuleProcessor';

/**
* @name DatePicker_ComponentProcessor
* @summary Class for DatePicker.
*/
class DatePicker_ComponentProcessor extends Base_ModuleProcessor {

    OnChangeHandler(strSelectedDate, objContext) {
        objContext.dispatch({ type: "SET_STATE", payload: { strSelectedDate: strSelectedDate } });
        if (objContext.props.Events && objContext.props.Events.HandleDateChange) {
            objContext.props.Events.HandleDateChange(strSelectedDate);
        }
    }
}

export default DatePicker_ComponentProcessor;