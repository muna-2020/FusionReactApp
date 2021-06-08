// React related imports.
import React, { forwardRef } from "react";
import SplitPane from 'react-split-pane'

/**
 * @name SplitPaneWrapper
 * @param {*} props
 * @returns {object} React.Fragement to form the SplitPane.
 */
const SplitPaneWrapper = (props, ref) => {

    return <SplitPane
                ref={ref}
                primary={props.Meta.Primary}
                resizerStyle={props.Meta.ResizerStyle}
                pane1Style={props.Meta.Pane1Style}
                pane2Style={props.Meta.Pane2Style}
                pane3Style={props.Meta.Pane3Style}
                split={props.Meta.SplitDirection}
                minSize={props.Meta.MinSize}
                maxSize={props.Meta.MaxSize}
                defaultSize={props.Meta.DefaultSize}>
            {props.children}
        </SplitPane>        
}
export default forwardRef(SplitPaneWrapper);