import styled from "@emotion/styled";
import PropTypes from "prop-types";
import React, { useEffect } from "react";
import Button from "../Button/index";
import theme from "../_utils/theme";

const paddingBySize = (size) => {
  if (size === "small") return "0.2625rem 0.375rem";
  if (size === "medium") return "0.325rem 0.375rem";
  if (size === "large") return "0.3625rem 0.375rem";
};

const StyledDropdownLookup = styled.input((props) => {
  return {
    appearance: "none",
    outline: "none",
    border: "none",
    borderBottom: `0.125rem solid ${props.theme.palette[props.color].main}`,
    transition: "all 250ms",
    display: "inline-block",
    flexDirection: "row",
    justifyContent: "center",
    cursor: "text",
    width: "100%",
    padding: paddingBySize(props.size),
    fontSize: props.theme.typography[props.size].fontSize,
    backgroundColor: props.theme.palette[props.color].lighter,
    color: props.theme.palette[props.color].textDark,
    borderRadius: "0.125rem",
    "&:disabled": {
      backgroundColor: props.theme.palette.gray[200],
      borderBottom: `0.125rem solid ${props.theme.palette.gray[900]}`,
      color: props.theme.palette.gray.textLight,
      opacity: 0.7,
      cursor: "default",
    },
    "&:focus": {
      backgroundColor: props.theme.palette.common.white,
      color: props.theme.palette.common.black,
    },
  };
});

const StyledList = styled.ul((props) => {
  return {
    zIndex: "10000",
    // border: "1px solid gray",
    position: "relative",
    outline: "none",
    listStyle: "none",
    width: "auto",
    paddingLeft: "5px",
  };
});

const StyledListItem = styled.li((props) => {
  return {
    cursor: "pointer",
    backgroundColor: "white",
    zIndex: "10000",
    outline: "none",
    listStyle: "none",
    width: "auto",
    "&:hover": {
      zIndex: "10000",
      color: props.theme.palette.gray.textLight,
      backgroundColor: props.theme.palette[props.color].lighter,
      position: "relative",
    },
    padding: "0px",
  };
});

//===================================================

const DropdownLookup = (props) => {
  const {
    theme,
    color,
    id,
    disabled,
    preventDefault,
    className,
    size,
    InitializeNamespace,
    initialValue,
    State,
    LoadData,
    onChange,
    ClearOptions,
    NotItemsFoundLabel,
  } = props;

  const [inFocus, setInFocus] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [selectedOption, setSelectedOption] = React.useState({});

  const previousInitialValue = "previous"; //usePrevious(props.initialValue);

  useEffect(() => {
    if (
      props.namespace === "" ||
      props.namespace === undefined ||
      props.namespace === null ||
      isNaN(props.namespace)
    ) {
    } else {
      InitializeNamespace(props.namespace);
    }
    updateSelectedValue(initialValue);
  }, []);

  useEffect(() => {
    if (previousInitialValue === undefined)
      updateSelectedValue(initialValue, true);

    if (previousInitialValue && previousInitialValue.key !== initialValue.key)
      updateSelectedValue(initialValue, true);

    if (initialValue.key === "" && !inFocus) setValue("");
  }, [initialValue]);

  useEffect(() => {
    if (selectedOption && State.Options.lenght === 0) {
      setValue(selectedOption.value);
    }
  }, [selectedOption]);

  const updateSelectedValue = (data, updateText = false) => {
    console.log("update selected value:", data, updateText)
    if (data && data.key) {
      setSelectedOption(data);
      if (updateText) setValue(data.value);
    } else {
      setSelectedOption({ key: "", value: "" });
      if (updateText) setValue("");
    }
  };

  const onTextChange = (e) => {
    setValue(e.target.value);
    LoadData(e.target.value);
  };

  const suggestionSelected = (item) => {
    updateSelectedValue(item, true);
    onChange(id, item);
    ClearOptions();
  };

  const onBlur = () => {
    setInFocus(false);
    if (
      selectedOption &&
      selectedOption.key &&
      value !== selectedOption.value
    ) {
      setValue(selectedOption.value);
      ClearOptions();
    }
    if (!selectedOption || !selectedOption.key) {
      onClearSelection();
    }
  };

  const onClearSelection = () => {
    setValue("");
    setSelectedOption({ key: "", value: "" });
    onChange(id, { key: "", value: "" });
    ClearOptions();
  };

  const renderSuggestions = () => {
    if (State.Options !== null && State.Options.length !== 0 && inFocus) {
      return (
        <div
          style={{
            backgroundColor: "white !important",
            zIndex: "10000",
            border: "1px solid gray",
            position: "relative",
            width: "100%",
          }}
        >
          <StyledList theme={theme} color={color} size={size}>
            {State.Options.map((item, i) => (
              <StyledListItem
                key={i}
                onMouseDown={() => suggestionSelected(item)}
                value={item}
                theme={theme}
                color={color}
                size={size}
              >
                {item.value}
              </StyledListItem>
            ))}
          </StyledList>
        </div>
      );
    }

    let empty =
      State.Options === null ||
      (State.Options !== null && State.Options.length === 0);

    if (
      State.Options !== null &&
      State.Options.length === 0 &&
      inFocus &&
      empty &&
      State.Loading === false
    ) {
      return (
        <div
          style={{
            backgroundColor: "white !important",
            zIndex: "10000",
            border: "1px solid gray",
            position: "relative",
          }}
        >
          <StyledList>
            <StyledListItem key={0} onMouseDown={onBlur}>
              {NotItemsFoundLabel}
            </StyledListItem>
          </StyledList>
        </div>
      );
    }
  };

  return (
    <div>
      <div style={{
        display: "flex",
        justifyContent: "space-between"
      }} >
        <StyledDropdownLookup
          id={id}
          type={"text"}
          value={value ?? ""}
          onChange={onTextChange}
          // className={styles.standardInput}
          disabled={props.disabled}
          title={props.tooltipText}
          theme={theme}
          onBlur={onBlur}
          onFocus={() => {
            setInFocus(true);
            LoadData(value);
          }}
          color="primary"
          size={size}
        />
        <span style={{borderBottom: "2px solid " + theme.palette.primary.main, backgroundColor: props.theme.palette[props.color].lighter}}>
          {State.Loading === false ? (
            <Button
              icon={"times-circle"}
              onClick={onClearSelection}
              disabled={props.disabled}
              theme={theme}
              color="transparent"
            />
          ) : (
            <Button
              icon={"sync-alt"}
              onClick={onClearSelection}
              disabled={props.disabled}
              theme={theme}
              color="transparent"
            />
          )}
        </span>
      </div>
      {renderSuggestions()}
    </div>
  );
};

DropdownLookup.defaultProps = {
  id: "",
  theme: theme,
  disabled: false,
  onChange: () => { },
  className: "",
  preventDefault: true,
  size: "small",
  color: "primary",
  InitializeNamespace: () => { },
  initialValue: "",
  State: {},
  LoadData: () => { },
  ClearOptions: () => { },
  NotItemsFoundLabel: "",
};

DropdownLookup.propTypes = {
  theme: PropTypes.object.isRequired,
  id: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  className: PropTypes.string,
  preventDefault: PropTypes.bool,
  value: PropTypes.string,
  size: PropTypes.oneOf(["small", "medium", "large"]),
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "success",
    "error",
    "warning",
    "gray",
  ]),
  InitializeNamespace: PropTypes.func,
  initialValue: PropTypes.string,
  State: PropTypes.string.object,
  LoadData: PropTypes.func,
  ClearOptions: PropTypes.func,
  NotItemsFoundLabel: PropTypes.string,
};

export default DropdownLookup;
