// React related imports.
import React, { useReducer } from 'react';

//Base classes.
import * as Base_Hook from '@shared/Framework/BaseClass/Base_Hook';
import * as OfficeRibbon_Hook from '@shared/Framework/Controls/OfficeRibbon/OfficeRibbon_Hook';
import OfficeRibbon_ComponentProcessor from '@shared/Framework/Controls/OfficeRibbon/OfficeRibbon_ComponentProcessor';

//Components used.
import Tab from '@root/Framework/Controls/Tab/Tab';
import ToolBar from '@root/Framework/Controls/ToolBar/ToolBar';
import Slider from '@root/Framework/Controls/Slider/Slider';

//Helper files...
import ComponentLoader from '@root/Core/4_ComponentLoader/ComponentLoader';

/**
* @name OfficeRibbon
* @param {object} props props
* @summary This component displays the OfficeRibbon.
            * The Office Ribbon is divided into two parts. On top it displays the Tabs and below it displays the contents.
            * Based on the data passed,On Tab click OfficeRibbon's contents can -
                     * Show Toolbar control, if the OfficeRibbonContentData has the key "ToolBarData".
                     * Show Component, if the OfficeRibbonContentData has the key "ComponentName".
                     * If you dont pass neither of the two keys - sometimes, your module might need to do some action based on a Tab click. 
                        //For that you can pass the key OnTabClick, which is a callback event.        
* @returns {object} returns a jsx with provided data that will be displayed in it.
*/
const OfficeRibbon = props => {

    /**
    * @name [state,dispatch]
    * @summary Define state and dispatch for the reducer to set state.
    * @returns {[]} state and dspatch
    */
    const [state, dispatch] = useReducer(Base_Hook.Reducer, OfficeRibbon_Hook.GetInitialState(props));

    /**
    * @name objContext
    * @summary Groups state.dispatch and module object(s) in objContext.
    * @returns {object} objContext
    */
    let objContext = { state, props, dispatch, ["ModuleName"]: props.Id, ["OfficeRibbon_ComponentProcessor"]: new OfficeRibbon_ComponentProcessor() };

    /**
     * @name Initialize
     * @param {object} objContext context object
     * @summary Initialize method call to load the custom hooks.
     * @returns null
     */
    OfficeRibbon_Hook.Initialize(objContext);

    /**
     * @name  Initialize
     * @param {object} objContext objContext
     * @param {object} ModuleProcessor ModuleProcessor
     * @summary Initializing API and DynamicStyles
     * @returns null
     */
    objContext.OfficeRibbon_ComponentProcessor.Initialize(objContext, objContext.OfficeRibbon_ComponentProcessor);

    /**
    * @name GetOfficeRibbonTab
    * @summary Forms the Jsx of the OfficeRibbonTab
    * @returns {object} JSX for OfficeRibbonTab
    */
    const GetOfficeRibbonTab = () => {
        let OfficeRibbonTab = <Tab
            Id={props.Id + "Tab"}
            Data={{ TabData: props.Data.OfficeRibbonData }}
            Events={objContext.OfficeRibbon_ComponentProcessor.GetEvents(objContext)}
        />;
        return OfficeRibbonTab;
    };

    /**
    * @name GetOfficeRibbonContent
    * @summary Forms the Jsx of the GetOfficeRibbonContent
    * When the objOfficeRibbonContentData has ToolBarData => returns the ToolBar
    * When the objOfficeRibbonContentData has ComponentName => returns the Component
    * @returns {object} JSX for OfficeRibbonContent
    */
    const GetOfficeRibbonContent = () => {
        let OfficeRibbonContent = null;
        //Local state objOfficeRibbonContentData will be null initially, so we take the first data from the OfficeRibbonData...
        let objOfficeRibbonContentData = state.objOfficeRibbonContentData ? state.objOfficeRibbonContentData : props.Data.OfficeRibbonData[0] ? props.Data.OfficeRibbonData[0] : {};
        let objImageMeta = props.ImageMeta ? props.ImageMeta : {};
        if (objOfficeRibbonContentData.ToolBarData) {
            OfficeRibbonContent = <ToolBar
                Id={props.Id + "_ToolBar"}
                Data={objOfficeRibbonContentData}
                Resource={props.Resource}
                ImageMeta={{ ...objImageMeta, ...objOfficeRibbonContentData.ImageMeta }}
                ParentProps={props.ParentProps}
            />;
        }
        else if (objOfficeRibbonContentData.ComponentName) {
            OfficeRibbonContent = <ComponentLoader
                                        JConfiguration={props.ParentProps.JConfiguration}
                                        ComponentName={objOfficeRibbonContentData.ComponentName}
                                        ComponentController={props.ParentProps.ComponentController}
                                        DivName={"divRibbonContent"}
                                        IsForceClientRender={true}
                                    />;
        }
        return <div className="ribbon-slider" id={props.Id + "_SliderDiv"}> {OfficeRibbonContent} </div>;;
    };

    /**
    * @name GetContent
    * @summary OfficeRibbon JSX formation 
    * @returns {object} JSX for OfficeRibbon
    */
    const GetContent = () => {
        let OfficeRibbon = <React.Fragment>
                                {GetOfficeRibbonTab()}
                                <Slider
                                    ref={objContext.state.refSlider}
                                    Id={props.Id + "_Slider"}
                                    Meta={{
                                        ParentDivId: props.Id + "_OfficeRibbon",
                                        SliderDivId: props.Id + "_SliderDiv"
                                    }}
                                    JConfiguration={props.Resource.JConfiguration}
                                    {...props}
                                >
                                    <div id={props.Id + "_OfficeRibbon"} className="ribbon">
                                                        {GetOfficeRibbonContent()}
                                    </div>
                                </Slider>
                            </React.Fragment>
        return OfficeRibbon;
    };

    return GetContent();
};

export default OfficeRibbon;