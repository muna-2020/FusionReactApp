import React from "react";

export default function ChartFour(props) {

    const GetContent = () => {
        let objSubject = props.objSubject;

        return (
            <svg xmlns="http://www.w3.org/2000/svg"
                xlink="http://www.w3.org/1999/xlink"
                version="1.1"
                //id="Layer_1"
                x="0px"
                y="0px"
                width="845px"
                height="349px"
                viewBox="0 0 845 349"
                style={{ "enable-background": "new 0 0 845 349;", "height": objSubject["Orientation_SVGHeight"] }}
                space="preserve"
                id={"svg_" + objSubject["SubjectId"]}
            >
                <rect id={"rct_lightPinkBg" + objSubject["SubjectId"]} x="14" className="st0" width="816" height="349" />
                <g id="bgLines">
                    <rect id="rctTopLine" x="14" className="st2" width="816" height="1" />
                    {
                        objSubject["SubSubjects"].map(objSubSubject => {
                            return (
                                <rect id={"rct_SubSubjectStartLine" + objSubSubject["SubjectId"]} x="14" y="137" className="st1" width="831" height="1" />
                            );
                        })
                    }
                    <rect x="886.5" y="19.9" className="st3" width="1" height="11" />
                    <rect x="115" y="0" className="st1" width="1" height="349" />
                    <rect x="217" y="0" className="st1" width="1" height="349" />
                    <rect x="319" y="0" className="st1" width="1" height="349" />
                    <rect x="421" y="0.5" className="st1" width="1" height="348" />
                    <rect x="523" y="0" className="st1" width="1" height="349" />
                    <rect x="625" y="0" className="st1" width="1" height="349" />
                    <rect x="727" y="0" className="st1" width="1" height="349" />
                </g>
                {
                    objSubject["SubSubjects"].map(objSubSubject => {
                        return (
                            <g id="row1Lines">
                                {
                                    objSubSubject["Lines"].length > 0 ?
                                        objSubSubject["Lines"].map(objLine => {
                                            return (
                                                <line id={"line_" + objLine["uLineId"]}
                                                    style={{ "fill": "none", "stroke": "#FF4A75", "stroke-width": 2, "stroke-miterlimit": 10 }}
                                                    x1="67.5" y1="110" x2="67.5" y2="82"
                                                />
                                            );
                                        }) : <React.Fragment />
                                }
                                {
                                    objSubSubject["Results"].length > 0 ?
                                        objSubSubject["Results"].map(objResult => {
                                            return (
                                                <circle id={"dotResult_" + objSubSubject["SubjectId"] + '_' + objResult["uTestTokenId"]}
                                                    style={{ "fill": "#FF4A75"}}
                                                    cx= "67.5" cy= "110" r= "7.5"
                                                    onMouseOver={() => { props.Events.OnMouseOver("dotResult_" + objSubSubject["SubjectId"] + '_' + objResult["uTestTokenId"], objResult, props.ParentSubjectId, props.objSubject.SubjectId); }}
                                                    onMouseLeave={() => { props.Events.OnMouseLeave(); }}
                                                />
                                            );
                                        }) : <React.Fragment />
                                }
                            </g>
                        );
                    })
                }
                <g id="columnNumbers">
                    <text transform="matrix(1 0 0 1 67 20.8232)" className="st15 st16 st17">I</text>
                    <text transform="matrix(1 0 0 1 165 20.8232)" className="st16 st17">I</text>
                    <text transform="matrix(1 0 0 1 264 20.8232)" className="st16 st17">II</text>
                    <text transform="matrix(1 0 0 1 364 20.8232)" className="st16 st17">III</text>
                    <text transform="matrix(1 0 0 1 466.0001 20.8232)" className="st16 st17">IV</text>
                    <text transform="matrix(1 0 0 1 569.9996 20.8232)" className="st16 st17">V</text>
                    <text transform="matrix(1 0 0 1 668.9996 20.8232)" className="st16 st17">VI</text>
                    <text transform="matrix(1 0 0 1 768.9996 20.8232)" className="st16 st17">VII</text>
                </g>
            </svg>
        );
    };

    const GetContentTemp = () => {
        let objSubject = props.objSubject;

        let svg = <svg style={{ width: "100%", position: "absolute", left: 0, right: 0, bottom: 0, top: 0, zIndex: 9999, overflow: "visible" }} id={"svg_" + objSubject['SubjectId']}
            mouseover="SvgMouseOver($event)"
        >
            {
                objSubject['SubSubjects'].map(objOSubSubject => {
                    return (
                        <React.Fragment>
                            {
                                objOSubSubject['Lines'] ?
                                    objOSubSubject['Lines'].map(objLine => {
                                        return (
                                            <line id={"line_" + objLine['uLineId']}
                                                style={{ fill: "none", stroke: "#FF4A75", strokeWidth: 3, strokeMiterlimit: 10 }}
                                                x1="67.5" y1="110" x2="67.5" y2="82"
                                            />
                                        );
                                    }) : <React.Fragment />

                            }
                            {
                                objOSubSubject['Results'].length > 0 ?
                                    objOSubSubject['Results'].map(objResult => {
                                        return (
                                            <React.Fragment>
                                                <circle
                                                    //id={"dotResult_" + objOSubSubject['SubjectId'] + '_' + objResult['uTestTokenId']}
                                                    style={{ fill: "#FF4A75", cursor: "pointer" }} cx="67.5" cy="110" r="9"
                                                    mouseover="DisplayResult(objResult,objOSubSubject['SubjectId'],objSubject,$event)"
                                                />
                                                {
                                                    false ? //blnIsTabletView
                                                        <rect id={"rctResult_" + objOSubSubject['SubjectId'] + '_' + objResult['uTestTokenId']}
                                                            x="828.9" y="1" width="20" height="20" fill="transparent"
                                                            click="DisplayResult_Click(objResult,objOSubSubject['SubjectId'],objSubject,$event)"
                                                        />
                                                        : <React.Fragment />
                                                }
                                            </React.Fragment>
                                        );
                                    }) :
                                <React.Fragment />
                            }
                        </React.Fragment>
                    )
                })
            }
        </svg >

        //console.log("svg", svg);

        return svg;
    };

    return GetContentTemp();
}