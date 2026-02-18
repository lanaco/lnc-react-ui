/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { forwardRef } from "react";

import Carousel from "react-multi-carousel";

import "react-multi-carousel/lib/styles.css";


import Button from "../../../General/Button/Button";
import useDetectMobile from "../../../_utils/useDetectMobile";
import { Container } from "./style";
import SuspenseBannerSectionCarousel from "../../../Landing Components/skeleton-components/banner/banner-section-carousel";

const BannerSectionCarousel = forwardRef(
  (
    {
      items = [],
      isLoading = false,
      deviceType,
      partialVisible = true,
      fallbackComponent = <></>,
      onSelectItem = () => {},
      onButtonAction = () => {},
      carouselProps,
    },
    ref,
  ) => {
    const responsive = {
      desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 1,
        partialVisibilityGutter: 0,
      },
      tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 1,
        partialVisibilityGutter: 0,
      },
      mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
        partialVisibilityGutter: 64,
      },
    };

    const isMobile = useDetectMobile();

    return (
      <Container key={`banner-section-carousel__${isMobile}`} ref={ref}>
        <SuspenseBannerSectionCarousel
          fallbackComponent={fallbackComponent}
          keyPrefix="banner-carousel-skeleton"
          isLoading={isLoading}
        >
          <Carousel
            responsive={responsive}
            deviceType={deviceType}
            removeArrowOnDeviceType={["tablet", "mobile"]}
            infinite={!isMobile}
            keyBoardControl={true}
            autoPlay={true}
            partialVisible={partialVisible}
            customTransition="transform 500ms ease-in-out"
            sliderClass="carousel-slider"
            itemClass="carousel-item"
            containerClass="carousel-container"
            rewind={true}
            rewindWithAnimation={true}
            {...carouselProps}
          >
            {items?.map((item, idx) => (
              <div
                key={`banner-section-carousel-item__${idx + 1}`}
                className="section__card"
                onClick={() => onSelectItem(item)}
              >
                <img
                  src={item?.imageUrl}
                  alt={`Slide ${idx + 1}`}
                  className="section__image"
                />
                <div className="card__content">
                  <div className="card__text">
                    {item?.title && (
                      <div className="card__title">{item?.title}</div>
                    )}
                    {item?.title && (
                      <div className="card__description">
                        {item?.description}
                      </div>
                    )}
                  </div>
                  {item?.buttonText && (
                    <Button
                      text={item?.buttonText}
                      className="card__action"
                      size="medium"
                      onClick={(e) => {
                        e?.stopPropagation();

                        onButtonAction(item);
                      }}
                    />
                  )}
                </div>
              </div>
            ))}
          </Carousel>
        </SuspenseBannerSectionCarousel>
      </Container>
    );
  },
);

export default BannerSectionCarousel;
