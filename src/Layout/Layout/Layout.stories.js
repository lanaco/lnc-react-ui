import React from "react";
import Layout from ".";
import Sidebar from "../Sidebar/index"
import Header from "../Header/index"
import Footer from "../Footer/index"
import Content from "../Content/index"
import { useTheme } from "@emotion/react";

export default {
  title: "Layout/Layout",
  component: Layout,
  subcomponents: { Sidebar, Header, Footer, Content }
};

const Template = (args) => {
  const theme = useTheme();

  return (
    <div>
      <Layout>
        <Header style={{ backgroundColor: theme.palette.primary.main, lineHeight: "64px", textAlign: "center" }}><span>Header</span></Header>
        <Content><div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}><span>Content</span></div></Content>
        <Footer style={{ backgroundColor: theme.palette.primary.main, lineHeight: "64px", textAlign: "center" }}><span>Footer</span></Footer>
      </Layout>
      <br />

      <br />
      <Layout>
        <Header style={{ backgroundColor: theme.palette.primary.main, lineHeight: "64px", textAlign: "center" }}><span>Header</span></Header>
        <Layout>
          <Sidebar style={{backgroundColor: theme.palette.primary.lighter}}></Sidebar>
          <Content><div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}><span>Content</span></div></Content>
        </Layout>
        <Footer style={{ backgroundColor: theme.palette.primary.main, lineHeight: "64px", textAlign: "center" }}><span>Footer</span></Footer>
      </Layout>
      <br />

      <br />
      <Layout>
        <Header style={{ backgroundColor: theme.palette.primary.main, lineHeight: "64px", textAlign: "center" }}><span>Header</span></Header>
        <Layout>
          <Content><div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}><span>Content</span></div></Content>
          <Sidebar style={{backgroundColor: theme.palette.primary.lighter}}></Sidebar>
        </Layout>
        <Footer style={{ backgroundColor: theme.palette.primary.main, lineHeight: "64px", textAlign: "center" }}><span>Footer</span></Footer>
      </Layout>
      <br />

      <br />
      <Layout>
        <Sidebar style={{backgroundColor: theme.palette.primary.lighter}}></Sidebar>
        <Layout>
          <Header style={{ backgroundColor: theme.palette.primary.main, lineHeight: "64px", textAlign: "center" }}><span>Header</span></Header>
          <Content><div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}><span>Content</span></div></Content>
          <Footer style={{ backgroundColor: theme.palette.primary.main, lineHeight: "64px", textAlign: "center" }}><span>Footer</span></Footer>
        </Layout>
      </Layout>
    </div>
  )
};

export const Default = Template.bind({});
