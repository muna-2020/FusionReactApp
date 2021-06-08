//React imports
import React, { useReducer } from 'react';
import { connect } from 'react-redux';

//Base imports
import * as Base_Hook from '@shared/Framework/BaseClass/Base_Hook';

//Common imports
import Object_Framework_Services_TextResource from '@shared/Object/a.Framework/Services/TextResource/TextResource';
import * as Localization from '@root/Framework/Blocks/Localization/Localization';

//Component Specific imports
import * as DiskSpaceManagement_Hook from '@shared/Framework/Controls/DiskSpaceManagement/DiskSpaceManagement_Hook';
import DiskSpaceManagement_ComponentProcessor from '@shared/Framework/Controls/DiskSpaceManagement/DiskSpaceManagement_ComponentProcessor'

import imgDiskUsage from '@inlineimage/Framework/ReactJs/PC/Controls/DiskSpaceManagement/diskUsage.svg?inline';

/**
* @name DiskSpaceManagement
* @summary displays the memory usage of selected class by teacher.
* @param {any} props
*/
const DiskSpaceManagement = (props) => {

    /**
    * @name [state,dispatch]
    * @summary Define state and dispatch for the reducer to set state.
    * @returns {[]} state and dispatch
    */
    const [state, dispatch] = useReducer(Base_Hook.Reducer, DiskSpaceManagement_Hook.GetInitialState(props));

    /**
    * @name objContext
    * @summary Groups state, dispatch and module processor, TextResource object in objContext.
    * @returns {object} objContext
    */
    let objContext = { state, props, dispatch, ["ModuleName"]: props.Id, ["DiskSpaceManagement_ComponentProcessor"]: new DiskSpaceManagement_ComponentProcessor() };

    /**
     * @name  Initialize
     * @param {object} objContext objContext
     * @param {object} ModuleProcessor ModuleProcessor
     * @summary Initializing API and DynamicStyles
     * @returns null
     */
    objContext.DiskSpaceManagement_ComponentProcessor.Initialize(objContext, objContext.DiskSpaceManagement_ComponentProcessor);

    /**
    * @name Initialize
    * @param {object} objContext context object
    * @summary Initialize method call in Master_Hook, that contains all the custom hooks.
    * @returns null
    */
    DiskSpaceManagement_Hook.Initialize(objContext);

    /**
     * @name GetContent
     * @summary returns the required jsx
     * */
    function GetContent() {

        return (
            <div className="disk-space-managament">
                <img
                    src={imgDiskUsage}
                    alt=""
                />
                <span>{state.strUsedMemory} / {props.Data.MemoryConstant}</span>
            </div>
        );
    }

    return GetContent();

}

export default connect(Base_Hook.MapStoreToProps(DiskSpaceManagement_ComponentProcessor.StoreMapList()))(DiskSpaceManagement);
