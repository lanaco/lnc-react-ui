import styled from "@emotion/styled";

export const Container = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  max-height: ${(p) => p?.maxHeight};
  border-radius: 1.25rem;

  &:hover {
    cursor: pointer;
  }

  & img {
    width: 100%;
    height: 100%;
    border-radius: 1.25rem;
    object-fit: cover;
  }
`;
