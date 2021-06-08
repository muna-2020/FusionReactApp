// React related imports.
import React, { useImperativeHandle, forwardRef, useReducer } from 'react';

//Module Related Files.
import Base_AddEditTestMaster_ModuleProcessor from '@shared/Application/c.Intranet/Modules/3_Test/Test/TestBrowser/TestMaster/Base_AddEditTestMaster/Base_AddEditTestMaster_ModuleProcessor';


/**
 * @name WelcomePage
 * @param {object} props props
 * @summary This component is used for WelcomePage in Add/EditTest.
 * @returns {object} React.Fragement that contains the content to be added in popup required for add/edit.
 */
const WelcomePage = (props, ref) => {

    /**
     * @name GetInitialState
     * @param {object} props 
     * @summary Forms the Initial state for component.
     * @returns {object} jsx, React.Fragment
     */
    const GetInitialState = (props) => {
        return {
            objData: {
                "t_TestDrive_Test_TestProperty": [
                    {
                        "cShowIntroductionPage": props.Data.IsEdit ? (props.Data.DisplayData["t_TestDrive_Test_TestProperty"][0] ? props.Data.DisplayData["t_TestDrive_Test_TestProperty"][0]["cShowIntroductionPage"] : "Y") : "Y",
                    }
                ],
                "t_TestDrive_Test_Data": props.Data.MultiLanguageData.map(objMultiLang => {
                    let objEditTestData = props.Data.IsEdit ? props.Data.DisplayData["t_TestDrive_Test_Data"].find(obj => obj["iLanguageId"] == objMultiLang["iLanguageId"]) : {};
                    return {
                        "uTestDataId": props.Data.IsEdit && objEditTestData ? objEditTestData["uTestDataId"] : null,
                        "vTestTitle": props.Data.IsEdit && objEditTestData ? objEditTestData["vTestTitle"] : "",
                        "vStartButtonText": props.Data.IsEdit && objEditTestData ? objEditTestData["vStartButtonText"] : "",
                        "vIntroductionPageTopLeftTitle": props.Data.IsEdit && objEditTestData ? objEditTestData["vIntroductionPageTopLeftTitle"] : "",
                        "vIntroductionPageRightTitle": props.Data.IsEdit && objEditTestData ? objEditTestData["vIntroductionPageRightTitle"] : "",
                        "iIntroductionPageRightTitleFontSize": props.Data.IsEdit && objEditTestData ? objEditTestData["iIntroductionPageRightTitleFontSize"] : null,
                        "tTestInstructionForPupil": props.Data.IsEdit && objEditTestData ? objEditTestData["tTestInstructionForPupil"] : "",
                        "iLanguageId": objMultiLang["iLanguageId"]
                    }
                })
                //"t_TestDrive_Test_Data": props.Data.IsEdit ? props.Data.DisplayData["t_TestDrive_Test_Data"] : []
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

    const GetTextDiv = () => {
        return <React.Fragment>
            <div className="title">{Localization.TextFormatter(objTextResource, "Text")}</div>

            <div className="col col-2">
                <div className="col-item">
                    <div className="row-left">
                        <span>{Localization.TextFormatter(objTextResource, "TitleLeftSide")}</span>
                    </div>
                    <div className="row-right">
                        <MultiLanguageInputs
                            Meta={{
                                ValueColumn: "vTestTitle",
                                DependingTableName: "t_TestDrive_Test_Data",
                                DisplayColumn: "vTestTitle"
                            }}
                            Data={{
                                DisplayData: state.objData,
                                MultiLanguageData: props.Data.MultiLanguageData
                            }}
                            Events={{
                                OnChange: (e, objLanguage) => {
                                    objContext.Base_AddEditTestMaster_ModuleProcessor.HandleChange("t_TestDrive_Test_Data.vTestTitle", e.target.value, objContext, objLanguage["iLanguageId"]);
                                },
                                OnKeyDown: (e) => {
                                    objContext.props.Events.OnKeyDown(e)
                                }
                            }}
                            ParentProps={props.ParentProps}
                        />
                    </div>
                </div>

                <div className="col-item">
                    <div className="row-left">
                        <span>{Localization.TextFormatter(objTextResource, "TextStartButton")}</span>
                    </div>
                    <div className="row-right">
                        <MultiLanguageInputs
                            Meta={{
                                ValueColumn: "vStartButtonText",
                                DependingTableName: "t_TestDrive_Test_Data",
                                DisplayColumn: "vStartButtonText"
                            }}
                            Data={{
                                DisplayData: state.objData,
                                MultiLanguageData: props.Data.MultiLanguageData
                            }}
                            Events={{
                                OnChange: (e, objLanguage) => {
                                    objContext.Base_AddEditTestMaster_ModuleProcessor.HandleChange("t_TestDrive_Test_Data.vStartButtonText", e.target.value, objContext, objLanguage["iLanguageId"]);
                                },
                                OnKeyDown: (e) => {
                                    objContext.props.Events.OnKeyDown(e)
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
                        <span>{Localization.TextFormatter(objTextResource, "TitleTopLeft")}</span>
                    </div>
                    <div className="row-right">
                        <MultiLanguageInputs
                            Meta={{
                                ValueColumn: "vIntroductionPageTopLeftTitle",
                                DependingTableName: "t_TestDrive_Test_Data",
                                DisplayColumn: "vIntroductionPageTopLeftTitle"
                            }}
                            Data={{
                                DisplayData: state.objData,
                                MultiLanguageData: props.Data.MultiLanguageData
                            }}
                            Events={{
                                OnChange: (e, objLanguage) => {
                                    objContext.Base_AddEditTestMaster_ModuleProcessor.HandleChange("t_TestDrive_Test_Data.vIntroductionPageTopLeftTitle", e.target.value, objContext, objLanguage["iLanguageId"]);
                                },
                                OnKeyDown: (e) => {
                                    objContext.props.Events.OnKeyDown(e)
                                }
                            }}
                            ParentProps={props.ParentProps}
                        />
                    </div>
                </div>

                <div className="col-item">
                    <div className="row-left">
                        <span>{Localization.TextFormatter(objTextResource, "TitleTopRight")}</span>
                    </div>
                    <div className="row-right">
                        <MultiLanguageInputs
                            Meta={{
                                ValueColumn: "vIntroductionPageRightTitle",
                                DependingTableName: "t_TestDrive_Test_Data",
                                DisplayColumn: "vIntroductionPageRightTitle"
                            }}
                            Data={{
                                DisplayData: state.objData,
                                MultiLanguageData: props.Data.MultiLanguageData
                            }}
                            Events={{
                                OnChange: (e, objLanguage) => {
                                    objContext.Base_AddEditTestMaster_ModuleProcessor.HandleChange("t_TestDrive_Test_Data.vIntroductionPageRightTitle", e.target.value, objContext, objLanguage["iLanguageId"]);
                                },
                                OnKeyDown: (e) => {
                                    objContext.props.Events.OnKeyDown(e)
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
                        <span>{Localization.TextFormatter(objTextResource, "FontSize")}</span>
                    </div>
                    <div className="row-right">
                        <MultiLanguageInputs
                            Meta={{
                                ValueColumn: "iIntroductionPageRightTitleFontSize",
                                DependingTableName: "t_TestDrive_Test_Data",
                                DisplayColumn: "iIntroductionPageRightTitleFontSize"
                            }}
                            Data={{
                                DisplayData: state.objData,
                                MultiLanguageData: props.Data.MultiLanguageData
                            }}
                            Events={{
                                OnChange: (e, objLanguage) => {
                                    objContext.Base_AddEditTestMaster_ModuleProcessor.HandleChange("t_TestDrive_Test_Data.iIntroductionPageRightTitleFontSize", e.target.value, objContext, objLanguage["iLanguageId"]);
                                },
                                OnKeyDown: (e) => {
                                    objContext.props.Events.OnKeyDown(e)
                                }
                            }}
                            ParentProps={props.ParentProps}
                        />
                    </div>
                </div>
            </div>

            <div className="title">{Localization.TextFormatter(objTextResource, "IntroText")}</div>
           
            <MultiLanguageInputs
                Meta={{
                    ValueColumn: "tTestInstructionForPupil",
                    DependingTableName: "t_TestDrive_Test_Data",
                    DisplayColumn: "tTestInstructionForPupil",
                    InputType: "TextArea"
                }}
                Data={{
                    DisplayData: state.objData,
                    MultiLanguageData: props.Data.MultiLanguageData
                }}
                Events={{
                    OnChange: (e, objLanguage) => {
                        objContext.Base_AddEditTestMaster_ModuleProcessor.HandleChange("t_TestDrive_Test_Data.tTestInstructionForPupil", e.target.value, objContext, objLanguage["iLanguageId"]);
                    }
                }}
                ParentProps={props.ParentProps}
            />            
        </React.Fragment>
    }

    /**
     * @name GetContent
     * @summary Forms the whole jsx required for the component.
     * @returns {object} jsx, React.Fragment
     */
    const GetContent = () => {
        return <React.Fragment>
            <div className="title">{Localization.TextFormatter(objTextResource, "General")}</div>

            <div className="col col-1">
                <div className="col-item">
                    <div className="row-left">
                        <span className="nowrap">{Localization.TextFormatter(objTextResource, "ShowIntroductionPage")}</span>
                    </div>
                    <div className="row-right">
                        <label className="checkbox">
                            <input type="checkbox"
                                checked={state.objData.t_TestDrive_Test_TestProperty[0].cShowIntroductionPage ? (state.objData.t_TestDrive_Test_TestProperty[0].cShowIntroductionPage == "Y" ? true : false) : false}
                                name="" id=""
                                onChange={(e) => objContext.Base_AddEditTestMaster_ModuleProcessor.HandleTestPropertySubTableChange("cShowIntroductionPage", e.target.checked ? "Y" : "N", objContext)} />
                            <span className="checkmark"></span>
                        </label>
                    </div>
                </div>
            </div>

            {state.objData.t_TestDrive_Test_TestProperty[0].cShowIntroductionPage == "Y" ? GetTextDiv() : <React.Fragment />}

        </React.Fragment>
    }

    return (
        GetContent()
    );
};

export default forwardRef(WelcomePage);