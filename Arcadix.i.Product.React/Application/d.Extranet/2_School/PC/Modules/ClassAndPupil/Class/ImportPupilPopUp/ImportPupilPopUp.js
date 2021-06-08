//React related imports
import React, { useReducer, useRef } from 'react';
import { connect } from 'react-redux';

//Base classes
import * as ExtranetBase_Hook from '@shared/Framework/BaseClass/ExtranetBaseClass/ExtranetBase_Hook';

//Module realted fies.
import * as ImportPupilPopUp_Hook from '@shared/Application/d.Extranet/2_School/PC/Modules/ClassAndPupil/Class/ImportPupilPopUp/ImportPupilPopUp_Hook';
import ImportPupilPopUp_ModuleProcessor from "@shared/Application/d.Extranet/2_School/PC/Modules/ClassAndPupil/Class/ImportPupilPopUp/ImportPupilPopUp_ModuleProcessor";

//Common functionality imports
import * as Localization from '@root/Framework/Blocks/Localization/Localization';
import FileUpload from '@root/Framework/Controls/FileUpload/FileUpload';

//Inline Images import
import imgArrowBigLeftLightGrey from '@inlineimage/Application/d.Extranet/2_School/PC/Modules/ClassAndPupil/Class/ImportPupilPopUp/arrow_big_left_lightgrey.svg?inline';
import imgArrowLeft from '@inlineimage/Application/d.Extranet/2_School/PC/Modules/ClassAndPupil/Class/ImportPupilPopUp/arrow_left.svg?inline';
import imgArrowRight from '@inlineimage/Application/d.Extranet/2_School/PC/Modules/ClassAndPupil/Class/ImportPupilPopUp/arrow_right.svg?inline';
import imgCloseBig from '@inlineimage/Application/d.Extranet/2_School/PC/Modules/ClassAndPupil/Class/ImportPupilPopUp/close_big.svg?inline';
import imgCloseBigLightGrey from '@inlineimage/Application/d.Extranet/2_School/PC/Modules/ClassAndPupil/Class/ImportPupilPopUp/close_big_lightgrey.svg?inline';
import imgDownloadLightGrey from '@inlineimage/Application/d.Extranet/2_School/PC/Modules/ClassAndPupil/Class/ImportPupilPopUp/download_lightgrey.svg?inline';
import imgNavDot from '@inlineimage/Application/d.Extranet/2_School/PC/Modules/ClassAndPupil/Class/ImportPupilPopUp/nav_dot.svg?inline';
import imgNavDotActive from '@inlineimage/Application/d.Extranet/2_School/PC/Modules/ClassAndPupil/Class/ImportPupilPopUp/nav_dot_active.svg?inline';


/**
 * @name ImportPupilPopUp
 * @param {*} props props
 * @summary Returns the required jsx for component
 * @returns {*} jsx
 */
const ImportPupilPopUp = (props) => {

    /**
     * @name Initializing Reducer
     * @summary Provides state and dispatch.
     */
    const [state, dispatch] = useReducer(ExtranetBase_Hook.Reducer, ImportPupilPopUp_Hook.GetInitialState());

    /**
     * @name Assigning objContext
     * @summary Groups state, props and dispatch and module object in to object, which can be passed across method in the module and used 
     */
    let objContext = { state, props, dispatch, ["ImportPupilPopUp_ModuleProcessor"]: new ImportPupilPopUp_ModuleProcessor() };

    /**
    * @name  Initialize
    * @param {object} props Props
    * @param {object} ModuleProcessor Props
    * @summary Initializing DynamicStyles and Data for SSR
    * @returns Setting ApplicationState
    */
    objContext.ImportPupilPopUp_ModuleProcessor.Initialize(objContext, objContext.ImportPupilPopUp_ModuleProcessor);

    /**
     * @summary Stores the information of the file uploaded.
     */
    const domFileUploadRef = useRef(null);

    /**
     * @name Initialize
     * @summary Initialize Custom hooks
     */
    ImportPupilPopUp_Hook.Initialize(objContext);

    /**
     * @name GetContent
     * @summary Returns the required jsx for component
     * @returns {*} jsx
     */
    function GetContent() {
        let objClassTextResource = props.Resource.Text.objClassTextResource;
        let objTextResourceForPupil = props.Resource.Text.objPupilTextResource
        let strClassId = props.Data.ClassData["uClassId"];
        let strFileName = Localization.TextFormatter(objTextResourceForPupil, 'PupilExportImportFileName');
        let strStreamFileApiUrl = "API/Framework/Services/StreamFile/GetData";
        let iStateId = objContext.ImportPupilPopUp_ModuleProcessor.GetStateIdByApplicationType(objContext);

        return (
            <div className="importdata-wrapper">
                <div className="import-header">
                    <div className="import-header-title">
                        <span>{Localization.TextFormatter(objClassTextResource, 'Heading')}</span>
                        <img src={imgCloseBig} alt="" onClick={e => { Popup.ClosePopup(props.Id); }} />
                    </div>
                </div>

                <div className={state.classContent}>
                    <div className="popup-content">
                        <span>{Localization.TextFormatter(objClassTextResource, 'SubHeading1')}</span>
                        <p>{Localization.TextFormatter(objClassTextResource, 'SubHeading1Description1')}<br />{Localization.TextFormatter(objClassTextResource, 'SubHeading1Description2')}</p>
                        <span className="download-button">
                            <a href={JConfiguration.BaseUrl + "API/Framework/Services/StreamFile/?sessionkey=" + JConfiguration.SessionKey + "&FileName=" + strFileName + "&DisplayFileName=" + strFileName + "&ClassName=Arcadix.Object.Extranet.Pupil.Pupil,Arcadix.Object&MethodName=ExportPupilInformation&MethodParams={'ClassId':'" + strClassId + "','ImportExcelName': 'PupilExportTemp.xlsx','StateId':'" + iStateId + "'}"}>
                                {Localization.TextFormatter(objClassTextResource, 'ImportPupilExcelFileText')}
                                <img src={imgDownloadLightGrey} />
                            </a>
                        </span>
                    </div>

                    <div className="popup-navigation">
                        <div className="popup-navigation-directions">
                            <span className="direction-icons"><img src={imgArrowBigLeftLightGrey} alt="" /> </span>
                            <span><img src={imgCloseBigLightGrey} alt="" onClick={e => { Popup.ClosePopup(props.Id); }} /></span>
                            <span onClick={() => objContext.ImportPupilPopUp_ModuleProcessor.ShowNextSlide(objContext)} className="back-direction-icons">
                                <img src={imgArrowRight} alt="" />
                            </span>
                        </div>
                        <div className="popup-navigation-dots">
                            <span><img src={imgNavDotActive} alt="" /></span>
                            <span><img src={imgNavDot} alt="" /> </span>
                        </div>
                    </div>
                </div>

                {/*next slide*/}
                <div className={state.classNextSlideContent}>
                    <div className="popup-content">
                        <span>{Localization.TextFormatter(objClassTextResource, 'SubHeading2')}</span>
                        <p className="font-content-size">{Localization.TextFormatter(objClassTextResource, 'SubHeading2Description')}</p>
                        <span>{Localization.TextFormatter(objClassTextResource, 'SubHeading3')}</span>
                        <p className="font-content-size">{Localization.TextFormatter(objClassTextResource, 'SubHeading3Description')}</p>
                        {
                            !state.blnShowReportHref ?
                                <FileUpload
                                    Id="FileUpload_ImportPupil"
                                    ref={domFileUploadRef}
                                    Resource={objContext.ImportPupilPopUp_ModuleProcessor.GetResourceData(objClassTextResource)}
                                    Meta={objContext.ImportPupilPopUp_ModuleProcessor.GetMetaData()}
                                    ParentProps={{ ...props }}
                                    Data={{
                                        FileData: []
                                    }}
                                />
                                : state.blnIsReportGenerated ?
                                    <a href={state.strReportFilePath}>{objClassTextResource["ReportFileDisplayName"]}</a>
                                    : <React.Fragment />
                        }

                    </div>
                    <div className="popup-navigation">
                        {
                            state.blnIsFileUploadAttempted && state.objFileImported ? <a href={state.objFileImported["ReportFilePath"]}>{Localization.TextFormatter(objClassTextResource, 'FileName')}</a> : <React.Fragment />
                        }
                        <div className="popup-navigation-directions">
                            <span onClick={() => { if (!state.blnIsReportGenerated) { objContext.ImportPupilPopUp_ModuleProcessor.ShowPreviousSlide(objContext); } }} className="direction-icons"><img src={imgArrowLeft} alt="" /> </span>
                            <span><img src={imgCloseBigLightGrey} alt="" onClick={e => { Popup.ClosePopup(props.Id); }} /></span>
                            {
                                !state.blnIsReportGenerated ?
                                    !state.blnIsFileUploadAttempted ?
                                        <button className="close-popup back-direction-icons" onClick={() => { objContext.ImportPupilPopUp_ModuleProcessor.ImportData(objContext, domFileUploadRef.current.GetUploadedFileDetails()); }}>{Localization.TextFormatter(objClassTextResource, 'ImportDataButtonText')}</button>
                                        :
                                        <button className="close-popup back-direction-icons disabled-button" disabled>{Localization.TextFormatter(objClassTextResource, 'ImportDataButtonText')}</button>
                                    :
                                    <button className="close-popup back-direction-icons" onClick={(e) => { Popup.ClosePopup(props.Id); }}>{Localization.TextFormatter(objClassTextResource, 'CloseButtonText')}</button>
                            }
                        </div>
                        <div className="popup-navigation-dots">
                            <span><img src={imgNavDot} alt="" /></span>
                            <span><img src={imgNavDotActive} alt="" /> </span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <React.Fragment>{props.isLoadComplete || state.isLoadComplete ? GetContent() : <React.Fragment />}</React.Fragment>
    );
};

export default connect(ExtranetBase_Hook.MapStoreToProps(ImportPupilPopUp_ModuleProcessor.StoreMapList()))(ImportPupilPopUp);
