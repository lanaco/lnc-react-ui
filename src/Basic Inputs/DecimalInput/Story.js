import React, { useState } from "react";
import DecimalInput from ".";

const Story = (props) => {
  const [value, setValue] = useState(0);

  return (
    <>
      <DecimalInput
        {...props}
        value={value}
        onChange={(e, val) => {
          setValue(val);
        }}
      />
    </>
  );
};

export default Story;
