import React, { useRef, useContext } from 'react';
import { useDrop } from 'react-dnd';
import FrameBar from '../FrameBar';
import { store } from '../../../store';
import { UPDATE_CURRENT_HOVERING_COORD } from '../../../constants';

const TimelineDropTarget = ({
  index,
  accept,
  type,
  frames,
  handleDrop,
  ...props
}) => {
  const { state, dispatch } = useContext(store);
  const ref = useRef();

  const handleHover = (item, monitor) => {
    const targetRef = dropTarget(ref);
    if (monitor.canDrop()) {
      const offset = monitor.getSourceClientOffset();
      if (offset && targetRef.current) {
        const dropTargetXy = ref.current.getBoundingClientRect();
        const currentCoords = {
          x: offset.x - dropTargetXy.left,
          y: offset.y - dropTargetXy.top,
        };

        dispatch({
          type: UPDATE_CURRENT_HOVERING_COORD,
          payload: currentCoords,
        });

        console.log(state.currentHoveringItem);
      }
    }
  };

  const [{ isOver, hover, canDrop }, dropTarget] = useDrop({
    accept,
    drop: (item, monitor) => handleDrop(index, item, monitor, dropTarget(ref)),
    hover: (item, monitor) => handleHover(item, monitor),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
      draggingColor: monitor.getItemType(),
    }),
  });
  const isActive = isOver && canDrop;
  let backgroundColor = 'transparent';
  if (isActive) {
    backgroundColor = 'rgb(109, 109, 109)';
  } else if (canDrop) {
    backgroundColor = 'rgb(189, 192, 195)';
  }

  return (
    <div
      className='timeline-layer-content'
      ref={dropTarget(ref)}
      accept={accept}
      style={{ backgroundColor }}
    >
      {frames && frames.length ? (
        frames.map((frame, index) => <FrameBar key={index} frame={frame} />)
      ) : state.currentHoveringItem ? (
        <FrameBar key={index} frame={state.currentHoveringItem} />
      ) : (
        ''
      )}
    </div>
  );
};

export default TimelineDropTarget;
