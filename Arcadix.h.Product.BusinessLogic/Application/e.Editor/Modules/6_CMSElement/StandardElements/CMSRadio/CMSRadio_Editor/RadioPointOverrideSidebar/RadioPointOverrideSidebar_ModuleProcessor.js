
//Base classes/hooks.
import EditorBase_ModuleProcessor from '@shared/Framework/BaseClass/EditorBaseClass/EditorBase_ModuleProcessor';

//Module Objects imports
import Object_Framework_Services_TextResource from '@shared/Object/a.Framework/Services/TextResource/TextResource';

//Helper classes/methods
import ObjectQueue from '@shared/Framework/DataService/ObjectQueue/ObjectQueue';

/**
 * @name RadioPointOverrideSidebar_ModuleProcessor
 * @summary Contains the PointOverride module specific methods.
 * */
class RadioPointOverrideSidebar_ModuleProcessor extends EditorBase_ModuleProcessor {

    /**
     * @name StoreMapList     
     * @summary Returns list of objects used in the module.
     * @return {Array} Array of object list.
     */
    static StoreMapList() {
        return ["Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/e.Editor/Modules/6_CMSElement/CMSRadio/RadioPointOverrideSidebar"];
    }

    /**
     * @name LoadInitialData
     * @param {object} objContext { props, state, dispatch, ["RadioPointOverrideSidebar_ModuleProcessor"]}.
     * @summary Calls the Queue and Execute method.
     */
    LoadInitialData(objContext) {
        new ObjectQueue().QueueAndExecute(this.InitialDataParams(objContext.props));
    }

    /**
     * @name InitialDataParams
     * @param {object} props passes props.
     * @summary Get initial request params for the component.
     * @returns {Array} return arrDataRequest.
     */
    InitialDataParams(props) {
        let arrResourceParams = ["/e.Editor/Modules/6_CMSElement/CMSRadio/RadioPointOverrideSidebar"];
        Object_Framework_Services_TextResource.Initialize(arrResourceParams);
        let arrDataRequest = [Object_Framework_Services_TextResource];
        return arrDataRequest;
    }

    /**
     * @name OnCAChange
     * @param {object} objContext context object
     * @param {string} strValue correct answer input value.
     * @summary update the state value from input.
     */
    OnCANAPointChange(objContext, strValue, strField) {
        objContext.dispatch({
            type: "SET_STATE",
            payload: {
                "Point": {
                    ...objContext.state.Point,
                    [strField]: strValue
                }
            }
        });
    }

    /**
     * @name OnWAChange
     * @param {object} objContext { props, state, dispatch, ["RadioPointOverrideSidebar_ModuleProcessor"]}.
     * @param {string} strValueId Value Id.
     * @param {string} strValue not answered input value.
     * @summary update the state value from input.
     */
    OnWAChange(objContext, strValueId, strValue) {
        objContext.dispatch({
            type: "SET_STATE",
            payload: {
                Point: {
                    ...objContext.state.Point,
                    ["Points"]: [...objContext.state.Point.Points.map(objTempPoint => {
                        if (objTempPoint.ValueId === strValueId) {
                            return {
                                ...objTempPoint,
                                "WA": strValue
                            };
                        }
                        else {
                            return objTempPoint;
                        }
                    })]
                }
            }
        });
    }

    /**
     * @name OnClickSave
     * @param {object} objContext { props, state, dispatch, ["RadioPointOverrideSidebar_ModuleProcessor"]}.
     * @summary this method call the OverridePoints to update the points to element json.
     */
    OnClickSave(objContext) {
        objContext.props.PassedEvents.PointsOverride({ ...objContext.state.Point });
        objContext.props.HideSidebar();
    }

    /**
     * @name OnClickRemove
     * @param {object} objContext { props, state, dispatch, ["RadioPointOverrideSidebar_ModuleProcessor"]}.
     * @summary this method call the OverridePoints to update the points to element json.
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
            props.JConfiguration.EditorSkinPath + "/Css/Application/ReactJs/PC/Modules/6_CMSElement/CMSRadio/RadioPointOverrideSidebar/RadioPointOverrideSidebarStyles.css"
        ];
    }
}

export default RadioPointOverrideSidebar_ModuleProcessor;
