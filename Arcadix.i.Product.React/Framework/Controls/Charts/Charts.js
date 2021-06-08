// React related imports.
import React, { Component, useReducer, useRef, useEffect } from 'react';

//Base classes.
import * as IntranetBase_Hook from '@shared/Framework/BaseClass/IntranetBaseClass/IntranetBase_Hook';

//Component related fies.
import * as Charts_Hook from '@shared/Framework/Controls/Charts/Charts_Hook';
import Charts_ComponentProcessor from '@shared/Framework/Controls/Charts/Charts_ComponentProcessor';

/**
 * * @name Charts
* @param {object} props props
* @summary This component displays the Charts.
* @returns {object} React.Fragment that contains the Chart JSX.
*/
const Charts = props => {

	/**
	 * @name [state,dispatch]
	 * @summary Define state and dispatch for the reducer to set state.
	 * @returns {[]} state and dispatch
	 */
	const [state, dispatch] = useReducer(IntranetBase_Hook.Reducer, {});

   /**
    * @name objContext
    * @summary Groups state.dispatch and module object(s) in objContext.
    * @returns {object} objContext
    */
	let objContext = { state, props, dispatch, ["ModuleName"]: props.Id, refContainer : useRef(null), ["Charts_ComponentProcessor"]: new Charts_ComponentProcessor() };

    /**
     * @name  Initialize
     * @param {object} objContext objContext
     * @param {object} ModuleProcessor ModuleProcessor
     * @summary Initializing API and DynamicStyles
     * @returns null
     */
	objContext.Charts_ComponentProcessor.Initialize(objContext, objContext.Charts_ComponentProcessor);

	/**
	 * @name refContainer
	 * @summary creates ref for chart.
	 * @returns {object} refContainer
	 */
	//const refContainer = useRef(null);

	/**
     * @name Initialize
     * @param {object} objContext context object
     * @summary Initialize method call in Charts_Hook, that contains all the custom hooks.
     * @returns null
     */
	Charts_Hook.Initialize(objContext);

	/**
	 * @name GetContent
	 * @summary Forms the  jsx required for the PDataX.
	 * @returns {object} jsx, React.Fragment
	 */
	const GetContent = () => {
		return <div className="chart-area" ref={objContext.refContainer}></div>;
	}

	return GetContent()	
}

export default Charts;