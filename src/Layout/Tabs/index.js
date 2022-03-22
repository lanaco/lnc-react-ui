import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import theme from "../../_utils/theme";

const paddingBySize = (size) => {
  if (size === "small") {
    return "padding: 0.3875rem 0.75rem;";
  }

  if (size === "medium") {
    return "padding: 0.45rem 0.75rem;";
  }

  if (size === "large") {
    return "padding: 0.5125rem 0.75rem;";
  }
};

const heightBySize = (size, hasText) => {
  if (size === "small") return `max-height: 1.625rem; min-height: 1.625rem;`;
  if (size === "medium") return `max-height: 2rem; min-height: 2rem;`;
  if (size === "large") return `max-height: 2.375rem; min-height: 2.375rem;`;
};

const Container = styled.div`
  overflow: hidden;
  background-color: #f1f1f1;
  border-radius: 0.1875rem 0.1875rem 0 0;
  background-color: ${(props) => props.theme.palette[props.color].main};
`;

const Tab = styled.button`
  ${(props) => heightBySize(props.size)}
  background-color: inherit;
  float: left;
  border: none;
  outline: none;
  cursor: pointer;
  ${(props) => paddingBySize(props.size)}
  transition: 0.25s;
  font-family: ${(props) => props.theme.typography.fontFamily};
  font-size: ${(props) => props.theme.typography[props.size].fontSize};
  color: ${(props) => props.theme.palette[props.color].text};

  &:hover {
    background-color: ${(props) => props.theme.palette[props.color].light};
  }

  background-color: ${(props) =>
    props.active ? props.theme.palette[props.color].light : "inherit"};
`;

const ContentPanel = styled.div`
  padding: 0.375rem;
  border: 0.09375rem solid ${(props) => props.theme.palette[props.color].main};
  border-top: none;
  border-radius: 0 0 0.1875rem 0.1875rem;
`;

const Content = styled.div`
  ${(props) => (props.active ? "display: block;" : "display: none;")}
`;

const Footer = styled.div`
  padding: 0.375rem 0 0 0;
  border-top: 0.09375rem solid #dee1e680;
`;

const Tabs = (props) => {
  const {
    className,
    size,
    color,
    theme,
    initialActiveTab,
    tabs,
    footer,
  } = props;

  const [active, setActive] = useState(null);

  const themeProps = { theme, size, color };

  useEffect(() => {
    if (initialActiveTab && initialActiveTab.render)
      setActive(initialActiveTab.id);
  }, []);

  const selectTab = (id) => setActive(id);

  const renderContent = () => {
    return tabs.map((tab) => {
      return (
        <Content key={tab.id} {...themeProps} active={tab.id === active}>
          {tab.render()}
        </Content>
      );
    });
  };

  return (
    <div>
      <Container {...themeProps} className={className}>
        {tabs.map((tab) => (
          <Tab
            key={tab.id}
            {...themeProps}
            active={active === tab.id}
            onClick={() => selectTab(tab.id)}
          >
            {tab.header}
          </Tab>
        ))}
      </Container>

      <ContentPanel {...themeProps}>
        {renderContent()}

        {footer ? <Footer>{footer()}</Footer> : <></>}
      </ContentPanel>
    </div>
  );
};

Tabs.defaultProps = {
  className: "",
  size: "small",
  color: "primary",
  theme: theme,
  initialActiveTab: null,
  tabs: [],
  footer: null,
};

Tabs.propTypes = {
  theme: PropTypes.object.isRequired,
  className: PropTypes.string,
  footer: PropTypes.func,
  size: PropTypes.oneOf(["small", "medium", "large"]),
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "success",
    "error",
    "warning",
    "gray",
  ]),
};

export default Tabs;
