//react related imports
import React, { useState, useEffect } from "react";
import Peer from 'peerjs';
import { Recorder } from 'react-voice-recorder'

const PeerToPeerChatSample = () => {
    
    //local variables Get Media recorder object
    let objMediaRecorder;
    let chunks = [];

    //Local state objects
    var [lastPeerId, SetlastPeerId] = useState("");
    var [strSendMessage, SetSendMessage] = useState("");
    var [objFile, SetFile] = useState(null);
    var [blnIsConnectionOpen, SetIsConnectionOpen] = useState(false);
    var [blnSetRecordVideo, SetRecordVideo] = useState(false);
    var [objAudioDetails, SetAudioDetails] = useState({});
    var [blnSetRecordAudio, SetRecordAudio] = useState(true);
    var [blnIsStartClicked, SetIsStartClicked] = useState(true);

    /**
     * @summary used for initialization.
     */
    useEffect(() => {
        window.objPeer = null; // own peer object
        window.objConnection = null;
        Initialization();
    }, []);

    /**
     * @summary used for media video initialization.
     */
    useEffect(() => {
        MediaInitialization();
    }, [blnSetRecordVideo]);

    /**
     * @summary used for media video initialization.
     */
    useEffect(() => {
        AudioInitialization();
    }, [blnSetRecordAudio]);

    const AudioInitialization = () => {
        if (document.getElementsByClassName("_1dpop").length > 0) {
            document.getElementsByClassName("_1dpop")[0].innerText = "Start"
            document.getElementsByClassName("_1dpop")[0].addEventListener("click", () => {
                SetIsStartClicked(blnIsStartClicked)
            })
        }
        window.IntervalId = setInterval(() => {
            if (document.getElementsByClassName("_2uz65 _3nQu5").length > 0 &&
                document.getElementsByClassName("_2uz65 _1bSom").length > 0) {

                document.getElementsByClassName("_2uz65 _3nQu5")[0].innerText = "  Pause"
                document.getElementsByClassName("_2uz65 _1bSom")[0].innerText = "Stop"
                clearInterval(window.IntervalId);
            }
        }, 2000);
    }

    const Initialization = () => {
        // Create own peer object with connection to shared PeerJS server
        let peer = new Peer(null, {
            debug: 2
        });

        window.objPeer = peer;
        objPeer.on('open', function (id) {
            // Workaround for peer.reconnect deleting previous id
            if (objPeer.id === null) {
                console.log('Received null id from peer open');
                objPeer.id = lastPeerId;
            } else {
                lastPeerId = objPeer.id;
            }
            SetlastPeerId(objPeer.id);
            //console.log('ID: ' + objPeer.id);
        });
        objPeer.on('connection', function (c) {
            // Allow only a single connection
            if (objConnection) {
                c.on('open', function () {
                    c.send("Already connected to another client");
                    setTimeout(function () { c.close(); }, 500);
                });
                return;
            }

            objConnection = c;
            var status = document.getElementById("status");
            status.innerHTML = "Connected"
            status.style.color = "green";
            SetIsConnectionOpen(true);
            ready();
        });
        objPeer.on('disconnected', function () {
            var status = document.getElementById("status");
            status.innerHTML = "Connection lost. Please reconnect";
            console.log('Connection lost. Please reconnect');
            SetIsConnectionOpen(false);
            // Workaround for peer.reconnect deleting previous id
            objPeer.id = lastPeerId;
            objPeer._lastServerId = lastPeerId;
            objPeer.reconnect();
        });
        objPeer.on('close', function () {
            objConnection = null;
            var status = document.getElementById("status");
            status.innerHTML = "Connection destroyed. Please refresh";
            console.log('Connection destroyed');
        });
        objPeer.on('error', function (err) {
            console.log(err);
            alert('' + err);
        });
    };

    /**
      * Triggered once a connection has been achieved.
      * Defines callbacks to handle incoming data and connection events.
      */
    const ready = () => {
        objConnection.on('data', function (data) {
            console.log(data);
            switch (data) {
                default:
                    if (typeof data == "object") {
                        var received = new Blob([new Uint8Array(data.file)], { type: data.type });

                        let url = URL.createObjectURL(received);
                        addMessage("<span >Peer:</span> <a href=" + url + " download=\"" + data.name + "\">" + data.name +"</a>");
                    }
                    else {
                        addMessage("<span class=\"peerMsg\">Peer: </span> " + data);
                    }
                    break;
            };
        });
        objConnection.on('close', function () {
            var status = document.getElementById("status");
            status.innerHTML = "Connection reset<br>Awaiting connection...";
            objConnection = null;
            start(true);
        });
    }

    const MediaInitialization = () => {
        let constraintObj = {
            audio: true,
            video: {
                facingMode: "user",
                width: { min: 540, ideal: 1280, max: 1920 },
                height: { min: 380, ideal: 720, max: 1080 }
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

                objMediaRecorder = new MediaRecorder(mediaStreamObj);

                objMediaRecorder.ondataavailable = (objEvent) => {
                    chunks.push(objEvent.data);
                };

                objMediaRecorder.onstop = (objEvent) => {
                    let blob = new Blob(chunks, { 'type': 'video/mp4' });
                    chunks = [];
                    let objFileDetails = {
                        file: blob,
                        name: "VideoFile",
                        type: "video/mp4"
                    };
                    SetFile(objFileDetails);
                    SetRecordVideo(false);
                }
            })
            .catch(function (err) {
                console.log(err.name, err.message);
            });
    }
    
    const getUrlParam = (name) => {
        name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
        var regexS = "[\\?&]" + name + "=([^&#]*)";
        var regex = new RegExp(regexS);
        var results = regex.exec(window.location.href);
        if (results == null)
            return null;
        else
            return results[1];
    };

    const handleAudioStop = (data) => {
        if (data.blob) {
            let objFileDetails = {
                file: data.blob,
                name: "RecordedMp3",
                type: "audio/mp3"
            };
            SetFile(objFileDetails);
            SetAudioDetails(data);
        }
        SetRecordAudio(!blnSetRecordAudio)
    }
    const handleAudioUpload = (file) => {
        console.log(file);
    }

    const objClickConnection = () => {

        // Close old connection
        if (objConnection) {
            objConnection.close();
        }

        // Create connection to destination peer specified in the input field
        var recvIdInput = document.getElementById("receiver-id");
        window.objConnection = objPeer.connect(recvIdInput.value, {
            reliable: true
        });

        objConnection.on('open', function () {
            var status = document.getElementById("status");
            status.innerHTML = "Connected to: " + objConnection.peer;
            status.style.color = "green";
            console.log("Connected to: " + objConnection.peer);

            // Check URL params for comamnds that should be sent immediately
            var command = getUrlParam("command");
            if (command)
                objConnection.send(command);
        });
        // Handle incoming data (messages only since this is the signal sender)
        objConnection.on('data', function (data) {
            if (typeof data == "object") {
                var received = new Blob([new Uint8Array(data.file)], { type: data.type });

                let url = URL.createObjectURL(received);
                addMessage("<span >Peer:</span> <a href=" + url + " download=\"" + data.name + "\">" + data.name+"</a>");
            }
            else {
                addMessage("<span class=\"peerMsg\">Peer: </span> " + data);
            }
        });
        objConnection.on('close', function () {
            var status = document.getElementById("status");
            status.innerHTML = "Connection closed";
            status.style.color = "red";
        });
    };

    const onKeyPress = (e) => {
        SetSendMessage(e.target.value);
    };

    const addMessage = (msg) => {
        var now = new Date();
        var h = now.getHours();
        var m = addZero(now.getMinutes());
        var s = addZero(now.getSeconds());

        if (h > 12)
            h -= 12;
        else if (h === 0)
            h = 12;

        function addZero(t) {
            if (t < 10)
                t = "0" + t;
            return t;
        };

        var message = document.getElementById("message");
        message.innerHTML = "<br><span class=\"msg-time\">" + h + ":" + m + ":" + s + "</span>  -  " + msg + message.innerHTML;
    };

    const onSendButtonClick = () => {
        if (objConnection && objConnection.open) {
            var msg = strSendMessage;
            if (objFile != null) {
                //objConnection.send(objFile);
                objConnection.send(objFile);
                SetFile(null);
                addMessage("<span >Self: </span> " + [objFile.name, objFile.size,].join(' : '));
            }
            if (msg != "") {
                SetSendMessage("");
                objConnection.send(msg);
                console.log("Sent: " + msg);
                addMessage("<span >Self: </span> " + msg);
            }
        } else {
            console.log('Connection is closed');
        }
    }

    const clearMessages = () => {
        var message = document.getElementById("message");
        message.innerHTML = "";
        addMessage("Msgs cleared");
    };

    const onClickAttach = (event) => {
        const file = event.target.files[0]
        const blob = new Blob(event.target.files, { type: file.type })

        let objFileDetails = {
            file: blob,
            name: file.name,
            type: file.type
        };
        SetFile(objFileDetails);
        event.target.value = "";
    }

    const CancelFileAttachment = () => {
        SetFile(null);
    }

    const StartRecording = () => {
        if (objMediaRecorder) {
            objMediaRecorder.start();
        }
    }

    const StopRecording = () => {
        if (objMediaRecorder) {
            objMediaRecorder.stop();
        }
    }

    const GetVideoRecordContent = () => {
        return <React.Fragment>
            <div>
                <div>
                    <span>{"Record Video:"}</span>
                </div>
                <div>
                    <video controls></video>
                    <br />
                    <span>
                        <button id="btnStart" title="Start" onClick={() => { StartRecording() }}>&#9654;</button>&nbsp;&nbsp;
                            <button id="btnStop" title="Stop" onClick={() => { StopRecording() }}>&#9208;</button>
                        <button id="btnCancel" title="Cancel" onClick={() => { SetRecordVideo(false) }}>Cancel</button>
                    </span>
                </div>
            </div>
        </React.Fragment>;
    }

    const GetAudioRecordContent = () => {

        if (document.getElementsByClassName("_2uz65 _3nQu5").length > 0) {
            document.getElementsByClassName("_2uz65 _3nQu5")[0].innerText = "  Pause"
        }
        if (document.getElementsByClassName("_2uz65 _1bSom").length > 0) {
            document.getElementsByClassName("_2uz65 _1bSom")[0].innerText = "Stop"
        }

        return <React.Fragment>
            <div>
                <div>
                    <span>{"Record Video:"}</span>
                </div>
                <div>
                    <Recorder
                        record={true}
                        title={"New recording"}
                        audioURL={objAudioDetails.url ? objAudioDetails.url : null}
                        showUIAudio
                        handleAudioStop={data => handleAudioStop(data)}
                        handleAudioStart={data => handleAudioStop(data)}
                        handleOnChange={(value) => handleOnChange(value, 'firstname')}
                        handleAudioUpload={data => handleAudioUpload(data)} />
                </div>
            </div>
        </React.Fragment>;
    }

    let jsxSender = (
        <React.Fragment>
            <h1>Chat With Peer</h1>
            <table class="control">
                <tbody>
                    <tr>
                        <td class="title"><h3>Status:</h3></td>
                    </tr>
                    <tr>
                        <td><div id="status" class="status" style={{ "color": "red" }}>Awaiting connection...</div></td>
                    </tr>
                    <tr>
                        <td>
                            <span style={{ "fontWeight": "bold" }}>ID: {lastPeerId}</span>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            {
                                !blnIsConnectionOpen ?
                                    <React.Fragment>
                                        Connect To Peer: <input type="text" id="receiver-id" title="enter receiver Id" />
                                        <button id="connect-button" onClick={() => { objClickConnection() }}>Connect</button>
                                    </React.Fragment> : <React.Fragment />
                            }
                        </td>
                    </tr>
                    <tr>
                        <td class="title"><h3>Messages:</h3></td>
                    </tr>
                    <tr>
                        <td>
                            &nbsp;
                            <input type="text" id="sendMessageBox" value={strSendMessage} placeholder="Enter a message..." autofocus="true" onChange={(e) => { onKeyPress(e) }} />
                            <label title="attach file" for="files">&#128206;</label>
                            <input id="files" type="file" style={{ "visibility": "hidden", "width": "10px" }} onChange={(e) => { onClickAttach(e) }} />
                            <span title="Record Video" style={{ "cursor": "pointer" }} onClick={() => { SetRecordVideo(true) }}>&#128247;</span>
                            <span title="Record Audio" style={{ "cursor": "pointer" }} onClick={() => { SetRecordAudio(!blnSetRecordAudio) }}>&#127908;</span>
                            <button type="button" id="sendButton" onClick={() => { onSendButtonClick() }}>Send</button>
                            <button type="button" id="clearMsgsButton" onClick={() => { clearMessages() }}>Clear Msgs (Local)</button>
                        </td>
                    </tr>
                    <tr>
                        <td><div class="message" id="fileStatus" style={{ "color": "blue" }}>
                            {objFile ? <span>{objFile.name} <span style={{
                                "cursor": "pointer", "color": "crimson",
                                "fontWeight": "600"
                            }} onClick={() => { CancelFileAttachment() }}>X</span></span> : <React.Fragment />}
                        </div></td>
                    </tr>
                    <tr>
                        {
                            blnSetRecordVideo ?
                                <td>{GetVideoRecordContent()}</td> : !blnSetRecordAudio ? <td>{GetAudioRecordContent()}</td>:<React.Fragment />
                        }
                    </tr>
                    <tr>
                        <td id="AudioRecorder">
                            

                        </td>
                    </tr>
                    <tr>
                        <td><div class="message" id="message" style={{ "color": "blue" }}></div></td>
                    </tr>
                </tbody></table>
        </React.Fragment>
    );

    const GetData = () => {
        if (document.getElementsByClassName("_2uz65 _3nQu5").length > 0) {
            document.getElementsByClassName("_2uz65 _3nQu5")[0].innerText = "  Pause"
        }
        if (document.getElementsByClassName("_2uz65 _1bSom").length > 0) {
            document.getElementsByClassName("_2uz65 _1bSom")[0].innerText = "Stop"
        }
        return (
            <React.Fragment>
                <div>
                    <div>
                        <React.Fragment>{jsxSender}</React.Fragment>
                    </div>
                </div>
            </React.Fragment>)
    };

    return GetData();
}

export default PeerToPeerChatSample;