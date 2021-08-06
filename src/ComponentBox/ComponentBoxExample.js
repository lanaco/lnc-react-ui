import React, { useState } from "react";
import ComponentBox from ".";
import Button from "../Button/index";

const ComponentBoxExample = (props) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <div>
        <Button text={"Open Component Box"} onClick={() => setOpen(true)} />
      </div>

      <ComponentBox
        {...props}
        basic={true}
        open={open}
        closeComponentBox={() => setOpen(false)}
      />
    </div>
  );
};

export default ComponentBoxExample;
