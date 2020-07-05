import React, { useContext, createRef, useEffect } from 'react';
import { useDrag } from 'react-dnd';
import { store } from '../../../store';
import styled from "styled-components";
import {
  UPDATE_WAS_DRAGGING_FRAME,
  UPDATE_CURRENT_DRAGGED_FRAME,
} from '../../../constants';
import LazyImage from '../../LazyImage';
import {formatDuration} from '../../../util';
import { CameraVideo, CursorText, Soundwave } from 'react-bootstrap-icons';
import './MediaItem.scss';


const MediaWrapper = styled.div`
  cursor: grab;
  padding: 5px 0;
  display: flex;
  height: max-content;
`;



const MediaItem = ({ index, value, isDropped, ...props }) => {
  const { state, dispatch } = useContext(store);
  const mediaGridItemRef = createRef();

  useEffect(()=> {
    if(state.currentMediaView === 'grid' && mediaGridItemRef.current.scrollWidth > mediaGridItemRef.current.offsetWidth){
      const text = mediaGridItemRef.current.innerText;
      const pos = text.lastIndexOf('.')
      mediaGridItemRef.current.innerHTML =
        `<span class="start">${text.slice(0, pos)}</span><span class="end">${text.slice(pos + 1, text.length)}</span>`;
    }
  }, [mediaGridItemRef, state.currentMediaView]);

  const [, drag] = useDrag({
    item: {
      index,
      type: value.type,
    },
    isDragging: (monitor) => {
      // console.log(monitor);
    },
    begin: (monitor) => {
      dispatch({ type: UPDATE_WAS_DRAGGING_FRAME, payload: false });
      dispatch({
        type: UPDATE_CURRENT_DRAGGED_FRAME,
        payload: { index, duration: value.origDuration },
      });
    },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        // alert(`You dropped ${item.name} into ${dropResult.name}!`);
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      isOverTarget: monitor.isOverTarget(),
    }),
  });

  const mediaTypeIcon =
    value.type === 'video' ? (
      <CameraVideo />
    ) : value.type === 'audio' ? (
      <Soundwave />
    ) : value.type === 'text' ? (
      <CursorText />
    ) : (
      ''
    );

  const MediaGridItemDetails = ({details}) => {
    return (
      <div className="media-item-details">
        <div className="media-item__name"><p ref={mediaGridItemRef}>{details.fileName}</p></div>
        <div className="media-item__timestamp">{formatDuration(details.origDuration)}</div>
      </div>
    );
  };



  const MediaListItemDetails = () => {
    return (
      <div className="media-item-details px-2 d-flex flex-row w-75 justify-content-between align-items-center" style={{backgroundColor: '#f2f5f8'}}>
        <div className="d-flex justify-content-center flex-column">
          <div>{value.fileName}</div>
          <div>{formatDuration(value.origDuration)}</div>
        </div>
        <div>
          {mediaTypeIcon}
        </div>
      </div>
    )
  };


  return (
    <MediaWrapper key={index} ref={drag} className={`media-item-wrapper ${state.currentMediaView === 'list' ? 'w-100' : 'flex-column' } media-${state.currentMediaView}`}>
      <LazyImage
        className='media-item-img'
        key={index}
        src={value.image}
        alt={`Random image ${value.id}`}
      />
      {state.currentMediaView === 'list' ? <MediaListItemDetails/> : <MediaGridItemDetails details={value} />}
    </MediaWrapper>
  );
};
export default MediaItem;
