import React, { useEffect, useImperativeHandle, useState } from "react";
import Button from "../../General/Button/index.js";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";
import Icon from "../../General/Icon";
import { getColorRgbaValue } from "../../_utils/utils.js";
import Modal from "../Modal/index.js";

const Content = styled.div`
  ${(props) => (props.type == "regular" && (props.status || props.statusIcon)) && "padding-left: 3.813rem"};
  ${props => props.type == "centered" && "flex-direction: column; gap: 0.5rem; display: flex;"}
`;

const StyledTitle = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  ${props => props.type == "centered" && "flex-direction: column; gap: 1.25rem;"}
  & .alert-icon {
    font-size: 2.25rem;
    color: ${(props) =>
    getColorRgbaValue(props.theme, "ConfirmationForm", props.status, "enabled", "icon")};
  }
  ${props => props.type == "centered" && "padding-top: 0.5rem;"}
`;

const StyledActions = styled.div`
   display: flex;
   flex-direction: ${props => props.type == "regular" ? "row" : "column"};
   width: 100%;
   flex: 1;
   gap: 0.5rem;
   justify-content: ${props => getActionsAlignment(props.actionsAlignment)};
   ${props => props.type == "regular" && (props.actionsTrack == false ? 'height: 5rem' : 'height: 4rem')};
   ${props => props.type == "regular" && "border-radius: 0 0 16px 16px; padding: 0.75rem 1.5rem 0.75rem 1.5rem;"}
   ${props => props.type == "regular" && props.actionsTrack == false && "padding: 0 1.5rem 1.5rem 1.5rem;"}
   ${props => props.type == "regular" && props.actionsTrack == true && `background-color: ${getColorRgbaValue(props.theme, "ConfirmationForm", "primary", "enabled", "trackBg")};`}
   ${props => props.type == "regular" && props.actionsTrack == false && "padding-top: 1rem;"}
   ${props => props.type == "centered" && "padding: 1rem 0 0.5rem 0;"}
`;

const getActionsAlignment = (actionsAlignment) => {
  if(actionsAlignment == "right") return "end";
  if(actionsAlignment == "left") return "start";

  return "center";
}

const ConfirmationForm = React.forwardRef((props, ref) => {
  const {
    status,
    statusIcon,
    title,
    type,
    actions,
    actionsAlignment,
    actionsTrack,
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
  const theme = useTheme();
  let themeProps = { theme, size, zIndex, className, style };

  const getIcon = (status) => {
    if (status == "danger") return "times-circle";
    if (status == "warning") return "exclamation-triangle";
    if (status == "success") return "check-circle";

    return "exclamation-circle";
  };

  const Title = ({ statusIcon, status, title, type, themeProps }) => {
    return (
      <StyledTitle {...themeProps} status={status} type={type}>
        {(statusIcon || status) && (
          <Icon
            className={"alert-icon"}
            icon={statusIcon ? statusIcon : getIcon(status)}
          />
        )}
        <h3>{title}</h3>
      </StyledTitle>
    );
  };

  const Actions = ({ actions, type, actionsAlignment, actionsTrack, themeProps }) => {
    return (
      <StyledActions type={type} actionsAlignment={actionsAlignment} actionsTrack={actionsTrack} {...themeProps}>
        {actions}
      </StyledActions>)
  }
  return (
    <Modal
      ref={ref}
      {...themeProps}
      header={(type == "regular" ? <Title statusIcon={statusIcon} status={status} title={title} type={type} themeProps={themeProps} /> : null)}
      footer={(type == "regular" ? <Actions actions={actions} type={type} actionsAlignment={actionsAlignment} actionsTrack={actionsTrack} themeProps={themeProps}/> : null)}
      overlay={overlay}
      showCloseButton={showCloseButton}
      onClose={onClose}
      clickOutsideToClose={clickOutsideToClose}
      overlayProps={overlayProps}
      {...rest}
    >
      <Content statusIcon={statusIcon} status={status} type={type}>
        {type == "centered" && <Title statusIcon={statusIcon} status={status} title={title} type={type} themeProps={themeProps} />}
        <div>
          {children}
        </div>
        {type == "centered" && actions && <Actions actions={actions} type={type} actionsAlignment={actionsAlignment} actionsTrack={actionsTrack} themeProps={themeProps}/>}
      </Content>
    </Modal>
  );
});

ConfirmationForm.defaultProps = {
  type: "regular",
  actionsAlignment: "left",
  actionsTrack: false,
  showCloseButton: true,
  overlay: true,
  onClose: () => { },
  className: "",
  zIndex: 1000,
  size: "fluid",
  clickOutsideToClose: false,
};

ConfirmationForm.propTypes = {
  status: PropTypes.oneOf(["success", "danger", "warning", "information"]),
  /**
   * Custom status icon
   */
  statusIcon: PropTypes.string,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  type: PropTypes.oneOf(["regular", "centered"]),
  actions: PropTypes.element,
  /**
   * Aligmnent of actions when `type="regular"`
   */
  actionsAlignment: PropTypes.oneOf(["right", "center", "left"]),
  /**
   * Defines whether actions will be inside a track
   */
  actionsTrack: PropTypes.bool,
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

export default ConfirmationForm;
