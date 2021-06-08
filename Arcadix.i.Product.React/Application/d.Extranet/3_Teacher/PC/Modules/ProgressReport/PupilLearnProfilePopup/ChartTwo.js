import React from "react";

export default function ChartTwo(props) {
    const { arrInterval, objSubject } = { ...props };

    const GetInterval = (arrSubSubjectDetails) => {
        let intMaxTaskCount = 0;
        arrSubSubjectDetails.forEach(objSubSubject => {
            objSubSubject["SubSubjectRepetionRoundList"].forEach(objRound => {
                let intCurrentTaskCount = objRound['NotAttemptedTasks'] + objRound['WrongTasks'] + objRound['PartiallyCorrectTasks'] + objRound['CorrectTasks'];
                if (intMaxTaskCount < intCurrentTaskCount) {
                    intMaxTaskCount = intCurrentTaskCount;
                }
            });
        });

        let intInterval = 1;
        if (intMaxTaskCount > 0 && intMaxTaskCount <= 10) {
            intInterval = 0.1
        }
        else if (intMaxTaskCount > 10 && intMaxTaskCount <= 20) {
            intInterval = 0.2;
        }
        else if (intMaxTaskCount > 20 && intMaxTaskCount <= 50) {
            intInterval = 0.5;
        }
        else if (intMaxTaskCount > 50 && intMaxTaskCount <= 500) {
            intInterval = Math.ceil(intMaxTaskCount / 50) * 0.5;
        }
        else if (intMaxTaskCount > 500) {
            intInterval = Math.ceil(intMaxTaskCount / 100);
        }
        return intInterval;
    };

    const GetXStartPoint = (arrSubSubjectDetails, intXStartPointForSubSubject, objRound, intRoundIndex) => {
        let intXStartPoint = intXStartPointForSubSubject;
        //Adding space before first bar
        intXStartPoint += 30;

        let x_GreyBar = "";
        let y_GreyBar = "";
        let height_GreyBar = "";

        let x_PinkBar = "";
        let y_PinkBar = "";
        let height_PinkBar = "";

        let x_SkyBlueBar = "";
        let y_SkyBlueBar = "";
        let height_SkyBlueBar = "";

        let x_BlueBar = "";
        let y_BlueBar = "";
        let height_BlueBar = "";

        let intInterval = GetInterval(arrSubSubjectDetails);
        let intYForBaseLine = 297.5;
        let intPartiallyCorrectedTasks = 0;
        //let arrFilteredCounts = [];
        //objRound.arrTestTokenId.forEach(strTestTokenId => {
        //        arrFilteredCounts = arrMultipleCountResults.filter(objCount => objCount["uTestTokenId"] == strTestTokenId);
        //        if (arrFilteredCounts.length > 0) {
        //            intPartiallyCorrectedTasks += parseInt(arrFilteredCounts[0]["CorrectInMultipleAttempts"]);
        //        }
        //});
        intPartiallyCorrectedTasks = objRound['PartiallyCorrectTasks'];
        let intNoOfTasks = objRound['NotAttemptedTasks'] + objRound['WrongTasks'] + intPartiallyCorrectedTasks + objRound['CorrectTasks'];
        let intScale = 2.3;//(100 point line y - 0 point line y )/100
        let intBarYStartPoint = intYForBaseLine - ((intNoOfTasks / intInterval) * intScale);
        let intBarHeight = 0;
            
        x_GreyBar = intXStartPoint.toString();
        y_GreyBar = intBarYStartPoint.toString();
        intBarHeight = (objRound['NotAttemptedTasks'] / intInterval) * intScale;
        height_GreyBar = intBarHeight.toString();
        intBarYStartPoint = intBarYStartPoint + intBarHeight;
            
        x_PinkBar = intXStartPoint.toString();
        y_PinkBar = intBarYStartPoint.toString();                
        intBarHeight = (objRound['WrongTasks'] / intInterval) * intScale;
        height_PinkBar = intBarHeight.toString();
        intBarYStartPoint = intBarYStartPoint + intBarHeight;

        x_SkyBlueBar = intXStartPoint.toString();
        y_SkyBlueBar = intBarYStartPoint.toString();
        intBarHeight = (intPartiallyCorrectedTasks / intInterval) * intScale;
        height_SkyBlueBar = intBarHeight.toString();
        intBarYStartPoint = intBarYStartPoint + intBarHeight;

        x_BlueBar = intXStartPoint.toString();
        y_BlueBar = intBarYStartPoint.toString();
        intBarHeight = (objRound['CorrectTasks'] / intInterval) * intScale;
        height_BlueBar = intBarHeight.toString();
        intBarYStartPoint = intBarYStartPoint + intBarHeight;

        //let txtRoundNumberLabel = document.getElementById('txt_RoundNumber_' + objSubSubject['iSubjectId'] + '_' + objRound['iRoundId']);
        //if (txtRoundNumberLabel) {
        //    //intXstartPoint for grey bar + half of grey bar width - 7
        //    txtRoundNumberLabel.setAttribute('x', (intXStartPoint + 20 - 7).toString());
        //}
        //intXStartPoint += 45;
        //intXStartPoint = intXStartPoint + (intRoundIndex * 45);
        let x_text = (intXStartPoint + 20 - 7).toString();


        return {
            x_GreyBar,
            y_GreyBar,
            height_GreyBar,
            x_PinkBar,
            y_PinkBar,
            height_PinkBar,
            x_SkyBlueBar,
            y_SkyBlueBar,
            height_SkyBlueBar,
            x_BlueBar,
            y_BlueBar,
            height_BlueBar,
            x_text
        };
    };

    return (
	    <div className="chart-image">
            <svg 
                className="fordem-tab-svg" version="1.1" 
                id="Layer_1" 
                xmlns="http://www.w3.org/2000/svg" 
                xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                width="983px" 
                height="340px" 
                viewBox="0 0 983 340" 
                style={{"enable-background":"new 0 0 983 340;"}}
                space="preserve"
            >
              
                <g>
                    <rect id="leftBackground" x="40" y="36" className="chart40" width="204" height="262" />
                    <rect id={"rct_"+objSubject['ParentSubjectId']} x="243" y="36" className="chart30" width="700" height="262" />

                </g>
                <g>
                    <line id="leftBackgroundDivider1Partition1" className="chart33" x1="239" y1="67.5" x2="243" y2="67.5" />

                    <line id="leftBackgroundDivider1Partition2" className="chart33" x1="239" y1="91.5" x2="243" y2="91.5" />

                    <line id="leftBackgroundDivider1Partition3" className="chart33" x1="239" y1="115.5" x2="243" y2="115.5" />

                    <line id="leftBackgroundDivider1Partition4" className="chart33" x1="239" y1="139.5" x2="243" y2="139.5" />

                    <line id="leftBackgroundDivider1Partition5" className="chart33" x1="239" y1="163.5" x2="243" y2="163.5" />

                    <line id="leftBackgroundDivider1Partition6" className="chart33" x1="239" y1="187.5" x2="243" y2="187.5" />

                    <line id="leftBackgroundDivider1Partition7" className="chart33" x1="239" y1="211.5" x2="243" y2="211.5" />

                    <line id="leftBackgroundDivider1Partition8" className="chart33" x1="239" y1="235.5" x2="243" y2="235.5" />

                    <line id="leftBackgroundDivider1Partition9" className="chart33" x1="239" y1="259.5" x2="243" y2="259.5" />

                    <line id="leftBackgroundDivider1Partition10" className="chart33" x1="239" y1="283.5" x2="243" y2="283.5" />

                    <line id="leftBackgroundDivider2LowerPartition" className="chart33" x1="243" y1="297.5" x2="943" y2="297.5" />
                </g>
                <text id="taskHeading" transform="matrix(1 0 0 1 50.9958 165.9443)" className="chart34 chart35 chart38">
                    NoOfTasks
                </text>
                <text id="taskSubHeading" transform="matrix(1 0 0 1 51.3108 181.8174)" className="chart34 chart35 chart36">
                    InclusiveOfRepitition
                </text>
 
   
                <text id="txt_Number_1" transform="matrix(1 0 0 1 223.4006 286.8176)" className="chart34 chart35 chart36">{arrInterval.length > 0 && arrInterval[0] ? arrInterval[0]:'10'}</text>
                <text id="txt_Number_2" transform="matrix(1 0 0 1 222.8806 262.8176)" className="chart34 chart35 chart36">{arrInterval.length > 0 && arrInterval[1] ? arrInterval[1]:'20'}</text>
                <text id="txt_Number_3" transform="matrix(1 0 0 1 223.0251 238.8176)" className="chart34 chart35 chart36">{arrInterval.length > 0 && arrInterval[2] ? arrInterval[2]:'30'}</text>
                <text id="txt_Number_4" transform="matrix(1 0 0 1 222.6702 214.8176)" className="chart34 chart35 chart36">{arrInterval.length > 0 && arrInterval[3] ? arrInterval[3]:'40'}</text>
                <text id="txt_Number_5" transform="matrix(1 0 0 1 222.8 190.8176)" className="chart34 chart35 chart36">{arrInterval.length > 0 && arrInterval[4] ? arrInterval[4]:'50'}</text>
                <text id="txt_Number_6" transform="matrix(1 0 0 1 222.5701 167.0994)" className="chart34 chart35 chart36">{arrInterval.length > 0 && arrInterval[5] ? arrInterval[5]:'60'}</text>
                <text id="txt_Number_7" transform="matrix(1 0 0 1 222.9797 142.8176)" className="chart34 chart35 chart36">{arrInterval.length > 0 && arrInterval[6] ? arrInterval[6]:'70'}</text>
                <text id="txt_Number_8" transform="matrix(1 0 0 1 222.78 118.8176)" className="chart34 chart35 chart36">{arrInterval.length > 0 && arrInterval[7] ? arrInterval[7]:'80'}</text>
                <text id="txt_Number_9" transform="matrix(1 0 0 1 222.6448 94.8176)" className="chart34 chart35 chart36">{arrInterval.length > 0 && arrInterval[8] ? arrInterval[8]:'90'}</text>
                <text id="txt_Number_10" transform="matrix(1 0 0 1 222.6501 71.0994)" className="chart34 chart35 chart36">{arrInterval.length > 0 && arrInterval[9] ? arrInterval[9]:'100'}</text>                
                
                {
                    objSubject["SubSubjectDetails"].map((objSubSubject, intIndex) => {
                        let intXStartPointForSubSubject = 243 + (intIndex * 235);
                        return  (
                            <React.Fragment>
                                <line id={'line_' + objSubSubject['iSubjectId']} className="chart33" x1={intXStartPointForSubSubject} y1="36" x2={intXStartPointForSubSubject} y2="298" />
                                    {
                                    objSubSubject["SubSubjectRepetionRoundList"].map((objRound, intRoundIndex) => {
                                        let intXStartPoint = 243 + (intRoundIndex * 235);
                                        let objRoundDetails = GetXStartPoint(objSubject["SubSubjectDetails"], intXStartPoint, objRound, intRoundIndex);
                                        return (
                                            <React.Fragment>
                                                <g id="'g_'+objSubSubject['iSubjectId']+'_'+objRound['iRoundId']">
                                                    <rect id={"rct_Grey_" + objSubSubject['SubSubjectId'] + '_' + objRound['iRoundId']} x={objRoundDetails["x_GreyBar"]} y={objRoundDetails["y_GreyBar"]} className="chart312" width="40" height={objRoundDetails["height_GreyBar"]} />
                                                    <rect id={'rct_Pink_' + objSubSubject['SubSubjectId'] + '_' + objRound['iRoundId']} x={objRoundDetails["x_PinkBar"]} y={objRoundDetails["y_PinkBar"]} className="chart311" width="40" height={objRoundDetails["height_PinkBar"]} />
                                                    <rect id={'rct_SkyBlue_' + objSubSubject['SubSubjectId'] + '_' + objRound['iRoundId']} x={objRoundDetails["x_SkyBlueBar"]} y={objRoundDetails["y_SkyBlueBar"]} className="chart310" width="40" height={objRoundDetails["height_SkyBlueBar"]} />
                                                    <rect id={'rct_Blue_' + objSubSubject['SubSubjectId'] + '_' + objRound['iRoundId']} x={objRoundDetails["x_BlueBar"]} y={objRoundDetails["y_BlueBar"]} className="chart39" width="40" height={objRoundDetails["height_BlueBar"]} />
                                                </g>
                                                <text id="'txt_RoundNumber_'+objSubSubject['iSubjectId']+'_'+objRound['iRoundId']" transform="matrix(1 0 0 1 0 308.8176)" x={objRoundDetails["x_text"]} className="chart34 chart35 chart36">{objRound['GroupName']}</text>
                                            </React.Fragment>
                                            
                                            
                                        );
                                    })
                                    
                                    }
                                </React.Fragment>
                            );
                        })
                }


            </svg>
            <ul classNameName="legend-dropdown-list">
                <li>
                    <span className="color color-1"></span>
                    <span className="text">
                        CorrectInFirstTry
                    </span>
                </li>
                <li>
                    <span className="color color-2"></span>
                    <span className="text">
                        CorrectAfterSeveralTries
                    </span>
                </li>
                <li>
                    <span className="color color-3"></span>
                    <span className="text">
                        Wrong
                    </span>
                </li>
                <li>
                    <span className="color color-4"></span>
                    <span className="text">
                        NotSolved
                    </span>
                </li>
            </ul>
        </div> 
    );
}


{/*
                                            

<React.Fragment>
                                                <g id="'g_'+objSubSubject['iSubjectId']+'_'+objRound['iRoundId']">
                                                    <rect id={"rct_Grey_" + objSubSubject['SubSubjectId'] + '_' + objRound['iRoundId']} x={x2.toString()} y="115" className="chart312" width="40" height="20" />
                                                    <rect id={'rct_Pink_' + objSubSubject['SubSubjectId'] + '_' + objRound['iRoundId']} x={x2.toString()} y="135" className="chart311" width="40" height="49" />
                                                    <rect id={'rct_SkyBlue_' + objSubSubject['SubSubjectId'] + '_' + objRound['iRoundId']} x={x2.toString()} y="184" className="chart310" width="40" height="69" />
                                                    <rect id={'rct_Blue_' + objSubSubject['SubSubjectId'] + '_' + objRound['iRoundId']} x={x2.toString()} y="253" className="chart39" width="40" height="44" />
                                                </g>
                                                <text id="'txt_RoundNumber_'+objSubSubject['iSubjectId']+'_'+objRound['iRoundId']" transform="matrix(1 0 0 1 0 308.8176)" className="chart34 chart35 chart36">{'iRoundId'}</text>
                                            </React.Fragment>

                                            */}