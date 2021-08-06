import React, { useState } from "react";
import ConfitmationBox from ".";
import Button from "../Button/index";

const ConfirmationBoxExample = (props) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <div>
        <Button text={"Open Confirmation Box"} onClick={() => setOpen(true)} />
      </div>

      {open ? <ConfitmationBox {...props} /> : <></>}
    </div>
  );
};

export default ConfirmationBoxExample;
