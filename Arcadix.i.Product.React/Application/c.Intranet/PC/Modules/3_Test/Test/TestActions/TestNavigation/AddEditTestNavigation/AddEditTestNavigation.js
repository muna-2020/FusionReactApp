// React related imports.
import React, { useReducer } from 'react';
import { connect } from 'react-redux';

//Module related fies.
import * as AddEditTestNavigation_Hook from '@shared/Application/c.Intranet/Modules/3_Test/Test/TestActions/TestNavigation/AddEditTestNavigation/AddEditTestNavigation_Hook';
import AddEditTestNavigation_ModuleProcessor from '@shared/Application/c.Intranet/Modules/3_Test/Test/TestActions/TestNavigation/AddEditTestNavigation/AddEditTestNavigation_ModuleProcessor';

/**
  * @name AddEditTestNavigation
  * @param {object} props props
  * @summary This component is used to Add/Edit the UseCase data.
  * @returns {object} React.Fragement that contains the content to be added in popup required for add/edit.
  */
const AddEditTestNavigation = props => {
    /**
      * @name [state,dispatch]
      * @summary Define state and dispatch for the reducer to set state.
      * @returns {[]} state and dspatch
      */
    const [state, dispatch] = useReducer(IntranetBase_Hook.Reducer, AddEditTestNavigation_Hook.GetInitialState());

    /**
      * @name objContext
      * @summary Groups state.dispatch and module object(s) in objContext.
      * @returns {object} objContext
      */
    let objContext = { state, props, dispatch, "AddEditTestNavigation_ModuleProcessor": new AddEditTestNavigation_ModuleProcessor(), ["Object_Framework_Services_TextResource"]: Object_Framework_Services_TextResource };

    /**
      * @name Initialize
      * @param {object} objContext context object
      * @summary Initialize method call in AddEditTestNavigation_Hook, that contains all the custom hooks.
      * @returns null
      */
    AddEditTestNavigation_Hook.Initialize(objContext);

    let objTextResource = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/3_Test/Test/TestActions/TestNavigation", props);
    /**
  * @name GetContent
  * @summary Forms the whole jsx required for the module.
  * @returns {object} jsx, React.Fragment
  */
    const GetContent = () => {

        return <div>
            <div id="UseCase" className="tabcontent subject-management">
                <div className="title">
                    {Localization.TextFormatter(objTextResource, 'TestNavigation')}
                </div>

                <div className="col col-2">
                    <div className="col-item">
                        <div className="row-left">
                            <span> {Localization.TextFormatter(objTextResource, 'TestNavigation')}</span>
                        </div>
                        <div className="row-right">
                            <MultiLanguageInputs
                                Meta={{
                                    ValueColumn: "uTestNavigationId",
                                    DependingTableName: "t_TestDrive_Test_Navigation_Data",
                                    DisplayColumn: "vNavigationName"
                                }}
                                Data={{
                                    DisplayData: state.objData,
                                    MultiLanguageData: props.Data.MultiLanguageData
                                }}
                                Events={{
                                    OnChange: (e, objLanguage) => {
                                        objContext.AddEditTestNavigation_ModuleProcessor.HandleChange("t_TestDrive_Test_Navigation_Data.vNavigationName", e.target.value, objContext, objLanguage["iLanguageId"]);
                                    }
                                }}
                                ParentProps={{ ...props }}
                            />
                        </div>
                  
                    </div>
                </div>
                <div className="col col-2">
                    <div className="col-item">
                        <div className="row-left">
                            <span>{Localization.TextFormatter(objTextResource, "IsActive")}</span>
                        </div>
                        <div className="row-right">
                            <label className="checkbox">
                                <input id="cIsTestSchool"
                                    name="check"
                                    type="checkbox"
                                    checked={state.objData["cIsActive"] == "Y"}
                                    onChange={(e) => {
                                        objContext.AddEditTestNavigation_ModuleProcessor.HandleChange("cIsActive", e.target.checked ? "Y" : "N", objContext)
                                    }} />
                                <span className="checkmark" />
                            </label>
                        </div>
                    </div>
                </div>
                
            </div>
            <div id="ValidationError" />
        </div>
    };
    return (
        state.isLoadComplete && state.objData ? GetContent() : <React.Fragment />
    );
};


export default connect(IntranetBase_Hook.MapStoreToProps(AddEditTestNavigation_ModuleProcessor.StoreMapList()))(AddEditTestNavigation);