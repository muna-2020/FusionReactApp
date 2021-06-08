// React related imports.
import React, { useReducer } from 'react';


//Module related fies.
import * as AddEditTestFolder_Hook from '@shared/Application/c.Intranet/Modules/3_Test/TestFolder/AddEditTestFolder/AddEditTestFolder_Hook';
import AddEditTestFolder_ModuleProcessor from '@shared/Application/c.Intranet/Modules/3_Test/TestFolder/AddEditTestFolder/AddEditTestFolder_ModuleProcessor';

/**
 * @name AddEditTestFolder
 * @param {object} props props
 * @summary This component is used to Add/Edit the TestFolder data.
 * @returns {object} React.Fragement that contains the content to be added in popup required for add/edit.
 */
const AddEditTestFolder = (props)=> {

    /**
    * @name [state,dispatch]
    * @summary Define state and dispatch for the reducer to set state.
    * @returns {[]} state and dispatch
    */
    const [state, dispatch] = useReducer(IntranetBase_Hook.Reducer, AddEditTestFolder_Hook.GetInitialState(props));

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     * @returns {object} objContext
     */
    let objContext = { state, props, dispatch, "AddEditTestFolder_ModuleProcessor": new AddEditTestFolder_ModuleProcessor() };

    /**
      * @name Initialize
      * @param {object} objContext context object
      * @summary Initialize method call in AddEditTestFolder_Hook, that contains all the custom hooks.
      * @returns null
      */
    AddEditTestFolder_Hook.Initialize(objContext);

    let objTextResource = props.Resource.Text; 

    /**
     * @name GetLanguage
     * @summary Forms the whole jsx required for the Language.
     * @returns {object} jsx, React.Fragment
     */
    const GetLanguage = () => {
        let objLanguages = {};
        props.Data.LanguageData.map(objLanguageData => {
            objLanguages = { ...objLanguages, [objLanguageData.iFrameworkLanguageId]: objLanguageData.vLanguageCultureInfo }
        });
        let jsxLanguageCheckBoxDivs = props.Data.MultiLanguageData.map(objMultiLanguageData => {

            return <div className="checkbox-block">
                <label className="checkbox">
                    <input type="checkbox"
                        checked={objContext.AddEditTestFolder_ModuleProcessor.IsLanguageAdded(objMultiLanguageData.iLanguageId, objContext)}
                        name="" id=""
                        onChange={() => objContext.AddEditTestFolder_ModuleProcessor.HandleCheckBoxClick(objMultiLanguageData.iLanguageId, objContext)} />
                    <span className="checkmark"></span>
                </label>
                <span>{objLanguages[objMultiLanguageData.iLanguageId]}</span>
            </div>
        })
        let LanguageDiv = <div >
            <div className="title mt-20">
                {Localization.TextFormatter(props.Resource.Text, "Languages")}
            </div>
            <div className="checkbox-flex">
                {jsxLanguageCheckBoxDivs}
            </div>
        </div>
        return LanguageDiv;
    }

    /**
    * @name GetContent
    * @summary Forms the whole jsx required for the module.
    * @returns {object} jsx, React.Fragment
    */
    const GetContent = ()=>{
    
        return <div id="TestFolder" className="task-tabcontent">          
                    <div className="title">{Localization.TextFormatter(objTextResource, 'BaseData')}</div>

                    <div className="col col-1">
                        <div className="col-item">
                            <div className="row-left">
                                <span>{Localization.TextFormatter(objTextResource, 'Name')}</span>
                            </div>
                            <div className="row-right">
                                <input
                                    id="vTestFolderName"
                                    className="text-input"
                                    value={state.objData.vTestFolderName}
                                    onChange={e => {
                                        objContext.AddEditTestFolder_ModuleProcessor.HandleChange(
                                        "vTestFolderName",
                                        e.target.value,
                                        objContext
                                    );
                                    }}
                                />
                            </div>
                        </div>       
                    </div>
                    {
                        objContext.props.Data.objRowData.iTestFolderId == 0 || (objContext.props.Data.objRowData.iTestParentFolderId == 0 && objContext.props.Data.IsEdit) ?
                            <div className="col col-1">
                                <div className="col-item">
                                    <div className="row-left">
                                        <span>{Localization.TextFormatter(objTextResource, 'Test')}</span>
                                    </div>
                                    <div className="row-right">
                                        <label className="checkbox">
                                            <input type="checkbox" name="" id="cIsForInternalTesting"
                                                checked={state.objData["cIsForInternalTesting"] && state.objData["cIsForInternalTesting"].toUpperCase() === "Y" ? true : false}
                                                onChange={(e) => {
                                                    objContext.AddEditTestFolder_ModuleProcessor.HandleChange("cIsForInternalTesting", e.target.checked ? "Y" : "N", objContext);
                                                }}
                                            />
                                            <span className="checkmark"></span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            :
                            <React.Fragment />
                    }

                    <div className="col col-1">
                            <div className="title">{Localization.TextFormatter(objTextResource, 'Description')}</div>
                    </div>
      
                    <div className="col col-1">
                            <textarea
                                id="vTestFolderDescription"
                                className="textarea"
                                rows="4"
                                style={{ width: "100%" }}
                                value={state.objData.vTestFolderDescription}
                                onChange={e => {
                                    objContext.AddEditTestFolder_ModuleProcessor.HandleChange(
                                        "vTestFolderDescription",
                                        e.target.value,
                                        objContext
                                    );
                                }}
                            />
                    </div>

                    {props.Data.MultiLanguageData && props.Data.MultiLanguageData.length > 1 ? GetLanguage() : <React.Fragment />}

                    <div id="ValidationError" />
        </div>
    };

    return (
      GetContent() 
    );
};

export default AddEditTestFolder;
