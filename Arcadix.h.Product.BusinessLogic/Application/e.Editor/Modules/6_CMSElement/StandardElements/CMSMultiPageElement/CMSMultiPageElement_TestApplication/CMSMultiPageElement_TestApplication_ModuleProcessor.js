//Base classes/hooks.
import EditorBase_ModuleProcessor from '@shared/Framework/BaseClass/EditorBaseClass/EditorBase_ModuleProcessor';

/**
 * @name CMSMultiPageElement_TestApplication_ModuleProcessor
 * @summary Contains the checkbox's test application version module specific methods.
 * */
class CMSMultiPageElement_TestApplication_ModuleProcessor extends EditorBase_ModuleProcessor {

    /**
     * @name AddOrDeleteSlide
     * @param {object} objContext {props, state, dispatch}
     * @param {int} intSelectedIndex current slide index
     * @param {object} unSavedState unsaved state params 
     * @summary Adds/Deletes the selected slide and also gets the updated element json of child
     */
    AddOrDeleteSlide(objContext, intSelectedIndex, unSavedState = {}) {
        let elementJson; let elementsCount; let arrSubElements; let objStateParams;
        if (unSavedState.ElementJson && unSavedState.ElementJson["vElementJson"].Values) {
            elementsCount = unSavedState.ElementJson["vElementJson"].Values.length;
            arrSubElements = [...unSavedState.ElementJson["vElementJson"].Values];
        }
        else {
            elementsCount = objContext.state.ElementJson["vElementJson"].Values.length;
            arrSubElements = [...objContext.state.ElementJson["vElementJson"].Values];
        }
        let intIndex = parseInt(intSelectedIndex);
        intSelectedIndex = intIndex > elementsCount - 1 || intIndex === 0 ? 0 : intIndex < 0 ? elementsCount - 1 : intIndex;
        elementJson = arrSubElements[intSelectedIndex];
        if (elementJson) {
            if (elementJson.vElementTypeName.toLowerCase() !== "empty") {
                if (elementJson.vElementTypeName.toLowerCase() === "text") {
                    elementJson = objContext.state.ElementJson["vElementJson"].TextElements.filter(ele => ele.iElementId === elementJson.iElementTextId)[0];
                }
                else {
                    elementJson = objContext.state.ElementJson["vElementJson"].Values.filter(ele => ele.iElementId === elementJson.iElementId)[0];
                }
            }
            objStateParams = {
                ...objStateParams,
                "intCurrentSlideIndex": intSelectedIndex,
                "objCurrentSlideElementJson": elementJson,
                ...unSavedState
            };
            objContext.dispatch({ "type": "SET_STATE", "payload": objStateParams });
        }
    }

    /**
     * @name HandleSlideNavigation
     * @param {object} objContext {props, state, dispatch}
     * @param {int} strNavigateTo Previous/Next
     * @summary handles slide navigation
     */
    HandleSlideNavigation(objContext, strNavigateTo) {
        let intSlideValue = 1;
        if (strNavigateTo === "Previous") {
            intSlideValue = -1;
        }
        if (objContext.state.intSlideLength > 1) {
            objContext.CMSMultiPageElement_TestApplication_ModuleProcessor.AddOrDeleteSlide(objContext, intSlideValue + objContext.state.intCurrentSlideIndex);
        }
    }

    /**
     * @name GetDynamicStyles
     * @param {object} props component props.
     * @summary this returns the styles for the SSR.
     */
    GetDynamicStyles(props) {
        return [props.JConfiguration.EditorSkinPath + "/Css/Application/ReactJs/PC/Modules/6_CMSElement/CMSMultiPageElement/CMSMultiPageElement.css"];
    }
}

export default CMSMultiPageElement_TestApplication_ModuleProcessor;
