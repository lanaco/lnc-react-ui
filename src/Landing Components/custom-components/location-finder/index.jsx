/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import { forwardRef, useState } from "react";
import { ContentWrapper, OptionItem, OptionsWrapper, Wrapper } from "./style";
import useDetectMobile from "../../../_utils/useDetectMobile";
import Button from "../../../General/Button/Button";
import MapImage from "../../../assets/images/map-image.png";
import { isDefined, isDefinedNotEmptyString } from "../../../_utils/utils";

const LocationFinder = forwardRef(
  (
    {
      title = "Find your ideal property location",
      placeholderText = "Enter location",
      openMapText = "Open map",
      onOpenMap = () => {},
      mapFilters = [
        { icon: "mng-lnc-house", code: "RealEstates_Houses" },
        { icon: "mng-lnc-building", code: "RealEstates_Apartments" },
        { icon: "mng-lnc-vacation", code: "RealEstates_Land" },
        { icon: "mng-lnc-garage", code: "RealEstates_Garages" },
      ],
      inputComponent,
    },
    ref
  ) => {
    const isMobile = useDetectMobile();
    const [location, setLocation] = useState(null);

    const [selectedFilter, setSelectedFilter] = useState(null);

    const handleSearchMap = () => {
      let path = "/search-page/products?v=map&type=Product";

      if (isDefinedNotEmptyString(selectedFilter)) {
        path += `&categoryCode=${selectedFilter}`;
      }

      if (isDefinedNotEmptyString(location)) {
        path += `&queryText=${location}`;
      }

      onOpenMap(path);
    };

    return (
      <Wrapper className="location-finder">
        <ContentWrapper>
          <img src={MapImage} />
          {isMobile === true && (
            <div className="cont">
              <span className="content-title">{title}</span>
            </div>
          )}
        </ContentWrapper>
        <ContentWrapper className="right-content">
          {isMobile !== true && (
            <div className="cont">
              <span className="content-title">{title}</span>
            </div>
          )}
          <div className="content-row">
            {isDefined(inputComponent) ? (
              inputComponent
            ) : (
              <input
                className="input-amount"
                type="text"
                placeholder={placeholderText}
                onChange={(e) => {
                  setLocation(e?.target?.value);
                }}
                value={location?.toString()}
              />
            )}
            <Button
              type="button"
              size="medium"
              color="neutral"
              onClick={handleSearchMap}
            >
              {openMapText}
            </Button>
          </div>
          {isMobile !== true && (
            <OptionsWrapper>
              {mapFilters?.map((x, index) => (
                <OptionItem
                  key={index}
                  selected={selectedFilter === x?.code}
                  onClick={() => setSelectedFilter(x?.code)}
                >
                  <i className={x?.icon} />
                </OptionItem>
              ))}
            </OptionsWrapper>
          )}
        </ContentWrapper>
        {isMobile === true && (
          <OptionsWrapper>
            {mapFilters?.map((x, index) => (
              <OptionItem
                key={index}
                selected={selectedFilter === x?.code}
                onClick={() => setSelectedFilter(x?.code)}
              >
                <i className={x?.icon} />
              </OptionItem>
            ))}
          </OptionsWrapper>
        )}
      </Wrapper>
    );
  }
);

export default LocationFinder;
