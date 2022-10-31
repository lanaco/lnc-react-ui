import { useState } from "react";
import Tooltip from ".";

const SimpleTooltipExample = props => {
    const [showTooltip, setShowTooltip] = useState(false);
    return (
        <>
            <div onMouseOver={() => {
                setShowTooltip(true)
            }}>
                Hover here to show tooltip
            </div>
            <Tooltip show={showTooltip} targetID={props.targetID}>
                <p>
                    This is simple tooltip
                </p>
            </Tooltip>
        </>
    );
}

export default SimpleTooltipExample;

