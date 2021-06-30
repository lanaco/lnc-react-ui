import React from "react";
import BaseContainer from "../Base/BaseContainer.js";
import CheckBox from "../CheckBox/index.js";
import IconButton from "../IconButton/index.js";
import ToggleSwitch from "../ToggleSwitch/index.js";
import styles from "./styles.module.css";

const CheckboxLookup = (props) => {
  const emptyFunc = () => {};
  const {
    onChange = emptyFunc,
    selectedOptions = [],
    onSelectDeselectAll = emptyFunc,
    options = [],
  } = props;

  const handleCheckboxChange = (id, value) => {
    let selectedItems = [...selectedOptions];

    if (value) {
      selectedItems.push(
        options.filter((item) => {
          return item[props.itemId] === id;
        })[0]
      );
    } else {
      selectedItems = selectedItems.filter((item) => {
        return item[props.itemId] !== id;
      });
    }
    onChange(props.id, selectedItems);
  };

  const handleSelectAll = (selectDeselect) =>
    onSelectDeselectAll(selectDeselect);

  const renderSelectAll = () => {
    if (onSelectDeselectAll === undefined) return <></>;

    let selectDeselect;

    if (options.length === selectedOptions.length) selectDeselect = false;
    else selectDeselect = true;

    return (
      <IconButton
        onClick={() => handleSelectAll(selectDeselect)}
        iconClassName={props.checkAllIconClassName}
      />
    );
  };

  return (
    <BaseContainer {...props} label={props.title}>
      <div className={styles.cardStyle}>
        {/* <div className={styles.title}> */}
        {/* {props.title} */}
        <div className={styles.selectButton}>{renderSelectAll()}</div>
        {/* </div> */}
        <div className={styles.cardContent}>
          {options.map((item, i) => {
            let isChecked = false;

            if (selectedOptions) {
              selectedOptions.forEach((element) => {
                if (element[props.itemId] === item[props.itemId]) {
                  isChecked = true;
                }
              });
            }

            if (props.isSwitchComponent) {
              return (
                <ToggleSwitch
                  key={i}
                  value={isChecked}
                  id={item[props.itemId]}
                  label={item[props.itemText]}
                  onChange={handleCheckboxChange}
                />
              );
            } else {
              return (
                <CheckBox
                  key={i}
                  checked={isChecked}
                  id={item[props.itemId]}
                  label={item[props.itemText]}
                  onChange={handleCheckboxChange}
                  labelCssClass={styles.labelAndErrorCssClass}
                  errorTextCssClass={styles.labelAndErrorCssClass}
                />
              );
            }
          })}
        </div>
      </div>
    </BaseContainer>
  );
};

export default CheckboxLookup;
