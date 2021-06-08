//React related imports.
import React, { useReducer } from 'react';

//Module related files.
import * as AddEditSchoolType_Hook from '@shared/Application/c.Intranet/Modules/8_Setting/SchoolType/AddEditSchoolType/AddEditSchoolType_Hook';
import AddEditSchoolType_ModuleProcess from '@shared/Application/c.Intranet/Modules/8_Setting/SchoolType/AddEditSchoolType/AddEditSchoolType_ModuleProcess';



/**
* @name AddEditSchoolType.
* @param {object} props props.
* @summary This component is used to Add/Edit the Language data.
* @returns {object} React.Fragement that contains the content to be added in popup required for add/edit.
*/
const AddEditSchoolType = ((props) => {
    
    /**
    * @name [state,dispatch]
    * @summary Define state and dispatch for the reducer to set state.
    * @returns {[]} state and dispatch
    */
    const [state, dispatch] = useReducer(IntranetBase_Hook.Reducer, AddEditSchoolType_Hook.GetInitialState());

    /**
    * @name objContext
    * @summary Groups state.dispatch and module object(s) in objContext.
    * @returns {object} objContext
    */
    let objContext = { state, props, dispatch, "AddEditSchoolType_ModuleProcess": new AddEditSchoolType_ModuleProcess() };

    /**
    * @name Initialize
    * @param {object} objContext context object
    * @summary Initialize method call in AddEditLanguage_Hook, that contains all the custom hooks.
    * @returns null
    */
    AddEditSchoolType_Hook.Initialize(objContext);

    let objTextResource = props.Resource.Text;

    const GetContent = () => {
        return (
            <React.Fragment>
                <div id="SchoolType" className="tabcontent subject-management">
                    <div className="title">
                        {Localization.TextFormatter(objTextResource, 'SchoolType')}
                    </div>

                    <div className="col col-2">
                        <div className="col-item">
                            <div className="row-left"><span>{Localization.TextFormatter(objTextResource, "SchoolTypeName")}</span></div>
                            <div className="row-right">
                                <MultiLanguageInputs
                                    Meta={{
                                        ValueColumn: "vSchoolTypeName",
                                        DependingTableName: "t_TestDrive_Member_School_SchoolType_Data",
                                        DisplayColumn: "vSchoolTypeName",
                                        AutoFocus: true
                                    }}
                                    Data={{
                                        DisplayData: state.objData,
                                        MultiLanguageData: props.Data.MultiLanguageData
                                    }}
                                    Events={{
                                        OnChange: (e, objLanguage) => {
                                            objContext.AddEditSchoolType_ModuleProcess.HandleChange("t_TestDrive_Member_School_SchoolType_Data.vSchoolTypeName", e.target.value, objContext, objLanguage["iLanguageId"]);
                                        },
                                        OnKeyDown: (e) => {
                                            objContext.AddEditSchoolType_ModuleProcess.HandleEnterKeyDown(e, objContext.AddEditSchoolType_ModuleProcess, objContext)
                                        }
                                    }}
                                    ParentProps={{ ...props }}
                                />
                            </div>
                        </div>
                    </div>
                    <div id="ValidationError"></div>
                </div>
                
            </React.Fragment >
        );
    }

    return state.objData ? GetContent() : <React.Fragment />;

})

export default AddEditSchoolType;