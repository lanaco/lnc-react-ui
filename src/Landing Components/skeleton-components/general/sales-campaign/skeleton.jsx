/* eslint-disable react/prop-types */
import {
  SkeletonCirclePlaceholder,
  SkeletonColumnWrapper,
  SkeletonLinePlaceholder,
  SkeletonRowWrapper,
  SkeletonSquarePlaceholder,
} from "../../style";
import { Container } from "./style";

const SkeletonSalesCampaign = ({ keyPrefix }) => {
  return (
    <Container>
      <SkeletonRowWrapper>
        <SkeletonSquarePlaceholder
          width="13.75rem"
          height="13.75rem"
          key={`${keyPrefix}-1`}
          className="skeleton__image"
        />
        <SkeletonColumnWrapper noGradient={true}>
          <SkeletonLinePlaceholder height="1rem" />
          <SkeletonLinePlaceholder height="1.75rem" />
          <SkeletonLinePlaceholder height="1.25rem" />
          <SkeletonLinePlaceholder height="2rem" />
          <SkeletonRowWrapper alignItems="center" noGradient={true}>
            <SkeletonCirclePlaceholder width="2.5rem" height="2.5rem" />
            <SkeletonLinePlaceholder width="5rem" height="1.25rem" />
          </SkeletonRowWrapper>
        </SkeletonColumnWrapper>
      </SkeletonRowWrapper>
      <SkeletonRowWrapper noGradient={true}>
        <SkeletonSquarePlaceholder
          width="13.75rem"
          height="13.75rem"
          key={`${keyPrefix}-2`}
          className="skeleton__image"
        />
        <SkeletonColumnWrapper noGradient={true}>
          <SkeletonLinePlaceholder height="1rem" />
          <SkeletonLinePlaceholder height="1.75rem" />
          <SkeletonLinePlaceholder height="1.25rem" />
          <SkeletonLinePlaceholder height="2rem" />
          <SkeletonRowWrapper alignItems="center" noGradient={true}>
            <SkeletonCirclePlaceholder width="2.5rem" height="2.5rem" />
            <SkeletonLinePlaceholder width="5rem" height="1.25rem" />
          </SkeletonRowWrapper>
        </SkeletonColumnWrapper>
      </SkeletonRowWrapper>
    </Container>
  );
};

export default SkeletonSalesCampaign;
