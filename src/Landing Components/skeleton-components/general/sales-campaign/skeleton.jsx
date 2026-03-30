/* eslint-disable react/prop-types */
import {
  SkeletonCircle,
  SkeletonColumnContainer,
  SkeletonContainer,
  SkeletonRect,
  SkeletonSquare,
} from "../../style";
import { Container } from "./style";

const SkeletonSalesCampaign = ({ keyPrefix }) => {
  return (
    <Container>
      {[1, 2]?.map((x) => (
        <SkeletonContainer key={`${keyPrefix}-${x}`}>
          <SkeletonSquare size="13.75rem" className="skeleton__image" />
          <SkeletonColumnContainer>
            <SkeletonRect width="100%" height="1rem" />
            <SkeletonRect width="100%" height="1.75rem" />
            <SkeletonRect width="100%" height="1.25rem" />
            <SkeletonRect width="100%" height="2rem" />
            <SkeletonContainer alignItems="center">
              <SkeletonCircle size="2.5rem" />
              <SkeletonRect width="5rem" height="1.25rem" />
            </SkeletonContainer>
          </SkeletonColumnContainer>
        </SkeletonContainer>
      ))}
    </Container>
  );
};

export default SkeletonSalesCampaign;
