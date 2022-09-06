import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";

const StyledDetails = styled.div``;

const AccordionDetails = React.forwardRef((props, ref) => {
  const { color, size, children, ...rest } = props;

  return <StyledDetails {...rest}>{children}</StyledDetails>;
});

AccordionDetails.defaultProps = {
  //-------------------------
  style: {},
  color: "primary",
  size: "small",
};

AccordionDetails.propTypes = {
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

export default AccordionDetails;
