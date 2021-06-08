//React related imports
import React, { useRef, useReducer } from 'react';

//Component related import
import * as AddEditTeacherManagement_Hook from '@shared/Application/c.Intranet/Modules/5_Member/TeacherManagement/AddEditTeacherManagement/AddEditTeacherManagement_Hook';
import AddEditTeacherManagement_ModuleProcessor from '@shared/Application/c.Intranet/Modules/5_Member/TeacherManagement/AddEditTeacherManagement/AddEditTeacherManagement_ModuleProcessor';

/**
* @name AddEditTeacherManagement.
* @param {object} props props.
* @summary This component is used to displays AddEditTeacherManagement Popup.
* @returns {object}  React.Fragement that encapsulates the files for AddEditTeacherManagement Popup.
*/
const AddEditTeacherManagement = props => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     * @returns {[]} state and dispatch
     */
    const [state, dispatch] = useReducer(IntranetBase_Hook.Reducer, AddEditTeacherManagement_Hook.GetInitialState());

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.   
     * @returns {object} objContext
     */
    let objContext = { state, props, dispatch, ["AddEditTeacherManagement_ModuleProcessor"]: new AddEditTeacherManagement_ModuleProcessor(), ["Object_Framework_Services_TextResource"]: Object_Framework_Services_TextResource };

    /**
     * @name Initialize
     * @param {object} objContext context object
     * @summary Initialize method call in TeacherManagement_Hook, that contains all the custom hooks.
     * @returns null
     */
    AddEditTeacherManagement_Hook.Initialize(objContext);

    /**
     * @name GetStateDropDown
     * @summary Forms the  jsx required for the dropdown.
     * @returns {object} jsx, React.Fragment
     */
    const GetStateDropDown = (objTextResource, objTeacherSchool) => {
        return (
            <WrapperComponent
                ComponentName={"Dropdown"}
                Id="iStateId"
                Data={{
                    DropdownData: props.Data.DropdownData.State,
                    SelectedValue: objTeacherSchool["iStateId"]
                }}
                Meta={{
                    DependingTableName: "t_TestDrive_Member_State_Data",
                    IsLanguageDependent: "Y",
                    ValueColumn: "iStateId",
                    DisplayColumn: "vStateName",
                    DefaultOptionValue: - 1,
                    ShowDefaultOption: "true"
                }}
                Resource={{
                    Text: {
                        DefaultOptionText: Localization.TextFormatter(objTextResource, "PleaseChoose")
                    },
                    JConfiguration: props.JConfiguration,
                    SkinPath: props.JConfiguration.IntranetSkinPath
                }}
                Callbacks={{
                    CheckDeletedDropDownData: (objNode) => {
                        return objNode["cIsDeleted"] == "N" ? true : false
                    }
                }}
                Events={{
                    OnChangeEventHandler: (objChangeData, props) => objContext.AddEditTeacherManagement_ModuleProcessor.HandleStateSchoolChange("iStateId", objChangeData["iStateId"], objTeacherSchool["iIndex"], objContext),
                }}
                ParentProps={{ ...props }}
            />
        );
    }

    /**
     * @name GetSchoolDropDown
     * @summary Forms the  jsx required for the dropdown.
     * @returns {object} jsx, React.Fragment
     */
    const GetSchoolDropDown = (objTextResource, objTeacherSchool, intRowIndex) => {
        return (
            <div id="uSchoolId">
                <WrapperComponent
                    ComponentName={"Dropdown"}
                    Id="uSchoolId"
                    Data={{
                        DropdownData: props.Data.DropdownData.School,
                        SelectedValue: objTeacherSchool["uSchoolId"] ?? -1
                    }}
                    Meta={{
                        ValueColumn: "uSchoolId",
                        DisplayColumn: "vSchoolName",
                        DefaultOptionValue: - 1,
                        ShowDefaultOption: "true"
                    }}
                    Resource={{
                        Text: {
                            DefaultOptionText: Localization.TextFormatter(objTextResource, "PleaseChoose")
                        },
                        JConfiguration: props.JConfiguration,
                        SkinPath: props.JConfiguration.IntranetSkinPath
                    }}
                    Callbacks={{
                        CheckDeletedDropDownData: (objNode) => {
                            return objNode["cIsDeleted"] == "N" && objNode["iStateId"] == (objTeacherSchool["iStateId"] ?? -1) && objNode["cIsTestSchool"] == (objTeacherSchool["cIsTestSchool"] ?? "N") && objNode["cIsStellwerk"] == (objTeacherSchool["cIsStellwerk"] ?? "N")  ? true : false
                        }
                    }}
                    Events={{
                        OnChangeEventHandler: (objChangeData, props) => objContext.AddEditTeacherManagement_ModuleProcessor.HandleStateSchoolChange("uSchoolId", objChangeData["uSchoolId"], objTeacherSchool["iIndex"], objContext),
                    }}
                    ParentProps={{ ...props }}
                />
            </div>
        );
    }

    /**
    * @name GetSchoolDropDown
    * @summary Forms the  jsx required for the dropdown.
    * @returns {object} jsx, React.Fragment
    */
    const GetTitleDropDown = (objTextResource) => {
        return (
            <WrapperComponent
                ComponentName={"Dropdown"}
                Id="iTitleId"
                Data={{
                    DropdownData: props.Data.DropdownData.Title,
                    SelectedValue: state.objData["iTitleId"] != undefined && state.objData ? state.objData["iTitleId"] : -1
                }}
                Meta={{
                    DependingTableName: "t_TestDrive_Member_Title_Data",
                    IsLanguageDependent: "Y",
                    ValueColumn: "iTitleId",
                    DisplayColumn: "vTitleName",
                    DefaultOptionValue: - 1,
                    ShowDefaultOption: "true"
                }}
                Resource={{
                    Text: {
                        DefaultOptionText: Localization.TextFormatter(objTextResource, "PleaseChoose")
                    },
                    JConfiguration: props.Resource.JConfiguration,
                    SkinPath: props.Resource.SkinPath
                }}
                Events={{
                    OnChangeEventHandler: (objChangeData, props) => objContext.AddEditTeacherManagement_ModuleProcessor.HandleDropDownChange("iTitleId", objChangeData, props, objContext),
                    CheckDeletedDropDownData: objContext.AddEditTeacherManagement_ModuleProcessor.CreateItemEventHandler
                }}
                ParentProps={{ ...props }}
            />
        );
    }

    const GetTestSchoolCheckBox = (blnIsChecked, intRowIndex) => {
        return <label className="checkbox mt-10">
            <input
                className="text-input"
                id="cIsTestSchool"
                type="checkbox"
                vFilterType="match"
                onChange={(e) => {
                    objContext.AddEditTeacherManagement_ModuleProcessor.HandleStateSchoolChange("cIsTestSchool", e.target.checked == true ? "Y" : "N", intRowIndex, objContext);
                }}
                checked={blnIsChecked}
            />
            <span className="checkmark" />
        </label>
    }

    const GetStellwerkCheckBox = (blnIsChecked, intRowIndex) => {
        return <label className="checkbox mt-10">
            <input
                className="text-input"
                id="cIsStellwerk"
                type="checkbox"
                vFilterType="match"
                onChange={(e) => {
                    objContext.AddEditTeacherManagement_ModuleProcessor.HandleStateSchoolChange("cIsStellwerk", e.target.checked == true ? "Y" : "N", intRowIndex, objContext);
                }}
                checked={blnIsChecked}
            />
            <span className="checkmark" />
        </label>
    }

    const GetStateSchool = (objTextResource, intRowIndex, objTeacherSchool) => {
        return objTeacherSchool.uTeacherSchoolId ? <tr>
                <td>
                    {intRowIndex + 1}
                </td>
                <td>
                    <label>{props.Data.DropdownData.State.filter(objState => objState["iStateId"] == objTeacherSchool["iStateId"])[0]["t_TestDrive_Member_State_Data"][0]["vStateName"].toString()}</label>
                </td>
                <td>
                    <label>{objTeacherSchool["cIsTestSchool"].toString()}</label>  
                </td>
                <td>
                    <label>{objTeacherSchool["cIsStellwerk"].toString()}</label>
                </td>
                <td>
                    <label>{props.Data.DropdownData.School.filter(objSchool => objSchool["uSchoolId"] == objTeacherSchool["uSchoolId"])[0]["vSchoolName"].toString()}</label>
                </td>
        </tr> : <tr>
                <td>
                    {intRowIndex + 1}
                </td>
                <td>
                    <div className="intranet-dropdown" id={"iStateId_" + objTeacherSchool["iIndex"]}>
                        {GetStateDropDown(objTextResource, objTeacherSchool, intRowIndex)}
                    </div>
                </td>
                <td>
                    {GetTestSchoolCheckBox(objTeacherSchool["cIsTestSchool"] == "Y", objTeacherSchool["iIndex"])}
                </td>
                <td>
                    {GetStellwerkCheckBox(objTeacherSchool["cIsStellwerk"] == "Y", objTeacherSchool["iIndex"])}
                </td>
                <td>
                    <div className="intranet-dropdown" id={"uSchoolId_" + objTeacherSchool["iIndex"]}>
                        {GetSchoolDropDown(objTextResource, objTeacherSchool, intRowIndex)}
                    </div>
                </td>
                <td>
                    <img
                        src={objContext.props.Resource.SkinPath + "/Images/Common/Icons/Delete_Active.gif"}
                        onClick={() => objContext.AddEditTeacherManagement_ModuleProcessor.RemoveStateSchoolRow(objTeacherSchool["iIndex"], objContext)}
                    />
                </td>
            </tr>
    }

    let objTextResource = props.Resource.Text;
    const GetContent = () => {
        return (
            <React.Fragment >
                <div className="school-container">
                    <table className="add-teacher-school-table">
                        <tbody>
                            <tr>
                                <th />
                                <th>
                                    {Localization.TextFormatter(objTextResource, "SelectSubjectArea")}
                                </th>
                                <th>
                                    {Localization.TextFormatter(objTextResource, "IsTestSchool")}
                                </th>
                                <th>
                                    {Localization.TextFormatter(objTextResource, "IsStellwerk")}
                                </th>
                                <th>
                                    {Localization.TextFormatter(objTextResource, "School")}
                                </th>
                                <th />
                            </tr>
                            {
                                objContext.state.objData["t_TestDrive_Member_Teacher_School"]?.filter(objTeacherSchool => objTeacherSchool["cIsDeleted"] == "N").map((objTeacherSchool, intRowIndex) => {
                                    return GetStateSchool(objTextResource, intRowIndex, objTeacherSchool) 
                                })
                            }
                        </tbody>
                    </table>
                    <div className="align-right mt-10 mb-10">
                        <button
                            className="btn"
                            onClick={() => objContext.AddEditTeacherManagement_ModuleProcessor.AddStateSchoolRow(objContext)}
                        >
                            {Localization.TextFormatter(objTextResource, "AddButton")}
                        </button>
                    </div>

                    <div className="col col-2">
                        <div className="col-item">
                            <div className="row-left">
                                <span>{Localization.TextFormatter(objTextResource, "TitleId")}:	</span>
                            </div>
                            <div className="row-right">
                                <div className="intranet-dropdown">
                                    {GetTitleDropDown(objTextResource)}
                                </div>
                            </div>
                        </div>
                        <div className="col-item">
                            <div className="row-left"><span>{Localization.TextFormatter(objTextResource, "FirstName")}:</span></div>
                            <div className="row-right">
                                <div className="intranet-dropdown">
                                    <input
                                        onFocus={(e => { objContext.AddEditTeacherManagement_ModuleProcessor.ValidateFocus(objContext, 'vFirstName'); })}
                                        className="text-input"
                                        id="vFirstName"
                                        type="text"
                                        vFilterType="wildcard"
                                        onChange={(e) => {
                                            objContext.AddEditTeacherManagement_ModuleProcessor.HandleChange("vFirstName", e.target.value, objContext);
                                        }}
                                        onKeyDown={(e) => objContext.AddEditTeacherManagement_ModuleProcessor.HandleEnterKeyDown(e, objContext.AddEditTeacherManagement_ModuleProcessor, objContext)}
                                        value={state.objData["vFirstName"]}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col col-2">
                        <div className="col-item">
                            <div className="row-left">
                                <span>{Localization.TextFormatter(objTextResource, "Name")}:</span>
                            </div>
                            <div className="row-right">
                                <input
                                    onFocus={(e => { objContext.AddEditTeacherManagement_ModuleProcessor.ValidateFocus(objContext, 'vName'); })}
                                    className="text-input"
                                    id="vName"
                                    type="text"
                                    vFilterType="wildcard"
                                    onChange={(e) => {
                                        objContext.AddEditTeacherManagement_ModuleProcessor.HandleChange("vName", e.target.value, objContext);
                                    }}
                                    onKeyDown={(e) => objContext.AddEditTeacherManagement_ModuleProcessor.HandleEnterKeyDown(e, objContext.AddEditTeacherManagement_ModuleProcessor, objContext)}
                                    value={state.objData["vName"]}
                                />
                            </div>
                        </div>
                        <div className="col-item">
                            <div className="row-left"><span>{Localization.TextFormatter(objTextResource, "Phone")}:</span></div>
                            <div className="row-right">
                                <div className="intranet-dropdown">
                                    <input
                                        onFocus={(e => { objContext.AddEditTeacherManagement_ModuleProcessor.ValidateFocus(objContext, 'vPhonePrivate'); })}
                                        className="text-input"
                                        id="vPhonePrivate"
                                        type="text"
                                        vFilterType="wildcard"
                                        onChange={(e) => {
                                            objContext.AddEditTeacherManagement_ModuleProcessor.HandleChange("vPhonePrivate", e.target.value, objContext);
                                        }}
                                        onKeyDown={(e) => objContext.AddEditTeacherManagement_ModuleProcessor.HandleEnterKeyDown(e, objContext.AddEditTeacherManagement_ModuleProcessor, objContext)}
                                        value={state.objData["vPhonePrivate"]}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col col-2">
                        <div className="col-item">
                            <div className="row-left">
                                <span>{Localization.TextFormatter(objTextResource, "SchoolPhone")}:</span>
                            </div>
                            <div className="row-right">
                                <div className="intranet-dropdown">
                                    <input
                                        onFocus={(e => { objContext.AddEditTeacherManagement_ModuleProcessor.ValidateFocus(objContext, 'vPhoneSchool'); })}
                                        className="text-input"
                                        id="vPhoneSchool"
                                        type="text"
                                        vFilterType="wildcard"
                                        onChange={(e) => {
                                            objContext.AddEditTeacherManagement_ModuleProcessor.HandleChange("vPhoneSchool", e.target.value, objContext);
                                        }}
                                        onKeyDown={(e) => objContext.AddEditTeacherManagement_ModuleProcessor.HandleEnterKeyDown(e, objContext.AddEditTeacherManagement_ModuleProcessor, objContext)}
                                        value={state.objData["vPhoneSchool"]}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-item">
                            <div className="row-left">
                                <span>{Localization.TextFormatter(objTextResource, "E-Mail")}:</span>
                            </div>
                            <div className="row-right">
                                <div className="intranet-dropdown">
                                    <input
                                        onFocus={(e => { objContext.AddEditTeacherManagement_ModuleProcessor.ValidateFocus(objContext, 'vEmail'); })}
                                        className="text-input"
                                        id="vEmail"
                                        type="text"
                                        vFilterType="wildcard"
                                        onChange={(e) => {
                                            objContext.AddEditTeacherManagement_ModuleProcessor.HandleChange("vEmail", e.target.value, objContext);
                                        }}
                                        onKeyDown={(e) => objContext.AddEditTeacherManagement_ModuleProcessor.HandleEnterKeyDown(e, objContext.AddEditTeacherManagement_ModuleProcessor, objContext)}
                                        value={state.objData["vEmail"]}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>




                    <div id="ValidationError"></div>
                </div>
            </React.Fragment >
        )
    }
    return state.objData ? GetContent() : <React.Fragment />;
}

export default AddEditTeacherManagement;