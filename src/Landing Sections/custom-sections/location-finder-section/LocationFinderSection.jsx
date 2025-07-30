/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import { forwardRef } from "react";
import LocationFinder from "../../../Landing Components/custom-components/location-finder";

const LocationFinderSection = forwardRef((props, ref) => {
  const {
    locationFinderTitle,
    locationFinderPlaceholder,
    openMapText,
    onOpenMap = () => {},
    mapFilters,
    inputComponent,
  } = props;

  return (
    <LocationFinder
      ref={ref}
      title={locationFinderTitle}
      placeholderText={locationFinderPlaceholder}
      onOpenMap={onOpenMap}
      openMapText={openMapText}
      mapFilters={mapFilters}
      inputComponent={inputComponent}
    />
  );
});

export default LocationFinderSection;
