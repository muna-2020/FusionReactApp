// React related import
import React from 'react';

//Base classes/hooks
import * as EditorBase_Hook from '@shared/Framework/BaseClass/EditorBaseClass/EditorBase_Hook';

//BaseCMSElement import.
import * as BaseCMSElement from "@shared/Framework/BaseClass/EditorBaseClass/BaseCMSElement";

//Module related files
import ImageManagement_ModuleProcessor from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSImage/CMSImage_Editor/CMSImageAddEdit/ImageManagement/ImageManagement_ModuleProcessor';

const ImageManagement_ImageDetails = (props) => {

    /**
     * @name  InitializeCss
     * @param {object} props Props
     * @param {object} ModuleProcessor Props
     * @summary Initializing DynamicStyles
     * @returns Setting ApplicationState
    */
    EditorBase_Hook.InitializeCss(props, new ImageManagement_ModuleProcessor());

    /**
     * @name GetPreviewAndImageDisplay
     * */
    const GetPreviewAndImageDisplay = () => {
        if (!props.HideImage) {
            return (
                <div>
                    <h2>{props.TextResource["Preview"]}</h2>
                    <img
                        src={`${props.JConfiguration.WebDataPath}Repo/Image/${props.JConfiguration.MainClientId}/${props.ElementDetails.iElementId}_Image_${props.ElementDetails.vElementJson["iImageFileVersion"]}.${props.ElementDetails.vElementJson["vImageType"]}`}
                        alt={props.ElementDetails["vElementImageName"]}
                    />
                </div>
            );
        }
        else {
            return (null);
        }
    };

    const GetContent = () => {
        return (
            <div className="object-detail-image-properties">
                <h2>{props.TextResource["Image_Title"]}</h2>
                <h3>{props.TextResource["Image_Properties"]}</h3>
                <table>
                    <tr>
                        <td>{props.TextResource["Name"]}:</td>
                        <td>{props.ElementDetails["vElementJson"]["vImageName"]}</td>
                    </tr>
                    <tr>
                        <td>{props.TextResource["FileType_Text"]}:</td>
                        <td>{props.ElementDetails["vElementJson"]["vImageType"]}</td>
                    </tr>
                    <tr>
                        <td>{props.TextResource["FileSize_Text"]}:</td>
                        <td>{props.ElementDetails["vElementJson"]["iImageFileSize"]}</td>
                    </tr>
                    <tr>
                        <td>{props.TextResource["Title_Text"]}:</td>
                        <td>{props.ElementDetails["vElementJson"]["vElementImageTitle"] !== "" ? props.ElementDetails["vElementJson"]["vElementImageTitle"] : "NA"}</td>
                    </tr>
                    <tr>
                        <td>{props.TextResource["ShowTitle_Text"]}:</td>
                        <td>{props.ElementDetails["vElementJson"]["cShowTitle"] === "N" ? props.TextResource["No"] : props.TextResource["Yes"]}</td>
                    </tr>
                    <tr>
                        <td>{props.TextResource["ShowDescription_Text"]}:</td>
                        <td>{props.ElementDetails["vElementJson"]["cShowDescription"] === "N" ? props.TextResource["No"] : props.TextResource["Yes"]}</td>
                    </tr>
                    <tr>
                        <td>{props.TextResource["Druckversion"]}:</td>
                        <td>{props.ElementDetails["vElementJson"]["cIsHighResolution"] === "N" ? props.TextResource["No"] : props.TextResource["Yes"]}</td>
                    </tr>

                    <tr>
                        <td>{props.TextResource["Created_On"]}:</td>
                        <td>{BaseCMSElement.GetDate(props.ElementDetails["dtCreatedOn"])}</td>
                    </tr>
                    <tr>
                        <td>{props.TextResource["Edited_On"]}:</td>
                        <td>{BaseCMSElement.GetDate(props.ElementDetails["dtModifiedOn"])}</td>
                    </tr>
                </table>
                <h3>{props.TextResource["Description"]}:</h3>
                <p>{props.ElementDetails["vElementJson"]["cShowDescription"] === "Y" ? props.ElementDetails["vElementJson"]["vElementImageDescription"] : "-"}</p>
                {
                    GetPreviewAndImageDisplay()
                }
            </div>
        );
    };

    return GetContent();
};

/**
 * @name ImageManagement_ImageDetails.DynamicStyles
 * @param {object} props props
 * @summary required for loading css
 * @returns {Array}Styles array
 */
ImageManagement_ImageDetails.DynamicStyles = (props) => {
    return [
        props.JConfiguration.EditorSkinPath + "/Css/Application/ReactJs/PC/Modules/6_CMSElement/CMSImage/CMSImageAddEdit/ImageManagement_ImageDetails/ImageManagement_ImageDetails.css"
    ];
};

export default ImageManagement_ImageDetails;
