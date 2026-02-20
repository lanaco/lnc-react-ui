import { forwardRef } from "react";

import Carousel from "react-multi-carousel";

import Button from "../../../General/Button/Button";
import useDetectMobile from "../../../_utils/useDetectMobile";
import { SectionHeadingContainer } from "../../style";
import { Container } from "./style";

const PartnerBrandsSection = forwardRef(
  (
    {
      title,
      buttonText,
      buttonLink,
      items,
      onSelectCard = () => {},
      onButtonAction = () => {},
    },
    ref,
  ) => {
    const isMobile = useDetectMobile();

    const threshold = isMobile ? 2 : 7;
    const shouldScroll = items?.length > threshold;

    return (
      <Container>
        <SectionHeadingContainer>
          {title && <div className="heading__title">{title}</div>}
          {buttonText && buttonLink && (
            <Button
              text={buttonText}
              borderRadius="curved"
              btnType="tinted"
              className="heading__action"
              color="neutral"
              onClick={(e) => {
                e?.target?.blur();
                onButtonAction?.(buttonLink);
              }}
            />
          )}
        </SectionHeadingContainer>
        {items && items?.length > 0 && (
          <div className="section__slider">
            {shouldScroll && <div className="slider__gradient left" />}
            <Carousel
              responsive={{
                desktop: {
                  breakpoint: { max: 9999, min: 801 },
                  items: 7,
                  slidesToSlide: 1,
                  partialVisibilityGutter: 10,
                },
                mobile: {
                  breakpoint: { max: 800, min: 0 },
                  items: 2,
                  slidesToSlide: 1,
                  partialVisibilityGutter: 20,
                },
              }}
              draggable={false}
              swipeable={false}
              arrows={false}
              infinite={shouldScroll}
              autoPlay={shouldScroll}
              autoPlaySpeed={2000}
              partialVisible={shouldScroll}
              customTransition="transform 500ms linear"
              transitionDuration={500}
              containerClass="slider__container"
              itemClass="slider__item"
            >
              {items?.map((item, idx) => (
                <div
                  key={`partner-brands-section-item__${idx + 1}`}
                  className="section__item"
                  onClick={() => onSelectCard(item)}
                >
                  <img
                    src={item?.imageUrl}
                    alt={`Partner brand image ${idx + 1}`}
                    loading="lazy"
                  />
                </div>
              ))}
            </Carousel>
            {shouldScroll && <div className="slider__gradient right" />}
          </div>
        )}
      </Container>
    );
  },
);

export default PartnerBrandsSection;
