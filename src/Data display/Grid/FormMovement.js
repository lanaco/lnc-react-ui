import React from "react";
import Button from "../../General/Button/index";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import theme from "../../_utils/theme";

const Item = styled.div`
  padding-left: 0.1875rem;
  padding-right: 0.25rem;
`;

const FormMovement = (props) => {
  //====== PROPS ======
  const {
    CanGoToFirstItem = true,
    CanGoToLastItem = true,
    CanGoToNextItem = true,
    CanGoToPreviousItem = true,
    IsLoading = false,
    goToFirstItem = () => {},
    goToLastItem = () => {},
    goToNextItem = () => {},
    goToPreviousItem = () => {},
  } = props.Config;

  const { Localization = {}, theme, size, color } = props;

  const themeProps = { theme, size, color };

  //====== METHODS ======

  const freeze = (dependcies) => {
    let freeze = false;

    dependcies.forEach((el) => {
      freeze = freeze || el;
    });

    return freeze;
  };

  const freezeLoading = (args = []) => freeze([IsLoading, ...args]);

  //====== RENDER ======

  const renderFirst = () => {
    return (
      <Item {...themeProps}>
        <Button
          {...themeProps}
          icon="angle-double-left"
          onClick={goToFirstItem}
          disabled={freezeLoading([!CanGoToFirstItem])}
          tooltip={Localization.First || "First"}
        />
      </Item>
    );
  };

  const renderLast = () => {
    return (
      <Item {...themeProps}>
        <Button
          {...themeProps}
          icon="angle-double-right"
          onClick={goToLastItem}
          disabled={freezeLoading([!CanGoToLastItem])}
          tooltip={Localization.Last || "Last"}
        />
      </Item>
    );
  };

  const renderNext = () => {
    return (
      <Item {...themeProps}>
        <Button
          {...themeProps}
          icon="angle-right"
          onClick={goToNextItem}
          disabled={freezeLoading([!CanGoToNextItem])}
          tooltip={Localization.Next || "Next"}
        />
      </Item>
    );
  };

  const renderPrevious = () => {
    return (
      <Item {...themeProps}>
        <Button
          {...themeProps}
          icon="angle-left"
          onClick={goToPreviousItem}
          disabled={freezeLoading([!CanGoToPreviousItem])}
          tooltip={Localization.Previous || "Previous"}
        />
      </Item>
    );
  };

  return (
    <>
      {renderFirst()}
      {renderPrevious()}
      {renderNext()}
      {renderLast()}
    </>
  );
};

FormMovement.defaultProps = {
  theme: theme,
  size: "small",
  color: "primary",
  Config: {},
  Localization: {
    First: "First",
    Last: "Last",
    Next: "Next",
    Previous: "Previous",
  },
};

FormMovement.propTypes = {
  theme: PropTypes.object.isRequired,
  size: PropTypes.oneOf(["small", "medium", "large"]),
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "success",
    "error",
    "warning",
    "gray",
  ]),
  Config: PropTypes.object,
  Localization: PropTypes.object,
};

export default FormMovement;
