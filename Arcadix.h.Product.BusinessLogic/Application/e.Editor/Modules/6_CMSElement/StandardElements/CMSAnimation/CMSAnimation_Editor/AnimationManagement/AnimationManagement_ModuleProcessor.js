//Module realted fies.
import AnimationManagement_ContextMenu from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSAnimation/CMSAnimation_Editor/AnimationManagement/AnimationManagement_ContextMenu";

//Application State classes/methods
import ApplicationState from "@shared/Framework/DataService/ApplicationState/ApplicationState";

// ArcadixFetchData class
import ArcadixFetchData from '@shared/Framework/DataService/ArcadixFetchData/ArcadixFetchData';

//Module Object
import Object_TaskContent_CMSElement_CMSAnimation from "@shared/Object/e.Editor/TaskContent/3_CMSElement/CMSAnimation";

/**
 * @name AnimationManagement_ModuleProcessor
 * @summary Contains the animation management's business logic methods.
 * */
class AnimationManagement_ModuleProcessor extends AnimationManagement_ContextMenu {

    /**
     * @name GetElementJsonForElementNode
     * @param {any} objContext {state, disptach, props, AnimationManagement_ModuleProcessor}
     * @sumamry Makes an Api call to get the scripts, libraries and Html for Animation Wrapper.
     * @returns {any} Element Json(with/without wrapper contents)
     */
    async GetElementJsonForElementNode(objContext) {
        let objParams = {
            "ElementJson": objContext.props.ElementDetails
        };
        let objWrapperContents = await Object_TaskContent_CMSElement_CMSAnimation.GetAnimationWrapperContents(objParams);
        if (objWrapperContents && objWrapperContents !== null) {
            return {
                ...objContext.props.ElementDetails,
                ["WrapperContents"]: {
                    ...objWrapperContents["WrapperContents"]
                },
                ["SidebarContents"]: {
                    ...objWrapperContents["SidebarContents"]
                },
                ["PageIds"]: objWrapperContents["PageIds"]
            };
        }
        return {
            ...objContext.props.ElementDetails
        };
    }
}

export default AnimationManagement_ModuleProcessor;
