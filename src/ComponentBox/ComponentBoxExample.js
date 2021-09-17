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

      <ComponentBox {...props} open={open} onClose={() => setOpen(false)}>
        <div>
          <div>Content</div>
          <div>Content</div>
          <div>Content</div>
          <div>Content</div>
        </div>
      </ComponentBox>
    </div>
  );
};

export default ComponentBoxExample;
