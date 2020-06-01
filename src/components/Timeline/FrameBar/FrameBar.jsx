import React from 'react';

const styles = {
  position: 'absolute',
  width: '100px',
  backgroundColor: 'red',
  height: '90%',
  borderRadius: '5px',
  opacity: '50%',
};
const FrameBar = ({ frame, ...props }) => {
  const left = frame.left ? frame.left : frame.coords.x ? frame.coords.x : 0;
  console.log(frame);
  return <div style={{ ...styles, left: `${left}px` }}>`${left}px`</div>;
};

export default FrameBar;
