import React from "react";

export default function ChartOne(props) {

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
        return (
            <svg xmlns="http://www.w3.org/2000/svg"
                xlink="http://www.w3.org/1999/xlink"
                version="1.1"
                id="Layer_1"
                x="0px"
                y="0px"
                width="845px"
                height="349px"
                viewBox="0 0 845 349"
                style={{ "enable-background": "new 0 0 845 349;" }}
                space="preserve"
            >
                <rect id="lightPinkBg" x="14" className="st0" width="816" height="349" />
                <g id="bgLines">
                    <rect x="14" y="137" className="st1" width="831" height="1" />
                    <rect x="14" y="218" className="st1" width="831" height="1" />
                    <rect x="115" y="0" className="st1" width="1" height="349" />
                    <rect x="217" y="0" className="st1" width="1" height="349" />
                    <rect x="319" y="0" className="st1" width="1" height="349" />
                    <rect x="421" y="0.5" className="st1" width="1" height="348" />
                    <rect x="523" y="0" className="st1" width="1" height="349" />
                    <rect x="14" y="30" className="st1" width="831" height="1" />
                    <rect x="14" className="st2" width="831" height="1" />
                    <rect x="886.5" y="19.9" className="st3" width="1" height="11" />
                    <rect x="625" y="0" className="st1" width="1" height="349" />
                    <rect x="727" y="0" className="st1" width="1" height="349" />
                </g>
                <g className="st4">
                    <rect id="row0pinkBg" x="14" y="1" className="st5" width="102" height="29" />
                    <rect id="row1pinkBg" x="14" y="31" className="st5" width="102" height="106" />
                    <rect id="row2pinkBg" x="14" y="138" className="st5" width="102" height="80" />
                    <rect id="row3pinkBg" x="14" y="219" className="st5" width="102" height="130" />
                    <g className="st6">
                        <rect x="14" y="309" className="st7" width="25" height="25" />
                    </g>
                    <g className="st6">
                        <rect x="14" y="284" className="st8" width="25" height="25" />
                    </g>
                    <g className="st6">
                        <rect x="14" y="259" className="st9" width="25" height="25" />
                    </g>
                    <g className="st6">
                        <rect x="14" y="234" className="st10" width="25" height="25" />
                    </g>
                    <g className="st6">
                        <rect x="14" y="178" className="st7" width="25" height="25" />
                    </g>
                    <g className="st6">
                        <rect x="14" y="153" className="st8" width="25" height="25" />
                    </g>
                    <g className="st6">
                        <rect x="14" y="97" className="st9" width="25" height="25" />
                    </g>
                    <g className="st6">
                        <rect x="14" y="72" className="st10" width="25" height="25" />
                    </g>
                    <g className="st6">
                        <rect x="14" y="47" className="st8" width="25" height="25" />
                    </g>
                    <rect x="14" y="31" className="st11" width="16" height="16" />
                    <rect x="14" y="122" className="st11" width="15" height="15" />
                    <rect x="14" y="138" className="st11" width="15" height="15" />
                    <rect x="14" y="203" className="st11" width="15" height="15" />
                    <rect x="14" y="219" className="st11" width="15" height="15" />
                    <rect x="14" y="334" className="st11" width="15" height="15" />
                    <rect y="82" className="st12" width="14" height="7" />
                    <rect x="830" y="80.6" className="st12" width="15" height="6.8" />
                </g>
                <g id="row3Lines">
                    <circle id="row3Dot3_1_" className="st13" cx="65" cy="321.5" r="7.5" />
                    <line id="row3LineDot2ToDot3_1_" className="st14" x1="65" y1="321.5" x2="65" y2="296.5" />
                    <circle id="row3Dot3" className="st13" cx="65" cy="296.5" r="7.5" />
                    <line id="row3LineDot2ToDot3" className="st14" x1="65" y1="296.5" x2="65" y2="271.5" />
                    <circle id="row3Dot2" className="st13" cx="65" cy="271.5" r="7.5" />
                    <line id="row3LineDot1ToDot2" className="st14" x1="65" y1="271.5" x2="65" y2="246.5" />
                    <circle id="row3Dot1" className="st13" cx="65" cy="246.5" r="12" />
                </g>
                <g id="row2Lines">
                    <circle id="row2Dot2" className="st13" cx="65" cy="190.5" r="7.5" />
                    <line id="row2LineDot1ToDot2" className="st14" x1="65" y1="190.5" x2="65" y2="165.5" />
                    <circle id="row2Dot1" className="st13" cx="65" cy="165.5" r="12" />
                </g>
                <g id="row1Lines">
                    <circle id="row1Dot3" className="st13" cx="65" cy="110.5" r="7.5" />
                    <line id="row1LineDot2ToDot3" className="st14" x1="65" y1="109.5" x2="65" y2="84.5" />
                    <circle id="row1Dot2" className="st13" cx="65" cy="84.5" r="7.5" />
                    <line id="row1LineDot1ToDot2_1_" className="st14" x1="65" y1="86" x2="65" y2="60" />
                    <circle id="row1Dot1" className="st13" cx="65" cy="59.5" r="12" />
                </g>
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

    return GetContent();
}