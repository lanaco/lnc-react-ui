import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";
import { getColorRgbaValue, getComponentTypographyCss, getDisabledStateCss } from "../../_utils/utils";
import { useState } from "react";
import { useUpdateEffect } from "react-use";

const StyledAccordion = styled.div`
  color: ${(props) =>
    !props.disabled &&
    getColorRgbaValue(props.theme, "Accordion", "primary", "enabled", "text")};
  background-color: ${(props) => props.disabled == false &&
    getColorRgbaValue(
      props.theme,
      "Accordion",
      "primary",
      "enabled",
      "background",
      "backgroundOpacity"
    )};
  ${(props) =>
    getComponentTypographyCss(
      props.theme,
      "Accordion",
      props.size,
      "enabled"
    )};
    ${(props) => (props.disabled ? getDisabledStateCss(props.theme) : "")}
`;

const Accordion = React.forwardRef((props, ref) => {
  const {
    expanded,
    disabled,
    change,
    size,
    className,
    style,
    children,
    ...rest
  } = props;

  const theme = useTheme();

  const themeProps = { theme, size, style, className };

  const [isExpanded, setIsExpanded] = useState(expanded);

  useUpdateEffect(() => {
    setIsExpanded(expanded);
  }, [expanded])

  const onExpand = (e) => {
    change(!isExpanded, e);

    setIsExpanded(!isExpanded);
  };

  const clonedSummary = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      if (child.props.__TYPE__ == "ACCORDION_SUMMARY") {
        return React.cloneElement(child, {
          size: size,
          onExpand: onExpand,
          isExpanded: isExpanded,
          disabled: disabled,
        });
      }
    }
  });

  const clonedDetails = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      if (child.props.__TYPE__ == "ACCORDION_DETAILS") {
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

Accordion.defaultProps = {
  expanded: false,
  disabled: false,
  change: () => {},
  //-------------------------
  //-------------------------
  style: {},
  size: "small",
};

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
