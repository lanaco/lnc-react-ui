import React from "react";
import BaseContainer from "../Base/BaseContainer.js";
import CheckBox from "../CheckBox/index.js";
import IconButton from "../IconButton/index.js";
import ToggleSwitch from "../ToggleSwitch/index.js";
import styles from './styles.module.css';

const CheckboxLookup = (props) => {
  const handleCheckboxChange = (id, value) => {
    let selectedItems = [...props.selectedOptions];

    if (value) {
      selectedItems.push(
        props.options.filter((item) => {
          return item[props.itemId] === id;
        })[0]
      );
    } else {
      selectedItems = selectedItems.filter((item) => {
        return item[props.itemId] !== id;
      });
    }
    props.onChange(props.id, selectedItems);
  };

  const handleSelectAll = (selectDeselect) =>
    props.onSelectDeselectAll(selectDeselect);

  const renderSelectAll = () => {
    if (props.onSelectDeselectAll === undefined) return <></>;

    let selectDeselect;

    if (props.options.length === props.selectedOptions.length)
      selectDeselect = false;
    else selectDeselect = true;

    return (
      <IconButton
        onClick={() => handleSelectAll(selectDeselect)}
        iconClassName={props.checkAllIconClassName}
      />
    );
  };

  return (
    <BaseContainer {...props}>
      <div className={styles.cardStyle}>
        <div className={styles.title}>
          {props.title}
          <div className={styles.selectButton}>{renderSelectAll()}</div>
        </div>
        <div className={styles.cardContent}>
          {props.options.map((item, i) => {
            let isChecked = false;

            if (props.selectedOptions) {
              props.selectedOptions.forEach((element) => {
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
                  labelCssClass={css.labelAndErrorCssClass}
                  errorTextCssClass={css.labelAndErrorCssClass}
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
