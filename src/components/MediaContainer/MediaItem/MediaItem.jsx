import React, { useContext } from 'react';
import { Figure } from 'react-bootstrap';
import { useDrag } from 'react-dnd';
import { store } from '../../../store';
import {
  UPDATE_WAS_DRAGGING_FRAME,
  UPDATE_CURRENT_DRAGGED_FRAME,
} from '../../../constants';

const MediaItem = ({ index, value, isDropped, ...props }) => {
  const { dispatch } = useContext(store);
  // const [{ isDragging, isOverTarget }, drag] = useDrag({
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

  return (
    <Figure key={index} ref={drag}>
      <Figure.Image fluid src={value.image} draggable={false} />
    </Figure>
  );
};
export default MediaItem;
