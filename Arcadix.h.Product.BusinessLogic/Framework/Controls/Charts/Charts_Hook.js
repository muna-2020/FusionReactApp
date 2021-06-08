// React related impoprts.
import { useEffect } from 'react';

/**
 * @name Initialize
 * @param {object} objContext Context Object
 * @summary Initialize the custom hooks
 */
export function Initialize(objContext) {
    useChartLoader(objContext);
    useUpdateChartData(objContext);
}

/**
 * @name useChartLoader
 * @param {object} objContext takes objContext
 * @summary Calls the DataCall method and the InitialDataParams.
 */
export function useChartLoader(objContext) {
    useEffect(() => {
        objContext.dispatch({ type: "SET_STATE", payload: { chart: objContext.Charts_ComponentProcessor.GetChart(objContext) } })
    }, []);	
}

/**
 * @name useUpdateChartData
 * @param {object} objContext takes objContext
 * @summary Calls the DataCall method and the InitialDataParams.
 */
export function useUpdateChartData(objContext) {
    useEffect(() => {
        if (objContext.state.chart && objContext.state.chart.update) {
            objContext.state.chart.update(objContext.props.Data, objContext.props.Meta);
        }
    }, [objContext.props.Data]);
}