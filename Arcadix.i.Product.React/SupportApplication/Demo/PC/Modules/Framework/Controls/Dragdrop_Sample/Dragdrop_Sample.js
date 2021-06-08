// React related imports.
import React, { useEffect } from 'react';

//Dragdrop Import
import Dragdrop from '@root/Framework/Controls/Dragdrop/Dragdrop';

//Drag drop Related files
import DropZone from '@root/Framework/Controls/DragDrop/DropZone/DropZone';
import DragZone from '@root/Framework/Controls/DragDrop/DragZone/DragZone';

//UniqueId.
import * as UniqueId from "@root/Framework/Services/UniqueId/UniqueId";

import ApplicationState from '@shared/Framework/DataService/ApplicationState/ApplicationState';

/**
* @name Dragdrop_Sample
* @param {object} props props
* @summary This component displays the Dragdrop_Sample.
* @returns {component} Dragdrop_Sample
*/
const DragDrop_Sample = (props) => {

    useEffect(() => {
        ApplicationState.SetProperty("blnShowAnimation", false);
    }, []);

    const GetContent = () => {
        //The Wrapper div should be the most outer div. It should be of height and width as the body.

        let intUniqueId = UniqueId.GetUniqueId();
        //Each drag zone expects a drag zone props.
        let objDragZoneProps = {
            "Meta": {
                "GroupId": intUniqueId,//the same id should be passed to its respeective dropzone,
                "Disable": false,//if you want to dynamically disable the drag drop feature.
                "DraggableElementType": "AnswerOption",//Element type that is draggable.
                "DragAreaType": "OptionArea",//Area from where element has to be dragged.
                "DropAreaType": "AnswerArea"//Area where element has to be dropped.
            },
            "Events": {
                "OnDrop": (objDraggedElement, objDropArea, objSourceArea, objDragdropData) => {
                    //This is optional nomally, but if you send GetHelper callback then this event has to be present.
                    //Drag drop will not handle anything if it GetHelper is there and OnDrop is not there.
                    alert(objDragdropData["WelcomeMessage"]);
                    objDropArea.append(objDraggedElement);
                }
            },
            "CallBacks": {
                // "GetHelper": () => {
                    //This function should onlu be used if you have multiple selections.
                    //If you use this callback that makes its NECESSARY to pass the OnDrop event and the ErrorOnDrop.
                    //In both case the control will be sent to you and you have to handle it explicitly.
                    //Drag drop WONT be handlig the cases with multiple selection implicitly.
                // },
                // "ErrorOnDrop": () => {
                    //If GetHelper callback is used then this callback have to be present. Else in case of any error on drop darg drop WILL not handle anything.
                // }
            },
            "Data": {
                "WelcomeMessage": "Hello User. The source is Drag Area."
            }
        };
        let objDropZoneProps = {
            "Meta": {
                "GroupId": intUniqueId,//same as its respective dragzone.
                "Disable": false,//if you want to dynamically disable the drag drop feature.
                "IsDraggable": true//if you want element to be dragged from the drop zone also the make this true else false.
            },
            "Events": {
                "OnDrop": (objDraggedElement, objDropArea, objSourceArea, objDragdropData) => {
                    //This is optional nomally, but if you send GetHelper callback then this event has to be present.
                    //Drag drop will not handle anything if it GetHelper is there and OnDrop is not there.
                    alert(objDragdropData["WelcomeMessage"]);
                    objDropArea.append(objDraggedElement);
                }
            },
            "CallBacks": {
                // "GetHelper": () => {
                    //This function should onlu be used if you have multiple selections.
                    //If you use this callback that makes its NECESSARY to pass the OnDrop event and the ErrorOnDrop.
                    //In both case the control will be sent to you and you have to handle it explicitly.
                    //Drag drop WONT be handlig the cases with multiple selection implicitly.
                // },
                // "ErrorOnDrop": () => {
                    //If GetHelper callback is used then this callback have to be present. Else in case of any error on drop darg drop WILL not handle anything.
                // }
            },
            "Data": {
                "WelcomeMessage": "Hello User. The source is Drop Area."
            }
        };
        return (
            <Dragdrop>
                <div className="sample-main-div">
                    <div className="container">
                        <DropZone {...objDropZoneProps}>
                            <div type="AnswerArea" className="dragdrop-html-sample-answer-area" />
                            <div type="AnswerArea" className="dragdrop-html-sample-answer-area" />
                            <div type="AnswerArea" className="dragdrop-html-sample-answer-area" />
                            <div type="AnswerArea" className="dragdrop-html-sample-answer-area" />
                            <div type="AnswerArea" className="dragdrop-html-sample-answer-area" />
                            <div type="AnswerArea" className="dragdrop-html-sample-answer-area" />
                            <div type="AnswerArea" className="dragdrop-html-sample-answer-area" />
                            <div type="AnswerArea" className="dragdrop-html-sample-answer-area" />
                            <div type="AnswerArea" className="dragdrop-html-sample-answer-area" />
                            <div type="AnswerArea" className="dragdrop-html-sample-answer-area" />
                            <div type="AnswerArea" className="dragdrop-html-sample-answer-area" />
                            <div type="AnswerArea" className="dragdrop-html-sample-answer-area" />
                            <div type="AnswerArea" className="dragdrop-html-sample-answer-area" />
                            <div type="AnswerArea" className="dragdrop-html-sample-answer-area" />
                            <div type="AnswerArea" className="dragdrop-html-sample-answer-area" />
                            <div type="AnswerArea" className="dragdrop-html-sample-answer-area" />
                            <div type="AnswerArea" className="dragdrop-html-sample-answer-area" />
                            <div type="AnswerArea" className="dragdrop-html-sample-answer-area" />
                            <div type="AnswerArea" className="dragdrop-html-sample-answer-area" />
                            <div type="AnswerArea" className="dragdrop-html-sample-answer-area" />
                        </DropZone>
                    </div>
                    <div className="container">
                        <DragZone {...objDragZoneProps}>
                            <div type="OptionArea" className="dragdrop-html-sample-option-area">
                                <div type="AnswerOption" className="dragdrop-html-sample-answer-option">
                                    Text 1
                            </div>
                            </div>
                            <div type="OptionArea" className="dragdrop-html-sample-option-area">
                                <div type="AnswerOption" className="dragdrop-html-sample-answer-option">
                                    Text 2
                            </div>
                            </div>
                            <div type="OptionArea" className="dragdrop-html-sample-option-area">
                                <div type="AnswerOption" className="dragdrop-html-sample-answer-option">
                                    Text 3
                            </div>
                            </div>
                            <div type="OptionArea" className="dragdrop-html-sample-option-area">
                                <div type="AnswerOption" className="dragdrop-html-sample-answer-option">
                                    Text 4
                            </div>
                            </div>
                            <div type="OptionArea" className="dragdrop-html-sample-option-area">
                                <div type="AnswerOption" className="dragdrop-html-sample-answer-option">
                                    Text 5
                            </div>
                            </div>
                            <div type="OptionArea" className="dragdrop-html-sample-option-area">
                                <div type="AnswerOption" className="dragdrop-html-sample-answer-option">
                                    Text 6
                            </div>
                            </div>
                            <div type="OptionArea" className="dragdrop-html-sample-option-area">
                                <div type="AnswerOption" className="dragdrop-html-sample-answer-option">
                                    Text 7
                            </div>
                            </div>
                            <div type="OptionArea" className="dragdrop-html-sample-option-area">
                                <div type="AnswerOption" className="dragdrop-html-sample-answer-option">
                                    Text 8
                            </div>
                            </div>
                            <div type="OptionArea" className="dragdrop-html-sample-option-area">
                                <div type="AnswerOption" className="dragdrop-html-sample-answer-option">
                                    Text 9
                            </div>
                            </div>
                            <div type="OptionArea" className="dragdrop-html-sample-option-area">
                                <div type="AnswerOption" className="dragdrop-html-sample-answer-option">
                                    Text 10
                            </div>
                            </div>
                            <div type="OptionArea" className="dragdrop-html-sample-option-area">
                                <div type="AnswerOption" className="dragdrop-html-sample-answer-option">
                                    Text 11
                            </div>
                            </div>
                            <div type="OptionArea" className="dragdrop-html-sample-option-area">
                                <div type="AnswerOption" className="dragdrop-html-sample-answer-option">
                                    Text 12
                            </div>
                            </div>
                            <div type="OptionArea" className="dragdrop-html-sample-option-area">
                                <div type="AnswerOption" className="dragdrop-html-sample-answer-option">
                                    Text 13
                            </div>
                            </div>
                            <div type="OptionArea" className="dragdrop-html-sample-option-area">
                                <div type="AnswerOption" className="dragdrop-html-sample-answer-option">
                                    Text 14
                            </div>
                            </div>
                            <div type="OptionArea" className="dragdrop-html-sample-option-area">
                                <div type="AnswerOption" className="dragdrop-html-sample-answer-option">
                                    Text 15
                            </div>
                            </div>
                            <div type="OptionArea" className="dragdrop-html-sample-option-area">
                                <div type="AnswerOption" className="dragdrop-html-sample-answer-option">
                                    Text 16
                            </div>
                            </div>
                            <div type="OptionArea" className="dragdrop-html-sample-option-area">
                                <div type="AnswerOption" className="dragdrop-html-sample-answer-option">
                                    Text 17
                            </div>
                            </div>
                            <div type="OptionArea" className="dragdrop-html-sample-option-area">
                                <div type="AnswerOption" className="dragdrop-html-sample-answer-option">
                                    Text 18
                            </div>
                            </div>
                            <div type="OptionArea" className="dragdrop-html-sample-option-area">
                                <div type="AnswerOption" className="dragdrop-html-sample-answer-option">
                                    Text 19
                            </div>
                            </div>
                            <div type="OptionArea" className="dragdrop-html-sample-option-area">
                                <div type="AnswerOption" className="dragdrop-html-sample-answer-option">
                                    Text 20
                            </div>
                            </div>
                        </DragZone>
                    </div>
                </div>
            </Dragdrop>
        );
    };

    return GetContent();
};

/**
 * @name Dragdrop_Sample.DynamicStyles
 * @param {object} props props
 * @summary Required for css
 * @returns {Array} arrStyles
 */
DragDrop_Sample.DynamicStyles = (props) => {
    return [
        props.JConfiguration.IntranetSkinPath + "/Css/Framework/ReactJs/PC/Controls/Dragdrop/DragdropStyles.css",
        props.JConfiguration.SupportApplication + "/Demo/PC/Modules/Framework/Controls/DragDrop_Sample/DragDrop_Sample.css"
    ];
};

export default DragDrop_Sample;
