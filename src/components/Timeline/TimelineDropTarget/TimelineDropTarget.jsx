import React, {
  useRef,
  useContext,
  useEffect,
  useCallback,
  useState,
} from 'react';
import { useDrop } from 'react-dnd';
import FrameBar from '../FrameBar';
import { store } from '../../../store';
import { ADD_FRAME_TO_LAYER, UPDATE_FRAME_COORD } from '../../../constants';
import { useWait } from '../../../util';
import { v4 as uuidv4 } from 'uuid';

const TimelineDropTarget = ({
  index,
  accept,
  type,
  frames,
  title,
  ...props
}) => {
  const { state, dispatch } = useContext(store);
  const [wait, done] = useWait();
  const ref = useRef();
  const doneRef = useRef(done);
  const collectedPropsRef = useRef();
  const [hoveringItem, setHoveringItem] = useState({});

  useEffect(() => {
    doneRef.current = done;
  });

  const getOffsetCoords = (monitor, targetRef) => {
    const offset = monitor.getSourceClientOffset();
    if (!(offset && targetRef.current)) return null;

    const dropTargetXy = targetRef.current.getBoundingClientRect();
    const x =
      offset.x - dropTargetXy.left < 0 ? 0 : offset.x - dropTargetXy.left;
    const y = offset.y - dropTargetXy.top;

    const coords = {
      x,
      y,
    };

    return coords;
  };

  const handleHover = useCallback(
    (item, monitor, targetRef) => {
      if (!doneRef.current) return collectedPropsRef.current;
      if (monitor.canDrop()) {
        const coords = getOffsetCoords(monitor, targetRef);
        wait(120); // debounce
        setHoveringItem({
          [uuidv4()]: {
            item,
            origDuration: state.currentDraggedItem.duration,
            coords,
          },
          mediaType: item.type,
        });
      }
    },
    [state.currentDraggedItem.duration, wait]
  );

  const handleDrop = useCallback(
    (index, item, monitor, targetRef) => {
      if (monitor.canDrop() && !state.wasDraggingFrame) {
        const coords = getOffsetCoords(monitor, targetRef);
        dispatch({
          type: ADD_FRAME_TO_LAYER,
          payload: {
            [uuidv4()]: {
              item,
              origDuration: state.currentDraggedItem.duration,
              coords,
            },
            mediaType: item.type,
          },
        });
      } else if (monitor.canDrop() && state.wasDraggingFrame) {
        const coords = getOffsetCoords(monitor, targetRef);
        dispatch({
          type: UPDATE_FRAME_COORD,
          payload: { key: item.key, mediaType: item.type, x: coords.x },
        });
      }
    },
    [dispatch, state.currentDraggedItem.duration, state.wasDraggingFrame]
  );

  const [{ isOver, canDrop }, dropTarget] = useDrop({
    accept,
    drop: (item, monitor) => handleDrop(index, item, monitor, dropTarget(ref)),
    hover: (item, monitor) => handleHover(item, monitor, dropTarget(ref)),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const isActive = isOver && canDrop;
  let backgroundColor = isActive
    ? 'rgb(109, 109, 109)'
    : canDrop
    ? 'rgb(189, 192, 195)'
    : 'transparent';

  const isMediaItemHovering =
    Object.keys(hoveringItem).length !== 0 &&
    type === hoveringItem?.mediaType &&
    isOver;

  const newHoveringItem = Object.keys(hoveringItem).reduce((object, key) => {
    if (key !== 'mediaType') {
      object[key] = hoveringItem[key];
    }
    return object;
  }, {});

  return (
    <div
      className='timeline-layer-content'
      ref={dropTarget(ref)}
      accept={accept}
      style={{ backgroundColor }}
    >
      {Object.keys(frames).length !== 0
        ? Object.entries(frames).map((frame, index) => (
            <FrameBar key={index} frame={frame} overDraggable={false} />
          ))
        : isMediaItemHovering
        ? Object.entries(newHoveringItem).map((frame, index) => (
            <FrameBar
              key={index}
              frame={frame}
              size={state.currentDraggedItem.origDuration}
              overDraggable={true}
            />
          ))
        : ''}
    </div>
  );
};

export default TimelineDropTarget;
