import { useEffect } from 'react';

/**
 * 
 * @param {*} state 
 * @summary   maps entity/application state to props of the component.
 */
export function mapStateToProps(state) {
    if (!global["mode"]) {
        //Logger.Log("Mapping Pupil");
        return {
            textresource: DataRef(state.Entity, "textresource", true)
        };
    }
    else {
        //Logger.Log("not mapping pupil");
        return {};
    }
};

/**
 * 
 * @param {*} objContext 
 * @summary   Checks if the data(text resource, grid config, class group, gender) is loaded to props and then set the component state accordingly.
 */
export function useDataLoaded(objContext) {
    useEffect(() => {
        if (DataRef(objContext.props.textresource, "textresource;id;" + objContext.props.JConfiguration.LanguageCultureInfo + "/d.extranet/2_school/modules/classandpupil/pupil")) {
            ApplicationState.SetProperty("blnShowAnimation", false);
            if (!objContext.state.isLoadComplete) {
                objContext.dispatch({ type: "DATA_LOAD_COMPLETE", payload: true });
            }
        }
    }, [objContext.props.textresource]);
}



