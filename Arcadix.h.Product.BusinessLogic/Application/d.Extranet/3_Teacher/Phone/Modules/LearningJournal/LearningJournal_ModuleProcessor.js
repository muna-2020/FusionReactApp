//Base class imports
import LearningJournal_ModuleProcessor_Browser from '@shared/Application/d.Extranet/3_Teacher/PC/Modules/LearningJournal/LearningJournal_ModuleProcessor';

/**
* @name LearningJournal_ModuleProcessor
* @summary Class for LearningJournal module display and manipulate.
*/
class LearningJournal_ModuleProcessor extends LearningJournal_ModuleProcessor_Browser {

    

    /**
     * @name GetDynamicStyles
     * @param {*} props props
     * @summary Gets dynamic styles for the component.
     * @returns {*} array
     */
    GetDynamicStyles(props) {
        return [
            JConfiguration.ExtranetSkinPath + "/Css/Application/3_Teacher/ReactJs/Phone/Modules/LearningJournal/LearningJournal.css",
            // JConfiguration.ExtranetSkinPath + "/Css/Application/5_SharedModule/ReactJs/PC/WeekDisplay/WeekDisplay.css",
            // JConfiguration.ExtranetSkinPath + "/Css/Framework/ReactJs/PC/Controls/DropDowns/Dropdown/DropDown.css"
        ];
    };

    SetAccordionIndex(objContext, intIndex) {
        if(objContext.state.intSelectedAccordionIndex == intIndex)
            objContext.dispatch({ type: "SET_STATE", payload: { "intSelectedAccordionIndex": -1 } });
        else
            objContext.dispatch({ type: "SET_STATE", payload: { "intSelectedAccordionIndex": intIndex } });
    }

    
}

export default LearningJournal_ModuleProcessor;