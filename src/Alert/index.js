import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import theme from "../_utils/theme";

const fontSize = (props) => {
  let fontSize = props.theme.typography[props.size].fontSize;
  let newFontSize = "";

  if (fontSize.includes("px")) {
    newFontSize =
      parseFloat(
        props.theme.typography[props.size].fontSize.replace("px", "")
      ) -
      1.5 +
      "px";
  }

  if (fontSize.includes("rem")) {
    newFontSize =
      parseFloat(
        props.theme.typography[props.size].fontSize.replace("rem", "")
      ) -
      0.09375 +
      "rem";
  }

  return newFontSize;
};

const paddingBySize = (size) => {
  if (size === "small") return `0.1rem 0.3rem 0.1rem 0.1rem`;
  if (size === "medium") return `0.13rem 0.4rem 0.13rem 0.1rem`;
  if (size === "large") return `0.16rem 0.5rem 0.16rem 0.1rem`;
};

const paddingBySizeContainerBox = (size) => {
  if (size === "small") return `0.1875rem 0.3rem`;
  if (size === "medium") return `0.25rem 0.4rem`;
  if (size === "large") return `0.3125rem 0.5rem`;
};

const ContainerBox = styled.div`
  border: 0.0625rem solid ${(props) => props.theme.palette[props.color].dark};
  border-radius: 0.15625rem;
  background-color: ${(props) => props.theme.palette[props.color].lighter};
  color: ${(props) => props.theme.palette[props.color].dark};
  font-size: ${(props) => fontSize(props)};
  font-family: ${(props) => props.theme.typography.fontFamily};
  padding: ${(props) => paddingBySizeContainerBox(props.size)};
  word-wrap: break-word;
  box-sizing: border-box;
`;

const Container = styled.div`
  color: ${(props) => props.theme.palette[props.color].dark};
  font-size: ${(props) => fontSize(props)};
  font-family: ${(props) => props.theme.typography.fontFamily};
  padding: ${(props) => paddingBySize(props.size)};
  padding-left: 0px;
  word-wrap: break-word;
  box-sizing: border-box;
`;

const Alet = (props) => {
  const { className, size, color, theme, message, hasContainer } = props;

  const themeProps = { theme, size, color };

  if (hasContainer)
    return (
      <ContainerBox {...themeProps} className={className}>
        {message}
      </ContainerBox>
    );

  if (!hasContainer)
    return (
      <Container {...themeProps} className={className}>
        {message}
      </Container>
    );
};

Alet.defaultProps = {
  className: "",
  size: "small",
  theme: theme,
  color: "primary",
  hasContainer: true,
  message: "",
};

Alet.propTypes = {
  message: PropTypes.string,
  theme: PropTypes.object.isRequired,
  className: PropTypes.string,
  hasContainer: PropTypes.bool,
  size: PropTypes.oneOf(["small", "medium", "large"]),
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "success",
    "error",
    "warning",
    "gray",
    "background",
  ]),
};

export default Alet;
