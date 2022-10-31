import PropTypes from "prop-types";
import { useEffect } from "react";
import ReactDOM from 'react-dom';
import "../Base/fontawesome/css/fontawesome.css";

const Tooltip = props => {
    const { targetID, show, } = props;

    const target = document.querySelector(targetID);

    const el = document.createElement('div');
    el.style = "position: absolute; left: 200px; top: 200px; background-color: yellow;";

    useEffect(() => {
        target.innerHTML = "";
        setTimeout(() => {
            if (show) {
                target.appendChild(el);
            }
        }, 300);
    }, [show]);

    return ReactDOM.createPortal(props.children, el);
}

Tooltip.propTypes = {
    targetID: PropTypes.string,
    show: PropTypes.bool
};

export default Tooltip;