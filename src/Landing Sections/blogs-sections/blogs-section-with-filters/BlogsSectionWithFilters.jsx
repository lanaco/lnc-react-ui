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
import SuspenseBlogsSectionWithFilters from "../../../Landing Components/skeleton-components/blog/blogs-section-with-filters";

const MemoizedBlogCard = memo(SimpleBlogCardHorizontal);

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
    onSelectAll = () => {},
    isLoading = false,
    onSelectCard = () => {},
    productsToolbarName = "All",
    allButton = false,
    componentName,
    LinkComponent,
  } = props;

  const isMobile = useDetectMobile();

  const memoizedProducts = useMemo(() => {
    return (
      <>
        {isMobile === true
          ? items?.map((x, index) => (
              <MemoizedBlogCard
                key={index}
                title={x?.title}
                imageUrl={x?.image || null}
                text={x?.text}
                buttonText={x?.buttonText}
                onCardClick={(e, cardRef) => onSelectCard(x, cardRef)}
                metadata={{ name: componentName, accessor: x?.accessor }}
                link={x?.link}
                LinkComponent={LinkComponent}
              />
            ))
          : items
              ?.slice(0, limit)
              ?.map((x, index) => (
                <MemoizedBlogCard
                  key={index}
                  title={x?.title}
                  imageUrl={x?.image || null}
                  text={x?.text}
                  buttonText={x?.buttonText}
                  onCardClick={(e, cardRef) => onSelectCard(x, cardRef)}
                  metadata={{ name: componentName, accessor: x?.accessor }}
                  link={x?.link}
                  LinkComponent={LinkComponent}
                />
              ))}
      </>
    );
  }, [items, isMobile, limit]);

  return (
    <TitleWithOptionsSectionWrapper ref={ref}>
      <div className="regular-title">
        <div className="regular-title-text">
          {isDefinedNotEmptyString(icon) && <i className={icon} />}
          <span>{title}</span>
        </div>
        {isDefinedNotEmptyString(buttonText) &&
          isDefinedNotEmptyString(buttonLink) &&
          !isLoading && (
            <Button
              type="button"
              btnType="tinted"
              color="neutral"
              onClick={(e) => {
                e?.target?.blur();
                onButtonAction(buttonLink);
              }}
              borderRadius="curved"
            >
              {buttonText}
            </Button>
          )}
      </div>
      <SuspenseBlogsSectionWithFilters
        isLoading={isLoading}
        keyPrefix="blogs-with-filters-skeleton"
      >
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
            onSelectAll={onSelectAll}
            labelKey={"name"}
            valueKey={"code"}
            noMargin={true}
            productsToolbarName={productsToolbarName}
            allButton={allButton}
          />
        )}
        <GridWrapper limit={limit}>{memoizedProducts}</GridWrapper>
      </SuspenseBlogsSectionWithFilters>
    </TitleWithOptionsSectionWrapper>
  );
});

export default BlogsSectionWithFilters;
