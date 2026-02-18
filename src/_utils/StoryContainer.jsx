/* eslint-disable react/prop-types */
import styled from "@emotion/styled";

const Container = styled.div`
  width: 240px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const StoryContainer = ({ children }) => {
  return <Container>{children}</Container>;
};

export default StoryContainer;
