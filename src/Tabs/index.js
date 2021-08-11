import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import theme from "../_utils/theme";

const Container = styled.div`
  overflow: hidden;
  border: 1px solid #ccc;
  background-color: #f1f1f1;
`;

const Tab = styled.button`
  background-color: inherit;
  float: left;
  border: none;
  outline: none;
  cursor: pointer;
  padding: 14px 16px;
  transition: 0.3s;

  &:hover {
    background-color: #ddd;
  }

  ${(props) => (props.active ? "background-color: #ccc;" : "")}
`;

const ContentPanel = styled.div`
  display: none;
  padding: 6px 12px;
  border: 1px solid #ccc;
  border-top: none;
`;

const Tabs = (props) => {
  const { className, size, color, theme, initialActiveTab, tabs } = props;

  const [active, setActive] = useState(null);

  const themeProps = { theme, size, color };

  useEffect(() => {
    if (initialActiveTab && initialActiveTab.render)
      setActive(initialActiveTab);
  }, []);

  const selectTab = (id) => setActive(id);

  const renderContent = () => {
    var activeTab = tabs.find((tab) => tab.id === active);

    if (activeTab && activeTab.render) {
      return activeTab.render();
    }

    return <></>;
  };

  return (
    <div>
      <Container {...themeProps} className={className}>
        {tabs.map((tab) => (
          <Tab active={active === tab.id} onClick={() => selectTab(tab.id)}>
            {tab.header}
          </Tab>
        ))}
      </Container>

      <ContentPanel>{renderContent()}</ContentPanel>
    </div>
  );
};

Tabs.defaultProps = {
  className: "",
  size: "small",
  color: "primary",
  theme: theme,
};

Tabs.propTypes = {
  theme: PropTypes.object.isRequired,
  className: PropTypes.string,
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
