
// ArcadixFetchData class
import ArcadixFetchData from '@shared/Framework/DataService/ArcadixFetchData/ArcadixFetchData';

import * as CMSAudio_Editor_MetaData from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSAudio/CMSAudio_Editor/CMSAudio_Editor_MetaData";
import Object_TaskContent_CMSElement_CMSAudio from "@shared/Object/e.Editor/TaskContent/3_CMSElement/CMSAudio/CMSAudio";

import * as UniqueId from "@root/Framework/Services/UniqueId/UniqueId";
/**
* @anme UploadAudio
* @param {any} objFormData form object
* @returns {any} returns promise
*/
export const UploadAudio = async (objFormData) => {
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
 * @name SaveAudio
 * @param {Object} objElementJson Audio element json
 * @param {Object} objAudio croppped Audio details 
 * @returns {any} returns promise
 */
export const SaveAudio = async (objElementJson, objAudio) => {
    let objAudioDetails = {
        ...objElementJson,
        ["AudioDetails"]: objAudio,
        ["cIsDefaultPathChanged"]: "Y",
        ["FileObjectDetails"]: { "Name": "AudioRecorder", "FolderName": "AudioRecoder", "PathName": "" }
    };
    return new Promise((resolve, reject) => {
        //API call for EditData
        Object_TaskContent_CMSElement_CMSAudio.EditData(objAudioDetails, (objReturnData) => {
            if (objReturnData?.[0]?.["iElementId"]) {
                resolve(objReturnData[0]);
            }
            else {
                console.log("Audio_UPLOAD_ERROR"); //CHECK
                reject(false);
            }
        }, true);
    });
};

/**
 * @name HandleUploadAndSaveAudio
 * @param {any} ElementJson
 * @param {any} objSaveDetails
 */
export const HandleUploadAndSaveAudio = async (objectURL) => {
    var objBlob = await fetch(objectURL).then(r => r.blob());
    var objElementJson = CMSAudio_Editor_MetaData.GetDefaultElementJson(0);
    var fileName = `AudioRecording_${objElementJson["iElementId"]}.mp3`;
    objElementJson = {
        ...objElementJson, "cIsDisplayedInElementTree": "N", "vElementJson": {
            ...objElementJson.vElementJson,
            "vAudioName": fileName
        }
    }
    var formData = new FormData();
    formData.append("files[0]", objBlob, fileName);
    var objMetaData = {
        "chunkIndex": 0,
        "contentType": "mp3",
        "fileName": fileName,
        "relativePath": fileName,
        "totalFileSize": objBlob.size,
        "totalChunks": 1,
        "uploadUid": UniqueId.GetUniqueId()
    };
    formData.append("metaData", JSON.stringify(objMetaData));
    let response = await UploadAudio(formData);
    let objUpdatedAudio = await SaveAudio(objElementJson, response);
    return objUpdatedAudio;
};

