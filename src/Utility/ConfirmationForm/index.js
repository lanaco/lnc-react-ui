import React from "react";
import Button from "../../General/Button/index.js";

import PropTypes from "prop-types";
import styled from "@emotion/styled";
import theme from "../../_utils/theme";

const Container = styled.div((props) => ({
  position: "fixed",
  alignItems: "center",
  background: props.theme.palette.gray[600] + "50",
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
  width: "30%",
  borderRadius: "0.2rem",
  visibility: "visible",
}));

const Header = styled.div((props) => ({
  padding: "0.3125rem",
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
  padding: "1.1rem 0.9rem",
  border: `0.065rem solid ${props.theme.palette.gray[600]}`,
  borderRadius: "0 0 0.2rem 0.2rem",
  display: "flex",
  flexDirection: "row",
  alignItems: "stretch",
  borderTop: props.basic
    ? "none"
    : `0.065rem solid ${props.theme.palette.gray[600]}`,
}));

const YesNoContainer = styled.div((props) => ({
  flex: "1",
  paddingLeft: props.paddingLeft || "0",
  paddingRight: props.paddingRight || "0",
  "& button": {
    width: "100%",
  },
}));

const ConfirmationForm = (props) => {
  const {
    onClose,
    onConfirm,
    onDecline,
    open,
    zIndex,
    header,
    className,
    theme,
    size,
    color,
    clickOutsideToClose,
    showHeader,
    localization,
    basic,
  } = props;

  let themeProps = { theme, size, color, zIndex, open, basic };

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
        <Content {...themeProps}>
          <YesNoContainer paddingRight={"0.2rem"}>
            <Button
              onClick={() => {
                onConfirm();
                onClose();
              }}
              text={localization.Yes || "Yes"}
              color={"primary"}
              size={size}
            />
          </YesNoContainer>
          <YesNoContainer paddingLeft={"0.2rem"}>
            <Button
              onClick={() => {
                onDecline();
                onClose();
              }}
              text={localization.No || "No"}
              color={"secondary"}
              size={size}
            />
          </YesNoContainer>
        </Content>
      </Modal>
    </Container>
  );
};

ConfirmationForm.defaultProps = {
  open: false,
  onClose: () => {},
  onConfirm: () => {},
  onDecline: () => {},
  className: "",
  header: "",
  zIndex: 1000,
  size: "small",
  color: "primary",
  theme: theme,
  clickOutsideToClose: false,
  showHeader: true,
  basic: false,
  localization: {
    Yes: "Yes",
    No: "No",
  },
};

ConfirmationForm.propTypes = {
  localization: PropTypes.object,
  theme: PropTypes.object.isRequired,
  onClose: PropTypes.func,
  onConfirm: PropTypes.func,
  onDecline: PropTypes.func,
  className: PropTypes.string,
  header: PropTypes.string,
  zIndex: PropTypes.number,
  open: PropTypes.bool,
  showHeader: PropTypes.bool,
  clickOutsideToClose: PropTypes.bool,
  basic: PropTypes.bool,
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

export default ConfirmationForm;
