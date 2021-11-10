import React, { useState } from "react";
import ConfirmationForm from "./index";
import Button from "../Button/index";

const ComponentBoxExample = (props) => {
  const [open, setOpen] = useState(true);

  return (
    <div>
      <div>
        <Button text={"Open Confirmation Form"} onClick={() => setOpen(true)} />
      </div>

      <ConfirmationForm {...props} open={open} onClose={() => setOpen(false)} />
    </div>
  );
};

export default ComponentBoxExample;
