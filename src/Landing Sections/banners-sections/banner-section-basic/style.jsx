import styled from "@emotion/styled";
import { MOBILE_SIZE_PX } from "../../../_utils/consts";

export const Container = styled.div`
  display: flex;
  border-radius: 0.75rem;
  background-color: ${(p) => p.bgcolor || "transparent"};
  overflow: hidden;
  max-height: ${(p) => p.height || "22.5rem"};
  min-height: ${(p) => p.height || "22.5rem"};

  & button {
    width: fit-content;
    background-color: var(--gray-100, #f3f4f6);
    color: var(--gray-950, #14161a);
  }

  @media (max-width: ${MOBILE_SIZE_PX + "px"}) {
    gap: 1.5rem;
    flex-direction: column;
    min-height: unset;
    max-height: unset;

    & button {
      width: fit-content;
    }
  }
`;

export const Wrapper = styled.div`
  padding: ${(p) => (p.smallPadding === true ? "2rem" : "4rem 5rem")};
  display: flex;
  gap: 2rem;
  flex-direction: ${(p) => (p.isHorizontalContent === true ? "row" : "column")};
  flex: 1;
  align-items: center;

  ${(p) => p.isHorizontalContent === true && `justify-content: space-between;`}

  @media (max-width: ${MOBILE_SIZE_PX + "px"}) {
    padding: 0;
    flex-direction: column;
  }
`;

export const ContainerHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  text-align: center;

  & .header-title {
    font-size: 1.75rem;
    font-weight: 600;
    color: var(--gray-950, #14161a);
  }

  & .header-subtitle {
    color: var(--gray-950, #14161a);
    font-size: 1rem;
    font-weight: 500;
  }
`;
