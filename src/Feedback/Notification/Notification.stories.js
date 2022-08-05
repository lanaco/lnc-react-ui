import React from "react";
import { NotificationContainer, notification } from ".";
import NotificationMessage from "./NotificationMessage";
import logo from '../../_utils/images/Image.png'


export default {
  title: "Feedback/Notification",
  component: Notification
};

const Template = (args) => {
  const notify = () => notification(<NotificationMessage sideButtons={true} avatar={true} avatarProps={{ image: logo }} title={"TItle"}>Hello hello</NotificationMessage>, {closeButton});
  return <div>
    <button onClick={notify}>Notify!</button>
    <NotificationContainer sideButtons={true} />
  </div>
};

export const Default = Template.bind({});
