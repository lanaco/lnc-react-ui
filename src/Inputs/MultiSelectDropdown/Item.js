import React from "react";
import styled from "@emotion/styled";
import theme from "../../_utils/theme";
import PropTypes from "prop-types";
import "../../Base/fontawesome/css/fontawesome.css";

const getBtnContainerColor = (props) => {
  if (props.additional && props.inactive) return props.theme.palette.gray[100];

  if (props.additional && !props.inactive)
    return props.theme.palette.primary.lighter;

  if (!props.additional && !props.inactive)
    return props.theme.palette.primary.main;

  if (!props.additional && props.inactive) return props.theme.palette.gray[900];
};

const getBtnColor = (props) => {
  if (props.additional && props.inactive) return props.theme.palette.gray[900];

  if (props.additional && !props.inactive)
    return props.theme.palette.primary.main;

  if (!props.additional && !props.inactive)
    return props.theme.palette.primary.lighter;

  if (!props.additional && props.inactive)
    return props.theme.palette.primary.lighter;
};

const paddingBySize = (size) => {
  if (size === "small") return `0.25rem 0.4rem 0.2rem 0.4rem`;
  if (size === "medium") return `0.2625rem 0.5rem 0.2625rem 0.5rem`;
  if (size === "large") return `0.35rem 0.7rem 0.35rem 0.7rem`;
};

const heightBySize = (size) => {
  if (size === "small") return `1.25rem`;
  if (size === "medium") return `1.625rem`;
  if (size === "large") return `2rem`;
};

const Container = styled.div`
  display: inline-block;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
`;

const Inner = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: row;
  font-family: ${(props) => props.theme.typography.fontFamily};
  font-size: ${(props) => props.theme.typography[props.size].fontSize};
  padding: 0;
  margin: 0;
  border-radius: 0.5rem;

  min-height: ${(props) => heightBySize(props.size)};
`;

const TextSpan = styled.span``;

const Text = styled.div`
  flex: 1;

  padding: ${(props) => paddingBySize(props.size)};
  transition: all 250ms ease;
  border-radius: 0.2rem 0 0 0.2rem;
  white-space: pre;
  flex-grow: 10;
  height: 100%;
  background-color: ${(props) =>
    props.disabled
      ? props.theme.palette.gray[900]
      : props.theme.palette[props.color].light};
  color: ${(props) => props.theme.palette[props.color].text};
`;

const ButtonContainer = styled.div`
  display: inline;
  cursor: pointer;
  padding: ${(props) => paddingBySize(props.size)};
  transition: all 250ms ease;
  border-radius: 0 0.2rem 0.2rem 0;
  align-self: flex-end;
  margin-left: auto;
  height: 100%;

  background-color: ${(props) =>
    props.disabled
      ? props.theme.palette.gray[900]
      : props.theme.palette[props.color].light};
  color: ${(props) => props.theme.palette[props.color].text};

  & i {
    font-size: ${(props) => props.theme.typography[props.size].fontSize};
  }
`;

const Item = (props) => {
  const {
    theme,
    color,
    id,
    onRemove,
    disabled,
    tooltip,
    className,
    size,
    text,
  } = props;

  const themeProps = { theme, size, color, disabled };

  return (
    <Container {...themeProps} className={className}>
      <Inner {...themeProps}>
        <Text {...themeProps} title={tooltip}>
          <TextSpan>{text}</TextSpan>
        </Text>

        <ButtonContainer {...themeProps} onClick={() => onRemove(id)}>
          <i className="fas fa-times" />
        </ButtonContainer>
      </Inner>
    </Container>
  );
};

Item.defaultProps = {
  id: "",
  disabled: false,
  tooltip: "",
  onRemove: () => {},
  className: "",
  preventDefault: true,
  size: "small",
  text: "",
  color: "primary",
  theme: theme,
};

Item.propTypes = {
  theme: PropTypes.object.isRequired,
  id: PropTypes.any,
  disabled: PropTypes.bool,
  tooltip: PropTypes.string,
  onRemove: PropTypes.func,
  className: PropTypes.string,
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

export default Item;
