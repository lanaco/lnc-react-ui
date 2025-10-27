/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import { useTheme } from "@emotion/react";
import {
  BadgeBar,
  ContentWrapper,
  ImageWrapper,
  StatusBadge,
  Wrapper,
} from "./style";
import PropTypes from "prop-types";
import Icon from "../../../General/Icon/Icon";
import ProfileItem from "./ProfileItem";
import { forwardRef, useState, useEffect } from "react";

const calcDaysDifference = (date1, date2) => {
  if (!date1 || !date2) return null;

  const diffMs = date1.getTime() - date2.getTime();
  const dayMs = 24 * 60 * 60 * 1000;

  return diffMs >= 0 ? Math.ceil(diffMs / dayMs) : Math.floor(diffMs / dayMs);
};

const toLocaleDateString = (date) => {
  if (date !== undefined) {
    const dateTime = new Date(date);

    const year = dateTime.getFullYear();
    const month = dateTime.getMonth() + 1;

    const day = String(dateTime.getDate()).padStart(2);

    return `${day}. ${month}. ${year}.`;
  }
};

const SalesCampaignCard = forwardRef((props, ref) => {
  const theme = useTheme();

  const {
    // uuid,
    shopUuid,
    title = "",
    // description,
    // badges,
    coverPhoto,
    onSelect,
    // status,
    startDate,
    endDate,
    salesPackages,
    shopName,
    shopCategory,
    shopImage,
    className,
    onSelectCard = () => {},
    onSelectShop = () => {},
    upcoming = false,
    upcomingCampaignText,
    campaignSingleText,
    salesCampaignTypes = [],
    startsInPrefixTextPlural,
    startsinSuffixTextPlural,
    startsInPrefixTextSingular,
    startsinSuffixTextSingular,
    endsInPrefixTextPlural,
    endsinSuffixTextPlural,
    endsInPrefixTextSingular,
    endsinSuffixTextSingular,
    themeData,
    numberOfListings,
    numberOfListingsTextSingular,
    numberOfListingsTextPlural,
    ...rest
  } = props;

  const hasStarted = startDate ? new Date(startDate) <= new Date() : false;
  // const duration = calcDaysDifference(
  //   endDate ? new Date(endDate) : null,
  //   startDate ? new Date(startDate) : null
  // );
  const startsInDays = calcDaysDifference(
    startDate ? new Date(startDate) : null,
    new Date()
  );
  const endsInDays = calcDaysDifference(
    endDate ? new Date(endDate) : null,
    new Date()
  );

  // Check if campaign ends in less than 2 days or 1 day
  const endsInLessThan2Days =
    endsInDays !== null && endsInDays <= 2 && endsInDays > 0;
  const endMs = endDate ? new Date(endDate).getTime() : null;
  const nowMs = Date.now();
  const diffMs = endMs !== null ? endMs - nowMs : null;

  const endsInLessThan1Day =
    diffMs !== null && diffMs > 0 && diffMs < 24 * 60 * 60 * 1000;

  const durationText = (
    prefixTextSingular,
    prefixTextPlural,
    days,
    suffixTextSingular,
    suffixTextPlural
  ) =>
    days === 1
      ? `${prefixTextSingular} ${days} ${suffixTextSingular}`
      : `${prefixTextPlural} ${days} ${suffixTextPlural}`;

  // Calculate hours and minutes for counter when less than 1 day
  const getTimeRemaining = () => {
    if (!endDate) return null;
    const now = currentTime;
    const end = new Date(endDate);
    const diff = end.getTime() - now.getTime();

    if (diff <= 0) return null;

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return { hours, minutes, seconds };
  };

  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every second when campaign ends in less than 1 day
  useEffect(() => {
    if (!endsInLessThan1Day) return;

    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, [endsInLessThan1Day]);

  const timeRemaining = endsInLessThan1Day ? getTimeRemaining() : null;

  return (
    <Wrapper
      ref={ref}
      theme={theme}
      //   onClick={() => navigate(`/shop/${shopUuid}/campaign/${uuid}`)}
      className={className}
      onClick={onSelectCard}
      {...rest}
    >
      <ImageWrapper theme={theme} onClick={() => onSelect?.()}>
        {/* <CampaignFallbackImage
          image={coverPhoto}
          uuid={uuid}
          size={ImageSize.EXTRA_LARGE}
        /> */}
        <img src={coverPhoto} />

        <BadgeBar>
          {salesPackages?.map((item, index) => (
            <StatusBadge
              key={`package__${index}`}
              color={salesCampaignTypes?.find((x) => x.value === item)?.color}
              theme={theme}
            >
              <Icon
                icon={salesCampaignTypes?.find((x) => x.value === item)?.icon}
              />
            </StatusBadge>
          ))}
        </BadgeBar>
      </ImageWrapper>
      <ContentWrapper theme={theme}>
        <div className="text-block-wrapper">
          <div className="title-block-wrapper">
            <div className="campaign-title">
              {(upcoming
                ? upcomingCampaignText
                : campaignSingleText
              )?.toUpperCase()}
            </div>
            <div className="campaign-title-text">{title}</div>
            {endDate && startDate && (
              <div>
                {toLocaleDateString(startDate)} - {toLocaleDateString(endDate)}
              </div>
            )}
            <div className="timestamp-text">
              {numberOfListings > 0 && (
                <span className="listings-text">
                  {numberOfListings}{" "}
                  {numberOfListings === 1
                    ? numberOfListingsTextSingular
                    : numberOfListingsTextPlural}{" "}
                  ∙{" "}
                </span>
              )}
              <span
                className={`duration-text ${
                  endsInLessThan2Days ? "urgent" : ""
                } ${!hasStarted ? "starts-in" : ""}`}
              >
                {endsInLessThan1Day && timeRemaining ? (
                  <div className="countdown-timer">
                    {endsInPrefixTextSingular}{" "}
                    {timeRemaining.hours.toString().padStart(2, "0")}:
                    {timeRemaining.minutes.toString().padStart(2, "0")}:
                    {timeRemaining.seconds.toString().padStart(2, "0")}
                  </div>
                ) : hasStarted ? (
                  durationText(
                    endsInPrefixTextSingular,
                    endsInPrefixTextPlural,
                    endsInDays,
                    endsinSuffixTextSingular,
                    endsinSuffixTextPlural
                  )
                ) : (
                  durationText(
                    startsInPrefixTextSingular,
                    startsInPrefixTextPlural,
                    startsInDays,
                    startsinSuffixTextSingular,
                    startsinSuffixTextPlural
                  )
                )}
              </span>
            </div>
          </div>
        </div>
        <ProfileItem
          hasPermission={true}
          image={
            // <ShopFallbackImage
            //   image={shopImage}
            //   uuid={shopUuid}
            //   size={ImageSize.SMALL}
            //   className={`${shopImage ? "" : "no-image"}`}
            // />
            <img
              src={shopImage}
              // uuid={shopUuid}
              // size={ImageSize.SMALL}
              className={`${shopImage ? "" : "no-image"}`}
            />
          }
          themeData={themeData}
          isActive={true}
          isUser={false}
          name={shopName}
          shopCategory={shopCategory}
          //   onSelect={(e) => navigate(`/shop/${shopUuid}`)}
          onClick={() => onSelectShop(shopUuid)}
        />
      </ContentWrapper>
    </Wrapper>
  );
});

SalesCampaignCard.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  numberOfListings: PropTypes.number,
  dropdown: PropTypes.any,
  color: PropTypes.string,
};

export default SalesCampaignCard;
