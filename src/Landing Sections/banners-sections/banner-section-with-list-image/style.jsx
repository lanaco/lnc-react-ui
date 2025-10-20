import styled from "@emotion/styled";
import { MOBILE_SIZE_PX } from "../../../_utils/consts";

export const Container = styled.div`
  display: flex;
  border-radius: 0.75rem;
  background-color: ${(p) => p?.bgColor || "transparent"};
  overflow: hidden;

  & button {
    width: fit-content;
  }

  & img {
    object-fit: cover;
    max-width: ${(p) => p.imgW || "33.39346rem"};
    min-width: ${(p) => p.imgW || "33.39346rem"};
    max-height: ${(p) => p.imgH || "22.5rem"};
    min-height: ${(p) => p.imgH || "22.5rem"};
  }

  ${(p) =>
    p.hasBorder === true &&
    `border: 1px solid var(--gray-95008, rgba(20, 22, 26, 0.08));
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.10), 0px 1px 2px 0px rgba(0, 0, 0, 0.06);

`}

  @media (max-width: ${MOBILE_SIZE_PX + "px"}) {
    flex-direction: column;
    border-radius: 0;
    border: none;
    box-shadow: none;

    & img {
      max-width: 100%;
      min-width: 100%;
      max-height: ${(p) => p.imgHMob || "12.1rem"};
      min-height: ${(p) => p.imgHMob || "12.1rem"};
    }
  }
`;

export const Wrapper = styled.div`
  padding: 2rem;
  display: flex;
  gap: 1.25rem;
  justify-content: space-between;
  flex: 1;
  flex-direction: column;

  @media (max-width: ${MOBILE_SIZE_PX + "px"}) {
    padding: 0 0 1.25rem 0;
  }
`;

export const ContainerHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;

  & .header-title {
    color: var(--gray-950, #14161a);
    font-size: 1.75rem;
    font-style: normal;
    font-weight: 600;
    line-height: 2.25rem;
    letter-spacing: -0.5904px;
  }

  & .header-subtitle {
    color: var(--gray-950, #14161a);
    font-size: 1rem;
    font-style: normal;
    font-weight: 500;
    line-height: 1.5rem;
    letter-spacing: -0.0112rem;
  }

  @media (max-width: ${MOBILE_SIZE_PX + "px"}) {
    flex-direction: column;
  }
`;

export const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  font-size: 0.875rem;
  font-weight: 500;

  & .list-item {
    color: var(--gray-950, #14161a);
    display: flex;
    align-items: center;
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 500;
    line-height: 1.25rem;
    letter-spacing: -0.0056rem;

    & .mng {
      font-size: 1.25rem;
      color: var(--info-600, #6d28d9);
    }
  }

  @media (max-width: ${MOBILE_SIZE_PX + "px"}) {
  }
`;
