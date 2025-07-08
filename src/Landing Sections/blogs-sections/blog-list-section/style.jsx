import styled from "@emotion/styled";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.5rem;

  &.separated {
    & > div {
      position: relative;
    }

    & > div:not(:last-of-type)::after {
      content: "";
      display: block;
      height: 1px;
      width: 100%;
      background: var(--gray-200, #dddfe4);
      position: absolute;
      left: 0;
      bottom: -0.75rem;
    }
  }
`;
