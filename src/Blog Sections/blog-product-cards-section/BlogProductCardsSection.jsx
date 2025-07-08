import { forwardRef, memo, useMemo } from "react";

import useDetectMobile from "../../_utils/useDetectMobile";
import SimpleProductCard from "../../Landing Components/product components/simple-product-card";
import SuspenseSimpleProductCard from "../../Landing Components/skeleton-components/product-skeletons/suspense-product-card-simple";
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
      isHighlight = true,
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
            onSelectCard={() => onSelectCard?.(x?.uuid)}
            image={getImage(x?.image, x?.uuid, x?.sellerUuid) || null}
          />
        ));
    }, [items]);

    return (
      <Wrapper className={isHighlight ? "highlight" : ""}>
        <div className="wrapper__grid">
          <SuspenseSimpleProductCard
            isLoading={isLoading}
            limit={limit}
            keyPrefix="blog-section"
          >
            {memoizedProducts}
          </SuspenseSimpleProductCard>
        </div>
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
