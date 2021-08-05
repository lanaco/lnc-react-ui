import React from "react";
import CheckBox from "../CheckBox/index.js";
import Button from "../Button/index.js";
import ToggleSwitch from "../ToggleSwitch/index.js";

import styled from "@emotion/styled";
import theme from "../_utils/theme";
import PropTypes from "prop-types";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  font-size: ${(props) => props.theme.typography[props.size].fontSize};
  border: 0.125rem solid ${(props) => props.theme.palette[props.color].main};
  border-radius: 0.125rem;
  padding: 0.4rem;
`;

const Header = styled.div`
  padding: 0.125rem 0 0.4rem 0;
  border-bottom: 0.1rem solid ${(props) => props.theme.palette.gray[300]};
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.2rem 0 0 0;
`;

const ControlContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0.125rem 0;
`;

const PagingContainer = styled.div`
  padding: 0.125rem 0.125rem;
`;

const Footer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0.25rem 0 0 0;
  border-top: 0.1rem solid ${(props) => props.theme.palette.gray[300]};
`;

const CheckboxLookup = (props) => {
  const {
    onChange = () => {},
    selectedOptions = [],
    onSelectDeselectAll = () => {},
    options = [],
    //-------------------
    theme,
    size,
    color,
  } = props;

  let themeProps = { theme, size, color };

  return (
    <Container {...themeProps}>
      <Header {...themeProps}>
        <Button
          {...{
            theme: theme,
            color: color,
            tooltip: "Button",
            text:
              options.length === selectedOptions.length
                ? "Deselect all"
                : "Select all",
            icon: "check-square",
            iconStyle:
              options.length === selectedOptions.length ? "regular" : "solid",
            iconLocation: "left",
            onClick: () => {},
            size: size,
            disabled: false,
          }}
        />
      </Header>
      <Content>
        {options.map((x) => {
          return (
            <ControlContainer {...themeProps}>
              <CheckBox
                {...{
                  id: x.id,
                  disabled: false,
                  checked: true,
                  onChange: () => alert("aa"),
                  color: color,
                  size: size,
                  theme: theme,
                  label: x.code,
                }}
              />
            </ControlContainer>
          );
        })}
      </Content>
    </Container>
  );

  // const handleCheckboxChange = (id, value) => {
  //   let selectedItems = [...selectedOptions];

  //   if (value) {
  //     selectedItems.push(
  //       options.filter((item) => {
  //         return item[props.itemId] === id;
  //       })[0]
  //     );
  //   } else {
  //     selectedItems = selectedItems.filter((item) => {
  //       return item[props.itemId] !== id;
  //     });
  //   }
  //   onChange(props.id, selectedItems);
  // };

  // const handleSelectAll = (selectDeselect) =>
  //   onSelectDeselectAll(selectDeselect);

  // const renderSelectAll = () => {
  //   if (onSelectDeselectAll === undefined) return <></>;

  //   let selectDeselect;

  //   if (options.length === selectedOptions.length) selectDeselect = false;
  //   else selectDeselect = true;

  //   return (
  //     <Button
  //       size="small"
  //       onClick={() => handleSelectAll(selectDeselect)}
  //       icon={"tasks"}
  //     />
  //   );
  // };

  // return (
  //   <div className={styles.cardStyle}>
  //     {/* <div className={styles.title}> */}
  //     {/* {props.title} */}
  //     <div className={styles.selectButton}>{renderSelectAll()}</div>
  //     {/* </div> */}
  //     <div className={styles.cardContent}>
  //       {options.map((item, i) => {
  //         let isChecked = false;

  //         if (selectedOptions) {
  //           selectedOptions.forEach((element) => {
  //             if (element[props.itemId] === item[props.itemId]) {
  //               isChecked = true;
  //             }
  //           });
  //         }

  //         if (props.isSwitchComponent) {
  //           return (
  //             <ToggleSwitch
  //               key={i}
  //               value={isChecked}
  //               id={item[props.itemId]}
  //               label={item[props.itemText]}
  //               onChange={handleCheckboxChange}
  //             />
  //           );
  //         } else {
  //           return (
  //             <CheckBox
  //               key={i}
  //               checked={isChecked}
  //               id={item[props.itemId]}
  //               label={item[props.itemText]}
  //               onChange={handleCheckboxChange}
  //               labelCssClass={styles.labelAndErrorCssClass}
  //               errorTextCssClass={styles.labelAndErrorCssClass}
  //             />
  //           );
  //         }
  //       })}
  //     </div>
  //   </div>
  // );
};

CheckboxLookup.defaultProps = {
  theme: theme,
  id: "",
  disabled: false,
  onChange: () => {},
  className: "",
  preventDefault: true,
  size: "small",
  label: "",
  color: "primary",
  style: "regular",
};

CheckboxLookup.propTypes = {
  theme: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  className: PropTypes.string,
  preventDefault: PropTypes.bool,
  size: PropTypes.oneOf(["small", "medium", "large"]),
  style: PropTypes.oneOf(["regular", "toggle"]),
  label: PropTypes.string,
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "success",
    "error",
    "warning",
    "gray",
  ]),
};

export default CheckboxLookup;
