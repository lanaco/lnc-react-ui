import React from "react";
import styled from "@emotion/styled";
import theme from "../_utils/theme";
import PropTypes from "prop-types";
import "../Base/fontawesome/css/fontawesome.css";

const Container = styled.div`
  display: inline-block;
  box-sizing: border-box;
  // width: 100%;
`;

const Inner = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: row;

  border: ${(props) =>
    props.inactive ? "1.5px solid #bfbfbf80" : "1.5px solid transparent"};

  background-color: ${(props) =>
    props.inactive
      ? props.theme.palette.primary.lighter
      : props.theme.palette.primary.main};

  color: ${(props) =>
    props.inactive
      ? props.theme.palette.primary.textDark
      : props.theme.palette.primary.text};
  font-family: ${(props) => props.theme.typography.fontFamily};
  font-size: ${(props) => props.theme.typography.small.fontSize};

  border-radius: 8px;
  cursor: pointer;
`;

const Text = styled.div`
  padding: 6.2px 4px 6.2px 8px;
  transition: all 250ms ease;
  border-radius: 8px 0 0 8px;
  white-space: pre;
  flex-grow: 10;
`;

const ButtonContainer = styled.div`
  cursor: pointer;
  padding: 6.2px 8px 6.2px 6px;
  transition: all 250ms ease;
  border-radius: 0 8px 8px 0;
  flex-grow: 0;
  align-self: flex-end;
  margin-left: auto;

  & i {
    font-size: ${(props) => props.theme.typography.small.fontSize};
  }
`;

const Bubble = (props) => {
  const {
    theme,
    color,
    id,
    onClick,
    onRemove,
    disabled,
    inactive,
    tooltip,
    preventDefault,
    className,
    size,
    text,
  } = props;

  const themeProps = { theme, size, color, disabled, inactive };

  return (
    <Container {...themeProps} className={className}>
      <Inner {...themeProps}>
        <Text {...themeProps} onClick={() => onClick(id)} title={tooltip}>
          {text}
        </Text>
        <ButtonContainer {...themeProps} onClick={() => onRemove(id)}>
          <i className="far fa-times-circle" />
        </ButtonContainer>
      </Inner>
    </Container>
  );
};

Bubble.defaultProps = {
  id: "",
  disabled: false,
  inactive: false,
  tooltip: "",
  onClick: () => {},
  onRemove: () => {},
  className: "",
  preventDefault: true,
  size: "small",
  text: "",
  color: "primary",
  theme: theme,
};

Bubble.propTypes = {
  theme: PropTypes.object.isRequired,
  id: PropTypes.any,
  disabled: PropTypes.bool,
  inactive: PropTypes.bool,
  tooltip: PropTypes.string,
  onClick: PropTypes.func,
  onRemove: PropTypes.func,
  className: PropTypes.string,
  preventDefault: PropTypes.bool,
  size: PropTypes.oneOf(["small", "medium", "large"]),
  text: PropTypes.string,
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "success",
    "error",
    "warning",
    "gray",
    "background",
    "transparent",
  ]),
};

export default Bubble;
