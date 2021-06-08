// React related imports.
import React, { useImperativeHandle, forwardRef, useReducer, useEffect } from 'react';

//Base classes.
import Base_AddEditTaskMaster_ModuleProcessor from '@shared/Application/c.Intranet/Modules/2_Task/Task/TaskBrowser/TaskMaster/Base_AddEditTaskMaster/Base_AddEditTaskMaster_ModuleProcessor';

/**
 * @name DevelopmentHistoryBasicProperties
 * @param {object} props props
 * @summary This component is used for DevelopmentHistoryBasicProperties in Add/EditTask.
 * @returns {object} React.Fragement that contains the content to be added in popup required for add/edit.
 */
const DevelopmentHistoryBasicProperties = (props, ref) => {

    /**
     * @name GetInitialState
     * @param {object} props 
     * @summary Forms the Initial state for component.
     * @returns {object} jsx, React.Fragment
     */
    const GetInitialState = (props) => {
        return {
            objData: {
                "vSource": props.Data.IsEdit ? props.Data.DisplayData["vSource"] : ""                
            }
        };
    }

    /**
    * @name [state,dispatch]
    * @summary Define state and dispatch for the reducer to set state.
    * @returns {[]} state and dispatch
    */
    const [state, dispatch] = useReducer(IntranetBase_Hook.Reducer, GetInitialState(props));

    /**
     * @name objContext
     * @summary Groups state, dispatch and module object(s) in objContext.
     * @returns {object} objContext
     */
    let objContext = { state, props, dispatch, "Base_AddEditTaskMaster_ModuleProcessor": new Base_AddEditTaskMaster_ModuleProcessor() };      

    useImperativeHandle(ref, () => ({
        GetSaveData: () => {
            return state.objData
        }
    }), [state, props]);

    /**
     * @name GetContent
     * @summary Forms the whole jsx required for the component.
     * @returns {object} jsx, React.Fragment
     */
    const GetContent = () => {

        return <div>
            <div className="col col-1">
                <div className="title">{Localization.TextFormatter(props.Resource.Text, "DevelopmentHistory")}</div>
            </div>
            <div className="col col-2">
                <div className="col-item">
                    <div className="row-left">
                    <span>{Localization.TextFormatter(props.Resource.Text, "Source")}</span>
                    </div>
                    <div className="row-right">
                        <input
                            id="vSource"
                            className="text-input"
                            value={state.objData.vSource}
                            onChange={e => {
                                objContext.Base_AddEditTaskMaster_ModuleProcessor.HandleChange("vSource", e.target.value, objContext)
                            }}
                            onKeyDown={(e) => objContext.props.Events.OnKeyDown(e)}
                        />
                    </div>
                </div>
            </div>
        </div>
    }

    return (
        GetContent()
    )
}

export default forwardRef(DevelopmentHistoryBasicProperties);
