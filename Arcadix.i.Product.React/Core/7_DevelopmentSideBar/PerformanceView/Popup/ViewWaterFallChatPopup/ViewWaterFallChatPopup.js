// React related imports.
import React, { useReducer } from 'react';


/**
  * @name ViewWaterFallChatPopup
  * @param {object} props props
  * @summary This component displays the Waterfall chat view.
  * @returns {object} React.Fragement that encapsulated the display grid with ViewWaterFallChatPopup details.
  */
const ViewWaterFallChatPopup = props => {

    /**
     * @name GetFileDetailsChat
     * @param {any} arrFileDetails
     * @param {any} intTotalTime
     * @param {any} intInitialTimeStamp
     * @summary get file details chat
     */
    const GetFileDetailsChat = (arrFileDetails, intTotalTime, intInitialTimeStamp) => {
        let intTimeDuration = (intTotalTime - intInitialTimeStamp);
        return (
            <React.Fragment>
                <table class="mainTable" style={{ "width":"100%"}}>
                    <tr class="tableRow">
                        {
                            GetCaptions(intTimeDuration)
                        }
                    </tr>                    
                    {
                        arrFileDetails.map((objData,index) => {
                            //let intWidth = index*5;
                            
                            let intStartTime = Math.round(objData.range[0]);
                            //let intStartTime = index + 5;
                            let strName = objData.label.split("~")[objData.label.split("~").length - 1];

                            return (
                                <React.Fragment>
                                    <tr class="tableRow">
                                        <td title={objData.label} class="tableColumn1"><span>{strName}&nbsp;</span></td>
                                        {GetBarView(intTimeDuration, objData.time, intStartTime)}
                                    </tr>
                                </React.Fragment>);
                        })
                    }
                </table>
            </React.Fragment>)
    }

    /**
     * @name GetCaptions
     * @param {any} intIntervals
     * @summary get the captions
     */
    const GetCaptions = (intTotalTime) => {
        let intRounedTime = Math.round(intTotalTime);
        let intInterval = Math.round(intRounedTime / 10);
        let intActualTime = intInterval * 10 + intInterval;
        let jsxCaptionView = [];
        for (var intIndex = 0; intIndex <= intActualTime; intIndex = intIndex + intInterval) {
            let jsxCaptions = (
                <React.Fragment>
                    {intIndex != 0 ? <td style={{ "width": "60px" }} class="tableCaption">{intIndex}</td> : <td style={{ "width": "100%" }} class="tableCaption">{intIndex}</td>}
                </React.Fragment>
            );
            jsxCaptionView = [...jsxCaptionView, jsxCaptions];
        }        
        return jsxCaptionView;
    }

    /**
     * @name GetBarView
     * @param {any} intTotalTime
     * @param {any} intTimeTaken
     * @param {any} intStartTime
     * @summary get the Bar for each row.
     */
    const GetBarView = (intTotalTime, intTimeTaken, intStartTime) => {
        let jsxChatBarView = [];
        let intRounedTime = Math.round(intTotalTime);
        let intInterval = Math.round(intRounedTime / 10);
        let intActualTime = intInterval * 10 + intInterval;
        
        for (var intIndex = 0; intIndex < intActualTime; intIndex = intIndex + intInterval) {
            
            let intWidth = ((660 / intActualTime) * (intTimeTaken)).toFixed(1);
            if (intIndex == 0) {
                let strFunction = "translate(0"+((660 / intActualTime) * intStartTime).toFixed(1) + ", 0)";
                let jsxBarView = (
                    <React.Fragment>
                        <td class="tableColumn2">
                            <svg style={{ "width": "660px" }} height="12" class="svgBar1">
                                <rect id="Bar11" style={{ "width": intWidth }} height="12" class="Bar1" transform={strFunction}>
                                    <title>{"TimeTaken: " + intTimeTaken + "," + " StartTime: " + intStartTime}</title>
                                </rect>
                            </svg>
                        </td>
                    </React.Fragment>
                );
                jsxChatBarView = [...jsxChatBarView, jsxBarView];
            }
            else {
                let jsxBarView = (
                    <React.Fragment>
                        <td class="tableColumn2"></td>
                    </React.Fragment>
                );
                jsxChatBarView = [...jsxChatBarView, jsxBarView];
            }
        }
        return jsxChatBarView;
    }

    function GetSortOrder(prop) {
        return function (a, b) {
            if (a[prop] > b[prop]) {
                return 1;
            } else if (a[prop] < b[prop]) {
                return -1;
            }
            return 0;
        }
    }


    /**
      * @name GetContent
      * @summary Get the content to display
      * @return {Jxs} jsx to view
      */
	function GetContent() {
        var arrFileDetails = [];
        let intTotalTime = 0;
        var intInitialTimeStamp = 0;
        if (props.Data.objFileDetails && props.Data.objFileDetails.FileDetails) {
            var intOrder = props.Data.objFileDetails.FileDetails.length - 1;

            let arrFileList = props.Data.objFileDetails.FileDetails.sort(GetSortOrder("startTime"))
            intInitialTimeStamp = arrFileList[0].startTime;
            props.Data.objFileDetails.FileDetails.map((objData,index) => {
                let strFileName = objData.FileName.split("/")[objData.FileName.split("/").length - 1];       

                //if (strFileName.split(".").length > 1) {
                let intStartTime = parseFloat(objData.startTime) - parseFloat(intInitialTimeStamp);
                let intEndTime = parseFloat(objData.timeStamp) - parseFloat(intInitialTimeStamp);

                arrFileDetails = [...arrFileDetails, { x: intOrder, range: [intStartTime.toFixed(2), intEndTime.toFixed(2)], label: strFileName, time: objData.time }]
                //}
                intOrder -= 1;

                if (intTotalTime < parseFloat(objData.timeStamp)) {
                    intTotalTime = parseFloat(objData.timeStamp);
                }
            })
        }

        return (
            <React.Fragment>
                <div style={{ "paddingRight": "80px", "paddingTop": "30px" }}>
                    {GetFileDetailsChat(arrFileDetails, intTotalTime, intInitialTimeStamp)}
                </div>
            </React.Fragment>
        )
    }
    /**
      * @summary returns JSX
      */
    return (
        <React.Fragment>
            {GetContent()}
        </React.Fragment>
    );
}

export default ViewWaterFallChatPopup;