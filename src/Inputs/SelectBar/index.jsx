/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { forwardRef } from "react";
import PropTypes from "prop-types";
import ScrollableSection from "../../Utility/ScrollableSection";
import Button from "../../General/Button/Button";
import Icon from "../../General/Icon/Icon";
import { isDefined } from "../../_utils/utils";

const SelectBar = forwardRef((props, ref) => {
  const {
    allButton = true,
    items = [],
    selectedIds = [],
    onSelect = () => {},
    onRemove = () => {},
    onSelectAll = () => {},
    className,
    showTimesBtn = false,
    labelKey = "label",
    valueKey = "value",
    codeKey = "code",
    uniqueKey,
    typeKey,
    productsToolbarName = "All",
    ...rest
  } = props;

  const handleClick = (value, label, code, unique, type) => {
    if (selectedIds?.includes(value)) {
      onRemove(value, label, code, unique, type);
    } else {
      onSelect(value, label, code, unique, type);
    }
  };

  return (
    <ScrollableSection
      arrowsVisibleOnHover={false}
      className={className}
      columnGap="0.75rem"
      padding={"0.25rem 0"}
      rightAlignArrows={true}
      showTimesBtn={showTimesBtn}
      {...rest}
    >
      {allButton && (
        <Button
          borderRadius="curved"
          btnType={selectedIds.length === 0 ? "filled" : "tinted"}
          className="badge-button"
          color="neutral"
          onClick={onSelectAll}
        >
          {productsToolbarName}
        </Button>
      )}
      {items.map((item, index) => (
        <Button
          key={index}
          borderRadius="curved"
          btnType={selectedIds.includes(item.uuid) ? "filled" : "tinted"}
          className="badge-button"
          color="neutral"
          onClick={() =>
            handleClick(
              item[valueKey],
              item[labelKey],
              item[codeKey],
              uniqueKey ? item[uniqueKey] : null,
              typeKey ? item[typeKey] : null
            )
          }
        >
          {isDefined(item?.icon) && (
            <>
              <i className={item?.icon} />
              &nbsp;
            </>
          )}
          {item[labelKey]}
          {showTimesBtn === true && (
            <Icon
              className="times-btn"
              icon="times"
              sizeInUnits="0.75rem"
              onClick={() =>
                onRemove(
                  item[valueKey],
                  item[labelKey],
                  item[codeKey],
                  uniqueKey ? item[uniqueKey] : null,
                  typeKey ? item[typeKey] : null
                )
              }
            />
          )}
        </Button>
      ))}
    </ScrollableSection>
  );
});

SelectBar.propTypes = {
  allButton: PropTypes.bool,
  items: PropTypes.array,
  selectedIds: PropTypes.array,
  onSelect: PropTypes.func,
  onRemove: PropTypes.func,
  onSelectAll: PropTypes.func,
  className: PropTypes.string,
  showTimesBtn: PropTypes.bool,
  valuKey: PropTypes.string,
  labelKey: PropTypes.string,
  codeKey: PropTypes.string,
};

export default SelectBar;
