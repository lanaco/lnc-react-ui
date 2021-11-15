import React from "react";

const Inner = (props) => {
  //
  const handleTest = () => {};

  return (
    <div
      style={{
        backgroundColor: "white",
        margin: "auto",
        width: "180px",
        height: "180px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div></div>
      <div>
        <button onClick={handleTest}>TEST</button>
      </div>
    </div>
  );
};

const Test = (props) => {
  //
  const handleClick = () => {};

  return (
    <div
      style={{
        width: "200px",
        height: "200px",
        padding: "10px",
        backgroundColor: "gray",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Inner onClick={handleClick} />
    </div>
  );
};

export default Test;
