import React, { useState } from "react";
import DateInput from "./index";

const Story = (props) => {
  const [value, setValue] = useState("03.03.2013.");

  const onChange = (id, val) => {
    // console.log("VALUE: ", val);
    setValue(val);
  };

  return <DateInput {...props} value={value} onChange={onChange} />;
};

export default Story;
