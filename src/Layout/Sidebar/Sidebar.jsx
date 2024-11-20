import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import Icon from "../../General/Icon/Icon";
import { useScreenSize } from "../../_utils/utils";
import { useTheme } from "@emotion/react";

const SidebarContainer = styled.aside`
  direction: ${(props) => (props.placement == "right" ? "rtl" : "ltr")};
  position: relative;
  && {
    flex: ${(props) =>
      props.sidebarCollapsed ? "0 0 0" : `0 0 ${props.size}`};
  }
  transition: flex 0.6s ease-in-out;
}
`;

const StyledSidebar = styled.div`
  overflow: hidden;
  width: ${(props) => (props.sidebarCollapsed ? "0" : props.size)};
  height: 100%;
  transition: width 0.6s ease-in-out
    ${(props) => (props.sidebarCollapsed ? "0s" : "0.2s")};
`;

const ToggleSidebarButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2rem;
  height: 2rem;
  background-color: ${(props) =>
    props.theme.palette[props.theme.colorContext.neutral][900]};
  opacity: 0.7;
  border-radius: ${(props) =>
    props.placement == "left" ? "0 5px 5px 0" : "5px 0 0 5px"};
  position: absolute;
  top: 5px;
  right: ${(props) => (props.placement == "left" ? "-2rem" : "100%")};
  cursor: pointer;

  &:hover {
    opacity: 1;
  }

  & > span {
    & > .sidebar-icon-lnc {
      transform: ${(props) =>
        props.sidebarCollapsed ? "rotate(180deg)" : "rotate(0)"};
      transition: transform 0.6s ease;
    }
  }
`;

const Sidebar = React.forwardRef((props, ref) => {
  const {
    placement,
    collapsed = undefined,
    hideCollapseButton = false,
    size = "15rem",
    children,
    className,
    __TYPE__ = "Sidebar",
    ...rest
  } = props;

  const theme = useTheme();
  const screenSize = useScreenSize();
  const [sidebarCollapsed, setSidebarCollapsed] = useState();

  useEffect(() => {
    if (collapsed != undefined) setSidebarCollapsed(collapsed);
    else {
      if (screenSize == "XS" || screenSize == "S") setSidebarCollapsed(true);
      else setSidebarCollapsed(false);
    }
  }, [collapsed]);

  return (
    <SidebarContainer
      className={"lnc-sidebar-container " + (className ? className : "")}
      sidebarCollapsed={sidebarCollapsed}
      placement={placement}
      size={size}
      theme={theme}
      ref={ref}
      {...rest}
    >
      {!hideCollapseButton && (
        <ToggleSidebarButton
          onClick={(e) => setSidebarCollapsed(!sidebarCollapsed)}
          placement={placement}
          sidebarCollapsed={sidebarCollapsed}
          theme={theme}
        >
          <span>
            <Icon
              className="sidebar-icon-lnc"
              icon={placement == "right" ? "angle-right" : "angle-left"}
              color="neutral"
            />
          </span>
        </ToggleSidebarButton>
      )}

      <StyledSidebar
        className="lnc-sidebar-content"
        sidebarCollapsed={sidebarCollapsed}
        size={size}
      >
        {children}
      </StyledSidebar>
    </SidebarContainer>
  );
});

// TODO : type
// Sidebar.defaultProps = {
//   collapsed: undefined,
//   hideCollapseButton: false,
//   size: "15rem",
//   __TYPE__: "Sidebar",
// };

Sidebar.propTypes = {
  /**
   * Indicates if the sidebar is collapsed.
   */
  collapsed: PropTypes.bool,
  /**
   * Hides the collapse button.
   * Useful if you want control the sidebar with your own button via `collapsed` prop.
   */
  hideCollapseButton: PropTypes.bool,
  /**
   * Controls the sidebar width.
   */
  size: PropTypes.string,
  /**
   * Do not override this property.
   * Should only be used as indicator for type if you are passing custom component.
   */
  __TYPE__: PropTypes.string,
};

export default Sidebar;

Sidebar.displayName = "Sidebar";
