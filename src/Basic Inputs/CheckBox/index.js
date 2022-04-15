import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Global, css, useTheme } from "@emotion/react";
import theme from "../../_utils/theme";
import styled from "@emotion/styled";
import Icon from "../../General/Icon";

const getCheckboxSize = (size) => {
  if (size === "small") {
    return "1.375rem";
  } else if (size === "medium") {
    return "1.563rem";
  } else if (size === "large") {
    return "1.75rem";
  }
}

const getIndeterminateSquareSize = (size) => {
  if (size === "small") {
    return "0.85rem";
  } else if (size === "medium") {
    return "0.913rem";
  } else if (size === "large") {
    return "1rem";
  }
}

const getCheckSize = (size) => {
  if (size === "small") {
    return "0.85rem";
  } else if (size === "medium") {
    return "1.125rem";
  } else if (size === "large") {
    return "1.225rem";
  }
}

const getLabelDirection = (direction) => {
  console.log("Direction", direction);
  if (direction == "up") return "column-reverse";
  else if (direction == "down") return "column";
  else if (direction == "left") return "row-reverse";
  return "row";
}

const Label = styled.label`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 0.3rem;
  cursor: pointer;
  position: relative;
  flex-direction: ${(props) => (getLabelDirection(props.labelPosition))};
  & > .lnc-checkboxInput {
    position: relative;
    height: ${(props) => (props.theme.typography[props.size].iconFontSize)};
    width: ${(props) => (props.theme.typography[props.size].iconFontSize)};
  }
  & > .lnc-checkboxInput > input {
    height: ${(props) => (props.theme.typography[props.size].iconFontSize)};
    width: ${(props) => (props.theme.typography[props.size].iconFontSize)};
    -webkit-appearance: none;
    -moz-appearance: none;
    -o-appearance: none;
    appearance: none;
    border: ${(props) => (props.icon ? 'none' : '2px solid ' + props.theme.palette[props.color].main)};
    border-radius: 3px;
    outline: none;
    transition-duration: 0.3s;
    background-color: transparent;
    cursor: pointer;
    z-index: ${(props) => (props.focused ? "2" : "auto")};
  }
  & > .lnc-checkboxInput > input:checked + .lnc-checkMark {
    position: absolute;
    height: ${(props) => (props.indeterminate ? getIndeterminateSquareSize(props.size) : "0")};
    width: ${(props) => (props.indeterminate ? getIndeterminateSquareSize(props.size) : "0")};
    transform: ${(props) => (props.indeterminate ? "translate(-50%, -50%)" : "none")};
    top: ${(props) => (props.indeterminate ? "50%" : "0")};
    left: ${(props) => (props.indeterminate ? "50%" : "0")};
    background-color: ${(props) => (props.indeterminate ? (props.disabled ? props.theme.palette.gray[900] : props.theme.palette[props.color].main) : "none")};
  }
  & > .lnc-checkboxInput > input:checked + .lnc-checkMark::before {
    content:  ${(props) => (props.indeterminate ? '""' : '"\\2713"')} ;
    display: block;
    text-align: center;
    color: ${(props) => (props.disabled ? props.theme.palette.gray[900] : props.theme.palette[props.color].main)};
    position: absolute;
    
    left: 5px;
    top: 0.031px;

    font-weight: bold;
    font-size: ${(props) => (getCheckSize(props.size))}; 
    height: 0px;
    width: 0px;

    transition: ${props => props.theme.transition.duration.short + " transform "+props.theme.transition.easing.easeInOut};
  }
  & > .lnc-checkboxInput > input:focus {
    background-color: transparent;
  }
  & > .lnc-checkboxInput > input:disabled {
    border:  ${(props) => (props.icon ? 'none' : '2px solid ' + props.theme.palette.gray[900])};
    color: ${(props) => (props.theme.palette.gray[900])};
  }
  & > .lnc-checkboxInput > input:disabled + div > .lnc-checkMark::before {
    color: ${(props) => (props.theme.palette.gray[900])};
  }
  & > .lnc-checkboxInput > .lnc-checkbox-icon-wrapper {
    position: absolute;
    top: 0;
    bottom: 0;
  }
  & > .lnc-checkboxInput > .lnc-checkbox-icon-wrapper > .lnc-checkbox-icon {
    min-height: unset;
    max-height: unset;
    max-width: unset;
    min-width: unset;
    height: ${(props) => (getCheckboxSize(props.size))};
    width: ${(props) => (getCheckboxSize(props.size))};
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const CheckboxInput = styled.input`
  margin: 0;
`;

const CheckBox = React.forwardRef((props, ref) => {
  const {
    onChange,
    preventDefault,
    id,
    disabled,
    readOnly,
    indeterminate,
    checked,
    onFocus,
    onBlur,
    tabIndex,
    color,
    size,
    label,
    labelPosition,
    icon,
    className,
    style,
    inputRef,
    ...rest
  } = props;

  const theme = useTheme();
  const [checkBoxChecked, setCheckBoxChecked] = useState(checked);
  const [indeterminateState, setIndeterminateState] = useState(indeterminate);
  var [focused, setFocused] = useState(false);


  useEffect(() => {
    setCheckBoxChecked(checked);
  }, [checked])

  useEffect(() => {
    setIndeterminateState(indeterminate);
  }, [indeterminate])

  const handleChange = (e) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();

    if(readOnly) return;
    if (indeterminateState) setIndeterminateState(false);

    setCheckBoxChecked(!checkBoxChecked)
    onChange(e, !checkBoxChecked, id);
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      e.stopPropagation();
      e.nativeEvent.stopImmediatePropagation();

      if(readOnly) return;

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
    <Label checked={checked} focused={true} theme={theme} color={color} indeterminate={indeterminateState}
      size={size} className={className} style={style} labelPosition={labelPosition} icon={icon} disabled={disabled} ref={ref}>
      <div className="lnc-checkboxInput">
        <CheckboxInput
          type="checkbox"
          ref={inputRef}
          checked={checkBoxChecked}
          onClick={handleChange}
          onChange={() => { }}
          onKeyDown={onKeyDown}
          tabIndex={tabIndex}
          onFocus={handleOnFocus}
          onBlur={handleOnBlur}
          disabled={disabled}
          readOnly={readOnly}
          {...rest}
        />
        {icon ?
          <div className="lnc-checkbox-icon-wrapper">
            <Icon icon={icon} color={checkBoxChecked && !disabled ? color : 'gray'} size={size} className="lnc-checkbox-icon" />
          </div>
          :
          <span className="lnc-checkMark"></span>
        }
      </div>
      {label && <div>
        {label}
      </div>}
    </Label>)
});

CheckBox.defaultProps = {
  theme: theme,
  id: "",
  disabled: false,
  onChange: () => { },
  checked: false,
  preventDefault: true,
  size: "small",
  label: "",
  labelPosition: "right",
  color: "primary",
  indeterminate: false,
  className: "",
  style: {},
  icon: null,
};

CheckBox.propTypes = {
  theme: PropTypes.object.isRequired,
  id: PropTypes.any.isRequired,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  checked: PropTypes.bool,
  readOnly: PropTypes.bool,
  indeterminate: PropTypes.bool,
  preventDefault: PropTypes.bool,
  size: PropTypes.oneOf(["small", "medium", "large"]),
  label: PropTypes.string,
  labelPosition: PropTypes.oneOf([
    "up",
    "down",
    "right",
    "left"
  ]),
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "success",
    "error",
    "warning",
    "gray",
  ]),
  className: PropTypes.string,
  style: PropTypes.object,
  icon: PropTypes.string,
  inputRef: PropTypes.func,
};

export default CheckBox;