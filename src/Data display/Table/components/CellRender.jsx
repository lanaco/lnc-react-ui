/* eslint-disable react/prop-types */
import styled from "@emotion/styled";

const Text = styled.span`
  font-weight: 600;
  color: salmon;
  padding: 4px;
  background-color: lightgray;
  border-radius: 5px;
  border: 1px solid transparent;
  transition: all 0.28s ease;

  &:hover {
    font-weight: bold;
    color: red;
    border: 1px solid gray;
  }
`;

const CellRender = (props) => {
  return (
    <Text
      onClick={(e) => {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        alert("CellRender click");
      }}
    >
      {props.name}
    </Text>
  );
};

export default CellRender;
