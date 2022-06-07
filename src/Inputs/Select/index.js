import styled from "@emotion/styled";
import PropTypes from "prop-types";
import React from "react";
import theme from "../../_utils/theme";

const StyledSelect = styled.div``;

const Select = React.forwardRef((props, ref) => {
  return <StyledSelect>SELECT</StyledSelect>;
});

Select.defaultProps = {};

Select.propTypes = {};

export default Select;
