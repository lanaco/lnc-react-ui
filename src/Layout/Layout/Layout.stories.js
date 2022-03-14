import React from "react";
import Layout from ".";
import Sidebar from "../Sidebar/index"
import Header from "../Header/index"
import Footer from "../Footer/index"
import Content from "../Content/index"

export default {
  title: "Layout/Layout",
  component: Layout,
  subcomponents: { Sidebar, Header, Footer, Content }
};

const Template = (args) => (
  <Layout />
);

export const Default = Template.bind({});
