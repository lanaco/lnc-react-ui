/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import { forwardRef, Fragment } from "react";

import Icon from "../../../General/Icon/Icon";
import { isDefined } from "../../../_utils/utils";
import { Wrapper } from "./style";

const ShopCard = forwardRef(
  (
    {
      uuid,
      image,
      imageComponent,
      title,
      subtitle,
      badges,
      rating,
      reviewCount,
      products,
      onSelectCard = () => {},
      getProductImage = () => {},
      canAcceptPayments,
    },
    ref
  ) => {
    return (
      <Wrapper ref={ref} onClick={onSelectCard}>
        <div className="wrapper__content">
          {isDefined(imageComponent) ? (
            imageComponent
          ) : (
            <img src={image} className="wrapper__image" />
          )}
          <div className="wrapper__info">
            <div className="wrapper__title">
              {title}&nbsp;
              {canAcceptPayments && (
                <Icon color={"secondary"} icon="credit-card" className="card" />
              )}
            </div>
            <div className="wrapper__subtitle">{subtitle}</div>
            {badges && <div className="wrapper__badges"></div>}
            {rating && reviewCount && (
              <div className="wrapper__rating">
                <div className="wrapper_stars">
                  {[...Array(5).keys()]?.map((star, idx) => (
                    <Icon
                      key={`shop-card-rating-star__${idx + 1}`}
                      icon={
                        star < rating
                          ? " mng-lnc-star--filled"
                          : " mng-lnc-star"
                      }
                      className="wrapper__star"
                    />
                  ))}
                </div>
                <div className="wrapper__review-count">
                  ({reviewCount?.toLocaleString()})
                </div>
              </div>
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
                  {isDefined(product?.imageComponent) ? (
                    product?.imageComponent
                  ) : (
                    <img
                      src={getProductImage(product?.image, product?.uuid, uuid)}
                      className="product__image"
                    />
                  )}
                </div>
              </Fragment>
            ))}
        </div>
      </Wrapper>
    );
  }
);

export default ShopCard;
