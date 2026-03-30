import styled from "@emotion/styled";

import { keyframes } from "@emotion/react";

const shimmer = keyframes`
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
`;

export const SkeletonContainer = styled.div`
  display: flex;
  gap: ${({ gap = "1.25rem" }) => gap};
  flex-wrap: ${({ wrap = "nowrap" }) => wrap};
  align-content ${({ alignContent = "normal" }) => alignContent};
  justify-content: ${({ justifyContent = "normal" }) => justifyContent};
  align-items: ${({ alignItems = "normal" }) => alignItems};
  width: 100%;
`;

export const SkeletonAnimationContainer = styled(SkeletonContainer)`
  position: relative;
  overflow: hidden;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(255, 255, 255, 0) 20%,
      rgba(255, 255, 255, 0.75) 50%,
      rgba(255, 255, 255, 0) 80%,
      transparent 100%
    );
    animation: ${shimmer} 2s infinite linear;
    pointer-events: none;
    z-index: 10;
  }
`;

export const SkeletonAnimationColumnContainer = styled(
  SkeletonAnimationContainer,
)`
  flex-direction: column;
`;

export const SkeletonColumnContainer = styled(SkeletonContainer)`
  flex-direction: column;
`;

const SkeletonBase = styled.div`
  background-color: #f4f6fb;
  position: relative;
`;

export const SkeletonSquare = styled(SkeletonBase)`
  max-height: ${({ size = "4rem" }) => size};
  width: 100%;
  aspect-ratio: 1 / 1;
  border-radius: ${({ borderRadius = "0.75rem" }) => borderRadius};
`;

export const SkeletonRect = styled(SkeletonBase)`
  width: ${({ width = "8rem" }) => width};
  height: ${({ height = "1.5rem" }) => height};
  border-radius: ${({ borderRadius = "0.75rem" }) => borderRadius};
`;

export const SkeletonCircle = styled(SkeletonBase)`
  width: ${({ size = "4rem" }) => size};
  height: ${({ size = "4rem" }) => size};
  border-radius: 50%;
`;

export const SkeletonEmpty = styled.div`
  width: ${({ width = "1rem" }) => width};
  height: ${({ height = "1rem" }) => height};
  background: transparent;
`;
