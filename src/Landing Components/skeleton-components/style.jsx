import styled from "@emotion/styled";
import { css } from "@emotion/react";

export const noGradientStyle = css`
  background: #f4f6fb;

  /* drop-shadow-sm */
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
`;

export const skeletonGradientBackground = css`
  ${noGradientStyle}

  &:first-of-type {
    background: linear-gradient(
      to right,
      transparent 0%,
      #f4f6fb 40%,
      #f4f6fb 100%
    );

    box-shadow: none;
  }
`;

export const SkeletonRowWrapper = styled.div`
  display: flex;
  gap: ${(p) => p?.gap || "1.25rem"};
  width: ${(p) => p?.width || "100%"};
  align-items: ${(p) => p?.alignItems || "normal"};
  justify-content: ${(p) => p?.justifyContent || "normal"};

  & > div {
    &:first-of-type {
      ${(p) => p?.noGradient && noGradientStyle}
    }
  }
`;

export const SkeletonColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(p) => p?.gap || "1.25rem"};
  width: ${(p) => p?.width || "100%"};
  align-items: ${(p) => p?.alignItems || "normal"};
  justify-content: ${(p) => p?.justifyContent || "normal"};
  height: ${(p) => p?.height || "100%"};

  & > div {
    &:first-of-type {
      ${(p) => p?.noGradient && noGradientStyle}
    }
  }
`;

export const SkeletonSquarePlaceholder = styled.div`
  border-radius: ${(p) => p?.borderRadius || "0.5rem"};
  height: ${(p) => p?.height || "11rem"};
  width: ${(p) => p?.width || "11rem"};
  aspect-ratio: 1 / 1;

  ${skeletonGradientBackground}
`;

export const SkeletonCirclePlaceholder = styled.div`
  border-radius: 999px;
  height: ${(p) => p?.height || "11rem"};
  width: ${(p) => p?.width || "11rem"};

  ${skeletonGradientBackground}
`;

export const SkeletonLinePlaceholder = styled.div`
  border-radius: ${(p) => p?.borderRadius || "0.5rem"};
  width: ${(p) => p?.width || "100%"};
  height: ${(p) => p?.height || "2rem"};

  ${skeletonGradientBackground}
`;
