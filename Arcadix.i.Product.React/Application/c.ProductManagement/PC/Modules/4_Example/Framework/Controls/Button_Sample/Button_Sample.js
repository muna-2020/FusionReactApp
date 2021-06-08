// React related impoprts.
import React from 'react';

//Module realted fies.
import Button from '@root/Framework/Controls/Button/Button';
import * as Button_Sample_Hook from '@shared/Application/c.ProductManagement/Modules/4_Example/Framework/Controls/Button_Sample/Button_Sample_Hook';
import * as Button_Sample_ModuleProcessor from '@shared/Application/c.ProductManagement/Modules/4_Example/Framework/Controls/Button_Sample/Button_Sample_ModuleProcessor';
 
const OnClickEvent = () => {
    alert("button is clicked")
}

const Button_Sample = props => {

    /**
     * @name useDataLoaded
     * @param {object} objContext context object
     * @summary Makes showAnimation false in store.
     * @returns null
     */
    Button_Sample_Hook.useDataLoaded();

    return (
        <React.Fragment>
            <Button
                Resource={{"ButtonImagePath": props.JConfiguration.ExtranetSkinPath + '/Images/Common/Icons/pluswhite.svg',"ButtonText": "DownloadButton"}}
                Meta={{"ClassName": "button brown-button"}}
                Events={{ "OnClickEventHandler": () => Button_Sample_ModuleProcessor.OnClickEvent}}/>
        </React.Fragment>
    )
}

export default Button_Sample;
