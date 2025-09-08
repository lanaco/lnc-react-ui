/* eslint-disable react/display-name */
import { forwardRef, useState, useEffect } from "react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import { useTheme } from "@emotion/react";
import RadioInput from "../../Basic Inputs/RadioInput/RadioInput";

const Container = styled.div`
  display: inline-flex;
  flex-direction: ${(props) => (props.inline === true ? "row" : "column")};
  gap: 1.5rem;
  width: fit-content;
  box-sizing: border-box;
`;

const RadioGroup = forwardRef((props, ref) => {
  const {
    id = "",
    name,
    value = null,
    disabled = false,
    readOnly = false,
    items = [],
    mapId = "id",
    mapValue = "value",
    radioProps,
    inline = true,
    //----------------
    onChange = () => {},
    //----------------
    className = "",
    style = {},
    size = "small",
    color = "primary",
    ...rest
  } = props;

  var theme = useTheme();
  const [checkedId, setCheckedId] = useState(null);

  useEffect(() => {
    if (value !== checkedId) setCheckedId(value);
  }, [value]);

  var themeProps = {
    color,
    theme,
    size,
    disabled,
    readOnly,
  };

  const handleChange = (e, id) => {
    if (onChange) onChange(e);
  };

  return (
    <Container
      ref={ref}
      id={id}
      inline={inline}
      style={style}
      className={className}
      {...rest}
    >
      {items.map((item, i) => (
        <RadioInput
          key={i}
          {...themeProps}
          label={item.label}
          value={item.value}
          {...radioProps}
          onChange={handleChange}
          name={name}
        />
      ))}
    </Container>
  );
});

// RadioGroup.defaultProps = {
//   id: "",
//   value: null,
//   disabled: false,
//   readOnly: false,
//   inline: true,
//   items: [],
//   mapId: "id",
//   mapValue: "value",
//   //----------------
//   onChange: () => {},
//   //----------------
//   className: "",
//   style: {},
//   size: "small",
//   color: "primary",
// };

RadioGroup.propTypes = {
  id: PropTypes.any,
  name: PropTypes.string,
  value: PropTypes.any,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  items: PropTypes.arrayOf(PropTypes.object),
  mapid: PropTypes.any,
  mapValue: PropTypes.string,
  inline: PropTypes.bool,
  //----------------
  onChange: PropTypes.func,
  //----------------
  className: PropTypes.string,
  style: PropTypes.object,
  size: PropTypes.oneOf(["small", "medium", "large"]),
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "success",
    "danger",
    "warning",
    "information",
    "neutral",
    "gray",
  ]),
  radioProps: PropTypes.any,
};

export default RadioGroup;
