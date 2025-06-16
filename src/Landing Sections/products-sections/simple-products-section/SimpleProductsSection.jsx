/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { forwardRef } from "react";
import { GridWrapper } from "./style";
import useDetectMobile from "../../../_utils/useDetectMobile";
import SimpleProductCard from "../../../Landing Components/product components/simple-product-card";
import TextBlockV1 from "../../../Landing Components/text-block-v1/index";

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
  } = props;

  const isMobile = useDetectMobile();

  return (
    <GridWrapper ref={ref} limit={6}>
      <TextBlockV1
        subtitle={subtitle}
        title={title}
        description={description}
        buttonText={buttonText}
        buttonLink={buttonLink}
        onButtonAction={onButtonAction}
        className="text-block-v1"
      />
      {isMobile === true
        ? items
            ?.slice(0, 4)
            ?.map((x, index) => (
              <SimpleProductCard
                key={index}
                title={x?.title}
                price={x?.price}
                currency={x?.currency}
                image={x?.image}
                sellerUuid={x?.sellerUuid}
                uuid={x?.uuid}
                onSelectCard={() => onSelectCard?.(x?.uuid)}
              />
            ))
        : items?.map((x, index) => (
            <SimpleProductCard
              key={index}
              title={x?.title}
              price={x?.price}
              currency={x?.currency}
              image={x?.image}
              sellerUuid={x?.sellerUuid}
              uuid={x?.uuid}
              onSelectCard={() => onSelectCard?.(x?.uuid)}
            />
          ))}
    </GridWrapper>
  );
});

export default SimpleProductsSection;
