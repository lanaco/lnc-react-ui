import { forwardRef } from "react";
import { Carousel } from "react-responsive-carousel";
import PropTypes from "prop-types";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import useDetectMobile from "../../../_utils/useDetectMobile";
import { Wrapper, Banner, BannerOverlay } from "./style";

const BannerSectionCarousel = forwardRef(
  ({ items = [], onSelectItem = () => {} }, ref) => {
    const isMobile = useDetectMobile();

    return (
      <Wrapper>
        <Carousel
          autoPlay={true}
          infiniteLoop={true}
          showArrows={false}
          showStatus={false}
          showThumbs={false}
          transitionTime={500}
          onClickItem={(idx) => {
            if (!isMobile) {
              onSelectItem?.(items?.at(idx), idx);
            }
          }}
        >
          {items &&
            items?.map((b, idx) => (
              <Banner key={`banner-${idx + 1}`}>
                <img loading="lazy" src={b.image} />
                <BannerOverlay>
                  <div className="banner-content">
                    <div className="banner-text">
                      <div className="banner-title">{b.title}</div>
                      {b.description}
                    </div>
                    {/*<Button
                  color="neutral"
                  trailingIcon="arrow-right"
                  onClick={() => handleClick(b)}
                >
                  {b.actionText}
                </Button>*/}
                  </div>
                </BannerOverlay>
              </Banner>
            ))}
        </Carousel>
      </Wrapper>
    );
  }
);

BannerSectionCarousel.propTypes = {
  items: PropTypes.array,
  handleClick: PropTypes.func,
};

export default BannerSectionCarousel;
