import React, { useState } from "react";
import Modal from ".";
import Button from "../../General/Button/index";

const ComponentBoxExample = (props) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <div>
        <Button text={"Open Modal"} onClick={() => setOpen(true)} />
      </div>

      <Modal {...props} open={open} onClose={() => setOpen(false)}>
        <div>
          <div>Content</div>
          <div>Content</div>
          <div>Content</div>
          <div>Content</div>
        </div>
      </Modal>
    </div>
  );
};

export default ComponentBoxExample;
