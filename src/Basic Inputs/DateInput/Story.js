import React, { useState } from "react";
import DateInput from "./index";

const Story = (props) => {
  const [value, setValue] = useState("2022-05-24");

  const onChange = (event, isoDateValue) => {
    setValue(isoDateValue);
  };

  return (
    <div style={{ width: "180px" }}>
      <DateInput {...props} value={value} onChange={onChange} />
    </div>
  );
};

export default Story;
