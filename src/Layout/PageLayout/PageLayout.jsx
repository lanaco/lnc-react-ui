/* eslint-disable react/prop-types */
import { forwardRef, Children, isValidElement, cloneElement } from "react";
import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";

const StyledPageLayout = styled.section`
  display: flex;
  flex: auto;
  flex-direction: ${(props) => (props.hasSidebar ? "row" : "column")};
  height: ${(props) => (props.isChild ? "100%" : "100dvh")};

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

const PageLayout = forwardRef((props, ref) => {
  const { children, isChild, ...rest } = props;
  const theme = useTheme();

  const hasSidebar = Children.toArray(children).some(
    (component) =>
      component.props.__TYPE__ || component?.type?.displayName == "Sidebar",
  );
  const getSidebarPlacement = (children) => {
    let layoutIndex, sidebarIndex, contentIndex;

    // We shift indexes by 1 just to avoid having 0 index, so its easier when making comparison for return statement.
    Children.forEach(children, (component, index) => {
      if (
        component.props.__TYPE__ == "Sidebar" ||
        component?.type?.displayName === "Sidebar"
      ) {
        if (sidebarIndex)
          throw "Found multiple ocurrences of Sidebar component on the same level in the component tree.";
        sidebarIndex = index + 1;
      } else if (
        component.props.__TYPE__ == "PageLayout" ||
        component?.type?.displayName === "PageLayout"
      ) {
        if (layoutIndex)
          throw "Found multiple ocurrences of PageLayout component on the same level in the component tree.";
        layoutIndex = index + 1;
      } else if (
        component.props.__TYPE__ == "Content" ||
        component?.type?.displayName === "Content"
      ) {
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

  const clonedChildren = Children.map(children, (child) => {
    if (isValidElement(child)) {
      if (
        child.props.__TYPE__ == "Sidebar" ||
        child.type?.displayName === "Sidebar"
      ) {
        return cloneElement(child, {
          placement: getSidebarPlacement(children),
        });
      } else if (
        child.props.__TYPE__ == "PageLayout" ||
        child.type?.displayName === "PageLayout"
      ) {
        return cloneElement(child, { isChild: true });
      }
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

// TODO : type
// PageLayout.defaultProps = {
//   __TYPE__: "PageLayout",
// };

export default PageLayout;

PageLayout.displayName = "PageLayout";
