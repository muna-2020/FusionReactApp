// React related imports.
import React, { useReducer } from 'react';
import { connect } from 'react-redux';

//Module related fies.
import * as AddEditTaskFolder_Hook from '@shared/Application/c.Intranet/Modules/2_Task/TaskFolder/AddEditTaskFolder/AddEditTaskFolder_Hook';
import AddEditTaskFolder_ModuleProcessor from '@shared/Application/c.Intranet/Modules/2_Task/TaskFolder/AddEditTaskFolder/AddEditTaskFolder_ModuleProcessor';

/**
 * @name AddEditTaskFolder
 * @param {object} props props
 * @summary This component is used to Add/Edit the TaskFolder data.
 * @returns {object} React.Fragement that contains the content to be added in popup required for add/edit.
 */
const AddEditTaskFolder = (props) => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     * @returns {[]} state and dispatch
     */
    const [state, dispatch] = useReducer(IntranetBase_Hook.Reducer, AddEditTaskFolder_Hook.GetInitialState(props));

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     * @returns {object} objContext
     */
    let objContext = { state, props, dispatch, "AddEditTaskFolder_ModuleProcessor": new AddEditTaskFolder_ModuleProcessor() };

    /**
      * @name Initialize
      * @param {object} objContext context object
      * @summary Initialize method call in AddEditTaskFolder_Hook, that contains all the custom hooks.
      * @returns null
      */
    AddEditTaskFolder_Hook.Initialize(objContext);

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
                        checked={objContext.AddEditTaskFolder_ModuleProcessor.IsLanguageAdded(objMultiLanguageData.iLanguageId, objContext)}
                        name="" id=""
                        onChange={() => objContext.AddEditTaskFolder_ModuleProcessor.HandleCheckBoxClick(objMultiLanguageData.iLanguageId, objContext)} />
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
    const GetContent = () => {
        return <div id="TaskFolder" className="task-tabcontent">
            <div className="title">{Localization.TextFormatter(objTextResource, 'BaseData')}</div>
            <div className="col col-2">
                <div className="col-item">
                    <div className="row-left">
                        <span>{Localization.TextFormatter(objTextResource, 'Name')}</span>
                    </div>
                    <div className="row-right">
                        <input
                            id="vPageFolderName"
                            className="text-input"
                            value={state.objData.vPageFolderName}
                            onChange={e => {
                                objContext.AddEditTaskFolder_ModuleProcessor.HandleChange(
                                    "vPageFolderName",
                                    e.target.value,
                                    objContext
                                );
                            }}
                        />
                    </div>
                </div>
                <div className="col-item">
                    <div className="row-left">
                        <span>{Localization.TextFormatter(objTextResource, 'Title')}</span>
                    </div>
                    <div className="row-right">
                        <MultiLanguageInputs
                            Meta={{
                                ValueColumn: "vPageFolderTitle",
                                DependingTableName: "t_CMS_FileSystem_PageFolder_Data",
                                DisplayColumn: "vPageFolderTitle"
                            }}
                            Data={{
                                DisplayData: state.objData,
                                MultiLanguageData: props.Data.MultiLanguageData
                            }}
                            Events={{
                                OnChange: (e, objLanguage) => {
                                    objContext.AddEditTaskFolder_ModuleProcessor.HandleChange("t_CMS_FileSystem_PageFolder_Data.vPageFolderTitle", e.target.value, objContext, objLanguage["iLanguageId"]);
                                }
                            }}
                            ParentProps={props.ParentProps}
                        />
                    </div>
                </div>
            </div>

            <div className="col col-2">
                <div className="col-item">
                    <div className="row-left">
                        <span>{Localization.TextFormatter(objTextResource, "LookAndFeel")}</span>
                    </div>
                    <div className="row-right">
                        <div className="intranet-dropdown">
                            <WrapperComponent
                                ComponentName={"Dropdown"}
                                Id="uSkinId"
                                Data={{
                                    DropdownData: DataRef(objContext.props.Object_Cockpit_Skin)["Data"],
                                    SelectedValue: state.objData["uSkinId"] != undefined && state.objData ? state.objData["uSkinId"] : -1
                                }}
                                Meta={{
                                    DependingTableName: "t_TestDrive_Skin_Data",
                                    IsLanguageDependent: "Y",
                                    ValueColumn: "uSkinId",
                                    DisplayColumn: "vSkinTitle",
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
                                    OnChangeEventHandler: (objChangeData, props) => objContext.AddEditTaskFolder_ModuleProcessor.HandleDropDownChange("uSkinId", objChangeData, props, objContext),
                                    CheckDeletedDropDownData: props.Events.CheckDeletedDropDownData
                                }}
                                ParentProps={props.ParentProps}
                            />
                        </div>
                    </div>

                </div>
                {
                    objContext.props.Data.objRowData.iPageFolderId == 0 || (objContext.props.Data.objRowData.iPageParentFolderId == 0 && objContext.props.Data.IsEdit) ?
                        <div className="col-item">
                            <div className="row-left">
                                <span>{Localization.TextFormatter(objTextResource, 'Test')}</span>
                            </div>
                            <div className="row-right">
                                <label className="checkbox">
                                    <input
                                        id="cIsForInternalTesting" type="checkbox" name=""
                                        className="text-input"
                                        checked={state.objData["cIsForInternalTesting"] && state.objData["cIsForInternalTesting"].toUpperCase() === "Y" ? true : false}
                                        onChange={(e) => {
                                            objContext.AddEditTaskFolder_ModuleProcessor.HandleChange("cIsForInternalTesting", e.target.checked ? "Y" : "N", objContext);
                                        }}
                                    />
                                    <span className="checkmark" />
                                </label>
                            </div>
                        </div>
                        :
                        <React.Fragment />
                }
            </div>

            <div className="col col-1">
                <div className="title">{Localization.TextFormatter(objTextResource, 'Description')}</div>
            </div>
            <div className="col col-1">
                <textarea
                    id="vPageFolderDescription"
                    className="textarea"
                    rows="4"
                    style={{ width: "100%" }}
                    value={state.objData.vPageFolderDescription}
                    onChange={e => {
                        objContext.AddEditTaskFolder_ModuleProcessor.HandleChange(
                            "vPageFolderDescription",
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
        state.isLoadComplete ?
            <React.Fragment>{GetContent()}</React.Fragment> : <React.Fragment></React.Fragment>
    );
};

export default connect(IntranetBase_Hook.MapStoreToProps(AddEditTaskFolder_ModuleProcessor.StoreMapList()))(AddEditTaskFolder);