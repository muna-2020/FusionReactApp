//React Imports
import React from 'react';

//in-line Images import
import ClientTopImage from '@inlineimage/Application/e.Editor/ReactJs/PC/Modules/1_EditorFrame/TopRight/ClientTop.svg?inline';
import UserTopImage from '@inlineimage/Application/e.Editor/ReactJs/PC/Modules/1_EditorFrame/TopRight/UserTop.svg?inline';
import HelpImage from '@inlineimage/Application/e.Editor/ReactJs/PC/Modules/1_EditorFrame/TopRight/Help.svg?inline';
import SignoutTopImage from '@inlineimage/Application/e.Editor/ReactJs/PC/Modules/1_EditorFrame/TopRight/SignoutTop.svg?inline';

/**
 * @name TopRight
 * @param {obejct} props component props
 * @summary Top Right Component
 */
const TopRight = (props) => {

    /**
     * @summary Contains JSX
     * */
    return (
        <div className="top-right">
            <ul>
                <li>
                    <WrapperComponent
                        ComponentName={"Image"}
                        Data={{
                            Image: ClientTopImage,
                        }}
                        ParentProps={props}
                    />
                    <span>
                        {(props.TextFormatter && props.TextFormatter !== null) ? props.TextFormatter("LernlupeClientLabel") : ""}
                    </span>
                </li>
                <li>
                    <WrapperComponent
                        ComponentName={"Image"}
                        Data={{
                            Image: UserTopImage,
                        }}
                        ParentProps={props}
                    />
                    <span>
                        {(props.TextFormatter && props.TextFormatter !== null) ? props.TextFormatter("UserLabel") : ""}
                    </span>
                </li>
                <li>
                    <WrapperComponent
                        ComponentName={"Image"}
                        Data={{
                            Image: HelpImage,
                        }}
                        ParentProps={props}
                    />
                </li>
                <li>
                    <WrapperComponent
                        ComponentName={"Image"}
                        Data={{
                            Image: SignoutTopImage,
                        }}
                        ParentProps={props}
                    />
                    <span>
                        {(props.TextFormatter && props.TextFormatter !== null) ? props.TextFormatter("SignOutLabel") : ""}
                    </span>
                </li>
            </ul>
        </div>
    );
};

export default TopRight;