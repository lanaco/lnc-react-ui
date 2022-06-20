import React, { useState } from "react";
import ToggleSwitch from "./index";

const Story = (props) => {
  const [value, setValue] = useState(null);

  const onChange = (e, value) => {
    setValue(value);
  };

  return (
    <div>
      <ToggleSwitch {...props} value={value} onChange={onChange} />
    </div>
  );
};

export default Story;
