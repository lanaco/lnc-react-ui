/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { forwardRef, memo, useMemo } from "react";
import { GridWrapper } from "./style";
import useDetectMobile from "../../../_utils/useDetectMobile";
import { isDefinedNotEmptyString } from "../../../_utils/utils";
import { TitleWithOptionsSectionWrapper } from "../../style";
import Button from "../../../General/Button/Button";
import SimpleBlogCardHorizontal from "../../../Landing Components/blog-components/simple-blog-card-horizontal";
import SelectBar from "../../../Inputs/SelectBar";
import SuspenseBlogWithFilters from "../../../Landing Components/skeleton-components/blog-skeletons/suspense-with-filters";

const MemoizedProductCard = memo(SimpleBlogCardHorizontal);

const BlogsSectionWithFilters = forwardRef((props, ref) => {
  const {
    icon,
    title,
    items,
    buttonText,
    limit = 3,
    options,
    selectedOption = [],
    onButtonAction = () => {},
    buttonLink,
    onSelectOption = () => {},
    isLoading = false,
    onSelectCard = () => {},
  } = props;

  const isMobile = useDetectMobile();
  const memoizedProducts = useMemo(() => {
    return (
      <>
        {isMobile === true
          ? items?.map((x, index) => (
              <MemoizedProductCard
                key={index}
                title={x?.title}
                imageUrl={x?.image || null}
                text={x?.text}
                buttonText={x?.buttonText}
                onCardClick={() => onSelectCard(x)}
              />
            ))
          : items
              ?.slice(0, limit)
              .map((x, index) => (
                <MemoizedProductCard
                  key={index}
                  title={x?.title}
                  imageUrl={x?.image || null}
                  text={x?.text}
                  buttonText={x?.buttonText}
                  onCardClick={() => onSelectCard(x)}
                />
              ))}
      </>
    );
  }, [items, isMobile, limit, onSelectCard]);

  return (
    <TitleWithOptionsSectionWrapper ref={ref}>
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
      {options?.length > 0 && (
        <SelectBar
          items={options}
          selectedIds={selectedOption}
          onRemove={(item) => {
            onSelectOption(item);
          }}
          onSelect={(item) => {
            onSelectOption(item);
          }}
          labelKey={"name"}
          valueKey={"code"}
          noMargin={true}
        />
      )}
      <GridWrapper limit={limit}>
        <SuspenseBlogWithFilters
          isLoading={isLoading}
          limit={limit}
          keyPrefix={"explore-landing"}
        >
          {memoizedProducts}
        </SuspenseBlogWithFilters>
      </GridWrapper>
    </TitleWithOptionsSectionWrapper>
  );
});

export default BlogsSectionWithFilters;
