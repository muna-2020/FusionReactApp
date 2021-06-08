// React related imports.
import React from 'react';

/**
 * @name AdditionalProperties
 * @param {object} props props
 * @summary This component is used for AdditionalProperties in Add/EditTask.
 * @returns {object} React.Fragement that contains the content to be added in popup required for add/edit.
 */
const AdditionalProperties = props => {

    /**
     * @name GetAdditionalPropertyDiv
     * @summary Calls the ComponentControlelr to load the ClientSpecific AdditionalProperty module.
     * @returns {object} jsx, React.Fragment
     */
    const GetAdditionalPropertyDiv = () => {
        var strModuleName = "TaskAdditionalProperty";
        let AdditionalProperty = props.ParentProps.ComponentController.GetComponent(strModuleName);
       
        if (AdditionalProperty != undefined)
            return AdditionalProperty;
        else
             return <React.Fragment /> 
    }

    /**
     * @name GetContent
     * @summary Forms the whole jsx required for the component.
     * @returns {object} jsx, React.Fragment
     */
    const GetContent = () => {
        //let AdditionalProperty = GetAdditionalPropertyDiv();
        var strModuleName = "TaskAdditionalProperty";
        let AdditionalProperty = props.ParentProps.ComponentController.GetComponent(strModuleName);
        if (AdditionalProperty != undefined)
            return <AdditionalProperty
                {...props}
                Data={{
                    TaskAdditionalProperty: props.Data.TaskAdditionalProperty,
                    TaskAdditionalPropertyValue: props.Data.TaskAdditionalPropertyValue,
                    AssignedAdditionalTaskPropertyData: props.Data.AssignedAdditionalTaskPropertyData,
                    SubjectId: props.Data.SubjectId,
                    CategoryId: props.Data.CategoryId,
                    CategoryCompetencyId: props.Data.CategoryCompetencyId
                }}
                Resource={{
                    Text: props.Resource.Text,
                    JConfiguration: props.Resource.JConfiguration,
                    SkinPath: props.Resource.SkinPath
                }}
                Events={{
                    AdditionalPropHandleChange: (arrTestDrive_Task_AssignedAdditionalTaskProperty) => props.Events.AdditionalPropHandleChange(arrTestDrive_Task_AssignedAdditionalTaskProperty),
                    IsTheDropDownToShow: (strKey) => props.Events.IsTheDropDownToShow(strKey)
                }}
            />     
        else
            return <React.Fragment /> 
       
    }

    return (
        GetContent()
    )
}

export default AdditionalProperties;
