import React, { useState } from "react";
import PeriodSelector from "./index";

const Story = (props) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  return (
    <div style={{ width: "340px" }}>
      <PeriodSelector
        {...props}
        startDate={startDate}
        endDate={endDate}
        onStartDateChange={(e, date) => setStartDate(date)}
        onEndDateChange={(e, date) => setEndDate(date)}
      />
    </div>
  );
};

export default Story;
