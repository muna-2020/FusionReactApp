// React related imports.
import React, { useImperativeHandle, forwardRef, useReducer } from 'react';

//Module Related Files.
import Base_AddEditTestMaster_ModuleProcessor from '@shared/Application/c.Intranet/Modules/3_Test/Test/TestBrowser/TestMaster/Base_AddEditTestMaster/Base_AddEditTestMaster_ModuleProcessor';

/**
 * @name Description
 * @param {object} props props
 * @summary This component is used for Description in Add/EditTest.
 * @returns {object} React.Fragement that contains the content to be added in popup required for add/edit.
 */
const Description = (props, ref) => {

    /**
     * @name GetInitialState
     * @param {object} props 
     * @summary Forms the Initial state for component.
     * @returns {object} jsx, React.Fragment
     */
    const GetInitialState = (props) => {
        return {
            objData: {                
                "vTestDescription": props.Data.IsEdit ? props.Data.DisplayData["vTestDescription"] : ""
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
    let objContext = { state, props, dispatch, "Base_AddEditTestMaster_ModuleProcessor": new Base_AddEditTestMaster_ModuleProcessor() };   

    /**
     * @name useImperativeHandle
     * @param {object} objContext  objContext
     * @summary Setting up imperative handle
     */
    useImperativeHandle(ref, () => ({
        GetSaveData: () => {
            return state.objData
        }
    }), [state, props]);

    let objTextResource = props.Resource.Text;

    /**
     * @name GetContent
     * @summary Forms the whole jsx required for the component.
     * @returns {object} jsx, React.Fragment
     */
    const GetContent = () => {

        return <React.Fragment>
                    <div className="title">{Localization.TextFormatter(objTextResource, "Description")}</div>
                    
                    <div className="col col-1">
                        <textarea
                            id="vTestDescription"
                            className="textarea"
                            rows="4"
                            style={{ width: "100%" }}
                            value={state.objData.vTestDescription}
                            onChange={e => {
                                objContext.Base_AddEditTestMaster_ModuleProcessor.HandleChange("vTestDescription", e.target.value, objContext);
                            }}
                        />
                    </div>  
        </React.Fragment>
    }

    return (
        GetContent()
    );
};

export default forwardRef(Description);