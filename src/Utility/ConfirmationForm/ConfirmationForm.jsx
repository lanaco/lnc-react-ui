/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { forwardRef, cloneElement } from "react";
import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";
import Icon from "../../General/Icon/Icon";
import { getColorRgbaValue } from "../../_utils/utils";
import Modal from "../Modal/Modal";

const StyledTitle = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  ${(props) =>
    props.type == "centered" && "flex-direction: column; gap: 1.25rem;"}
  & .alert-icon {
    font-size: 2.2rem;
    color: ${(props) =>
      getColorRgbaValue(
        props.theme,
        "ConfirmationForm",
        props.color,
        "enabled",
        "icon",
      )};
  }
  ${(props) => props.type == "centered" && "padding-top: 0.5rem;"}
`;

const StyledActions = styled.div`
  display: flex;
  flex-direction: ${(props) => (props.type == "regular" ? "row" : "column")};
  width: 100%;
  flex: 1;
  gap: 0.5rem;
  justify-content: ${(props) => getActionsAlignment(props.actionsAlignment)};
  ${(props) =>
    props.type == "regular" &&
    "height: 4rem; border-radius: 0 0 16px 16px; padding: 0.75rem 1.5rem 0.75rem 1.5rem;"}
  ${(props) =>
    props.type == "regular" &&
    props.actionsTrack == false &&
    "padding: 0 1.5rem 1.5rem 1.5rem;"}
   ${(props) =>
    props.type == "regular" &&
    props.actionsTrack == true &&
    `background-color: ${getColorRgbaValue(
      props.theme,
      "ConfirmationForm",
      "primary",
      "enabled",
      "trackBg",
    )};`}
   ${(props) => props.type == "centered" && "padding: 1rem 0 0.5rem 0;"}
`;

const getActionsAlignment = (actionsAlignment) => {
  if (actionsAlignment == "right") return "end";
  if (actionsAlignment == "left") return "start";

  return "center";
};

const ConfirmationForm = forwardRef((props, ref) => {
  const {
    color,
    statusIcon = true,
    title,
    type = "regular",
    actions,
    actionsAlignment = "right",
    actionsTrack = false,
    overlay = true,
    showCloseButton = true,
    onClose = () => {},
    zIndex = 1000,
    size = "fluid",
    clickOutsideToClose = false,
    className = "",
    style = {},
    overlayProps,
    rest,
  } = props;
  const theme = useTheme();
  let themeProps = {
    theme,
    size,
    zIndex,
    className: "lnc-ui-confirmation-form " + className,
    style,
  };

  const getIcon = (color) => {
    if (color == "danger") return "times-circle";
    if (color == "warning") return "exclamation-triangle";
    if (color == "success") return "check-circle";

    return "exclamation-circle";
  };

  const IconComponent = ({ statusIcon, color }) => {
    if (typeof statusIcon == "boolean" && statusIcon == true) {
      return <Icon className={"alert-icon"} icon={getIcon(color)} />;
    }
    if (typeof statusIcon == "string" && statusIcon !== "") {
      return <Icon className={"alert-icon"} icon={statusIcon} />;
    }
    return cloneElement(statusIcon, {
      className: "alert-icon " + statusIcon?.className,
    });
  };

  const Title = ({ statusIcon, color, title, type, themeProps }) => {
    return (
      <StyledTitle {...themeProps} color={color} type={type}>
        <IconComponent statusIcon={statusIcon} color={color} />
        <h3>{title}</h3>
      </StyledTitle>
    );
  };

  const Actions = ({
    actions,
    type,
    actionsAlignment,
    actionsTrack,
    themeProps,
  }) => {
    return (
      <StyledActions
        type={type}
        actionsAlignment={actionsAlignment}
        actionsTrack={actionsTrack}
        {...themeProps}
      >
        {actions}
      </StyledActions>
    );
  };
  return (
    <Modal
      ref={ref}
      {...themeProps}
      header={
        type == "regular" ? (
          <Title
            statusIcon={statusIcon}
            color={color}
            title={title}
            type={type}
            themeProps={themeProps}
          />
        ) : null
      }
      footer={
        type == "regular" ? (
          <Actions
            actions={actions}
            type={type}
            actionsAlignment={actionsAlignment}
            actionsTrack={actionsTrack}
            themeProps={themeProps}
          />
        ) : null
      }
      overlay={overlay}
      showCloseButton={showCloseButton}
      onClose={onClose}
      clickOutsideToClose={clickOutsideToClose}
      overlayProps={overlayProps}
      {...rest}
    >
      <div>okej</div>
      {/* <Content statusIcon={statusIcon} color={color} type={type}>
        {type == "centered" && (
          <Title
            statusIcon={statusIcon}
            color={color}
            title={title}
            type={type}
            themeProps={themeProps}
          />
        )}
        <div>{children}</div>
        {type == "centered" && actions && (
          <Actions
            actions={actions}
            type={type}
            actionsAlignment={actionsAlignment}
            actionsTrack={actionsTrack}
            themeProps={themeProps}
          />
        )}
      </Content> */}
    </Modal>
  );
});

// ConfirmationForm.defaultProps = {
//   statusIcon: true,
//   type: "regular",
//   actionsAlignment: "left",
//   actionsTrack: false,
//   showCloseButton: true,
//   overlay: true,
//   onClose: () => {},
//   className: "",
//   zIndex: 1000,
//   size: "fluid",
//   clickOutsideToClose: false,
// };

export default ConfirmationForm;
