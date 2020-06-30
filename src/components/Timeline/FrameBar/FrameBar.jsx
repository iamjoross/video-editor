import React, { useContext, useState, useRef, useEffect } from 'react';
import { ResizableBox } from 'react-resizable';
import { useDrag } from 'react-dnd';
import { store } from '../../../store';
import { UPDATE_WAS_DRAGGING_FRAME } from '../../../constants';
import './FrameBar.scss';

const styles = {
  position: 'absolute',
  borderRadius: '5px',
  justifyContent: 'center',
  alignItems: 'center',
  display: 'flex',
  cursor: 'grab',
};
const FrameBar = ({ frame, size, overDraggable, ...props }) => {
  const [key, frameItem] = frame;
  const [isMouseDown, toggleMouseDown] = useState(true);
  const [offsetLeft, setOffsetLeft] = useState(0);
  const [offsetWidth, setOffsetWidth] = useState(0);
  const [left, setLeft] = useState();

  const { dispatch } = useContext(store);
  const divRef = useRef();
  const boxRef = useRef();

  useEffect(() => {
    setOffsetWidth(boxRef.current.offsetWidth);
    setOffsetLeft(boxRef.current.parentElement.offsetLeft);
    setLeft(`${frameItem.left ? frameItem.left : frameItem.coords.x ? frameItem.coords.x : 0}px`);
  },[setOffsetLeft, setLeft, setOffsetWidth, frameItem.left, frameItem.coords.x]);

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
  const color = frameItem.item.type === 'video' ? 'rgb(255,255,255)' : 'rgb(0,0,0)';
  const opacity = overDraggable ? '50%' : '100%';

  const [height, setHeight] = useState(frameItem.item.type === 'video' ? 44 : 31);
  const [width, setWidth] = useState(size ? size : frameItem.origDuration);

  const handleResize = (event, { size, handle }) => {
    setHeight(size.height);
    setWidth(size.width);

    let newLeft = offsetLeft;

    if (handle.indexOf('w') > -1) {
      const deltaWidth = size.width - offsetWidth;
      newLeft -= deltaWidth;
    }
    setLeft(`${newLeft}px`);
  };


  return (
    <div
      style={{ ...styles, backgroundColor, opacity, left, color, width }}
      ref={isMouseDown ? drag : divRef}
      onMouseDown={(evt) => toggleMouseDown(true)}
      onMouseUp={(evt) => toggleMouseDown(false)}
    >
      <div ref={boxRef}>
      <ResizableBox
        width={width}
        height={height}
        minConstraints={[-Infinity, height]}
        maxConstraints={[Infinity, height]}
        handleSize={[100, 100]}
        resizeHandles={['e', 'w']}
        onResizeStart={() => toggleMouseDown(true)}
        onResizeStop={() => toggleMouseDown(false)}
        onResize={handleResize}
        // draggable={false}
        // draggableOpts={{offsetParent: boxRef}}
      />
      </div>
    </div>
  );
};

FrameBar.defaultProps = {
  size: 0,
};

export default FrameBar;
