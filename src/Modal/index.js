import React from "react";
import Button from "../Button/index.js";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import theme from "../_utils/theme";
import { motion, AnimatePresence } from "framer-motion";

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  z-index: ${(props) => props.zIndex};
`;
const ModalContainer = styled(motion.div)`
  width: 50%;
  background-color: white;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: ${(props) => props.width};
  border-radius: 0.2rem;
  background: white;
  z-index: ${(props) => props.zIndex};
`;

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
    : `0.065rem solid ${props.theme.palette.gray[600]}`,
  borderRadius: "0 0 0.2rem 0.2rem",
  maxHeight: "calc(100vh - 220px)",
  overflowY: "auto",
}));

function Modal(props) {
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
    if (clickOutsideToClose || !showHeader) onClose(event);
  };

  const modalVariant = {
    initial: { opacity: 0 },
    isOpen: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const containerVariant = {
    initial: { top: "-50%", transition: { type: "spring" } },
    isOpen: { top: "50%" },
    exit: { top: "-50%" },
  };

  return (
    <>
      {open && (
        <Overlay
          {...themeProps}
          onClick={onClickOutsideModal}
          className={className}
        >
          <AnimatePresence>
            <ModalContainer
              {...themeProps}
              initial={"initial"}
              animate={"isOpen"}
              exit={"exit"}
              variants={containerVariant}
            >
              {showHeader && (
                <Header {...themeProps}>
                  <Title {...themeProps}>{header}</Title>
                  <CloseButton {...themeProps}>
                    <Button
                      {...themeProps}
                      icon={"times"}
                      iconStyle={"solid"}
                      onClick={(e) => onClose(e)}
                      color={basic ? "transparent" : themeProps.color}
                    />
                  </CloseButton>
                </Header>
              )}
              <Content {...themeProps}>{children}</Content>
            </ModalContainer>
          </AnimatePresence>
        </Overlay>
      )}
    </>
  );
}

Modal.defaultProps = {
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

Modal.propTypes = {
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

export default Modal;
