import React from "react";

//Inline Images import
import CloseImage from '@inlineimage/Application/d.Extranet/5_Shared/PC/close.svg?inline';
import PDFIconImage from '@inlineimage/Application/d.Extranet/5_Shared/PC/Icon_Pdf.gif?inline';


const AllPdfTest = props => {
    let objTextResource = props.TextResource;
    let arrFileData = props.Data.filter(objFileData => objFileData["t_TestDrive_OfflineProcess_Execution_File"].length > 0);

    function GetDownloadLink(objFileInfo) {
        let strFileName = objFileInfo["t_TestDrive_OfflineProcess_Execution_File"][0]["vFileName"];
        let strCombinedFileName = objFileInfo["uOfflineProcessExecutionId"] + "/" + strFileName;
        let strStreamFileApiUrl = "API/Framework/Services/StreamFile";
        let strFileDownloadUrl = JConfiguration.BaseUrl + strStreamFileApiUrl + "?sessionkey=" + JConfiguration.SessionKey + "&FileName=" + strCombinedFileName + "&Type=Offline/CompetencyPdf&DisplayFileName=" + strFileName;
        return (
            <li>
                <img src={PDFIconImage} alt="" />
                <a href={strFileDownloadUrl} className="not-downloaded">
                    {objFileInfo["t_TestDrive_OfflineProcess_Execution_File"][0]["vFileName"]}
                </a>
            </li>
        );
    }

    return (
        <div className="all-pdf-popup-wrapper">
            <div className="all-pdf-popup">
                <WrapperComponent
                    ComponentName={"FillHeight"}
                    Id="TestLoginFillHeight"
                    Meta={{
                        HeaderIds: ["Header", "TopSpace"],
                        FooterIds: ["FooterTestResults"]
                    }}
                    ParentProps={{ ...props }}
                >
                    <div className="all-pdf-popup-padd">
                        <div className="all-pdf-popup-header">
                            <h3>
                                {Localization.TextFormatter(objTextResource, 'AllPdfTestPopupHeading')}
                            </h3>
                            <div className="close" onClick={props.HandlePdfPopup}>
                                <span>{Localization.TextFormatter(objTextResource, 'AllPdfTestPopupCloseButton')}</span>
                                <img src={CloseImage} alt="" />
                            </div>
                        </div>
                        <div className="pdf-list">
                            {arrFileData.length > 0 ?
                                <ul>
                                    {arrFileData.map(objTempData => {
                                        return GetDownloadLink(objTempData);
                                    })}
                                </ul>
                                : <div className="no-data">{Localization.TextFormatter(objTextResource, 'EmptyPdfText')}</div>}
                        </div>
                    </div>
                </WrapperComponent>
            </div>
        </div>
    );
};

export default AllPdfTest;
