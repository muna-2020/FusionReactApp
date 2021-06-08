import React from 'react';
import * as BusinessLogic from '@shared/Application/e.Editor/Modules/6_CMSElement/CMSEmpty/CMSEmpty_TestApplication/CMSEmpty_TestApplication';
import * as Common from '@root/Application/e.Editor/PC/Modules/6_CMSElement/CMSEmpty/CMSEmpty_Common/CMSEmpty_Common';
//Modules used
import * as Helper from '@root/Application/e.Editor/PC/Modules/7_Text/Text_Editor/Common/Helper';

const CMSEmpty_TestApplication = (props, ref) => {

  /**
   * Copy-Paste this!!!!
   * State Initilization copy Paste this
   */
    const [state, dispatch] = useReducer(BusinessLogic.Reducer, { ElementJson: props.ElementJson, PageId: props.PageId, ComponentKey: props.ComponentKey });

    /**
     *   Copy-Paste this!!!
     *   Additional AnserJson variable declared to store UserInput this is passed as part of objContext to business Logic
     */
    let arrAnswerJson = useRef([]);
    let objContext = { state, dispatch, props, arrAnswerJson };

  /**
     * event handler to be snet to commmon method
     * @param {*} objEvent 
     */
    const EventHandler = (objEvent) => {
    }

    /**
     * Copy-Paste this!!!!
     *  This is required to get the use response
     */
    useImperativeHandle(props.forwardedRef, () => ({
        GetUserResponse: () => {
            return {
                iElementId: state.ElementJson.iElementId, iElementType: state.ElementJson.iElementType, Answers: arrAnswerJson.current
            };
        }
    }), [state, props]);

    return (<div>
        {Common.renderCommonJSX({
            EventName: EventHandler
        })}
        <span>Your Test Application specific JSX</span>
    </div>);
};

export default Helper.forwardComponent(CMSEmpty_TestApplication);