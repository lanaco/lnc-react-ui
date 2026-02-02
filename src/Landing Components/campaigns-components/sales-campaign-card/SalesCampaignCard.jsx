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
import Icon from "../../../General/Icon/Icon";
import ShopImageWrapper from "../../shop-img-wrapper";
import ProfileItem from "./ProfileItem";
import { forwardRef, useState, useEffect, useRef } from "react";
import {
  normalizeDate,
  getDayNumberPrecise,
  calcDaysRemaining,
  calcDaysUntil,
} from "../../../_utils/utils";

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
    uuid,
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
    shopImageComponent,
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
    endedText,
    themeData,
    numberOfListings,
    numberOfListingsTextSingular,
    numberOfListingsTextPlural,
    metadata,
    ...rest
  } = props;

  const cardRef = useRef();

  // Use the same date calculation logic as the app
  const campaignState = getDayNumberPrecise(startDate, endDate);
  const isEnded = campaignState !== -1 && campaignState?.isEnded === true;
  // Campaign has started if it's not -1 (hasn't started) and not ended
  const hasStarted = campaignState !== -1 && !isEnded;

  // Calculate days using UTC normalization
  const startsInDays = calcDaysUntil(startDate);
  const endsInDays = calcDaysRemaining(endDate);

  // Check if campaign ends in less than 2 days or 1 day
  const endsInLessThan2Days =
    endsInDays !== null && endsInDays <= 2 && endsInDays > 0;

  // For countdown timer, use precise calculation
  const endStr = normalizeDate(endDate);
  const end = endStr ? new Date(endStr) : null;
  const now = new Date();
  const diffMs = end ? end.getTime() - now.getTime() : null;

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
    const endStr = normalizeDate(endDate);
    const end = endStr ? new Date(endStr) : null;
    if (!end) return null;

    const now = currentTime;
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
      ref={cardRef}
      theme={theme}
      //   onClick={() => navigate(`/shop/${shopUuid}/campaign/${uuid}`)}
      className={className}
      name={metadata?.name}
      data-accessor={metadata?.accessor}
      onClick={(e) => onSelectCard(e, cardRef)}
      to={`/shop/${shopUuid}/campaign/${uuid}`}
      {...rest}
    >
      <ImageWrapper theme={theme}>
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
              <div className="campaign-date">
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
                ) : hasStarted &&
                  !isEnded &&
                  endsInDays !== null &&
                  endsInDays > 0 ? (
                  durationText(
                    endsInPrefixTextSingular,
                    endsInPrefixTextPlural,
                    endsInDays,
                    endsinSuffixTextSingular,
                    endsinSuffixTextPlural
                  )
                ) : isEnded ? (
                  endedText || "Završena"
                ) : !hasStarted && startsInDays !== null && startsInDays > 0 ? (
                  durationText(
                    startsInPrefixTextSingular,
                    startsInPrefixTextPlural,
                    startsInDays,
                    startsinSuffixTextSingular,
                    startsinSuffixTextPlural
                  )
                ) : null}
              </span>
            </div>
          </div>
        </div>
        <ProfileItem
          hasPermission={true}
          image={<ShopImageWrapper src={shopImage} />}
          imageComponent={shopImageComponent}
          themeData={themeData}
          isActive={true}
          isUser={false}
          name={shopName}
          shopCategory={shopCategory}
          uuid={shopUuid}
          //   onSelect={(e) => navigate(`/shop/${shopUuid}`)}
          onClick={() => onSelectShop(shopUuid)}
        />
      </ContentWrapper>
    </Wrapper>
  );
});

export default SalesCampaignCard;
