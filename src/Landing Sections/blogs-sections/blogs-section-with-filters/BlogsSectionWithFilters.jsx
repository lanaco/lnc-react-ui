import { forwardRef } from "react";
import { GridWrapper } from "./style";
import useDetectMobile from "../../../_utils/useDetectMobile";
import { isDefinedNotEmptyString } from "../../../_utils/utils";
import { TitleWithOptionsSectionWrapper } from "../../style";
import Button from "../../../General/Button/Button";
import SimpleBlogCardHorizontal from "../../../Landing Components/blog-components/simple-blog-card-horizontal";
import SelectBar from "../../../Inputs/SelectBar";

const BlogsSectionWithFilters = forwardRef((props, ref) => {
  const {
    icon,
    title,
    items,
    buttonText,
    limit = 3,
    options,
    onActionClick = () => {},
    onSelectOption = () => {},
  } = props;
  const isMobile = useDetectMobile();

  return (
    <TitleWithOptionsSectionWrapper>
      <div className="regular-title">
        <div className="regular-title-text">
          {isDefinedNotEmptyString(icon) && <i className={icon} />}
          <span>{title}</span>
        </div>
        {isDefinedNotEmptyString(onSectionClick) && (
          <Button
            type="button"
            btnType="tinted"
            color="gray"
            onClick={onActionClick}
            borderRadius="curved"
          >
            {buttonText}
          </Button>
        )}
      </div>
      {options?.length > 0 && (
        <SelectBar
          // items={dataExplore?.map((item) => ({
          //   ...item,
          // }))}
          items={options}
          // selectedIds={selectedExploreCategoriesIds}
          onRemove={(id) => {
            onSelectOption(id);
            // setSelectedExploreCategoriesIds([
            //   ...selectedExploreCategoriesIds.filter((x) => x != id),
            // ])
          }}
          onSelect={(id) => {
            onSelectOption(id);
            // setSelectedExploreCategoriesIds([id]);
          }}
          // onSelectAll={() => setSelectedExploreCategoriesIds([])}
          labelKey={"name"}
          valueKey={"code"}
          noMargin={true}
        />
      )}
      <GridWrapper limit={limit}>
        {isMobile === true
          ? items?.map((x, index) => (
              <SimpleBlogCardHorizontal
                key={index}
                title={x?.title}
                image={x?.image}
                text={x?.text}
                titleSlug={x?.titleSlug}
                buttonText={x?.buttonText}
                onCardClick={() => onSelectCard(x?.uuid)}
              />
            ))
          : items
              ?.slice(0, limit)
              .map((x, index) => (
                <SimpleBlogCardHorizontal
                  key={index}
                  title={x?.title}
                  image={x?.image}
                  text={x?.text}
                  titleSlug={x?.titleSlug}
                  buttonText={x?.buttonText}
                  onCardClick={() => onSelectCard(x?.uuid)}
                />
              ))}
      </GridWrapper>
    </TitleWithOptionsSectionWrapper>
  );
});

export default BlogsSectionWithFilters;
