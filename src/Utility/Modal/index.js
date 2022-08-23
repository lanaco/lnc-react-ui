import React, { useEffect, useImperativeHandle, useLayoutEffect, useRef, useState } from "react";
import Button from "../../General/Button/index.js";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@emotion/react";
import Icon from "../../General/Icon";
import { getColorRgbaValue } from "../../_utils/utils.js";

const FOOTER_HEIGHT = "5rem";
const HEADER_HEIGHT = "3.8rem";
const MODAL_PADDING = "1.5rem";

const getMaxHeight = (size, header, footer) => {

  if (header && footer) {
    if (size == "FULL") return `calc(100vh - ${HEADER_HEIGHT} - ${FOOTER_HEIGHT})`;

    return `calc(100vh - ${HEADER_HEIGHT} - ${FOOTER_HEIGHT} - ${MODAL_PADDING})`;
  } else if (header) {
    if (size == "FULL") return `calc(100vh - ${HEADER_HEIGHT})`;

    return `calc(100vh - ${HEADER_HEIGHT} - ${MODAL_PADDING})`;
  } else if (footer) {
    if (size == "FULL") return `calc(100vh - ${FOOTER_HEIGHT})`;

    return `calc(100vh - ${FOOTER_HEIGHT} - ${MODAL_PADDING})`;
  }

  if (size == "FULL") return `100vh`;

  return `calc(100vh - ${MODAL_PADDING})`;
}

const getMaxWidth = (size) => {
  if (size == "FULL") return `100vw`;

  return `calc(100vw - ${MODAL_PADDING})`;
}

const getMargin = (size, header, footer) => {
  if (size == "FULL") return "0";

  //Needed because of border-radius and scrollbar (with scrollbar and without margin border radius would be lost to the right)
  return `${(header ? '0' : '16px')} 0 ${(footer ? '0' : '16px')} 0`;
}

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
  max-width: ${props => getMaxWidth(props.size.toUpperCase())};
  box-shadow: 0px 20px 25px -5px rgba(0, 0, 0, 0.1), 0px 10px 10px -5px rgba(0, 0, 0, 0.04);
  border-radius: ${props => props.size.toUpperCase() != "FULL" ? "16px" : "0"};
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  & .lnc-modal-header {
    max-height: ${HEADER_HEIGHT};
    overflow: hidden;
    padding: ${MODAL_PADDING} ${MODAL_PADDING} 0 ${MODAL_PADDING};
  }
  & .lnc-modal-header > h1,h2,h3 {
    margin: 0;
  }
  & .lnc-modal-footer {
    max-height: ${FOOTER_HEIGHT};
    overflow: hidden;
    padding-top: 1rem;
  }
  ${props => props.size.toUpperCase() == "FULL" && "height: 100vh"};

  & .lnc-modal-content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    scrollbar-width: thin;
    ${props => `max-height: ${getMaxHeight(props.size.toUpperCase(), props.header, props.footer)}`};
    overflow: auto;
    margin: ${props => getMargin(props.size, props.header, props.footer)};
    padding: 0 ${MODAL_PADDING} 0 ${MODAL_PADDING};
  }
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
    isOpen,
    header,
    footer,
    overlay,
    showCloseButton,
    onClose,
    zIndex,
    size,
    clickOutsideToClose,
    className,
    style,
    overlayProps,
    children,
    rest,
  } = props;
  const [show, setShow] = useState(isOpen);

  const theme = useTheme();
  let themeProps = { theme, size, zIndex, className, style };

  const onClickOutsideModal = (event) => {

    if (event.target !== event.currentTarget) return;
    if (clickOutsideToClose) close(event);
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

  const containerVariant = {
    initial: { top: "50%", opacity: 0, transition: { type: "spring", duration: 3 } },
    isOpen: { top: "50%", opacity: 1 },
    exit: { top: "50%", opacity: 0 },
  };

  const ModalWrapper = ({ modalRef, themeProps, containerVariant, header, footer, children }) => {
    return (<AnimatePresence>
      <ModalContainer
        ref={modalRef}
        {...themeProps}
        initial={"initial"}
        animate={"isOpen"}
        exit={"exit"}
        variants={containerVariant}
        header={header}
        footer={footer}
        {...rest}
      >
        {showCloseButton && <CloseButton {...themeProps} onClick={close}><Icon icon={"times"}></Icon></CloseButton>}
        {header && <div className="lnc-modal-header">{header}</div>}
        <div className="lnc-modal-content">
          {children}
        </div>
        {footer && <div className="lnc-modal-footer">{footer}</div>}
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
            {...overlayProps}>
            <ModalWrapper modalRef={ref} themeProps={themeProps} containerVariant={containerVariant} header={header} footer={footer} {...rest}>
              {children}
            </ModalWrapper>
          </Overlay>
          :
          <ModalWrapper modalRef={ref} themeProps={themeProps} containerVariant={containerVariant} header={header} footer={footer} {...rest}>
            {children}
          </ModalWrapper>
      )}
    </>
  );
});

Modal.defaultProps = {
  isOpen: false,
  showCloseButton: true,
  overlay: true,
  onClose: () => { },
  className: "",
  zIndex: 1000,
  size: "fluid",
  clickOutsideToClose: false,
};

Modal.propTypes = {
  /**
   * Is modal open by default
   */
  isOpen: PropTypes.bool,
  header: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  footer: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  showCloseButton: PropTypes.bool,
  overlay: PropTypes.bool,
  onClose: PropTypes.func,
  zIndex: PropTypes.number,
  clickOutsideToClose: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object,
  size: PropTypes.oneOf(["fluid", "xs", "s", "m", "l", "xl", "full"]),
  overlayProps: PropTypes.any,
};

export default Modal;


const ModalSizes = {
  FLUID: "max-content",
  XS: "320px",
  S: "412px",
  M: "672px",
  L: "1112px",
  XL: "1376px",
  FULL: "100vw",
}