import React, { useEffect } from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import Icon from "../../General/Icon/index";
import { useState } from "react";
import { getColorRgbaValue } from "../../_utils/utils";
import { useTheme } from "@emotion/react";

const GET_PADDING = {
  small: "0.6rem 1rem",
  medium: "0.8rem 1.25rem",
  large: "1rem 1.5rem",
}

const StyledSummary = styled.div`
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  color: ${(props) =>
    getColorRgbaValue(props.theme, "Accordion", "primary", "enabled", "summaryText")};

  padding: ${props => GET_PADDING[props.size]};
  & .accordion-icon-lnc {
    transform: ${(props) => (props.isExpanded ? "rotate(180deg)" : "rotate(0)")};
    transition: transform 0.25s ease;
  }
`;

const AccordionSummary = React.forwardRef((props, ref) => {
  const { 
    disabled,
    isExpanded,
    onExpand,
    onClick,
    size, 
    className,
    style,
    children,
    ...rest 
  } = props;

  const theme = useTheme();

  const themeProps = { theme, size, style, className };

  const handleOnClick = (e) => {
    if(disabled == false) onExpand(e);

    onClick(e);
  }

  return (
    <StyledSummary ref={ref} {...themeProps} onClick={handleOnClick} isExpanded={isExpanded} {...rest}>
      {children}
      <Icon icon={"angle-down"} sizeInUnits={"1.125rem"} className="accordion-icon-lnc" />
    </StyledSummary>
  );
});

AccordionSummary.defaultProps = {
  __TYPE__: "ACCORDION_SUMMARY",
  onClick: () => { },
  //-------------------------
  style: {},
  size: "small",
  size: PropTypes.oneOf(["small", "medium", "large"]),
};

AccordionSummary.propTypes = {
  __TYPE__: PropTypes.string,
  onClick: PropTypes.func,
  //---------------------------------------------------------------
  className: PropTypes.string,
  style: PropTypes.object,
  size: PropTypes.oneOf(["small", "medium", "large"]),
};

export default AccordionSummary;
