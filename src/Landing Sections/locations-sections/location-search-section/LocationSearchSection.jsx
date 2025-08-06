/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { forwardRef, Fragment } from "react";
import { Content, Group, Wrapper } from "./style";
import SelectBar from "../../../Inputs/SelectBar";

const LocationSearchSection = forwardRef((props, ref) => {
  const {
    title,
    items,
    options,
    selectedOption = [],
    onSelectRegion = () => {},
    onSelectCity = () => {},
    onSelectOption = () => {},
    onSelectAll = () => {},
    productsToolbarName = "All",
  } = props;

  return (
    <Wrapper ref={ref}>
      <div className="wrapper-title">{title}</div>
      {options?.length > 0 && (
        <SelectBar
          items={options}
          selectedIds={selectedOption}
          onSelect={(x, y) => {
            onSelectOption(x, y);
          }}
          onSelectAll={onSelectAll}
          labelKey={"name"}
          valueKey={"code"}
          noMargin={true}
          productsToolbarName={productsToolbarName}
        />
      )}
      <Content>
        {items?.map((x, index) => (
          <Group key={index}>
            <div className="region" onClick={() => onSelectRegion(x)}>
              {x?.name}
            </div>
            <div className="group-items">
              {x?.cities?.map((city, i) => (
                <Fragment key={index + i}>
                  <div className="city" onClick={() => onSelectCity(city)}>
                    <span>{city?.name}</span>
                    <span className="count-txt">
                      {"("}
                      {city?.count}
                      {")"}
                    </span>
                  </div>
                </Fragment>
              ))}
            </div>
          </Group>
        ))}
      </Content>
    </Wrapper>
  );
});

export default LocationSearchSection;
