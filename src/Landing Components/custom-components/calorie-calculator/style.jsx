import styled from "@emotion/styled";
import { MOBILE_SIZE_PX } from "../../../_utils/consts";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 2.25rem;

  @media (max-width: ${MOBILE_SIZE_PX + "px"}) {
    gap: 2rem;
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

export const CalculatorTitle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;

  font-size: 1.5rem;
  font-weight: 600;
  text-align: center;

  & .subtitle {
    font-size: 1rem;
    font-weight: 500;
    color: var(--gray-600, #676e79);
  }
`;

export const ExternalGridWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.25rem;
  align-items: center;

  & .btns-footer {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    & button {
      width: 20rem;
      max-width: 20rem;
    }
  }

  @media (max-width: ${MOBILE_SIZE_PX + "px"}) {
    gap: 2rem;
    & .btns-footer {
      width: 100%;
      align-items: center;
      & button {
        width: 100%;
        max-width: 13.75rem;
      }
    }
  }
`;

export const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  width: fit-content;
  gap: 0.5rem;
  align-items: center;

  & .lnc-ui-button {
    padding-right: 0.75rem;
    padding-left: 0.75rem;
  }

  & .caluclating-group {
    display: flex;
    align-items: center;
    gap: 0.625rem;

    & .range-input-lnc {
      width: 22.75rem;
    }

    & .calculating-btn {
      min-width: 4.5rem;
      max-width: 4.5rem;
    }

    & .calculating-input {
      min-height: 2.25rem;
      max-height: 2.25rem;
      min-width: 4.5rem;
      max-width: 4.5rem;
      padding: 0.38rem;
      border-radius: 0.5rem;
      border: 1px solid var(--gray-95012, rgba(20, 22, 26, 0.12));
      background: var(--white, #fff);
      text-align: center;
    }
  }

  & .btn-cnt {
    display: flex;
    align-items: center;
    gap: 0.38rem;

    & i {
      font-size: 1.5rem;
    }
  }

  & .grid-label {
    font-weight: 600;
    font-size: 1rem;
    min-width: 10rem;
    padding-top: 0.75rem;

    & .unit {
      font-weight: 400;
      color: var(--gray-600, #676e79);
    }
  }

  & .grid-label:first-of-type {
    padding-top: 0 !important;
  }

  @media (max-width: ${MOBILE_SIZE_PX + "px"}) {
    gap: 0.25rem;
    grid-template-columns: auto;

    & .grid-label {
      font-size: 1rem;
    }
    & .caluclating-group {
      flex-wrap: wrap;
      gap: 1rem;
      & .range-input-lnc {
        width: unset;
        flex: 1;
      }
    }

    & .group-activity {
      button {
        width: 100%;
      }
    }

    & .grid-label {
      min-width: unset;
    }
  }
`;

export const ResultsExternalWrapper = styled.div`
  border-radius: 0.75rem;
  border: 1px solid var(--neutral-95008);
  background: var(--white);
  padding: 1.25rem;
  /* drop-shadow */
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.1),
    0px 1px 2px 0px rgba(0, 0, 0, 0.06);

  display: flex;
  padding: 1.25rem;
  align-items: center;
  gap: 1rem;

  & .dropdown-group {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  & .vertical-line {
    width: 1px;
    height: 4rem;
    background-color: var(--gray-95008);
    margin: 0 0.62rem;
  }

  @media (max-width: ${MOBILE_SIZE_PX + "px"}) {
    padding: 0.75rem;
    gap: 0.75rem;

    & .vertical-line {
      height: 100%;
      min-height: 5.25rem;
    }

    & .dropdown-group {
      gap: 0.75rem;
      align-items: start;
    }
  }
`;

export const ResultsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  flex: 1;

  @media (max-width: ${MOBILE_SIZE_PX + "px"}) {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;
  }
`;

export const ResultItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  min-width: 7.125rem;
  align-items: center;
  text-align: center;
  font-weight: 600;
  font-size: 1.375rem;

  & .subgroup {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }
  & .subtext {
    font-size: 1rem;
    font-weight: 400;
    color: var(--gray-600, #676e79);
  }

  & i {
    color: ${(p) => p.color};
    font-size: 3rem;
  }

  @media (max-width: ${MOBILE_SIZE_PX + "px"}) {
    flex-direction: row;
    gap: 0.25rem;
    font-size: 0.875rem;
    font-weight: 500;
    align-items: start;

    & i {
      font-size: 1.75rem;
    }

    & .subtext {
      font-size: 0.75rem;
      font-weight: 400;
    }
    & .subgroup {
      gap: 0;
    }
  }
`;
