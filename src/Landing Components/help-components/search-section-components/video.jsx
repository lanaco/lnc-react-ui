/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import { forwardRef } from "react";
import ReactPlayer from "react-player";

import PlayButton from "../../../assets/images/PlayButton.svg";
import { PlayButtonContainer, VideoContainer } from "./style";

const SearchSectionThumbnail = ({ thumbnail }) => {
  return (
    <PlayButtonContainer>
      {thumbnail && (
        <img src={thumbnail} className="section__thumbnail" alt="Thumbnail" />
      )}
      <img src={PlayButton} className="section__play" alt="Play" />
    </PlayButtonContainer>
  );
};

const SearchSectionVideo = forwardRef(({ video, thumbnail }, ref) => {
  // No video: don't mount the player at all, just show the thumbnail.
  if (!video) {
    if (!thumbnail) return null;
    return (
      <div ref={ref} className="section__media">
        <SearchSectionThumbnail thumbnail={thumbnail} />
      </div>
    );
  }

  // Sizing is pure CSS (see VideoContainer) - no window measurement, so it
  // also works when rendered into an iframe through a portal.
  return (
    <VideoContainer ref={ref} className="section__media">
      <ReactPlayer
        url={video}
        playing={true}
        controls={true}
        width="100%"
        height="100%"
        light={true}
        playIcon={<SearchSectionThumbnail thumbnail={thumbnail} />}
      />
    </VideoContainer>
  );
});

export default SearchSectionVideo;
