//React imports
import React from 'react';

//Performance related imports.
import PerformanceProfiler from '@shared/Framework/Services/Performance/PerformanceProfiler';

/**
 * @name CMSPageContent_Editor_Wrapper
 * @sumamry Returns a memoized instance of CMSPageContent_Editor. Now, if a new CMSPageContent is added then the data of rest of the CMSPageContents wont be lost.
 * */
const CMSPageContent_Editor_Wrapper = React.memo((props) => {
    let CMSPageContent = props.ComponentController.GetComponent("CMSPageContent_Editor");
    return <PerformanceProfiler ComponentName={"CMSPageContent_" + props.PageJson.iPageId} JConfiguration={props.JConfiguration}>
        <CMSPageContent {...props} Id={"CMSPageContent_" + props.PageJson.iPageId} />
    </PerformanceProfiler>;
}, (prevProps, nextProps) => {
    return prevProps.PageJson.iPageId === nextProps.PageJson.iPageId 
    && nextProps.PageJson.Ref.current !== null && prevProps.PageJson.strDeviceType === nextProps.PageJson.strDeviceType;
});

export default CMSPageContent_Editor_Wrapper;
