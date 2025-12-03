/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable no-empty-pattern */
/* eslint-disable react/display-name */
import { forwardRef } from "react";
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
  } = props;

  return (
    <Wrapper ref={ref} className="product-card" onClick={onSelectCard}>
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
