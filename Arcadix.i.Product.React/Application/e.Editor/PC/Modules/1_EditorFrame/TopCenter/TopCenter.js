//React Imports
import React from 'react';

//inline Images import
import UltimateImage from '@inlineimage/Application/e.Editor/ReactJs/PC/Modules/1_EditorFrame/TopCenter/Ultimate.svg?inline';

/**
 * @name TopCenter
 * @param {object} props component props
 * @summary Top Center Component
 */
const TopCenter = (props) => {

    /**
     * @name return
     * @summary Contains the JSX for the components.
     * */
    return (
        <div className="top-center">
            <WrapperComponent
                ComponentName={"Image"}
                Data={{
                    Image: UltimateImage,
                }}
                ParentProps={props}
            />
        </div>
    );
};

export default TopCenter;