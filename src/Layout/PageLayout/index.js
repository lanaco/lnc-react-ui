import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";

const StyledPageLayout = styled.section`
  display: flex;
  flex: auto;
  flex-direction: ${(props) => (props.hasSidebar ? "row" : "column")};
  height: ${(props) => (props.isChild ? "100%" : "100vh")};

  * {
    box-sizing: border-box;
  }

  & header,
  footer {
    flex: 0 0 auto;
    min-height: 4rem;
  }

  & main {
    flex: auto;
    overflow: hidden;
  }

  & aside {
    flex: 0 0 15rem;
    height: 100%;
  }
`;

const PageLayout = React.forwardRef((props, ref) => {
  const { children, isChild, __TYPE__, ...rest } = props;
  const theme = useTheme();

  const hasSidebar = React.Children.toArray(children).some(
    (component) => component.props.__TYPE__ == "Sidebar"
  );
  const getSidebarPlacement = (children) => {
    let layoutIndex, sidebarIndex, contentIndex;

    // We shift indexes by 1 just to avoid having 0 index, so its easier when making comparison for return statement.
    React.Children.forEach(children, (component, index) => {
      if (component.props.__TYPE__ == "Sidebar") {
        if (sidebarIndex)
          throw "Found multiple ocurrences of Sidebar component on the same level in the component tree.";
        sidebarIndex = index + 1;
      } else if (component.props.__TYPE__ == "PageLayout") {
        if (layoutIndex)
          throw "Found multiple ocurrences of PageLayout component on the same level in the component tree.";
        layoutIndex = index + 1;
      } else if (component.props.__TYPE__ == "Content") {
        if (contentIndex)
          throw "Found multiple ocurrences of Content component on the same level in the component tree.";
        contentIndex = index + 1;
      }
    });

    if (layoutIndex && sidebarIndex)
      return sidebarIndex < layoutIndex ? "left" : "right";
    else if (contentIndex && sidebarIndex)
      return sidebarIndex < contentIndex ? "left" : "right";
  };

  const clonedChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      if (child.props.__TYPE__ == "Sidebar")
        return React.cloneElement(child, {
          placement: getSidebarPlacement(children),
        });
      else if (child.props.__TYPE__ == "PageLayout")
        return React.cloneElement(child, { isChild: true });
    }

    return child;
  });

  return (
    <StyledPageLayout
      isChild={isChild}
      hasSidebar={hasSidebar}
      theme={theme}
      ref={ref}
      {...rest}
    >
      {clonedChildren}
    </StyledPageLayout>
  );
});

PageLayout.defaultProps = {
  __TYPE__: "PageLayout",
};

PageLayout.propTypes = {
  /**
   * Do not override this property.
   * Should only be used as indicator for type if you are passing custom component.
   */
  __TYPE__: PropTypes.string,
};

export default PageLayout;
