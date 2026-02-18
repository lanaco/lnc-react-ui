/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { useState, forwardRef } from "react";
import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";

const Label = styled.label`
  display: inline-flex;
  cursor: pointer;
  position: relative;

  & > input {
    height: 22px;
    width: 22px;
    -webkit-appearance: none;
    -moz-appearance: none;
    -o-appearance: none;
    appearance: none;
    border: 2px solid ${theme.palette.primary.main};
    border-radius: 3px;
    outline: none;
    transition-duration: 0.3s;
    background-color: transparent;
    cursor: pointer;
    z-index: ${(props) => (props.focused === true ? "2" : "auto")};
  }

  & > input:checked + span::before {
    content: ${'"\\2713"'};
    display: block;
    text-align: center;
    color: ${theme.palette.primary.main};
    position: absolute;
    left: 6px;
    top: 0.5px;
    font-weight: bold;
    font-size: 18px;
    height: 0px;
    width: 0px;
  }

  & > input:focus {
    background-color: transparent;
  }

  & > input:disabled {
    border: 2px solid ${theme.palette.gray[900]};
    color: ${theme.palette.gray[900]};
  }

  & > input:disabled + span::before {
    color: ${theme.palette.gray[900]};
  }
`;

const Checkbox = styled.input`
  margin: 2px;
`;

const CustomCheckbox = forwardRef((props, ref) => {
  const {
    onChange = () => {},
    id = "",
    disabled = false,
    checked = false,
    onFocus = () => {},
    onBlur = () => {},
    tabIndex,
  } = props;

  var [focused, setFocused] = useState(false);
  const theme = useTheme();

  const handleChange = (e) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    onChange(e, !checked, id);
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      e.stopPropagation();
      e.nativeEvent.stopImmediatePropagation();
      onChange(e, !checked, id);
    }
  };

  const handleOnBlur = (e) => {
    setFocused(false);
    if (onBlur) onBlur(e, id);
  };

  const handleOnFocus = (e) => {
    setFocused(true);

    if (onFocus) onFocus(e, id);
  };

  return (
    <Label checked={checked} focused={focused} theme={theme}>
      <Checkbox
        type="checkbox"
        theme={theme}
        ref={ref}
        checked={checked}
        onClick={handleChange}
        onChange={() => {}}
        onKeyDown={onKeyDown}
        tabIndex={tabIndex}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
        disabled={disabled}
      />
      <span></span>
    </Label>
  );

  // return (
  //   <CheckBox
  //     ref={ref}
  //     type="checkbox"
  //     checked={checked}
  //     onClick={handleChange}
  //     onChange={() => {}}
  //     onKeyDown={onKeyDown}
  //     tabIndex={tabIndex}
  //     onFocus={handleOnFocus}
  //     onBlur={handleOnBlur}
  //     disabled={disabled}
  //   />
  // );
});

export default CustomCheckbox;
