import React, { memo, useContext } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ReactPlayer from 'react-player';
import Timeline from './components/Timeline';
import TimelineTopBar from './components/Timeline/TimelineTopBar';
import MediaContainer from './components/MediaContainer';
import { store } from './store';
import 'holderjs';
import './App.scss';

const App = memo(() => {
  const { state } = useContext(store);

  return (
    <Container fluid className='d-flex h-100 flex-column'>
      <TimelineTopBar />
      <Row className='d-flex m-0' style={{ flex: 6 }}>
        <Col md={3} className='border border-light mr-4'>
          <MediaContainer media={state.media} />
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
          <Timeline />
        </Col>
      </Row>
    </Container>
  );
});

export default App;
