// React related imports.
import React from 'react';

/**
* @name Tab
* @param {object} props props
* @summary * Takes data as props and forms the tab. Has a callback method “OnTabClick()”
* @returns {object} returns a jsx with provided data that will be displayed in it.
*/
const Tab = props => {

    /**
    * @name GetContent
    * @summary Tab JSX formation 
    * @returns {object} JSX for Tab formation
    */
    const GetTabs = () => {
        let Tabs = props.Data.TabData.map((objTabData, intIndex) => {
            return <li id={props.Id + "_li_" + intIndex} key={props.Id + "_li_" + intIndex} onClick={() => {
                        if (props.Events.OnTabClick) {
                            props.Events.OnTabClick(objTabData);
                        }
                    }} >{objTabData.Text}
                    </li>;
        });
        return Tabs;
    };

    /**
    * @name GetContent
    * @summary Tab JSX formation 
    * @returns {object} JSX for Tab
    */
    const GetContent = () => {
        return <ul className="nav-list" id={props.Id + "_ul"} >{GetTabs()}</ul>;
    };

    return GetContent();
};

export default Tab;