//React related imports
import React, { useReducer, range, getYear } from 'react';
import DatePicker, { registerLocale, setDefaultLocale } from 'react-datepicker';

//Base classes.
import * as Base_Hook from '@shared/Framework/BaseClass/Base_Hook';
import * as DatePicker_Hook from '@shared/Framework/Controls/DatePicker/DatePicker_Hook';
import DatePicker_ComponentProcessor from '@shared/Framework/Controls/DatePicker/DatePicker_ComponentProcessor';

/**
 * @name DatePicker
 * @param {object} Props Props
 * @summary Forms the JSX for the DatePicker.
 * @returns {Jsx}
 */
const DatePickerWrapper = (props) => {

    /**
   * @name [state,dispatch]
   * @summary Define state and dispatch for the reducer to set state.
   * @returns {[]} state and dispatch
   */
    const [state, dispatch] = useReducer(Base_Hook.Reducer, DatePicker_Hook.GetInitialState(props));

    /**
    * @name objContext
    * @summary Groups state.dispatch and module object(s) in objContext.
    * @returns {object} objContext
    */
    let objContext = { state, props, dispatch, ["ModuleName"]: props.Id, ["DatePicker_ComponentProcessor"]: new DatePicker_ComponentProcessor()  };

    const GetContent = () => {
        //-----Forming the Locale from JConfig to be sent as props to DatePicker------
        const months = JConfiguration.Locale.DATETIME_FORMATS.MONTH;
        const days = JConfiguration.Locale.DATETIME_FORMATS.SHORTDAY;
        const locale = {
            localize: {
                month: n => months[n],
                day: n => days[n]
            },
            formatLong: {}
        }
        //----------------------------------------------------------------------------
        //var date = new Date();
        //date.setDate(date.getDate() - 4);
        //var maxDate = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
        //var Dates = date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate();


        return <DatePicker
            dateFormat={JConfiguration.Locale.DATETIME_FORMATS.DATEFORMAT}
            selected={state.strSelectedDate}
            onChange={strSelectedDate => { objContext.DatePicker_ComponentProcessor.OnChangeHandler(strSelectedDate, objContext) }}
            locale={locale}
            maxDate={state.strmaxDate}
            minDate={state.strminDate}
        />        
    };

    return GetContent();
}

export default DatePickerWrapper;