import React, { useEffect } from "react";
import styles from "./styles.module.css";
import Button from "../Button/index.js";

import PropTypes from "prop-types";
import styled from "@emotion/styled";
import theme from "../_utils/theme";

const Container = styled.div((props) => ({
  position: "fixed",
  alignItems: "center",
  background: "rgba(0, 0, 0, 0.5)",
  width: "100%",
  height: "100%",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  zIndex: 10000,
}));

const Modal = styled.div((props) => ({
  background: "white",
  transition: "1.1s ease-out",
  visibility: "visible",
  position: "relative",
  width: "70%",
}));

const Header = styled.div((props) => ({
  padding: "5px",
  display: "flex",
}));

const Title = styled.div((props) => ({
  fontSize: "12px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const CloseButton = styled.div((props) => ({
  marginLeft: "auto",
}));

const Content = styled.div((props) => ({
  borderTop: `0.125rem solid ${props.}`,
  padding: "5px",
}));

function ComponentBox(props) {
  const {
    id,
    onClose,
    open,
    zIndex,
    header,
    className,
    theme,
    size,
    color,
  } = props;

  let themeProps = { theme, size, color}

  return (
    <Container {...themeProps}>
      <Modal {...themeProps}>
        <Header {...themeProps}>
          <Title {...themeProps}>Header</Title>
          <CloseButton {...themeProps}>
            <Button icon={"times"} iconStyle={"solid"} onClick={() => {}} />
          </CloseButton>
        </Header>
        <Content {...themeProps}>Content</Content>
      </Modal>
    </Container>
  );

  // let componentBox = !basic
  //   ? componentBoxList.find((x) => {
  //       return x.ID === props.id;
  //     })
  //   : undefined;

  // useEffect(() => {
  //   if (!basic) addComponentBox(props.id);
  // });

  // const handleDialogClose = () => {
  //   props.handleDialogClose !== undefined
  //     ? props.handleDialogClose()
  //     : closeComponentBox(props.id);
  // };

  // const handleClickOutsideModal = (e) => {
  //   if (props.closeModalOnOutsideClick && e.target.className === styles.modal) {
  //     handleDialogClose();
  //   }
  // };

  // const getModalContentClass = () => {
  //   let modalContentClass =
  //     props.size === "small"
  //       ? [
  //           styles.componentBoxModalContent,
  //           styles.smallModal,
  //           styles.padding,
  //         ].join(" ")
  //       : props.size === "large"
  //       ? [
  //           styles.componentBoxModalContent,
  //           styles.largeModal,
  //           styles.padding,
  //         ].join(" ")
  //       : [
  //           styles.componentBoxModalContent,
  //           styles.mediumModal,
  //           styles.padding,
  //         ].join(" ");

  //   if (props.withoutPadding) {
  //     modalContentClass =
  //       props.size === "small"
  //         ? [styles.componentBoxModalContent, styles.smallModal].join(" ")
  //         : props.size === "large"
  //         ? [styles.componentBoxModalContent, styles.largeModal].join(" ")
  //         : [styles.componentBoxModalContent, styles.mediumModal].join(" ");
  //   }
  //   return modalContentClass;
  // };

  // const renderComponentBox = () => {
  //   let index = basic ? zIndex : componentBox.zIndex;

  //   return (
  //     <div
  //       className={styles.modal}
  //       onClick={handleClickOutsideModal}
  //       style={{ zIndex: index }}
  //     >
  //       <section className={getModalContentClass()}>
  //         <div className={styles.titleLine}>
  //           <div className={styles.table}>
  //             <div className={styles.tableCell}>
  //               {props.dontShowTitle ? "" : props.title}
  //             </div>
  //           </div>
  //           <div className={styles.closeButton}>
  //             {props.dontShowCloseButton ? (
  //               ""
  //             ) : (
  //               <Button
  //                 disabled={props.disabled}
  //                 icon={"times"}
  //                 iconStyle={"solid"}
  //                 onClick={handleDialogClose}
  //                 // iconCssClass={styles.closeButtonPadding}
  //                 // inputCssClass={styles.closeButtonPadding}
  //               />
  //             )}
  //           </div>
  //         </div>
  //         <div>{props.children}</div>
  //       </section>
  //     </div>
  //   );
  // };

  // if (
  //   (basic === true && open !== undefined && open === true) ||
  //   (componentBox !== undefined && componentBox.Open)
  // )
  //   return renderComponentBox();
  // else return <React.Fragment />;
}

ComponentBox.defaultProps = {
  id: "",
  open: false,
  onClose: () => {},
  className: "",
  header: "",
  zIndex: 1000,
  size: "small",
  color: "primary",
  theme: theme,
  clickOutsideToClose: false,
};

ComponentBox.propTypes = {
  theme: PropTypes.object.isRequired,
  id: PropTypes.string,
  onClose: PropTypes.func,
  className: PropTypes.string,
  header: PropTypes.string,
  zIndex: PropTypes.number,
  open: PropTypes.bool,
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
