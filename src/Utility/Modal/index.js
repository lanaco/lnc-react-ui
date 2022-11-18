import React, { useImperativeHandle, useState } from "react";
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
    if (size == "FULL")
      return `calc(100vh - ${HEADER_HEIGHT} - ${FOOTER_HEIGHT})`;

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
};

const getMaxWidth = (size) => {
  if (size == "FULL") return `100vw`;

  return `calc(100vw - ${MODAL_PADDING})`;
};

const getMargin = (size, header, footer) => {
  if (size == "FULL") return "0";

  //Needed because of border-radius and scrollbar (with scrollbar and without margin border radius would be lost to the right)
  return `${header ? "0" : "16px"} 0 ${footer ? "0" : "16px"} 0`;
};

const Overlay = styled(motion.div)`
  position: ${(props) => (props.scrollOverlay == true ? "absolute" : "fixed")};
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${(props) =>
    props.scrollOverlay === true ? "transparent" : props.overlayColor};
  z-index: ${(props) => props.zIndex};
  display: flex;
`;
const ModalContainer = styled(motion.div)`
  position: relative;
  width: 50%;
  background-color: white;
  ${(props) =>
    props.scrollOverlay == false
      ? "position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);"
      : "height: fit-content; margin-right: auto; margin-left: auto;"}
  background-color: ${(props) =>
    getColorRgbaValue(props.theme, "Modal", "default", "enabled", "bg")};
  z-index: ${(props) => props.zIndex};
  width: ${(props) => ModalSizes[props.size.toUpperCase()]};
  max-width: ${(props) => getMaxWidth(props.size.toUpperCase())};
  box-shadow: 0px 20px 25px -5px rgba(0, 0, 0, 0.1),
    0px 10px 10px -5px rgba(0, 0, 0, 0.04);
  border-radius: ${(props) =>
    props.size.toUpperCase() != "FULL" ? "16px" : "0"};
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  & .lnc-modal-header {
    max-height: ${HEADER_HEIGHT};
    overflow: hidden;
    padding: ${MODAL_PADDING} ${MODAL_PADDING} 0 ${MODAL_PADDING};
  }
  & .lnc-modal-header > h1,
  h2,
  h3 {
    margin: 0;
  }
  & .lnc-modal-footer {
    max-height: ${FOOTER_HEIGHT};
    overflow: hidden;
    padding-top: 1rem;
  }
  ${(props) => props.size.toUpperCase() == "FULL" && "height: 100vh"};

  & .lnc-modal-content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    scrollbar-width: thin;
    ${(props) =>
      props.scrollOverlay == false &&
      `max-height: ${getMaxHeight(
        props.size.toUpperCase(),
        props.header,
        props.footer
      )};`}
    overflow: auto;
    margin: ${(props) => getMargin(props.size, props.header, props.footer)};
    padding: 0 ${MODAL_PADDING} 0 ${MODAL_PADDING};
  }
`;

const CloseButton = styled.div`
  position: absolute;
  cursor: pointer;
  top: 1.375rem;
  right: 1.375rem;
  color: ${(props) =>
    getColorRgbaValue(
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
    background-color: ${(props) =>
      getColorRgbaValue(
        props.theme,
        "Modal",
        "primary",
        "hover",
        "cancelBtnBg",
        "cancelBtnBgOpacity"
      )};
  }
  &:focus {
    background-color: ${(props) =>
      getColorRgbaValue(
        props.theme,
        "Modal",
        "primary",
        "focus",
        "cancelBtnBg",
        "cancelBtnBgOpacity"
      )};
  }
`;

//used for scrollOverlay = true, in that case regular overlay and modal must be inside relative div, so the SecondOverlay is used to cover the rest of the screen
const SecondOverlay = styled(motion.div)`
  display: ${(props) => (props.scrollOverlay === true ? "block" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: ${(props) => props.overlayColor};
  z-index: 3;
`;

const Modal = React.forwardRef((props, ref) => {
  const {
    isOpen,
    header,
    footer,
    scrollOverlay,
    overlay,
    overlayColor,
    showCloseButton,
    onOpen,
    onClose,
    zIndex,
    size,
    clickOutsideToClose,
    overlayAnimation,
    modalAnimation,
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
      open();
    },
    close() {
      close();
    },
    isOpen() {
      return show;
    },
  }));

  const open = () => {
    setShow(true);
    onOpen(event);
  };

  const close = (event) => {
    setShow(false);
    onClose(event);
  };

  const containerVariant = {
    initial: {
      opacity: 0,
      transition: { type: "spring", duration: 3 },
    },
    isOpen: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const ModalWrapper = ({
    modalRef,
    themeProps,
    scrollOverlay,
    containerVariant,
    header,
    footer,
    children,
  }) => {
    return (
      <AnimatePresence>
        <ModalContainer
          ref={modalRef}
          {...themeProps}
          {...modalAnimation}
          header={header}
          footer={footer}
          scrollOverlay={scrollOverlay}
          {...rest}
        >
          {showCloseButton && (
            <CloseButton {...themeProps} onClick={close}>
              <Icon icon={"times"}></Icon>
            </CloseButton>
          )}
          {header && <div className="lnc-modal-header">{header}</div>}
          <div className="lnc-modal-content">{children}</div>
          {footer && <div className="lnc-modal-footer">{footer}</div>}
        </ModalContainer>
      </AnimatePresence>
    );
  };

  return (
    <>
      {show && (
        <AnimatePresence>
          {overlay ? (
            <>
              <SecondOverlay
                scrollOverlay={scrollOverlay}
                onClick={onClickOutsideModal}
                overlayColor={overlayColor}
                {...overlayProps}
                {...overlayAnimation}
              />
              <Overlay
                {...themeProps}
                onClick={onClickOutsideModal}
                scrollOverlay={scrollOverlay}
                overlayColor={overlayColor}
                isOpen={isOpen}
                {...overlayProps}
                {...overlayAnimation}
              >
                <ModalWrapper
                  modalRef={ref}
                  themeProps={themeProps}
                  containerVariant={containerVariant}
                  scrollOverlay={scrollOverlay}
                  header={header}
                  footer={footer}
                  {...rest}
                >
                  {children}
                </ModalWrapper>
              </Overlay>
            </>
          ) : (
            <ModalWrapper
              modalRef={ref}
              themeProps={themeProps}
              containerVariant={containerVariant}
              header={header}
              footer={footer}
              {...rest}
            >
              {children}
            </ModalWrapper>
          )}
        </AnimatePresence>
      )}
    </>
  );
});

Modal.defaultProps = {
  isOpen: false,
  showCloseButton: true,
  scrollOverlay: false,
  overlay: true,
  overlayColor: "rgba(0, 0, 0, 0.3)",
  onOpen: () => {},
  onClose: () => {},
  overlayAnimation: {
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    initial: {
      opacity: 0,
    },
    transition: { type: "spring", duration: 1 },
  },
  modalAnimation: {
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    initial: {
      opacity: 0,
    },
    transition: { type: "spring", duration: 1 },
  },
  className: "",
  zIndex: 1000,
  size: "fluid",
  clickOutsideToClose: true,
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
  /**
   * when scrollOverlay=false whole modal contetn will be shown inside viewport and modal content will be scrollable,
   * when scrollOverlay=true modal content won't be scrollable it will be fully shown inside overlay which will be scrollable
   * to use this prop `overlay` must be set to `true`
   * Make sure when setting `scrollOverlay={true} that the parent element has `position: relative`;
   */
  scrollOverlay: PropTypes.bool,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
  zIndex: PropTypes.number,
  clickOutsideToClose: PropTypes.bool,
  overlayColor: PropTypes.string,
  overlayAnimation: PropTypes.object,
  modalAnimation: PropTypes.object,
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
};
