import React from "react";
import styled from "@emotion/styled";
import theme from "../_utils/theme";
import PropTypes from "prop-types";
import "../Base/fontawesome/css/fontawesome.css";

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

const Container = styled.div`
  display: inline-block;
  box-sizing: border-box;
`;

const Inner = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: row;

  border: 1px solid #bfbfbf80;

  font-family: ${(props) => props.theme.typography.fontFamily};
  font-size: ${(props) => props.theme.typography.small.fontSize};

  border-radius: 8px;
  cursor: pointer;
`;

const Text = styled.div`
  padding: 6.2px 5px 6.2px 8px;
  transition: all 250ms ease;
  border-radius: 8px 0 0 8px;
  white-space: pre;
  flex-grow: 10;

  background-color: ${(props) =>
    props.inactive
      ? props.theme.palette.gray[900]
      : props.theme.palette.primary.main};

  color: ${(props) => props.theme.palette.primary.text};
`;

const AdditionalInfo = styled.div`
  padding: 6.2px 5px 6.2px 8px;
  transition: all 250ms ease;
  white-space: pre;
  flex-grow: 10;

  background-color: ${(props) =>
    props.inactive
      ? props.theme.palette.gray[100]
      : props.theme.palette.primary.lighter};

  color: ${(props) => props.theme.palette.primary.textDark};
`;

const ButtonContainer = styled.div`
  cursor: pointer;
  padding: 6.2px 8px 6.2px 6px;
  transition: all 250ms ease;
  border-radius: 0 8px 8px 0;
  flex-grow: 0;
  align-self: flex-end;
  margin-left: auto;

  background-color: ${(props) => getBtnContainerColor(props)};

  color: ${(props) => getBtnColor(props)};

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
    additionalInfo,
  } = props;

  const themeProps = { theme, size, color, disabled, inactive };

  return (
    <Container {...themeProps} className={className}>
      <Inner {...themeProps}>
        <Text {...themeProps} onClick={() => onClick(id)} title={tooltip}>
          {text}
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
        >
          <i className="fas fa-times" />
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
  additionalInfo: "",
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

export default Bubble;
