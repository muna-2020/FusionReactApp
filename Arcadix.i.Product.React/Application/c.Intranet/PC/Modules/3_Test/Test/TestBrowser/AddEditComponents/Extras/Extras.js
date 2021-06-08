// React related imports.
import React, { useImperativeHandle, forwardRef, useReducer } from 'react';

//Module Related Files.
import Base_AddEditTestMaster_ModuleProcessor from '@shared/Application/c.Intranet/Modules/3_Test/Test/TestBrowser/TestMaster/Base_AddEditTestMaster/Base_AddEditTestMaster_ModuleProcessor';
import * as Extras_MetaData from '@shared/Application/c.Intranet/Modules/3_Test/Test/TestBrowser/AddEditComponents/Extras/Extras_MetaData';

/**
 * @name Extras
 * @param {object} props props
 * @summary This component is used for Extras in Add/EditTest.
 * @returns {object} React.Fragement that contains the content to be added in popup required for add/edit.
 */
const Extras = (props, ref) => {

    /**
     * @name GetInitialState
     * @param {object} props 
     * @summary Forms the Initial state for component.
     * @returns {object} jsx, React.Fragment
     */
    const GetInitialState = (props) => {
        return {
            objData: {
                "dPrice": props.Data.IsEdit ? props.Data.DisplayData["dPrice"] : null
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
    let arrExtrasMetaData = Extras_MetaData.GetExtrasMetaData()
    /**
     * @name GetContent
     * @summary Forms the whole jsx required for the component.
     * @returns {object} jsx, React.Fragment
     */
    const GetContent = () => {

        return <React.Fragment>
            <div className="title">{Localization.TextFormatter(objTextResource, "Extras")}</div>
            <div className="col col-2">
                <div className="col-item">
                    <div className="row-left">
                        <span>{Localization.TextFormatter(objTextResource, "Price")}</span>
                    </div>
                    <div className="row-right">
                        <input
                            id="dPrice"
                            className="text-input"
                            value={props.Data.DisplayData.dPrice}
                            onBlur={() => objContext.Base_AddEditTestMaster_ModuleProcessor.ValidateOnBlur("dPrice", arrExtrasMetaData, objContext)}
                            onChange={e => {
                                objContext.Base_AddEditTestMaster_ModuleProcessor.HandleChange("dPrice", e.target.value, objContext);
                            }}
                            onKeyDown={(e) => objContext.props.Events.OnKeyDown(e)}
                        />
                    </div>
                </div>
            </div>
        </React.Fragment>
    }

    return (
        GetContent()
    );
};

export default forwardRef(Extras);