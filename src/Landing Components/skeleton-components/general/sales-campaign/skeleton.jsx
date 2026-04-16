/* eslint-disable react/prop-types */
import {
  SkeletonCircle,
  SkeletonColumnContainer,
  SkeletonContainer,
  SkeletonEmpty,
  SkeletonRect,
  SkeletonSquare,
} from "../../style";
import { Container } from "./style";

const SkeletonSalesCampaign = ({ keyPrefix }) => {
  return (
    <Container>
      {[1, 2, 3, 4]?.map((x) => (
        <SkeletonContainer key={`${keyPrefix}-${x}`}>
          <SkeletonColumnContainer gap="0.5rem">
            <SkeletonSquare size="13.75rem" className="skeleton__square" />
            <SkeletonRect width="5rem" height="1rem" />
            <SkeletonRect width="100%" height="2rem" />
            <SkeletonRect width="5rem" height="0.5rem" />
            <SkeletonEmpty />
            <SkeletonContainer gap="0.5rem" alignItems="center">
              <SkeletonCircle size="3rem" className="skeleton__circle" />
              <SkeletonColumnContainer>
                <SkeletonRect width="5rem" height="1rem" />
                <SkeletonRect width="3rem" height="1rem" />
              </SkeletonColumnContainer>
            </SkeletonContainer>
          </SkeletonColumnContainer>
        </SkeletonContainer>
      ))}
    </Container>
  );
};

export default SkeletonSalesCampaign;
