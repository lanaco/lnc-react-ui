/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { forwardRef, memo, useMemo } from "react";

import useDetectMobile from "../../_utils/useDetectMobile";
import SimpleProductCard from "../../Landing Components/product components/simple-product-card";
import Button from "../../General/Button/Button";
import { Wrapper } from "../style";

const MemoizedSimpleProductCard = memo(SimpleProductCard);

const BlogProductCardsSection = forwardRef(
  (
    {
      buttonText,
      buttonLink,
      items,
      onButtonAction = () => {},
      onSelectCard = () => {},
      isLoading = false,
      limit = 4,
      getImage = () => {},
      isHighlight = false,
      componentName,
      LinkComponent
    },
    ref
  ) => {
    const isMobile = useDetectMobile();

    const memoizedProducts = useMemo(() => {
      return items
        ?.slice(0, 4)
        ?.map((x, index) => (
          <MemoizedSimpleProductCard
            key={index}
            title={x?.name}
            price={x?.price}
            isFree={x?.isFree}
            isNegotiable={x?.isNegotiable}
            currency={x?.currency}
            sellerUuid={x?.sellerUuid}
            uuid={x?.uuid}
            onSelectCard={(e, cardRef) => onSelectCard?.(x?.uuid, cardRef)}
            image={getImage(x?.image, x?.uuid, x?.sellerUuid) || null}
            metadata={{ name: componentName, accessor: x?.accessor }}
            LinkComponent={LinkComponent}
          />
        ));
    }, [items]);

    return (
      <Wrapper
        ref={ref}
        className={`blog-product-cards-section ${
          isHighlight ? "highlight" : ""
        }`}
      >
        <div className="wrapper__grid">{memoizedProducts}</div>
        <Button
          text={buttonText}
          borderRadius="curved"
          btnType={isMobile ? "basic" : "outline"}
          color="neutral"
          className="wrapper__action"
          onClick={() => onButtonAction(buttonLink)}
        />
      </Wrapper>
    );
  }
);

export default BlogProductCardsSection;
