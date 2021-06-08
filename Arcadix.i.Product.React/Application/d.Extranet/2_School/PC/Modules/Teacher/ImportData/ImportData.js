//React related imports.
import React, { useRef, useReducer } from 'react';
import { connect } from 'react-redux';

//Module related files.
import * as ImportData_Hook from '@shared/Application/d.Extranet/2_School/PC/Modules/Teacher/ImportData/ImportData_Hook';
import ImportData_ModuleProcessor from '@shared/Application/d.Extranet/2_School/PC/Modules/Teacher/ImportData/ImportData_ModuleProcessor';

//Components used in module.
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
* @name ImportData
* @param {object} props props
* @summary This component opens up in a popup and can add multiple teachers using excell files.
* @returns {object} div that has file upload option.
*/
const ImportData = (props) => {

    /**
    * @name objTextResource
    * @summary gets TextResource from props that is passed in events
    * @returns {object} TextResource object
    */
    var objTextResource = props.Resource.Text;

    /**
    * @name [state,dispatch]
    * @summary Define state and dispatch for the reducer to set state.
    * @returns {[]} state and dispatch
    */
    const [state, dispatch] = useReducer(ExtranetBase_Hook.Reducer, ImportData_Hook.GetInitialState(objTextResource));

    /**
    * @name objContext
    * @summary Groups state, dispatch and module object(s) in objContext.
    * @returns {object} objContext
    */
    let objContext = { state, props, dispatch, ["ImportData_ModuleProcessor"]: new ImportData_ModuleProcessor() };

    /**
    * @name  Initialize
    * @param {object} props Props
    * @param {object} ModuleProcessor Props
    * @summary Initializing DynamicStyles and DataForSSR
    * @returns Setting ApplicationState
    */
    objContext.ImportData_ModuleProcessor.Initialize(objContext, objContext.ImportData_ModuleProcessor);

    /**
    * @name domFileUploadRef
    * @summary creates a reference
    * @returns {object} reference
    */
    const domFileUploadRef = useRef(null);
        
    /**
    * @name Initialize
    * @param {object} objContext context object
    * @summary Initialize method call in ImportData_Hook, that contains all the custom hooks.
    * @returns null
    */
    ImportData_Hook.Initialize(objContext);

    /**
    * @name strReportExcelDisplayName
    * @summary gets Report Excel Display Name
    * @returns {String} strReportExcelDisplayName
    */
    const strReportExcelDisplayName = Localization.TextFormatter(objTextResource, 'ImportExcelDisplayName');

    return (
        <div className="importdata-wrapper">
            <div className="import-header">
                <div className="import-header-title">
                    <span>{Localization.TextFormatter(objTextResource, 'importData_Header')}</span>
                    <img src={imgCloseBig} alt="" onClick={e => { Popup.ClosePopup(props.Id); ApplicationState.SetProperty("blnShowAnimation", false); }} />
                </div>
            </div>

            <div className={state.strClassContent}>
                <div className="popup-content">
                    <span>{Localization.TextFormatter(objTextResource, 'importData_stepOneHeader')} </span>
                    <p style={{ maxWidth: "680px" }}>{Localization.TextFormatter(objTextResource, 'importData_stepOneContent')}</p>
                    <span className="download-button">
                        <a href={JConfiguration.BaseUrl + "API/Framework/Services/StreamFile/?sessionkey=" + JConfiguration.SessionKey + "&FileName=WorkLog.xlsx&DisplayFileName=" + "VorlageLehrpersonen.xlsx" + "&ClassName=Arcadix.Extranet.School.Teacher_Module,Arcadix.Extranet&MethodName=ExportTeacherInformation&MethodParams={'SchoolId':'" + ClientUserDetails.UserId + "','ImportExcelName': 'TeacherExportTemp.xlsx'}"}>Vorlage_Lehrpersonen.xls</a>
                        <img src={imgDownloadLightGrey} /></span>
                </div>

                <div className="popup-navigation">
                    <div className="popup-navigation-directions">
                        <span className="direction-icons"><img src={imgArrowBigLeftLightGrey} alt="" /> </span>
                        <span><img src={imgCloseBigLightGrey} alt="" onClick={e => { Popup.ClosePopup(props.Id); }} /></span>
                        <span onClick={() => objContext.ImportData_ModuleProcessor.ShowNextSlide(objContext)} className="back-direction-icons"><img src={imgArrowRight} alt="" /> </span>
                    </div>
                    <div className="popup-navigation-dots">
                        <span><img src={imgNavDotActive} alt="" /></span>
                        <span><img src={imgNavDot} alt="" /> </span>
                    </div>
                </div>
            </div>

            {/*next slide*/}
            <div className={state.strClassNextSlideContent}>
                <div ref={domFileUploadRef} className="popup-content">
                    <span>{Localization.TextFormatter(objTextResource, 'importData_stepTwoHeader')}</span>
                    <p className="font-content-size">{Localization.TextFormatter(objTextResource, 'importData_stepTwoContent')}</p>
                    <span>{Localization.TextFormatter(objTextResource, 'importData_stepThreeHeader')}</span>
                    <p className="font-content-size">{Localization.TextFormatter(objTextResource, 'importData_stepThreeContent')}</p>
                    {
                        !state.blnShowReportHref ?
                            <FileUpload
                                Id="FileUpload_ImportData"
                                ref={domFileUploadRef}
                                Resource={objContext.ImportData_ModuleProcessor.GetResourceData(objContext, objTextResource)}
                                Meta={objContext.ImportData_ModuleProcessor.GetMetaData()}
                                ParentProps={{ ...props }}
                                Data={{
                                    FileData: []
                                }}
                            />
                            : state.blnIsReportGenerated ?
                                <a href={state.strReportFilePath}>{strReportExcelDisplayName}</a>
                                : <React.Fragment />
                    }
                </div>
                <div className="popup-navigation">
                    {
                        state.blnIsFileUploadAttempted && state.objFileImported && state.objFileImported["ReportFilePath"] ? <a href={state.objFileImported["ReportFilePath"]}>{Localization.TextFormatter(objTextResource, 'FileName')}</a> : <React.Fragment />
                    }
                    <div className="popup-navigation-directions">
                        <span onClick={() => { if (!state.blnIsReportGenerated) { objContext.ImportData_ModuleProcessor.ShowPreviousSlide(objContext); } }} className="direction-icons"><img src={imgArrowLeft} alt="" /> </span>
                        <span ><img src={imgCloseBigLightGrey} alt="" onClick={e => { Popup.ClosePopup(props.Id); }} /></span>
                        {
                            !state.blnIsReportGenerated ?
                                !state.blnIsFileUploadAttempted ?
                                    <button className="close-popup back-direction-icons" onClick={() => { objContext.ImportData_ModuleProcessor.ImportData(objContext, domFileUploadRef.current.GetUploadedFileDetails()); }}>{Localization.TextFormatter(objTextResource, 'ImportData_UploadFile')}</button> //upload
                                    :
                                    <button className="close-popup back-direction-icons disabled-button" disabled>{Localization.TextFormatter(objTextResource, 'ImportData_UploadFile')}</button> //upload attempted
                                :
                                <button className="close-popup back-direction-icons" onClick={(e) => { Popup.ClosePopup(props.Id); }}>{Localization.TextFormatter(objTextResource, 'ImportData_Close')}</button> //after upload finishes
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
};

/**
* @summary Calls mapStateToProps of ExtranetBase_Hook and exports the component.
*/
export default connect(ExtranetBase_Hook.MapStoreToProps(ImportData_ModuleProcessor.StoreMapList()))(ImportData);