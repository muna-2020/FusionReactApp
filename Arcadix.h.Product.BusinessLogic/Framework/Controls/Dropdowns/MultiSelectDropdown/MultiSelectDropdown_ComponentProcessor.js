//Base classes.
import Base_ModuleProcessor from '@shared/Framework/BaseClass/Base_ModuleProcessor';

/**
* @name HierachicalDropdown_ComponentProcessor
* @summary Class for MultiSelectDropdown.
*/
class MultiSelectDropdown_ComponentProcessor extends Base_ModuleProcessor {

    /**
     * @name ClickHandler
     * @param {*} objContext objContext
     * @param {*} objSelectedItem objSelectedItem
     * @summary ClickHandler function is used to select the options from the list  
     * first it checks if the click item is present in the 'state.arrSelectedItem' if its present then  'blnRemoveItem = true;'
     * its removed from the list if not then  blnIsItemPresent = false; its added to the list.
     * OnChangeEventHandler callback function to return entire array           
    */
     ClickHandler(objContext,objSelectedItem){
        let blnIsItemPresent = true;
        let blnRemoveItem = false;
         if (objContext.state.arrSelectedItem.length > 0) {
             objContext.state.arrSelectedItem.map((objItem) => {
                 if (objItem[objContext.props.Meta.ValueColumn] == objSelectedItem[objContext.props.Meta.ValueColumn]) {
                    blnRemoveItem = true;
                }
                else {
                    blnIsItemPresent = false;
                }

            });
        }
        else {
            blnIsItemPresent = false;
        }

        let arrNewValue = []; //Temporary value for return(made by aviral).
        if (!blnIsItemPresent) {
            arrNewValue = [...objContext.state.arrSelectedItem, objSelectedItem];
            objContext.dispatch({ type: "SET_STATE", payload: { "arrSelectedItem": arrNewValue } });
        }

        if (blnRemoveItem === true) {
            arrNewValue = objContext.state.arrSelectedItem.filter((objItem) => objItem[objContext.props.Meta.ValueColumn] !== objSelectedItem[objContext.props.Meta.ValueColumn]);
            blnRemoveItem === false;
            objContext.dispatch({ type: "SET_STATE", payload: { "arrSelectedItem": arrNewValue } });
        }
        document.addEventListener("click", HideOption);
         objContext.props.Events.OnChangeEventHandler ? objContext.props.Events.OnChangeEventHandler(arrNewValue, objContext.props) : () => { };
    }
}
export default MultiSelectDropdown_ComponentProcessor;