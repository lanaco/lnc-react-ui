import React, { useState } from "react";
import LabelSwitch from "./index";

const Story = (props) => {
  const [value, setValue] = useState(null);

  const onChange = (e, value) => {
    setValue(value);
  };

  return (
    <div style={{ width: "220px" }}>
      <LabelSwitch {...props} value={value} onChange={onChange} />
    </div>
  );
};

export default Story;
