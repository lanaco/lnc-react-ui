import React from "react";
import styles from "./styles.module.css";
import { freeze } from "../Helper/helper";
import Button from "../Button/index.js";
import styled from "@emotion/styled";
import theme from "../_utils/theme";
import PropTypes from "prop-types";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
  font-size: ${(props) => props.theme.typography.small.fontSize};
  font-family: ${(props) => props.theme.typography.fontFamily};
  padding: 0px 8px;
`;

const Item = styled.div`
  padding-left: ${(props) => (props.first ? "0" : "6px")};
  display: flex;
  align-items: center;
`;

const FormViewMovement = (props) => {
  //====== PROPS ======

  const {
    CanGoToFirstItem,
    CanGoToLastItem,
    CanGoToNextItem,
    CanGoToPreviousItem,
    IsLoading,
    goToFirstItem,
    goToLastItem,
    goToNextItem,
    goToPreviousItem,
  } = props.Config;

  const { Localization = {}, theme, size, color } = props;

  const themeProps = { theme, size, color };

  //====== LIFECYCLE ======

  //====== EVENTS ======

  //====== METHODS ======

  const freezeLoading = (args = []) => freeze([IsLoading, ...args]);

  //====== RENDER ======

  const renderFirst = () => {
    return (
      <Item {...themeProps} first={true}>
        <Button
          {...themeProps}
          icon={"angle-double-left"}
          onClick={freezeLoading() ? () => {} : goToFirstItem}
          disabled={!CanGoToFirstItem}
          tooltip={Localization.First}
        />
      </Item>
    );
  };

  const renderLast = () => {
    return (
      <Item {...themeProps}>
        <Button
          {...themeProps}
          icon={"angle-double-right"}
          onClick={freezeLoading() ? () => {} : goToLastItem}
          disabled={!CanGoToLastItem}
          tooltip={Localization.Last}
        />
      </Item>
    );
  };

  const renderNext = () => {
    return (
      <Item {...themeProps}>
        <Button
          {...themeProps}
          icon={"angle-right"}
          onClick={freezeLoading() ? () => {} : goToNextItem}
          disabled={!CanGoToNextItem}
          tooltip={Localization.Next}
        />
      </Item>
    );
  };

  const renderPrevious = () => {
    return (
      <Item {...themeProps}>
        <Button
          {...themeProps}
          icon={"angle-left"}
          onClick={freezeLoading() ? () => {} : goToPreviousItem}
          disabled={!CanGoToPreviousItem}
          tooltip={Localization.Previous}
        />
      </Item>
    );
  };

  return (
    <Container {...themeProps}>
      {renderFirst()}
      {renderPrevious()}
      {renderNext()}
      {renderLast()}
    </Container>
  );
};

FormViewMovement.defaultProps = {
  CanGoToFirstItem: false,
  CanGoToLastItem: false,
  CanGoToNextItem: false,
  CanGoToPreviousItem: false,
  IsLoading: false,
  goToFirstItem: () => {},
  goToLastItem: () => {},
  goToNextItem: () => {},
  goToPreviousItem: () => {},
  //-------------------------------
  theme: theme,
  color: "primary",
  size: "small",
};

FormViewMovement.propTypes = {
  CanGoToFirstItem: PropTypes.bool,
  CanGoToLastItem: PropTypes.bool,
  CanGoToNextItem: PropTypes.bool,
  CanGoToPreviousItem: PropTypes.bool,
  IsLoading: PropTypes.bool,
  goToFirstItem: PropTypes.func,
  goToLastItem: PropTypes.func,
  goToNextItem: PropTypes.func,
  goToPreviousItem: PropTypes.func,
  //-------------------------------
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
};

export default FormViewMovement;
