import styled from "@emotion/styled";
import { MOBILE_SIZE_PX } from "../../../_utils/consts";
import { truncateText } from "../../../_utils/utils";

export const Wrapper = styled.div`
  display: flex;
  gap: 1.25rem;
  padding: 1.5rem;
  border-radius: 0.75rem;
  border: 1px solid var(--gray-95008, rgba(20, 22, 26, 0.08));
  background: var(--white, #fff);

  /* drop-shadow */
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.1),
    0px 1px 2px 0px rgba(0, 0, 0, 0.06);

  & img {
    border-radius: 0.75rem;
    min-height: 8.25rem;
    max-height: 8.25rem;
    object-fit: cover;
  }

  & .input-amount {
    padding: 0.62rem 0.75rem;
    font-size: 0.875rem;
    border-radius: 0.5rem;
    border: 1px solid var(--gray-95012, rgba(20, 22, 26, 0.12));
    background: var(--white, #fff);
    flex: 1;

    ::placeholder {
      color: var(--gray-600, #676e79);
      opacity: 1; /* Firefox */
    }

    ::-ms-input-placeholder {
      /* Edge 12 -18 */
      color: var(--gray-600, #676e79);
    }
  }

  & .right-content {
    flex: 1;
    overflow: hidden;
  }

  @media (max-width: ${MOBILE_SIZE_PX + "px"}) {
    gap: 1rem;
    flex-direction: column;
    padding: 1rem;

    & img {
      min-height: 3rem;
      max-height: 3rem;
    }
  }
`;

export const ContentWrapper = styled.div`
  color: var(--gray-950, #14161a);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow: hidden;
  padding-left: 2px;

  & .content-title {
    font-weight: 600;
    font-size: 1rem;
  }

  & .cont {
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  & .content-text {
    font-size: 0.875rem;
    font-weight: 400;
    color: var(--gray-700, #4e555f);
    ${truncateText()}
  }

  & .content-row {
    display: flex;
    gap: 0.75rem;
  }

  & button {
    white-space: nowrap;
  }

  @media (max-width: ${MOBILE_SIZE_PX + "px"}) {
    gap: 1.25rem;
    flex-direction: row;

    & .content-row {
      width: 100%;
    }

    & .input-amount {
      width: 100px;
      min-width: fit-content;
    }
  }
`;

export const OptionsWrapper = styled.div`
  display: flex;
  gap: 0.75rem;
  padding-top: 0.75rem;
  @media (max-width: ${MOBILE_SIZE_PX + "px"}) {
    padding-top: 0;
  }
`;

export const OptionItem = styled.div`
  cursor: pointer;
  background-color: var(--white);
  min-width: 4.3rem;
  max-width: 4.3rem;
  min-height: 2.5rem;
  max-width: 2.5rem;
  border-radius: 0.5rem;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: var(--transition);
  &:hover {
    border: 1px solid var(--primary-300);
    color: var(--primary-300);
  }
  color: ${(p) =>
    p.selected === true ? "var(--primary-500, #F59E0B)" : "var(--gray-950)"};
  border: ${(p) =>
    p.selected === true
      ? " 1px solid var(--primary-500, #F59E0B)"
      : "1px solid var(--gray-95012, rgba(20, 22, 26, 0.12))"};
`;
