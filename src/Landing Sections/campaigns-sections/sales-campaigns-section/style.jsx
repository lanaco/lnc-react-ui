import styled from "@emotion/styled";
import { MOBILE_SIZE_PX } from "../../../_utils/consts";
import {
  getBorderRadiusValueWithUnits,
  linearGradientAnimation,
} from "../../../_utils/utils";

export const SectionBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  & .arrow-icon {
    & i {
      transition: all 0.25s ease;
      transform: ${(props) =>
        props.expanded === true ? "rotate(-180deg)" : "rotate(0)"};
    }
  }

  & .badge-button {
    white-space: nowrap;
    font-weight: 500;
  }

  & .campaign-item {
    min-width: calc(50% - 0.87rem);
    width: calc(50% - 0.87rem);
    margin-right: 1.25rem;
  }

  @media (max-width: ${MOBILE_SIZE_PX + "px"}) {
    & .campaign-item {
      min-width: 100%;
      width: 100%;
      margin-right: 0;
    }
  }
`;

export const FilledPlaceholder = styled.div`
  width: ${(p) => p.width || "100%"};
  height: ${(p) => (p.heightCoeff || 1) * 1.125}rem;
  background-color: var(--gray-200, #dddfe4);

  ${linearGradientAnimation("-90deg")}
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: ${(p) => (p?.row ? "row" : "column")};
  gap: ${(p) => p?.gap ?? "0.5rem"};
  width: ${(p) => p?.width ?? "100%"};
`;

export const ImgWrapper = styled.div`
  border-radius: ${(p) =>
    getBorderRadiusValueWithUnits(p.theme, p?.borderRadius ?? "regular")};
  background: var(--gray-200, #dddfe4);
  position: relative;
  max-height: ${(p) => p?.height ?? "5rem"};
  max-width: ${(p) => p?.width ?? "5rem"};
  height: ${(p) => p?.height ?? "5rem"};
  width: ${(p) => p?.width ?? "5rem"};
  flex-shrink: 0;

  ${linearGradientAnimation()}
`;

export const CampaignCardContainer = styled.div`
  background: var(--white, #fff);
  border-radius: ${(p) => getBorderRadiusValueWithUnits(p.theme, "edged")};
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06);
  border: 1px solid var(--gray-95012, #14161a1f);

  display: flex;
  gap: 1rem;
  padding: 1.25rem;
  width: 100%;

  & .campaign__left-section {
    position: relative;
  }

  & .campaign__right-section {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    max-width: 18rem;
    width: 100%;
  }

  & .campaign__user {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;
