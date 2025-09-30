import styled from "@emotion/styled";
import {
  getBorderRadiusValueWithUnits,
  getColorRgbaValue,
} from "../../../_utils/utils";
import { MOBILE_SIZE_PX } from "../../../_utils/consts";
import { motion } from "framer-motion";

export const Wrapper = styled.div`
  cursor: pointer;
  display: flex;
  gap: 1rem;
  padding: 1.25rem;
  border-radius: 20px;
  border: 1px solid var(--gray-95008, #14161a14);

  @media (max-width: ${MOBILE_SIZE_PX + "px"}) {
    flex-direction: column;
    padding: 0;
    gap: 0;
    border: none;
    border-radius: 0;
  }
`;

export const ImageWrapper = styled.div`
  border-radius: ${(p) => getBorderRadiusValueWithUnits(p.theme, "edged")};
  height: 15rem;
  width: 15rem;
  min-width: 15rem;
  cursor: pointer;

  position: relative;
  overflow: hidden;

  & img {
    max-width: 100%;
    min-width: 100%;
    max-height: 100%;
    min-height: 100%;
    object-fit: cover;

    transform: scale(1.1);
    transition: var(--transition, all 0.3s ease);
    &:hover {
      transform: scale(1.25);
    }
  }

  @media (max-width: ${MOBILE_SIZE_PX + "px"}) {
    width: 100%;
    max-width: 100dvh;
    height: 23.438rem;
  }
`;

export const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1rem;
  color: var(--gray-950, #14161a);
  font-weight: 400;
  font-size: 0.875rem;

  & .campaign-title {
    font-weight: 500;
    font-size: 0.75rem;
    letter-spacing: 0.1rem;
    color: var(--primary-500, #f59e0b);
  }

  & .campaign-title-text {
    font-weight: 600;
    font-size: 1.375rem;
    transition: var(--transition, all 0.3s ease);
  
  }

  & .text-block-wrapper {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  & .title-block-wrapper {
    display: flex;
    flex-direction: column;
  }

  & .timestamp-text {
    font-size: 0.875rem;
    font-weight: 400;
    padding-top: 0.25rem;
    color: var(--gray-700, #4e555f);
  }

  & .profile-item:hover {
    background-color: transparent;
  }

  @media (max-width: ${MOBILE_SIZE_PX + "px"}) {
    padding: 1.25rem;

    & .campaign-title {
      font-size: 0.875rem;
    }

    & .text-block-wrapper {
      gap: 0.25rem;
    }
    & .text-block-wrapper {
      gap: 0.25rem;
    }
  }
`;

const ThemeColorDarker = {
  "#ADE3EB": "#76D0DB",
  "#DDD6FE": "#C4B5FD",
  "#FDE68A": "#FCD34D",
  "#A7F3D0": "#6EE7B7",
  "#BADFFF": "#87C6FA",
  "#FECDD3": "#FDA4AF",
  "#EFE2CF": "#EAD2AF",
  "#DDDFE4": "#C4C8CF",
  "#E7E5E4": "#D6D3D1",
  "#FED7AA": "#FDBA74",
  default: "#C4C8CF",
};

const flex = (align = false, wrap = false, justify = false) => {
  return `
    display: flex;
    ${wrap ? "flex-wrap: wrap;" : ""}
    ${!wrap ? "flex-wrap: nowrap;" : ""}
    ${align ? "align-items: center;" : ""}
    ${justify ? "justify-content: center;" : ""}
  `;
};

export const StyledProfileItem = styled(motion.div)`
  text-decoration: none;
  ${(p) => p.hasPermission === true && "cursor: pointer"};

  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }

  & .icon,
  .name {
    text-decoration: none;
  }

  ${flex(true)}
  gap: 0.5rem;
  padding: 0.5rem;
  color: ${(p) => p.isActive === false ? "var(--gray-900)" : "var(--primary-600)"};
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1.25rem;
  border-radius: ${(p) => getBorderRadiusValueWithUnits(p.theme, "slight")};
  transition: all 0.25s ease;

  & .logo-wrapper {
    ${flex(true, false, true)}
    flex-shrink: 0;
    border-radius: 999px;
    border: 3px solid
      ${(p) =>
        p.isActive === false
          ? "var(--gray-300, #c4c8cf)"
          : ThemeColorDarker[p.themeColor] ?? "var(--gray-300, #c4c8cf)"};

    & img,
    .img-placeholder {
      border-radius: 999px;
      object-fit: cover;
      height: 1.25rem;
      width: 1.25rem;
      background-color: var(--gray-200, #dddfe4);
    }

    & .no-image {
      background: white;
    }
  }

  &.user-profile-item {
    & .logo-wrapper {
      border: 3px solid transparent;
    }
  }

  & .name {
    flex-grow: 15;
  }

  & .notifications-number .badge {
    font-size: 0.75rem;
  }

  & .badge {
    max-height: 1.25rem;
    min-height: 1.25rem;
    padding: 0.375rem;
    line-height: 1rem;
  }

  &:hover {
    cursor: pointer;
    background-color: var(--gray-95080, #14161acc);
    color: var(--gray-600, #676e79);
  }
`;

export const BadgeBar = styled.div`
  position: absolute;
  top: 0.5rem;
  ${(p) => (p.alignToLeft === true ? "left: 0.5rem;" : "right: 0.5rem;")}
  display: flex;
  gap: 0.25rem;
`;

const getStatusTextColor = (color) => {
  return `var(--${color}-700)`;
};

export const StatusBadge = styled.div`
  border-radius: ${(p) =>
    getBorderRadiusValueWithUnits(p.theme, p.borderRadius || "slight")};
  background-color: ${(p) => getStatusTextColor(p?.color)};
  color: white;
  height: 1.5rem;
  min-width: 1.5rem;
  width: ${(p) => (p.fitContent === true ? "fit-content" : "1.5rem")};
  ${(p) => p.fitContent === true && `padding: 0 0.1rem;`};
  font-size: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${(p) => p.padding};
  & i {
    font-size: 0.813rem;
  }
`;
