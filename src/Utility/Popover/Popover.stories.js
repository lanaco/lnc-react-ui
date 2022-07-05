import React, { useState } from "react";
import Popover from ".";

export default {
  title: "Utility/Popover",
  component: Popover
};

const Template = (args) => {
  const [anch, setAnch] = useState();
  const [show, setShow] = useState(false);
  const handleClick = (e) => {
    setAnch(e.currentTarget)
    setShow(!show);
  }

  return (
    <div style={{height: "5000px"}}>

        <button onClick={handleClick} >BUTTON</button>
      <Popover anchorElement={anch} show={show}>
        <div>
          Im a little nigga
        </div>
      </Popover>
    </div>)
};

export const Default = Template.bind({});
