//react related imports
import React, { useState, useEffect, useLayoutEffect } from "react";
import * as TestTools from '@root/Application/c.ProductManagement/PC/Modules/4_Example/ZoomIntegrationSample/TestTool/TestTool';

//Zoom sdk import 
import { ZoomMtg } from '@zoomus/websdk';


const ZoomIntegrationSample = () => {

    /**
     * @summary local state and variables 
     */
    var [blnIsJoinMeeting, SetIsJoinMeeting] = useState(true);
    var testTool = TestTools.GetTestTool();

    useLayoutEffect(() => {
        ZoomMtg.setZoomJSLib('https://source.zoom.us/1.8.0/lib', '/av');
    }, [])

    /**
     * @summary initialization
     */
    useEffect(() => {
        //ZoomMtg.preLoadWasm();
        //ZoomMtg.prepareJssdk();
        let objDefaultDiv = document.getElementById("zmmtg-root");
        if (objDefaultDiv) {
            objDefaultDiv.hidden = true;
        }
        
        ZoomMtg.preLoadWasm();
        ZoomMtg.prepareJssdk();
    }, []);

    /**
     * @name Createeeting
     * @summary Jsx for creating meeting
     */
    const CreateMeeting = () => {
        return (
            <React.Fragment>
                <span style={{ "fontWeight": "600", "fontSize": "medium" }} >Create Meeting:</span>
                <table>
                    <tbody>

                        <tr>
                            <td>
                                <button type="submit" class="btn btn-primary" id="create_meeting">Create meeting</button>&nbsp;&nbsp;&nbsp;
                                </td>
                        </tr>
                    </tbody>
                </table>
            </React.Fragment>
        );
    }

    const beginJoin = (meetingConfig) => {

        ZoomMtg.init({
            leaveUrl: window.location.href,
            webEndpoint: meetingConfig.webEndpoint,
            success: function () {
                console.log(meetingConfig);
                $.i18n.reload(meetingConfig.lang);
                ZoomMtg.join({
                    meetingNumber: meetingConfig.mn,
                    userName: meetingConfig.name,
                    signature: meetingConfig.signature,
                    apiKey: meetingConfig.apiKey,
                    userEmail: meetingConfig.email,
                    passWord: meetingConfig.pwd,
                    success: function (res) {
                        console.log("join meeting success");
                        console.log("get attendeelist");
                        ZoomMtg.getAttendeeslist({});
                        ZoomMtg.getCurrentUser({
                            success: function (res) {
                                console.log("success getCurrentUser", res.result.currentUser);
                            },
                        });
                    },
                    error: function (res) {
                        alert(res.result);
                    },
                });
            },
            error: function (res) {
                console.log(res);
            },
        });

        ZoomMtg.inMeetingServiceListener('onUserJoin', function (data) {
            console.log('inMeetingServiceListener onUserJoin', data);
        });

        ZoomMtg.inMeetingServiceListener('onUserLeave', function (data) {
            console.log('inMeetingServiceListener onUserLeave', data);
        });

        ZoomMtg.inMeetingServiceListener('onUserIsInWaitingRoom', function (data) {
            console.log('inMeetingServiceListener onUserIsInWaitingRoom', data);
        });

        ZoomMtg.inMeetingServiceListener('onMeetingStatus', function (data) {
            console.log('inMeetingServiceListener onMeetingStatus', data);
        });
    }

    const onClickJoinMeeting = () => {
        let API_KEY = "wWYepJCmQwOG8BjQGKHSOA";
        let API_SECRET = "9y9ctn66ZtUwBq8pxbyeIOnbra40udzJxUxo";
        var meetingConfig = testTool.getMeetingConfig();
        if (!meetingConfig.mn || !meetingConfig.name) {
            alert("Meeting number or username is empty");
            return false;
        }

        testTool.setCookie("meeting_number", meetingConfig.mn);
        testTool.setCookie("meeting_pwd", meetingConfig.pwd);

        //setTimeout(() => {
        var signature = ZoomMtg.generateSignature({
            leaveUrl: "/",
            meetingNumber: meetingConfig.mn,
            apiKey: API_KEY,
            apiSecret: API_SECRET,
            role: meetingConfig.role,
            success: function (res) {
                console.log(res.result);
                meetingConfig.signature = res.result;
                meetingConfig.apiKey = API_KEY;
                var joinUrl = "/meeting.html?" + testTool.serialize(meetingConfig);

                //ZoomMtg.preLoadWasm();
                let objDefaultDiv = document.getElementById("zmmtg-root");
                if (objDefaultDiv) {
                    objDefaultDiv.hidden = false;
                }
                if (meetingConfig.china == "1") {
                    ZoomMtg.setZoomJSLib("https://jssdk.zoomus.cn/1.8.0/lib", "/av"); // china cdn option

                }
                console.log(joinUrl);
                beginJoin(meetingConfig);
            },
        });
        //},10000)
    }

    /**
     * @name JoinMeeting
     * @summary Jsx for Join Meeting
     */
    const JoinMeeting = () => {

        return (
            <React.Fragment>
                <span style={{ "fontWeight": "600", "fontSize": "medium" }} >Join The Meeting:</span>
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <input type="text" name="display_name" id="display_name" maxLength="100"
                                    placeholder="Name" required />
                                &nbsp;&nbsp;
                                <input type="text" name="meeting_number" id="meeting_number" maxLength="200"
                                    style={{ "width": "150px" }} placeholder="Meeting Number" required />
                                &nbsp;&nbsp;
                                <input type="text" name="meeting_pwd" id="meeting_pwd" style={{ "width": "150px" }}
                                    maxLength="32" placeholder="Meeting Password" />
                                &nbsp;&nbsp;
                                <input type="text" name="meeting_email" id="meeting_email" style={{ "width": "150px" }}
                                    maxLength="32" placeholder="Email option" />

                                &nbsp;&nbsp;
                                Role:
                                <select id="meeting_role">
                                    <option value="0">Attendee</option>
                                    <option value="1">Host</option>
                                    <option value="5">Assistant</option>
                                </select>
                                &nbsp;&nbsp;
                                Type:
                                <select id="meeting_china" >
                                    <option value="0">Global</option>
                                    <option value="1">China</option>
                                </select>
                                &nbsp;&nbsp;
                               Language:
                                <select id="meeting_lang" class="sdk-select">
                                    <option value="en-US">English</option>
                                    <option value="de-DE">German Deutsch</option>
                                    <option value="es-ES">Spanish Español</option>
                                    <option value="fr-FR">French Français</option>
                                    <option value="jp-JP">Japanese 日本語</option>
                                    <option value="pt-PT">Portuguese Portuguese</option>
                                    <option value="ru-RU">Russian Русский</option>
                                    <option value="zh-CN">Chinese 简体中文</option>
                                    <option value="zh-TW">Chinese 繁体中文</option>
                                    <option value="ko-KO">Korean 한국어</option>
                                    <option value="vi-VN">Vietnamese Tiếng Việt</option>
                                    <option value="it-IT">Italian italiano</option>
                                </select>
                            </td>
                        </tr>
                        <tr></tr>
                        <tr>
                            <td><button type="submit" class="btn btn-primary" id="join_meeting" onClick={() => { onClickJoinMeeting() }}>Join</button>&nbsp;&nbsp;&nbsp;
                                <button type="submit" class="btn btn-primary" id="clear_all">Clear</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </React.Fragment>
        );
    }

    /**
     * @name GetContent
     * @summary Get Jsx Content for module.
     */
    const GetContent = () => {

        return (
            <React.Fragment>
                <div style={{ "paddingLeft": "20px", "paddingTop": "20px" }}>
                    <span>
                        Join Meeting: <input type="radio" checked={blnIsJoinMeeting} onClick={() => { SetIsJoinMeeting(true) }} /> &nbsp;&nbsp;
                        Create  Meeting: <input type="radio" checked={!blnIsJoinMeeting} onClick={() => { SetIsJoinMeeting(false) }} />
                    </span>
                    <br />
                    <br />
                    {
                        blnIsJoinMeeting ? JoinMeeting() : CreateMeeting()
                    }
                </div>
            </React.Fragment>
        );
    }

    return GetContent();
};

export default ZoomIntegrationSample;