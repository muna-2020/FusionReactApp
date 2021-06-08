// React related imports.
import React, { useImperativeHandle, forwardRef, useReducer, useEffect } from 'react';

//Module Related Files.
import Base_AddEditTestMaster_ModuleProcessor from '@shared/Application/c.Intranet/Modules/3_Test/Test/TestBrowser/TestMaster/Base_AddEditTestMaster/Base_AddEditTestMaster_ModuleProcessor';

/**
 * @name Language
 * @param {object} props props
 * @summary This component is used for Language in Add/EditTest.
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
                "t_TestDrive_Test_Language": props.Data.IsEdit ? props.Data.DisplayData["t_TestDrive_Test_Language"] :[ { "iLanguageId": parseInt(props.Resource.JConfiguration.InterfaceLanguageId), "cIsActivatedForTest": "N" } ]
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
        let objLanguages = {};
                props.Data.LanguageData.map(objLanguageData => {
                    objLanguages = { ...objLanguages, [objLanguageData.iFrameworkLanguageId]: objLanguageData.vLanguageIdentifier }
                });
                let jsxLanguageCheckBoxDivs = props.Data.MultiLanguageData.map(objMainClientLanguageData => {

                    return <div className="checkbox-block">
                           <div className="checkbox-block">
                           <label className="checkbox">
                                <input type="checkbox"
                                    checked={objContext.Base_AddEditTestMaster_ModuleProcessor.IsLanguageAdded(objMainClientLanguageData.iLanguageId, false, objContext)}
                                    name="" id=""
                                    onChange={() => objContext.Base_AddEditTestMaster_ModuleProcessor.HandleLanguageCheckBoxClick(objMainClientLanguageData.iLanguageId, false, false, objContext)} />
                               <span className="checkmark"></span>
                               </label>
                               <span>{objLanguages[objMainClientLanguageData.iLanguageId]}</span>
                           </div>

                           <div className="ml-10 checkbox-block">
                               <span>[ </span>
                               <label className="checkbox">
                                <input type="checkbox" name="" id=""
                                    checked={objContext.Base_AddEditTestMaster_ModuleProcessor.IsLanguageAdded(objMainClientLanguageData.iLanguageId, true, objContext)}
                                    disabled={objContext.Base_AddEditTestMaster_ModuleProcessor.IsLanguageAdded(objMainClientLanguageData.iLanguageId, false, objContext) ? false : true}
                                    onChange={(e) => {
                                        objContext.Base_AddEditTestMaster_ModuleProcessor.HandleLanguageCheckBoxClick(objMainClientLanguageData.iLanguageId, true, e.target.checked ? true : false, objContext)
                                    }
                                        }
                                    />
                                    <span className="checkmark"></span>
                                </label>
                                <span className="nowrap">{Localization.TextFormatter(objTextResource, "ActiveForTest")}</span>
                                <span> ]</span>
                           </div>

                    </div>  
                })
                let LanguageDiv = <div style={{ display: (objContext.Base_AddEditTestMaster_ModuleProcessor.IsShowLanguageDiv(objContext) ? "block" : "none")}}>
                                    <div className="title mt-20">
                                        {Localization.TextFormatter(props.Resource.Text, "Languages")}
                                    </div>
                                    <div className="checkbox-flex">
                                        {jsxLanguageCheckBoxDivs}
                                    </div>
                                  </div>
                return LanguageDiv;

                {
                        //return <div>

                          //  <div className="col col-1">
                             //   <div className="title">{Localization.TextFormatter(objTextResource, "Languages")}</div>
                           // </div>

                            //{GetLanguage()}
                        //</div>
                }
    }    

    return (
        GetContent()
    );
};

export default forwardRef(Language);