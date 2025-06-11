/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { forwardRef, useState } from "react";
import { GridWrapper } from "./style";
import useDetectMobile from "../../../_utils/useDetectMobile";
import Button from "../../../General/Button/Button";
import DetailedProductCard from "../../../Landing Components/product components/detailed-product-card";

const UrgentSaleProductsSection = forwardRef((props, ref) => {
  const {
    items,
    limit = 5,
    limitMobile = 6,
    onSelectCard = () => {},
    title = "Urgent sale",
    showLessText = "Show less",
    showMoreText = "Show more",
  } = props;

  const isMobile = useDetectMobile();

  const [showAll, setShowAll] = useState(false);

  return (
    <GridWrapper ref={ref} limit={limit}>
      <div className="urgent-tag">
        <i className="mng mng-lnc-bolt-filled" />
        <span>{title}</span>
      </div>
      {isMobile === true
        ? items
            ?.slice(0, showAll === true ? items?.length : limitMobile)
            ?.map((x, index) => (
              <DetailedProductCard
                key={index}
                title={x?.title}
                price={x?.price}
                currency={x?.currency}
                image={x?.image}
                sellerUuid={x?.sellerUuid}
                uuid={x?.uuid}
                isSponsored={x?.isSponsored}
                onSelectCard={() => onSelectCard?.(x?.uuid)}
              />
            ))
        : items
            ?.slice(0, limit)
            .map((x, index) => (
              <DetailedProductCard
                key={index}
                title={x?.title}
                price={x?.price}
                currency={x?.currency}
                image={x?.image}
                sellerUuid={x?.sellerUuid}
                uuid={x?.uuid}
                location={x?.location}
                isSponsored={x?.isSponsored}
                onSelectCard={() => onSelectCard?.(x?.uuid)}
              />
            ))}

      {isMobile === true && limitMobile < items?.length && (
        <Button
          className="show-more"
          btnType="basic"
          type="button"
          color="gray"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll === true ? showLessText : showMoreText}
        </Button>
      )}
    </GridWrapper>
  );
});

export default UrgentSaleProductsSection;
