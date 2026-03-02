import styled from "@emotion/styled";
export const Wrapper = styled.div`
  width: 100%;
  height: 100%;

  & .wrapper__image {
    width: ${(p) => (p?.imageWidth ? `${p?.imageWidth}px` : "100%")};
    height: ${(p) => (p?.imageHeight ? `${p?.imageHeight}px` : "100%")};
    object-fit: cover;
  }
`;
