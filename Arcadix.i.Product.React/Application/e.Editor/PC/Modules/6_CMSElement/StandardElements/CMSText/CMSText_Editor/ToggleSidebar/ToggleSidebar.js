//React imports 
import React, { useRef, useEffect } from 'react';

/**
 * @name CheckboxSidebar
 * @param {object} props props from parent
 * @param {any} ref ref to component
 * @summary CheckboxSidebar's.
 * @returns {any} CheckboxSidebar
 */
const ToggleSidebar = (props) => {

    const inputRef = useRef(null);

    /**
     * @name useEffect
     * @summary this update the input value.
     * */
    useEffect(() => {
        inputRef.current.value = props.ElementJson.iShowContentTime;
    }, []);

    /**
     * @name UpdateContentShowTime
     * @param {any} props
     * @summary this update the content show time for the component.
     */
    const UpdateContentShowTime = () => {
        props.PassedEvents.UpdateContentShowTime(inputRef.current.value);
        props.HideSidebar();
    }

    /**
     * @name GetContent
     * @summary Calls the render body function of the common.
     * @returns {any} JSX of the Component
     */
    const GetContent = () => {
        return (
            <div className="toggle-sidebar" style={{ padding: "11px" }}>
                <div>
                    <span style={{ marginRight: "14px" }}>Show Time (sec): </span>
                    <input ref={inputRef} type="text" style={{ padding: "3px", border: "1px solid #c5c5c5" }} />
                </div>
                <button onClick={UpdateContentShowTime} style={{ float: "right", marginTop: "13px" }} class="btn">Apply</button>
            </div>
        )
    };

    return GetContent();
};

export default ToggleSidebar;