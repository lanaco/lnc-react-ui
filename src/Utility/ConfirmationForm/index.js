import React, { useEffect, useImperativeHandle, useState } from "react";
import Button from "../../General/Button/index.js";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@emotion/react";
import Icon from "../../General/Icon";
import { getColorRgbaValue } from "../../_utils/utils.js";

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
  background: white;
  z-index: ${(props) => props.zIndex};
  width: ${props => ModalSizes[props.size.toUpperCase()]};
  max-width: 100vw;
  padding: 1.5rem;
  box-shadow: 0px 20px 25px -5px rgba(0, 0, 0, 0.1), 0px 10px 10px -5px rgba(0, 0, 0, 0.04);
  border-radius: 16px;
`;

const CloseButton = styled.div`
 position: absolute;
 cursor: pointer;
 top: 1.375rem;
 right: 1.375rem;
 color: ${props => getColorRgbaValue(
  props.theme,
  "Modal",
  "primary",
  "enabled",
  "cancelButton"
)};
height: 1.5rem;
width: 1.5rem;
display: flex;
justify-content: center;
align-items: center;
border-radius: 4px;

& i {
  font-size: 1.125rem;
}

&:hover {
  background-color: ${props => getColorRgbaValue(
    props.theme,
    "Modal",
    "primary",
    "hover",
    "cancelBtnBg",
    "cancelBtnBgOpacity"
  )};
}
&:focus {
  background-color: ${props => getColorRgbaValue(
    props.theme,
    "Modal",
    "primary",
    "focus",
    "cancelBtnBg",
    "cancelBtnBgOpacity"
  )};
}
`


const Modal = React.forwardRef((props, ref) => {
  const {
    overlay,
    onClose,
    zIndex,
    header,
    size,
    color,
    children,
    clickOutsideToClose,
    showHeader,
    basic,
    className,
    style
  } = props;
  const [show, setShow] = useState(false);

  const theme = useTheme();
  let themeProps = { theme, size, color, zIndex, basic, style };

  const onClickOutsideModal = (event) => {
    if (event.target !== event.currentTarget) return;
    if (clickOutsideToClose || !showHeader) close(event);
  };

  //Expose functions through ref
  useImperativeHandle(ref, () => ({
    open() {
      open()
    },
    close() {
      close()
    }
  }))

  const open = () => {
    setShow(true);
  }

  const close = (event) => {
    setShow(false);
    onClose(event);
  }

  const modalVariant = {
    initial: { opacity: 0 },
    isOpen: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const containerVariant = {
    initial: { top: "50%", opacity: 0, transition: { type: "spring", duration: 3 } },
    isOpen: { top: "50%", opacity: 1 },
    exit: { top: "50%", opacity: 0 },
  };

  const ModalWrapper = ({ themeProps, containerVariant, children }) => {
    return (<AnimatePresence>
      <ModalContainer
        {...themeProps}
        initial={"initial"}
        animate={"isOpen"}
        exit={"exit"}
        variants={containerVariant}
      >
        <CloseButton {...themeProps} onClick={close}><Icon icon={"times"}></Icon></CloseButton>
        {children}
      </ModalContainer>
    </AnimatePresence>);
  }

  return (
    <>
      {show && (
        overlay ?
          <Overlay
            {...themeProps}
            onClick={onClickOutsideModal}
            className={className}
          >
            <ModalWrapper themeProps={themeProps} containerVariant={containerVariant} >{children}</ModalWrapper>
            {/* <AnimatePresence>
              <ModalContainer
                {...themeProps}
                initial={"initial"}
                animate={"isOpen"}
                exit={"exit"}
                variants={containerVariant}
              >
                {children}
              </ModalContainer>
            </AnimatePresence> */}
          </Overlay>
          :
          <ModalWrapper themeProps={themeProps} containerVariant={containerVariant}>{children}</ModalWrapper>
      )}
    </>
  );
});

Modal.defaultProps = {
  overlay: true,
  open: false,
  onClose: () => { },
  className: "",
  header: "",
  zIndex: 1000,
  size: "fluid",
  color: "primary",
  basic: false,
  clickOutsideToClose: false,
};

Modal.propTypes = {
  overlay: PropTypes.bool,
  onClose: PropTypes.func,
  header: PropTypes.string,
  zIndex: PropTypes.number,
  open: PropTypes.bool,
  basic: PropTypes.bool,
  clickOutsideToClose: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object,
  size: PropTypes.oneOf(["fluid", "xs", "s", "m", "l", "xl", "full"]),
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


const ModalSizes = {
  FLUID: "min-content",
  XS: "320px",
  S: "412px",
  M: "672px",
  L: "1112px",
  XL: "1376px",
  FULL: "100vw",
}