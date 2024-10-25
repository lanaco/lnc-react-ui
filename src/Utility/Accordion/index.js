import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";
import {
  getColorRgbaValue,
  getComponentTypographyCss,
  getDisabledStateCss,
} from "../../_utils/utils";
import { useState } from "react";
import { useUpdateEffect } from "react-use";

const StyledAccordion = styled.div`
  color: ${(props) =>
    !props.disabled === true &&
    getColorRgbaValue(props.theme, "Accordion", "primary", "enabled", "text")};
  background-color: transparent;
  ${(props) =>
    getComponentTypographyCss(props.theme, "Accordion", props.size, "enabled")};
  ${(props) =>
    props.disabled === true ? getDisabledStateCss(props.theme) : ""}
`;

const Accordion = React.forwardRef((props, ref) => {
  const {
    expanded = false,
    disabled = false,
    change = () => {},
    size = "small",
    className = "",
    style = {},
    children,
    ...rest
  } = props;

  const theme = useTheme();

  const themeProps = { theme, size, style, className: "lnc-ui-accordion " + className };

  const [isExpanded, setIsExpanded] = useState(expanded);

  useUpdateEffect(() => {
    setIsExpanded(expanded);
  }, [expanded]);

  const onExpand = (e) => {
    change(!isExpanded, e);

    setIsExpanded(!isExpanded);
  };

  const clonedSummary = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      if (
        child.props.__TYPE__ == "ACCORDION_SUMMARY" ||
        child?.type?.displayName === "ACCORDION_SUMMARY"
      ) {
        return React.cloneElement(child, {
          size: size,
          onClick: onExpand,
          onExpand: onExpand,
          isExpanded: isExpanded,
          disabled: disabled,
        });
      }
    }
  });

  const clonedDetails = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      if (
        child.props.__TYPE__ == "ACCORDION_DETAILS" ||
        child?.type?.displayName === "ACCORDION_DETAILS"
      ) {
        return React.cloneElement(child, {
          size: size,
          isExpanded: isExpanded,
        });
      }
    }
  });

  return (
    <StyledAccordion ref={ref} {...themeProps} disabled={disabled} {...rest}>
      {clonedSummary}
      {clonedDetails}
    </StyledAccordion>
  );
});

// Accordion.defaultProps = {
//   expanded: false,
//   disabled: false,
//   change: () => {},
//   //-------------------------
//   //-------------------------
//   style: {},
//   size: "small",
// };

Accordion.propTypes = {
  expanded: PropTypes.bool,
  disabled: PropTypes.bool,
  //--------------------------------------------------------------
  change: PropTypes.func,
  //---------------------------------------------------------------
  className: PropTypes.string,
  style: PropTypes.object,
  size: PropTypes.oneOf(["small", "medium", "large"]),
};

export default Accordion;
