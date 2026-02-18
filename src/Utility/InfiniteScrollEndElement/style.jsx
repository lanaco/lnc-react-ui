import styled from "@emotion/styled";

export const StyledDiv = styled.div`
  min-height: 1px;
  ${(p) =>
    p.isHorizontal === true ? "min-width: 1px; width: 1px;" : "width: 100%;"}
`;
