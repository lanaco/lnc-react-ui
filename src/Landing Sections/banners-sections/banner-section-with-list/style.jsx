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
    font-size: 1.5rem;
    font-weight: 600;
  }

  & .header-subtitle {
    color: var(--gray-600, #676e79);
    font-size: 1rem;
    font-weight: 500;
  }

  @media (max-width: ${MOBILE_SIZE_PX + "px"}) {
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

    & .mng {
      font-size: 1.25rem;
      color: var(--success-600);
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
