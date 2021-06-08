/**
* @name GetInitialState
* @param {object} props Passes the props
* @summary Initializes the state
* @returns {object} initial state object
*/
export function GetInitialState(props) {
   
    return {
        strSelectedDate: props.Data && props.Data.SelectedDate ? props.Data.SelectedDate : new Date(),
        strminDate: props.Data && props.Data.MinDate ? props.Data.MinDate : "n/a",
        strmaxDate: props.Data && props.Data.MaxDate ? props.Data.MaxDate : "n/a" 
    };
}