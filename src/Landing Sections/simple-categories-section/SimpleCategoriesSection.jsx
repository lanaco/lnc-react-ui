import { forwardRef } from "react";
import { GridWrapper } from "./style";
import useDetectMobile from "../../_utils/useDetectMobile";
import { isDefinedNotEmptyString } from "../../_utils/utils";
import { RegulatTitleSectionWrapper } from "../style";
import Button from "../../General/Button/Button";
import CategorySimpleCard from "../../Landing Components/category-components/category-simple-card";

const SimpleCategoriesSection = forwardRef((props, ref) => {
  const {
    icon,
    title = "Shop by category",
    items,
    buttonText,
    limit = 12,
    handleOnClick,
  } = props;
  const isMobile = useDetectMobile();

  return (
    <RegulatTitleSectionWrapper>
      <div className="regular-title">
        <div className="regular-title-text">
          {isDefinedNotEmptyString(icon) && <i className={icon} />}
          <span>{title}</span>
        </div>
        {!!handleOnClick && (
          <Button
            type="button"
            btnType="tinted"
            color="gray"
            onClick={handleOnClick}
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
                onSelectCard={() => onSelectCard?.(y?.uuid)}
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
                  onSelectCard={() => onSelectCard?.(y?.uuid)}
                />
              ))}
      </GridWrapper>
    </RegulatTitleSectionWrapper>
  );
});

export default SimpleCategoriesSection;
