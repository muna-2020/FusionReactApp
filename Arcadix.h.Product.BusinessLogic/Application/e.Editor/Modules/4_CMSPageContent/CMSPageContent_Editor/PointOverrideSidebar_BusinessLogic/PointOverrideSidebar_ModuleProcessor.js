
//Base classes/hooks.
import EditorBase_ModuleProcessor from '@shared/Framework/BaseClass/EditorBaseClass/EditorBase_ModuleProcessor';

//Module Objects imports
import Object_Framework_Services_TextResource from '@shared/Object/a.Framework/Services/TextResource/TextResource';

//Helper classes/methods
import ObjectQueue from '@shared/Framework/DataService/ObjectQueue/ObjectQueue';

/**
 * @name PointOverrideSidebar_ModuleProcessor
 * @summary Contains the PointOverride module specific methods.
 * */
class PointOverrideSidebar_ModuleProcessor extends EditorBase_ModuleProcessor {

    /**
     * @name StoreMapList     
     * @summary Returns list of objects used in the module.
     * @return {Array} Array of object list.
     */
    static StoreMapList() {
        return ["Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/e.Editor/Modules/4_CMSPageContent/PointOverrideSidebar"];
    }

    /**
     * @name LoadInitialData
     * @param {object} objContext { props, state, dispatch, ["PointOverrideSidebar_ModuleProcessor"]}.
     * @summary Calls the Queue and Execute method.
     */
    LoadInitialData(objContext) {
        (new ObjectQueue()).QueueAndExecute(this.InitialDataParams(objContext.props));
    }

    /**
     * @name InitialDataParams
     * @param {object} props passes props.
     * @summary Get initial request params for the component.
     * @returns {Array} return arrDataRequest.
     */
    InitialDataParams(props) {
        let arrResourceParams = ["/e.Editor/Modules/4_CMSPageContent/PointOverrideSidebar"];
        Object_Framework_Services_TextResource.Initialize(arrResourceParams);
        let arrDataRequest = [Object_Framework_Services_TextResource];
        return arrDataRequest;
    }

    /**
     * @name OnInputChange
     * @param {object} objContext { props, state, dispatch, ["PointOverrideSidebar_ModuleProcessor"]}.
     * @param {string} strValue value entered.
     * @summary this update the entered correct point value to state.
     */
    OnInputChange(objContext, intValueId, strPointType, strValue) {
        if (!isNaN(strValue)) {
            if (strPointType === "NA" && objContext.state.Point.hasOwnProperty("NA")) {
                objContext.dispatch({
                    type: "SET_STATE",
                    payload: {
                        Point: {
                            ...objContext.state.Point,
                            "NA": strValue
                        }
                    }
                });
            } else {
                objContext.dispatch({
                    type: "SET_STATE",
                    payload: {
                        "Point": {
                            ...objContext.state.Point,
                            "Points": objContext.state.Point.Points.map(objPointTemp => {
                                if (objPointTemp.ValueId === intValueId)
                                    return { ...objPointTemp, [strPointType]: strValue };
                                else
                                    return objPointTemp
                            })
                        }
                    }
                });
            }
        }
    }

    /**
     * @name OnInputChange_Single
     * @param {any} objContext
     * @param {any} strPointType
     * @param {string} strValue value entered.
     * @summary 
     */
    OnInputChange_Single(objContext, strPointType, strValue) {
        if (!isNaN(strValue)) {
            objContext.dispatch({
                type: "SET_STATE",
                payload: {
                    "Point": {
                        ...objContext.state.Point,
                        [strPointType]: strValue
                    }
                }
            })
        }
    }

    /**
     * @name CheckError
     * @param {object} objContext { props, state, dispatch, ["PointOverrideSidebar_ModuleProcessor"]}.
     * @summary check for any error in any of the inputs.
     * @return {boolean} return true if no error else false.
     */
    CheckError(objContext) {
        return objContext.state.Error["dCorrectPoint"] === null
            && objContext.state.Error["dWrongPoint"] === null
            && objContext.state.Error["dNotAnsweredPoint"] === null;
    }

    /**
     * @name OnClickSave
     * @param {object} objContext { props, state, dispatch, ["PointOverrideSidebar_ModuleProcessor"]}.
     * @summary this method call the OverridePoints to update the points to element json.
     */
    OnClickSave(objContext) {
        objContext.props.PassedEvents.PointsOverride({ ...objContext.state.Point });
        objContext.props.HideSidebar();
    }

    /**
     * @name OnClickRemove
     * @param {object} objContext { props, state, dispatch, ["PointOverrideSidebar_ModuleProcessor"]}.
     * @summary calls RemovePointOverride
     */
    OnClickRemove(objContext) {
        objContext.props.PassedEvents.RemovePointOverride();
        objContext.props.HideSidebar();
    }

    /**
     * @name GetDynamicStyles
     * @param {object} props component props.
     * @summary this returns the styles for the SSR.
     */
    GetDynamicStyles(props) {
        return [
            props.JConfiguration.EditorSkinPath + "/Css/Application/ReactJs/PC/Modules/4_CMSPageContent/PointOverrideSidebar/PointOverrideSidebarStyles.css"
        ];
    }
}

export default PointOverrideSidebar_ModuleProcessor;
