import React, { memo, useCallback, useState, useContext } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ReactPlayer from 'react-player';
import Timeline from './components/Timeline';
import TimelineTopBar from './components/Timeline/TimelineTopBar';
import MediaContainer from './components/MediaContainer';
import update from 'immutability-helper';
import { store } from './store';
import { UPDATE_CURRENT_DROPPED_ITEM } from './constants';
import 'holderjs';
import './App.scss';

const App = memo(() => {
  const { state, dispatch } = useContext(store);

  const [timelineLayers, setTimelineLayers] = useState(state.layers);
  const [droppedMedia, setDroppedMedia] = useState([]);
  // const [mediaItems] = useState(media);

  const handleDrop = useCallback(
    (index, item, monitor, ref) => {
      const offset = monitor.getSourceClientOffset();
      if (offset && ref.current) {
        const dropTargetXy = ref.current.getBoundingClientRect();
        const currentCoords = {
          x: offset.x - dropTargetXy.left,
          y: offset.y - dropTargetXy.top,
        };
        dispatch({
          type: UPDATE_CURRENT_DROPPED_ITEM,
          payload: currentCoords,
        });
      }
      setDroppedMedia(
        update(
          droppedMedia,
          item.index ? { $push: [item.index] } : { $push: [] }
        )
      );
      setTimelineLayers(
        update(timelineLayers, {
          [index]: {
            lastDroppedItem: {
              $set: item,
            },
          },
        })
      );
    },
    [dispatch, droppedMedia, timelineLayers]
  );

  return (
    <Container fluid className='d-flex h-100 flex-column'>
      <TimelineTopBar />
      <Row className='d-flex m-0' style={{ flex: 6 }}>
        <Col md={3} className='border border-light mr-4'>
          <MediaContainer media={state.media} droppedMedia={droppedMedia} />
        </Col>
        <Col className='border border-light p-0'>
          <ReactPlayer
            url='https://www.youtube.com/watch?v=ysz5S6PUM-U'
            width='100%'
            controls={true}
            height='100%'
          />
        </Col>
      </Row>
      <Row md={8} className='d-flex mb-3 mt-4 mx-0' style={{ flex: 3 }}>
        <Col className='p-0'>
          <Timeline handleDrop={handleDrop} />
        </Col>
      </Row>
    </Container>
  );
});

export default App;
