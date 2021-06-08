import LearningJournalArchive_ModuleProcessor_Browser from '@shared/Application/d.Extranet/3_Teacher/PC/Modules/LearningJournalArchive/LearningJournalArchive_ModuleProcessor';

/**
* @name LearningJournalArchive_ModuleProcessor
* @summary Class for LearningJournal module display and manipulate.
*/
class LearningJournalArchive_ModuleProcessor extends LearningJournalArchive_ModuleProcessor_Browser {



    /**
    * @name GetDynamicStlyes
    * @param {object} props props
    * @returns {object} DynamicStlyes
    */
    GetDynamicStyles(props) {
        return [
            JConfiguration.ExtranetSkinPath + "/Css/Application/3_Teacher/ReactJs/Phone/Modules/LearningJournalArchive/LearningJournalArchive.css",
            JConfiguration.ExtranetSkinPath + "/Css/Application/5_SharedModule/ReactJs/PC/WeekDisplay/WeekDisplay.css",
            JConfiguration.ExtranetSkinPath + "/Css/Framework/ReactJs/PC/Controls/DropDowns/Dropdown/DropDown.css"
        ];
    }

    SetAccordionIndex(objContext, intIndex) {
        if(objContext.state.intSelectedAccordionIndex == intIndex)
            objContext.dispatch({ type: "SET_STATE", payload: { "intSelectedAccordionIndex": -1 } });
        else
            objContext.dispatch({ type: "SET_STATE", payload: { "intSelectedAccordionIndex": intIndex } });
    }
}

export default LearningJournalArchive_ModuleProcessor;