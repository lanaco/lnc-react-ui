import {
  SkeletonColumnWrapper,
  SkeletonLinePlaceholder,
  SkeletonRowWrapper,
  SkeletonSquarePlaceholder,
} from "../../style";
import { Container } from "./style";

const SkeletonProductsWithBanner = ({ keyPrefix }) => {
  return (
    <Container>
      <SkeletonLinePlaceholder height="22.5rem" className="skeleton__banner" />
      <SkeletonRowWrapper>
        <SkeletonColumnWrapper key={`${keyPrefix}-1`} gap="0.5rem">
          <SkeletonSquarePlaceholder
            height="100%"
            width="100%"
            borderRadius="0.75rem"
          />

          <SkeletonColumnWrapper height="1rem">
            <SkeletonLinePlaceholder height="1rem" borderRadius="0.75rem" />
          </SkeletonColumnWrapper>

          <SkeletonRowWrapper gap="0.5rem">
            <SkeletonLinePlaceholder height="1.5rem" borderRadius="0.75rem" />
            <SkeletonLinePlaceholder height="1.5rem" borderRadius="0.75rem" />
          </SkeletonRowWrapper>

          <SkeletonColumnWrapper height="2rem">
            <SkeletonLinePlaceholder height="2rem" borderRadius="0.75rem" />
          </SkeletonColumnWrapper>
        </SkeletonColumnWrapper>
        <SkeletonColumnWrapper
          key={`${keyPrefix}-2`}
          gap="0.5rem"
          noGradient={true}
        >
          <SkeletonSquarePlaceholder
            height="100%"
            width="100%"
            borderRadius="0.75rem"
          />
          <SkeletonLinePlaceholder height="1rem" borderRadius="0.75rem" />
          <SkeletonRowWrapper gap="0.5rem" noGradient={true}>
            <SkeletonLinePlaceholder height="1.5rem" borderRadius="0.75rem" />
            <SkeletonLinePlaceholder height="1.5rem" borderRadius="0.75rem" />
          </SkeletonRowWrapper>
          <SkeletonLinePlaceholder height="2rem" borderRadius="0.75rem" />
        </SkeletonColumnWrapper>
        <SkeletonColumnWrapper
          key={`${keyPrefix}-3`}
          gap="0.5rem"
          noGradient={true}
        >
          <SkeletonSquarePlaceholder
            height="100%"
            width="100%"
            borderRadius="0.75rem"
          />
          <SkeletonLinePlaceholder height="1rem" borderRadius="0.75rem" />
          <SkeletonRowWrapper gap="0.5rem" noGradient={true}>
            <SkeletonLinePlaceholder height="1.5rem" borderRadius="0.75rem" />
            <SkeletonLinePlaceholder height="1.5rem" borderRadius="0.75rem" />
          </SkeletonRowWrapper>
          <SkeletonLinePlaceholder height="2rem" borderRadius="0.75rem" />
        </SkeletonColumnWrapper>
        <SkeletonColumnWrapper
          key={`${keyPrefix}-4`}
          gap="0.5rem"
          noGradient={true}
        >
          <SkeletonSquarePlaceholder
            height="100%"
            width="100%"
            borderRadius="0.75rem"
          />
          <SkeletonLinePlaceholder height="1rem" borderRadius="0.75rem" />
          <SkeletonRowWrapper gap="0.5rem" noGradient={true}>
            <SkeletonLinePlaceholder height="1.5rem" borderRadius="0.75rem" />
            <SkeletonLinePlaceholder height="1.5rem" borderRadius="0.75rem" />
          </SkeletonRowWrapper>
          <SkeletonLinePlaceholder height="2rem" borderRadius="0.75rem" />
        </SkeletonColumnWrapper>
      </SkeletonRowWrapper>
    </Container>
  );
};

export default SkeletonProductsWithBanner;
