import React, { useState, useEffect } from "react";

/**
 * @name AudioAndVideoRecording
 * @param {any} props
 * @summary Sample module for AudioVideo recording.
 */
const AudioAndVideoRecording = (props) => {
    
    //Get Media recorder object
    let objMediaRecorder;
    let chunks = [];
    let [blnDownloadFileLocally, setDownloadFileLocally] = useState(true);


    useEffect(() => {
        let constraintObj = {
            audio: true,
            video: {
                facingMode: "user",
                width: { min: 640, ideal: 1280, max: 1920 },
                height: { min: 480, ideal: 720, max: 1080 }
            }
        };
        // width: 1280, height: 720  -- preference only
        // facingMode: {exact: "user"}
        // facingMode: "environment"

        //handle older browsers that might implement getUserMedia in some way
        if (navigator.mediaDevices === undefined) {
            navigator.mediaDevices = {};
            navigator.mediaDevices.getUserMedia = function (constraintObj) {
                let getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
                if (!getUserMedia) {
                    return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
                }
                return new Promise(function (resolve, reject) {
                    getUserMedia.call(navigator, constraintObj, resolve, reject);
                });
            }
        } else {
            navigator.mediaDevices.enumerateDevices()
                .then(devices => {
                    devices.forEach(device => {
                        console.log(device.kind.toUpperCase(), device.label);
                        //, device.deviceId
                    })
                })
                .catch(err => {
                    console.log(err.name, err.message);
                })
        }

        navigator.mediaDevices.getUserMedia(constraintObj)
            .then(function (mediaStreamObj) {
                //connect the media stream to the first video element
                let video = document.querySelector('video');
                if ("srcObject" in video) {
                    video.srcObject = mediaStreamObj;
                } else {
                    //old version
                    video.src = window.URL.createObjectURL(mediaStreamObj);
                }

                video.onloadedmetadata = function (ev) {
                    //show in the video element what is being captured by the webcam
                    video.play();
                };

                //add listeners for saving video/audio
                let start = document.getElementById('btnStart');
                let stop = document.getElementById('btnStop');
                let vidSave = document.getElementById('vid2');
                objMediaRecorder = new MediaRecorder(mediaStreamObj);

                objMediaRecorder.ondataavailable = (objEvent) => {
                    chunks.push(objEvent.data);
                };

                objMediaRecorder.onstop = (objEvent) => {
                    let blob = new Blob(chunks, { 'type': 'video/mp4;' });
                    chunks = [];
                    let videoURL = window.URL.createObjectURL(blob);
                    if (!blnDownloadFileLocally) {
                        UploadFiles(videoURL);
                    }

                    vidSave.src = videoURL;
                }
            })
            .catch(function (err) {
                console.log(err.name, err.message);
            });
    }, []);

    /**
    * @name UploadFiles
    * @param {*} e event object
    * @summary sets the loacl state with the details of the uploaded files and calls the API to upload the File.
    */
    const UploadFiles = async (strFileName) => {
        const file = strFileName;
        var className = props.Data.ClassName ;
        var methodName = props.Data.MethodName ;
        const chunkSize = 10485760; // max size 10mb //4194304; // max size 4mb
        const url = ParentProps.JConfiguration.BaseUrl + "API/Framework/Controls/FileUploadHandler/UploadFile" + '?sessionkey=' + JConfiguration.SessionKey;
        var intTotalChunks = Math.ceil(file.size / chunkSize);
        var chunkIndex = 0;
        var uploadUid = UniqueId.GetUniqueId();
        var fileName = file.name;
        var objFileData;
        for (let start = 0; start < file.size; start += chunkSize) {
            var objMetaData = {
                "chunkIndex": chunkIndex,
                "contentType": file.type,
                "fileName": fileName,
                "relativePath": fileName,
                "totalFileSize": file.size,
                "totalChunks": intTotalChunks,
                "uploadUid": uploadUid
            };
            chunkIndex = chunkIndex + 1;
            const chunk = file.slice(start, start + chunkSize);
            const fd = new FormData(); 
            fd.append(`files[${i}]`, chunk);
            fd.append("metaData", JSON.stringify(objMetaData));
            fd.append("ClassName", className);
            fd.append("MethodName", methodName);


            var r = await fetch(url, {
                method: 'POST',
                body: fd,
                headers: new Headers({}),
                credentials: 'same-origin'
            });

            var data = await r.json();
            uploadUid = data["UploadUid"];
            objFileData = data;
            console.log("Completed" + Math.floor((chunkIndex / intTotalChunks) * 100) + "%");
        }
        var intTemp = objFileData.FilePath.split('\\').indexOf("Temporary");
        var strDate = objFileData.FilePath.split('\\')[intTemp + 1];
        let arrFileData = [...state.arrFileData, objFileData];
        var strFileSrc = props.ParentProps.JConfiguration.WebDataPath + "Temporary/" + strDate + "/EmbededFileUpload/" + data.FileName;
        objFileData = { ...objFileData, "FileSrc": strFileSrc };
        props.CallBacks && props.CallBacks.OnUploadComplete ? props.CallBacks.OnUploadComplete(objFileData, arrFileData) : () => { };

    };

    const StartRecording = () =>{
        if(objMediaRecorder)
            {
               objMediaRecorder.start();
            }
    }
    
    const StopRecording = () =>{
        if(objMediaRecorder)
            {
               objMediaRecorder.stop();
            }
    }

    const onClickCheckbox = (strType) => {
        if (strType == "DownloadFileLocally") {
            setDownloadFileLocally(true);
        }
        else
        {
            setDownloadFileLocally(false);
        }
    }

    const GetContent = () => {
        
        return (
            <React.Fragment>
                <div>
                    <div>
                        <span>{"Record Video:"}</span>
                    </div>
                    <div>
                        <video controls></video>
                        <br/>
                        <span>
                            <button id="btnStart" title="Start" onClick={() => { StartRecording() }}>&#9654;</button>&nbsp;&nbsp;   
                            <button id="btnStop" title="Stop" onClick={() => { StopRecording() }}>&#9208;</button>
                        </span>
                    </div>
                    <div>
                        <span>{"DownloadFileLocally"}<input checked={blnDownloadFileLocally} type="radio" value="Active" onClick={() => { onClickCheckbox("DownloadFileLocally")}} />
                            {"UpdalodToServer"}<input checked={!blnDownloadFileLocally} type="radio" onClick={() => { onClickCheckbox("UpdalodToServer") }} />
                        </span>
                        <br/>
                        <video id="vid2" controls></video>
                    </div>
                </div>
            </React.Fragment>
            );
    };

    return GetContent();
}

export default AudioAndVideoRecording;