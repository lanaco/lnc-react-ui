import React from "react";
import styled from "@emotion/styled";
import theme from "../_utils/theme";
import PropTypes from "prop-types";
import "../Base/fontawesome/css/fontawesome.css";

const Container = styled.div`
  display: inline-block;
  box-sizing: border-box;
`;

const Inner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  background-color: ${theme.palette.primary.main};
  color: ${theme.palette.primary.text};
  font-family: ${theme.typography.fontFamily};
  font-size: ${theme.typography.small.fontSize};

  border-radius: 8px;
  cursor: pointer;
`;

const Text = styled.div`
  padding: 6px 4px 6px 6px;
  transition: all 250ms ease;
  border-radius: 8px 0 0 8px;

  &:hover {
    background-color: ${theme.palette.primary.light};
  }
`;

const ButtonContainer = styled.div`
  cursor: pointer;
  padding: 6px 4px 6px 6px;
  transition: all 250ms ease;
  border-radius: 0 8px 8px 0;

  & i {
    font-size: ${theme.typography.small.fontSize};
  }

  &:hover {
    background-color: ${theme.palette.primary.light};
  }
`;

const Bubble = (props) => {
  const {
    theme,
    color,
    id,
    onClick,
    onDelete,
    disabled,
    inactive,
    tooltip,
    preventDefault,
    className,
    size,
    text,
  } = props;

  const themeProps = { ...theme, size, color, disabled, inactive };

  return (
    <Container {...themeProps} className={className}>
      <Inner {...themeProps}>
        <Text {...themeProps} onClick={() => onClick(id)} title={tooltip}>
          {text}
        </Text>
        <ButtonContainer {...themeProps} onClick={() => onDelete(id)}>
          <i class="far fa-times-circle" />
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
  onDelete: () => {},
  className: "",
  preventDefault: true,
  size: "small",
  text: "",
  color: "primary",
  theme: theme,
};

Bubble.propTypes = {
  theme: PropTypes.object.isRequired,
  id: PropTypes.string,
  disabled: PropTypes.bool,
  inactive: PropTypes.bool,
  tooltip: PropTypes.string,
  onClick: PropTypes.func,
  onDelete: PropTypes.func,
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
