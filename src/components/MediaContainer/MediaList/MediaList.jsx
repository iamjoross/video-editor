import React,{useContext} from 'react';
import {store} from '../../../store';
import MediaItem from '../MediaItem';

const MediaList = ({ media, droppedMedia, ...props }) => {
  // const isDropped = (boxIdx) => {
  //   return droppedMedia.indexOf(boxIdx) > -1;
  // };
  const { state } = useContext(store);
  const isOfFilterType = ([key, value], index) => {
    if(state.mediaFilter === 'all' && value.type !== state.mediaFilter){
      return (
        <MediaItem
          key={index}
          index={key}
          value={value}
        />
      );
    } else if(value.type === state.mediaFilter) {
      return (
        <MediaItem
          key={index}
          index={key}
          value={value}
        />
      );
    }
  };

  return Object.entries(media).filter(isOfFilterType)
    .map(([key, value], index) => {
      return (
        <MediaItem
          key={index}
          index={key}
          value={value}
        />
      );
  });
};

export default MediaList;
