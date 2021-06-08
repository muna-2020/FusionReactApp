
// ArcadixFetchData class
import ArcadixFetchData from '@shared/Framework/DataService/ArcadixFetchData/ArcadixFetchData';

import * as CMSImage_Editor_MetaData from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSImage/CMSImage_Editor/CMSImage_Editor_MetaData";
import Object_TaskContent_CMSElement_CMSImage from "@shared/Object/e.Editor/TaskContent/3_CMSElement/CMSImage/CMSImage";

import * as UniqueId from "@root/Framework/Services/UniqueId/UniqueId";
/**
* @anme UploadImage
* @param {any} objFormData form object
* @returns {any} returns promise
*/
export const UploadImage = async (objFormData) => {
    var objUploadDataRequest = {
        URL: "API/Framework/Controls/FileUploadHandler/UploadFile",
        Params: objFormData
    };

    var objFileData = {};
    return new Promise((resolve, reject) => {
        fetch(JConfiguration.BaseUrl + objUploadDataRequest.URL + (objUploadDataRequest.URL.includes("?") ? "&" : "?") + 'sessionkey=' + JConfiguration.SessionKey,
            {
                method: "POST",
                body: objFormData,
                headers: new Headers({}),
                credentials: 'same-origin'
            }).then(response => response.json())
            .then(data => {
                objFileData = data;
                var intTemp = objFileData.FilePath.split('\\').indexOf("Temporary");
                var strDate = objFileData.FilePath.split('\\')[intTemp + 1];
                var strFileSrc = JConfiguration.WebDataPath + "Temporary/" + strDate + "/EmbededFileUpload/" + data.FileName;
                objFileData = { ...objFileData, "FileSrc": strFileSrc };
                resolve(objFileData);
            }).catch(err => { reject(err); });
    });
};

/**
 * @name SaveImage
 * @param {Object} objElementJson image element json
 * @param {Object} objImage croppped image details 
 * @returns {any} returns promise
 */
export const SaveImage = async (objElementJson, objImage) => {
    let objImageDetails = { ...objElementJson, ["ImageDetails"]: objImage };
    return new Promise((resolve, reject) => {
        //API call for EditData
        Object_TaskContent_CMSElement_CMSImage.EditData(objImageDetails, (objReturnData) => {
            if (objReturnData?.[0]?.["iElementId"]) {
                resolve(objReturnData[0]);
            }
            else {
                console.log("IMAGE_UPLOAD_ERROR"); //CHECK
                reject(false);
            }
        }, true);
    });
};


/**
* @name DataURItoBlob
* @param {String} dataURI image data URI
* @returns {Object} retuns blob object
*/
export const DataURItoBlob = (dataURI) => {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(dataURI.split(',')[1]);
    else
        byteString = unescape(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], { type: mimeString });
};


/**
* @name GetImagePath
* @param {object} ElementJson element json
* @returns {string} returns image path
*/
export const GetImagePath = (ElementJson) => {
    return ElementJson.dataURL ? ElementJson.dataURL : `${objContext.props.JConfiguration.WebDataPath}Repo/Image/${objContext.props.JConfiguration.MainClientId}/${ElementJson.iElementId}_Image_${ElementJson.vElementJson["iImageFileVersion"]}.${ElementJson.vElementJson["vImageType"]}`;
};

export const HandleUploadAndSaveImage = async (ElementJson, objSaveDetails = null) => {
    let dataURI = ElementJson.dataURL;
    let objBlob = DataURItoBlob(dataURI);
    var fileName = ElementJson["vElementJson"]["vElementImageFileName"];
    var arrSplit; var fileType;
    if (fileName) { // for old images.
        arrSplit = fileName.split(".");
        fileType = arrSplit[arrSplit.length - 1];
    }
    else if (ElementJson["vElementJson"]["vImageName"] && ElementJson["vElementJson"]["vImageType"]) {
        fileType = ElementJson["vElementJson"]["vImageType"];
        fileName = ElementJson["vElementJson"]["vImageName"] + "." + fileType;
    }
    else {
        fileType = "jpeg"; // default file type.
        fileName = `Default_${ElementJson["vElementJson"]["iElementId"]}.jpeg`;
    }
    if (ElementJson.blnScreenShotPaste) {
        fileType = objBlob["type"].split('/')[1];
        fileName = `ScreenShot_${ElementJson.iElementId}.${fileType}`;
    }
    var formData = new FormData();
    formData.append("files[0]", objBlob, fileName);
    var objMetaData = {
        "chunkIndex": 0,
        "contentType": fileType,
        "fileName": fileName,
        "relativePath": fileName,
        "totalFileSize": objBlob.size,
        "totalChunks": 1,
        "uploadUid": UniqueId.GetUniqueId()
    };
    formData.append("metaData", JSON.stringify(objMetaData));
    let response = await UploadImage(formData);
    let objElementJson;
    objElementJson = {
        ...ElementJson, ["vElementJson"]: { ...ElementJson["vElementJson"], ["cIsFileChanged"]: "Y" }
    };
    if (objSaveDetails) {
        if (!objSaveDetails.blnSaveAsGlobal) {
            objElementJson = CMSImage_Editor_MetaData.GetDefaultElementJson(ElementJson.iOrder);
            if (objSaveDetails.ImageDetails.cIsFusionVersion) {
                objElementJson["cIsFusionVersion"] = objSaveDetails.ImageDetails["cIsFusionVersion"];
            }
            objElementJson = {
                ...objElementJson, ["vElementJson"]: {
                    ...objElementJson["vElementJson"], ["intPreviousFolderId"]: ElementJson.iFolderID
                }
            };
        }
        else {
            if (objSaveDetails.blnSaveAsNew) {
                objElementJson = CMSImage_Editor_MetaData.GetDefaultElementJson(ElementJson.iOrder);
                if (objSaveDetails.ImageDetails.cIsFusionVersion) {
                    objElementJson["cIsFusionVersion"] = objSaveDetails.ImageDetails["cIsFusionVersion"];
                }
                var intFolderId;
                if (objSaveDetails["FolderDetails"]) {
                    intFolderId = objSaveDetails["FolderDetails"]["iFolderId"] ? objSaveDetails["FolderDetails"]["iFolderId"] : objSaveDetails["FolderDetails"]["iFolderID"];
                }
                else {
                    intFolderId = ElementJson.iFolderID;
                }
                if (objSaveDetails["ImageDetails"]) {
                    objElementJson = { ...objElementJson, ["vElementJson"]: objSaveDetails["ImageDetails"]["vElementJson"] };
                }
                objElementJson = { ...objElementJson, ["iFolderID"]: intFolderId };
            }
        }
    }
    let objUpdatedImage = await SaveImage(objElementJson, response);
    return objUpdatedImage;
};

export const handleImageSaveDetails = async (ElementJson, objSaveDetails) => {
    let response = await HandleUploadAndSaveImage(ElementJson, objSaveDetails);
    return response;
};

export const HandleImageSavePopup = (ElementJson) => {
    return new Promise((resolve, reject) => {
        editorPopup.ShowPopup({
            "Data": {
                "imagePath": GetImagePath(ElementJson),
                "ElementJson": ElementJson,
                "blnImageFound": ElementJson.blnScreenShotPaste ? false : true
            },
            "Meta": {
                "PopupName": "ImageSavePopup",
                "Height": '276px',
                "Width": '402px',
                "ShowHeader": false,
                "ShowCloseIcon": true,
                "ShowToggleMaximizeIcon": true,
            },
            "Resource": {
                "Text": {},
                "SkinPath": JConfiguration.IntranetSkinPath
            },
            "Events": {},
            "CallBacks": {
                GetSaveDetails: async (objSaveDetails) => {
                    ApplicationState.SetProperty("blnShowAnimation", true);
                    let response = await handleImageSaveDetails(ElementJson, objSaveDetails);
                    resolve(response);
                    ApplicationState.SetProperty("blnShowAnimation", false);
                    //editorPopup.ClosePopup(objContext.props.Id);
                }
            }
        });
    });
};