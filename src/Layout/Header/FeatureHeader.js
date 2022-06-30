import React from "react";
import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";
import PropTypes from "prop-types";
import Header from ".";
import Icon from "../../General/Icon";

const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  color: white;
  padding: 0 1rem;
`;

const LeftContent = styled.div`
  display: flex;
  align-items: center;
  gap: 0.625rem;
`;

const MiddleContent = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const RightContent = styled.div`
  display: flex;
  align-items: center;
  gap: 0.625rem;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  max-height: 2.8125rem;
  overflow: hidden;
  cursor: pointer;
`;

const AvatarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2.8125rem;
  width: 2.8125rem;
  overflow: hidden;
  cursor: pointer;

  & img {
    width: 2.5rem;
    border-radius: 50%;
    border: 2px solid white;
  }

  &:hover {
    border-radius: 5px;
    box-shadow: 0 0 0 20px rgba(0, 0, 0, 0.2) inset;
  }
`;

const NotificationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  height: 2.8125rem;
  width: 2.8125rem;
  cursor: pointer;

  &:hover {
    border-radius: 5px;
    box-shadow: 0 0 0 20px rgba(0, 0, 0, 0.2) inset;
  }

  & #notification-count {
    background-color: #ff556c;
    position: absolute;
    top: 0;
    left: 32px;
    border-radius: 15%;
    padding: 0 3px;
    font-size: 0.7rem;

    @keyframes pulse {
      0% {
        box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.7);
      }

      70% {
        box-shadow: 0 0 0 5px rgba(255, 255, 255, 0);
      }

      100% {
        box-shadow: 0 0 0 0 rgba(255, 255, 255, 0);
      }
    }

    ${(props) =>
      props.notificationBubble
        ? `width: 0.8rem; 
        height: 0.8rem; 
        border-radius: 50%;
        box-shadow: 0 0 0 0 rgba(255, 255, 255, 1);
        animation: pulse 2s infinite;`
        : ""}
  }
`;

const FeatureHeader = (props) => {
  const {
    showLogoImg,
    logoImg,
    logoTitle,
    onLogoClick,

    showNotificationBadge,
    notificationBubble,
    notificationCount,

    showAvatarImg,
    avatarImg,
    avatarTitle,
    onAvatarClick,

    children,
    ...rest
  } = props;

  const theme = useTheme();

  return (
    <Header {...rest}>
      <Content theme={theme}>
        <LeftContent>
          {showLogoImg && (
            <LogoContainer
              title={logoTitle}
              onClick={(e) => {
                if (onLogoClick) onLogoClick(e);
              }}
            >
              {logoImg}
            </LogoContainer>
          )}
        </LeftContent>
        <MiddleContent>{children}</MiddleContent>
        <RightContent>
          {showNotificationBadge && (
            <NotificationContainer notificationBubble={notificationBubble}>
              <Icon icon="bell" size="large" style={{ color: "white" }} />
              {notificationCount > 0 && (
                <span id="notification-count">
                  {notificationBubble ? "" : notificationCount}
                </span>
              )}
            </NotificationContainer>
          )}

          {showAvatarImg && (
            <AvatarContainer
              title={avatarTitle}
              onClick={(e) => {
                if (onAvatarClick) onAvatarClick(e);
              }}
            >
              {avatarImg}
            </AvatarContainer>
          )}
        </RightContent>
      </Content>
    </Header>
  );
};

FeatureHeader.propTypes = {
  showLogoImg: PropTypes.bool,
  logoImg: PropTypes.element,
  logoTitle: PropTypes.string,
  onLogoClick: PropTypes.func,

  showNotificationBadge: PropTypes.bool,
  notificationBubble: PropTypes.bool,
  notificationCount: PropTypes.number,

  showAvatarImg: PropTypes.bool,
  avatarImg: PropTypes.element,
  avatarTitle: PropTypes.string,
  onAvatarClick: PropTypes.func,
};

FeatureHeader.defaultProps = {
  showLogoImg: true,
  showAvatarImg: true,
  showNotificationBadge: true,
  notificationBubble: false,
  notificationCount: 10,
};

export default FeatureHeader;
