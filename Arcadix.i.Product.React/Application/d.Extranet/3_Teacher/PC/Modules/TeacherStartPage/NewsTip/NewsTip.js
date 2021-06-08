//React related imports.
import React, { useReducer } from 'react';
import { connect } from 'react-redux';

//Module related files.
import * as NewsTip_Hook from '@shared/Application/d.Extranet/3_Teacher/PC/Modules/TeacherStartPage/NewsTip/NewsTip_Hook';
import NewsTip_ModuleProcessor from '@shared/Application/d.Extranet/3_Teacher/PC/Modules/TeacherStartPage/NewsTip/NewsTip_ModuleProcessor';

//Components used in module.
import TaskContentPreview from '@root/Application/f.TestApplication/PC/InlineStart/Preview/TaskPreview/TaskContentPreview';

//Inline Images import
import CloseImage from '@inlineimage/Application/d.Extranet/5_Shared/PC/close.svg?inline';
import RightArrowImage from '@inlineimage/Application/d.Extranet/5_Shared/PC/arrow_right.svg?inline';
import LeftArrowImage from '@inlineimage/Application/d.Extranet/5_Shared/PC/arrow_left.svg?inline';

/**
* @name NewsTip
* @param {object} props props
* @summary This component displays the NewsTip data.
* @returns {object} div that encapsulated the NewsTip div with its details.
*/
const NewsTip = props => {
    /**
    * @name [state,dispatch]
    * @summary Define state and dispatch for the reducer to set state.
    * @returns {[]} state and dispatch
    */
    const [state, dispatch] = useReducer(ExtranetBase_Hook.Reducer, NewsTip_Hook.GetInitialState(props));

    /**
    * @name objContext
    * @summary Groups state, dispatch and module processor, TextResource object in objContext.
    * @returns {object} objContext
    */
    let objContext = { state, props, dispatch, ["NewsTip_ModuleProcessor"]: new NewsTip_ModuleProcessor() };


    /**
    * @name  Initialize
    * @param {object} props Props
    * @param {object} ModuleProcessor Props
    * @summary Initializing  DynamicStyles and DataForSSR
    * @returns Setting ApplicationState
    */
    objContext.NewsTip_ModuleProcessor.Initialize(objContext, objContext.NewsTip_ModuleProcessor);

    /**
    * @name Initialize
    * @param {object} objContext context object
    * @summary Initialize method call in Teacher_Hook, that contains all the custom hooks.
    * @returns null
    */
    NewsTip_Hook.Initialize(objContext);

    function GetNewsList() {
        let arrNewsTipData = props.NewsTipData;
        return <React.Fragment>
            <div className="tips-popup-overlay">
                <div className="tips-popup-outer-div">
                    <div className="inner-div">
                        <div className="tips-popup-container">
                            <div className="header-flex">
                                <span>Neue Tipps</span>
                                <span onClick={() => { objContext.NewsTip_ModuleProcessor.CloseNewsTip(objContext); }} className="close">
                                    <span>Schliessen</span>
                                    <img src={CloseImage} className="close-icon" />
                                </span>
                            </div>
                            <div className="tp-content">
                                {
                                    arrNewsTipData.map(objNewsTip => {
                                        let strTitle = objNewsTip.t_TestDrive_Tip_Data.find(objTipData => objTipData["iLanguageId"] == JConfiguration.InterfaceLanguageId).vTipTitle;
                                        let strDate = objContext.NewsTip_ModuleProcessor.GetFormattedDate(objNewsTip["dtTipDate"]);
                                        return <div className="tp-flex" onClick={() => objContext.NewsTip_ModuleProcessor.ShowNewsTipContent(objContext, objNewsTip)}><span className="blue-text">{strTitle}</span> <span>({strDate})</span></div>
                                    })
                                }
                            </div>
                            <div className="tp-footer">
                                <span className="green-button" onClick={() => { objContext.NewsTip_ModuleProcessor.CloseNewsTip(objContext); }}>Fenster schliessen</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    }

    function GetNewsTipContent() {
        let intLastTipObjectId = props.NewsTipData[props.NewsTipData.length - 1].uTipId;


        let objTaskDetails = { 'iPageId': state.objNewsTip["iPageId"], 'iLanguageId': 3 };
        let objTaskPageProperties = {
            'TaskPageProperties': {
                'PageJson': state.objNewsTip["PageJson"]
            }
        };

        //let objTaskContentPreviewProps = {
        //    ...props, "TaskDetails": objTaskDetails,
        //    "TestState": objTaskPageProperties          
        //};

        {/* ApplicationState.SetProperty("TestState", {
            "TaskDetails": objTaskDetails,
            "TaskPageProperties": {
                'PageJson': state.objNewsTip["PageJson"]
            }
        }); */}

        let strDate = objContext.NewsTip_ModuleProcessor.GetFormattedDate(state.objNewsTip["dtTipDate"]);

        return <React.Fragment>
            <div className="tips-popup-overlay">
                <div className="tips-popup-outer-div">
                    <div className="inner-div">
                        <div className="tips-box">
                            <div className="tips-title">
                                <div class="date-flex">
                                    <div onClick={() => { objContext.NewsTip_ModuleProcessor.UpdateNewsTipContent(objContext, "Previous") }}>
                                        <img src={LeftArrowImage} />
                                    </div>
                                    <span>{strDate}</span>
                                    {state.objNewsTip.uTipId == intLastTipObjectId ?
                                        <React.Fragment /> :
                                        <div onClick={() => { objContext.NewsTip_ModuleProcessor.UpdateNewsTipContent(objContext, "Next") }}>
                                            <img src={RightArrowImage} />
                                        </div>
                                    }
                                </div>
                                <span class="back-to-index" onClick={() => { objContext.dispatch({ type: "SET_STATE", payload: { "blnShowNewsTipContent": false } }); }}>Zurück zum Index</span>
                                <span onClick={() => { objContext.NewsTip_ModuleProcessor.CloseNewsTip(objContext); }} class="close-btn">
                                    <span>Schliessen </span>
                                    <img src={CloseImage} />
                                </span>
                            </div>
                            <div className="tips-content">
                                {/*<TaskContentPreview  {...objTaskContentPreviewProps} /> */}
                                <TaskContentPreview PageJson={state.objNewsTip["PageJson"]} JConfiguration={{ ...JConfiguration }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    }

    function GetContent() {
        return state.blnShowNewsTipContent ? GetNewsTipContent() : GetNewsList();
    }

    return GetContent();

};

/**
* @name connect
* @summary Calls mapStateToProps of ExtranetBase_Hook and exports the component, connects store to Module
*/
export default connect(ExtranetBase_Hook.MapStoreToProps(NewsTip_ModuleProcessor.StoreMapList()))(NewsTip);

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = NewsTip_ModuleProcessor; 