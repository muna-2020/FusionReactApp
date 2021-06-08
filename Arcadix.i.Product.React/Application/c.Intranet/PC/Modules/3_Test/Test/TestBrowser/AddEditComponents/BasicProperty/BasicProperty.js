// React related imports.
import React, { useImperativeHandle, forwardRef, useReducer } from 'react';

//Helper classes.
import HierarchicalDropDown from "@root/Framework/Controls/Dropdowns/HierarchicalDropdown/HierarchicalDropdown";

//Module Related Files.
import Base_AddEditTestMaster_ModuleProcessor from '@shared/Application/c.Intranet/Modules/3_Test/Test/TestBrowser/TestMaster/Base_AddEditTestMaster/Base_AddEditTestMaster_ModuleProcessor';
import * as BasicProperty_MetaData from '@shared/Application/c.Intranet/Modules/3_Test/Test/TestBrowser/AddEditComponents/BasicProperty/BasicProperty_MetaData';

/**
 * @name BasicProperty
 * @param {object} props props
 * @summary This component is used for BasicProperty in Add/EditTask.
 * @returns {object} React.Fragement that contains the content to be added in popup required for add/edit.
 */
const BasicProperty = (props, ref) => {

    /**
     * @name GetInitialState
     * @param {object} props 
     * @summary Forms the Initial state for component.
     * @returns {object} jsx, React.Fragment
     */
    const GetInitialState = (props) => {
        return {
            objData: {
                "vTestName": props.Data.IsEdit ? props.Data.DisplayData["vTestName"] : "",
                "iSubjectId": props.Data.IsEdit ? props.Data.DisplayData["iSubjectId"] : -1,
                "t_TestDrive_Test_Category": [
                    {
                        "iCategoryId": props.Data.IsEdit ? (props.Data.DisplayData["t_TestDrive_Test_Category"][0] ? props.Data.DisplayData["t_TestDrive_Test_Category"][0]["iCategoryId"] : -1) : -1
                    }
                ],
                "t_TestDrive_Test_Competency": [
                    {
                        "iCategoryCompetencyId": props.Data.IsEdit ? (props.Data.DisplayData["t_TestDrive_Test_Competency"][0] ? props.Data.DisplayData["t_TestDrive_Test_Competency"][0]["iCategoryCompetencyId"] : -1) : -1
                    }
                ],
                "t_TestDrive_Test_TestProperty": [
                    {
                        "uSkinId": props.Data.IsEdit ? (props.Data.DisplayData["t_TestDrive_Test_TestProperty"][0] ? props.Data.DisplayData["t_TestDrive_Test_TestProperty"][0]["uSkinId"] : "00000000-0000-0000-0000-000000000000") : "00000000-0000-0000-0000-000000000000"
                    }
                ]
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
    let arrBasicPropertyMetaData = BasicProperty_MetaData.GetBasicPropertyMetaData()

    /**
     * @name GetContent
     * @summary Forms the whole jsx required for the module.
     * @returns {object} jsx, React.Fragment
     */
    const GetContent = () => {

        return <React.Fragment>

            <div className="title">{Localization.TextFormatter(objTextResource, "KeyFeatures")}</div>

            <div className="col col-2">
                <div className="col-item">
                    <div className="row-left">
                        <span>{Localization.TextFormatter(objTextResource, "Name")}</span>
                    </div>
                    <div className="row-right">
                        <input
                            autoFocus
                            id="vTestName"
                            className="text-input"
                            value={state.objData.vTestName}
                            onBlur={() => objContext.Base_AddEditTestMaster_ModuleProcessor.ValidateOnBlur("vTestName", arrBasicPropertyMetaData, objContext)}
                            onChange={e => {
                                objContext.Base_AddEditTestMaster_ModuleProcessor.HandleChange("vTestName", e.target.value, objContext);
                            }}
                            onKeyDown={(e) => objContext.props.Events.OnKeyDown(e)}
                        />
                    </div>
                </div>
                <div className="col-item">
                    <div className="row-left">
                        <span>{Localization.TextFormatter(objTextResource, "Subject")}</span>
                    </div>
                    <div className="row-right" id="iSubjectId">
                        <HierarchicalDropDown
                            Id="Subject_HierarchicalDropDown"
                            Data={{
                                HierarchicalDropdownData: props.Data.DropdownData.SubjectData,
                                SelectedValue: state.objData.iSubjectId
                            }}
                            Meta={{
                                ValueColumn: "iSubjectId",
                                ParentId: 'iParentSubjectId',
                                DisplayColumn: "vSubjectName",
                                DependingTableName: "t_TestDrive_Subject_Data",
                                IsLanguageDependent: "Y",
                                Root: -2,
                                DefaultOptionValue: - 1,
                                ShowDefaultOption: true
                            }}
                            Resource={{
                                //Text: {
                                //    DefaultOptionText: Localization.TextFormatter(objTextResource, "PleaseChoose")
                                //},
                                SkinPath: JConfiguration.IntranetSkinPath,
                                Text: objTextResource["PleaseChoose"]
                            }}
                            Events={{
                                OnChangeEventHandler: (objChangeData, objDropDownProps) => objContext.Base_AddEditTestMaster_ModuleProcessor.OnDropdownChangeHandler("subject", objChangeData, objContext),
                            }}
                            CallBacks={{
                                OnBeforeShowNode: (objNode) => objNode["cIsDeleted"] == "N" ? objNode : null
                            }}
                            ParentProps={props.ParentProps}
                        />
                    </div>
                </div>
            </div>

            {props.Data.TestType != "HighStake" && props.Data.TestType != "HighStakeAdaptive" && props.Data.TestType != "Wrapper" && props.Data.TestType != "Survey" ?
                <div className="col col-2">
                    <div className="col-item">
                        <div className="row-left">
                            <span>{Localization.TextFormatter(objTextResource, "ActionAspect")}</span>
                        </div>
                        <div className="row-right">
                            <div className="intranet-dropdown" Id="iCategoryId">
                                <WrapperComponent
                                    ComponentName={"Dropdown"}
                                    Id="iCategoryId"
                                    Data={{
                                        DropdownData: props.Data.DropdownData.CategoryData,
                                        SelectedValue: state.objData["t_TestDrive_Test_Category"][0].iCategoryId
                                    }}
                                    Meta={{
                                        DependingTableName: "t_TestDrive_Category_Data",
                                        IsLanguageDependent: "Y",
                                        ValueColumn: "iCategoryId",
                                        DisplayColumn: "vCategoryName",
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
                                        OnChangeEventHandler: (objChangeData, objDropDownProps) => objContext.Base_AddEditTestMaster_ModuleProcessor.OnDropdownChangeHandler("category", objChangeData, objContext),
                                    }}
                                    Callbacks={{
                                        CheckDeletedDropDownData: (objNode) => {
                                            return objNode["cIsDeleted"] == "N" && objNode["iSubjectId"] == state.objData.iSubjectId ? true : false
                                        }
                                    }}
                                    ParentProps={props.ParentProps}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="col-item">
                        <div className="row-left">
                            <span>{Localization.TextFormatter(objTextResource, "Competence")}</span>
                        </div>
                        <div className="row-right">
                            <div className="intranet-dropdown" Id="iCategoryCompetencyId">
                                <WrapperComponent
                                    ComponentName={"Dropdown"}
                                    Id="iCategoryCompetencyId"
                                    Data={{
                                        DropdownData: props.Data.DropdownData.CategoryCompetencyData,
                                        SelectedValue: state.objData["t_TestDrive_Test_Competency"][0].iCategoryCompetencyId
                                    }}
                                    Meta={{
                                        DependingTableName: "t_TestDrive_Category_Competency_Data",
                                        IsLanguageDependent: "Y",
                                        ValueColumn: "iCategoryCompetencyId",
                                        DisplayColumn: "tCompetencyText",
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
                                        OnChangeEventHandler: (objChangeData, objDropDownProps) => objContext.Base_AddEditTestMaster_ModuleProcessor.OnDropdownChangeHandler("competency", objChangeData, objContext),
                                    }}
                                    Callbacks={{
                                        CheckDeletedDropDownData: (objNode) => {
                                            return objNode["cIsDeleted"] == "N" && objNode["iCategoryId"] == state.objData["t_TestDrive_Test_Category"][0].iCategoryId ? true : false
                                        }
                                    }}
                                    ParentProps={props.ParentProps}
                                />
                            </div>
                        </div>
                    </div>
                </div> : <div />}

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
                                    DropdownData: props.Data.DropdownData.SkinData,
                                    SelectedValue: state.objData.t_TestDrive_Test_TestProperty[0]["uSkinId"] ? state.objData.t_TestDrive_Test_TestProperty[0]["uSkinId"] : "00000000-0000-0000-0000-000000000000"
                                }}
                                Meta={{
                                    DependingTableName: "t_TestDrive_Skin_Data",
                                    IsLanguageDependent: "Y",
                                    ValueColumn: "uSkinId",
                                    DisplayColumn: "vSkinTitle",
                                    DefaultOptionValue: "00000000-0000-0000-0000-000000000000",
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
                                    OnChangeEventHandler: (objChangeData) => objContext.Base_AddEditTestMaster_ModuleProcessor.HandleTestPropertySubTableChange("uSkinId", objChangeData.uSkinId, objContext),
                                }}
                                Callbacks={{
                                    CheckDeletedDropDownData: (objNode) => {
                                        return objNode["cIsDeleted"] == "N" ? true : false
                                    }
                                }}
                                ParentProps={props.ParentProps}
                            />
                        </div>
                    </div>
                </div>
            </div>


        </React.Fragment>
    }

    return (
        GetContent()
    );
};

export default forwardRef(BasicProperty);


