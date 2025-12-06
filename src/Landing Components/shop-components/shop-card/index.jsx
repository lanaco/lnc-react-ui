/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import { forwardRef, Fragment, useEffect, useRef } from "react";

import Icon from "../../../General/Icon/Icon";
import { isDefined } from "../../../_utils/utils";
import { Wrapper } from "./style";
import DefaultShopImage from "../../../assets/images/ShopAvatar.svg";
import ProductImageWrapper from "../../product-img-wrapper";

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
      hideProducts = false,
      showRating = true,
    },
    ref
  ) => {
    const shopImgRef = useRef();

    useEffect(() => {
      const onErrorImage = (event) => {
        event.target.src = DefaultShopImage;
        event.onerror = null;
      };

      shopImgRef?.current?.addEventListener("error", onErrorImage);

      return () => {
        shopImgRef?.current?.removeEventListener("error", onErrorImage);
      };
    }, []);

    return (
      <Wrapper ref={ref} onClick={onSelectCard}>
        <div className="wrapper__content">
          {isDefined(imageComponent) ? (
            imageComponent
          ) : image ? (
            <img ref={shopImgRef} src={image} className="wrapper__image" />
          ) : (
            <img src={DefaultShopImage} className="wrapper__image" />
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

            {showRating && (
              <div className="wrapper__rating">
                <div className="wrapper_stars">
                  {[...Array(5).keys()]?.map((star, idx) => (
                    <Icon
                      key={`shop-card-rating-star__${idx + 1}`}
                      icon={" mng-lnc-star--filled"}
                      className={`wrapper__star ${
                        star >= rating ? "gold-star" : ""
                      }`}
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
        {hideProducts !== true && (
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
                      <ProductImageWrapper
                        src={getProductImage(
                          product?.image,
                          product?.uuid,
                          uuid
                        )}
                        className="product__image"
                      />
                    )}
                  </div>
                </Fragment>
              ))}
          </div>
        )}
      </Wrapper>
    );
  }
);

export default ShopCard;
