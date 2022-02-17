import React from "react";
import styled from "@emotion/styled";
import theme from "../../_utils/theme";

const StyledInput = styled.input`
  box-sizing: border-box;
  position: relative;
  width: 100%;
  appearance: none;
  outline: none;
  border: none;
  padding: 9.5px 6px 9.5px 6px;
  border-radius: 3px;
  border: none;
  border: ${(props) =>
    props.focused
      ? `1px solid ${theme.palette.primary.main}`
      : "1px solid transparent"};
  font-size: ${theme.typography["small"].fontSize};
  font-family: ${theme.typography.fontFamily};
`;

const CustomInput = React.forwardRef((props, ref) => {
  return (
    <StyledInput
      {...props}
      ref={ref}
      value={props.value}
      onChange={(event) => {
        if (props.onChange) props.onChange(event);
      }}
    />
  );
});

export default CustomInput;
