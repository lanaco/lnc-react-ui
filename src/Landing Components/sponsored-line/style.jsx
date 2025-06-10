import styled from "@emotion/styled";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: var(--gray-500);
  font-size:  0.75rem;
  font-weight: 500;

  & i {
    font-size: 1rem;
    color: var(--warning-500, #F59E0B);
  }
`;
