/* eslint-disable react/prop-types */
import {
  SkeletonColumnContainer,
  SkeletonContainer,
  SkeletonRect,
  SkeletonSquare,
} from "../../style";
import { Container } from "./style";

const SkeletonProductsWithBanner = ({ keyPrefix }) => {
  return (
    <Container>
      <SkeletonRect width="100%" height="10rem" className="skeleton__banner" />
      <SkeletonContainer>
        {[1, 2, 3, 4]?.map((x) => (
          <SkeletonColumnContainer key={`${keyPrefix}-${x}`} gap="0.5rem">
            <SkeletonSquare size="6rem" />
            <SkeletonRect width="100%" height="1rem" />
            <SkeletonContainer gap="0.5rem">
              <SkeletonRect width="100%" height="1.5rem" />
              <SkeletonRect width="100%" height="1.5rem" />
            </SkeletonContainer>
            <SkeletonRect width="100%" height="1.5rem" />
          </SkeletonColumnContainer>
        ))}
      </SkeletonContainer>
    </Container>
  );
};

export default SkeletonProductsWithBanner;
