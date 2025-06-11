import styled from "@emotion/styled";
import { MOBILE_SIZE_PX } from "../../../_utils/consts";

export const Container = styled.div`
  display: flex;
  border-radius: 0.75rem;
  background-color: ${(p) => p.bgcolor || "transparent"};
  overflow: hidden;
  max-height: ${(p) => p.height || "22.5rem"};
  min-height: ${(p) => p.height || "22.5rem"};
  background-color: ${(p) => p.bgcolor || "transparent"};

  & button {
    width: fit-content;
  }

  ${(p) =>
    p.hasBorder === true &&
    `border: 1px solid var(--gray-95008, rgba(20, 22, 26, 0.08));
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.10), 0px 1px 2px 0px rgba(0, 0, 0, 0.06);

`}

  & img {
    object-fit: cover;
    max-width: ${(p) => p.imgW || "22.5rem"};
    min-width: ${(p) => p.imgW || "22.5rem"};
    max-height: ${(p) => p.height || "22.5rem"};
    min-height: ${(p) => p.height || "22.5rem"};
  }

  ${(p) =>
    p.hasBorder === true &&
    `border: 1px solid var(--gray-95008, rgba(20, 22, 26, 0.08));
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.10), 0px 1px 2px 0px rgba(0, 0, 0, 0.06);

`}

  @media (max-width: ${MOBILE_SIZE_PX + "px"}) {
    gap: 1.5rem;
    flex-direction: column;
    min-height: unset;
    max-height: unset;

    & button {
      width: fit-content;
    }

    & img {
      max-width: 100%;
      min-width: 100%;
      max-height: ${(p) => p.imgHMob || "12.1rem"};
      min-height: ${(p) => p.imgHMob || "12.1rem"};
    }
  }
`;

export const Wrapper = styled.div`
  padding: ${(p) => (p.smallPadding === true ? "2rem" : "4rem 5rem")};
  display: flex;
  gap: 2rem;
  flex-direction: ${(p) => (p.isHorizontalContent === true ? "row" : "column")};
  flex: 1;

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

  & .header-title {
    font-size: 1.75rem;
    font-weight: 600;
  }

  & .header-subtitle {
    color: var(--gray-950, #14161a);
    font-size: 1rem;
    font-weight: 500;
  }

  @media (max-width: ${MOBILE_SIZE_PX + "px"}) {
    flex-direction: column;
  }
`;
