import styled from "@emotion/styled";
import PropTypes from "prop-types";
import React from "react";
import theme from "../../_utils/theme";

const StyledLabelSwitch = styled.div``;

const LabelSwitch = React.forwardRef((props, ref) => {
  return <StyledLabelSwitch>LABEL SWITCH</StyledLabelSwitch>;
});

LabelSwitch.defaultProps = {};

LabelSwitch.propTypes = {};

export default LabelSwitch;
