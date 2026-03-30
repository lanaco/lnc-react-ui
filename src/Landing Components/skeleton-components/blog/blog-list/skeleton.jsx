/* eslint-disable react/prop-types */
import {
  SkeletonRect,
  SkeletonContainer,
  SkeletonColumnContainer,
} from "../../style";
import { Container } from "./style";

const SkeletonBlogList = ({ keyPrefix }) => {
  return (
    <Container>
      {[1, 2, 3, 4, 5]?.map((x) => (
        <SkeletonContainer key={`${keyPrefix}-${x}`}>
          <SkeletonRect height="9.5rem" width="17.75rem" />
          <SkeletonColumnContainer>
            <SkeletonRect height="1.5rem" width="100%" />
            <SkeletonContainer>
              <SkeletonRect width="5rem" height="1.25rem" />
              <SkeletonRect width="5rem" height="1.25rem" />
              <SkeletonRect width="5rem" height="1.25rem" />
              <SkeletonRect width="5rem" height="1.25rem" />
            </SkeletonContainer>
          </SkeletonColumnContainer>
        </SkeletonContainer>
      ))}
    </Container>
  );
};

export default SkeletonBlogList;
