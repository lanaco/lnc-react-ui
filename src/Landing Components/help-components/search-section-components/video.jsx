/* eslint-disable no-unused-vars */
/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import { forwardRef } from "react";
import ReactPlayer from "react-player";

import PlayButton from "../../../assets/images/PlayButton.svg";
import useDetectMobile from "../../../_utils/useDetectMobile";
import { PlayButtonContainer } from "./style";

const SearchSectionThumbnail = ({ thumbnail }) => {
  return (
    <PlayButtonContainer>
      <img src={thumbnail} className="section__thumbnail" alt="Thumbnail" />
      <img src={PlayButton} className="section__play" alt="Play" />
    </PlayButtonContainer>
  );
};

const SearchSectionVideo = forwardRef(({ video, thumbnail }, ref) => {
  const isMobile = useDetectMobile();

  return (
    <ReactPlayer
      url={video}
      playing={true}
      controls={true}
      width={isMobile ? "100%" : "31.25rem"}
      height={isMobile ? "100%" : "18.75rem"}
      light={true}
      playIcon={<SearchSectionThumbnail thumbnail={thumbnail} />}
    />
  );
});

export default SearchSectionVideo;
