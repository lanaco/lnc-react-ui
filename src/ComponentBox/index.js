import React, { useEffect } from "react";
import styles from "./styles.module.css";
import IconButton from "../IconButton/index.js";

function ComponentBox(props) {
  const { basic = false, open, zIndex = 10000 } = props;

  let componentBox = !basic
    ? props.componentBoxList.find((x) => {
        return x.ID === props.id;
      })
    : undefined;

  useEffect(() => {
    if (!basic) props.addComponentBox(props.id);
  });

  const handleDialogClose = () => {
    props.handleDialogClose !== undefined
      ? props.handleDialogClose()
      : props.closeComponentBox(props.id);
  };

  const handleClickOutsideModal = (e) => {
    if (props.closeModalOnOutsideClick && e.target.className === styles.modal) {
      handleDialogClose();
    }
  };

  const getModalContentClass = () => {
    let modalContentClass =
      props.size === "small"
        ? [
            styles.componentBoxModalContent,
            styles.smallModal,
            styles.padding,
          ].join(" ")
        : props.size === "large"
        ? [
            styles.componentBoxModalContent,
            styles.largeModal,
            styles.padding,
          ].join(" ")
        : [
            styles.componentBoxModalContent,
            styles.mediumModal,
            styles.padding,
          ].join(" ");

    if (props.withoutPadding) {
      modalContentClass =
        props.size === "small"
          ? [styles.componentBoxModalContent, styles.smallModal].join(" ")
          : props.size === "large"
          ? [styles.componentBoxModalContent, styles.largeModal].join(" ")
          : [styles.componentBoxModalContent, styles.mediumModal].join(" ");
    }
    return modalContentClass;
  };

  const renderComponentBox = () => {
    let index = basic ? zIndex : componentBox.zIndex;

    return (
      <div
        className={styles.modal}
        onClick={handleClickOutsideModal}
        style={{ zIndex: index }}
      >
        <section className={getModalContentClass()}>
          <div className={styles.titleLine}>
            <div className={styles.table}>
              <div className={styles.tableCell}>
                {props.dontShowTitle ? "" : props.title}
              </div>
            </div>
            <div className={styles.closeButton}>
              {props.dontShowCloseButton ? (
                ""
              ) : (
                <IconButton
                  disabled={props.disabled}
                  ignorePermission={true}
                  iconClassName={props.closeIconClassName}
                  onClick={handleDialogClose}
                />
              )}
            </div>
          </div>
          <div>{props.children}</div>
        </section>
      </div>
    );
  };

  if (
    (basic === true && open !== undefined && open === true) ||
    (componentBox !== undefined && componentBox.Open)
  )
    return renderComponentBox();
  else return <React.Fragment />;
}

export default ComponentBox;
