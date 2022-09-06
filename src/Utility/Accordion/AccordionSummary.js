import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import Icon from "../../General/Icon/index";

const StyledSummary = styled.div`
  display: flex;
  justify-content: space-between;
`;

const AccordionSummary = React.forwardRef((props, ref) => {
  const { color, size, children, ...rest } = props;

  return (
    <StyledSummary>
      {children}
      <Icon icon={"angle-down"} sizeInUnits={"1.125rem"} />
    </StyledSummary>
  );
});

AccordionSummary.defaultProps = {
  //-------------------------
  style: {},
  color: "primary",
  size: "small",
};

AccordionSummary.propTypes = {
  //---------------------------------------------------------------
  className: PropTypes.string,
  style: PropTypes.object,
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "success",
    "warning",
    "danger",
    "information",
    "neutral",
  ]),
  size: PropTypes.oneOf(["small", "medium", "large"]),
};

export default AccordionSummary;
