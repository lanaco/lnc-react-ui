import React, { useState } from "react";
import DatePicker from "./index";

const Story = (props) => {
  const [value, setValue] = useState("10.05.2022");

  const onChange = (event, dateValue) => {
    setValue(dateValue);
  };

  return (
    <div style={{ width: "140px" }}>
      <DatePicker {...props} value={value} onChange={onChange} />
    </div>
  );
};

export default Story;
