import React from "react";

//Inline Images import
import ExcelIconImage from '@inlineimage/Application/d.Extranet/5_Shared/PC/excel_icon.gif?inline';
import PDFIconImage from '@inlineimage/Application/d.Extranet/5_Shared/PC/Icon_Pdf.gif?inline';
import CloseImage from '@inlineimage/Application/d.Extranet/5_Shared/PC/close.svg?inline';
import DeleteImage from '@inlineimage/Application/d.Extranet/5_Shared/PC/delete.svg?inline';

const AllPdfTest = props => {
    const { objContext, objTextResource, strClassId, arrClasses } = props;

    /**
    * @name ViewPupil
    * @param {string} strClassName Passes ClassName
    * @param {string} strOfflinePropcessExecutionId Passes OfflinePropcessExecutionId
    * @param {string} strFileName Passes FileName
    * @param {object} objTextResource Passes TextResource
    * @summary Forms the jsx for list of pupil whose logins are generated.
    * @returns {object} jsx, React.Fragment
    */
    function GetList(strOfflinePropcessExecutionId, strFileName, blnIsPdfFile) {
        let strCombinedFileName = strOfflinePropcessExecutionId + "/" + strFileName;
        let strStreamFileApiUrl = "API/Framework/Services/StreamFile";
        let strFileDownloadUrl = JConfiguration.BaseUrl + strStreamFileApiUrl + "?sessionkey=" + JConfiguration.SessionKey + "&FileName=" + strCombinedFileName + "&Type=Offline/HighStakeResult&DisplayFileName=" + strFileName;
        return (
            <React.Fragment>
                <ul>
                    <li>
                        <img src={blnIsPdfFile ? PDFIconImage : ExcelIconImage} alt="" />
                        <a href={strFileDownloadUrl} className="not-downloaded">
                            {strFileName}
                        </a>
                        <img onClick={() => { props.DeleteGeneratedOfflineProcessExecution(strOfflinePropcessExecutionId); }}
                            src={DeleteImage} alt="" />
                    </li>
                </ul>
            </React.Fragment>
        );
    }

    function GetFilesList(arrFiles, arrClasses, objTextResource, strEmptyMessage, blnIsPdfFile) {
        return <div className="pdf-list">
            {
                arrFiles.length > 0
                    ? arrClasses.map(objClass => {
                        return (
                            <div>
                                {
                                    arrFiles.find(objTempData => JSON.parse(objTempData["t_TestDrive_OfflineProcess_Execution_File"][0]["vFilter"])["ClassId"] == objClass["uClassId"])
                                        ? <div>
                                            <h4>
                                                {Localization.TextFormatter(objTextResource, 'ClassLabel')} {objClass["vClassName"]}
                                            </h4>
                                            {
                                                arrFiles
                                                    .filter(objTempData => JSON.parse(objTempData["t_TestDrive_OfflineProcess_Execution_File"][0]["vFilter"])["ClassId"] == objClass["uClassId"])
                                                    .map(objTempData => {
                                                        return GetList(objTempData["uOfflineProcessExecutionId"], objTempData["t_TestDrive_OfflineProcess_Execution_File"][0]["vFileName"], blnIsPdfFile);
                                                    })
                                            }
                                        </div>
                                        : <React.Fragment />
                                }
                            </div>
                        );
                    })
                    : <div className="no-data">{strEmptyMessage}</div>
            }
        </div>
    }

    return <div className="all-pdf-popup">
        <WrapperComponent
            ComponentName={"FillHeight"}
            Id="PupilLogin_Pdf"
            Meta={objContext.HighStakeTestResults_ModuleProcessor.GetPDFFillHeightMetaData()}
            ParentProps={{ ...props }}>
            <div className="all-pdf-popup-padd">
                <div className="all-pdf-popup-header">
                    <h3>{Localization.TextFormatter(objTextResource, 'PDFFilesHeader')}</h3>
                    <div className="close" onClick={(event) => { props.HandlePdfPopup(objContext); }}>
                        <span>{Localization.TextFormatter(objTextResource, 'ClosePopupText')}</span>
                        <img src={CloseImage} alt="" />
                    </div>
                </div>
                {
                    GetFilesList(props.Data.PDFFiles, arrClasses, objTextResource, Localization.TextFormatter(objTextResource, 'EmptyLoginListText'))
                }
                <div className="all-pdf-popup-header">
                    <h3>{Localization.TextFormatter(objTextResource, 'ValuesAsTable')}</h3>
                </div>
                {
                    GetFilesList(props.Data.ExcelFiles, arrClasses, objTextResource, Localization.TextFormatter(objTextResource, 'EmptyExcelText'))
                }

            </div>
        </WrapperComponent>
    </div>;
};

export default AllPdfTest;
