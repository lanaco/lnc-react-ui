/* eslint-disable react/prop-types */
import { useTheme } from "@emotion/react";
import Badge from "../../../Data display/Badge/Badge";
import PropTypes from "prop-types";
import { StyledProfileItem } from "./style";
import { isDefined } from "../../../_utils/utils";

const ProfileItem = (props) => {
  const {
    uuid,
    hasPermission = true,
    isUser,
    image,
    imageComponent,
    name,
    notifications = 0,
    color = "primary",
    size = "large",
    style,
    disabled,
    onClick = () => {},
    isActive,
    className,
    shopCategory,
    // new
    themeData,
  } = props;

  const theme = useTheme();

  //   const { data: themeData } = useShopTheme(isUser !== true ? uuid : null);

  const themeProps = {
    theme,
    color,
    size,
    style,
    disabled,
  };

  return (
    <StyledProfileItem
      onClick={(e) => {
        e.stopPropagation();

        if (hasPermission === true) onClick?.();
      }}
      {...themeProps}
      key={name}
      // animate={{
      //   y: 0,
      //   opacity: 1,
      // }}
      className={`profile-item ${className}`}
      // exit={{
      //   opacity: 0,
      // }}
      hasPermission={hasPermission}
      // initial={{
      //   y: -10,
      //   opacity: 0,
      // }}
      isActive={isActive}
      themeColor={themeData?.code || "transparent"}
    >
      <div className="logo-wrapper">
        {isDefined(imageComponent) ? imageComponent : image}
      </div>
      <div>
        <div className="name">{name}</div>
        {!isUser && <div className="description">{shopCategory}</div>}
        {notifications > 0 && (
          <div className="notifications-number">
            <Badge className="badge" color="danger" size="small">
              {notifications > 99 ? "99+" : notifications}
            </Badge>
          </div>
        )}
      </div>
    </StyledProfileItem>
  );
};

ProfileItem.propTypes = {
  id: PropTypes.any,
  isUserProfile: PropTypes.bool,
  themeColor: PropTypes.string,
  image: PropTypes.any,
  name: PropTypes.string,
  notifications: PropTypes.number,
  style: PropTypes.object,
  className: PropTypes.string,

  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "success",
    "warning",
    "danger",
    "information",
    "neutral",
  ]),

  size: PropTypes.oneOf(["large"]),
  onSelect: PropTypes.func,
  hasPermission: PropTypes.bool,
};

export default ProfileItem;
