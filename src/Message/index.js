import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import theme from "../_utils/theme";

const fontSize = (props) => {
  var fontSize =
    parseFloat(props.theme.typography[props.size].fontSize.replace("px", "")) -
    1.5 +
    "px";

  return fontSize;
};

const paddingBySize = (size) => {
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
  padding: ${(props) => paddingBySize(props.size)};
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

const Message = (props) => {
  const { className, size, color, theme, message, container } = props;

  const themeProps = { theme, size, color };

  if (container)
    return (
      <ContainerBox {...themeProps} className={className}>
        {message}
      </ContainerBox>
    );

  if (!container)
    return (
      <Container {...themeProps} className={className}>
        {message}
      </Container>
    );
};

Message.defaultProps = {
  className: "",
  size: "small",
  theme: theme,
  color: "primary",
  container: true,
};

Message.propTypes = {
  theme: PropTypes.object.isRequired,
  className: PropTypes.string,
  container: PropTypes.bool,
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

export default Message;
