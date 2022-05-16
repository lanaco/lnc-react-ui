import React, { useState } from "react";
import DateInput from "./index";

const Story = (props) => {
  const [value, setValue] = useState("");

  const onChange = (event, dateValue) => {
    console.log("change", dateValue);
    setValue(dateValue);
  };

  return (
    <div style={{ width: "140px" }}>
      <DateInput {...props} value={value} onChange={onChange} />
    </div>
  );
};

export default Story;
