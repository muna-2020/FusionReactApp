//Base classes/hooks.
import Base_ModuleProcessor from '@shared/Framework/BaseClass/Base_ModuleProcessor';

//Module Import
import TestApplicationCourse_Module from '@shared/Application/f.TestApplication/PC/Modules/7_Course/TestApplicationCourse_Module';

/**
 *@name EvaluationButton_ModuleProcessor
 *@summary for event on click handling methods
 */
class TestApplicationCourse_ModuleProcessor extends Base_ModuleProcessor  {

    /**
     * @name StoreMapList
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static StoreMapList() {
        return [
            { StoreKey: "ApplicationState", DataKey: "TestState"}
        ];
    }   

    /**
     * @name Get Tree Meta Data
     * @param {any} objContext
     * @summary Returns the tree MetaData
     */
    GetMetaData() {
        return { IdField: 'uTestNavigationId', ParentIdField: 'uParentTestNavigationId', TextField: 'vNavigationName', RootNodeId: -1 };
    }

    /**
     * @name Get Tree   Data
     * @param {any} objContext
     * @summary Returns the tree Data
     */
    GetData(objContext) {
        ApplicationState.SetProperty("objSelectedNode", objContext.props.TestState.objSelectedNode);
        var intNavId = "0";
        let objRootNode = { uTestNavigationId: "00000000-0000-0000-0000-000000000000", uParentTestNavigationId: "-1", vNavigationName: "Tasks", expanded: true };
        let arrData = objContext.props.TestState.TaskPageProperties.CourseData ? objContext.props.TestState.TaskPageProperties.CourseData : [];
        arrData = [objRootNode, ...arrData];
        return {
            NodeData: arrData,
           // SelectedNodeId: intNavId = objContext.props.TestState.TaskPageProperties.CourseData[0]["uTestNavigationId"]
        }
    }

    /**
     * @name OnSelectNode
     * @param {any} objContext
     * @param {any} objSelectedNode
     * @summary Decides either to call the OnSubNavigationClick or set the folder(in case of Task or Test)
     */
    OnSelectNode(objContext, objSelectedNode) {
        ApplicationState.SetProperty("objSelectedNode", objSelectedNode);
        if (objSelectedNode.iPageId) {
            TestApplicationCourse_Module.GetData("Course",objSelectedNode, (objReturn) => {
                objContext.dispatch({ type: "SET_STATE", payload: { "blnIsLoadComplete": true } });
                var TestState = ApplicationState.GetProperty('TestState');
                ApplicationState.SetProperty('CurrentRoute', { "RouteName": TestState.CurrentRoute, "SSRData": TestState.SSRData });
            });
        }
    }

    /**
     * @name OnNextNode
     * @param {any} objContext
     * @param {any} objSelectedNode
     * @summary For Next Task
     */
    OnNextNode(objContext, objSelectedNode) {
            if (objSelectedNode.iPageId) {
                TestApplicationCourse_Module.GetData("NextTask", objSelectedNode, (objReturn) => {
                    objContext.dispatch({ type: "SET_STATE", payload: { "blnIsLoadComplete": true } });
                    var TestState = ApplicationState.GetProperty('TestState');
                    ApplicationState.SetProperty("objSelectedNode", TestState.objSelectedNode);
                    ApplicationState.SetProperty('CurrentRoute', { "RouteName": TestState.CurrentRoute, "SSRData": TestState.SSRData });
                });
        }
    }

    /**
     * @name OnPreviousNode
     * @param {any} objContext
     * @param {any} objSelectedNode
     * @summary For Previous Call
     */
    OnPreviousNode(objContext, objSelectedNode) {
        if (objSelectedNode.iPageId) {
            TestApplicationCourse_Module.GetData("PreviousTask", objSelectedNode, (objReturn) => {
                objContext.dispatch({ type: "SET_STATE", payload: { "blnIsLoadComplete": true } });
                var TestState = ApplicationState.GetProperty('TestState');
                ApplicationState.SetProperty("objSelectedNode", TestState.objSelectedNode);
                ApplicationState.SetProperty('CurrentRoute', { "RouteName": TestState.CurrentRoute, "SSRData": TestState.SSRData });
            });
        }
    }
    /**
     * @name GetDynamicStyles
     * @param {object} props props
     * @returns {object} DynamicStlyes
     */
    GetDynamicStyles(props) {
        return [
            props.JConfiguration.TestApplicationSkinPath + "/Css/Application/ReactJs/" + props.JConfiguration.DeviceType + "/Modules/7_Course/Course.css",
        ];
    }
}
export default TestApplicationCourse_ModuleProcessor;

