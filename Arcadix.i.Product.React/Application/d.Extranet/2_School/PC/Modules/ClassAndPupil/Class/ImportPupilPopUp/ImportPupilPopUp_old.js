import React, { useReducer, useRef } from "react";
import { connect } from "react-redux";
import * as ImportPupilPopUpBusinessLogic from '@shared/Application/d.Extranet/2_School/Modules/ClassAndPupil/Class/ImportPupilPopUp/ImportPupilPopUpBusinessLogic';
import { DataRef } from '@shared/Framework/DataService/TestDriveFetchAndCacheData/TestDriveFetchAndCacheData';
import FileUpload from '@root/Framework/Controls/FileUpload/FileUpload';
import * as Localization from '@root/Framework/Blocks/Localization/Localization';

const ImportPupilPopUp = (props) => {

    /**
     * @summary Provides satate and dispatch.
     */
    const [state, dispatch] = useReducer(ImportPupilPopUpBusinessLogic.Reducer, ImportPupilPopUpBusinessLogic.GetInitialState());

    /**
     * @summary   Stores the information of the file uploaded.
     */
    const domFileUploadRef = useRef(null);

    /**
     * @summary Combines state, props and dispatch in one object, which is sent as a parameter to funtions in business logic.
     */
    let objContext = { state, props, dispatch };

    /**
     * @summary Custom hook that Checks if the data is loaded to props.
     */
    ImportPupilPopUpBusinessLogic.useDataLoaded(objContext);

    /**
     * returns the required jsx for component
     */
    function GetContent() {
        let objTextResource = DataRef(props.textresource, "textresource;id;" + JConfiguration.LanguageCultureInfo + "/d.extranet/2_school/modules/classandpupil/class").Data[0]["Class"];
        let objTextResourceForPupil = DataRef(props.textresource, "textresource;id;" + JConfiguration.LanguageCultureInfo + "/d.extranet/2_school/modules/classandpupil/pupil").Data[0]["Pupil"];
        let strClassId = props.Data.ClassData["uClassId"];
        let strFileName = Localization.TextFormatter(objTextResourceForPupil, 'PupilExportImportFileName');
        let strStreamFileApiUrl = "API/Framework/Services/StreamFile/GetData";
        let strFileDownloadUrl = props.JConfiguration.BaseUrl + strStreamFileApiUrl + "?FileName=" + strFileName + "&DisplayFileName=" + strFileName + "&ClassName=Arcadix.Object.Extranet.Pupil.Pupil,Arcadix.Object&MethodName=ExportPupilInformation&MethodParams={ClassId:'" + strClassId + "',ImportExcelName:'PupilExportTemp.xlsx'}";
        return (
            <div className="importdata-wrapper">

                <div className="import-header">
                    <div className="import-header-title">
                        <span>{Localization.TextFormatter(objTextResource, 'Heading')}</span>
                        <img src={props.JConfiguration.ExtranetSkinPath + "/Images/Common/Icons/close_big.svg"} alt="" onClick={e => { props.closePopUp(props.objModal); }} />
                    </div>
                </div>

                <div className={state.classContent}>
                    <div className="popup-content">
                        <span>{Localization.TextFormatter(objTextResource, 'SubHeading1')}</span>
                        <p>{Localization.TextFormatter(objTextResource, 'SubHeading1Description1')}<br />{Localization.TextFormatter(objTextResource, 'SubHeading1Description2')}</p>
                        <span class="download-button">
                            <a href={strFileDownloadUrl}>
                                {Localization.TextFormatter(objTextResource, 'ImportPupilExcelFileText')}<img src={props.JConfiguration.ExtranetSkinPath + "/Images/Common/Icons/arrow_down.svg"} />
                            </a>
                        </span>

                    </div>

                    <div className="popup-navigation">
                        <div className="popup-navigation-directions">
                            <span className="direction-icons"><img src={props.JConfiguration.ExtranetSkinPath + "/Images/Common/Icons/arrow_big_left_lightgrey.svg"} alt="" /> </span>
                            <span><img src={props.JConfiguration.ExtranetSkinPath + "/Images/Common/Icons/close_big_lightgrey.svg"} alt="" /></span>
                            <span onClick={() => ImportPupilPopUpBusinessLogic.ShowNextSlide(objContext)} className="back-direction-icons">
                                <img src={props.JConfiguration.ExtranetSkinPath + "/Images/Common/Icons/arrow_right.svg"} alt="" />
                            </span>
                        </div>
                        <div className="popup-navigation-dots">
                            <span><img src={props.JConfiguration.ExtranetSkinPath + "/Images/Common/Icons/nav_dot_active.svg"} alt="" /></span>
                            <span><img src={props.JConfiguration.ExtranetSkinPath + "/Images/Common/Icons/nav_dot.svg"} alt="" /> </span>
                        </div>
                    </div>
                </div>

                {/*next slide*/}
                <div className={state.classNextSlideContent}>
                    <div className="popup-content">
                        <span>{Localization.TextFormatter(objTextResource, 'SubHeading2')}</span>
                        <p className="font-content-size">{Localization.TextFormatter(objTextResource, 'SubHeading2Description')}</p><br />
                        <span>{Localization.TextFormatter(objTextResource, 'SubHeading3')}</span>
                        <p className="font-content-size">{Localization.TextFormatter(objTextResource, 'SubHeading3Description')}</p>
                        {
                            !state.blnShowReportHref ?
                                <FileUpload ref={domFileUploadRef} UploadText={objTextResource['AddAttachmentText']} JConfiguration={props.JConfiguration} ClientUserDetails={props.Data.ClientUserDetails} /> :
                                state.blnIsReportGenerated ?
                                    <a href={props.JConfiguration.BaseUrl + strStreamFileApiUrl + "?FileName=" + objTextResourceForPupil["ReportFileName"].split(".")[0] + "_" + props.Data.ClientUserDetails.UserId + "." + objTextResourceForPupil["ReportFileName"].split(".")[1] + "&Type=Temporary/PupilImportReport&DisplayFileName=" + objTextResource["ReportFileDisplayName"]}>{objTextResource["ReportFileDisplayName"]}</a> : <React.Fragment></React.Fragment>
                        }
                    </div>
                    <div className="popup-navigation">
                        <div className="popup-navigation-directions">
                            <span onClick={() => { if (!state.blnIsReportGenerated) { ImportPupilPopUpBusinessLogic.ShowPreviousSlide(objContext); } }} className="direction-icons"><img src={props.JConfiguration.ExtranetSkinPath + "/Images/Common/Icons/arrow_left.svg"} alt="" /> </span>
                            <span><img src={props.JConfiguration.ExtranetSkinPath + "/Images/Common/Icons/close_big_lightgrey.svg"} alt="" /></span>
                            {
                                !state.blnIsReportGenerated ?
                                    !state.blnIsFileUploadAttempted ?
                                        <button className="close-popup back-direction-icons" onClick={() => { ImportPupilPopUpBusinessLogic.ImportData(objContext, domFileUploadRef.current.GetUploadedFileDetails()); }}>{Localization.TextFormatter(objTextResource, 'ImportDataButtonText')}</button> :
                                        <button className="close-popup back-direction-icons" disabled>{Localization.TextFormatter(objTextResource, 'ImportDataButtonText')}</button> :
                                    <button className="close-popup back-direction-icons" onClick={(e) => { props.closePopUp(props.objModal); props.passedEvents.onClosePopup(); }}>{Localization.TextFormatter(objTextResource, 'CloseButtonText')}</button>
                            }
                        </div>
                        <div className="popup-navigation-dots">
                            <span><img src={props.JConfiguration.ExtranetSkinPath + "/Images/Common/Icons/nav_dot_active.svg"} alt="" /></span>
                            <span><img src={props.JConfiguration.ExtranetSkinPath + "/Images/Common/Icons/nav_dot.svg"} alt="" /> </span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    /**
     * @summary Renders the jsx.
     */
    return (
        <React.Fragment>{state.isLoadComplete ? GetContent() : <React.Fragment></React.Fragment>}</React.Fragment>
    );
};

/**
 * @summary   Loads dynamic CSS for the component
 */
ImportPupilPopUp.DynamicStyles = (props) => {
    var arrStyles = [
        props.JConfiguration.ExtranetSkinPath + "/Css/Application/2_School/ReactJs/PC/Modules/ClassAndPupil/ImportDataPupil.css"
    ];
    return arrStyles;
};

/**
 * calls mapStateToProps of business logic and exports the component.
 */
export default connect(ImportPupilPopUpBusinessLogic.mapStateToProps)(ImportPupilPopUp);
