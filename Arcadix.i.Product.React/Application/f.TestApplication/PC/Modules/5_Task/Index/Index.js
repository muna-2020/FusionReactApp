//React related imports
import React from 'react';

//Handle's on click event
import IndexDisplay from '@root/Application/f.TestApplication/PC/Modules/5_Task/Index/IndexDisplay/IndexDisplay';


/**
 * @name  Index
 * @summary for Linear Index Method
 * @param {any} props
 * @returns {object} 
 */
const Index = (props) => {

    /**
     * @name  Index
     * @summary Load indexDisplay Component
     * @param {any} props
     * @returns {object} jsx for index
     */
    const GetData = () => {
        return (
            <div> 
                <IndexDisplay {...props} />
            </div>)
    }

    return props.TestState.LinearTestProperties ? props.TestState.LinearTestProperties.IsShowLinearIndex === "Y" ? GetData() : "" : ""
 }

export default Index;