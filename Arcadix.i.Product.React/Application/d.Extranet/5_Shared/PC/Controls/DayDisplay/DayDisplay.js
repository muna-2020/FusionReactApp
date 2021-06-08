//React related imports.
import React, { useReducer } from 'react';
import { connect } from 'react-redux';

//Base classes.
import * as ExtranetBase_Hook from '@shared/Framework/BaseClass/ExtranetBaseClass/ExtranetBase_Hook';

//Module related files.
import * as WeekDisplay_Hook from '@shared/Application/d.Extranet/5_Shared/Controls/WeekDisplay/WeekDisplay_Hook';
import WeekDisplay_ModuleProcessor from '@shared/Application/d.Extranet/5_Shared/Controls/WeekDisplay/WeekDisplay_ModuleProcessor';

//Inline Images import
import AngleLeftDarkImage from '@inlineimage/Application/d.Extranet/5_Shared/PC/angle_left_dark.png?inline';
import AngleRightDarkImage from '@inlineimage/Application/d.Extranet/5_Shared/PC/angle_right_dark.png?inline';

/**
* @name DayDisplay
* @param {object} props props
* @summary This component displays the DayDisplay data in form and let us manipulate those data.
* @returns {object} div that encapsulated the form with DayDisplay details.
*/
const DayDisplay = props => {
    /**
    * @name [state,dispatch]
    * @summary Define state and dispatch for the reducer to set state.
    * @returns {[]} state and dispatch
    */
    const [state, dispatch] = useReducer(ExtranetBase_Hook.Reducer, WeekDisplay_Hook.GetInitialState());

    /**
    * @name objContext
    * @summary Groups state, dispatch and module object(s) in objContext.
    * @returns {object} objContext
    */
    let objContext = { state, props, dispatch, ["WeekDisplay_ModuleProcessor"]: new WeekDisplay_ModuleProcessor() };

    /**
    * @name Initialize
    * @param {object} objContext context object
    * @summary Initialize method call in LearningJournal_Hook, that contains all the custom hooks.
    * @returns null
    */
    WeekDisplay_Hook.Initialize(objContext);

    /**
    * @name GetContent
    * @summary Forms the whole jsx required for the module.
    * @returns {object} jsx, React.Fragment
    */
    function GetContent() {
        let strStartDate = "";
        let strEndDate = "";
        let strCurrentDate = "";
        if (state.intCategory === 2) {
            //strStartDate = objContext.WeekDisplay_ModuleProcessor.GetLoacleDate(objContext, state.StartDate);
            //strEndDate = objContext.WeekDisplay_ModuleProcessor.GetLoacleDate(objContext, state.EndDate);

            strStartDate = objContext.WeekDisplay_ModuleProcessor.GetFormattedLocaleStartDate(objContext, state.StartDate);
            strEndDate = objContext.WeekDisplay_ModuleProcessor.GetFormattedLocaleEndDate(objContext, state.EndDate);
        }
        else {
            //strCurrentDate = objContext.WeekDisplay_ModuleProcessor.GetLoacleDate(objContext, state.CurrentDate);
            strCurrentDate = objContext.WeekDisplay_ModuleProcessor.GetFormattedLocaleCurrentDate(objContext, state.CurrentDate);
        }
        return (
                <div className="slider-flex">
                    {
                        !state.isLeftEnd ?
                        <button className="slider slide-left" style={{ backgroundColor: props.backgroundColor }} onClick={() => { objContext.WeekDisplay_ModuleProcessor.GetDateRangeForDisplay( objContext, true, false);}}>
                            <img src={AngleLeftDarkImage } alt=""/>
                        </button>:
                        <button className="slider slide-left disabled" style={{ backgroundColor: props.backgroundColor }} disabled>
                            <img src={AngleLeftDarkImage } alt=""/>
                        </button>
                    }
                    {
                        state.intCategory === 2 ?
                        <div className="slider-data" style={{ backgroundColor: props.backgroundColor }} >
                            {state.DisplayFor}: {strStartDate} - {strEndDate}
                        </div>:
                        <div className="slider-data" style={{ backgroundColor: props.backgroundColor }}>
                            {strCurrentDate}
                        </div>
                    }
                    {
                        !state.isRightEnd ?
                        <button className="slider slide-right" style={{ backgroundColor: props.backgroundColor }} onClick={() => { objContext.WeekDisplay_ModuleProcessor.GetDateRangeForDisplay(objContext, false, true); }}>
                            <img src={AngleRightDarkImage} alt="" />
                        </button>:
                        <button className="slider slide-right disabled" style={{ backgroundColor: props.backgroundColor }} disabled>
                            <img src={AngleRightDarkImage} alt="" />
                        </button>
                    }
                </div>
            );
    }


  return (
    <React.Fragment>
      {state.isLoadComplete ? GetContent() : <React.Fragment />}
    </React.Fragment>
  );
};

/**
* @name connect
* @summary Calls mapStateToProps of ExtranetBase_Hook and exports the component, connects store to Module
*/
export default connect(ExtranetBase_Hook.MapStoreToProps(WeekDisplay_ModuleProcessor.StoreMapList()))(DayDisplay);


/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = WeekDisplay_ModuleProcessor; 