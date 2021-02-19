import React, { useEffect, useRef } from "react";
import BaseContainer from "../Base/BaseContainer";
import IconButton from "../IconButton/index.js";
import styles from "./styles.module.css";

const usePrevious = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

const DropdownLookup = (props) => {
  const [inFocus, setInFocus] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [selectedOption, setSelectedOption] = React.useState({});

  const previousInitialValue = usePrevious(props.initialValue);

  let cssThemeClass = {};

  useEffect(() => {
    if (
      props.namespace === "" ||
      props.namespace === undefined ||
      props.namespace === null ||
      isNaN(props.namespace)
    ) {
    } else {
      props.InitializeNamespace(props.namespace);
    }
    updateSelectedValue(props.initialValue);
  }, []);

  useEffect(() => {
    if (previousInitialValue === undefined)
      updateSelectedValue(props.initialValue, true);

    if (
      previousInitialValue &&
      previousInitialValue.key !== props.initialValue.key
    )
      updateSelectedValue(props.initialValue, true);

    if (props.initialValue.key === "" && !inFocus) setValue("");
  }, [props.initialValue]);

  useEffect(() => {
    if (selectedOption && props.State.Options.lenght === 0) {
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
    props.LoadData(e.target.value);
  };

  const suggestionSelected = (item) => {
    updateSelectedValue(item, true);
    props.onChange(props.id, item);
    props.ClearOptions();
  };

  const onBlur = () => {
    setInFocus(false);
    if (
      selectedOption &&
      selectedOption.key &&
      value !== selectedOption.value
    ) {
      setValue(selectedOption.value);
      props.ClearOptions();
    }
    if (!selectedOption || !selectedOption.key) {
      onClearSelection();
    }
  };

  const onClearSelection = () => {
    setValue("");
    setSelectedOption({ key: "", value: "" });
    props.onChange(props.id, { key: "", value: "" });
    props.ClearOptions();
  };

  const renderSuggestions = () => {
    if (
      props.State.Options !== null &&
      props.State.Options.length !== 0 &&
      inFocus
    ) {
      return (
        <div className={styles.ulListDiv}>
          <ul className={styles.list}>
            {props.State.Options.map((item, i) => (
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
  };

  return (
    <BaseContainer {...props}>
      <div className={styles.innerContainer}>
        <input
          id={props.id}
          type={"text"}
          value={value ?? ""}
          onChange={onTextChange}
          className={`${styles.standardInput} ${cssThemeClass}`}
          title={props.tooltipText}
          onBlur={onBlur}
          onFocus={() => {
            setInFocus(true);
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
          ></IconButton>
        </span>
      </div>
      {renderSuggestions()}
    </BaseContainer>
  );
};

export default DropdownLookup;
