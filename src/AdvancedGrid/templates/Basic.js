import React, { useState, useEffect, createRef } from "react";
import AdvancedGrid from "../index";
import service from "../services/service";
import styled from "@emotion/styled";

const Basic = () => {
  var ref1 = createRef();
  var ref2 = createRef();

  return (
    <>
      <div>
        <AdvancedGrid ref={ref1} />
      </div>
      {/* <div>
        <AdvancedGrid ref={ref2} />
      </div> */}
    </>
  );
};

export default Basic;
