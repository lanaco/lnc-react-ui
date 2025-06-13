/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { useTheme } from "@emotion/react";
import StarRating from "src/ui/components/star-rating";
import { Wrapper } from "./style";
import { forwardRef, Fragment } from "react";
import { isDefined } from "../../../_utils/utils";

const ShopCard = forwardRef(
  (
    {
      uuid,
      image,
      title,
      subtitle,
      badges,
      rating,
      reviewCount,
      products,
      shopImageComponent,
      onSelectCard = () => {},
    },
    ref
  ) => {
    const theme = useTheme();

    return (
      <>
        {/* <LandingPageShopCardSkeleton /> */}
        <Wrapper theme={theme} onClick={onSelectCard}>
          <div className="wrapper__tile">
            {isDefined(shopImageComponent) ? (
              shopImageComponent
            ) : (
              <img src={image} />
            )}
            <div className="wrapper__info">
              <div className="info__title">{title}</div>
              <div className="info__subtitle">{subtitle}</div>
              {badges && <div className="info__badges"></div>}
              {rating && reviewCount && (
                <StarRating
                  className="info__rating"
                  rating={rating}
                  reviewCount={reviewCount}
                />
              )}
            </div>
          </div>
          <div className="wrapper__products">
            {products &&
              products?.map((product, index) => (
                <Fragment key={index}>
                  <div
                    className="wrapper__product"
                    onClick={() => product?.onSelectProduct?.(product?.uuid)}
                  >
                    {product?.imageComponent}
                  </div>
                </Fragment>
              ))}
          </div>
        </Wrapper>
      </>
    );
  }
);

export default ShopCard;
