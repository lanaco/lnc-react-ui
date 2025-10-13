import { forwardRef } from "react";
import ReactPlayer from "react-player";

import PropTypes from "prop-types";

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

SearchSectionThumbnail.propTypes = {
  thumbnail: PropTypes.string,
};

SearchSectionVideo.propTypes = {
  video: PropTypes.string,
  thumbnail: PropTypes.string,
};

export default SearchSectionVideo;
