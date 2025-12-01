/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { forwardRef, memo, useMemo } from "react";
import { GridWrapper } from "./style";
import useDetectMobile from "../../../_utils/useDetectMobile";
import SimpleProductCard from "../../../Landing Components/product components/simple-product-card";
import TextBlockV1 from "../../../Landing Components/text-block-v1/index";
import SuspenseSimpleProductCard from "../../../Landing Components/skeleton-components/product-skeletons/suspense-product-card-simple";

const MemoizedProductCard = memo(SimpleProductCard);

const SimpleProductsSection = forwardRef((props, ref) => {
  const {
    title,
    subtitle,
    description,
    buttonText,
    buttonLink,
    items,
    onButtonAction = () => {},
    onSelectCard = () => {},
    isLoading = false,
    limit = 6,
    getImage = () => {},
    negotiableText,
    freeText,
  } = props;

  const isMobile = useDetectMobile();
  const memoizedProducts = useMemo(() => {
    return (
      <>
        {isMobile === true
          ? items
              ?.slice(0, 4)
              ?.map((x, index) => (
                <MemoizedProductCard
                  key={index}
                  title={x?.name}
                  price={x?.price}
                  isFree={x?.isFree}
                  isNegotiable={x?.isNegotiable}
                  currency={x?.currency}
                  sellerUuid={x?.sellerUuid}
                  uuid={x?.uuid}
                  onSelectCard={() =>
                    onSelectCard({ uuid: x?.uuid, nameSlug: x?.nameSlug })
                  }
                  image={getImage(x?.image, x?.uuid, x?.sellerUuid) || null}
                  negotiableText={negotiableText}
                  freeText={freeText}
                />
              ))
          : items
              ?.slice(0, 9)
              ?.map((x, index) => (
                <MemoizedProductCard
                  key={index}
                  title={x?.name}
                  price={x?.price}
                  isFree={x?.isFree}
                  isNegotiable={x?.isNegotiable}
                  currency={x?.currency}
                  sellerUuid={x?.sellerUuid}
                  uuid={x?.uuid}
                  onSelectCard={() =>
                    onSelectCard({ uuid: x?.uuid, nameSlug: x?.nameSlug })
                  }
                  image={getImage(x?.image, x?.uuid, x?.sellerUuid) || null}
                  negotiableText={negotiableText}
                  freeText={freeText}
                />
              ))}
      </>
    );
  }, [items, isMobile, limit]);

  return (
    <GridWrapper ref={ref} limit={limit}>
      <TextBlockV1
        subtitle={subtitle}
        title={title}
        description={description}
        buttonText={buttonText}
        buttonLink={buttonLink}
        onButtonAction={onButtonAction}
        className="text-block-v1"
      />
      <SuspenseSimpleProductCard
        isLoading={isLoading}
        limit={limit}
        keyPrefix={"explore-landing"}
      >
        {memoizedProducts}
      </SuspenseSimpleProductCard>
    </GridWrapper>
  );
});

export default SimpleProductsSection;
