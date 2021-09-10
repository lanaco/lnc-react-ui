import React from "react";
import Button from "../Button/index.js";

import PropTypes from "prop-types";
import styled from "@emotion/styled";
import theme from "../_utils/theme";

const Container = styled.div((props) => ({
  position: "fixed",
  alignItems: "center",
  background: "rgba(0,0,0,.4)",
  width: "100%",
  height: "100%",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  display: props.open ? "flex" : "none",
  flexDirection: "row",
  justifyContent: "center",
  zIndex: props.zIndex,
}));

const Modal = styled.div((props) => ({
  background: "white",
  transition: "1.1s ease-out",
  visibility: "visible",
  position: "relative",
  width: props.width,
  borderRadius: "0.2rem",
  visibility: "visible",
}));

const Header = styled.div((props) => ({
  padding: "0.2rem",
  display: "flex",
  background: props.basic
    ? "transparent"
    : props.theme.palette[props.color].main,
  borderRadius: "0.2rem 0.2rem 0 0",

  border: props.basic
    ? `0.065rem solid ${props.theme.palette.gray[600]}`
    : "none",
}));

const Title = styled.div((props) => ({
  fontSize: props.theme.typography[props.size].fontSize,
  fontFamily: props.theme.typography.fontFamily,
  fontWeight: "bold",
  color: props.basic
    ? props.theme.palette.gray[800]
    : props.theme.palette[props.color].text,
  paddingLeft: "0.3rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const CloseButton = styled.div((props) => ({
  marginLeft: "auto",
}));

const Content = styled.div((props) => ({
  padding: "0.3125rem",
  border: `0.065rem solid ${props.theme.palette.gray[600]}`,
  borderTop: props.basic
    ? "none"
    : "`0.065rem solid ${props.theme.palette.gray[600]}`",
  borderRadius: "0 0 0.2rem 0.2rem",
}));

function ComponentBox(props) {
  const {
    onClose,
    open,
    zIndex,
    header,
    className,
    theme,
    size,
    color,
    children,
    clickOutsideToClose,
    showHeader,
    width,
    basic,
  } = props;

  let themeProps = { theme, size, color, zIndex, open, width, basic };

  const onClickOutsideModal = (event) => {
    if (event.target !== event.currentTarget) return;

    if (clickOutsideToClose || !showHeader) onClose();
  };

  return (
    <Container
      {...themeProps}
      className={className}
      onClick={onClickOutsideModal}
    >
      <Modal {...themeProps}>
        {showHeader ? (
          <Header {...themeProps}>
            <Title {...themeProps}>{header}</Title>
            <CloseButton {...themeProps}>
              <Button
                {...themeProps}
                icon={"times"}
                iconStyle={"solid"}
                onClick={onClose}
                color={basic ? "transparent" : themeProps.color}
              />
            </CloseButton>
          </Header>
        ) : (
          <></>
        )}
        <Content {...themeProps}>{children}</Content>
      </Modal>
    </Container>
  );
}

ComponentBox.defaultProps = {
  open: false,
  onClose: () => {},
  className: "",
  header: "",
  zIndex: 1000,
  size: "small",
  color: "primary",
  theme: theme,
  basic: false,
  clickOutsideToClose: false,
  showHeader: true,
  width: "70%",
};

ComponentBox.propTypes = {
  theme: PropTypes.object.isRequired,
  onClose: PropTypes.func,
  className: PropTypes.string,
  header: PropTypes.string,
  zIndex: PropTypes.number,
  open: PropTypes.bool,
  showHeader: PropTypes.bool,
  basic: PropTypes.bool,
  clickOutsideToClose: PropTypes.bool,
  width: PropTypes.string,
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

export default ComponentBox;
