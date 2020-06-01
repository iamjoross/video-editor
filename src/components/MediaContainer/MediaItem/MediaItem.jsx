import React from 'react';
import { Figure } from 'react-bootstrap';
import { useDrag } from 'react-dnd';

const MediaItem = ({ index, value, isDropped, ...props }) => {
  const [{ isDragging }, drag] = useDrag({
    item: {
      index,
      type: value.type,
    },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        // alert(`You dropped ${item.name} into ${dropResult.name}!`);
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <Figure key={index} ref={drag}>
      <Figure.Image fluid src={value.image} draggable={false} />
    </Figure>
  );
};
export default MediaItem;
