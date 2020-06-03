import React, { useContext } from 'react';
import { useDrag } from 'react-dnd';
import { store } from '../../../store';
import { UPDATE_WAS_DRAGGING_FRAME } from '../../../constants';

const styles = {
  position: 'absolute',
  width: '100px',
  height: '90%',
  borderRadius: '5px',
  justifyContent: 'center',
  alignItems: 'center',
  display: 'flex',
  cursor: 'grab',
};
const FrameBar = ({ frame, overDraggable, ...props }) => {
  const [key, frameItem] = frame;

  const { dispatch } = useContext(store);
  const [, drag] = useDrag({
    item: { key, ...frameItem.item },
    isDragging: (monitor) => {},
    begin: (monitor) => {
      dispatch({ type: UPDATE_WAS_DRAGGING_FRAME, payload: true });
    },
    end: (item, monitor) => {
      // const dropResult = monitor.getDropResult();
      // dispatch({ type: UPDATE_FRAME_COORD, payload: { frameItem } });
      // if (item && dropResult) {
      //   // alert(`You dropped ${item.name} into ${dropResult.name}!`);
      // }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      isOverTarget: monitor.isOverTarget(),
    }),
  });

  const backgroundColor =
    frameItem.item.type === 'video'
      ? 'rgb(0,140,222)'
      : frameItem.item.type === 'audio'
      ? 'rgb(0,229,174)'
      : frameItem.item.type === 'text'
      ? 'rgb(255,56,0)'
      : 'transparent';
  const color =
    frameItem.item.type === 'video' ? 'rgb(255,255,255)' : 'rgb(0,0,0)';
  const opacity = overDraggable ? '50%' : '100%';
  const left = `${
    frameItem.left
      ? frameItem.left
      : frameItem.coords.x
      ? frameItem.coords.x
      : 0
  }px`;

  return (
    <div
      style={{ ...styles, backgroundColor, opacity, left, color }}
      ref={drag}
    >
      {frameItem.item.index}
    </div>
  );
};

export default FrameBar;
