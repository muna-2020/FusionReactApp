import React from "react";

//Inline Images import
import CloseImage from '@inlineimage/Application/d.Extranet/5_Shared/PC/close.svg?inline';
import PDFIconImage from '@inlineimage/Application/d.Extranet/5_Shared/PC/Icon_Pdf.gif?inline';


const AllPdfTest = props => {
    let objTextResource = props.TextResource;

    function GetDownloadLink(objFileInfo) {
        let strStreamFileApiUrl = "API/Framework/Services/StreamFile";
        let strFileDownloadUrl = props.JConfiguration.BaseUrl + strStreamFileApiUrl + "?sessionkey=" + JConfiguration.SessionKey + "&FileName=" + objFileInfo["FileName"] + "&DisplayFileName=" + objFileInfo["FileName"] + ".pdf" + "&ClassName=Arcadix.Extranet.Teacher.TestLogins_Module,Arcadix.Extranet&MethodName=ExportOptionalPdfFile&MethodParams={FileName:'" + objFileInfo["FileName"] + "',uTestId:'" + objFileInfo["TestId"] + "',Type:'" + objFileInfo["Type"] + "'}";
        return (
            <li>
                <img src={PDFIconImage} alt="" />
                <a href={strFileDownloadUrl} className="not-downloaded">
                    {objFileInfo["FileName"]}
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
                        HeaderIds: ["Header", "SubNavigation", "TopSpace"],
                        FooterIds: ["FooterTestLogins"]
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
                            <ul>
                                {
                                    props.Data.map(objTempData => {
                                        return GetDownloadLink(objTempData);
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                </WrapperComponent>
            </div>
        </div>
    );
};

export default AllPdfTest;
