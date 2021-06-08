//react imports.
import React, { useReducer } from "react";
import { connect } from "react-redux";

//Module Specific imports.
import * as EssayTestLogins_Hook from '@shared/Application/d.Extranet/3_Teacher/PC/Modules/EssayTestLogins/EssayTestLogins_Hook';
import EssayTestLogins_ModuleProcessor from '@shared/Application/d.Extranet/3_Teacher/PC/Modules/EssayTestLogins/EssayTestLogins_ModuleProcessor';

//controls
import ClassDropDown from "@root/Application/d.Extranet/5_Shared/PC/Controls/ClassDropDown/ClassDropDown";

//Inline Images import
import AngleDownImage from '@inlineimage/Application/d.Extranet/5_Shared/PC/angle_down.svg?inline';
import AngleUpImage from '@inlineimage/Application/d.Extranet/5_Shared/PC/angle_up.svg?inline';
import PDFIconImage from '@inlineimage/Application/d.Extranet/5_Shared/PC/Icon_Pdf.gif?inline';
import DeleteImage from '@inlineimage/Application/d.Extranet/5_Shared/PC/delete.svg?inline';
import CloseImage from '@inlineimage/Application/d.Extranet/5_Shared/PC/close.svg?inline';

/**
* @name EssayTestLogins
* @summary returns the required jsx for EssayTestLogins module.
* @param {any} props
*/
const EssayTestLogins = props => {

    /**
    * @name Reduce Initializer.
    * @summary Provides state and dispatch.
    */
    const [state, dispatch] = useReducer(ExtranetBase_Hook.Reducer, EssayTestLogins_Hook.GetInitialState(props));

    /**
     * @name objContext
     * @summary Combines state, props, dispatch and module object to one object, and sent as a parameter to funtions in business logic.
     */
    let objContext = { state, props, dispatch, ["ModuleName"]: "EssayTestLogins", ["EssayTestLogins_ModuleProcessor"]: new EssayTestLogins_ModuleProcessor() };

    /**
     * @name  InitializeDataForSSR
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.EssayTestLogins_ModuleProcessor.Initialize(objContext, objContext.EssayTestLogins_ModuleProcessor);

    /**
     * @name HookInitializer.
     * @summary Initializes the all hooks.
     */
    EssayTestLogins_Hook.Initialize(objContext);

    /**
   * 
   * @param {*} objTestDetails 
   * @summary   Retuens the jsx for the select-all check boxes. Also check if the select-all check box has to be enabled or not and also for which repetition the select-all checkbox is enabled and checked.
   */
    function GetTableHeaderDataForRepetition(objTestDetails, arrPupil) {
        let arrData = [];
        var uId = "Header_" + objTestDetails["iSubjectId"];
        let arrTestPupil = state.arrSelectedPupilTestData.filter(item => item["uTestId"] == objTestDetails["uTestId"]);
        let blnChecked = arrPupil.length > 0 && arrPupil.length == arrTestPupil.length;
        let blnEnableCheckBox = objContext.EssayTestLogins_ModuleProcessor.EnableSelectAllCheckBox(objContext, arrPupil, objTestDetails["uTestId"])
        arrData = [...arrData,
        <td>
            <div className={blnEnableCheckBox ? "checkboxContainer" : "checkboxContainer disableSelectAllCheckBox"}>
                <input type="checkbox" id={"HeaderChk_" + uId} onChange={(event) => { objContext.EssayTestLogins_ModuleProcessor.OnChangeAllCheckBox(objContext, arrPupil, objTestDetails["uTestId"], event.target.checked, blnEnableCheckBox) }}
                    checked={blnChecked} />
                <label for={"HeaderChk_" + uId}></label>
            </div>
        </td>
        ];

        return arrData;
    }

    /**
     * @summary   Contains a map function for test data. Calls 'GetTableHeaderDataForRepetition' method to get the jsx.
     */
    function GetTableHeaderDataForRepetitionPerSubject(arrTestData, arrPupil) {
        let arrReturnData = arrTestData.map(objTempTestDetails =>
            <React.Fragment>
                {
                    GetTableHeaderDataForRepetition(objTempTestDetails, arrPupil).map(objTempData => { return objTempData })
                }

            </React.Fragment>
        )
        return arrReturnData;
    }

    /**
     * @name GetTableBodyDataForRepetiton
     * @param {*} objTestDetails 
     * @param {*} objPupilDetails 
     * @summary   Returns the check box for generating test login per repetition per student.
     */
    function GetTableBodyDataForRepetiton(objTestDetails, objPupilDetails) {
        let arrData = [];
        let value = state.arrSelectedPupilTestData
            .find(item => item["uPupilId"] == objPupilDetails["uPupilId"] && item["uTestId"] == objTestDetails["uTestId"]);
        let blnChecked = value != undefined;
        var uId = objTestDetails["uTestId"] + objPupilDetails["uPupilId"];
        let blnEnableTest = objContext.EssayTestLogins_ModuleProcessor.EnableTestForPupil(objContext, objPupilDetails["uPupilId"], objTestDetails["uTestId"])
        arrData = [...arrData,
        <td>
            <div className={blnEnableTest ? "checkboxContainer blueCheckbox" : "checkboxContainer blueCheckbox disableblueCheckbox"}>
                <input type="checkbox" id={"chk_" + uId} onClick={(event) => { objContext.EssayTestLogins_ModuleProcessor.OnChangeCheckBox(objContext, objPupilDetails["uPupilId"], objTestDetails["uTestId"], event.target.checked, blnEnableTest) }}
                    checked={blnChecked} />
                <label for={"chk_" + uId}></label>
            </div>
        </td>
        ];
        return arrData;
    }

    /**
     * @name GetTableBodyDataForRepetitonPerSubject
     * @param {*} objPupilDetails 
     * @summary   Contains a map function for test data. Calls 'GetTableBodyDataForRepetiton' method to get the jsx.
     */
    function GetTableBodyDataForRepetitonPerSubject(arrTestData, objPupilDetails) {
        let arrReturnData = arrTestData.map(objTempTestDetails =>
            <React.Fragment>
                {
                    GetTableBodyDataForRepetiton(objTempTestDetails, objPupilDetails).map(objTempData => { return objTempData })
                }
            </React.Fragment>
        )
        return arrReturnData;
    }

    function GetFooterJsx(objTextResource) {
        return (
            <div className="endPanel" id="FooterTestLogins">
                <div class="leftFlex">
                </div>
                <div className="leftFlex centerFlex">
                    <span className="button high-stake-button" onClick={() => { objContext.EssayTestLogins_ModuleProcessor.OnClickPdfGenerationButton(objContext, objTextResource) }}>Texte schreiben erstellen (PDF)</span>
                </div>
                <div className="rightFlex">
                    <div className="all-pdf" onClick={(event) => { objContext.EssayTestLogins_ModuleProcessor.ToggleAllPdf(objContext, true); }}>
                        <span>{Localization.TextFormatter(objTextResource, 'AllPDFText')}</span>
                        <img src={AngleDownImage} alt="" />
                    </div>
                </div>

            </div>

        )
    }

    /**
    * @name GetPdfElementsList
    * @param  {object} objClass each class objects
    * @summary Forms the jsx li for Pdf elements of AllPdf
    * @returns {object} jsx, li
    */
    function GetPdfElementsList(objClass, arrOfflineProcessExecution) {
        let arrElements = [];
        arrOfflineProcessExecution.map(itm => {
            let objParameters = JSON.parse(itm.vParameters);
            let strFileName = itm.t_TestDrive_OfflineProcess_Execution_File[0].vFileName;
            let strCombinedFileName = itm["uOfflineProcessExecutionId"] + "/" + strFileName;
            let strStreamFileApiUrl = "API/Framework/Services/StreamFile?";
            let strFileDownloadUrl = JConfiguration.BaseUrl + strStreamFileApiUrl + "sessionkey=" + JConfiguration.SessionKey + "&FileName=" + strCombinedFileName + "&Type=Offline/GenerateEssayTestLogins&DisplayFileName=" + strFileName;
            if (objParameters.SearchQuery["must"] && objParameters.SearchQuery["must"].length > 0 && objParameters.SearchQuery["must"][2]["match"]["uClassId"] == objClass["uClassId"]) {
                arrElements = [...arrElements,
                <li>
                    <img src={PDFIconImage} />
                    <a href={strFileDownloadUrl} className={itm["cIsViewed"] == "Y" ? "not-downloaded" : "downloaded"}> {/*className "not-downloaded" is working as "downloaded" and vice-versa */}
                        {" "}
                        {strFileName}
                    </a>
                    <img
                        src={DeleteImage}
                        onClick={() => { objContext.EssayTestLogins_ModuleProcessor.DeleteGeneratedOfflineProcessExecution(objContext, itm["uOfflineProcessExecutionId"]); }}
                    />
                </li>
                ];
            }
        });
        return arrElements;
    }

    /**
    * @name GetPdfElements
    * @summary Forms the jsx ul for Pdf elements of AllPdf by looping through each class objects and not showing that class name if it has no lists.
    * @returns {object} jsx, React.Fragment
    */
    function GetPdfElements(objTextResource) {
        let arrClass = objContext.EssayTestLogins_ModuleProcessor.GetClassData(objContext);
        let arrElements = [];
        let strOfflineProcessDefinitionId = DataRef(objContext.props.Object_Cockpit_OfflineProcessDefinition, "Object_Cockpit_OfflineProcessDefinition;vOfflineProcessKeyword;GenerateEssayTestLogins")["Data"][0]["uOfflineProcessDefinitionId"]
        let arrTempOfflineProcessExecution = DataRef(objContext.props.Object_Cockpit_OfflineProcess_OfflineProcessExecution, "Object_Cockpit_OfflineProcess_OfflineProcessExecution;uUserId;" + objContext.props.ClientUserDetails.UserId + ";uOfflineProcessDefinitionId;" + strOfflineProcessDefinitionId).Data;
        let arrOfflineProcessExecution = arrTempOfflineProcessExecution.filter(objTempOfflineProcessExecutionDetails => { return objTempOfflineProcessExecutionDetails["cIsDeleted"] === "N"; });
        if (arrOfflineProcessExecution && arrOfflineProcessExecution.length > 0) {
            arrClass.map(objClass => {
                let arrListElements = [...GetPdfElementsList(objClass, arrOfflineProcessExecution)];
                arrElements = [...arrElements,
                arrListElements.length !== 0 ? <React.Fragment>
                    <h4>{Localization.TextFormatter(objTextResource, 'ClassLabel')}: {objClass["vClassName"]}</h4>
                    <ul>
                        {arrListElements}
                    </ul>
                </React.Fragment> : <React.Fragment />
                ];
            });
        }
        return arrElements;
    }

    /**
     * @name GetContent
     * @summary returns the required jsx for the component.
     * */
    function GetContent() {
        let objTextResource = Object_Framework_Services_TextResource.GetData("/d.Extranet/3_Teacher/Modules/EssayTestLogins", props)
        let arrClassDataForClassDropdown = objContext.EssayTestLogins_ModuleProcessor.GetClassDropDownData(objContext, objTextResource);
        let arrTestData = objContext.EssayTestLogins_ModuleProcessor.GetTestData(objContext);
        let arrClassData = objContext.EssayTestLogins_ModuleProcessor.GetClassData(objContext);
        let strClassId = objContext.EssayTestLogins_ModuleProcessor.GetSelectedClassId(arrClassDataForClassDropdown, arrClassData);
        let arrPupil = objContext.EssayTestLogins_ModuleProcessor.GetPupilData(objContext, strClassId);
        return (
            <div className="highStakeEssayTestLogins" >
                <div className="top-space" id="TopSpace" />
                {state.blnShowAllPdf ?
                    <div className="all-pdf-popup-wrapper">
                        <div className="all-pdf-popup">
                            <WrapperComponent
                                ComponentName={"FillHeight"}
                                Id="ProgressReport_FillHeight_Pdf_Popup" Meta={{ HeaderIds: ["Header", "outletBand"], FooterIds: ["AnalysisFooter"] }} ParentProps={{ ...props }}>
                                <div className="all-pdf-popup-padd">
                                    <div className="all-pdf-popup-header">
                                        <h3>{Localization.TextFormatter(objTextResource, 'PdfPopupHeader')}</h3>

                                        <div className="close" onClick={() => { objContext.EssayTestLogins_ModuleProcessor.ToggleAllPdf(objContext, false); }}>
                                            <span>{Localization.TextFormatter(objTextResource, 'Close')}</span>
                                            <img src={CloseImage} />
                                        </div>
                                    </div>
                                    <div className="pdf-list">
                                        {GetPdfElements(objTextResource)}
                                    </div>
                                </div>
                            </WrapperComponent>
                        </div>
                    </div> :
                    <React.Fragment>
                        <div className="top-head-padd" id="TestLoginsHeader">
                            {
                                arrClassData.length > 0 ?
                                    <div className="top-head">
                                        <div className="top-head-left">

                                            <div>
                                                <span>{Localization.TextFormatter(objTextResource, 'ClassLabel')}:</span>
                                                <div className="content-dropdown">

                                                    <PerformanceProfiler ComponentName={"HighStakeTestLoginsClassDropDown"} JConfiguration={props.JConfiguration} >
                                                        <ClassDropDown
                                                            id="HighStakeTestLoginsClassDropDown"
                                                            Data={arrClassDataForClassDropdown}
                                                            DisplayColumn="vClassName"
                                                            ValueColumn="uClassId"
                                                            SelectedValue={strClassId}
                                                            JConfiguration={props.JConfiguration}
                                                            ClientUserDetails={props.ClientUserDetails}
                                                            OnChangeEventHandler={(objItem, objDropdownProps) => { objContext.EssayTestLogins_ModuleProcessor.OnChangeClassDropDown(objContext, objItem) }} />

                                                    </PerformanceProfiler>

                                                </div>
                                            </div>
                                        </div>
                                    </div> : ''}
                        </div>
                        <WrapperComponent
                            ComponentName={"FillHeight"}
                            Id="TestLoginFillHeight" Meta={objContext.EssayTestLogins_ModuleProcessor.GetFillHeightMetaData()} ParentProps={{ ...props }}>
                            <table className="testLoginTable">
                                {
                                    arrTestData && arrTestData.length > 0 ?
                                        <React.Fragment>
                                            <tr className="table-header">
                                                <td> <span>{Localization.TextFormatter(objTextResource, 'PupilText')}</span></td>
                                                {
                                                    arrTestData.map(objTempData => {
                                                        return (
                                                            <td>
                                                                <span>{objTempData["vTestName"]}</span>
                                                            </td>
                                                        );
                                                    })
                                                }
                                            </tr>
                                            <tr className="table-header">
                                                <td> <span>{Localization.TextFormatter(objTextResource, 'AllPupilText')} ({arrPupil.length})</span></td>
                                                {
                                                    GetTableHeaderDataForRepetitionPerSubject(arrTestData, arrPupil)
                                                }
                                            </tr>
                                            {
                                                arrPupil && arrPupil.length > 0 ? arrPupil.map((objTempPupilDetails) => {
                                                    return (
                                                        <tr>
                                                            <td>
                                                                {objTempPupilDetails["vFirstName"]} {objTempPupilDetails["vName"]}
                                                            </td>
                                                            {
                                                                GetTableBodyDataForRepetitonPerSubject(arrTestData, objTempPupilDetails)
                                                            }
                                                        </tr>
                                                    );
                                                })
                                                    :
                                                    <tr>
                                                        <td className="no-data" colSpan={arrTestData && arrTestData.length + 1}>
                                                            {Localization.TextFormatter(objTextResource, 'NoDataFoundText')}
                                                        </td>
                                                    </tr>
                                            }
                                        </React.Fragment> :
                                        <React.Fragment>
                                            <tr>
                                                <td className="no-data" colSpan={arrTestData && arrTestData.length + 1}>
                                                    {Localization.TextFormatter(objTextResource, 'NoDataFoundText')}
                                                </td>
                                            </tr>
                                        </React.Fragment>
                                }
                            </table>
                        </WrapperComponent>

                        {GetFooterJsx(objTextResource)}
                    </React.Fragment>
                }
            </div>
        );
    }

    /**
    * @summary renders the jsx.
    */
    return state.isLoadComplete || props.isLoadComplete ? GetContent() : <React.Fragment />
};

/**
 * @name Connector
 * @summary connects component to store.
 */
export default connect(ExtranetBase_Hook.MapStoreToProps(EssayTestLogins_ModuleProcessor.StoreMapList()))(EssayTestLogins);


/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = EssayTestLogins_ModuleProcessor; 