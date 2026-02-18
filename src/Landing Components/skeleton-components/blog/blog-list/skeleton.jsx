/* eslint-disable react/prop-types */
import {
  SkeletonRowWrapper,
  SkeletonLinePlaceholder,
  SkeletonSquarePlaceholder,
  SkeletonColumnWrapper,
} from "../../style";
import { Container } from "./style";

const SkeletonBlogList = ({ keyPrefix }) => {
  return (
    <Container>
      <SkeletonRowWrapper key={`${keyPrefix}-1`}>
        <SkeletonSquarePlaceholder height="9.5rem" width="17.75rem" />
        <SkeletonColumnWrapper noGradient={true}>
          <SkeletonLinePlaceholder height="1.5rem" />
          <SkeletonRowWrapper noGradient={true}>
            <SkeletonLinePlaceholder width="5rem" height="1.25rem" />
            <SkeletonLinePlaceholder width="5rem" height="1.25rem" />
            <SkeletonLinePlaceholder width="5rem" height="1.25rem" />
            <SkeletonLinePlaceholder width="5rem" height="1.25rem" />
          </SkeletonRowWrapper>
        </SkeletonColumnWrapper>
      </SkeletonRowWrapper>
      <SkeletonRowWrapper key={`${keyPrefix}-2`}>
        <SkeletonSquarePlaceholder height="9.5rem" width="17.75rem" />
        <SkeletonColumnWrapper noGradient={true}>
          <SkeletonLinePlaceholder height="1.5rem" />
          <SkeletonRowWrapper noGradient={true}>
            <SkeletonLinePlaceholder width="5rem" height="1.25rem" />
            <SkeletonLinePlaceholder width="5rem" height="1.25rem" />
            <SkeletonLinePlaceholder width="5rem" height="1.25rem" />
            <SkeletonLinePlaceholder width="5rem" height="1.25rem" />
          </SkeletonRowWrapper>
        </SkeletonColumnWrapper>
      </SkeletonRowWrapper>
      <SkeletonRowWrapper key={`${keyPrefix}-3`}>
        <SkeletonSquarePlaceholder height="9.5rem" width="17.75rem" />
        <SkeletonColumnWrapper noGradient={true}>
          <SkeletonLinePlaceholder height="1.5rem" />
          <SkeletonRowWrapper noGradient={true}>
            <SkeletonLinePlaceholder width="5rem" height="1.25rem" />
            <SkeletonLinePlaceholder width="5rem" height="1.25rem" />
            <SkeletonLinePlaceholder width="5rem" height="1.25rem" />
            <SkeletonLinePlaceholder width="5rem" height="1.25rem" />
          </SkeletonRowWrapper>
        </SkeletonColumnWrapper>
      </SkeletonRowWrapper>
      <SkeletonRowWrapper key={`${keyPrefix}-4`}>
        <SkeletonSquarePlaceholder height="9.5rem" width="17.75rem" />
        <SkeletonColumnWrapper noGradient={true}>
          <SkeletonLinePlaceholder height="1.5rem" />
          <SkeletonRowWrapper noGradient={true}>
            <SkeletonLinePlaceholder width="5rem" height="1.25rem" />
            <SkeletonLinePlaceholder width="5rem" height="1.25rem" />
            <SkeletonLinePlaceholder width="5rem" height="1.25rem" />
            <SkeletonLinePlaceholder width="5rem" height="1.25rem" />
          </SkeletonRowWrapper>
        </SkeletonColumnWrapper>
      </SkeletonRowWrapper>
      <SkeletonRowWrapper key={`${keyPrefix}-5`}>
        <SkeletonSquarePlaceholder height="9.5rem" width="17.75rem" />
        <SkeletonColumnWrapper noGradient={true}>
          <SkeletonLinePlaceholder height="1.5rem" />
          <SkeletonRowWrapper noGradient={true}>
            <SkeletonLinePlaceholder width="5rem" height="1.25rem" />
            <SkeletonLinePlaceholder width="5rem" height="1.25rem" />
            <SkeletonLinePlaceholder width="5rem" height="1.25rem" />
            <SkeletonLinePlaceholder width="5rem" height="1.25rem" />
          </SkeletonRowWrapper>
        </SkeletonColumnWrapper>
      </SkeletonRowWrapper>
    </Container>
  );
};

export default SkeletonBlogList;
