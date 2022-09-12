import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import { useTheme } from "@emotion/react";
import RadioInput from "../../Basic Inputs/RadioInput/index";

const Container = styled.div`
  display: inline-flex;
  flex-direction: column;
  width: fit-content;
  box-sizing: border-box;
`;

const RadioGroup = React.forwardRef((props, ref) => {
  const {
    id,
    value,
    disabled,
    readOnly,
    items,
    mapId,
    mapValue,
    radioProps,
    //----------------
    onChange,
    //----------------
    className,
    style,
    size,
    color,
    ...rest
  } = props;

  var theme = useTheme();
  const [checkedId, setCheckedId] = useState(null);

  useEffect(() => {
    if (value !== checkedId) setCheckedId(checkedId);
  }, [value]);

  var themeProps = {
    color,
    theme,
    size,
    disabled,
    readOnly,
  };

  const handleChange = (e, id) => {
    var itemId = id.split("-")[1];
    setCheckedId(itemId);
    if (onChange) onChange(e, itemId);
  };

  return (
    <Container ref={ref} style={style} className={className} {...rest}>
      {items.map((item, i) => (
        <RadioInput
          key={i}
          {...themeProps}
          id={`${id}-${item[mapId]}`}
          label={item[mapValue]}
          checked={checkedId == item[mapId]}
          onChange={handleChange}
          {...radioProps}
        />
      ))}
    </Container>
  );
});

RadioGroup.defaultProps = {
  id: "",
  value: null,
  disabled: false,
  readOnly: false,
  items: [],
  mapId: "id",
  mapValue: "value",
  //----------------
  onChange: () => {},
  //----------------
  className: "",
  style: {},
  size: "small",
  color: "primary",
};

RadioGroup.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.number,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  mapId: PropTypes.string,
  mapValue: PropTypes.string,
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
  ]),
  radioProps: PropTypes.any,
};

export default RadioGroup;
