import React from 'react';
import MediaItem from '../MediaItem';

const MediaList = ({ media, droppedMedia, ...props }) => {
  // const isDropped = (boxIdx) => {
  //   return droppedMedia.indexOf(boxIdx) > -1;
  // };
  return Object.entries(media).map(([key, value]) => {
    return (
      <MediaItem
        key={key}
        index={key}
        value={value}
        // isDropped={isDropped(key)}
      />
    );
  });
};

export default MediaList;
