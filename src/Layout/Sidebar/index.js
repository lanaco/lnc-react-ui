import React, { useState } from 'react'
import PropTypes from "prop-types";
import styled from '@emotion/styled';
import Icon from '../../General/Icon'
import { useScreenSize } from '../../_utils/utils';
import { useTheme } from '@emotion/react';


const SidebarContainer = styled.aside`
  direction: ${props => props.placement == 'right' ? 'rtl' : 'ltr'};
  position: relative;
  && {
    flex: ${props => props.sidebarCollapsed ? '0 0 0' : `0 0 ${props.size}`};
  }
  transition: flex 0.6s ease-in-out;
}
`;

const StyledSidebar = styled.div`
  overflow: hidden;
  width: ${props => props.sidebarCollapsed ? "0" : props.size};
  transition: width 0.6s ease-in-out ${props => props.sidebarCollapsed ? "0s" : "0.2s"};
`;

const ToggleSidebarButton = styled.div`
  width: 2rem;
  height: 2rem;
  background-color: ${props => props.theme.palette.primary.dark};
  opacity: 0.7;
  border-radius: ${props => props.placement == "left" ? "0 5px 5px 0" : "5px 0 0 5px"};
  position: absolute;
  top: 5px;
  right: ${props => props.placement == "left" ? "-2rem" : "100%"};
  cursor: pointer;

  &:hover {
    opacity: 1;
  }

  span {
    transform: ${props => props.sidebarCollapsed ? 'rotate(180deg)' : 'rotate(0)'};
    transition: transform 0.6s ease-in-out;
  }
`;


const Sidebar = (props) => {
  const { placement, collapsed, hideCollapseButton, size, children, className, __TYPE__, ...rest } = props;
  const theme = useTheme();
  const screenSize = useScreenSize();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(collapsed != undefined ? collapsed : (screenSize == "XS" || screenSize == "S" ? true : false));

  return (
    <SidebarContainer className={"lnc-sidebar-container " + className ?? ''} sidebarCollapsed={sidebarCollapsed} placement={placement} size={size} theme={theme} {...rest}>

      {!hideCollapseButton &&
        <ToggleSidebarButton onClick={(e) => setSidebarCollapsed(!sidebarCollapsed)} placement={placement} sidebarCollapsed={sidebarCollapsed} theme={theme}>
          <span><Icon icon={placement == "right" ? "angle-right" : "angle-left"} size="medium" color="white" /></span>
        </ToggleSidebarButton>
      }

      <StyledSidebar className="lnc-sidebar-content" sidebarCollapsed={sidebarCollapsed} size={size}>
        {children}
      </StyledSidebar>

    </SidebarContainer>
  )
}

Sidebar.defaultProps = {
  collapsed: undefined,
  hideCollapseButton: false,
  size: "15rem",
  __TYPE__: "Sidebar"
};

Sidebar.propTypes = {
  collapsed: PropTypes.bool,
  hideCollapseButton: PropTypes.bool,
  size: PropTypes.string,
  __TYPE__: PropTypes.string
};

export default Sidebar