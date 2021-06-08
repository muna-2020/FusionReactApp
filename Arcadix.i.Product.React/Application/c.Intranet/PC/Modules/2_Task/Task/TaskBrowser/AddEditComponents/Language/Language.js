// React related imports.
import React, { useImperativeHandle, forwardRef, useReducer } from 'react';

//Base classes.
import Base_AddEditTaskMaster_ModuleProcessor from '@shared/Application/c.Intranet/Modules/2_Task/Task/TaskBrowser/TaskMaster/Base_AddEditTaskMaster/Base_AddEditTaskMaster_ModuleProcessor';

/**
 * @name Language
 * @param {object} props props
 * @summary This component is used for Language in Add/EditTask.
 * @returns {object} React.Fragement that contains the content to be added in popup required for add/edit.
 */
const Language = (props, ref) => {

    /**
    * @name GetInitialState
    * @param {object} props 
    * @summary Forms the Initial state for component.
    * @returns {object} jsx, React.Fragment
    */
    const GetInitialState = (props) => {
        return {
            objData: {
                "t_CMS_Page_Language": props.Data.IsEdit ? (props.Data.DisplayData["t_CMS_Page_Language"] ? props.Data.DisplayData["t_CMS_Page_Language"] : [{ "iLanguageId": parseInt(props.Resource.JConfiguration.InterfaceLanguageId) }] ): [{"iLanguageId": parseInt(props.Resource.JConfiguration.InterfaceLanguageId) }]
            }           
        }

            //objData: props.Data.IsEdit ? props.Data.DisplayData : {
            //    "t_CMS_Page_Language": [
            //        {
            //            "iLanguageId": parseInt(props.Resource.JConfiguration.InterfaceLanguageId)
            //        }
            //    ]}           
    };    

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
        let objLanguages = {};
        props.Data.LanguageData.map(objLanguageData => {
            objLanguages = { ...objLanguages, [objLanguageData.iFrameworkLanguageId]: objLanguageData.vLanguageCultureInfo }
        });
        let jsxLanguageCheckBoxDivs = props.Data.MultiLanguageData.map(objMultiLanguageData => {

            return <div className="checkbox-block">
                        <label className="checkbox">
                           <input type="checkbox"
                                  checked={objContext.Base_AddEditTaskMaster_ModuleProcessor.IsLanguageAdded(objMultiLanguageData.iLanguageId, objContext)}
                                  name="" id=""
                                  onChange={() => objContext.Base_AddEditTaskMaster_ModuleProcessor.HandleCheckBoxClick(objMultiLanguageData.iLanguageId, objContext)}
                            />
                           <span className="checkmark"></span>
                       </label>
                       <span>{objLanguages[objMultiLanguageData.iLanguageId]}</span>
            </div>
        })
        let LanguageDiv = <div style={{ display: ( props.Events.IsShowLanguageDiv() ? "block" : "none")}}>
                            <div className="title mt-20">
                                {Localization.TextFormatter(props.Resource.Text, "Languages")}
                            </div>
                            <div className="checkbox-flex">
                                {jsxLanguageCheckBoxDivs}
                            </div>
                          </div>
        return LanguageDiv;
    }

    return (
        GetContent()
    )
}

export default forwardRef(Language);
