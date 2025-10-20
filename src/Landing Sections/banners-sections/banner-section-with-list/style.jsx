import styled from "@emotion/styled";
import { MOBILE_SIZE_PX } from "../../../_utils/consts";

export const Container = styled.div`
  padding-bottom: 1.38rem;
  text-align: center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 2rem;
  align-items: center;

  & button {
    width: fit-content;
    background: var(--gray-950, #14161a);
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 500;
    line-height: 1.25rem;
    letter-spacing: -0.09px;
    white-space: pre;

    &:hover {
      background: var(--gray-700, #424b56);
    }
  }

  @media (max-width: ${MOBILE_SIZE_PX + "px"}) {
    padding-bottom: 0;
  }
`;

export const ContainerHeader = styled.div`
  text-align: center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 0.25rem;

  & .header-title {
    color: var(--gray-950, #14161a);
    text-align: center;
    font-size: 1.75rem;
    font-style: normal;
    font-weight: 600;
    line-height: 2.25rem;
  }

  & .header-subtitle {
    color: var(--gray-600, #676e79);
    text-align: center;
    font-size: 1rem;
    font-style: normal;
    font-weight: 500;
    line-height: 1.5rem;
  }

  @media (max-width: ${MOBILE_SIZE_PX + "px"}) {
    & .header-title {
      font-size: 1.375rem;
      line-height: 1.75rem;
    }

    & .header-subtitle {
      font-size: 0.875rem;
      font-style: normal;
      line-height: 1.25rem;
    }
  }
`;

export const ListWrapper = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.75rem;
  font-size: 0.875rem;
  font-weight: 500;
  align-items: center;

  & .list-item {
    display: flex;
    align-items: center;
    color: var(--gray-950, #14161a);
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 500;
    line-height: 1.25rem;
    letter-spacing: -0.0056rem;

    & .mng {
      font-size: 1.25rem;
      color: var(--primary-600, #e86b1e);
    }
  }

  @media (max-width: ${MOBILE_SIZE_PX + "px"}) {
    & .list-item {
      flex-direction: column;
      text-align: center;
      justify-content: center;
      gap: 0;
    }
  }
`;
