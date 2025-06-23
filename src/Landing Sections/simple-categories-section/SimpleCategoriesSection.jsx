/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { forwardRef } from "react";
import { GridWrapper } from "./style";
import useDetectMobile from "../../_utils/useDetectMobile";
import { isDefinedNotEmptyString } from "../../_utils/utils";
import { RegulatTitleSectionWrapper } from "../style";
import Button from "../../General/Button/Button";
import CategorySimpleCard from "../../Landing Components/category-components/category-simple-card/CategorySimpleCard";

const SimpleCategoriesSection = forwardRef((props, ref) => {
  const {
    icon,
    title = "Shop by category",
    items,
    buttonText,
    buttonLink,
    limit = 12,
    onButtonAction = () => {},
    onSelectCard = () => {},
  } = props;
  const isMobile = useDetectMobile();

  return (
    <RegulatTitleSectionWrapper ref={ref}>
      <div className="regular-title">
        <div className="regular-title-text">
          {isDefinedNotEmptyString(icon) && <i className={icon} />}
          <span>{title}</span>
        </div>
        {isDefinedNotEmptyString(buttonLink) && (
          <Button
            type="button"
            btnType="tinted"
            color="gray"
            onClick={() => onButtonAction(buttonLink)}
            borderRadius="curved"
          >
            {buttonText}
          </Button>
        )}
      </div>
      <GridWrapper limit={limit}>
        {isMobile === true
          ? items?.map((x, index) => (
              <CategorySimpleCard
                key={index}
                uuid={x?.uuid}
                image={x?.image}
                name={x?.name}
                onSelectCard={() => onSelectCard?.(x?.uuid)}
              />
            ))
          : items
              ?.slice(0, limit)
              .map((x, index) => (
                <CategorySimpleCard
                  key={index}
                  uuid={x?.uuid}
                  image={x?.image}
                  name={x?.name}
                  onSelectCard={() => onSelectCard?.(x?.uuid)}
                />
              ))}
      </GridWrapper>
    </RegulatTitleSectionWrapper>
  );
});

export default SimpleCategoriesSection;
