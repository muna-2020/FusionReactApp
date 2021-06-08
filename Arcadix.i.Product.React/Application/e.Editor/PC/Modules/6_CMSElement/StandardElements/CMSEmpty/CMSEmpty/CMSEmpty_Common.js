import React from 'react';
/*
*  This file only needs to be implemented if there is come JSX or functionality that can be shared between the Editor and Test Application Versions
*/

/**
 *  sample method which renders common jsx
 * @param {*} objEvents => object which contains events sent from either the Editor or Test Application version of the code, will be directly bound
 * to the respective event handlers as shown below
 */
   export const renderCommonJSX =(objEvents)=>{
         return(<div onEvent={objEvents.EventName}>Common JSX</div>)
    }


