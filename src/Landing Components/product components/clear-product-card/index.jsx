/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable no-empty-pattern */
/* eslint-disable react/display-name */
import { forwardRef, useRef } from "react";
import { Wrapper } from "./style";
import { isDefined } from "../../../_utils/utils";
import ProductImageWrapper from "../../product-img-wrapper";

const ClearProductCard = forwardRef((props, ref) => {
  const {
    uuid,
    title,
    image,
    sellerUuid,
    onSelectCard = () => {},
    imageComponent,
    metadata,
  } = props;

  const productCardRef = useRef(null);

  return (
    <Wrapper
      ref={productCardRef}
      className="product-card"
      name={metadata?.name}
      data-accessor={metadata?.accessor}
      onClick={(e) => onSelectCard(e, ref)}
    >
      {isDefined(imageComponent) ? (
        imageComponent
      ) : (
        <ProductImageWrapper src={image} />
      )}
      <div className="card-title">{title}</div>
    </Wrapper>
  );
});

export default ClearProductCard;
