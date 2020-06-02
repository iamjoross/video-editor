import React from 'react';

const styles = {
  position: 'absolute',
  width: '100px',
  height: '90%',
  borderRadius: '5px',
  justifyContent: 'center',
  alignItems: 'center',
  display: 'flex',
};
const FrameBar = ({ frame, overDraggable, ...props }) => {
  const backgroundColor =
    frame.item.type === 'video'
      ? 'rgb(0,140,222)'
      : frame.item.type === 'audio'
      ? 'rgb(0,229,174)'
      : frame.item.type === 'text'
      ? 'rgb(255,56,0)'
      : 'transparent';

  const color = frame.item.type === 'video' ? 'rgb(255,255,255)' : 'rgb(0,0,0)';

  const opacity = overDraggable ? '50%' : '100%';

  const left = `${
    frame.left ? frame.left : frame.coords.x ? frame.coords.x : 0
  }px`;

  return (
    <div style={{ ...styles, backgroundColor, opacity, left, color }}>
      {frame.item.index}
    </div>
  );
};

export default FrameBar;
