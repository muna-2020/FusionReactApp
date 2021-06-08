//React imports
import React from 'react';

//Performance related imports.
import PerformanceProfiler from '@shared/Framework/Services/Performance/PerformanceProfiler';

/**
 * @name CMSContainer_Editor_Wrapper
 * @sumamry Returns a memoized instance of CMSContainer_Editor. Now, if a new container is added then the data of rest of the containers wont be lost.
 * */
const CMSContainer_Editor_Wrapper = React.memo((props, ref) => {
    let CMSContainer = props.ComponentController.GetComponent("CMSContainer_Editor");
    return (<PerformanceProfiler ComponentName={"CMSContainer" + props.ContainerJson.iContainerId} JConfiguration={props.JConfiguration}>
        <CMSContainer {...props} Id={"CMSContainer" + props.ContainerJson.iContainerId} />
    </PerformanceProfiler>);
}, (prevProps, nextProps) => {
    return prevProps.ContainerJson.iContainerId === nextProps.ContainerJson.iContainerId && nextProps.ContainerJson.Ref.current !== null;
});

export default CMSContainer_Editor_Wrapper;
