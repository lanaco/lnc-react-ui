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
  if (size === "small") return `0.34375rem 0.5rem 0.34375rem 0.5rem`;
  if (size === "medium") return `0.40625rem 0.6rem 0.40625rem 0.6rem`;
  if (size === "large") return `0.46875rem 0.7rem 0.46875rem 0.7rem`;
};

const heightBySize = (size) => {
  if (size === "small") return `1.5rem`;
  if (size === "medium") return `1.875rem`;
  if (size === "large") return `2.25rem`;
};

const Container = styled.div`
  display: inline-block;
  box-sizing: border-box;
`;

const Inner = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: row;
  border: 0.0625rem solid #bfbfbf80;
  font-family: ${(props) => props.theme.typography.fontFamily};
  font-size: ${(props) => props.theme.typography[props.size].fontSize};
  padding: 0;
  margin: 0;
  border-radius: 0.5rem;
  cursor: ${(props) => (props.disabled ? "default" : "pointer")};

  min-height: ${(props) => heightBySize(props.size)};
  max-height: ${(props) => heightBySize(props.size)};
`;

const TextSpan = styled.span``;

const Text = styled.div`
  flex: 1;

  padding: ${(props) => paddingBySize(props.size)};
  transition: all 250ms ease;
  border-radius: 0.5rem 0 0 0.5rem;
  white-space: pre;
  flex-grow: 10;
  height: 100%;
  opacity: ${(props) => (props.disabled ? "0.6" : "1")};
  background-color: ${(props) =>
    props.inactive
      ? props.theme.palette.gray[900]
      : props.theme.palette.primary.main};

  color: ${(props) => props.theme.palette.primary.text};
`;

const AdditionalInfo = styled.div`
  padding: ${(props) => paddingBySize(props.size)};
  transition: all 250ms ease;
  white-space: pre;
  flex-grow: 10;
  height: 100%;
  opacity: ${(props) => (props.disabled ? "0.6" : "1")};
  background-color: ${(props) =>
    props.inactive
      ? props.theme.palette.gray[100]
      : props.theme.palette.primary.lighter};

  color: ${(props) => props.theme.palette.primary.textDark};
`;

const ButtonContainer = styled.div`
  display: inline;
  cursor: ${(props) => (props.disabled ? "default" : "pointer")};
  padding: ${(props) => paddingBySize(props.size)};
  transition: all 250ms ease;
  border-radius: 0 0.5rem 0.5rem 0;
  // flex-grow: 0;
  align-self: flex-end;
  margin-left: auto;
  height: 100%;
  opacity: ${(props) => (props.disabled ? "0.6" : "1")};
  background-color: ${(props) => getBtnContainerColor(props)};

  color: ${(props) => getBtnColor(props)};

  & i {
    font-size: ${(props) => props.theme.typography[props.size].fontSize};
  }
`;

const Chip = (props) => {
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
    additionalInfo,
  } = props;

  const themeProps = { theme, size, color, disabled, inactive };

  return (
    <Container {...themeProps} className={className}>
      <Inner {...themeProps}>
        <Text {...themeProps} onClick={() => onClick(id)} title={tooltip}>
          <TextSpan>{text}</TextSpan>
        </Text>

        {additionalInfo && additionalInfo !== "" && (
          <AdditionalInfo onClick={() => onClick(id)} {...themeProps}>
            {additionalInfo}
          </AdditionalInfo>
        )}

        <ButtonContainer
          {...themeProps}
          additional={additionalInfo && additionalInfo !== ""}
          onClick={() => onRemove(id)}
          disabled={disabled}
        >
          <i className="fas fa-times" />
        </ButtonContainer>
      </Inner>
    </Container>
  );
};

Chip.defaultProps = {
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
  additionalInfo: "",
  color: "primary",
  theme: theme,
};

Chip.propTypes = {
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
  additionalInfo: PropTypes.string,
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

export default Chip;
