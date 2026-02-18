/* eslint-disable react/prop-types */
import {
  SkeletonRowWrapper,
  SkeletonLinePlaceholder,
  SkeletonColumnWrapper,
} from "../../style";
import { Container } from "./style";

const SkeletonMasonryGeneralCards = ({ keyPrefix }) => {
  return (
    <Container>
      <SkeletonColumnWrapper>
        <SkeletonLinePlaceholder
          key={`${keyPrefix}-1`}
          height="31.25rem"
          className="skeleton__big"
        />
      </SkeletonColumnWrapper>
      <SkeletonColumnWrapper>
        <SkeletonRowWrapper noGradient={true}>
          <SkeletonLinePlaceholder key={`${keyPrefix}-2`} height="15rem" />
          <SkeletonLinePlaceholder key={`${keyPrefix}-3`} height="15rem" />
        </SkeletonRowWrapper>
        <SkeletonRowWrapper noGradient={true}>
          <SkeletonLinePlaceholder key={`${keyPrefix}-4`} height="15rem" />
          <SkeletonLinePlaceholder key={`${keyPrefix}-5`} height="15rem" />
        </SkeletonRowWrapper>
      </SkeletonColumnWrapper>
    </Container>
  );
};

export default SkeletonMasonryGeneralCards;
