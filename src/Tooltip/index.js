import styled from "@emotion/styled";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import ReactDOM from 'react-dom';
import "../Base/fontawesome/css/fontawesome.css";

const Tooltip = props => {
    const { targetID, renderContent } = props;

    const [show, setShow] = useState(false);
    const [style, setStyle] = useState("position: absolute;");

    const target = (targetID === "#" || targetID === "") ? null : ((targetID.startsWith('#')) ? document.querySelector(targetID) : document.querySelector("#" + targetID));

    const el = document.createElement('div');
    el.style = style;

    useEffect(() => {
        if (show && target !== null) {
            target.appendChild(el);
        }
    }, [targetID, show]);

    const TooltipBoundary = styled.div`
    height: min-content;
    width: min-content;
    `;

    const CalculateStyle = (mouseX, mouseY) => {
        if (mouseX <= window.innerWidth / 2 && mouseY <= window.innerHeight / 2) {
            return (
                `position: absolute; 
                left: ${(mouseX - 10)}px; 
                top: ${(mouseY - 10)}px; 
                width: auto; 
                height: auto; 
                box-shadow: 0 0 6px #bebebe; 
                border-radius: 0.175rem; 
                background-color: white; 
                overflow: auto; 
                max-height: ${(window.innerHeight - 20)}px; 
                z-index: 999;`
            );
        }
        else if (mouseX > window.innerWidth / 2 && mouseY <= window.innerHeight / 2) {

            return (
                `position: absolute; 
                right: ${(window.innerWidth - mouseX - 10)}px; 
                top: ${(mouseY - 10)}px; 
                width: auto; 
                height: auto; 
                box-shadow: 0 0 6px #bebebe; 
                border-radius: 0.175rem; 
                background-color: white; 
                overflow: auto; 
                max-height: ${(window.innerHeight - 20)}px; 
                z-index: 999;`
            );
        }
        else if (mouseX <= window.innerWidth / 2 && mouseY > window.innerHeight / 2) {

            return (
                `position: absolute; 
                left: ${(mouseX - 10)}px; 
                bottom: ${(window.innerHeight - mouseY - 10)}px; 
                width: auto; 
                height: auto; 
                box-shadow: 0 0 6px #bebebe; 
                border-radius: 0.175rem; 
                background-color: white; 
                overflow: auto; 
                max-height: ${(window.innerHeight - 20)}px; 
                z-index: 999;`
            );
        }
        else if (mouseX > window.innerWidth / 2 && mouseY > window.innerHeight / 2) {

            return (
                `position: absolute; 
                right: ${(window.innerWidth - mouseX - 10)}px; 
                bottom: ${(window.innerHeight - mouseY - 10)}px; 
                width: auto; 
                height: auto; 
                box-shadow: 0 0 6px #bebebe; 
                border-radius: 0.175rem; 
                background-color: white; 
                overflow: auto; 
                max-height: ${(window.innerHeight - 20)}px; 
                z-index: 999;`
            );
        }
    }

    const renderContentWithBounds = () => {
        return (
            <div onMouseLeave={event => {
                event.stopPropagation();
                target.innerHTML = "";
                setStyle("position: absolute;");
                setShow(false);
            }}>
                {renderContent()}
            </div>);
    }

    return (
        <>
            {ReactDOM.createPortal(renderContentWithBounds(), el)}
            <TooltipBoundary
                onMouseOver={event => {
                    event.stopPropagation();
                    if (show === false) {
                        setStyle(CalculateStyle(event.clientX, event.clientY));
                        setShow(true);
                    }
                }}
                onMouseLeave={event => {
                    event.stopPropagation();
                    target.innerHTML = "";
                    setStyle("position: absolute;");
                    setShow(false);
                }}>
                {props.children}
            </TooltipBoundary>
        </>
    );
}

Tooltip.defaultProps = {
    targetID: "",
    renderContent: () => { },
};

Tooltip.propTypes = {
    targetID: PropTypes.string,
    renderContent: PropTypes.func
};

export default Tooltip;