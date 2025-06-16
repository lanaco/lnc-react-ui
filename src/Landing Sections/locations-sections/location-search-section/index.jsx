import { forwardRef, Fragment } from "react";
import { Content, Group, Wrapper } from "./style";
import SelectBar from "../../../Inputs/SelectBar";

const LocationSearchSection = forwardRef((props, ref) => {
  const {
    title,
    items,
    options,
    onSelectRegion = () => {},
    onSelectCity = () => {},
  } = props;

  return (
    <Wrapper>
      <div className="wrapper-title">{title}</div>
      {options?.length > 0 && (
        <SelectBar
          // items={dataExplore?.map((item) => ({
          //   ...item,
          // }))}
          items={options}
          // selectedIds={selectedExploreCategoriesIds}
          onRemove={(id) => {
            // setSelectedExploreCategoriesIds([
            //   ...selectedExploreCategoriesIds.filter((x) => x != id),
            // ])
          }}
          onSelect={(id) => {
            // setSelectedExploreCategoriesIds([id]);
          }}
          // onSelectAll={() => setSelectedExploreCategoriesIds([])}
          labelKey={"name"}
          valueKey={"code"}
          noMargin={true}
        />
      )}
      <Content>
        {items?.map((x, index) => (
          <Group key={index}>
            <div className="region" onClick={() => onSelectRegion(x?.code)}>
              {x?.name}
            </div>
            <div className="group-items">
              {x?.cities?.map((city, i) => (
                <Fragment key={index + i}>
                  <div
                    className="city"
                    onClick={() => onSelectCity(city?.code)}
                  >
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
