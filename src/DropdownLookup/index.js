import React, { useEffect, useRef } from "react";
import BaseContainer from "../Base/BaseContainer";
import { getLighterColor } from "../Base/ColorBlender";
import IconButton from "../IconButton/index.js";
import styles from "./styles.module.css";

const usePrevious = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};
const emptyFunc = () => {};

const DropdownLookup = (props) => {
  const {
    InitializeNamespace,
    initialValue,
    State,
    LoadData,
    onChange,
    ClearOptions,
  } = props;

  const [inFocus, setInFocus] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [selectedOption, setSelectedOption] = React.useState({});

  const previousInitialValue = usePrevious(props.initialValue);

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
    onChange(props.id, item);
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
    onChange(props.id, { key: "", value: "" });
    ClearOptions();
  };

  const renderSuggestions = () => {
    if (State.Options !== null && State.Options.length !== 0 && inFocus) {
      return (
        <div className={styles.ulListDiv}>
          <ul className={styles.list}>
            {State.Options.map((item, i) => (
              <li
                key={i}
                onMouseDown={() => suggestionSelected(item)}
                value={item}
                className={styles.listItem}
              >
                {item.value}
              </li>
            ))}
          </ul>
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
        <div className={styles.ulListDiv}>
          <ul className={styles.list}>
            <li key={0} onMouseDown={onBlur} className={styles.listItem}>
              {props.NotItemsFoundLabel ? props.NotItemsFoundLabel : ""}
            </li>
          </ul>
        </div>
      );
    }
  };

  if (props.accentColor) {
    const style = {
      backgroundColor: inFocus
        ? "white"
        : getLighterColor(props.accentColor, 0.75),
      borderBottom: "2px solid " + props.accentColor,
    };

    return (
      <BaseContainer {...props}>
        <div className={styles.innerContainer}>
          <input
            id={props.id}
            type={"text"}
            value={value ?? ""}
            onChange={onTextChange}
            className={styles.standardInput}
            disabled={props.disabled}
            title={props.tooltipText}
            style={style}
            onBlur={onBlur}
            onFocus={() => {
              setInFocus(true);
              LoadData(value);
            }}
          />
          <span
            className={
              inFocus ? styles.clearInputSpanInFocus : styles.clearInputSpan
            }
          >
            <IconButton
              iconClassName={props.closeIconClassName}
              onClick={onClearSelection}
              style={style}
            ></IconButton>
          </span>
        </div>
        {renderSuggestions()}
      </BaseContainer>
    );
  }

  return (
    <BaseContainer {...props}>
      <div className={styles.innerContainer}>
        <input
          id={props.id}
          type={"text"}
          value={value ?? ""}
          onChange={onTextChange}
          className={styles.standardInput}
          disabled={props.disabled}
          title={props.tooltipText}
          onBlur={onBlur}
          onFocus={() => {
            setInFocus(true);
            LoadData(value);
          }}
        />
        <span
          className={
            inFocus ? styles.clearInputSpanInFocus : styles.clearInputSpan
          }
        >
          {State.Loading === false ? (
            <IconButton
              iconClassName={props.closeIconClassName}
              onClick={onClearSelection}
              disabled={props.disabled}
            ></IconButton>
          ) : (
            <IconButton
              iconClassName={props.reloadIconClassName}
              onClick={onClearSelection}
              disabled={props.disabled}
            ></IconButton>
          )}
        </span>
      </div>
      {renderSuggestions()}
    </BaseContainer>
  );
};

DropdownLookup.defaultProps = {
  InitializeNamespace: emptyFunc,
  initialValue: {},
  State: { Options: [] },
  LoadData: emptyFunc,
  onChange: emptyFunc,
  ClearOptions: emptyFunc,
};

export default DropdownLookup;
