import React, { useState } from "react";
import DatePicker from "./index";

const Story = (props) => {
  const [value, setValue] = useState("12.12.2012.");

  const onChange = (event, dateValue) => {
    setValue(dateValue);
  };

  return <DatePicker {...props} value={value} onChange={onChange} />;
};

export default Story;
