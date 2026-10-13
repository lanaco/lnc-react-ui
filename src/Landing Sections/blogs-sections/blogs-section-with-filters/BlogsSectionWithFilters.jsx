/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { forwardRef, memo, useMemo, useState } from "react";
import { FilterPills, GridWrapper } from "./style";
import { isDefinedNotEmptyString } from "../../../_utils/utils";
import { TitleWithOptionsSectionWrapper } from "../../style";
import Button from "../../../General/Button/Button";
import SimpleBlogCardHorizontal from "../../../Landing Components/blog-components/simple-blog-card-horizontal";
import SelectBar from "../../../Inputs/SelectBar";
import SuspenseBlogsSectionWithFilters from "../../../Landing Components/skeleton-components/blog/blogs-section-with-filters";

const MemoizedBlogCard = memo(SimpleBlogCardHorizontal);

const toArray = (value) =>
  Array.isArray(value)
    ? value
    : value === null || value === undefined || value === ""
      ? []
      : [value];

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
    // "pills" (default, matches the web) or "selectBar" (legacy scrolling SelectBar).
    filterVariant = "pills",
  } = props;

  // Pills: when no selectedOption is given, the first option is active.
  const [internalCode, setInternalCode] = useState(null);
  const selectedCodes = toArray(selectedOption);
  const activeCode =
    selectedCodes.length > 0
      ? selectedCodes[0]
      : internalCode ?? options?.at(0)?.code;

  // All items are rendered; the ones beyond `limit` are hidden with CSS on
  // tablet/desktop and shown in the mobile scroll row (no JS measurement).
  const memoizedProducts = useMemo(() => {
    return (
      <>
        {items?.map((x, index) => (
          <MemoizedBlogCard
            key={index}
            className={index >= limit ? "blog-card--extra" : ""}
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
  }, [items, limit, onSelectCard, componentName, LinkComponent]);

  const gridColumns = Math.min(limit, items?.length || 0) || 1;

  return (
    <TitleWithOptionsSectionWrapper
      ref={ref}
      className="lp-section lp-blogs-section-with-filters"
    >
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
        {options?.length > 0 &&
          (filterVariant === "selectBar" ? (
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
          ) : (
            <FilterPills className="blogs-filters__pills">
              {options.map((option, index) => (
                <button
                  key={option?.code ?? option?.uuid ?? index}
                  type="button"
                  className={`filter-pill${
                    option?.code === activeCode ? " active" : ""
                  }`}
                  aria-pressed={option?.code === activeCode}
                  onClick={(e) => {
                    e?.currentTarget?.blur();
                    setInternalCode(option?.code);
                    onSelectOption(option);
                  }}
                >
                  {option?.name}
                </button>
              ))}
            </FilterPills>
          ))}
        <GridWrapper limit={gridColumns}>{memoizedProducts}</GridWrapper>
      </SuspenseBlogsSectionWithFilters>
    </TitleWithOptionsSectionWrapper>
  );
});

export default BlogsSectionWithFilters;
