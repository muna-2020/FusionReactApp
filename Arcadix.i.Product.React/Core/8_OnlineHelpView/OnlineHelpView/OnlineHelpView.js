//React Related Modules
import React, { useReducer } from 'react';
import { connect } from "react-redux";

//Module related import
import * as OnlineHelpView_Hook from '@shared/Core/8_OnlineHelpView/OnlineHelpView/OnlineHelpView_Hook';
import OnlineHelpView_ModuleProcessor from '@shared/Core/8_OnlineHelpView/OnlineHelpView/OnlineHelpView_ModuleProcessor';
import TaskContentPreview from '@root/Application/f.TestApplication/PC/InlineStart/Preview/TaskPreview/TaskContentPreview';

//Application State Classes
import * as Base_Hook from '@shared/Framework/BaseClass/Base_Hook';



/**
 * @name OnlineHelpView
 * @param {object} props props object
 * @summary OnlineHelpView
 * @returns {object} OnlineHelpView
 */
const OnlineHelpView = (props) => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     * @returns {[]} state and dspatch
     */
    const [state, dispatch] = useReducer(Base_Hook.Reducer, OnlineHelpView_Hook.GetInitialState(props));

    /**
     * @name Assigning objContext
     * @summary Groups state, props and dispatch which can be passed across method in the module and used
     */
    let objContext = { state, props, dispatch, OnlineHelpView_ModuleProcessor: new OnlineHelpView_ModuleProcessor() };

    /**
     * @name Initialize
     * @param {object} objContext context object
     * @summary Initialize the OnlineHelpView Preview properties which is required for render the page
     * @returns null
     */
    OnlineHelpView_Hook.Initialize(objContext);

    /**
     * @name GetContent
     * @summary Forms the whole jsx required for the module.
     * @returns {object} jsx, React.Fragment
     */
    const GetContent = () => {        
        return (
            props.HelpData && props.HelpData.HelpAction == "Open"
                ?
                <div className="online-help-popup show"> {/*show should be removed when we don't want to show the popup */}
                    <div className= "controls">
                        <img src={objContext.props.JConfiguration.IntranetSkinPath + "/Images/Common/Icons/newWindow.png"} onClick={() => { objContext.OnlineHelpView_ModuleProcessor.ContentPreview(objContext) }} />
                        <img src={objContext.props.JConfiguration.IntranetSkinPath + "/Images/Common/Icons/PrintToPdf.svg"} onClick={() => objContext.OnlineHelpView_ModuleProcessor.PrintToPdf(objContext) } />
                        <img src={objContext.props.JConfiguration.IntranetSkinPath + "/Images/Common/Icons/closeDivs.svg"} onClick={() => objContext.OnlineHelpView_ModuleProcessor.HandleOnClose(objContext)} />
                    </div>
                    {
                        state.strPageId 
                            ?
                            state.strPageId == "NO_CONTENT"
                                ?
                                <div>NO_CONTENT</div>
                                :
                                <TaskContentPreview
                                    {...props}
                                    PageJson={state.PageJson} />
                            :
                            <React.Fragment />
                    }
                </div>
                :
                <React.Fragment />
        );
    };

    return GetContent();
};

export default connect(Base_Hook.MapStoreToProps(OnlineHelpView_ModuleProcessor.StoreMapList()))(OnlineHelpView);
