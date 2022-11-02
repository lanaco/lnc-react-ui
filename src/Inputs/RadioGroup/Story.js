import React, { useState } from "react";
import RadioGroup from "./index";

const Story = (props) => {
  const [value, setValue] = useState(null);

  const onChange = (e, value) => {
    setValue(value);
  };

  return (
    <div style={{ width: "220px" }}>
      <RadioGroup {...props} value={value} onChange={onChange} />
    </div>
  );
};

export default Story;
