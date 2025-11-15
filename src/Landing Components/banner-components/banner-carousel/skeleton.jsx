import { SkeletonContainer } from "./style";

const BannerCarouselSkeleton = () => {
  return (
    <SkeletonContainer className="banner-carousel__skeleton">
      <div className="skeleton__active-slide"></div>
      <div className="skeleton__next-slide"></div>
    </SkeletonContainer>
  );
};

export default BannerCarouselSkeleton;
